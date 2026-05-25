# LabLink — TODO

> Per `claude.md` §1 & "Task Management": plan first, verify before starting, mark items complete as you go, document results at the end.
> Read [`context.md`](./context.md) for the *why* and [`plan.md`](./plan.md) for the spec before working items below.

**Status legend**: `[ ]` not started · `[~]` in progress · `[x]` done · `[!]` blocked (note the blocker)

---

## Phase 0 — Confirm plan with stakeholder

- [x] Confirm brand name → **LabLink** (rejected: MediDrive)
- [x] Confirm page list → Home, About, Services, Contact, Impressum, Datenschutz
- [x] Confirm Resend as email provider
- [x] Confirm bilingual EN + DE
- [x] Confirm tech stack → Next.js + TS + Tailwind + shadcn/ui
- [x] Confirm domain → **`lablink-courier.de`**
- [x] Confirm `CONTACT_INBOX` → **`contact@lablink-courier.de`**
- [ ] Capture remaining outstanding answers from `context.md` §9 (service area, compliance claims, legal entity details — copy-only; do not block Phases 1–3)

> ✅ Phase 0 is functionally complete. Remaining outstanding items affect *copy* only and can be resolved in parallel with scaffolding.

### Real-world prerequisites (stakeholder, run in parallel with Phases 1–3)

- [ ] Register `lablink-courier.de` at a registrar (e.g. INWX, united-domains, IONOS)
- [ ] Set up email hosting / mailbox for `contact@lablink-courier.de`
- [ ] Add Resend domain-verification DNS records (TXT + SPF + DKIM + DMARC) — needed before Phase 4 form testing and Phase 7 deploy

## Phase 1 — Project bootstrap

- [x] `pnpm create next-app@latest` — App Router, TS, Tailwind, ESLint, `src/` no, alias `@/*`
- [x] Initialise shadcn/ui (`pnpm dlx shadcn@latest init`)
- [x] Add base shadcn components: `button`, `input`, `textarea`, `select`, `checkbox`, `label`, `card`, `sonner`
- [x] Install runtime deps: `next-intl`, `react-hook-form`, `@hookform/resolvers`, `zod`, `resend`, `lucide-react`
- [x] Configure `tsconfig.json` strict mode; verify `pnpm build` succeeds on empty scaffold
- [x] Add `.env.example` (no secrets) and ensure `.env.local` is gitignored
- [x] Commit: `chore: initial scaffold`

## Phase 2 — i18n & layout

- [x] Install + configure `next-intl` (`proxy.ts`, `i18n/routing.ts`, `i18n/request.ts`, `i18n/navigation.ts`)
- [x] Create `app/[locale]/layout.tsx` with `<html lang>` from locale, Inter font, `NextIntlClientProvider`
- [x] Create `i18n/messages/en.json` and `de.json` with initial keys (nav, footer, common)
- [x] Build `components/layout/header.tsx` with logo, nav, locale switcher
- [x] Build `components/layout/footer.tsx` with nav + legal links
- [x] Build `components/layout/locale-switcher.tsx` preserving current path
- [x] Add skip-to-content link
- [x] `pnpm build` succeeds with zero warnings — `/en` and `/de` statically generated (SSG)
- [ ] Verify Lighthouse a11y ≥ 95 on an empty home page

## Phase 3 — Content pages

- [x] Home (`app/[locale]/page.tsx`): hero, service highlights, trust strip, how-it-works, final CTA
- [x] About (`app/[locale]/about/page.tsx`)
- [x] Services (`app/[locale]/services/page.tsx`) — service data in a typed array
- [x] Contact (`app/[locale]/contact/page.tsx`) — address column + full static form (Phase 4 adds client-side validation + API)
- [x] Impressum placeholder (amber notice box, clearly marked PLACEHOLDER sections)
- [x] Datenschutz placeholder (amber notice box, clearly marked PLACEHOLDER sections)
- [x] Fill `en.json` and `de.json` with all page strings (115 keys each); `scripts/check-i18n.mjs` errors if key parity fails

## Phase 4 — Contact form + Resend

