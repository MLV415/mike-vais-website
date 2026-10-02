# Sci-Fi Book Club data workflow

## User-facing process and durable instructions

Use one Local chat in the existing project for routine book-club updates. A cloud chat can replace it when effective research access is verified; do not make the user coordinate several chats or repeatedly transfer archives. At the start of every update, read AGENTS.md, this guide, the canonical dataset, and recent changelog entries. Use the generated admin page if the published reference cannot be accessed.

The user's routine steps are to supply a Signal transcript, clarify actual poll selection when the transcript does not specify it, review one concrete preview, and post the prepared Signal text. The assistant owns research, duplicate reconciliation, field population, character budgeting, generation, checks, desktop/mobile inspection, and approved publication. Do not request another workbook, mockup, screenshot, or image attachment as a routine prerequisite.

At every task handoff, explicitly state completed work, remaining assistant work, and any required user action; say when no user action is needed. Finish authorized remaining work first. Do not present an environment-local draft as a completed cross-device handoff. Explain any concrete blocker and the smallest next step. Every prompt supplied for pasting into another chat must be a complete standalone prompt in a fenced text code block, with explanations outside it. These communication preferences apply throughout this project.

When the user dictates a new preference, update AGENTS.md and this guide in the same draft, remove conflicting older guidance, and record material decisions in the changelog. Include these files in the next approved repository commit. After an approved push, GitHub is the durable shared record for other devices and future Codex chats with repository access. Until then, explicitly identify instructions as unpublished draft files; chat memory is not the source of truth. Pull the approved version on another device before working there. Unfinished local drafts require an explicit transfer; a folder being under OneDrive is not proof of reliable checkout synchronization.

Provide a concrete preview and concise account of changes, validation, and unresolved items before any push, remote pull request, merge, or deployment, even for a non-main branch. This supersedes earlier instructions allowing pushes without review. Finish reversible local work without repeated permission requests, and carry out already approved publication without asking again unless its scope changes. Preserve all unrelated personal website pages and navigation.

## Canonical source

`data/book-club.json` is the repository’s canonical source after the initial import from `Sci-Fi Book Club Source of Truth.xlsx`. Do not hand-edit a second book list in either public page, the backlog reference, the machine-readable endpoint, or JavaScript. The generated outputs are:

- `/book-club/`
- `/book-club/backlog/`
- `/book-club/backlog/admin/`
- `/book-club/data/books.json`

Run `npm run build:book-club` after changing the JSON, then run `npm run verify:book-club`. The build script filters the canonical records, renders the public cards and readable admin table, and writes the public data projection. The verification script checks card coverage, image metadata, required fields, banner copy, Jump To anchors, sorting controls, and isolation-sensitive copy. The admin page is intentionally unlinked from the public book-club navigation; it is the shared read-only reference for Work and Codex.

## Public fields and exclusions

Canonical records store a source-backed poll description for Signal formatting, but public cards and the public JSON projection do not render or export it. Public records contain the record ID, title, display author, current-poll state/order, separate page-count display and numeric sort key, form, original publication year, long synopsis, themes, vibe, verified awards, and cover URLs/rights attribution. Administrative source/edition notes, verification status, poll descriptions, and history remain in the canonical data and admin reference, not the public JSON. Both public card views share page count, form, published year, synopsis, themes, vibe, awards, and, when implemented and approved for publication, compact verified external book links. Missing source-backed metadata remains labeled `Not yet sourced`.

Never add Suggested By, contributor identities, or other personal chat data to the public card pages or public JSON projection; display author names remain required bibliographic information. The unlinked admin reference renders all canonical records, including eligible, read, currently reading, and retired books, with non-personal operational fields including eligibility, poll history, vote totals, source verification, and edition notes. Public backlog and public JSON expose only eligible records. The current poll additionally requires explicit currentPoll selection and currentPollOrder; a suggestion alone does not select a book.

