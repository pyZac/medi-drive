# LabLink — Implementation Plan

> Architecture and per-page spec. Read `context.md` first for the *why*. Read `todo.md` for the checkable task list.

---

## 1. Tech stack

| Concern        | Choice                                          |
| -------------- | ----------------------------------------------- |
| Framework      | Next.js 16 (App Router) + TypeScript            |
| Styling        | Tailwind CSS v4                                 |
| Components     | shadcn/ui 4.x — base-nova style, neutral colour |
| Icons          | lucide-react                                    |
| i18n           | next-intl (route-segment locales: `/en`, `/de`) |
| Forms          | react-hook-form + zod                           |
| Email          | Resend (via Next.js Route Handler)              |
| Spam control   | Honeypot field + per-IP rate limit              |
| Fonts          | `next/font` with one variable font (Inter)      |
| Hosting        | Vercel                                          |
| Node version   | 20 LTS                                          |
| Package mgr    | pnpm                                            |

No state library, no ORM, no database. Static-first; the only dynamic surface is the contact-form route handler.

## 2. Repository layout

```
medi-drive/
├── app/
│   ├── [locale]/
│   │   ├── layout.tsx              # locale-aware layout (header, footer, html lang/dir)
│   │   ├── page.tsx                # Home
│   │   ├── about/page.tsx
│   │   ├── services/page.tsx
│   │   ├── contact/page.tsx
│   │   ├── impressum/page.tsx      # legal — DE only content, route exists in both
│   │   └── datenschutz/page.tsx    # legal — DE only content, route exists in both
│   ├── api/
│   │   └── contact/route.ts        # POST handler → Resend
│   ├── sitemap.ts
│   ├── robots.ts
│   └── globals.css
├── components/
│   ├── ui/                          # shadcn-generated primitives
│   ├── layout/
│   │   ├── header.tsx
│   │   ├── footer.tsx
│   │   └── locale-switcher.tsx
│   ├── sections/
│   │   ├── hero.tsx
│   │   ├── service-highlights.tsx
│   │   ├── trust-badges.tsx
│   │   ├── how-it-works.tsx
│   │   └── cta.tsx
│   └── contact-form.tsx
├── i18n/
│   ├── routing.ts                   # next-intl routing config
│   ├── request.ts
│   └── messages/
│       ├── en.json
│       └── de.json
├── lib/
│   ├── env.ts                       # zod-validated env vars
│   ├── ratelimit.ts                 # in-memory or Upstash-backed
│   └── schemas/contact.ts           # shared zod schema (client + server)
├── public/
│   ├── og-image.png
│   └── logo.svg
├── scripts/
│   └── check-i18n.mjs               # CI key-parity guard (exits 1 if en/de keys differ)
├── tasks/
│   ├── context.md
│   ├── plan.md
│   ├── todo.md
│   └── lessons.md                   # created per claude.md after first correction
├── .env.example
├── .env.local                       # gitignored
├── proxy.ts                         # next-intl locale negotiation (Next.js 16: replaces middleware.ts)
├── next.config.ts
├── postcss.config.mjs               # Tailwind v4 config (no tailwind.config.ts)
├── tsconfig.json
└── package.json
```

## 3. Routing & i18n

- Default locale: `en`. Supported: `en`, `de`.
- URL strategy: `/en/...` and `/de/...`. Root `/` redirects to user's preferred locale (Accept-Language) with `en` fallback.
- Strings live in `i18n/messages/{locale}.json`. Page components read them via `useTranslations()` / `getTranslations()`.
- `<html lang>` set dynamically from the locale segment.
- Locale switcher preserves the current pathname.

## 4. Page specs

Each page: SSG by default (`export const dynamic = 'force-static'` only if needed). All pages include shared `<Header />` / `<Footer />` from the locale layout.

### 4.1 Home (`/[locale]`)

Sections, top to bottom:

1. **Hero** — H1 + sub-headline + primary CTA ("Contact us" → `/contact`) + secondary CTA ("Our services" → `/services`).
2. **Service highlights** — 3 cards: specimen transport, supply delivery, scheduled routes.
3. **Trust strip** — compliance / chain-of-custody / insured / trained-staff badges.
4. **How it works** (lightweight 3-step) — pickup → transit → delivery.
5. **Final CTA** — banner repeating contact link.

