# LabLink — Implementation Plan

> Architecture and per-page spec. Read `context.md` first for the *why*. Read `todo.md` for the checkable task list.

---

## 1. Tech stack

| Concern        | Choice                                          |
| -------------- | ----------------------------------------------- |
| Framework      | Next.js 15 (App Router) + TypeScript            |
| Styling        | Tailwind CSS v4                                 |
| Components     | shadcn/ui (Radix primitives, copy-in)           |
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
├── tasks/
│   ├── context.md
│   ├── plan.md
│   ├── todo.md
│   └── lessons.md                   # created per claude.md after first correction
├── .env.example
├── .env.local                       # gitignored
├── middleware.ts                    # next-intl locale negotiation
├── next.config.ts
├── tailwind.config.ts
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

Validation: `zod` schema shared between client (`react-hook-form` resolver) and server (route handler).

### 4.5 Impressum (`/[locale]/impressum`) & Datenschutz (`/[locale]/datenschutz`)

Scaffolded with **clearly marked placeholders**. Will not go to production until stakeholder supplies real legal copy. Linked from footer on every page.

## 5. Contact form delivery

`app/api/contact/route.ts` (POST):

1. Parse JSON body, validate with the shared zod schema → 400 on failure.
2. Reject if honeypot field is non-empty (return fake 200 to confuse bots).
3. Rate-limit by IP (5 requests / hour). In-memory `Map` for v1; can swap to `@upstash/ratelimit` later without API change.
4. `resend.emails.send({ from: 'contact@<domain>', to: env.CONTACT_INBOX, replyTo: data.email, subject, html })`.
5. Return `{ ok: true }` on success, generic 500 on send failure (log details server-side only).

**Env vars** (validated at boot via `lib/env.ts`):

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