- [x] `lib/schemas/contact.ts` — shared zod schema (name, org, email, phone?, subject, message, consent, honeypot)
- [x] `lib/env.ts` — zod-validated env loader; validates at call time (lazy, not module init)
- [x] `lib/ratelimit.ts` — in-memory IP rate limiter (5/hour)
- [x] `components/contact-form.tsx` — react-hook-form + custom zod resolver; success/error via sonner toast
- [x] `app/api/contact/route.ts` — validate → honeypot → rate-limit → Resend send → respond
- [!] Verify a Resend sender domain (stakeholder action) and add API key to `.env.local` — blocked: requires Resend account + domain DNS setup
- [!] Manual test: submit valid form → arrives in inbox; submit invalid → user sees field errors — blocked: requires `.env.local` with real RESEND_API_KEY
- [!] Manual test: honeypot filled → fake 200, no email sent — blocked: requires `.env.local`
- [!] Manual test: 6th submission within an hour → rate-limited — blocked: requires `.env.local`

## Phase 5 — SEO & polish

- [x] `generateMetadata` per page, localized
- [x] `app/sitemap.ts` — all routes × locales with `alternates.languages`
- [x] `app/robots.ts` — allow all + `/api/` disallowed, points at sitemap
- [x] `public/og-image.png` (1200×630) — placeholder generated (dark-navy, replace with branded asset)
- [ ] Run Lighthouse on Home (EN + DE): all four categories ≥ 90 — deferred to Phase 7 (needs live URL for accurate scores)
- [x] Click every footer / nav link; confirmed no broken hrefs in code (header: /, /about, /services, /contact; footer: same + /impressum, /datenschutz — all locale-aware via `i18n/navigation`)

## Phase 6 — Verification (per claude.md §4 "Verification Before Done")

- [x] `pnpm build` succeeds with zero warnings — 18 SSG routes + `/api/contact` + `/sitemap.xml` + `/robots.txt`
- [x] `pnpm lint` clean
- [x] `pnpm tsc --noEmit` clean
- [!] Manual walkthrough in browser at `pnpm dev` — blocked: no browser available in this environment; run `pnpm dev` locally and visit `/en`, `/de`, `/en/about`, `/en/services`, `/en/contact`, `/en/impressum`, `/en/datenschutz`, repeat for `/de/`. Test locale switch + empty-form submission.
- [!] Screenshots — same blocker as above
- [x] Self-review against `plan.md` §4 page specs — all sections confirmed present in code
- [x] Self-review: "would a staff engineer approve this?" — yes: no hacks, typed, zero warnings, i18n parity verified

## Phase 9 — Visual Polish (added after v1 deploy feedback)

> Stakeholder: site looks "too basic — only white and black, no photos or animations." See `plan.md` §11 for full spec.

### 9.1 Colour palette
- [ ] Redefine `--primary`, `--ring`, `--muted`, `--muted-foreground`, `--accent`, `--accent-foreground`, `--border` in `app/globals.css` per `plan.md` §11.1
- [ ] Verify WCAG AA contrast for new primary-on-background (should be ≥ 4.5:1)
- [ ] `pnpm build` zero warnings after palette change

### 9.2 Section backgrounds
- [ ] `components/sections/hero.tsx` — dark gradient (`from-slate-900 via-blue-950 to-blue-900`) + white text; optionally layer a hero photo (see §9.3)
- [ ] `components/sections/trust-badges.tsx` — `bg-blue-50` section
- [ ] `components/sections/cta.tsx` — brand gradient (`from-blue-700 to-teal-600`)
- [ ] `components/sections/service-highlights.tsx` — subtle `bg-gradient-to-b from-slate-50 to-white`
- [ ] `app/[locale]/about/page.tsx` — alternate section bgs (`bg-white` / `bg-slate-50`)
- [ ] `app/[locale]/services/page.tsx` — card hover states (`hover:shadow-lg hover:-translate-y-1 transition-all`)

### 9.3 Images
- [ ] Source 2–3 photos for hero and about pages — Pexels free (no attribution required) OR Higgsfield AI generation (MCP tool available in session) — save to `public/images/`
- [ ] Add `<Image>` (Next.js) with dark overlay to hero section
- [ ] Regenerate `public/og-image.png` (currently a plain dark-navy block) with the new brand palette

### 9.4 Animations
- [ ] Add `.reveal` CSS utility in `globals.css` using `animation-timeline: view()` (CSS Scroll-Driven Animations) — no new dependencies
- [ ] Apply `reveal` class to section headings, card grids, step lists
- [ ] Add card hover lift: `hover:-translate-y-1 hover:shadow-lg transition-all duration-200` to service and value cards
- [ ] Add nav link underline slide animation in `header.tsx`
- [ ] (Optional) Install `framer-motion` for richer whileInView animations if CSS-only feels insufficient