Metadata: locale-specific title/description, OG image, canonical.

### 4.2 About (`/[locale]/about`)

Sections: company mission, founding story (placeholder copy), team values, regulatory posture, contact CTA.

### 4.3 Services (`/[locale]/services`)

Detailed list of offerings. For each: short description, typical use case, what's included. Suggested items (subject to stakeholder confirmation):

- Diagnostic specimen transport (UN3373 / Cat. B)
- Routine inter-clinic sample runs
- Urgent / on-demand pickups
- Lab supplies and consumables delivery
- Temperature-controlled transport (if offered)

Each item rendered from a typed array — easy to extend in code.

### 4.4 Contact (`/[locale]/contact`)

- Left column: address, phone, email, hours (placeholders).
- Right column: `<ContactForm />` — fields below.
- Embedded map: **skip for v1** (defer until address confirmed; avoids Google Maps key + GDPR cookie banner).

**Form fields** (all required unless noted):

- Name
- Organisation (clinic / lab name)
- Email
- Phone (optional)
- Subject (select: General / Service quote / Partnership / Other)
- Message (textarea, min 20 chars)
- Honeypot `website` field (hidden, must be empty)
- Consent checkbox: "I agree to LabLink processing my data per the privacy policy" — required, links to `/datenschutz`.

Validation: `zod` schema shared between client (custom `react-hook-form` resolver — see L9 in `lessons.md`) and server (route handler).

### 4.5 Impressum (`/[locale]/impressum`) & Datenschutz (`/[locale]/datenschutz`)

Scaffolded with **clearly marked placeholders**. Will not go to production until stakeholder supplies real legal copy. Linked from footer on every page.

## 5. Contact form delivery

`app/api/contact/route.ts` (POST):

1. Parse JSON body, validate with the shared zod schema → 400 on failure.
2. Reject if honeypot field is non-empty (return fake 200 to confuse bots).
3. Rate-limit by IP (5 requests / hour). In-memory `Map` for v1; can swap to `@upstash/ratelimit` later without API change.
4. `resend.emails.send({ from: 'contact@<domain>', to: env.CONTACT_INBOX, replyTo: data.email, subject, html })`.
5. Return `{ ok: true }` on success, generic 500 on send failure (log details server-side only).

**Env vars** (validated lazily via `getEnv()` in `lib/env.ts` — called inside the route handler, not at module init, so `pnpm build` succeeds without `.env.local`. See L10 in `lessons.md`):

| Var                    | Purpose                                                          | Example                          |
| ---------------------- | ---------------------------------------------------------------- | -------------------------------- |
| `RESEND_API_KEY`       | Resend secret                                                    | `re_xxx...` (from Resend dashboard) |
| `CONTACT_INBOX`        | Recipient inbox for form submissions                             | `contact@lablink-courier.de`     |
| `CONTACT_FROM`         | Verified Resend sender (must be on a domain verified in Resend)  | `contact@lablink-courier.de` (or `noreply@lablink-courier.de`) |
| `NEXT_PUBLIC_SITE_URL` | Used for canonical URLs / sitemap                                | `https://lablink-courier.de`     |

Domain must be verified in Resend before production sends will deliver. Documented in `README` and reflected in `todo.md`.

## 6. SEO & metadata

- Per-route metadata via `generateMetadata`, localized.
- `app/sitemap.ts` enumerates routes × locales, sets `alternates.languages`.
- `app/robots.ts` allows all, references the sitemap.
- One OG image at `public/og-image.png` (1200×630), overridable per page later.
- `hreflang` tags via next-intl's metadata helpers.

## 7. Accessibility

