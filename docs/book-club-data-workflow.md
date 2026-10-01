# Sci-Fi Book Club data workflow

## Canonical source

`data/book-club.json` is the repository’s canonical source after the initial import from `Sci-Fi Book Club Source of Truth.xlsx`. Do not hand-edit a second book list in either public page, the backlog reference, the machine-readable endpoint, or JavaScript. The generated outputs are:

- `/book-club/`
- `/book-club/backlog/`
- `/book-club/backlog/admin/`
- `/book-club/data/books.json`

Run `npm run build:book-club` after changing the JSON, then run `npm run verify:book-club`. The build script filters the canonical records, renders the public cards and readable admin table, and writes the public data projection. The verification script checks card coverage, image metadata, required fields, banner copy, Jump To anchors, sorting controls, and isolation-sensitive copy. The admin page is intentionally unlinked from the public book-club navigation; it is the shared read-only reference for Work and Codex.

## Public fields and exclusions

Public records may contain the record ID, title, display author, current-poll state/order, poll premise, page-count display, numeric page-count minimum for deterministic sorting, form, original publication year, long synopsis, themes, vibe, verified awards, source URLs, cover status/source note, and edition note. Cards show only the fields appropriate to their page.

Never add Suggested By, contributor names, full names, internal notes, eligibility operations, poll history, votes, research workflow status, or other private/admin-only fields to the JSON or generated pages. Blank source-backed fields stay absent rather than being filled with invented copy.

## Sources and images

Accept publisher, author, award-organization, library, or other authoritative bibliographic sources. Paraphrase publisher/author material for long synopses and themes; do not use reviews as the sole source. Awards must name the award, category, and explicit status such as Winner or Finalist. Images require a verified direct publisher/author/library or clearly licensed source and a rights/source note. Never use AI-generated cover art or arbitrary retailer scraping. If no direct cover is verified, keep the restrained fallback and record the unresolved image in `data/book-club-changelog.md`.

## Routine updates

For a routine Signal or poll update, read `AGENTS.md`, this workflow, `data/book-club.json`, and the published admin backlog page first. Apply the supplied change to the canonical JSON, preserve each record ID, update the changelog, run the generator, and verify that current-poll filtering, backlog coverage, public/admin separation, sorting, anchors, and exact Signal behavior still agree. Do not request the workbook or mockup again unless source data is genuinely missing, the visual design changed, or the published admin page is unavailable.

If a source correction is needed, update the JSON only after checking an authoritative source and record the date, fields, reason, source URL, and unresolved follow-up. If the attached workbook is the source of a new data change, reconcile it into the JSON rather than keeping the workbook as a second runtime dependency.

## Verification checklist

1. Validate JSON and run `node scripts/build-book-club.mjs`.
2. Confirm all records marked current are on the poll page and all eligible records are in the backlog/admin table.
3. Confirm the public projection and generated pages contain no personal identifiers or internal fields.
4. Test all sorting options, including Awards first with a deterministic title tie-break.
5. Test every Jump To link after sorting and check the direct current, backlog, admin, and data routes.
6. Check mobile and desktop layout for overflow, normal-flow navigation, non-clickable cards, centered Jump To controls, compact Signal action, and restrained missing-image fallbacks.
