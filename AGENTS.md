# Repository guidance

This is a dependency-light static personal website. Preserve unrelated pages and their navigation when changing a scoped section.

## Project-wide communication and task completion

Complete all authorized remaining work that can be done before handing a task back. State clearly what is complete, what the assistant still needs to do, and what the user still needs to do. If no user action is needed, say so. Never call a draft saved in one environment a completed persistent handoff to another environment or device without verifying the destination. For blocked work, explain the concrete limitation and give the smallest specific next step; do not leave vague pending work.

Every prompt given to the user, including prompts to paste elsewhere, must be a complete standalone prompt in a fenced text code block, so it can be copied in one action. Put explanations outside that block. These preferences apply to every task in this project, not only book-club updates.

Save every new user instruction to persistent project files during the same task and explicitly confirm that it was saved in the reply. Record its scope: do not silently turn a one-off task into a recurring rule. If it appears one-off and its future applicability is unclear, ask whether to repeat it for future tasks; save the current instruction with its current-task scope in the meantime. Put project-wide rules here, book-club procedures in the workflow guide, and task-specific details in HANDOFF.md/the changelog. Resolve superseded guidance without deleting historical decisions. Local saved files are persistent on this device, not proof of synchronization to another chat/device or GitHub.

## Sci-Fi Book Club

Future book-club tasks must begin by reading, in order:

1. `AGENTS.md`
2. `docs/book-club-data-workflow.md`
3. `data/book-club.json`
4. The current published admin backlog at `/book-club/backlog/admin/`

The book-club pages are an isolated mini-site. Keep only the book-club navigation on those routes and do not add links to the personal website. `data/book-club.json` is the canonical dataset after the initial workbook import. Update it first, record the change in `data/book-club-changelog.md`, then run `node scripts/build-book-club.mjs`. Do not maintain a hand-coded duplicate list in HTML or JavaScript.

Do not expose contributor names, Suggested By fields, internal notes, eligibility operations, poll history, votes, research status, or other private data on public cards or the public JSON endpoint. The unlinked admin table may show the non-personal operational/history fields explicitly requested by the user. Use only source-backed metadata. Preserve the canonical schema's nullable values for unknown facts, but render explicit placeholders instead of blank admin cells. Never invent zero votes or poll counts; preserve existing verified zeroes. Document unresolved images or sources in the changelog.

Use one discrete positive integer for every displayed page count, never ranges or plus-values. Keep the numeric sort field separate but consistent. Every eligible book needs a source-backed poll description with no trailing period and a complete Signal option of at most 100 characters; compute its individual description budget without truncating title, surname, or count. Finish the description yourself rather than shipping a manual-review row.

Use standardized structural form options: Novel, Novella, Short Story Collection, and Anthology. Use Short Story Collection for a single author's collected stories and Anthology for an edited multi-author selection. Keep audience/genre qualifiers (e.g. middle-grade, young-adult, fantasy) and short-novel/edition nuances out of Form; retain relevant existing context in other metadata/admin notes. Do not classify by page count alone. The controlled vocabulary in scripts/book-club-forms.mjs is shared by generation and checks; extend it deliberately only for a genuinely different source-backed form.

Use verified, repository-hosted covers, retaining original URLs, source/rights notes, checksums, and retrieval metadata. On cards, put Wikipedia then Goodreads first on their own compact logo-and-label line. Put other verified resources on a separate line below, labeled Author Site and Publisher Site (Book Site for a distinct official book website). Include author or book-specific webpages when found, not generic publisher homepages (including book URLs that redirect to a generic homepage). Keep cards uncluttered: omit unmatched links/empty rows without filler and avoid duplicate regional publisher links. Preserve unselected research references in canonical/admin data. Verify the actual work, especially novella/expanded-novel distinctions, and document related-edition context. Do not reopen cloud internet configuration troubleshooting as part of routine data changes. Follow the persisted Signal-transcript update procedure in the workflow document.

Always show a local or unpublished preview and wait for user review before any push, remote pull request, merge, or deployment of book-club changes. A request to implement or approval of the scope is not publication approval. Preserve unrelated website pages, existing images, IDs, history, design, and numeric page counts. The workflow lives in this repository so it can be retrieved in another chat/device; unpublished local changes are not assumed to be synchronized.

## Book-club working preferences and persistence

Use one Local chat in the existing project for routine updates until cloud research access has actually been verified. The user supplies the Signal transcript, clarifies poll selection if needed, reviews one concrete preview, and posts the prepared poll/message. The assistant handles research, reconciliation, data entry, Signal formatting, generation, checks, desktop/mobile preview, and approved publication. Do not make routine updates depend on multiple chats, new workbooks, screenshots, file archives, or repeated network-setting changes.

Preview before any push, remote pull request, merge, or deployment, including pushes to non-main branches: the public site is already being shared. This supersedes earlier permission to push without additional review. Complete reversible local work autonomously and do not repeatedly request approval for an already approved result.

Persist every new instruction using the project-wide rule above, update this guide and docs/book-club-data-workflow.md for recurring book-club preferences during the same draft, and log material decisions in data/book-club-changelog.md. Confirm saved instructions in the reply. Include these instruction files with the next approved repository update. GitHub becomes the shared durable record after an approved push; future Codex project chats/devices must use an up-to-date checkout and read these files. Do not rely on chat memory or assume unfinished local files or OneDrive sync are automatically available elsewhere. Latest explicit user instructions take precedence.