- All shadcn primitives are accessible by default; preserve that (don't strip aria attributes).
- Colour contrast ≥ WCAG AA. Tailwind palette chosen with that in mind.
- All interactive elements reachable by keyboard; focus rings visible.
- Form errors announced via `aria-live="polite"`.
- Skip-to-content link in the layout.

## 8. Deployment

- Vercel project linked to the GitHub repo.
- Production branch: `main`. PRs auto-deploy to preview URLs.
- Env vars set in Vercel dashboard for Production + Preview (Preview uses a separate Resend sender or test inbox to avoid noisy real sends from previews).
- Custom domain: **`lablink-courier.de`** (locked, see `context.md` §4). Attached after Resend domain verification (SPF, DKIM, DMARC records added at the DNS provider).
- Recipient inbox: **`contact@lablink-courier.de`** (locked). Mailbox must exist at the email host before the form can deliver — prerequisite for Phase 4 end-to-end testing.

## 9. Risks & explicit tradeoffs

| Risk                                              | Mitigation                                                        |
| ------------------------------------------------- | ----------------------------------------------------------------- |
| Stakeholder hasn't supplied legal copy            | Build with clear placeholders; gate production launch on real copy. |
| Translations drift between EN and DE              | Single source of truth in `i18n/messages/`; CI check that keys match. |
| Contact-form abuse                                | Honeypot + rate limit + zod validation + Resend's own abuse filters. |
| Resend free tier limits                           | Adequate for v1 inbound contact volume; upgrade path exists.       |
| In-memory rate limit resets on Vercel cold starts | Acceptable for v1 volume; upgrade to Upstash if abuse seen.        |

## 10. Out of plan (deferred)

- Blog / news section.
- Service-area map.
- Client testimonials carousel.
- Analytics (will be added separately with a GDPR-compliant solution like Plausible or Vercel Analytics — both cookie-less).
- CMS integration.
- Live chat.

Each is a clean addition later; none are required for the v1 informative site.

---

## 12. Google Stitch "Velocity Precision" Full Implementation (Phase 10)

> Stakeholder directive after Phase 9 deploy: "just make it like google stitch." Supersedes the Phase 9 blue-600 palette with the true Velocity Precision design system. Source: `stitch_medi_drive_dynamic_ui_refresh/`.

### 12.0 Design system overview

| Token | Value | Usage |
|-------|-------|-------|
| `primary` | `#001e40` (deep navy) | Background of step circles, icon containers |
| `primary-container` | `#003366` | Header bg at rest, support-zentrum bg |
| `on-primary-container` | `#d6e4ff` | Text on navy bg |
| `secondary` | `#006875` (teal-dark) | Accent borders, step connector dots |
| `secondary-container` | `#00e3fd` (electric cyan) | CTA button bg, step 3 circle |
| `on-secondary-container` | `#001f24` | Text on cyan buttons |
| `surface` | `#f7f9fb` | Page background |
| `surface-container-low` | `#f2f4f6` | Section backgrounds (trust, how-it-works) |
| `on-surface` | `#191c1e` | Body text |
| `on-surface-variant` | `#44474a` | Subtext, captions |
| `outline-variant` | `#c4c7ca` | Card borders |

Font: **Plus Jakarta Sans** (already loaded via `next/font/google` in `app/[locale]/layout.tsx` as `--font-sans` variable).

### 12.1 globals.css additions

1. **Fix `--primary` CSS var** — change to `oklch` equivalent of `#001e40` (true Stitch primary, not `#003366`).
2. **Add full token set to `@theme inline`** — so `bg-secondary-container`, `text-on-surface-variant`, `bg-primary-container`, etc. become Tailwind utility classes.
3. **Add utility CSS classes** (from Stitch HTML `<style>` blocks):
   - `.velocity-gradient-bg` — animated 4-stop diagonal gradient (15s infinite loop)
   - `.velocity-gradient` — static 135deg linear from navy to cyan
   - `.btn-glow` — cyan box-shadow on hover + `translateY(-2px)`
   - `.magnetic-card` — cubic-bezier lift + scale + cyan border on hover
   - `.pulse-icon` — 3s scale-pulse animation
   - `.step-line::after` — dotted cyan connector (hidden on mobile, visible on md+)
   - `.hero-links-overlay` — radial-gradient dot particle pattern (fades to transparent bottom)
   - `.glass-card` — `rgba(255,255,255,0.7)` + `backdrop-filter: blur(12px)` + subtle border
   - `.reveal` / `.reveal.active` — opacity+translateY, triggered by IntersectionObserver JS (replaces CSS scroll-driven version)
   - `@keyframes gradient-shift`, `@keyframes fadeInUp`, `@keyframes pulse-soft`

### 12.2 layout.tsx additions

```tsx
// Google Fonts link (in <head>)
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" rel="stylesheet" />

// IntersectionObserver script (before </body>)
<script dangerouslySetInnerHTML={{ __html: `
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('active'); observer.unobserve(e.target); } });
  }, { threshold: 0.1 });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
