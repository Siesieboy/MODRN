# PRD — MODRN website building & design (Sies Pasteuning)

## Origineel probleemstatement (NL)
Portfolio website met: Header/Nav (logo, links Over mij/Projecten/Vaardigheden/Contact, mobiel hamburger-menu), Hero (donker #0C2340, titel, subtitel, intro, CTA's #FFDAB9 en #87CEEB), Over Mij (licht #F5F5F5, 2-koloms), Projecten (grid, kaarten met tags), Vaardigheden (cards/skill-bars), Contact (donker, formulier Naam/E-mail/Bericht, verzendknop #FFDAB9, socials), Footer (© 2026). Whitespace, modern sans-serif, smooth scrolling, hover-effecten.

## Bedrijfsgegevens
- Eigenaar: Sies Pasteuning
- Bedrijf: MODRN website building & design
- Doel: bezoekers kunnen custom websites en designs aanvragen via het contactformulier
- Ontvangstadres aanvragen: siespasteuning@icloud.com

## Gebruikerskeuzes
- Lettertype: moderne verrassing → Outfit (display) + Plus Jakarta Sans (body) + JetBrains Mono (labels)

## Architectuur
- Frontend: React 19 + Tailwind + framer-motion (scroll reveals, masked hero reveal, tilt-kaart) + lenis (smooth scrolling) + sonner (toasts)
- Backend: FastAPI, POST /api/contact (validatie, rate limit 5/10min, MongoDB opslag, e-mail via Emergent-managed Resend proxy, from_name "MODRN website building & design")
- Database: MongoDB collectie `contact_messages`

## User persona's
- Potentiële klant: bekijkt werk en vraagt een custom website/design aan
- Eigenaar (Sies): ontvangt aanvragen per e-mail

## Geïmplementeerd
- 2026-09-13: Volledige site v1 — kinetische hero met line-reveal + 3D tilt portret, editorial marquee, Over Mij met manifesto-hoofdstukken, projecten-grid met detail-modal, skill-tabs met geanimeerde bars, werkend contactformulier (DB + e-mail), footer. Geverifieerd e2e.
- 2026-09-13: Rebrand naar MODRN / Sies Pasteuning — echte naam overal ingevuld, copy herschreven rond custom website-aanvragen, e-mailbranding naar MODRN, CTA "Vraag een website aan". Geverifieerd: e-mailverzending met nieuwe branding, e2e aanvraagflow.

## Backlog
- P0: Echte portretfoto en projectafbeeldingen van Sies vervangen (nu stock)
- P1: Echte social media URL's koppelen (nu placeholder-links)
- P1: Echte projecten/cases van MODRN tonen
- P2: Diensten/pakketten-sectie met prijzen, blog, NL/EN-toggle

