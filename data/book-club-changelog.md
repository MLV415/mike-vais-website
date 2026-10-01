# Sci-Fi Book Club change log

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