` }} />

// Header scroll script
<script dangerouslySetInnerHTML={{ __html: `
  window.addEventListener('scroll', () => {
    const h = document.querySelector('header');
    if (!h) return;
    h.classList.toggle('scrolled', window.scrollY > 50);
  });
` }} />
```

### 12.3 Homepage sections (translate from `lablink_animated_energetic_redesign/code.html`)

**hero.tsx**:
- `relative overflow-hidden velocity-gradient-bg` outer section
- `hero-links-overlay` absolutely positioned particle overlay
- 2-col grid (`lg:grid-cols-2`) — text col left, image col right
- Text: "SCHNELL. SICHER. ZUVERLÄSSIG." badge chip (`bg-secondary-container/20 text-secondary-container`), H1, subtext, 2 CTA buttons (`btn-glow`)
- Right col: `<Image>` of AI lab scene + floating card (`bg-white/10 backdrop-blur border border-white/20`) with `pulse-icon` check icon + "Pünktlich geliefert" stat

**service-highlights.tsx**:
- `bg-surface` section
- H2 with cyan underline decoration (`after:content-[''] after:block after:w-16 after:h-1 after:bg-secondary-container after:mt-3`)
- 3 `magnetic-card` cards: `bg-surface border border-outline-variant rounded-xl p-6`
- Material Symbols icons in `bg-primary/10 text-primary rounded-full p-3` wrappers with `pulse-icon`
- Card title hover: `group-hover:text-secondary transition-colors`

**trust-badges.tsx**:
- `bg-surface-container-low` section
- Centered heading "Warum LabLink?" + 4-col grid
- Each badge: `bg-white rounded-2xl p-6 text-center shadow-sm border border-outline-variant/30`
- Material Symbols in `bg-primary rounded-full p-3 text-white` with `pulse-icon`

**how-it-works.tsx**:
- `bg-surface` section
- H2 with cyan underline
- 3-col grid, each step: `relative` container with `step-line::after` on first two items (md+)
- Step circle: `bg-primary text-white w-12 h-12 rounded-full` for steps 1–2, `bg-secondary-container text-on-secondary-container` for step 3 (completion highlight)

**cta.tsx**:
- `velocity-gradient-bg rounded-[2rem] mx-6 lg:mx-auto max-w-5xl` inner card inside a `py-20 px-6` outer section
- Texture overlay: absolutely-positioned div with an inline backgroundImage style pointing to a noise/cubes texture, at 5% opacity
- H2 + subtext in white, `btn-glow bg-secondary-container text-on-secondary-container` CTA button

### 12.4 Contact page (translate from `kontakt_lablink_medical_logistics/code.html`)

Apply Stitch visuals while **preserving the existing functional `<ContactForm />` component** (Zod, react-hook-form, honeypot, rate-limit, Resend).

- Top hero: `velocity-gradient` bg, "KONTAKT" badge chip, display headline
- Contact grid: left col = info cards (address/phone/email with Material Symbols + `bg-secondary-fixed-dim/30` icon wrappers), right col = `glass-card` wrapping `<ContactForm />`
- Apply Stitch input styles to form inputs via `className` overrides (still functional)
- Support-Zentrum section: `bg-primary-container py-20`, 3 glassmorphism dept cards (Probenlogistik, Medizintechnik, Notfallkurier)
- FAQ section: `<details>/<summary>` accordion with `rotate-180` chevron animation on open

### 12.5 About page (reconstruct from `ber_uns_lablink_medical_logistics/screen.png`)

- Hero: 2-col, "ÜBER UNS" badge chip, `velocity-gradient-bg` bg, H1 "Logistik, die Leben rettet", subtext, primary CTA
- "Exzellenz durch Expertise": 3 feature `magnetic-card` cards (Medizinische Fachkenntnis, Vernetzte Plattform, Qualitätssicherung)
- Dark full-width feature: `bg-primary py-20`, "Technologie-getriebene Sicherheit" headline + image overlay, 3 stat chips
- Compliance badges: ISO-Zertifiziert, Kühlketten-Garantie, DSGVO badges in a 3-col strip
- Navy CTA: `velocity-gradient-bg rounded-[2rem]` card, "Bereit für die Zukunft der Kliniklogistik?" headline

