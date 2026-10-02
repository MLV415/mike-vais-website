import { readFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const data = JSON.parse(await readFile(join(root, "data/book-club.json"), "utf8"));
const current = await readFile(join(root, "book-club/index.html"), "utf8");
const backlog = await readFile(join(root, "book-club/backlog/index.html"), "utf8");
const admin = await readFile(join(root, "book-club/backlog/admin/index.html"), "utf8");
const publicData = await readFile(join(root, "book-club/data/books.json"), "utf8");

const failures = [];
const assert = (condition, message) => {
  if (!condition) failures.push(message);
};
const count = (text, pattern) => text.match(new RegExp(pattern, "g"))?.length || 0;

const allBooks = data.books;
const currentBooks = allBooks.filter((book) => book.currentPoll).sort((a, b) => a.currentPollOrder - b.currentPollOrder);
const publicBannedCopy = /Vote for our next book|short books|Multiple votes allowed|These are &lt;200 pages|Longer books next poll|small orbit|SHORT LIST|one next read|See all 14|Opens the Signal|Suggested By|Stefan|Liam|Irene|Celeste|Internal|Research Status|Eligibility Status|Last Poll|Total Votes/;
const adminBannedCopy = /Poll premise|pollPremise|Suggested By|Stefan|Liam|Irene|Celeste|Personal website|mike vais|Author Full Name|Research Status/;

assert(allBooks.length === 14, `expected 14 canonical books, found ${allBooks.length}`);
assert(currentBooks.length === 6, `expected 6 current-poll books, found ${currentBooks.length}`);
assert(allBooks.every((book) => book.cover?.url && book.cover?.sourceUrl && book.cover?.rightsNote), "every book needs an image URL, source URL, and rights note");
assert(allBooks.every((book) => /^(?:\d+|\d+[–-]\d+|\d+\+)$/.test(String(book.pageCountDisplay))), "every book needs a valid page-count display value");
assert(allBooks.every((book) => Number.isInteger(book.pageCountSortKey) && book.pageCountSortKey > 0), "every book needs a numeric page-count sort key");
assert(allBooks.every((book) => typeof book.displayAuthor === "string" && typeof book.authorLastName === "string" && Object.hasOwn(book, "editorCredit")), "author attribution fields are not normalized");
assert(allBooks.every((book) => !Object.hasOwn(book, "author") && !Object.hasOwn(book, "pollOrder") && !Object.hasOwn(book, "pageCountMin") && !Object.hasOwn(book, "pollPremise")), "redundant legacy data fields remain");
assert(currentBooks.every((book, index) => book.currentPoll && book.currentPollOrder === index + 1), "current poll flags and order contradict each other");
assert(allBooks.filter((book) => !book.currentPoll).every((book) => book.currentPollOrder === null), "backlog records must not have a current-poll order");
assert(allBooks.every((book) => typeof book.pollDescription === "string" && book.pollDescription.length > 0), "every book needs a poll description");
assert(allBooks.every((book) => !/\b(?:award|hugo|nebula|science-fiction|sci-fi)\b/i.test(book.pollDescription)), "poll descriptions must not use awards or genre-label wording");
assert(allBooks.every((book) => Array.isArray(book.externalLinks) && book.externalLinks.every((link) => book.sources.includes(link.url))), "external links must reuse verified source URLs");
assert(current.includes("Current Poll") && current.includes("Vote in Signal"), "current poll action is missing its label or Signal link");
assert(count(current, "id=\"current-poll-heading\"") === 1, "current poll should have one accessible heading");
assert(current.includes("book-club-nav-signal") && !current.includes("book-club-action"), "Signal action is not integrated into the navigation row");
assert(count(current, "book-club-nav-meetup") === 1 && count(backlog, "book-club-nav-meetup") === 1, "Meetup action is missing from a public page");
assert(count(current, "book-club-nav-signal") === 1 && count(backlog, "book-club-nav-signal") === 1 && count(admin, "book-club-nav-signal") === 1, "Signal action is missing from a generated page");
assert(current.includes("https://www.meetup.com/cosmic-chapter-chat-santa-cruzs-sci-fi-book-club/") && backlog.includes("https://www.meetup.com/cosmic-chapter-chat-santa-cruzs-sci-fi-book-club/"), "Meetup URL is incorrect or missing");
assert(count(current, "book-club-logo") === 1 && count(backlog, "book-club-logo") === 1 && count(admin, "book-club-logo") === 1, "book-club logo image is missing from a generated page");
assert(!current.includes('class="book-club-brand" href="/book-club/">SCI-FI BOOK CLUB') && !backlog.includes('class="book-club-brand" href="/book-club/">SCI-FI BOOK CLUB'), "text brand remains instead of the logo image");
assert(!publicBannedCopy.test(current) && !publicBannedCopy.test(backlog) && !publicBannedCopy.test(publicData), "removed private or promotional copy remains in public generated pages");
assert(!adminBannedCopy.test(admin), "private or excluded workbook fields remain in generated admin output");
assert(!/Poll premise|pollPremise|lastPollDate|lastPollVotes|totalPolls|totalVotes/.test(current + backlog + publicData), "admin-only poll fields remain in public generated output");
assert(!/Poll description|pollDescription/.test(publicData), "poll descriptions remain in the public data projection");
assert(!/[⌁~]/.test(current) && !/[⌁~]/.test(backlog), "a tilde-like Jump To glyph remains");
assert(!current.includes("jump-icon") && !backlog.includes("jump-icon"), "Jump To still contains an icon element");
assert([...current.matchAll(/<article[^>]*class="book-card"[\s\S]*?<\/article>/g)].every(([card]) => !/<a\s/.test(card.replace(/<section class="book-external-links"[\s\S]*?<\/section>/, ""))), "current cards contain non-external clickable links");
assert([...backlog.matchAll(/<article[^>]*class="book-card"[\s\S]*?<\/article>/g)].every(([card]) => !/<a\s/.test(card.replace(/<section class="book-external-links"[\s\S]*?<\/section>/, ""))), "backlog cards contain non-external clickable links");
assert(count(current, "data-book-image") === currentBooks.length, "current poll does not have one image element per card");
assert(count(backlog, "data-book-image") === allBooks.length, "backlog does not have one image element per card");
assert(count(current, "book-external-links") === currentBooks.length && count(backlog, "book-external-links") === allBooks.length, "every public card needs an external-links section");
const signalOptions = allBooks.map((book) => `${book.title} - ${book.authorLastName} | ${book.pollDescription} | ${book.pageCountDisplay} pages`);
const signalOverflow = allBooks.filter((book, index) => signalOptions[index].length > 100).map((book) => book.recordId);
assert(signalOverflow.length === 1 && signalOverflow[0] === "B14", `unexpected Signal options over 100 characters: ${signalOverflow.join(", ")}`);
assert(signalOptions.filter((_, index) => !signalOverflow.includes(allBooks[index].recordId)).every((option) => option.length <= 100 && option.endsWith(" pages")), "a generated Signal option exceeds 100 characters or omits pages");
for (const header of ["Author last name", "Current poll order", "Page count display", "Page count sort key", "Poll description", "Signal option", "Signal option status", "Last poll date", "Last poll votes", "Total polls", "Total votes", "Award verification status", "Image verification status"]) {
  assert(admin.includes(`>${header}</th>`), `admin table does not render ${header}`);
}
assert((admin.match(/<th scope="col">/g) || []).length === (admin.match(/<(?:th scope="row"|td)(?:\s|>)/g) || []).length / allBooks.length, "admin header and row cell definitions differ");
assert(admin.includes('<th scope="row">B01</th>') && admin.includes('<th scope="col">ID</th>'), "admin ID column is missing or shifted");
assert(admin.includes(">3</td>") && admin.includes(">2</td>") && admin.includes(">1</td>"), "admin table does not render reconciled poll history values");
for (const label of ["Page count", "Form", "Published", "Synopsis", "Themes", "Vibe"]) {
  assert(count(current, `<dt>${label}</dt>`) === currentBooks.length, `current poll does not render ${label} on every card`);
  assert(count(backlog, `<dt>${label}</dt>`) === allBooks.length, `backlog does not render ${label} on every card`);
}
assert(count(current, "value=\"awards\"") === 1 && count(backlog, "value=\"awards\"") === 1 && count(admin, "value=\"awards\"") === 1, "Awards First sorting is missing from a generated page");
assert(currentBooks.every((book) => current.includes(`id="${book.slug}"`)), "a current Jump To target is missing");
assert(allBooks.every((book) => backlog.includes(`id="${book.slug}"`)), "a backlog Jump To target is missing");

if (failures.length) {
  console.error(failures.map((failure) => `FAIL: ${failure}`).join("\n"));
  process.exit(1);
}

console.log(`Book-club static checks passed: ${currentBooks.length} current cards, ${allBooks.length} backlog cards, ${allBooks.length} catalog image URLs configured.`);
