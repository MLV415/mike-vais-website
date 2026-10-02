# Sci-Fi Book Club change log

## 2026-10-02 — Reviewed release authorized

- The user explicitly approved publishing the reviewed combined preview: "This looks great. you can publish it". Saved this current-release-only approval in HANDOFF.md; recurring preview-before-publication rules continue to apply to future changes.
- Publication scope is the reviewed book-club records/metadata, locally hosted covers and icons, verified resource links and two-line layout, standardized forms, responsive/checking fixes, and reconciled persistent project instructions/history. Preserve unrelated pages and existing GitHub history. Release/live-verification results are recorded in HANDOFF.md.

## 2026-10-02 — Two-line resources and standardized forms

- Saved the user's recurring presentation/data preferences in AGENTS.md and docs/book-club-data-workflow.md: Wikipedia then Goodreads first, separate Author Site/Publisher Site links below; structural Form values must use standardized options instead of audience, genre, or slash-separated variants.
- Regenerated both public views and JSON using the shared link selector, with deterministic Wikipedia/Goodreads-first ordering and unchanged destination URLs. Empty link rows are omitted. Short site labels, safe new-tab behavior, accessible names, focus outlines, and existing icons are preserved.
- Standardized B04 The Hemingway Hoax from Novella / short novel to Novella, following its original work's official Hugo category (https://www.thehugoawards.org/hugo-history/1991-hugo-awards/); existing short-novel/shorter-version edition and award notes remain intact. Standardized B09 A Wizard's Guide to Defensive Baking from audience/genre-qualified text to Novel, and B05's casing to Short Story Collection.
- Retained the meaningful catalog distinction between Kim Fu's single-author Short Story Collection and the Robert Silverberg-edited, multi-author Anthology. Publisher sources: https://www.penguinrandomhouse.com/books/820072/lesser-known-monsters-of-the-21st-century-by-kim-fu/ and https://us.macmillan.com/books/9780765305374/thesciencefictionhalloffamevolumeone19291964/.
- Added shared form validation before generation and during verification to prevent free-text drift. Existing covers, link destinations/provenance, single-number counts, history, IDs, selection, and unrelated pages are preserved. Dataset scope remains 18 admin / 14 eligible / 6 current / 0 retired. Final test/preview results are in HANDOFF.md; no push, merge, or publication.

## 2026-10-02 — Relevant author/book pages and automatic instruction persistence

- The user approved adding relevant author and book-specific webpages to cards, including Nancy Kress's saved page. This supersedes the earlier canonical/admin-only display rule for optional references. Added 13 verified resources across 12 eligible books in the existing compact row, using short Author/Publisher text labels beside the unchanged Wikipedia/Goodreads icons.
- Rechecked saved official sources by title/author and destination. Kept the Binti publisher reference admin-only because its old series URL redirects to the generic Tor homepage; retained the relevant author series page on the card. Kept duplicate US/UK publisher and qntm publication references admin-only. Direct Simon & Schuster and Macmillan book pages were confirmed through readable official web responses despite curl bot-protection errors.
- Preserved the original Beggars in Spain novella cover, Goodreads link, and count. Its selected Nancy Kress author page concerns the related expanded novel; that distinction is recorded in the canonical link's verification note. Shared public-link selection exports only compact labels/URLs, never verification notes or display-selection flags.
- Saved the new project-wide instruction: persist every new user instruction during the same task and confirm it in the reply. Scope one-off requests explicitly and ask about future repetition when ambiguous. Recurring rules live in AGENTS.md/the workflow; task-specific instructions live in HANDOFF.md/history. Local persistence is not a claim of cross-device synchronization or publication.
- No book metadata, single-number counts, IDs, poll history/selection, covers, icons, stylesheet, admin column positions, unrelated pages, or existing reference URLs were replaced. The 18 admin / 14 eligible / 6 current / 0 retired scope is unchanged. Validation and preview results are recorded in HANDOFF.md. No commit, push, merge, or publication.

## 2026-10-02 — Saved project instructions reconciled locally

