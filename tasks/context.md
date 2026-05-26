# LabLink — Project Context

> Background, stakeholders, and decisions behind the build. Read this before `plan.md` or `todo.md`.

---

## 1. What we're building

**LabLink** is an informative B2B marketing website for a courier service specialised in transporting medical samples and supplies **between clinics and medical laboratories**.

This is **not** an operations / logistics platform. There are no logins, dashboards, tracking, or bookings. The site exists to:

1. Explain the service to prospective clinic and lab partners.
2. Establish trust (regulatory compliance, reliability, professionalism).
3. Capture leads via a contact form that delivers to an internal mailbox.

## 2. Brand & naming

- **Brand name**: LabLink
- **Rationale**: Directly names the value proposition — the link between clinic and laboratory. Reads identically in English and German, two short syllables, easy to say on a phone call. Chosen after the initial "MediDrive" candidate was rejected.
- **Repo directory**: stays as `medi-drive` from the initial scaffolding. Renaming the working directory is invisible to end users and risks breaking the local VS Code / git session — deferred as housekeeping, not blocking v1.
- **Tagline candidates** (to be confirmed with stakeholder): *"The reliable link between clinic and lab"* / *"Die zuverlässige Verbindung zwischen Klinik und Labor"*.

## 3. Target audience

| Audience              | Reads the site to learn                            |
| --------------------- | -------------------------------------------------- |
| Clinic procurement    | Can LabLink reliably move our specimens on time?   |
| Lab partnership leads | Is LabLink a courier we'd integrate with?          |
| Practice managers     | What's the process, what's covered, who do I call? |

Audience is **B2B, non-technical, time-poor**. Pages should be skimmable: clear headlines, short paragraphs, visible CTAs to the contact form.

## 4. Decisions locked in

| Area          | Decision                                          | Why                                                                |
| ------------- | ------------------------------------------------- | ------------------------------------------------------------------ |
| Stack         | Next.js 16 (App Router) + TypeScript             | First-class on Vercel; SSG/ISR for fast informative pages; great SEO story. Scaffolded as Next.js 16 (latest at time of Phase 1). |
| Styling       | Tailwind CSS + shadcn/ui                          | Accessible primitives, fast to compose, no design-system overhead. |
| Languages     | English + German (bilingual, both LTR)            | Service targets DACH market; English fallback for international partners. |
| i18n library  | `next-intl`                                       | App Router-native, route-segment based (`/en`, `/de`), strong typing. |
| Email backend | Resend + Next.js Route Handler                    | Generous free tier, excellent DX, designed for serverless on Vercel. |
| Hosting       | Vercel                                            | Stated requirement. Native Next.js, edge network, preview deploys. |
| Pages         | Home, About, Services, Contact (+ legal)          | Per stakeholder; legal pages added (see §5).                       |
| Domain        | `lablink-courier.de`                              | German TLD aligns with the primary market and the Impressum/Datenschutz legal frame. "-courier" suffix added for registrability and reinforces the service category. |
| Brand assets  | **Velocity Precision** (locked — Phase 10 partly shipped) | v1 used grayscale. Phase 9 added blue-600 palette (commits `fba098c`/`d8df32d`). Phase 10 implements Google Stitch "Velocity Precision": deep navy `#001e40`, electric cyan `#00e3fd`, Plus Jakarta Sans font, animated gradient backgrounds, magnetic-card hover, Material Symbols icons. Homepage + Header + Footer landed in `98246a4`. About / Services / Contact pages still on Phase 9 styling — to be redone with Stitch MCP (`stitch.googleapis.com/mcp`, added to `~/.claude.json` 2026-05-26). See `plan.md` §12 and `todo.md` Phase 10. |

## 5. Legal pages (added — not optional)

Operating a commercial website in Germany requires:

