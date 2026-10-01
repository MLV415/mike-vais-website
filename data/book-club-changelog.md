# Sci-Fi Book Club change log

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