Use existing eligibility/status fields and websiteDisplayNotes for historical state and timing; do not introduce a new status column or change table columns without an explicit request. Historical read/currently-reading records are Excluded with their state/timing in notes and Retired: No; preserve the distinct retired state using existing logic. Unknown canonical values retain the schema's null/empty-array conventions, but admin cells render explicit placeholders such as —, Not applicable, No verified claim, or Not yet sourced. Do not fabricate zero votes or poll appearances; preserve an existing verified zero. Public missing metadata remains visibly labeled as not yet sourced. Excluded historical books have Not applicable Signal options.

## Sources and images

Accept publisher, author, award-organization, library, or other authoritative bibliographic sources. Paraphrase publisher/author material for long synopses and themes; do not use reviews as the sole source. Awards must name the award, category, and explicit status such as Winner or Finalist. Images require a verified direct publisher/author/library or clearly licensed source and a rights/source note. Never use AI-generated cover art or arbitrary retailer scraping. If no direct cover is verified, keep the restrained fallback and record the unresolved image in `data/book-club-changelog.md`.

Prefer reusable sources such as Google Books, Open Library, and authoritative libraries/catalogs rather than asking the user to manage a new author-domain list for every update. Verify actual source access before declaring research blocked; distinguish saved settings from the active runtime policy and execution permissions. Do not bypass a denied policy. Report exact unresolved books and fields instead of inventing claims or treating all-fallback covers as a completed result. Preserve working images. Verify visible cover loading in rendered pages before claiming images work.

The user has approved preparing a local preview that re-hosts verified covers for all 18 current records. This supersedes the earlier network-related deferral. Preserve working covers until verified replacements succeed, retain their source/rights metadata, and inspect the actual rendered images. This is implementation authorization only; the combined preview still requires review before publication.

Prefer storing real cover files under `assets/book-club/covers/` rather than relying on a remote title-lookup service at every page visit. `npm run cache:book-club:covers` stages source downloads and updates canonical `cover.localPath`, `sha256`, `downloadedFrom`, and `cachedAt` only after all required downloads succeed. Preserve `cover.url`, `sourceUrl`, source notes, and rights notes. The generator and image verifier prefer local files and reject missing or altered assets; the admin table identifies locally hosted covers. Follow `docs/book-club-access-and-covers.md` if network policy blocks research. Never present fixture/logo bytes used in unit tests as real book covers.

## Routine updates

For a routine Signal or poll update, read `AGENTS.md`, this workflow, `data/book-club.json`, and the published admin backlog page first. If the published page cannot be accessed, use the generated repository admin page and proceed; do not ask for another workbook, mockup, screenshot, or attachment. Apply supplied changes to the canonical JSON, preserve record IDs, update the changelog, run the generator, and verify all consumers together.

### Page counts

Store one positive integer as the display string and the same number as the separate numeric sort key. Never display ranges such as `96–112`, or values like `600+`, on cards or in Signal options. Prefer an existing representative or first reliable source count; if only a range is recorded, use a rounded midpoint. Existing approximate numeric values are acceptable: edition-level precision is not the goal and should not consume research time. Preserve former ranges/conflicts only in admin edition notes, not voter-facing data.

### Poll descriptions and Signal options

Use exactly `{TITLE} - {AUTHOR LAST NAME} | {POLL DESCRIPTION} | {PAGE COUNT DISPLAY} pages`. The literal `pages` is added by the formatter. Preserve the full title, surname, separators, and count. Compute the available description budget as 100 minus the length of the complete option with an empty description; all spaces and punctuation count. Use `signalDescriptionBudget` and `signalOption` from `scripts/book-club-signal.mjs` rather than another formatting implementation.

Draft the description from the source-backed synopsis or publisher/author/catalog description, never from vibes, themes, reviews, or invented plot details. State the central setup without spoilers, genre labels, awards, or unsupported interpretation. Remove the final period. Shorten the description to its individual budget yourself; never truncate the title, hide the option, or delegate a manual-review row to the user. A very long anthology title may require a short faithful description such as `Classic stories`. The generator rejects overflow before writing any output. Check every eligible record, not only the current six, and use `currentPollOrder` when providing current-poll options.

