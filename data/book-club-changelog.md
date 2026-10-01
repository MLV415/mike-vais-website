# Sci-Fi Book Club change log

## 2026-10-01 — Initial repository import and generated views

- Imported the 14 eligible records and six current-poll records from `Sci-Fi Book Club Source of Truth.xlsx` into `data/book-club.json`.
- Preserved source-backed title, author, page-count, form, publication year, synopsis, themes, vibe, award, and source fields.
- Removed Suggested By and all contributor identifiers from the repository’s public dataset and generated pages.
- Added generated public poll/backlog pages, the unlinked admin reference, and the machine-readable public projection.
- Added verified award entries for seven records as supplied by the workbook, preserving Winner status and the shorter-version distinction where recorded.
- No direct cover image URLs were present in the workbook. All 14 records retain a documented restrained missing-image fallback; official source pages remain follow-up references.
- Open follow-up: capture and approve authorized direct cover assets, then update each record’s `cover.url`, `cover.status`, and `cover.sourceNote` before regenerating.
