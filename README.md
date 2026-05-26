# LabLink — Website

Specialised medical sample transport for clinics and laboratories in Germany.

Static, bilingual (German primary / English secondary) website. No backend, no framework — pure HTML/CSS/JS. Hosted on Vercel, contact form handled by Formspree.

---

## Project structure

```
lablink/
├── index.html          # Home
├── about.html          # About us
├── services.html       # Services
├── process.html        # How it works + FAQ
├── contact.html        # Contact + form
├── css/style.css       # Design system + all components
├── js/translations.js  # DE + EN translation strings
├── js/main.js          # Nav, mobile menu, FAQ, form, reveals
├── vercel.json         # Hosting config (clean URLs, headers, cache)
├── robots.txt
└── README.md
```

---

## Before going live — placeholders to fill in

The site contains placeholders that must be replaced with real client data. Search and replace **inside `js/translations.js`** (both `de` and `en` blocks):

### Contact details
| Key | Placeholder | Replace with |
|---|---|---|
| `contact.info.address.value` | `___________________\n_____ ___________` | Street, postcode, city |
| `contact.info.phone.value` | `+49 (0) ___ _______` | Main phone |
| `contact.info.emergency.value` | `+49 (0) ___ _______` | 24/7 hotline |
| `contact.info.email.value` | `kontakt@____.de` | Real email |
| `home.cta.btn2` | `+49 (0) ___ _______` | CTA banner phone (same as main) |

### Team names (`about.html` section)
| Key | Replace |
|---|---|
| `about.team.1.name` … `about.team.4.name` | Real names of MD, Ops Lead, QA Lead, Customer Service |

### Footer phone/email
Already pulls from the same keys above — no separate edit needed.

### Legal pages
`Impressum`, `Datenschutz`, `AGB` links in the footer currently point to `#`. Either build separate `imprint.html`, `privacy.html`, `terms.html` pages or update the `href` to wherever you host them.

---

## Contact form (Formspree)

The form on `contact.html` posts to Formspree.

1. Create a free account at https://formspree.io
2. Create a new form, choose the destination email
3. Copy the form endpoint (looks like `https://formspree.io/f/xqkrabcd`)
4. In `contact.html`, find this line:
   ```html
   <form id="contact-form" action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
   ```
   Replace `YOUR_FORM_ID` with the actual endpoint suffix.
5. First submission triggers Formspree's email verification — confirm it.

The form already includes:
- Honeypot field (`_gotcha`) for basic spam protection
- Client-side validation (required fields)
- Bilingual success/error messages
- Loading state handled in `js/main.js`

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

### Custom domain (Hostinger)
1. In Vercel → Project → Settings → Domains → add `lablink.de` (and `www.lablink.de`)
2. Vercel shows the required DNS records (A record `76.76.21.21` and/or CNAME `cname.vercel-dns.com`)
3. In Hostinger → Domains → DNS → add the records exactly as Vercel specifies
4. Wait for DNS propagation (5 min – 24 h). Vercel issues SSL automatically.

---

## Language switching

- Default load language is **German** (`<html lang="de">` and `localStorage` fallback)
- Toggle in the navbar (DE / EN buttons)
- Preference saved to `localStorage` as `lablink-lang`
- All visible strings flow through `data-i18n` attributes — never hardcode visible text in the HTML; always add a new key to `js/translations.js` first

---

## Compliance content notes

The site emphasises three credibility pillars relevant to medical sample transport in Germany:

- **GDP** — EU Good Distribution Practice guidelines (2013/C 343/01)
- **ADR Class 6.2** — Dangerous goods agreement for infectious substances (UN3373 for routine diagnostic specimens, UN2814 for Category A)
- **ISO 9001** and **GDPR (DSGVO)** — quality and data protection

These are mentioned multiple times across home, services, and process pages. If the client's actual certifications differ, edit the four `home.compliance.*` keys in `js/translations.js`.

---

## Images

All images are loaded from Unsplash CDN — no local image files in the repo. If the client supplies real photography (vehicles, team, facility), upload to a CDN or replace inline `<img src="...">` URLs.

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

## Performance

- No frameworks, no bundlers — sub-100 KB transferred on first load (excluding images)
- Fonts loaded via Google Fonts with `preconnect`
- CSS and JS aggressively cached via `vercel.json` headers
- All images use `loading="eager"` for hero, otherwise default lazy

---

© LabLink. All rights reserved.
