# Sci-fi Book Club handoff

Updated: 2026-10-13 (America/Los_Angeles)

## Current-poll publication approval

The user explicitly authorized publication of the reviewed current-poll update on 2026-10-13: “Go ahead and publish the Current Poll page.” This is one-time approval for the reviewed October 13 Medium-poll release and its saved handoff/documentation changes, not standing permission for future work. Publish through the existing GitHub/Cloudflare history, then verify the live current poll page and preserve unrelated pages.

## Signal copy-button delivery preference

The user liked the preview and requested the Signal options directly in the reply, each ready to copy without manually highlighting a line. Saved this recurring preference in AGENTS.md and the workflow: one complete option per standalone fenced text code block, with labels/counts outside, and no file-link-only handoff. The seven already verified options are unchanged and are being delivered in-chat. This is a presentation-only follow-up; no website/data changes are required. No assistant work remains after delivery; the user can copy each option with its block's Copy button. Website publication still needs explicit approval; positive preview feedback plus this formatting request is not an instruction to publish.

## Current task: Medium-length poll and transcript intake

The user selected all eligible Medium books for the next poll on 2026-10-13. This is current-poll-only scope, not a recurring instruction to make every future poll Medium. Use representative numeric counts of 200–399 pages and existing eligibility logic; exclude read/currently-reading/retired records. Before transcript reconciliation, existing eligible candidates are B07, B08, B09, B10, B11, and B12. Re-evaluate after extracting any new suggestions or status changes.

Recurring instructions saved in AGENTS.md and the workflow: record the latest Signal message date/time as an import checkpoint, summarize extracted changes for quick user review, and proceed with routine work without extra approval. Obtain approval before substantial work involving significant time/usage. Publication still requires a reviewed preview.

Current local draft is based on verified GitHub main 20f41dff79a3e60fb0bc773db491f670d0f42214 in tmp/book-club-release, on local branch codex/book-club-medium-poll. No remote writes are authorized before preview review. The root project originally has an empty/untracked Git checkout; do not reset it or publish a replacement root commit.

Transcript source: the user pasted the actual excerpt after download_file proved unavailable in this runtime; no local upload copy was found. The inaccessible upload ID is file_00000000f2d88230aab8a625a2d1c2a2. Use the pasted evidence, not a guessed attachment preview. **Import checkpoint: October 13, 2026 (date only), confirmed explicitly by the user for the final Today header. Time and timezone are unknown.** Processing date is separately October 13, 2026. Include that date's messages with a small overlap for the next import. The sanitized extraction, poll-event key, tallies, date basis, and deduplication rules are saved in docs/book-club-imports.md; no raw chat or contributor identities are saved.

Reconciliation: one new B19, The Divine Gardener’s Handbook by Eli Snow (corrected the supplied Devine spelling using official author/publisher pages). Macmillan's 368-page edition makes it Medium, bringing the poll to seven eligible books: B07, B08, B10, B09, B11, B19, B12 in increasing-page order with title tie-break. B03/B04 are reserved/excluded for the November 20 main/optional reads, not marked completed or retired. B18 remains currently reading for the October 16 discussion. The next poll is for one December 18 read; no voting-mode restriction is invented.

Recorded the October 1 poll's displayed B01–B06 tallies (5, 1, 8, 7, 6, 1) and its October 9 outcome announcement as one verified event. Incremented each prior zero appearance exactly once and added its displayed tally; previous Medium-book history is unchanged. The new poll is not treated as already posted, and B19's unknown prior history remains null. Existing 18 records, representative page counts, covers/link destinations, form labels, metadata, styles, and unrelated pages are preserved except the requested poll/status/history fields. The new verified publisher cover was cached and visually matched; no existing cover was downloaded again.

Task status before publication: transcript extraction, checkpoint, reconciliation, research, cover hosting, generation, copyable Signal options, checks, and desktop/mobile preview were complete and saved locally. The user then approved publication of this reviewed update. After publication, verify the live current poll page and record the release here; the user's remaining step will be posting the prepared poll and follow-up message.

Unpublished preview: http://127.0.0.1:4191/book-club/ (backlog /book-club/backlog/, admin /book-club/backlog/admin/). Server is running from the history-backed draft checkout (local session 31789). The final draft is also mirrored into the root project after verifying its instruction/history files had no newer edits and its canonical data matched the current-main baseline; future work must not publish that root's empty Git history. The previous sandbox-local server on 4190 is not the review URL.

Copyable poll question, all seven individual options, character counts (94, 99, 98, 97, 82, 91, 89), and an optional post-publication posting message are in docs/book-club-signal-options.md. Every option comes from scripts/book-club-signal.mjs; descriptions have no trailing period and all options fit 100 characters without changing titles/surnames/counts. No voting-mode restriction is assumed from the statement that one book will be selected.

Verification passed: generation/static checks (7 current / 13 eligible / 19 admin), six link/form regression tests, four cover-workflow regression tests, all 19 real local image format/checksum checks, the targeted October 13 preservation/selection/tally assertions, and git diff --check. All original 18 records' unrequested bibliographic fields, existing covers/provenance/links, numeric counts, and earlier history are unchanged; only requested status/history/poll fields differ. Existing code, style, navigation, other website pages, and original assets are unchanged. Offline real Chromium checks passed for current/backlog/admin, 390/900/1440px layouts, all selected resources on separate lines, image/icon decoding, every sorting mode, Jump To anchors, accessible safe links, admin alignment/Signal status, privacy, and mobile overflow. Cover-recovery checks passed. Inspected the desktop preview and new cover; screenshots are ignored under tmp/book-club-release/tmp/book-club-qa/oct13-rendered/.

