# Repository guidance

This is a dependency-light static personal website. Preserve unrelated pages and their navigation when changing a scoped section.

## Sci-Fi Book Club

Future book-club tasks must begin by reading, in order:

1. `AGENTS.md`
2. `docs/book-club-data-workflow.md`
3. `data/book-club.json`
4. The current published admin backlog at `/book-club/backlog/admin/`

The book-club pages are an isolated mini-site. Keep only the book-club navigation on those routes and do not add links to the personal website. `data/book-club.json` is the canonical dataset after the initial workbook import. Update it first, record the change in `data/book-club-changelog.md`, then run `node scripts/build-book-club.mjs`. Do not maintain a hand-coded duplicate list in HTML or JavaScript.

Do not expose contributor names, Suggested By fields, internal notes, eligibility operations, poll history, votes, research status, or other private data on public cards or the public JSON endpoint. The unlinked admin table may show the non-personal operational/history fields explicitly requested by the user. Use only source-backed metadata. Keep unsupported facts blank and document unresolved images or sources in the changelog.

Use one discrete positive integer for every displayed page count, never ranges or plus-values. Keep the numeric sort field separate but consistent. Every eligible book needs a source-backed poll description with no trailing period and a complete Signal option of at most 100 characters; compute its individual description budget without truncating title, surname, or count. Finish the description yourself rather than shipping a manual-review row. Prefer verified direct Wikipedia and Goodreads book links; omit unavailable links and missing-link filler. Follow the persisted Signal-transcript update procedure in the workflow document.
