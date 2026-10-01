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

function adminValue(value, fallback = "—") {
  return escapeHtml(value === null || value === undefined || value === "" ? fallback : value);
}

function awardText(book) {
  return (book.awards || []).map((award) => `${award.name} · ${award.category} · ${award.status}${award.distinction ? ` · ${award.distinction}` : ""}`).join("; ");
}

function lengthBand(book) {
  if (book.pageCountMin < 200) return "Short";
  if (book.pageCountMin < 400) return "Medium";
  return "Long";
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
  if (book.cover?.url) {
    return `<div class="book-media" data-image-source="${escapeHtml(book.cover.sourceNote || "")}"><img data-book-image src="${escapeHtml(book.cover.url)}" alt="Cover of ${escapeHtml(book.title)} by ${escapeHtml(book.author)}" loading="lazy"><div class="book-cover-fallback" aria-hidden="true"><span>cover<br>unavailable</span></div></div>`;
  }
  return `<div class="book-media is-fallback" data-image-source="${escapeHtml(book.cover?.sourceNote || "Cover image unavailable; follow up with an authorized source.")}"><div class="book-cover-fallback"><span>cover<br>unavailable</span></div></div>`;
}

function card(book, page) {
  const current = page === "current";
  const fields = [
    field("Page count", book.pageCountDisplay),
    field("Form", book.form),
    field("Published", book.originalPublicationYear),
    awardsField(book),
    field("Synopsis", book.longSynopsis),
    field("Themes", book.themes),
    field("Vibe", book.vibe),
  ].join("");
  return `<article class="book-card" id="${escapeHtml(book.slug)}" data-book-id="${escapeHtml(book.recordId)}" data-page-count-min="${book.pageCountMin}" data-published-year="${book.originalPublicationYear}" data-award-bearing="${book.awards?.length ? "1" : "0"}">
  ${media(book)}
  <div class="book-card-content">
    <h3>${escapeHtml(book.title)}</h3>
    <p class="book-author">${escapeHtml(book.author)}</p>
    <dl class="book-fields">${fields}</dl>
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
    ? `<main><section class="book-club-action" aria-labelledby="current-poll-heading"><div class="book-club-shell book-club-action-inner"><h1 class="visually-hidden" id="current-poll-heading">Current Poll</h1><a class="book-club-button" href="${signalUrl}" target="_blank" rel="noopener noreferrer"><span class="poll-signal-mark" aria-hidden="true"><span></span><span></span><span></span></span><span>Vote in Signal</span></a></div></section>${jumpPanel(list)}<section class="book-list-section book-club-shell" aria-labelledby="poll-books-heading"><h2 class="visually-hidden" id="poll-books-heading">Current poll books</h2>${sortControl()}<div class="book-list" data-book-list>${list.map((book) => card(book, page)).join("\n")}</div></section></main>`
    : `<main><h1 class="visually-hidden" id="backlog-heading">Complete Backlog</h1>${jumpPanel(list)}<section class="book-list-section book-club-shell" aria-labelledby="backlog-books-heading"><h2 class="visually-hidden" id="backlog-books-heading">Eligible books</h2>${sortControl()}<div class="book-list" data-book-list>${list.map((book) => card(book, page)).join("\n")}</div></section></main>`;
  return documentShell({ title: current ? "Current Poll" : "Complete Backlog", description: current ? "Current science-fiction book-club poll." : "Complete eligible science-fiction book-club backlog.", active: current ? "current" : "backlog", content, script: current ? "../book-club.js" : "../../book-club.js" });
}

function adminPage() {
  const rows = books.map((book) => {
    const awardStatus = book.awards?.length ? "Verified" : "No verified award claim recorded in this pass";
    const imageStatus = book.cover?.status || "Not yet sourced";
    const metadataStatus = "Source-backed public metadata populated";
    const editorCredit = book.recordId === "B14" ? "Robert Silverberg" : "";
    const awardSources = book.awards?.length ? sourceLinks(book.sources) : "—";
    const image = book.cover?.url
      ? `<a href="${escapeHtml(book.cover.url)}" target="_blank" rel="noopener noreferrer">Image</a><br><a href="${escapeHtml(book.cover.sourceUrl || "")}" target="_blank" rel="noopener noreferrer">Catalog source</a><br>${adminValue(book.cover.rightsNote)}`
      : adminValue(book.cover?.status, "Not yet sourced");
    return `<tr data-page-count-min="${book.pageCountMin}" data-published-year="${book.originalPublicationYear}" data-award-bearing="${book.awards?.length ? "1" : "0"}><th scope="row">${escapeHtml(book.recordId)}</th><td>${escapeHtml(book.title)}</td><td>${escapeHtml(book.author)}</td><td>${adminValue(editorCredit)}</td><td>${adminValue(book.eligibilityStatus, "Eligible")}</td><td>${book.currentPoll ? "Yes" : "No"}</td><td>${adminValue(book.pollOrder)}</td><td>${adminValue(book.pageCountDisplay)}</td><td>${adminValue(book.pageCountMin)}</td><td>${lengthBand(book)}</td><td>${adminValue(book.form)}</td><td>${adminValue(book.originalPublicationYear)}</td><td>${adminValue(book.longSynopsis)}</td><td>${adminValue((book.themes || []).join("; "))}</td><td>${adminValue((book.vibe || []).join("; "))}</td><td>${adminValue(awardText(book))}</td><td>${awardStatus}</td><td>${awardSources}</td><td>${image}</td><td>${adminValue(book.cover?.sourceNote)}</td><td>${imageStatus}</td><td>${adminValue(book.lastPollDate)}</td><td>${adminValue(book.lastPollVotes, "0")}</td><td>${adminValue(book.totalPolls, "0")}</td><td>${adminValue(book.totalVotes, "0")}</td><td>${book.awards?.length ? "1" : "0"}</td><td>${adminValue(book.websiteDisplayNotes)}</td><td>${sourceLinks(book.sources)}</td><td>${metadataStatus}</td><td>${adminValue(book.lastVerifiedDate, data.dataVersion)}</td><td>${adminValue(book.editionNote)}</td></tr>`;
  }).join("\n");
  const content = `<main><section class="book-club-intro"><div class="book-club-shell"><p class="book-club-kicker">MAINTENANCE REFERENCE</p><h1>Backlog Data</h1><p class="admin-version">Data version ${escapeHtml(data.dataVersion)} · ${books.length} eligible records</p><p class="admin-scope-note">This table reconciles the non-personal workbook fields used by the site. Personal and internal contributor or workflow fields remain excluded from web output.</p></div></section><section class="admin-table-section book-club-shell" aria-labelledby="admin-heading"><h2 class="visually-hidden" id="admin-heading">Complete eligible book data</h2>${sortControl()}<div class="admin-table-wrap"><table class="book-data-table" data-book-table><caption>Book-club data reconciled from the canonical repository dataset and source-of-truth workbook.</caption><thead><tr><th scope="col">ID</th><th scope="col">Title</th><th scope="col">Display author / attribution</th><th scope="col">Editor credit</th><th scope="col">Eligibility status</th><th scope="col">Current poll</th><th scope="col">Current poll order</th><th scope="col">Page count display</th><th scope="col">Page count min</th><th scope="col">Length band</th><th scope="col">Form</th><th scope="col">Original publication year</th><th scope="col">Long synopsis</th><th scope="col">Themes</th><th scope="col">Vibe / reading feel</th><th scope="col">Existing award claim</th><th scope="col">Award verification status</th><th scope="col">Award source URL</th><th scope="col">Cover image URL</th><th scope="col">Image source / rights note</th><th scope="col">Image verification status</th><th scope="col">Last poll date</th><th scope="col">Last poll votes</th><th scope="col">Total polls</th><th scope="col">Total votes</th><th scope="col">Awards first sort key</th><th scope="col">Website display notes</th><th scope="col">Primary metadata source URL</th><th scope="col">Metadata source status</th><th scope="col">Last verified date</th><th scope="col">Page count / edition note</th></tr></thead><tbody>${rows}</tbody></table></div></section></main>`;
  return documentShell({ title: "Backlog Data", description: "Read-only public data reference for the science-fiction book club.", active: "admin", content, script: "../../../book-club.js" });
}

const publicBooks = books.map(({ pageCountMin, pollPremise, lastPollDate, lastPollVotes, totalPolls, totalVotes, ...book }) => book);
await mkdir(join(root, "book-club/backlog/admin"), { recursive: true });
await mkdir(join(root, "book-club/data"), { recursive: true });
await writeFile(join(root, "book-club/index.html"), publicPage("current", currentBooks));
await writeFile(join(root, "book-club/backlog/index.html"), publicPage("backlog", backlogBooks));
await writeFile(join(root, "book-club/backlog/admin/index.html"), adminPage());
await writeFile(join(root, "book-club/data/books.json"), `${JSON.stringify({ dataVersion: data.dataVersion, books: publicBooks }, null, 2)}\n`);
