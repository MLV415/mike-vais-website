# Sci-fi Book Club handoff

Updated: 2026-10-02 (America/Los_Angeles)

## Publication authorized

On 2026-10-02 the user reviewed the final local preview and explicitly said: "This looks great. you can publish it". This is one-off approval to publish the reviewed combined book-club changes and saved project instructions, not blanket permission for future unreviewed changes. Preserve unrelated pages and remote history. No additional review prompt is required for this already approved release unless reconciliation reveals a material conflict or scope change.

Publication in progress: remote main is df63b000e8e949c2c4923681a3d5d759755e90ef, the same saved-instructions commit previously reconciled. Prepare a separate history-backed release checkout rather than resetting this initially empty local Git repository. Remaining work: scoped reconciliation, release checks, GitHub publication through the existing Cloudflare workflow, and live verification. No user action is currently required.

## Latest follow-up: two-line resources and standardized forms

The user's newest recurring preferences are saved in AGENTS.md and docs/book-club-data-workflow.md: Wikipedia then Goodreads on the first line; other resources on a separate line below labeled Author Site and Publisher Site (Book Site reserved for a distinct official book website); standardized structural Form options rather than audience/genre qualifiers or slash variants. This supersedes the previous single-row/short-label presentation, while preserving every saved URL, cover, verification note, and unrelated page.

Current form vocabulary is Novel, Novella, Short Story Collection, Anthology, enforced by scripts/book-club-forms.mjs during generation/static verification. Changed only B04 to Novella, B09 to Novel, and B05's casing to Short Story Collection. Kept the meaningful single-author collection versus edited multi-author anthology distinction, and all existing edition/award nuance. Forms were not inferred from page counts. Source evidence is logged in the changelog.

Task status: implementation, validation, and desktop/mobile inspection complete; no authorized assistant work remains for this follow-up. All new instructions and final results are saved locally. The user's only remaining step is preview review and explicit publication approval if desired. Preview stays at port 4183; nothing committed, pushed, merged, or published.

Confirmed checks: build/static verification; all six public-link/form regression tests; all 18 real local cover checksums/formats; full offline Chromium current/backlog/admin checks including safe links, exact destinations, canonical forms, sorting, navigation/anchors, and no horizontal mobile overflow. Resource/site rows are checked for separate-line placement at 390, 900, and 1440px widths. Inspected focused B03/B05 screenshots at mobile/intermediate/desktop widths. Snapshot comparisons confirm every canonical field except the three intended form labels and selected publicLabel values is unchanged; every asset and unrelated page is byte-for-byte preserved. URLs, cover provenance, page counts, history, and edition/award notes are unchanged. Generated all views from canonical data; admin column order is unchanged. Saved-file readback confirms superseded one-row guidance is absent from current instructions.

## Previous follow-up: author/book links and instruction persistence

The user approved including relevant author or book-specific webpages on cards, explicitly Nancy Kress's saved page, and prohibited generic publisher homepages. Added 13 selected resources across 12 eligible books to the existing compact row, with short Author/Publisher labels and unchanged Wikipedia/Goodreads icons. Both public views and JSON share scripts/book-club-links.mjs; only labels and URLs are exported, not canonical selection flags/research notes. Original references remain in admin data. Binti's old publisher series URL now redirects to the generic Tor homepage and stays admin-only; duplicate regional/author references are not displayed on cards. Nancy's page concerns the related expanded novel, documented in its canonical link note; the original novella record, cover, Goodreads link, and page count are unchanged.

Saved the user's new project-wide recurring instruction in AGENTS.md and the workflow: save every new instruction during the task and confirm it in the reply. Record task-specific scope in HANDOFF.md/history; ask about future repetition if an apparent one-off is ambiguous without silently making it recurring. These instructions are saved locally, not yet published or verified transferred to another device. Earlier optional-author/publisher-admin-only display instructions are superseded by this follow-up; historical changelog entries remain intact.

Task status: implementation, validation, and desktop/mobile visual review complete. Instructions and final handoff are saved locally. No authorized assistant work remains for this follow-up; the user's only remaining step is preview review and explicit approval if publication is wanted. Publication remains unauthorized; the user's positive preview feedback is not an instruction to publish.

