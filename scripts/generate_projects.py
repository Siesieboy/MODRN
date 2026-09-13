import asyncio
import os
import base64
from pathlib import Path
from dotenv import load_dotenv

load_dotenv('/app/backend/.env')
from emergentintegrations.llm.chat import LlmChat, UserMessage

OUT = Path('/app/frontend/public/images/projects')
OUT.mkdir(parents=True, exist_ok=True)

PROMPTS = [
    ("proj-bakkerij.png",
     "High-fidelity desktop website homepage mockup for an artisan bakery webshop called 'Bakkerij Van Dort'. Warm appetizing photography of fresh bread, dark navy header (#0C2340), soft peach (#FFDAB9) call-to-action buttons, clean editorial layout with generous whitespace, product cards with prices in euros, modern sans-serif typography. Looks like a real designed website screenshot, 16:10 aspect."),
    ("proj-fitcentrum.png",
     "High-fidelity desktop website homepage mockup for a local gym 'FitCentrum Lokaal' with an online class booking section. Dark navy background (#0C2340) with sky-blue (#87CEEB) accents, energetic photo of a modern gym interior, schedule grid with class times, bold athletic typography, clean UI design. Looks like a real designed website screenshot, 16:10 aspect."),
    ("proj-cafekoper.png",
     "High-fidelity desktop website homepage mockup for a cozy restaurant 'Café Koper'. Moody warm interior photography, dark navy background (#0C2340) with soft peach (#FFDAB9) accents, elegant serif headline, menu highlights section and a reservation button, refined editorial layout. Looks like a real designed website screenshot, 16:10 aspect."),
    ("proj-studionova.png",
     "High-fidelity desktop website homepage mockup for a creative studio portfolio 'Studio Nova'. Minimal avant-garde layout, oversized bold typography, dark theme with sky-blue (#87CEEB) accent lines, asymmetric project grid with abstract artwork thumbnails, generous negative space. Looks like a real designed website screenshot, 16:10 aspect."),
]


async def gen(name, prompt):
    chat = LlmChat(
        api_key=os.environ['EMERGENT_LLM_KEY'],
        session_id=f"modrn-{name}",
        system_message="You generate website mockup images.",
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