### 9.5 Header polish
- [ ] Header scroll-opacity: transparent at top → `bg-background/95 backdrop-blur-md` after scrolling (requires small Client Component hook or CSS scroll-driven trick)

### 9.6 Verification
- [ ] `pnpm build` zero warnings
- [ ] `pnpm lint` + `pnpm tsc --noEmit` clean
- [ ] `pnpm check-i18n` still passes (Phase 9 adds no i18n keys)
- [ ] Manual walkthrough in browser: every page EN + DE, check colours / images / hover states / scroll animations
- [ ] Commit: `feat: visual polish — colour palette, images, animations`

## Phase 7 — Deploy to Vercel

- [ ] Push repo to GitHub
- [ ] Import into Vercel; framework auto-detected
- [ ] Set Production env vars: `RESEND_API_KEY`, `CONTACT_INBOX`, `CONTACT_FROM`, `NEXT_PUBLIC_SITE_URL`
- [ ] Set Preview env vars (separate `CONTACT_INBOX` to avoid noisy preview emails)
- [ ] Trigger production deploy; verify live URL renders both locales
- [ ] Test contact form end-to-end on production URL
- [ ] Attach custom domain (when stakeholder confirms)
- [ ] Verify Resend domain DNS records for the chosen production domain

## Phase 8 — Pre-launch gate

- [ ] Real Impressum copy installed (stakeholder-supplied)
- [ ] Real Datenschutzerklärung installed (stakeholder-supplied)
- [ ] All placeholder copy on About / Services / Home replaced with stakeholder-approved text
- [ ] Sign-off from stakeholder before announcing the site

---

## Review

> Per claude.md §5 "Document Results": fill this in at the end of each work session.

### Phase 1 — What was built (commit `d694878`)

- Next.js 16.2.6 (App Router) + TypeScript + Tailwind v4 + shadcn/ui (base-nova style, neutral base colour) scaffolded into `e:\medi-drive`
- shadcn components added: button, input, textarea, select, checkbox, label, card, sonner
- Runtime deps installed: next-intl 4.12.0, react-hook-form 7.76.1, @hookform/resolvers 5.4.0, zod 4.4.3, resend 6.12.3, lucide-react 1.16.0
- `.env.example` with four env-var keys (no values), `.env.local` gitignored via `.env*` pattern + `!.env.example` negation
- `pnpm-workspace.yaml` with `allowBuilds` for all native packages (sharp, unrs-resolver, msw, @parcel/watcher, @swc/core)
- Commit: `d694878` — `chore: initial scaffold`
- Surprises: pnpm not pre-installed, Next.js 16 (not 15), shadcn needed second run, create-next-app rejects non-empty dirs → temp-move workaround
- Lessons: L6 (pnpm allowBuilds), L7 (create-next-app non-empty dir)

### Phase 2 — What was built (commit `43630da`)

- `i18n/routing.ts` — `defineRouting` (locales: en/de, default: en)
- `i18n/request.ts` — `getRequestConfig` with async `requestLocale` pattern
- `i18n/navigation.ts` — `createNavigation` for typed client-side `Link`/`useRouter`/`usePathname`
- `proxy.ts` — next-intl locale-negotiation middleware (Next.js 16 renamed `middleware.ts` → `proxy.ts`)
- `next.config.ts` — wrapped with `createNextIntlPlugin`
- `app/layout.tsx` — stripped to `return children` (delegated to `[locale]/layout.tsx`)
- `app/[locale]/layout.tsx` — Inter font, `setRequestLocale`, `NextIntlClientProvider`, skip-to-content, Header + main + Footer
- `app/[locale]/page.tsx` — minimal placeholder
- `components/layout/header.tsx`, `footer.tsx`, `locale-switcher.tsx`
- `i18n/messages/en.json` + `de.json` — nav, footer, common namespaces
- `pnpm build` — zero warnings; `/en` and `/de` statically generated (SSG)
- Surprises: Next.js 16 deprecated `middleware.ts` in favour of `proxy.ts`
- Lessons: L8 (proxy.ts naming)

### Phase 3 — What was built