- **Impressum** (§5 TMG — disclosure of operator identity, contact, registration)
- **Datenschutzerklärung** (GDPR Art. 13/14 — privacy policy)
- **Cookie consent** if any non-essential cookies are set (Resend / contact form itself doesn't require cookies; analytics would)

> ⚠️ **Stakeholder action needed**: provide company legal name, address, managing director, registration number, VAT ID, and a data-protection officer contact (or confirm none required under GDPR Art. 37). Without this, the site cannot legally go live in Germany.

Legal text will not be invented — placeholder pages will be scaffolded and the stakeholder will supply final copy (often via a German legal-text generator like e-recht24, or via legal counsel).

## 6. Regulatory context (informs copy, not code)

The site sells trust in a regulated activity. Copy on **Services** and **About** should reference (where accurate):

- Compliance with EU regulations on transport of biological substances (UN3373, ADR Cat. 6.2 for diagnostic specimens).
- Temperature-controlled / chain-of-custody handling where applicable.
- Trained personnel, insurance.

Do **not** claim certifications that haven't been confirmed. Final copy must be reviewed by the stakeholder.

## 7. Out of scope (explicit non-goals)

- No customer login / account system.
- No live shipment tracking.
- No booking / scheduling UI.
- No payment processing.
- No CMS — content lives in repo as MDX or translation JSON files. (Revisit if non-technical editors need to update copy frequently.)
- No blog at launch. Easy to add later via App Router.

## 8. Success criteria for v1

1. Four content pages + two legal pages render correctly in EN and DE.
2. Lighthouse scores ≥ 90 across Performance / Accessibility / Best Practices / SEO on Home.
3. Contact form delivers to the configured inbox; spam protection in place.
4. Deployed to Vercel with a working preview pipeline and a placeholder production domain.
5. No console errors, no broken links, valid sitemap and robots.txt.

## 9. Stakeholder questions

### Resolved

- **Brand name** → `LabLink` (after rejecting "MediDrive"). Domain includes a `-courier` suffix for registrability; consider using "LabLink Courier" in surfaces where the full domain is visible (email footer, Impressum header) for consistency.
- **Domain** → `lablink-courier.de`. German TLD reinforces market focus and pairs cleanly with the legally-required Impressum/Datenschutz.
- **Recipient inbox** → `contact@lablink-courier.de`. Mailbox must be created at the email host before the contact form can deliver end-to-end (Phase 4 prerequisite).
- **Brand assets** → to be designed. Build uses a text-based logo placeholder and a neutral professional palette, both replaceable in one location (logo component + Tailwind theme tokens) without touching page code.
- **Legal entity details** → stakeholder will supply later. Impressum and Datenschutzerklärung pages will be scaffolded with clearly marked placeholders; **production launch is gated on real legal copy being supplied** (see §5).

### Outstanding (need stakeholder input before the items they block)

| #  | Question | Blocks |
| -- | -------- | ------ |
| 1  | **Service area** — nationwide-DE, DACH, or specific cities? | Final copy on Home and Services |
| 2  | **Authentic compliance claims** — which certifications / regulatory standards can be truthfully named in marketing copy? | Final copy on About and Services |
| 3  | **Legal entity details** for Impressum (company name, address, managing director, registration, VAT ID, DPO contact). | Production launch (legal gate, §5) |

### Real-world stakeholder prerequisites (independent of build, run in parallel)

- Register `lablink-courier.de` at a registrar (e.g. INWX, united-domains, IONOS).
- Set up email hosting / mailbox for `contact@lablink-courier.de`.
- Add Resend domain-verification DNS records (TXT + SPF + DKIM + DMARC) — needed before Phase 4 form testing and Phase 7 deploy.

> **Phase 4 code is complete** (commit `07af0e9`). The contact form, Zod schema, rate limiter, and API route are all built. End-to-end testing (form → inbox) is blocked solely on the three prerequisites above.

Answers and prerequisites will be folded in before launch. None of these block Phase 5 (SEO & polish) or Phase 6 (verification).
