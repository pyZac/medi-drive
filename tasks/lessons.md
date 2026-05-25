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

## L6 — pnpm 11 requires explicit build-script approval in pnpm-workspace.yaml

**Pattern**: pnpm 11 blocks native build scripts (`postinstall`, `install`) by default. Every package with such scripts must be listed under `allowBuilds` in `pnpm-workspace.yaml` before the install will succeed.

**Why**: Hit this four separate times during Phase 1 (sharp, unrs-resolver, msw, @parcel/watcher, @swc/core) — each one required a one-line fix + re-run. Would have saved three round-trips if all known native packages were pre-approved.

**How to apply**: At the start of any new project on pnpm 11, pre-populate `pnpm-workspace.yaml` with `allowBuilds` entries for the known native-build packages in the stack: `sharp`, `@swc/core`, `@parcel/watcher`, `msw`, `unrs-resolver`. Add more as new ones surface. The pnpm error message is clear and the fix is fast, but pre-approval avoids the interruption entirely.

## L7 — `create-next-app` rejects directories containing non-hidden files

**Pattern**: Running `pnpm create next-app@latest .` in a directory that already contains non-hidden files or folders exits with an error listing the conflicts. The `--yes` flag does not bypass this check.

**Why**: The scaffold directory contained `claude.md` and `tasks/`, which triggered the rejection even though they don't conflict with anything the scaffolder creates.

**How to apply**: When scaffolding into an existing project directory, temporarily move any non-hidden non-git files to a sibling temp location, run the scaffolder, then move them back. The scaffolder only creates its own files and never touches `.git/` or hidden dirs, so the operation is safe and fully reversible.

## L8 — Next.js 16 replaced `middleware.ts` with `proxy.ts`

**Pattern**: In Next.js 16, the middleware file convention changed from `middleware.ts` to `proxy.ts`. Using the old name triggers a build warning: *"The 'middleware' file convention is deprecated. Please use 'proxy' instead."*

**Why**: Discovered during Phase 2 pnpm build — build succeeded but emitted a deprecation warning, which violated the "zero warnings" requirement.

**How to apply**: For Next.js 16+ projects, always create `proxy.ts` at the repo root (not `middleware.ts`). The exported `default` handler and `config.matcher` are identical — only the filename changes. The `next-intl` `createMiddleware` function works unchanged with the renamed file.

---

## L5 — Repo-directory name vs. brand name can diverge

**Pattern**: The working directory is `medi-drive` from when the brand was "MediDrive". Brand is now "LabLink". Renaming the dir mid-session on Windows with VS Code open is high-friction for low value — invisible to end users.

**Why**: Spent zero time renaming; nothing broke. The brand lives in code/copy/metadata, not in the filename.

**How to apply**: Don't reflexively rename project directories when the brand changes. Note the divergence in `context.md` §2 and move on. Revisit only if the directory name becomes a real source of confusion.
