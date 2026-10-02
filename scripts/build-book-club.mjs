import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { signalOption } from "./book-club-signal.mjs";
import { coverUrl, verifyLocalCover } from "./book-club-covers.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dataPath = join(root, "data", "book-club.json");
const data = JSON.parse(await readFile(dataPath, "utf8"));
const books = data.books;
// Fail before writing any page rather than publishing blank/manual-review options.
books.forEach(signalOption);
await Promise.all(books.map((book) => verifyLocalCover(book, root)));
const currentBooks = books.filter((book) => book.currentPoll).sort((a, b) => a.currentPollOrder - b.currentPollOrder);
const backlogBooks = books.slice().sort((a, b) => a.pageCountSortKey - b.pageCountSortKey || a.title.localeCompare(b.title));
const signalUrl = "https://signal.group/#CjQKIELXnb1Dqzb2Ppp_IIz49Ac4_aBG58FFr5jJnIgpLTytEhBtemm4UenXg4IaGaqJDYSX";
const meetupUrl = "https://www.meetup.com/cosmic-chapter-chat-santa-cruzs-sci-fi-book-club/";

function escapeHtml(value = "") {
  return String(value).replace(/[&<>"']/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[character]);
}

function sourceLinks(urls = []) {
  return urls.map((url) => `<a href="${escapeHtml(url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(new URL(url).hostname.replace(/^www\./, ""))}</a>`).join(" ");
}

function externalLinksField(book) {
  const links = (book.externalLinks || []).map((link) => `<a href="${escapeHtml(link.url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(link.label)}</a>`).join("");
  if (!links) return "";
  return `<section class="book-external-links" aria-labelledby="${escapeHtml(book.slug)}-external-links"><h4 id="${escapeHtml(book.slug)}-external-links">External links</h4><div>${links}</div></section>`;
}

function adminValue(value, fallback = "—") {
  return escapeHtml(value === null || value === undefined || value === "" ? fallback : value);
}

function awardText(book) {
  return (book.awards || []).map((award) => `${award.name} · ${award.category} · ${award.status}${award.distinction ? ` · ${award.distinction}` : ""}`).join("; ");
}

function lengthBand(book) {
  if (book.pageCountSortKey < 200) return "Short";
  if (book.pageCountSortKey < 400) return "Medium";
  return "Long";
}

function signalLink(className = "book-club-nav-signal") {
  return `<a class="${className}" href="${signalUrl}" target="_blank" rel="noopener noreferrer"><span class="poll-signal-mark" aria-hidden="true"><span></span><span></span><span></span></span><span>Vote in Signal</span></a>`;
}

function meetupLink() {
  return `<a class="book-club-nav-meetup" href="${meetupUrl}" target="_blank" rel="noopener noreferrer"><span>Meetup Group</span></a>`;
}

function field(label, value, className = "") {
  const empty = !value || (Array.isArray(value) && value.length === 0);
  const content = empty
    ? `<span class="field-missing">Not yet sourced</span>`
    : Array.isArray(value)
      ? value.map((item) => `<span class="${className || "vibe-pill"}">${escapeHtml(item)}</span>`).join("")
      : escapeHtml(value);
  const fieldClass = label.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  return `<div class="book-field book-field-${fieldClass}"><dt>${escapeHtml(label)}</dt><dd>${content}</dd></div>`;
}

function awardsField(book) {
  if (!book.awards?.length) return "";
  const awards = book.awards.map((award) => `<span class="book-award">${escapeHtml(award.name)} · ${escapeHtml(award.category)} · ${escapeHtml(award.status)}${award.distinction ? ` · ${escapeHtml(award.distinction)}` : ""}</span>`).join("");
  return `<div class="book-awards"><dt>Awards</dt><dd>${awards}</dd></div>`;
}

function media(book) {
  if (coverUrl(book)) {
    return `<div class="book-media"><img data-book-image src="${escapeHtml(coverUrl(book))}" alt="Cover of ${escapeHtml(book.title)} by ${escapeHtml(book.displayAuthor)}" loading="lazy"><div class="book-cover-fallback" aria-hidden="true"><span>cover<br>unavailable</span></div></div>`;
  }
  return `<div class="book-media is-fallback"><div class="book-cover-fallback"><span>cover<br>unavailable</span></div></div>`;
}

function card(book, page) {
  const fields = [
    field("Page count", book.pageCountDisplay),
    field("Form", book.form),
    field("Published", book.originalPublicationYear),
    awardsField(book),
    field("Synopsis", book.longSynopsis),
    field("Themes", book.themes),
    field("Vibe", book.vibe),
  ].join("");
  return `<article class="book-card" id="${escapeHtml(book.slug)}" data-book-id="${escapeHtml(book.recordId)}" data-page-count-sort-key="${book.pageCountSortKey}" data-published-year="${book.originalPublicationYear}" data-award-bearing="${book.awards?.length ? "1" : "0"}">
  ${media(book)}
  <div class="book-card-content">
    <h3>${escapeHtml(book.title)}</h3>
    <p class="book-author">${escapeHtml(book.displayAuthor)}</p>
    <dl class="book-fields">${fields}</dl>
${externalLinksField(book)}
  </div>
</article>`;
}

function jumpPanel(list) {
  return `<section class="jump-panel book-club-shell" aria-labelledby="jump-heading"><p class="book-club-label" id="jump-heading">JUMP TO</p><nav class="jump-links" aria-label="Jump to a book">${list.map((book) => `<a href="#${escapeHtml(book.slug)}"><span>${escapeHtml(book.title)}</span></a>`).join("")}</nav></section>`;
}

function sortControl(id = "sort-books") {
  return `<div class="book-list-tools"><label for="${id}">Sort by</label><select id="${id}" data-sort-books><option value="pages">Page count</option><option value="title">Title A–Z</option><option value="author">Author A–Z</option><option value="year">Published year</option><option value="awards">Awards first</option></select><span class="visually-hidden" data-sort-status role="status">Sorted by Page count</span></div>`;
}

function localNav(active) {
  const actions = `${meetupLink()}${signalLink()}`;
  const logoPath = active === "current" ? "../assets/book-club/cosmic-chapter-chat-logo.png" : active === "backlog" ? "../../assets/book-club/cosmic-chapter-chat-logo.png" : "../../../assets/book-club/cosmic-chapter-chat-logo.png";
  return `<header class="book-club-local-nav"><div class="book-club-shell"><a class="book-club-brand" href="/book-club/"><img class="book-club-logo" src="${logoPath}" alt="Cosmic Chapter Chat Sci-Fi Book Club" loading="eager" decoding="async"></a><div class="book-club-nav-actions">${actions}</div><nav aria-label="Book club navigation"><a href="/book-club/"${active === "current" ? ' aria-current="page"' : ""}>Current Poll</a><a href="/book-club/backlog/"${active === "backlog" ? ' aria-current="page"' : ""}>Complete Backlog</a></nav></div></header>`;
}

function documentShell({ title, description, active, content, script = "../book-club.js" }) {
  const stylesheet = active === "current" ? "../styles.css" : active === "backlog" ? "../../styles.css" : "../../../styles.css";
  const canonical = active === "current" ? "/book-club/" : active === "backlog" ? "/book-club/backlog/" : "/book-club/backlog/admin/";
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="${escapeHtml(description)}">
  <link rel="canonical" href="https://mike-vais.pages.dev${canonical}">
  <title>${escapeHtml(title)} · Sci-Fi Book Club</title>
  <link rel="stylesheet" href="${stylesheet}">
</head>
<body class="book-club-page">
${localNav(active)}
${content}
<script src="${script}" defer></script>
</body>
</html>
<!-- Generated from data/book-club.json. Do not edit this file manually. -->`;
}

function publicPage(page, list) {
  const current = page === "current";
  const content = current
    ? `<main><h1 class="visually-hidden" id="current-poll-heading">Current Poll</h1>${jumpPanel(list)}<section class="book-list-section book-club-shell" aria-labelledby="poll-books-heading"><h2 class="visually-hidden" id="poll-books-heading">Current poll books</h2>${sortControl()}<div class="book-list" data-book-list>${list.map((book) => card(book, page)).join("\n")}</div></section></main>`
    : `<main><h1 class="visually-hidden" id="backlog-heading">Complete Backlog</h1>${jumpPanel(list)}<section class="book-list-section book-club-shell" aria-labelledby="backlog-books-heading"><h2 class="visually-hidden" id="backlog-books-heading">Eligible books</h2>${sortControl()}<div class="book-list" data-book-list>${list.map((book) => card(book, page)).join("\n")}</div></section></main>`;
  return documentShell({ title: current ? "Current Poll" : "Complete Backlog", description: current ? "Current science-fiction book-club poll." : "Complete eligible science-fiction book-club backlog.", active: current ? "current" : "backlog", content, script: current ? "../book-club.js" : "../../book-club.js" });
}

function adminPage() {
  const cell = (value) => `<td>${value}</td>`;
  const columns = [
    ["ID", (book) => `<th scope="row">${escapeHtml(book.recordId)}</th>`],
    ["Title", (book) => cell(escapeHtml(book.title))],
    ["Display author / attribution", (book) => cell(escapeHtml(book.displayAuthor))],
    ["Author last name", (book) => cell(adminValue(book.authorLastName))],
    ["Editor credit", (book) => cell(adminValue(book.editorCredit))],
    ["Eligibility status", (book) => cell(adminValue(book.eligibilityStatus, "Eligible"))],
    ["Current poll", (book) => cell(book.currentPoll ? "Yes" : "No")],
    ["Current poll order", (book) => cell(adminValue(book.currentPollOrder))],
    ["Page count display", (book) => cell(adminValue(book.pageCountDisplay))],
    ["Page count sort key", (book) => cell(adminValue(book.pageCountSortKey))],
    ["Length band", (book) => cell(lengthBand(book))],
    ["Form", (book) => cell(adminValue(book.form))],
    ["Original publication year", (book) => cell(adminValue(book.originalPublicationYear))],
    ["Poll description", (book) => cell(adminValue(book.pollDescription))],
    ["Signal option", (book) => cell(escapeHtml(signalOption(book)))],
    ["Signal option status", () => cell("Ready")],
    ["Long synopsis", (book) => cell(adminValue(book.longSynopsis))],
    ["Themes", (book) => cell(adminValue((book.themes || []).join("; ")))],
    ["Vibe / reading feel", (book) => cell(adminValue((book.vibe || []).join("; ")))],
    ["Existing award claim", (book) => cell(adminValue(awardText(book)))],
    ["Award verification status", (book) => cell(book.awards?.length ? "Verified" : "No verified award claim recorded in this pass")],
    ["Award source URL", (book) => cell(book.awards?.length ? sourceLinks(book.sources) : "—")],
    ["Cover image URL", (book) => cell(book.cover?.url
      ? `<a href="${escapeHtml(coverUrl(book))}" target="_blank" rel="noopener noreferrer">Image</a><br><a href="${escapeHtml(book.cover.sourceUrl || "")}" target="_blank" rel="noopener noreferrer">Catalog source</a>`
      : adminValue(book.cover?.status, "Not yet sourced"))],
    ["Image source / rights note", (book) => cell(adminValue(`${book.cover?.sourceNote || ""}${book.cover?.rightsNote ? ` ${book.cover.rightsNote}` : ""}`))],
    ["Image verification status", (book) => cell(book.cover?.localPath ? "Repository-hosted cover; checksum verified during build" : book.cover?.status || "Not yet sourced")],
    ["Last poll date", (book) => cell(adminValue(book.lastPollDate))],
    ["Last poll votes", (book) => cell(adminValue(book.lastPollVotes, "0"))],
    ["Total polls", (book) => cell(adminValue(book.totalPolls, "0"))],
    ["Total votes", (book) => cell(adminValue(book.totalVotes, "0"))],
    ["Awards first sort key", (book) => cell(book.awards?.length ? "1" : "0")],
    ["Website display notes", (book) => cell(adminValue(book.websiteDisplayNotes))],
    ["Primary metadata source URL", (book) => cell(sourceLinks(book.sources))],
    ["Metadata source status", () => cell("Source-backed public metadata populated")],
    ["Last verified date", (book) => cell(adminValue(book.lastVerifiedDate, data.dataVersion))],
    ["Page count / edition note", (book) => cell(adminValue(book.editionNote))],
  ];
  const headers = columns.map(([label]) => `<th scope="col">${label}</th>`).join("");
  const rows = books.map((book) => {
    return `<tr data-page-count-sort-key="${book.pageCountSortKey}" data-published-year="${book.originalPublicationYear}" data-award-bearing="${book.awards?.length ? "1" : "0"}">${columns.map(([, render]) => render(book)).join("")}</tr>`;
  }).join("\n");
  const content = `<main><section class="book-club-intro"><div class="book-club-shell"><p class="book-club-kicker">MAINTENANCE REFERENCE</p><h1>Backlog Data</h1><p class="admin-version">Data version ${escapeHtml(data.dataVersion)} · ${books.length} eligible records</p><p class="admin-scope-note">This table reconciles the non-personal workbook fields used by the site. Personal and internal contributor or workflow fields remain excluded from web output.</p></div></section><section class="admin-table-section book-club-shell" aria-labelledby="admin-heading"><h2 class="visually-hidden" id="admin-heading">Complete eligible book data</h2>${sortControl()}<div class="admin-table-wrap"><table class="book-data-table" data-book-table><caption>Book-club data reconciled from the canonical repository dataset and source-of-truth workbook.</caption><thead><tr>${headers}</tr></thead><tbody>${rows}</tbody></table></div></section></main>`;
  return documentShell({ title: "Backlog Data", description: "Read-only public data reference for the science-fiction book club.", active: "admin", content, script: "../../../book-club.js" });
}

const publicBooks = books.map(({ authorLastName, editorCredit, pollDescription, lastPollDate, lastPollVotes, totalPolls, totalVotes, editionNote, sources, websiteDisplayNotes, lastVerifiedDate, eligibilityStatus, ...book }) => ({
  ...book,
  cover: { url: coverUrl(book), sourceUrl: book.cover?.sourceUrl, rightsNote: book.cover?.rightsNote },
}));
await mkdir(join(root, "book-club/backlog/admin"), { recursive: true });
await mkdir(join(root, "book-club/data"), { recursive: true });
await writeFile(join(root, "book-club/index.html"), publicPage("current", currentBooks));
await writeFile(join(root, "book-club/backlog/index.html"), publicPage("backlog", backlogBooks));
await writeFile(join(root, "book-club/backlog/admin/index.html"), adminPage());
await writeFile(join(root, "book-club/data/books.json"), `${JSON.stringify({ dataVersion: data.dataVersion, books: publicBooks }, null, 2)}\n`);
