import asyncio
import os
import base64
from pathlib import Path
from dotenv import load_dotenv

load_dotenv('/app/backend/.env')
from emergentintegrations.llm.chat import LlmChat, UserMessage

OUT = Path('/app/frontend/public/images/design')
OUT.mkdir(parents=True, exist_ok=True)

PROMPTS = [
    ("design-logo.png",
     "Professional logo design presentation for an artisanal coffee brand called 'Koffiehoek'. Flat vector-style logo: a warm coffee cup icon above the wordmark, cream and caramel brown palette, centered on a clean light background like a branding board. Crisp, modern, minimal."),
    ("design-poster.png",
     "Modern event poster design for a summer festival called 'Zomerklanken'. Bold oversized typography, vibrant sunset gradient shapes, date and location details at the bottom, contemporary graphic design, portrait orientation, professional print quality."),
    ("design-flyer.png",
     "Elegant business flyer design for a barbershop called 'Kapper Stijl'. Dark charcoal background with gold typography, scissors line-art icon, opening hours and price list sections, premium print design, portrait orientation."),
]


async def gen(name, prompt):
    chat = LlmChat(
        api_key=os.environ['EMERGENT_LLM_KEY'],
        session_id=f"modrn-{name}",
        system_message="You generate graphic design mockup images.",
    )
    chat.with_model("gemini", "gemini-3.1-flash-image-preview").with_params(modalities=["image", "text"])
    text, images = await chat.send_message_multimodal_response(UserMessage(text=prompt))
    if images:
        (OUT / name).write_bytes(base64.b64decode(images[0]['data']))
        print(f"OK {name}", flush=True)
    else:
        print(f"NO IMAGE {name}: {text[:80]}", flush=True)


async def main():
    for name, prompt in PROMPTS:
        try:
            await gen(name, prompt)
        except Exception as e:
            print(f"FAIL {name}: {e}", flush=True)


asyncio.run(main())
