# PRD — Persoonlijke Portfolio Website ([Jouw Naam])

## Origineel probleemstatement (NL)
Portfolio website met: Header/Nav (logo, links Over mij/Projecten/Vaardigheden/Contact, mobiel hamburger-menu), Hero (donker #0C2340, titel, subtitel, intro, CTA's #FFDAB9 en #87CEEB), Over Mij (licht #F5F5F5, 2-koloms), Projecten (grid, kaarten met tags), Vaardigheden (cards/skill-bars), Contact (donker, formulier Naam/E-mail/Bericht, verzendknop #FFDAB9, socials), Footer (© 2026). Whitespace, modern sans-serif, smooth scrolling, hover-effecten.

## Gebruikerskeuzes
- Naam letterlijk als placeholder "[Jouw Naam]" getoond (gebruiker vult zelf in)
- Contactformulier slaat berichten op én verstuurt e-mail naar siespasteuning@icloud.com
- Lettertype: moderne verrassing → Outfit (display) + Plus Jakarta Sans (body) + JetBrains Mono (labels)

## Architectuur
- Frontend: React 19 + Tailwind + framer-motion (scroll reveals, masked hero reveal, tilt-kaart) + lenis (smooth scrolling) + sonner (toasts)
- Backend: FastAPI, POST /api/contact (validatie, rate limit 5/10min, MongoDB opslag, e-mail via Emergent-managed Resend proxy)
- Database: MongoDB collectie `contact_messages`

## User persona's
- Bezoeker/recruiter: bekijkt werk en stuurt bericht
- Eigenaar ([Jouw Naam]): ontvangt berichten per e-mail

## Geïmplementeerd
- 2026-09-13: Volledige site v1 — kinetische hero met line-reveal + 3D tilt portret, editorial marquee, Over Mij met manifesto-hoofdstukken, projecten-grid met detail-modal, skill-tabs met geanimeerde bars, werkend contactformulier (DB + e-mail), footer met status-indicator. Geverifieerd: e2e formulierinzending, e-mail aflevering (email_id), validatie-fouten, alle secties via screenshots.

## Backlog
- P0: Echte naam, foto's en teksten van de eigenaar invullen (nu placeholders)
- P1: Echte social media URL's koppelen (nu github.com/linkedin.com/x.com homepages)
- P1: Echte projecten met eigen beelden en live-links
- P2: Blog-sectie, dark/light toggle, meertaligheid (NL/EN)