- Loaded AGENTS.md, docs/book-club-data-workflow.md, and the documentation decision below from MLV415/mike-vais-website commit df63b000e8e949c2c4923681a3d5d759755e90ef. The imported decision describes that source commit, not a new local commit.
- Incorporated project-wide completion/status/copyable-prompt requirements, single-chat ownership, verified cross-device persistence, comprehensive admin/eligible-only public scope, unknown-history placeholders, reusable research sources, responsive presentation preferences, and preview-before-any-push/remote-PR/merge/deployment rules.
- Preserved newer local instructions for 18 completed repository-hosted covers, compact logo-and-label resources, 35 matched Wikipedia/Goodreads links, and the approved trailing admin book-links column. Did not revert to remote preview-preparation or earlier deferral language.
- Preserved every pre-existing local history entry and updated HANDOFF.md with the exact source commit and local-only status. Only these four documentation files changed; canonical data, covers, links, generated pages, scripts, stylesheet, Git checkout state, and preview server were not modified. No commit, push, merge, or publication.

## 2026-10-02 — Persistent workflow and project communication

- Save consolidated book-club workflow and dictated preferences in AGENTS.md and docs/book-club-data-workflow.md for future Codex project chats and devices with an up-to-date repository checkout.
- Require explicit task status: completed work, remaining assistant work, and required user action. Every supplied pasteable prompt must be standalone in a fenced text code block. Apply these preferences to every task in this project.
- Preserve single-number page counts, faithful <=100-character Signal options, unknown-history placeholders, comprehensive admin/eligible-only public data standards, isolated navigation, and the established responsive presentation.
- Require preview before website pushes, remote PRs, merges, or deployments; finish already approved work without repeated requests. The user authorized completing this documentation-only persistence update after reviewing the saved draft.
- Record the user's newer Local-chat authorization to prepare verified repository-hosted covers and compact Wikipedia/Goodreads links, superseding the earlier deferral. That website implementation remains preview-only until reviewed.
- This commit changes instructions/history only. No canonical book records, generated pages, images, styles, scripts, or deployment configuration change.

## 2026-10-02 — Local-only cover hosting and reading resources

- Resumed the previously deferred work with explicit user approval to implement, preview, and preserve the publication review gate. Nothing pushed, merged, or published.
- Verified direct Goodreads pages for all 18 works and Wikipedia pages for 17. No matching Wikipedia article was found for *Lesser Known Monsters of the 21st Century* (404); omit that link without filler. The *Beggars in Spain* Goodreads page and cover explicitly identify the original novella. Its Wikipedia overview discusses both versions.
- Downloaded and visually matched all 18 actual covers from publisher ISBN endpoints or specific Open Library IDs/ISBNs. The staged importer installed content-hashed local files, checksums, retrieval URLs and timestamps. Previous remote lookup/source URLs remain in canonical cover provenance; current source and rights notes identify the reviewed assets. Google Books returned HTTP 429, so no visitor dependency on that service was introduced.
- Added a restrained Wikipedia/Goodreads row using each site's locally hosted official favicon, a light backplate, visible labels, safe new-tab behavior and book-specific accessible names. Optional publisher/author references remain canonical/admin-only. Added a trailing admin book-links column without shifting existing columns.
- Preserved all 18 IDs, existing metadata, single-number page counts, six poll choices, 14 eligible backlog books, unknown historical values, poll history, existing assets, and unrelated pages. Only book-club-scoped styles were added to the shared stylesheet.
- Updated automated checks for the intentionally restored resource links and corrected the admin Signal-option test to match records by ID after sorting rather than row position. Local browser tests can use bundled Playwright without adding a website dependency.
- Build, static checks, four cover-workflow tests, and offline image verification passed (18/18 source covers). Rendered responsive and recovery verification results are recorded in HANDOFF.md after the final preview check.

## 2026-10-02 — Reduced release scope

