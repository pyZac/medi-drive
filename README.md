# LabLink — Website

Specialised medical sample, medical material and pharmaceutical transport for clinics, laboratories and pharmacies in the Koblenz region (100 km radius).

Static, bilingual (German primary / English secondary) website. No backend, no framework — pure HTML/CSS/JS. Hosted on Vercel, contact form handled by **Web3Forms**.

---

## Live contact details (already wired in)

- **Address**: Von-Bodelschwingh Straße 10A, 56626 Andernach
- **Phone**: +49 1522 4438655 (also 24/7 emergency hotline)
- **Email**: contact@lablink-courier.de
- **Domain**: lablink-courier.de
- **Service area**: Koblenz region + 100 km radius

All values are stored in `js/translations.js` under the `contact.info.*` keys (both `de` and `en` blocks).

---

## Project structure

```
lablink/
├── index.html          # Home
├── about.html          # About us
├── services.html       # Services (7 services incl. medicine transport)
├── process.html        # How it works + FAQ
├── contact.html        # Contact + form (Web3Forms)
├── css/style.css       # Design system + all components
├── js/translations.js  # DE + EN translation strings
├── js/main.js          # Nav, mobile menu, FAQ, form, reveals
├── vercel.json         # Hosting config (clean URLs, headers, cache)
├── robots.txt
└── README.md
```

---

## Contact form (Web3Forms)

The form on `contact.html` posts to Web3Forms. **Already wired** with the access key `2b272f4e-ac36-4244-a09e-d291cdde2291`.

No further setup required — submissions will be delivered to the email registered with that access key on https://app.web3forms.com.

Form fields submitted:
- `name` — submitter's name
- `organization` — clinic / pharmacy / facility
- `email` — required
- `phone` — optional
- `subject` — one of: quote, routine, emergency, medicine, other
- `message` — free text
- `botcheck` — honeypot (Web3Forms standard)
- `from_name` = `LabLink Website` (sender label in delivered email)

To change the recipient or access key, edit the hidden inputs at the top of `<form id="contact-form">` in `contact.html`.

---

## Deployment to Vercel

### Option A — Vercel CLI
```bash
npm i -g vercel
cd lablink
vercel        # follow prompts, link to project
vercel --prod # deploy production
```

### Option B — Git integration (recommended)
1. Push the folder to a GitHub repo
2. In Vercel dashboard → "New Project" → import the repo
3. Framework preset: **Other**
4. Build command: *(leave empty)*
5. Output directory: *(leave empty — uses repo root)*
6. Deploy

### Custom domain — lablink-courier.de (Hostinger)
1. In Vercel → Project → Settings → Domains → add `lablink-courier.de` AND `www.lablink-courier.de`
2. Vercel will show the DNS records needed. Typically:
   - Apex `lablink-courier.de` → A record `76.76.21.21`
   - `www.lablink-courier.de` → CNAME `cname.vercel-dns.com`
3. In Hostinger → Domains → DNS / Nameservers → add those records exactly as Vercel specifies (delete conflicting A/CNAME records)
4. Wait 5 min – 24 h for propagation. Vercel issues SSL automatically.

---

## Services on this site

1. **Bluttransporte** zwischen Klinik und Labor (blood samples)
2. **Notfall- und STAT-Transporte** (emergency / STAT, 24/7, <60 min response)
3. **Gewebeproben & Biopsien** (tissue, histology, cytology)
4. **Mikrobiologische Proben** (cultures, swabs, urine)
5. **Tiefkühltransporte** (-20 °C / -80 °C, dry ice)
6. **Regelmäßige Routenfahrten** (fixed routes, fixed driver)
7. **Medikamententransport für Apotheken (Subunternehmer)** — NEW. Transport of medicines to pharmacies in the Koblenz region as a subcontractor, GDP-compliant.

---

## Language switching

- Default load language is **German** (`<html lang="de">` and `localStorage` fallback)
- Toggle in the navbar (DE / EN buttons)
- Preference saved to `localStorage` as `lablink-lang`
- All visible strings flow through `data-i18n` attributes — never hardcode visible text in the HTML; always add a new key to `js/translations.js` first

---

## Compliance content

The site emphasises three credibility pillars relevant to medical & pharmaceutical transport in Germany:

- **GDP** — EU Good Distribution Practice guidelines (2013/C 343/01) — relevant for both diagnostic samples and pharmacy supply
- **ADR Class 6.2** — Dangerous goods agreement for infectious substances (UN3373 for routine diagnostic specimens, UN2814 for Category A)
- **ISO 9001** and **GDPR (DSGVO)** — quality and data protection

If the client's actual certifications differ, edit the four `home.compliance.*` keys in `js/translations.js`.

---

## Images

All images are loaded from Unsplash CDN — no local image files in the repo. If real photography becomes available (vehicles, team, the Andernach facility), upload to a CDN or replace inline `<img src="...">` URLs.

The microbiology image (service #4) and route service image (service #6) were corrected in this revision to be topic-accurate.

---

## Browser support

Modern evergreen browsers (Chrome, Firefox, Safari, Edge, last 2 versions). Uses `IntersectionObserver`, CSS custom properties, `backdrop-filter`. No build step, no polyfills.

---

## Mobile

Fully responsive. Tested breakpoints: 320, 375, 414, 768, 1024, 1280, 1440.
- Hamburger menu activates ≤768 px
- `html` and `body` are locked to `overflow-x: hidden` / `max-width: 100vw` to prevent horizontal scroll
- The "Angebot anfordern" button in the navbar is hidden on mobile via `.desktop-only`

---

## Optional legal pages

`Impressum`, `Datenschutz`, `AGB` links in the footer currently point to `#`. Either build separate `imprint.html`, `privacy.html`, `terms.html` pages or update the `href` to wherever they are hosted. German law (TMG §5) requires an Impressum for commercial sites.

---

© LabLink. All rights reserved.
