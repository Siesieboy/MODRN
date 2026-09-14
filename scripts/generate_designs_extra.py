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
    ("design-visitekaartje.png",
     "Elegant business card design for a landscaping company called 'Groen & Co'. Deep green and off-white palette, minimalist leaf line icon, front and back of the card shown side by side on a clean neutral background, professional print design presentation."),
    ("design-instagram.png",
     "Instagram post design for a smoothie bar called 'Fris & Fruitig'. Bright fresh colors, bold playful typography announcing a new mango smoothie, photo of a colorful smoothie, square social media format, modern juicy design."),
    ("design-menukaart.png",
     "Restaurant menu design for a wood-fired pizzeria called 'Forno'. Rustic Italian style, warm cream paper background, small hand-drawn pizza and basil illustrations, elegant serif typography listing dishes with euro prices, professional print design."),
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