- Per the user's latest direction, removed external-book-link sections from both public views and externalLinks from the public JSON. Existing canonical/source URLs and admin attribution remain for future reference; Wikipedia/Goodreads research is deferred.
- Retained all completed discrete-count, no-trailing-period, 100-character Signal-option, public/admin separation, sorting, and responsive-layout corrections.
- Kept all 14 original cover URLs and attribution unchanged, along with the tested transient-load recovery fix. New cover downloads/repository hosting and cloud-environment configuration troubleshooting are deferred. No generated placeholders or guessed replacement URLs were added.
- Comparing the canonical covers against main confirms the same URLs/source metadata. Online verification run [36959560834](https://github.com/MLV415/mike-vais-website/actions/runs/36959560834) then passed the build, static checks, cover workflow/recovery regressions, all 14 source image responses, and actual Chromium rendering of poll, backlog, and admin at desktop/mobile/compressed widths. Screenshots were captured by CI. This verifies the existing remote covers at test time, not permanent source availability; repository-hosted cover caching remains deferred.

## 2026-10-02 — Cover recovery and repository-hosting preparation

- Fixed the image loader to clear the fallback class and hidden state on a successful load; added one delayed retry for a transient failure without an unbounded request loop.
- Added a staged importer for real source cover assets under `assets/book-club/covers/`, retaining source URLs/rights notes and recording checksums/retrieval metadata. Public cards, admin image links, and the data endpoint prefer a local asset when present; builds reject missing/corrupt local files.
- Added offline tests for successful caching, safe abort on a failed download/access denial, source preservation, path safety, and checksum checks. Added browser regression tests for transient recovery, permanent failures, and cached successes. Test logo bytes are fixtures only, not substituted book art.
- Updated image checking to validate actual local image bytes/checksums without remote requests when covers are cached; remote checks use the inherited proxy and bounded retries. CI now runs browser diagnostics even when the image audit fails, retains failure status, and saves screenshots.
- The real import was attempted and denied at B01 with HTTP 403. No source cover assets or canonical data changed; zero real covers have been cached in this step. The missing covers and Wikipedia/Goodreads verification remain unresolved pending research access and dependable source retrieval. Production remains unchanged.
- Local build/static checks, four cover-workflow tests, and browser recovery regression tests passed. Actual three-page rendering checks still fail on remote cover loading under the restricted network; metadata/layout checks passed. Image checks now wait for the retry to settle instead of inspecting an intermediate empty image source.
- Added direct standard Codex web settings instructions and an explicit fallback if this managed environment is not listed, avoiding unsupported claims about the user's settings screen.

## 2026-10-02 — Discrete counts and finished Signal options

- Latest user direction supersedes range-preserving behavior: every displayed count is now one integer. Binti uses 104, The Hemingway Hoax 154, and both formerly `600+` records use the existing representative 600. Display and numeric sort fields remain separate and agree; former ranges remain only in admin edition notes.
- Removed final periods from all 14 source-backed descriptions. Kept the existing setups; B14 now uses `Classic stories`, a faithful condensation of its already source-backed anthology synopsis. Its full-title Signal option is 98 characters. All 14 complete options fit 100 characters without shortening titles/surnames or omitting `pages`.
- Added one shared Signal formatter/budget function and build-time rejection of ranges, trailing periods, and overflow. No blank or manual-review Signal row is published. Added negative and exact-limit regression tests.
- Removed a duplicate B10 page-count property. Kept its representative 288-page value and archived the former 350 value in its admin note.
- Removed empty external-links sections and the `No verified external links recorded` filler. Retained author/publisher links with touch-sized targets and visible keyboard focus. Wikipedia/Goodreads destinations are blocked by this environment's enforced network policy, so no guessed or falsely verified links were added. These link types remain unverified for B01–B14; B01 and B04 have no external-links section.
- Removed administrative source/edition/verification notes from public JSON and card attributes while preserving canonical/admin sources and image rights attribution.
- Persisted numeric-count, no-period, per-book character-budget, external-link, and future Signal-transcript ingestion rules in repository guidance and workflow documentation.
- Made verification counts derive from the dataset, corrected desktop-vs-mobile/admin-sorting test assumptions, and enabled strict CI checks for book-club preview branches before main publication.
- Local build/static checks passed. Chromium inspected all three local pages at mobile, compressed, and desktop widths; field/column alignment, 14 ready Signal options, all sorting modes, anchors, navigation, and touch targets were exercised. Remote cover requests had to be blocked locally because the network policy denies their sources; local image checks therefore correctly fail rather than claiming that fallbacks constitute success. Existing cover URLs are unchanged and strict online CI remains the publication gate.
- Online CI run [36955071708](https://github.com/MLV415/mike-vais-website/actions/runs/36955071708), including a retry, passed build/static checks but failed the unchanged cover URLs for Seven Views of Olduvai Gorge, Binti, The Hemingway Hoax, Lesser Known Monsters of the 21st Century, Camp Concentration, The Black Cloud, A Wizard’s Guide to Defensive Baking, The Windup Girl, and Children of Ruin (503 or connection failures). Five image responses succeeded. Online browser verification was consequently skipped. Corrections were deployed to the book-club-data-cleanup preview, but not merged to main because the required image gate remains unsatisfied.

## 2026-10-01 — Canonical data cleanup and public book links

- Normalized display attribution, author surname, editor credit, current-poll order, page-count display, and numeric page-count sort fields.
- Added source-backed poll descriptions for all 14 eligible books and generated Signal option/status fields in the admin table.
- Preserved edition ranges and plus-values such as `96–112`, `152–155`, and `600+` instead of replacing them with midpoint or minimum display values.
- Added verified author/publisher links to public cards where existing source URLs clearly matched; cards without a verified public link show that state explicitly.
- Flagged B14, *The Science Fiction Hall of Fame, Volume One: 1929–1964*, for manual Signal review because its full title, editor surname, page count, and accurate description cannot fit within 100 characters.

## 2026-10-01 — Mobile header layout

- Expanded the supplied logo to the full mobile header width without cropping it.
- Kept the Meetup and Signal actions side by side beneath the logo.
- Replaced the loose mobile page links with a full-width segmented page-setting toggle.

## 2026-10-01 — Signal access on admin page

- Added the reusable Vote in Signal action to the admin header so all three isolated book-club routes provide the same external actions.

## 2026-10-01 — Signal access on both public pages

- Added the reusable Vote in Signal action to the Complete Backlog header as well as Current Poll.
- Kept the admin reference page limited to its Meetup action while retaining the same supplied logo.
- Extended verification to cover the admin logo, public Signal actions, and the generated admin table structure.

## 2026-10-01 — Centered actions and supplied club logo

- Replaced the text brand in the isolated header with the supplied Cosmic Chapter Chat logo image.
- Kept the full logo visible with proportional, uncropped sizing and a responsive header height.
- Reordered the desktop header into left logo, centered Meetup/Signal actions, and right navigation tabs.
- Current Poll shows both centered actions; Complete Backlog and Admin show Meetup only.

## 2026-10-01 — Meetup action and stable header alignment

- Added the Cosmic Chapter Chat Meetup group link to the isolated book-club header on both public pages.
- Current Poll now shows Meetup and Signal actions; Complete Backlog shows Meetup only.
- Reworked the desktop header into stable brand, centered-navigation, and action zones so the navigation tabs do not shift between pages.
- Kept the actions stacked and full-width-friendly at narrow widths.

## 2026-10-01 — Navigation placement, responsive breakpoints, and admin column mapping

- Moved the current-poll Signal action into the isolated navigation row so it no longer occupies a separate desktop band; it wraps to a full-width action on narrow screens.
- Corrected the final responsive CSS cascade so public cards render three columns on wide desktop, two at intermediate widths, and one on narrow/mobile widths.
- Generated the admin headers and row cells from the same ordered column definition, preserving the ID column and preventing future horizontal shifts.
- Added rendered-verification checks for the Signal placement, card-column breakpoints, and admin header/cell alignment.

## 2026-10-01 — Public header cleanup and workbook admin reconciliation

- Removed the redundant lower book-club and page-title treatments from the Current Poll and Complete Backlog pages; the isolated navigation remains the page-level identifier.
- Reworked the Signal action into a compact horizontal button with the poll mark visible beside the label in its default state.
- Reconciled the admin table against the workbook’s non-personal Books fields, including award/image verification, source status, edition metadata, last poll date/votes, total polls, and total votes.
- Added the workbook poll-history values for B07, B10, B12, and B13 to the canonical JSON; zero-history records remain explicit as zero.
- Kept poll premise, Suggested By, full author names, and research workflow notes out of all generated web output; poll premise remains available only in the canonical data for poll-generation assistance.

## 2026-10-01 — Initial repository import and generated views

- Imported the 14 eligible records and six current-poll records from `Sci-Fi Book Club Source of Truth.xlsx` into `data/book-club.json`.
- Preserved source-backed title, author, page-count, form, publication year, synopsis, themes, vibe, award, and source fields.
- Removed Suggested By and all contributor identifiers from the repository’s public dataset and generated pages.
- Added generated public poll/backlog pages, the unlinked admin reference, and the machine-readable public projection.
- Added verified award entries for seven records as supplied by the workbook, preserving Winner status and the shorter-version distinction where recorded.
- No direct cover image URLs were present in the workbook. All 14 records retain a documented restrained missing-image fallback; official source pages remain follow-up references.
- Open follow-up: capture and approve authorized direct cover assets, then update each record’s `cover.url`, `cover.status`, and `cover.sourceNote` before regenerating.

## 2026-10-01 — Catalog cover sources and public card corrections

- Added stable Open Library Covers API URLs and catalog source links for all 14 records. Each canonical `cover` entry now records the image source, a source note, and a rights note for follow-up review.
- Added `Form` to current-poll cards, while retaining page count, poll premise, vibe, and awards.
- Replaced the poll banner with the reusable `CURRENT POLL` label and `Vote in Signal` link only; the Signal URL is the only poll-specific value in the banner.
- Removed the text glyph from Jump To controls and kept centered links to each card anchor.
- The image URLs must be checked in the rendered pages before merge; any failed catalog image must be recorded here by title rather than treated as complete.
- Network-enabled verification initially found missing Open Library responses for *Infernal Desire Machines of Dr. Hoffman* and *The Science Fiction Hall of Fame, Volume One: 1929–1964*. Both were corrected to direct Penguin UK and Macmillan publisher assets respectively; rerun `npm run verify:book-club:images` before merge.

## 2026-10-01 — Shared public card schema and compact layout

- Current-poll cards now render the same shared metadata as backlog cards: page count, form, published year, synopsis, themes, vibe, and awards, plus the current-only poll premise.
- Empty public metadata rows remain visible as `Not yet sourced` instead of disappearing; the previously incomplete `Seven Views of Olduvai Gorge` record now has a concise synopsis and themes derived from its existing source-backed poll record.
- Page-count ranges were normalized to one representative number: midpoint values where only a range was available, and an explicitly sourced edition value where one was already documented. The two existing `600+` values use a transparent 600-page representative baseline and retain edition-variance notes.
- Public cards now use a compact three-column desktop grid, four columns at very wide widths, two at intermediate widths, and one on mobile. Cover and metadata layout is shared between Current Poll and Backlog.

## 2026-10-02 — Historical records restored and metadata sourced

- Restored the unpublished admin preview with B15–B18: *Automatic Noodle*, *Children of Time*, *We*, and *The Left Hand of Darkness*. The canonical dataset now contains 18 records; the public projection remains the 14 eligible records, and Current Poll remains six books.
- Preserved one positive integer for every page-count display and sort key: 160, 600, 200, and 288 for B15–B18. Edition variance remains in admin-only notes.
- Added source-backed form, publication context, synopsis, themes, reading feel, and source URLs. Added only explicitly supported award claims: Arthur C. Clarke Award for *Children of Time*; Nebula, Hugo, and Otherwise Awards for *The Left Hand of Darkness*.
- Kept the four historical records excluded from the public backlog, with `Not applicable` Signal options and explicit unknown poll-history placeholders rather than zeroes. All four are marked `Retired: No` in admin-only notes.
- Research sources checked on 2026-10-02: Macmillan for *Automatic Noodle*; Adrian Tchaikovsky’s official site and the Arthur C. Clarke Award for *Children of Time*; Standard Ebooks for *We*; and Ursula K. Le Guin’s official site plus Penguin Random House for *The Left Hand of Darkness*.
- Existing B01–B14 records, cover URLs, images, public design, and unrelated website pages were not changed. Preview only; no push, merge, or publish.
