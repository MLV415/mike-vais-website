# Sci-Fi Book Club change log

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