Follow-up verification: generation and static checks pass (6 current / 14 eligible / 18 admin); all four public-link regression tests and four cover-workflow tests pass; all 18 real cover formats/checksums pass. Offline Chromium checks confirm both public views and admin, every selected link by record/label/URL, 390/900/1440px layouts, image/icon decoding, navigation/anchors, all five sorting modes, safe accessible links, and no mobile overflow. Cover-recovery regressions pass. Inspected desktop/mobile screenshots and a focused Nancy card screenshot; the Author link has a 32px-high target and visible solid keyboard-focus outline.

Compared SHA-256 hashes against the start-of-task snapshot: all assets, stylesheet, unrelated pages, and generated admin HTML remain byte-for-byte unchanged (81 existing project files unchanged). Canonical data comparison confirms every field outside externalLinks is unchanged, and all original link labels/URLs are preserved. Only verified public-selection metadata was added to 13 saved links. Saved-file readback confirms the persistence rule, relevant-page requirement, and supersession of older display guidance in AGENTS.md/the workflow, with history preserved. QA reports/screenshots are ignored under tmp/book-club-qa/. No commit, push, merge, PR, or deployment occurred.

## Scope

This local project continues the unpublished work from the `Sci-fi Voting` chat (`hostId: durable`, `threadId: 01a0f8d1-be04-7662-a4ff-06e92448d01d`). The preview is local-only. Do not push, merge, publish, or change the live site before review.

## Saved project instructions reconciled

Loaded the three requested files from `MLV415/mike-vais-website` commit `df63b000e8e949c2c4923681a3d5d759755e90ef` through exact-ref GitHub reads. Reconciled `AGENTS.md` and `docs/book-club-data-workflow.md` into the existing local documents, preserved newer completed-cover/link instructions, and incorporated the source changelog's **Persistent workflow and project communication** decision without replacing any local history.

The project-wide rules now explicitly require completed/remaining/user-action status for every task, completion of authorized remaining work before handoff, and every supplied prompt in a complete standalone fenced code block. They also preserve the single-local-chat workflow, non-invented historical values, responsive presentation, and preview before any push, remote PR, merge, or deployment. The later follow-up above supersedes the reconciliation's optional-author/publisher-admin-only display rule; the approved trailing book-links column remains intact.

This reconciliation is documentation-only and saved locally. The source commit is already a remote shared record, but these reconciled files and the newer website implementation are still unpublished local drafts; they have not been verified as transferred to any other checkout/device. Do not reset, overwrite, or replace the local checkout with the remote commit. Include the reconciled instructions/history in the next separately approved repository update.

Task status: documentation reconciliation complete after saved-file and preservation checks; no remaining authorized implementation for this request; no user action required for the documentation. The combined website preview remains ready for review, and publication still requires explicit approval.

Reconciliation verification: read back all four saved documents, confirmed the imported documentation decision and all pre-existing local changelog history remain present, and compared SHA-256 hashes for all other project files against the pre-edit snapshot. Book data, covers, icons, links, generated preview pages, scripts, styles, and unrelated pages are byte-for-byte unchanged. Static verification still passes (6 poll cards, 14 eligible backlog books, 18 admin records), all 18 local cover checksums pass, and the unchanged preview returns HTTP 200 at port 4183. No checkout reset or publication occurred.

## Current state

- Canonical admin dataset: 18 records (`data/book-club.json`)
- Public eligible backlog: 14 records (`book-club/backlog/` and `book-club/data/books.json`)
- Current poll: 6 records (`book-club/`)
- Retired records: 0
- Historical additions: B15 *Automatic Noodle*, B16 *Children of Time*, B17 *We*, B18 *The Left Hand of Darkness*
- Page counts remain single positive integers for display and sorting: 160, 600, 200, and 288 for B15–B18
- Existing B01–B14 records, page counts, poll history, images, public design, and unrelated pages are preserved. Old remote cover URLs/source URLs are retained in canonical provenance where a verified source replaced the title lookup.

## Cover and resource-link follow-up (local-only)

The user approved implementation on 2026-10-02 and requested uncluttered cards, preferably with small Wikipedia/Goodreads logos. Publication remains gated on review of the combined local preview.

