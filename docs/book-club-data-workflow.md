# Sci-Fi Book Club data workflow

## Canonical source

`data/book-club.json` is the repository’s canonical source after the initial import from `Sci-Fi Book Club Source of Truth.xlsx`. Do not hand-edit a second book list in either public page, the backlog reference, the machine-readable endpoint, or JavaScript. The generated outputs are:

- `/book-club/`
- `/book-club/backlog/`
- `/book-club/backlog/admin/`
- `/book-club/data/books.json`

Run `npm run build:book-club` after changing the JSON, then run `npm run verify:book-club`. The build script filters the canonical records, renders the public cards and readable admin table, and writes the public data projection. The verification script checks card coverage, image metadata, required fields, banner copy, Jump To anchors, sorting controls, and isolation-sensitive copy. The admin page is intentionally unlinked from the public book-club navigation; it is the shared read-only reference for Work and Codex.

## Public fields and exclusions

Canonical records store a source-backed poll description for Signal formatting, but public cards and the public JSON projection do not render or export it. Public records contain the record ID, title, display author, current-poll state/order, separate page-count display and numeric sort key, form, original publication year, long synopsis, themes, vibe, verified awards, external book links, and cover URLs/rights attribution. Administrative source/edition notes, verification status, poll descriptions, and history remain in the canonical data and admin reference, not the public JSON. Both public card views share page count, form, published year, synopsis, themes, vibe, awards, and an external-links section only when links exist. Missing source-backed metadata remains labeled `Not yet sourced`; missing links are omitted without filler or an empty section.

Never add Suggested By, contributor names, full names, or other personal data to the public card pages or public JSON projection. The unlinked admin reference may render non-personal operational fields from the workbook, including eligibility, poll history, vote totals, source verification, and edition notes. Keep unsupported values blank or explicitly zero rather than inventing them. Blank public source-backed fields remain visibly labeled as not yet sourced.

## Sources and images

Accept publisher, author, award-organization, library, or other authoritative bibliographic sources. Paraphrase publisher/author material for long synopses and themes; do not use reviews as the sole source. Awards must name the award, category, and explicit status such as Winner or Finalist. Images require a verified direct publisher/author/library or clearly licensed source and a rights/source note. Never use AI-generated cover art or arbitrary retailer scraping. If no direct cover is verified, keep the restrained fallback and record the unresolved image in `data/book-club-changelog.md`.

## Routine updates

For a routine Signal or poll update, read `AGENTS.md`, this workflow, `data/book-club.json`, and the published admin backlog page first. If the published page cannot be accessed, use the generated repository admin page and proceed; do not ask for another workbook, mockup, screenshot, or attachment. Apply supplied changes to the canonical JSON, preserve record IDs, update the changelog, run the generator, and verify all consumers together.

### Page counts

Store one positive integer as the display string and the same number as the separate numeric sort key. Never display ranges such as `96–112`, or values like `600+`, on cards or in Signal options. Prefer an existing representative or first reliable source count; if only a range is recorded, use a rounded midpoint. Existing approximate numeric values are acceptable: edition-level precision is not the goal and should not consume research time. Preserve former ranges/conflicts only in admin edition notes, not voter-facing data.

### Poll descriptions and Signal options

Use exactly `{TITLE} - {AUTHOR LAST NAME} | {POLL DESCRIPTION} | {PAGE COUNT DISPLAY} pages`. The literal `pages` is added by the formatter. Preserve the full title, surname, separators, and count. Compute the available description budget as 100 minus the length of the complete option with an empty description; all spaces and punctuation count. Use `signalDescriptionBudget` and `signalOption` from `scripts/book-club-signal.mjs` rather than another formatting implementation.

Draft the description from the source-backed synopsis or publisher/author/catalog description, never from vibes, themes, reviews, or invented plot details. State the central setup without spoilers, genre labels, awards, or unsupported interpretation. Remove the final period. Shorten the description to its individual budget yourself; never truncate the title, hide the option, or delegate a manual-review row to the user. A very long anthology title may require a short faithful description such as `Classic stories`. The generator rejects overflow before writing any output. Check every eligible record, not only the current six, and use `currentPollOrder` when providing current-poll options.

### External links

Prioritize direct Wikipedia and Goodreads pages matched to the actual book and author (and novella versus expanded novel where relevant). Retain relevant existing official author/publisher links. Do not guess article slugs or numeric Goodreads IDs, use search URLs as book links, or claim verification when access is blocked. If a matching page cannot be verified, omit the link, leave no filler, and note the research limitation in the changelog. Links must remain keyboard accessible, touch-friendly, clearly labeled, and safe when opening a new tab.

### Future Signal transcripts

1. Extract new book suggestions and explicit poll results/updates from the supplied transcript. Do not publish chat text, contributor identities, or Suggested By values.
2. Match existing records by title and author before adding rows; preserve IDs and distinguish different works/novella expansions. Assign the next unused persistent ID and a unique slug to genuinely new books.
3. Populate display author, surname, editor credit when applicable, representative numeric page count and sort key, form, publication year, source-backed spoiler-free synopsis, themes, vibe, verified awards, actual cover/source/rights metadata, and verified Wikipedia/Goodreads/official links. Keep source URLs and uncertainty notes in canonical/admin data. Do not invent missing facts.
4. Write the no-period poll description and validate the full <=100-character Signal option using its unique budget. Complete this work yourself rather than asking the user to fix rows.
5. Preserve historical votes and poll dates; update them only from supplied evidence. Do not infer a current-poll selection from a suggestion: update current flags/order only when explicitly instructed, with consecutive order numbers and null order for non-current books.
6. Regenerate poll, backlog, admin, and public JSON from the single dataset. Verification uses canonical record counts so new suggestions do not require hard-coded test-count edits. Check sorting, anchors, public/admin separation, cover loading, and responsive layout. Commit and push through the existing repository workflow without extra approval unless the task would go outside the agreed scope.

If a source correction is needed, update the JSON only after checking an authoritative source and record the date, fields, reason, source URL, and unresolved follow-up. If the attached workbook is the source of a new data change, reconcile it into the JSON rather than keeping the workbook as a second runtime dependency.

## Verification checklist

1. Validate JSON and run `node scripts/build-book-club.mjs`.
2. Confirm all records marked current are on the poll page and all eligible records are in the backlog/admin table.
3. Confirm the public projection and generated pages contain no personal identifiers or internal fields.
4. Test all sorting options, including Awards first with a deterministic title tie-break.
5. Test every Jump To link after sorting and check the direct current, backlog, admin, and data routes.
6. Check mobile and desktop layout for overflow, normal-flow navigation, non-clickable cards, centered Jump To controls, compact Signal action, and restrained missing-image fallbacks.