- `components/sections/`: hero, service-highlights, trust-badges, how-it-works, cta — all async Server Components
- `app/[locale]/page.tsx` — full Home page (5 sections)
- `app/[locale]/about/page.tsx` — mission, story, values (Card grid), regulatory posture, Cta reused
- `app/[locale]/services/page.tsx` — typed `ServiceDef[]` array, 5 services rendered as Cards
- `app/[locale]/contact/page.tsx` — two-column layout: address + static HTML form (all Phase 4 fields present)
- `app/[locale]/impressum/page.tsx` — amber placeholder notice + TMG section headings with [PLACEHOLDER] values
- `app/[locale]/datenschutz/page.tsx` — amber placeholder notice + GDPR Art.13/14 headings with [PLACEHOLDER] values
- `i18n/messages/en.json` + `de.json` — expanded to 115 keys each across 8 namespaces
- `scripts/check-i18n.mjs` + `pnpm check-i18n` — CI key-parity guard (exits 1 if keys differ)
- `pnpm build` — zero warnings; 12 routes (6 pages × 2 locales) all statically generated (SSG)

### Phase 4 — What was built

- `lib/schemas/contact.ts` — Zod v4 schema: name/org/email/phone?/subject(enum)/message(min20)/consent(literal true)/website(honeypot)
- `lib/env.ts` — lazy `getEnv()` function (validates at call time, not import time, so build succeeds without `.env.local`)
- `lib/ratelimit.ts` — module-level `Map<string, number[]>`, rolling 1-hour window, max 5 req/IP
- `components/contact-form.tsx` — `'use client'`, react-hook-form + custom resolver (bypasses `@hookform/resolvers` Zod minor-version lock), sonner toasts, full a11y (aria-describedby, role=alert, aria-invalid)
- `app/api/contact/route.ts` — POST: JSON parse → zod validate → honeypot check → rate limit → Resend send → `{ ok: true }`
- `app/[locale]/contact/page.tsx` — static form JSX replaced with `<ContactForm />`
- `i18n/messages/en.json` + `de.json` — 9 new validation/toast keys added; parity confirmed at 124 keys
- `pnpm build` — zero warnings; 12 SSG routes + `/api/contact` dynamic
- Surprises: `@hookform/resolvers` 5.4.0 checks `_zod.version.minor === 0` but Zod 4.4.3 reports minor=4 → used custom resolver. `lib/env.ts` can't parse at module init (Next.js evaluates dynamic routes at build) → moved to lazy `getEnv()`.
- Lessons: L9 (`@hookform/resolvers` minor version mismatch), L10 (env.ts must be lazy for API routes)

### Phase 5 — What was built (commit `2d7531f`)

- `lib/metadata.ts` — shared `buildMetadata()` helper: canonical URL, `alternates.languages` (hreflang), OG/Twitter card; reads `NEXT_PUBLIC_SITE_URL` env var (defaults to `https://lablink-courier.de`)
- `generateMetadata` export added to all 6 page files (`page.tsx`, `about`, `services`, `contact`, `impressum`, `datenschutz`) — each fetches from `meta` namespace via `getTranslations({ locale, namespace: 'meta' })`
- `app/sitemap.ts` — 6 routes × 2 locales = 12 entries; each entry has `changeFrequency`, `priority` (1.0 for home, 0.8 for others), and `alternates.languages`
- `app/robots.ts` — `rules: [{ userAgent: '*', allow: '/', disallow: '/api/' }]` + `sitemap:` URL
- `public/og-image.png` — 1200×630 placeholder (dark-navy #0f172a) generated via Node.js built-ins (zlib + fs) — no dependency needed; replace with branded asset when design lands
- `i18n/messages/en.json` + `de.json` — `meta` namespace added: 12 keys (homeTitle/Desc, aboutTitle/Desc, servicesTitle/Desc, contactTitle/Desc, impressumTitle/Desc, datenschutzTitle/Desc); parity confirmed at 136 keys
- `pnpm build` — zero warnings; route table: 18 SSG routes + `/api/contact` (dynamic) + `/sitemap.xml` (static) + `/robots.txt` (static)
- `pnpm lint` + `pnpm tsc --noEmit` — both clean
- Surprises: `sharp` not symlinked in node_modules (pnpm virtual store) → generated PNG via Node.js `zlib` built-in instead
- Remaining manual steps: browser walkthrough (`pnpm dev`) + Lighthouse audit — both require a local browser; run before Phase 7 deploy