### 12.6 Services page (reconstruct from `unsere_leistungen_lablink_medical_logistics/screen.png`)

- Hero: `velocity-gradient-bg`, "Präzision in jeder Sekunde" headline, `btn-glow bg-secondary-container` CTA
- "Unsere Kernleistungen": 3 `magnetic-card` cards (Probenlogistik, Medizintechnik, On-Demand)
- Temperature section: full-width `bg-primary` with image overlay, "Temperatursicherheit ohne Kompromisse"

### 12.7 Header + Footer

**header.tsx**:
- `fixed top-0 w-full z-50` positioning (was `sticky`)
- `.scrolled` JS class: `h-16` (shrinks from `h-20`) + `shadow-lg`
- Logo: `text-primary font-bold text-xl`
- Nav links: `text-on-surface-variant hover:text-on-surface`, active item `text-secondary border-b-2 border-secondary`
- CTA button: `bg-secondary-container text-on-secondary-container rounded-full px-5 py-2 btn-glow`

**footer.tsx**:
- `bg-primary-container text-on-primary-container`
- 2-col: logo + tagline left, nav grid right
- Bottom bar: copyright + legal links

---

## 11. Visual Design (Phase 9 — added after v1 deploy feedback)

> Stakeholder feedback after Vercel deploy: the site looks "too basic — only white and black, no photos or animations or colors." Phase 9 addresses this.

### 11.1 Colour palette

The current palette is achromatic (all `oklch` values have `0` chroma). Replace with a professional medical-blue palette. Apply changes **only in `app/globals.css`** — all components already consume CSS vars so no component files need colour edits.

Target token values (`light` mode):

| Token | Current (grayscale) | New (medical blue) | Notes |
|-------|--------------------|--------------------|-------|
| `--primary` | `oklch(0.205 0 0)` — near-black | `oklch(0.55 0.20 243)` — blue-600 | Brand blue; CTAs, step circles, icon colour |
| `--primary-foreground` | `oklch(0.985 0 0)` | unchanged — white | Fine as-is |
| `--ring` | `oklch(0.708 0 0)` | `oklch(0.55 0.20 243)` | Match primary so focus rings are blue |
| `--muted` | `oklch(0.97 0 0)` | `oklch(0.965 0.01 240)` | Faint blue tint on section backgrounds |
| `--muted-foreground` | `oklch(0.556 0 0)` | `oklch(0.50 0.04 240)` | Slightly blue-shifted for warmth |
| `--accent` | `oklch(0.97 0 0)` | `oklch(0.62 0.14 194)` — teal | Accent colour for badges, highlights |
| `--accent-foreground` | `oklch(0.205 0 0)` | `oklch(0.985 0 0)` — white | White on teal accent |
| `--border` | `oklch(0.922 0 0)` | `oklch(0.91 0.02 240)` | Subtle blue-tinted border |

> WCAG AA contrast must be maintained. Verify blue-on-white (`--primary` on `--background`) — blue-600 on white is ~4.6:1, passing AA for normal text and large text.

### 11.2 Section background system

Replace the current flat alternating `bg-background` / `bg-muted/40` with a richer system:

| Section | Background treatment |
|---------|---------------------|
| Hero | Dark: `bg-gradient-to-br from-slate-900 via-blue-950 to-blue-900` + white text. Optionally overlay a hero photo (`public/images/hero-bg.jpg`) with `bg-cover bg-center` and a `bg-black/50` overlay for legibility. |
| Service Highlights | `bg-gradient-to-b from-slate-50 to-white` — very subtle |
| Trust Badges | `bg-blue-50` (light brand blue tint) |
| How It Works | `bg-white` |
| CTA Banner | `bg-gradient-to-r from-blue-700 to-teal-600` — brand gradient |
| About sections | Alternate `bg-white` and `bg-slate-50` |
| Services page | `bg-white` with cards that have `hover:shadow-lg hover:border-blue-200 transition-all` |
| Contact page | `bg-slate-50` outer, white card inner |
| Impressum / Datenschutz | `bg-white` — legal pages stay plain |