- All 18 real covers were downloaded from verified publisher ISBN endpoints or specific Open Library IDs/ISBNs, visually checked for title/author, and installed as content-hashed local assets under `assets/book-club/covers/`.
- Canonical covers retain source/rights notes, download URLs, retrieval timestamps, and SHA-256 checksums. Prior remote lookup/source URLs remain in `previousUrl`/`previousSourceUrl` where changed. Google Books returned HTTP 429; verified publisher/library alternatives were used.
- Verified 18 Goodreads and 17 Wikipedia book pages. *Lesser Known Monsters of the 21st Century* has no matching Wikipedia article, so its card has Goodreads only. No missing-link filler or guessed author/search link is shown.
- *Beggars in Spain* uses the original novella cover and Goodreads page. Its Wikipedia overview discusses both the novella and the expanded novel; that distinction is recorded in the admin edition note. Numeric page counts were not changed to match cover editions.
- Public cards show a small Wikipedia/Goodreads icon-and-label row, with locally hosted official favicons, light backplates, descriptive accessible labels, keyboard focus, safe new-tab behavior, and touch-sized targets. The later follow-up adds selected Author/Publisher text links in the same row; unselected references remain canonical/admin-only.
- The admin table has a trailing book-information-links column; its existing columns remain in their prior order. The public JSON includes the same selected reading resources as the cards, with no administrative link-selection/research details.
- The metadata-preservation comparison confirms all 18 records' existing titles, authors, counts, eligibility, poll flags/order, history, synopses, themes, vibe, awards, sources, and unknown historical values are unchanged. Only covers, resource links, verification dates, and B03's clarifying admin edition note changed.

Current preview: `http://127.0.0.1:4183/book-club/`, `/book-club/backlog/`, `/book-club/backlog/admin/`.
Preview server: `npm run dev` with `PORT=4183` (running local session 93020). An older server may still occupy 4173; use 4183 for the combined preview and updated asset MIME types.

## Research completed

The four historical records now have source URLs and paraphrased metadata. The sources are recorded in the canonical JSON and changelog:

- *Automatic Noodle*: Macmillan/Tordotcom
- *Children of Time*: Adrian Tchaikovsky’s official site and the Arthur C. Clarke Award
- *We*: Standard Ebooks
- *The Left Hand of Darkness*: Ursula K. Le Guin’s official site and Penguin Random House

Historical records remain excluded from voting, use `Not applicable` for Signal options, and show `—` for unknown poll-history values. No award claims were added without explicit source support.

## Checks

Run from this project directory:

```text
npm run build:book-club
npm run verify:book-club
npm run verify:book-club:links
npm run verify:book-club:cover-workflow
```

For rendered responsive checks, start the local server with `npm run dev`, then run:

```text
$env:BOOK_CLUB_OFFLINE = "1"
node scripts/verify-book-club-render.mjs
```

The admin preview route is `/book-club/backlog/admin/`. The public routes are `/book-club/` and `/book-club/backlog/`.

This Windows host has bundled Playwright; no package installation was needed. Set `BOOK_CLUB_PLAYWRIGHT_MODULE` to `file:///C:/Users/mikev/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs`, `BOOK_CLUB_CHROMIUM_PATH` to `C:/Program Files/Google/Chrome/Application/chrome.exe`, `BOOK_CLUB_ORIGIN` to `http://127.0.0.1:4183`, and `BOOK_CLUB_OFFLINE=1` for the browser checks. Run `node scripts/verify-book-club-render.mjs` and `npm run verify:book-club:cover-recovery`.

Confirmed checks: build/static verification; four cover-import regression tests; 18/18 local image format/checksum checks; actual Chromium mobile, compressed and desktop rendering; all five sorting modes on public/admin pages; every public Jump To link after sorting; navigation and public/admin separation; local cover/favicon decoding; safe accessible resource links; no mobile horizontal overflow; and transient/permanent/cached cover-loader recovery. Browser checks run with external image traffic blocked and real local covers, not substituted fixtures. Recovery-only tests explicitly use a decoding fixture.

QA screenshots and temporary source research live in ignored `tmp/book-club-qa/`. They are not website publishing inputs. Repository guidance now persists the resumed cover/link workflow and mandatory preview-before-publication review gate.

## Repository/publication caution

This project was restored into an initially empty local Git repository; its website files are currently untracked and there is no configured remote or commit history. Do not treat it as an ordinary ahead-of-main checkout or push a replacement root commit. After explicit publication approval, compare against the latest `MLV415/mike-vais-website` history, carry the reviewed scoped changes onto that history, preserve any newer remote changes, and publish through the existing GitHub/Cloudflare workflow. No remote was added and no commit, push, merge, PR, or deployment was made during this task.

## Review gate

The local preview is ready for user review. Do not push, merge, deploy, or publish until the user approves the data and rendered pages.
