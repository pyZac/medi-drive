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

- [ ] `pnpm create next-app@latest` — App Router, TS, Tailwind, ESLint, `src/` no, alias `@/*`
- [ ] Initialise shadcn/ui (`pnpm dlx shadcn@latest init`)
- [ ] Add base shadcn components: `button`, `input`, `textarea`, `select`, `checkbox`, `label`, `card`, `sonner`
- [ ] Install runtime deps: `next-intl`, `react-hook-form`, `@hookform/resolvers`, `zod`, `resend`, `lucide-react`
- [ ] Configure `tsconfig.json` strict mode; verify `pnpm build` succeeds on empty scaffold
- [ ] Add `.env.example` (no secrets) and ensure `.env.local` is gitignored
- [ ] Commit: `chore: initial scaffold`

## Phase 2 — i18n & layout

- [ ] Install + configure `next-intl` (`middleware.ts`, `i18n/routing.ts`, `i18n/request.ts`)
- [ ] Create `app/[locale]/layout.tsx` with `<html lang>` from locale
- [ ] Create `i18n/messages/en.json` and `de.json` with initial keys (nav, footer, common)
- [ ] Build `components/layout/header.tsx` with logo, nav, locale switcher
- [ ] Build `components/layout/footer.tsx` with nav + legal links
- [ ] Build `components/layout/locale-switcher.tsx` preserving current path
- [ ] Add skip-to-content link
- [ ] Verify Lighthouse a11y ≥ 95 on an empty home page

## Phase 3 — Content pages

- [ ] Home (`app/[locale]/page.tsx`): hero, service highlights, trust strip, how-it-works, final CTA
- [ ] About (`app/[locale]/about/page.tsx`)
- [ ] Services (`app/[locale]/services/page.tsx`) — service data in a typed array
- [ ] Contact (`app/[locale]/contact/page.tsx`) — address column + form column
- [ ] Impressum placeholder (clearly marked TODO for legal copy)
- [ ] Datenschutz placeholder (clearly marked TODO for legal copy)
- [ ] Fill `en.json` and `de.json` with all page strings; add CI script that errors if a key exists in one locale but not the other

## Phase 4 — Contact form + Resend

- [ ] `lib/schemas/contact.ts` — shared zod schema (name, org, email, phone?, subject, message, consent, honeypot)
- [ ] `lib/env.ts` — zod-validated env loader; throws at boot if missing
- [ ] `lib/ratelimit.ts` — in-memory IP rate limiter (5/hour)
- [ ] `components/contact-form.tsx` — react-hook-form + zod resolver; success/error via sonner toast
- [ ] `app/api/contact/route.ts` — validate → honeypot → rate-limit → Resend send → respond
- [ ] Verify a Resend sender domain (stakeholder action) and add API key to `.env.local`
- [ ] Manual test: submit valid form → arrives in inbox; submit invalid → user sees field errors
- [ ] Manual test: honeypot filled → fake 200, no email sent
- [ ] Manual test: 6th submission within an hour → rate-limited

## Phase 5 — SEO & polish

- [ ] `generateMetadata` per page, localized
- [ ] `app/sitemap.ts` — all routes × locales with `alternates.languages`
- [ ] `app/robots.ts` — allow all, point at sitemap
- [ ] `public/og-image.png` (1200×630) — placeholder OK, replace with branded version when assets land
- [ ] Run Lighthouse on Home (EN + DE): all four categories ≥ 90
- [ ] Click every footer / nav link; confirm no 404s and locale persists across navigation

## Phase 6 — Verification (per claude.md §4 "Verification Before Done")

- [ ] `pnpm build` succeeds with zero warnings
- [ ] `pnpm lint` clean
- [ ] `pnpm tsc --noEmit` clean
- [ ] Manual walkthrough in browser at `pnpm dev`: every page, both locales, form submit, locale switch
- [ ] Screenshot each page in both locales; attach to PR
- [ ] Self-review against `plan.md` §4 page specs — every section present?
- [ ] Self-review: "would a staff engineer approve this?" (claude.md §4)

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

_To be completed after implementation._

### What was built

-

### What was deferred (and why)

-

### Surprises / decisions changed mid-flight

-

### Lessons to capture in `tasks/lessons.md`

-
