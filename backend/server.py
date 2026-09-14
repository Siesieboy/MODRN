import os
import re
import time
import ipaddress
import logging
import uuid
from html import escape
from html.parser import HTMLParser
from urllib.parse import urlparse
from pathlib import Path
from datetime import datetime, timezone

import httpx
from fastapi import FastAPI, APIRouter, HTTPException, Request
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from pydantic import BaseModel, EmailStr, Field
from dotenv import load_dotenv

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

app = FastAPI()
api_router = APIRouter(prefix="/api")

EMAIL_BASE_URL = "https://integrations.emergentagent.com"
EMAIL_KEY = os.environ["EMERGENT_EMAIL_KEY"]
EMAIL_FROM_NAME = os.environ["EMAIL_FROM_NAME"]
EMAIL_REPLY_TO = os.environ.get("EMAIL_REPLY_TO")
CONTACT_RECIPIENT = os.environ["CONTACT_RECIPIENT"]

logger = logging.getLogger(__name__)

_SHORTENERS = ("bit.ly", "tinyurl.com", "t.co", "is.gd", "cutt.ly", "goo.gl", "rebrand.ly")
_CRED_ASK = ("reply with your password", "reply with the code", "send your password", "cvv",
             "send us your password", "enter your password below", "confirm your card number",
             "your full card number", "seed phrase", "recovery phrase", "verify your card",
             "social security number", "confirm your bank details")
_HOSTISH = re.compile(r"\b(?:https?://)?((?:[a-z0-9-]+\.)+[a-z]{2,})", re.I)


def _host_ok(host: str) -> bool:
    if not host or "xn--" in host:
        return False
    try:
        ipaddress.ip_address(host)
        return False
    except ValueError:
        pass
    return not any(host == s or host.endswith("." + s) for s in _SHORTENERS)


def _same_site(shown: str, real: str) -> bool:
    return shown == real or real.endswith("." + shown) or shown.endswith("." + real)


class _EmailScan(HTMLParser):
    def __init__(self):
        super().__init__()
        self.tags, self.urls, self.anchors = set(), [], []
        self._href, self._text = None, []

    def handle_starttag(self, tag, attrs):
        self.tags.add(tag.lower())
        self.urls += [v for k, v in attrs if k.lower() in ("href", "src") and v]
        if tag.lower() == "a":
            self._href = dict((k.lower(), v) for k, v in attrs).get("href")
            self._text = []

    def handle_data(self, data):
        if self._href is not None:
            self._text.append(data)

    def handle_endtag(self, tag):
        if tag.lower() == "a" and self._href is not None:
            self.anchors.append((self._href, "".join(self._text)))
            self._href, self._text = None, []


def _assert_safe_email(subject: str, html: str) -> None:
    scan = _EmailScan()
    scan.feed(html)
    if scan.tags & {"form", "input", "textarea", "select"}:
        raise ValueError("No forms or input fields in email (G2)")
    body = f"{subject}\n{html}".lower()
    for p in _CRED_ASK:
        if p in body:
            raise ValueError(f"Email asks the recipient for credentials: {p!r} (G2)")
    for url in scan.urls:
        low = url.strip().lower()
        if low.startswith(("mailto:", "tel:", "cid:", "#")):
            continue
        if not low.startswith("https://"):
            raise ValueError(f"Email links/assets must be absolute https: {url!r} (G3)")
        host = urlparse(low).hostname or ""
        if not _host_ok(host) or urlparse(low).username is not None:
            raise ValueError(f"Shortened, numeric-host or credential-bearing URL: {url!r} (G3)")
    for href, text in scan.anchors:
        real = urlparse(href.strip().lower()).hostname or ""
        if not real:
            continue
        for m in _HOSTISH.finditer(text):
            if not _same_site(m.group(1).lower(), real):
                raise ValueError(f"Anchor text {m.group(1)!r} != real link host {real!r} (G3)")


async def send_email(*, to: str, subject: str, html: str, reply_to: str | None = None) -> str | None:
    _assert_safe_email(subject, html)
    payload = {"to": [to], "subject": subject, "html": html, "from_name": EMAIL_FROM_NAME}
    if reply_to or EMAIL_REPLY_TO:
        payload["contact_email"] = reply_to or EMAIL_REPLY_TO
    try:
        async with httpx.AsyncClient(timeout=30) as http_client:
            resp = await http_client.post(
                f"{EMAIL_BASE_URL}/api/v1/email/send",
                headers={"X-Email-Key": EMAIL_KEY},
                json=payload,
            )
        resp.raise_for_status()
        return resp.json().get("id")
    except httpx.HTTPStatusError as e:
        logger.error(f"Email send failed: {e.response.status_code} {e.response.text}")
        raise HTTPException(status_code=502, detail="Failed to send email")
    except Exception as e:
        logger.error(f"Email send error: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to send email")