### External links

The user has approved preparing compact verified Wikipedia and Goodreads links on public cards in the Local preview. Prefer small recognizable logos with accessible labels when simple and visually clear; otherwise use text links. Preserve useful verified author/publisher links without cluttering the cards. Match the actual work and distinguish novellas from expanded novels. Omit unmatched links without blank space or missing-link filler. Retain canonical/source URLs for attribution and the admin reference. Include only verified public-facing book links in any corresponding public projection; never expose private research notes. The combined preview must be reviewed before publication.

### Future Signal transcripts

1. Extract new book suggestions and explicit poll results/updates from the supplied transcript. Do not publish chat text, contributor identities, or Suggested By values.
2. Match existing records by title and author before adding rows; preserve IDs and distinguish different works/novella expansions. Assign the next unused persistent ID and a unique slug to genuinely new books.
3. Populate display author, surname, editor credit when applicable, representative numeric page count and sort key, form, original publication year, source-backed spoiler-free synopsis, themes, vibe, verified awards, actual cover/source/rights metadata, and verified Wikipedia/Goodreads links where available. Preserve useful source URLs for attribution/admin use. Keep uncertainty notes in canonical/admin data. Do not invent missing facts.
4. Write the no-period poll description and validate the full <=100-character Signal option using its unique budget. Complete this work yourself rather than asking the user to fix rows.
5. Preserve historical votes and poll dates; update them only from supplied evidence. Do not infer a current-poll selection from a suggestion: update current flags/order only when explicitly instructed, with consecutive order numbers and null order for non-current books.
6. Regenerate poll, backlog, admin, and public JSON from the single dataset. Verification uses canonical record counts so new suggestions do not require hard-coded test-count edits. Check sorting, anchors, public/admin separation, cover loading, and responsive layout. Present one concrete preview before any push, remote pull request, merge, or deployment. After approval, complete the approved publication without requesting the same approval again.

If a source correction is needed, update the JSON only after checking an authoritative source and record the date, fields, reason, source URL, and unresolved follow-up. If the attached workbook is the source of a new data change, reconcile it into the JSON rather than keeping the workbook as a second runtime dependency.

## Verification checklist

1. Validate JSON and run `node scripts/build-book-club.mjs`.
2. Confirm the poll contains exactly the eligible records explicitly selected for it, the public backlog and JSON contain all and only eligible records, and the admin table contains every canonical record with aligned headers and no blank rendered cells.
3. Confirm the public projection and generated pages contain no personal identifiers or internal fields.
4. Test all sorting options, including Awards first with a deterministic title tie-break.
5. Test every Jump To link after sorting and check the direct current, backlog, admin, and data routes.
6. Inspect actual rendered poll, backlog, and admin pages at mobile, intermediate, and desktop widths for overflow, uncropped visible covers, normal-flow navigation, non-clickable cards, compact alphabetically ordered centered Jump To controls, and working actions. Check all sorting modes including Awards first. Offline checks that block external requests do not verify remote cover loading.

## Presentation preferences

Keep poll and backlog cards consistent: image, title, author, single page count, form, original publication year, spoiler-free fuller synopsis, themes, vibe, and verified awards when present. Do not render poll premises/descriptions on public cards. Use a responsive grid with three desktop columns, two intermediate columns, and one mobile column as space permits; cards must not imply clickability. Keep Jump To compact, alphabetically sorted, centered, correctly anchored, and free of tilde-like glyphs.

Preserve the isolated shared book-club header on poll, backlog, and admin, with the supplied uncropped logo and Meetup/Signal actions on all three. On desktop, place the logo left, actions centered, and navigation right. On mobile, allow a full-width uncropped logo, the action row, and a full-width two-option segmented navigation control. Avoid repeated large page/club headings, promotional filler, book counts, and poll-specific explanatory banner text. Only the Signal URL should need changing for a new poll. Do not add personal website navigation or footer links or link to this mini-site from unrelated existing pages.
