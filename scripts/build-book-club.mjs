import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dataPath = join(root, "data", "book-club.json");
const data = JSON.parse(await readFile(dataPath, "utf8"));
const books = data.books;
const currentBooks = books.filter((book) => book.currentPoll).sort((a, b) => a.pollOrder - b.pollOrder);
const backlogBooks = books.slice().sort((a, b) => a.pageCountMin - b.pageCountMin || a.title.localeCompare(b.title));
const signalUrl = "https://signal.group/#CjQKIELXnb1Dqzb2Ppp_IIz49Ac4_aBG58FFr5jJnIgpLTytEhBtemm4UenXg4IaGaqJDYSX";

function escapeHtml(value = "") {
  return String(value).replace(/[&<>"']/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[character]);
}

function sourceLinks(urls = []) {
  return urls.map((url) => `<a href="${escapeHtml(url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(new URL(url).hostname.replace(/^www\./, ""))}</a>`).join(" ");
}

function field(label, value, className = "") {
  if (!value || (Array.isArray(value) && value.length === 0)) return "";
  const content = Array.isArray(value) ? value.map((item) => `<span class="${className || "vibe-pill"}">${escapeHtml(item)}</span>`).join("") : escapeHtml(value);
  return `<div><dt>${escapeHtml(label)}</dt><dd>${content}</dd></div>`;
}

function awardsField(book) {
  if (!book.awards?.length) return "";
  const awards = book.awards.map((award) => `<span class="book-award">${escapeHtml(award.name)} · ${escapeHtml(award.category)} · ${escapeHtml(award.status)}${award.distinction ? ` · ${escapeHtml(award.distinction)}` : ""}</span>`).join("");
  return `<div class="book-awards"><dt>Awards</dt><dd>${awards}</dd></div>`;
}

function media(book) {
  if (book.cover?.url) {
    return `<div class="book-media" data-image-source="${escapeHtml(book.cover.sourceNote || "")}"><img data-book-image src="${escapeHtml(book.cover.url)}" alt="Cover of ${escapeHtml(book.title)} by ${escapeHtml(book.author)}" loading="lazy"><div class="book-cover-fallback" aria-hidden="true"><span>cover<br>unavailable</span></div></div>`;
  }
  return `<div class="book-media is-fallback" data-image-source="${escapeHtml(book.cover?.sourceNote || "Cover image unavailable; follow up with an authorized source.")}"><div class="book-cover-fallback"><span>cover<br>unavailable</span></div></div>`;
}

function card(book, page) {
  const current = page === "current";
  const fields = current
    ? [field("Page count", book.pageCountDisplay), field("Poll premise", book.pollPremise), field("Vibe", book.vibe)].join("")
    : [field("Page count", book.pageCountDisplay), field("Form", book.form), field("Published", book.originalPublicationYear), field("Synopsis", book.longSynopsis), field("Themes", book.themes), field("Vibe", book.vibe)].join("");
  return `<article class="book-card" id="${escapeHtml(book.slug)}" data-book-id="${escapeHtml(book.recordId)}" data-page-count-min="${book.pageCountMin}" data-published-year="${book.originalPublicationYear}" data-award-bearing="${book.awards?.length ? "1" : "0"}">
  ${media(book)}
  <div class="book-card-content">
    <h3>${escapeHtml(book.title)}</h3>
    <p class="book-author">${escapeHtml(book.author)}</p>
    <dl class="book-fields">${fields}${awardsField(book)}</dl>
  </div>
</article>`;
}

function jumpPanel(list) {
  return `<section class="jump-panel book-club-shell" aria-labelledby="jump-heading"><p class="book-club-label" id="jump-heading">JUMP TO</p><nav class="jump-links" aria-label="Jump to a book">${list.map((book) => `<a href="#${escapeHtml(book.slug)}"><span class="jump-icon" aria-hidden="true">⌁</span><span>${escapeHtml(book.title)}</span></a>`).join("")}</nav></section>`;
}

function sortControl(id = "sort-books") {
  return `<div class="book-list-tools"><label for="${id}">Sort by</label><select id="${id}" data-sort-books><option value="pages">Page count</option><option value="title">Title A–Z</option><option value="author">Author A–Z</option><option value="year">Published year</option><option value="awards">Awards first</option></select><span class="visually-hidden" data-sort-status role="status">Sorted by Page count</span></div>`;
}

function localNav(active) {
  return `<header class="book-club-local-nav"><div class="book-club-shell"><a class="book-club-brand" href="/book-club/">SCI-FI BOOK CLUB</a><nav aria-label="Book club navigation"><a href="/book-club/"${active === "current" ? ' aria-current="page"' : ""}>Current Poll</a><a href="/book-club/backlog/"${active === "backlog" ? ' aria-current="page"' : ""}>Complete Backlog</a></nav></div></header>`;
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
    ? `<main><section class="book-club-intro"><div class="book-club-shell"><p class="book-club-kicker">SCI-FI BOOK CLUB</p><h1>Voter’s Guide</h1></div></section><section class="current-poll" aria-labelledby="current-poll-heading"><div class="book-club-shell current-poll-inner"><div><div class="poll-signal-mark" aria-hidden="true"><span></span><span></span><span></span></div><p class="book-club-label">CURRENT POLL</p><h2 id="current-poll-heading">Vote for our next book!</h2><p class="poll-question">Multiple votes allowed. These are &lt;200 pages. Longer books next poll!</p></div><div class="poll-action"><strong>${currentBooks.length} short books</strong><a class="book-club-button" href="${signalUrl}" target="_blank" rel="noopener noreferrer">Vote in Signal</a></div></div></section>${jumpPanel(list)}<section class="book-list-section book-club-shell" aria-labelledby="poll-books-heading"><h2 class="visually-hidden" id="poll-books-heading">Current poll books</h2>${sortControl()}<div class="book-list" data-book-list>${list.map((book) => card(book, page)).join("\n")}</div></section></main>`
    : `<main><section class="book-club-intro"><div class="book-club-shell"><p class="book-club-kicker">SCI-FI BOOK CLUB</p><h1>Complete Backlog</h1></div></section>${jumpPanel(list)}<section class="book-list-section book-club-shell" aria-labelledby="backlog-heading"><h2 class="visually-hidden" id="backlog-heading">Eligible books</h2>${sortControl()}<div class="book-list" data-book-list>${list.map((book) => card(book, page)).join("\n")}</div></section></main>`;
  return documentShell({ title: current ? "Voter’s Guide" : "Complete Backlog", description: current ? "The current science-fiction book-club poll and voter’s guide." : "The complete eligible science-fiction book-club backlog.", active: current ? "current" : "backlog", content, script: current ? "../book-club.js" : "../../book-club.js" });
}

function adminPage() {
  const rows = books.map((book) => `<tr data-page-count-min="${book.pageCountMin}" data-published-year="${book.originalPublicationYear}" data-award-bearing="${book.awards?.length ? "1" : "0"}"><th scope="row">${escapeHtml(book.recordId)}</th><td>${escapeHtml(book.title)}</td><td>${escapeHtml(book.author)}</td><td>${book.currentPoll ? "Yes" : "No"}</td><td>${escapeHtml(book.pageCountDisplay)}</td><td>${escapeHtml(book.form)}</td><td>${book.originalPublicationYear}</td><td>${escapeHtml(book.pollPremise || "")}</td><td>${escapeHtml(book.longSynopsis || "")}</td><td>${escapeHtml((book.themes || []).join("; "))}</td><td>${escapeHtml((book.vibe || []).join("; "))}</td><td>${(book.awards || []).map((award) => escapeHtml(`${award.name} · ${award.category} · ${award.status}${award.distinction ? ` · ${award.distinction}` : ""}`)).join("<br>")}</td><td>${book.cover?.url ? `<a href="${escapeHtml(book.cover.url)}">Cover</a>` : escapeHtml(book.cover?.status || "Unavailable")}</td><td>${sourceLinks(book.sources)}</td><td>${escapeHtml(book.editionNote || "")}</td></tr>`).join("\n");
  const content = `<main><section class="book-club-intro"><div class="book-club-shell"><p class="book-club-kicker">MAINTENANCE REFERENCE</p><h1>Backlog Data</h1><p class="admin-version">Data version ${escapeHtml(data.dataVersion)} · ${books.length} eligible records</p></div></section><section class="admin-table-section book-club-shell" aria-labelledby="admin-heading"><h2 class="visually-hidden" id="admin-heading">Complete eligible book data</h2>${sortControl()}<div class="admin-table-wrap"><table class="book-data-table" data-book-table><caption>Public book-club data from the canonical repository dataset.</caption><thead><tr><th scope="col">ID</th><th scope="col">Title</th><th scope="col">Author</th><th scope="col">Current poll</th><th scope="col">Page count</th><th scope="col">Form</th><th scope="col">Published</th><th scope="col">Poll premise</th><th scope="col">Long synopsis</th><th scope="col">Themes</th><th scope="col">Vibe</th><th scope="col">Awards</th><th scope="col">Cover</th><th scope="col">Sources</th><th scope="col">Edition note</th></tr></thead><tbody>${rows}</tbody></table></div></section></main>`;
  return documentShell({ title: "Backlog Data", description: "Read-only public data reference for the science-fiction book club.", active: "admin", content, script: "../../../book-club.js" });
}

const publicBooks = books.map(({ pageCountMin, ...book }) => book);
await mkdir(join(root, "book-club/backlog/admin"), { recursive: true });
await mkdir(join(root, "book-club/data"), { recursive: true });
await writeFile(join(root, "book-club/index.html"), publicPage("current", currentBooks));
await writeFile(join(root, "book-club/backlog/index.html"), publicPage("backlog", backlogBooks));
await writeFile(join(root, "book-club/backlog/admin/index.html"), adminPage());
await writeFile(join(root, "book-club/data/books.json"), `${JSON.stringify({ dataVersion: data.dataVersion, books: publicBooks }, null, 2)}\n`);