class ContactMessage(BaseModel):
    naam: str = Field(min_length=2, max_length=100)
    email: EmailStr
    bericht: str = Field(min_length=10, max_length=2000)
    pakket: str = Field(default="", max_length=60)


_RATE: dict[str, list[float]] = {}


def _rate_limit(ip: str) -> None:
    now = time.time()
    hits = [t for t in _RATE.get(ip, []) if now - t < 600]
    if len(hits) >= 5:
        raise HTTPException(status_code=429, detail="Te veel berichten. Probeer het later opnieuw.")
    hits.append(now)
    _RATE[ip] = hits


@api_router.get("/")
async def root():
    return {"message": "Portfolio API actief"}


@api_router.post("/contact")
async def submit_contact(message: ContactMessage, request: Request):
    _rate_limit(request.client.host if request.client else "unknown")
    subject = f"Nieuwe website-aanvraag van {message.naam}"
    pakket_regel = (
        f'<p><strong>Gekozen pakket:</strong> {escape(message.pakket)}</p>' if message.pakket else
        '<p><strong>Gekozen pakket:</strong> Nog geen keuze — graag advies</p>'
    )
    html = (
        '<table role="presentation" width="100%"><tr><td style="padding:24px;'
        'font-family:Arial,sans-serif;color:#0C2340">'
        f'<h2 style="margin:0 0 16px">Nieuwe aanvraag via je MODRN-website</h2>'
        f'<p><strong>Naam:</strong> {escape(message.naam)}</p>'
        f'<p><strong>E-mail:</strong> {escape(message.email)}</p>'
        f'{pakket_regel}'
        f'<p><strong>Bericht:</strong></p>'
        f'<p style="white-space:pre-wrap;background:#F5F5F5;padding:16px;border-radius:8px">'
        f'{escape(message.bericht)}</p>'
        f'<p style="font-size:12px;color:#888">Verzonden via {escape(EMAIL_FROM_NAME)}.</p>'
        '</td></tr></table>'
    )
    email_id = await send_email(to=CONTACT_RECIPIENT, subject=subject, html=html)

    pakket_tekst = {
        "design": "Design Pakket (vanaf €149)",
        "onepager": "One-Pager (vanaf €499)",
        "business": "Business Site (vanaf €999)",
        "maatwerk": "Webshop / Maatwerk (vanaf €1.999)",
    }.get(message.pakket, "Nog geen keuze — we denken graag met je mee")
    bevestiging_html = (
        '<table role="presentation" width="100%"><tr><td style="padding:24px;'
        'font-family:Arial,sans-serif;color:#0C2340">'
        f'<h2 style="margin:0 0 16px">Bedankt voor je aanvraag, {escape(message.naam)}!</h2>'
        '<p>Je bericht is goed aangekomen bij MODRN website building &amp; design. '
        'Ik neem meestal binnen één werkdag contact met je op met een vrijblijvend voorstel.</p>'
        f'<p><strong>Jouw pakketkeuze:</strong> {escape(pakket_tekst)}</p>'
        '<p style="margin-top:24px">Met vriendelijke groet,<br/>Sies Pasteuning<br/>'
        'MODRN website building &amp; design</p>'
        f'<p style="font-size:12px;color:#888;margin-top:24px">Verzonden via {escape(EMAIL_FROM_NAME)}. '
        'Dit is een automatische bevestiging van jouw aanvraag.</p>'
        '</td></tr></table>'
    )
    try:
        await send_email(
            to=message.email,
            subject="Bedankt voor je aanvraag — MODRN",
            html=bevestiging_html,
        )
    except Exception as e:
        logger.warning(f"Bevestigingsmail aan aanvrager mislukt: {e}")
    doc = {
        "id": str(uuid.uuid4()),
        "naam": message.naam,
        "email": message.email,
        "bericht": message.bericht,
        "pakket": message.pakket,
        "created_at": datetime.now(timezone.utc).isoformat(),
        "email_id": email_id,
    }
    await db.contact_messages.insert_one(doc)
    return {"status": "success", "email_id": email_id}


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
