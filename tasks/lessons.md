# LabLink — Session Lessons

> Patterns captured from corrections in earlier sessions, per `claude.md` §3 ("Self-Improvement Loop").
> Read this at the start of any new session before proposing decisions.

---

## L1 — Name & domain decisions: present options, don't commit

**Pattern**: When the user says "choose a name as you see possible" or "pick a domain", don't unilaterally commit. Surface 3–4 options with rationale and let them pick (or push back).

**Why**: In the first session I proposed *MediDrive* + `medidrive.eu` directly, both of which were rejected — triggering two rounds of doc rewrites. Showing options up front would have saved that round-trip.

**How to apply**: For brand names, domains, taglines, colour direction, copy tone — anything customer-facing or expensive to change — use `AskUserQuestion` with multiple options instead of writing the decision into docs.

## L2 — Decisions cascade; flag the cascade before committing

**Pattern**: A domain choice flows into the Resend sender (`CONTACT_FROM`), the recipient inbox suggestion (`CONTACT_INBOX`), canonical URLs (`NEXT_PUBLIC_SITE_URL`), DNS records, and the Impressum header. Don't propagate a tentative value into other docs without flagging the cascade.

**Why**: When the domain shifted from `lablink.eu` → `lablink-courier.de`, three docs needed cross-referenced edits because the URL had already been written into env-var examples and deployment notes.

**How to apply**: For values that propagate (domain, brand, primary email, package name), keep them in *one canonical place* (`context.md` §4 decisions table) and reference, don't duplicate, in other docs. If you must duplicate, do a single `replace_all` pass when the value changes.

## L3 — German-market sites: Impressum + Datenschutz are non-negotiable

**Pattern**: Any commercial website serving Germany legally requires an **Impressum** (§5 TMG) and a **Datenschutzerklärung** (GDPR Art. 13/14). These are not "nice-to-have" — without them the site cannot legally go live.

**Why**: User originally listed only Home / About / Services / Contact. Surfacing the legal requirement early (before scaffolding) means the build accounts for the routes and the launch gate, rather than discovering them at deploy time.

**How to apply**: Whenever a project targets DE / AT / CH and is commercial, add Impressum + Datenschutz to the page list automatically, scaffold them as clearly-marked placeholders, and gate production launch on real legal copy.

## L4 — When asked to "ask questions if you have any", batch them

**Pattern**: When the user explicitly invites questions before starting work, use `AskUserQuestion` with 3–4 focused multi-option questions — not a long prose list. Cover stack, scope, integrations, language/region in one batch.

**Why**: One batched ask covered four orthogonal decisions cleanly and let the user pick rather than draft prose answers. Faster for both sides.

**How to apply**: Default to `AskUserQuestion` over free-text questions when the answer space is finite. Reserve prose questions for genuinely open-ended things ("what do you want the tagline to convey?").

## L5 — Repo-directory name vs. brand name can diverge

**Pattern**: The working directory is `medi-drive` from when the brand was "MediDrive". Brand is now "LabLink". Renaming the dir mid-session on Windows with VS Code open is high-friction for low value — invisible to end users.

**Why**: Spent zero time renaming; nothing broke. The brand lives in code/copy/metadata, not in the filename.

**How to apply**: Don't reflexively rename project directories when the brand changes. Note the divergence in `context.md` §2 and move on. Revisit only if the directory name becomes a real source of confusion.
