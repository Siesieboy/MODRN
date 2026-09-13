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
- 2026-09-13: Echte foto's van Sies geïnstalleerd (hero + Over mij, /images/sies-1.webp en sies-2.webp). GitHub gekoppeld (https://github.com/Siesieboy). Nieuwe Diensten-sectie met 3 pakketten (One-Pager €499 / Business Site €999 uitgelicht / Webshop-Maatwerk €1.999 — vanaf-prijzen, door eigenaar bevestigd). Projecten vervangen door 4 AI-gegenereerde MODRN-conceptvoorbeelden (Bakkerij Van Dort, FitCentrum Lokaal, Café Koper, Studio Nova; /images/projects/*.png, modal vermeldt dat het concepten zijn). Navigatie uitgebreid met Diensten.
- 2026-09-13: Reviews-sectie toegevoegd (3 voorbeeldreviews met duidelijke "Voorbeeldreviews"-badge, lichte sectie tussen Diensten en Contact). Pakketkeuze in contactformulier: "Vraag aan"-knoppen in Diensten vullen het pakket-veld vooringevuld in; pakket wordt meegestuurd in e-mail en opgeslagen in DB. Sectienummering 01–06. Geverifieerd: e2e klik op Business Site → pakket vooringevuld → aanvraag verzonden; backend accepteert pakket-veld.

## Backlog
- P1: Echte klantreviews vervangen zodra beschikbaar (nu gemarkeerde voorbeelden)
- P1: LinkedIn en X URL's koppelen (nog placeholder-links)
- P1: Echte projecten/cases van MODRN toevoegen zodra beschikbaar
- P2: Blog, NL/EN-toggle, Reviews-link in navigatie

## Update 2026-09-13 (bevestigingsmail)
- Aanvragers krijgen nu automatisch een bevestigingsmail ("Bedankt voor je aanvraag — MODRN") met hun pakketkeuze en reactietijd. Mislukt de bevestiging, dan gaat de aanvraag zelf alsnog door (wordt gelogd). Geverifieerd met testverzending: beide mails verstuurd, geen fouten.

## Update 2026-09-13 (logo)
- Officieel MODRN-logo geïnstalleerd: witte achtergrond verwijderd (transparant PNG), volledige logo met tagline in de hero, alleen het MODRN-beeldmerk in de navigatie linksboven (/images/modrn-logo.png, /images/modrn-mark.png). Geverifieerd op desktop en mobiel.

