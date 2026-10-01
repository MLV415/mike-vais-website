# Repository guidance

This is a dependency-light static personal website. Preserve unrelated pages and their navigation when changing a scoped section.

## Sci-Fi Book Club

Future book-club tasks must begin by reading, in order:

1. `AGENTS.md`
2. `docs/book-club-data-workflow.md`
3. `data/book-club.json`
4. The current published admin backlog at `/book-club/backlog/admin/`

The book-club pages are an isolated mini-site. Keep only the book-club navigation on those routes and do not add links to the personal website. `data/book-club.json` is the canonical dataset after the initial workbook import. Update it first, record the change in `data/book-club-changelog.md`, then run `node scripts/build-book-club.mjs`. Do not maintain a hand-coded duplicate list in HTML or JavaScript.

Do not expose contributor names, Suggested By fields, full author names, or other personal data. Public card pages and the machine-readable public projection must contain only source-backed public metadata. The unlinked admin reference may include non-personal workbook operations such as eligibility, poll history, vote totals, source verification, and edition notes; keep unsupported values blank or explicitly zero and document unresolved images or sources in the changelog.