### 11.3 Images

Three options in priority order — choose one or combine:

**Option A (recommended): Pexels/Unsplash free stock download**
- Download 2–3 high-quality images to `public/images/` and reference via Next.js `<Image>` component.
- Suggested queries: "medical laboratory samples", "clinic courier delivery", "lab technician".
- Pexels is fully free with no attribution required for commercial use.
- Use `<Image src="/images/hero-bg.jpg" alt="..." fill className="object-cover" />` inside a `relative` wrapper with a dark overlay `<div>`.

**Option B: AI-generated images via Higgsfield MCP tool**
- The session environment has `mcp__claude_ai_Higgsfield__generate_image` available.
- Generate: professional medical courier handing samples to a lab technician, photo-realistic, clean, bright, clinic interior.
- Save the returned image URL / blob to `public/images/`.
- This produces unique brand-appropriate imagery without licensing concerns.

**Option C: CSS-only visuals (no images)**
- Use the gradient section backgrounds + large SVG icons/illustrations instead of photos.
- Adds colour and depth without any image files.
- Simplest to implement; weakest visual impact.

Regardless of option, also regenerate `public/og-image.png` (currently a solid dark-navy placeholder) to include the brand name with the new colour palette.

### 11.4 Animations

`tw-animate-css` is **already imported** in `globals.css`. No new dependency needed for basic entrance animations.

**Scroll-reveal pattern** (no JS, no extra deps):

Use CSS Scroll-Driven Animations (`animation-timeline: view()`) with a utility class defined in `globals.css`:

```css
@layer utilities {
  .reveal {
    animation: fade-in-up linear both;
    animation-timeline: view();
    animation-range: entry 0% entry 30%;
  }
}
```

Apply `className="reveal"` to section headings, card grids, and step lists. Degrades gracefully in older browsers (elements are visible by default).

**Hover micro-interactions** (Tailwind only):
- Cards: `hover:shadow-lg hover:-translate-y-1 transition-all duration-200`
- Buttons: already have transitions from shadcn; ensure primary button has `hover:bg-blue-700` after palette change
- Trust badge icons: `group-hover:scale-110 transition-transform`
- Nav links: `relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-primary hover:after:w-full after:transition-all` (underline slide)

**For richer animations** (if the CSS-only approach feels insufficient):
- Add `framer-motion` (`pnpm add framer-motion`).
- Wrap section children in `<motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} viewport={{ once: true }}>`.
- All animated elements must be in Client Components (`'use client'`) or wrapped with a `<MotionWrapper>` client component.

### 11.5 Header polish

- Add a background blur that activates on scroll: start transparent, transition to `bg-background/95 backdrop-blur-md` after 50px scroll. This requires a small Client Component wrapper or a CSS scroll-driven trick.
- Current header already has `sticky top-0` + `backdrop-blur` — just needs the scroll-opacity trigger.

### 11.6 Files to change

| File | Change |
|------|--------|
| `app/globals.css` | Redefine CSS vars (§11.1) + add `.reveal` utility (§11.4) |
| `components/sections/hero.tsx` | Dark gradient background + optional hero image + white text |
| `components/sections/service-highlights.tsx` | Section bg + card hover states |
| `components/sections/trust-badges.tsx` | `bg-blue-50` section + accent-coloured icons |
| `components/sections/how-it-works.tsx` | Step number circles will auto-update from `--primary` change |
| `components/sections/cta.tsx` | Replace `bg-primary` with brand gradient |
| `components/layout/header.tsx` | Nav link underline animation; scroll-opacity if desired |
| `app/[locale]/about/page.tsx` | Add hero image + richer section bgs |
| `app/[locale]/services/page.tsx` | Card hover states |
| `public/images/` | Add hero-bg.jpg and any supporting images |
| `public/og-image.png` | Regenerate with colour palette |

> **Do NOT** change `app/api/contact/route.ts`, `lib/env.ts`, `lib/ratelimit.ts`, `lib/schemas/contact.ts`, `app/sitemap.ts`, or `app/robots.ts` — those are functional files, not visual.
