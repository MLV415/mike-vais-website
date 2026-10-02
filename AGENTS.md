# Repository guidance

This is a dependency-light static personal website. Preserve unrelated pages and their navigation when changing a scoped section.

## Project-wide communication and task completion

Complete all authorized remaining work that can be done before handing a task back. State clearly what is complete, what the assistant still needs to do, and what the user still needs to do. If no user action is needed, say so. Never call a draft saved in one environment a completed persistent handoff to another environment or device without verifying the destination. For blocked work, explain the concrete limitation and give the smallest specific next step; do not leave vague pending work.

Every prompt provided for the user to paste elsewhere must be a complete standalone prompt in a fenced text code block, so it can be copied in one action. Put explanations outside that block. These preferences apply to every task in this project, not only book-club updates.

## Sci-Fi Book Club

Future book-club tasks must begin by reading, in order:

1. `AGENTS.md`
2. `docs/book-club-data-workflow.md`
3. `data/book-club.json`
4. The current published admin backlog at `/book-club/backlog/admin/`

The book-club pages are an isolated mini-site. Keep only the book-club navigation on those routes and do not add links to the personal website. `data/book-club.json` is the canonical dataset after the initial workbook import. Update it first, record the change in `data/book-club-changelog.md`, then run `node scripts/build-book-club.mjs`. Do not maintain a hand-coded duplicate list in HTML or JavaScript.

Do not expose contributor names, Suggested By fields, internal notes, eligibility operations, poll history, votes, research status, or other private data on public cards or the public JSON endpoint. The unlinked admin table may show the non-personal operational/history fields explicitly requested by the user. Use only source-backed metadata. Preserve the canonical schema's nullable values for unknown facts, but render explicit placeholders instead of blank admin cells. Never invent zero votes or poll counts. Document unresolved images or sources in the changelog.

Use one discrete positive integer for every displayed page count, never ranges or plus-values. Keep the numeric sort field separate but consistent. Every eligible book needs a source-backed poll description with no trailing period and a complete Signal option of at most 100 characters; compute its individual description budget without truncating title, surname, or count. Finish the description yourself rather than shipping a manual-review row. The user has now approved a local preview of re-hosted verified covers and compact Wikipedia/Goodreads links; this supersedes their earlier deferral. Preserve source/rights metadata, omit unmatched links without filler, and use accessible small logos or text links. Implementation and publication remain separate: approval to prepare a local preview does not authorize publishing it. Do not reopen internet configuration troubleshooting as part of routine book-club data changes. Follow the persisted Signal-transcript update procedure in the workflow document.

## Book-club working preferences and persistence

Use one Local chat in the existing project for routine updates until cloud research access has actually been verified. The user supplies the Signal transcript, clarifies poll selection if needed, reviews one concrete preview, and posts the prepared poll/message. The assistant handles research, reconciliation, data entry, Signal formatting, generation, checks, desktop/mobile preview, and approved publication. Do not make routine updates depend on multiple chats, new workbooks, screenshots, file archives, or repeated network-setting changes.

Preview before any push, remote pull request, merge, or deployment, including pushes to non-main branches: the public site is already being shared. This supersedes earlier permission to push without additional review. Complete reversible local work autonomously and do not repeatedly request approval for an already approved result.

Persist new dictated preferences here and in docs/book-club-data-workflow.md during the same draft, resolve superseded instructions, and log material decisions in data/book-club-changelog.md. Include these instruction files with the next approved repository update. GitHub becomes the shared durable record after an approved push; future Codex project chats/devices must use an up-to-date checkout and read these files. Do not rely on chat memory or assume unfinished local files or OneDrive sync are automatically available elsewhere. Latest explicit user instructions take precedence.