Sandbox notes: a cover-fixture atomic rename and Chromium's sandbox-local network access were denied. Reran the existing tests and local-only preview/browser checks with scoped execution approval; they passed without changing application code, lowering browser security, or reopening cloud internet configuration. The new cover was rendered locally for visual inspection; only the single new image was fetched.

## Published and verified

On 2026-10-02 the user reviewed the final local preview and explicitly said: "This looks great. you can publish it". This is one-off approval to publish the reviewed combined book-club changes and saved project instructions, not blanket permission for future unreviewed changes. Preserve unrelated pages and remote history. No additional review prompt is required for this already approved release unless reconciliation reveals a material conflict or scope change.

Published the complete reviewed release through https://github.com/MLV415/mike-vais-website/pull/11 (merged), with release commit 670e92be8839b444ca38d0e255b2508751d9095c and merge commit 2e2432fa5b088851a116fdd458515b72268c0559. Reconciled against main df63b000e8e949c2c4923681a3d5d759755e90ef without resetting the original local checkout. The separate history-backed checkout at tmp/book-club-release now tracks main. All generated outputs match the reviewed preview after line-ending normalization; unrelated-path Git diff is empty. PR verification https://github.com/MLV415/mike-vais-website/actions/runs/37045957077 and post-merge verification https://github.com/MLV415/mike-vais-website/actions/runs/37047254719 completed successfully.

Production is https://mike-vais.pages.dev/book-club/ (backlog /book-club/backlog/, unlinked admin /book-club/backlog/admin/, public data /book-club/data/books.json). HTTP 200 responses and normalized bytes match all reviewed pages, JSON, stylesheet, and browser script. All 18 live covers and both icons match their SHA-256 checksums and image MIME types. Unrelated home/about/personal/professional reference pages match unchanged repository content. Real Chromium live checks pass for poll/backlog/admin, covers/icons, separate resource/site rows at mobile/intermediate/desktop widths, canonical forms, all sorting modes, Jump To anchors, navigation, safe accessible links, public/admin separation, and no mobile overflow. Live screenshots are ignored under tmp/book-club-release/tmp/book-club-qa/live/.

New preferences and one-off publication approval are saved in project files and included in the GitHub release; the published AGENTS.md persistence/communication/form/link rules were read back from the exact merge commit. This final publication record is included in a documentation-only follow-up; no reviewed website/data/asset bytes change. Task complete: no remaining authorized assistant work and no required user action. Future changes still require their own preview/review; this is not standing publication approval. The sections below preserve the earlier draft's history and must not override this current published status.

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

This local project continued the work from the `Sci-fi Voting` chat (`hostId: durable`, `threadId: 01a0f8d1-be04-7662-a4ff-06e92448d01d`). The reviewed release is now published as recorded above; the local preview remains available. Do not push, merge, publish, or change the live site for future changes before their review.

## Saved project instructions reconciled

Loaded the three requested files from `MLV415/mike-vais-website` commit `df63b000e8e949c2c4923681a3d5d759755e90ef` through exact-ref GitHub reads. Reconciled `AGENTS.md` and `docs/book-club-data-workflow.md` into the existing local documents, preserved newer completed-cover/link instructions, and incorporated the source changelog's **Persistent workflow and project communication** decision without replacing any local history.

The project-wide rules now explicitly require completed/remaining/user-action status for every task, completion of authorized remaining work before handoff, and every supplied prompt in a complete standalone fenced code block. They also preserve the single-local-chat workflow, non-invented historical values, responsive presentation, and preview before any push, remote PR, merge, or deployment. The later follow-up above supersedes the reconciliation's optional-author/publisher-admin-only display rule; the approved trailing book-links column remains intact.

This reconciliation is documentation-only and saved locally. The source commit is already a remote shared record, but these reconciled files and the newer website implementation are still unpublished local drafts; they have not been verified as transferred to any other checkout/device. Do not reset, overwrite, or replace the local checkout with the remote commit. Include the reconciled instructions/history in the next separately approved repository update.

Task status: documentation reconciliation complete after saved-file and preservation checks; no remaining authorized implementation for this request; no user action required for the documentation. The combined website preview remains ready for review, and publication still requires explicit approval.

Reconciliation verification: read back all four saved documents, confirmed the imported documentation decision and all pre-existing local changelog history remain present, and compared SHA-256 hashes for all other project files against the pre-edit snapshot. Book data, covers, icons, links, generated preview pages, scripts, styles, and unrelated pages are byte-for-byte unchanged. Static verification still passes (6 poll cards, 14 eligible backlog books, 18 admin records), all 18 local cover checksums pass, and the unchanged preview returns HTTP 200 at port 4183. No checkout reset or publication occurred.

## Previous published state (October 2)

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

The user reviewed and explicitly approved this release, which is now published and verified. New changes must be previewed and approved before push, merge, or deployment. Preserve the original local preview and use current remote history for future releases.
