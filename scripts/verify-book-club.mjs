import { readFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const data = JSON.parse(await readFile(join(root, "data/book-club.json"), "utf8"));
const current = await readFile(join(root, "book-club/index.html"), "utf8");
const backlog = await readFile(join(root, "book-club/backlog/index.html"), "utf8");
const admin = await readFile(join(root, "book-club/backlog/admin/index.html"), "utf8");

const failures = [];
const assert = (condition, message) => {
  if (!condition) failures.push(message);
};
const count = (text, pattern) => text.match(new RegExp(pattern, "g"))?.length || 0;

const allBooks = data.books;
const currentBooks = allBooks.filter((book) => book.currentPoll);
const bannedCopy = /Vote for our next book|short books|Multiple votes allowed|These are &lt;200 pages|Longer books next poll|small orbit|SHORT LIST|one next read|See all 14|Opens the Signal|Suggested By|Stefan|Liam|Irene|Celeste|Internal|Research Status|Eligibility Status|Last Poll|Total Votes/;

assert(allBooks.length === 14, `expected 14 canonical books, found ${allBooks.length}`);
assert(currentBooks.length === 6, `expected 6 current-poll books, found ${currentBooks.length}`);
assert(allBooks.every((book) => book.cover?.url && book.cover?.sourceUrl && book.cover?.rightsNote), "every book needs an image URL, source URL, and rights note");
assert(current.includes("CURRENT POLL") && current.includes("Vote in Signal"), "current poll banner is missing its label or Signal link");
assert(count(current, "id=\"current-poll-heading\"") === 1, "current poll banner should have one label");
assert(!bannedCopy.test(current) && !bannedCopy.test(backlog) && !bannedCopy.test(admin), "removed private or promotional copy remains in generated pages");
assert(!/[⌁~]/.test(current) && !/[⌁~]/.test(backlog), "a tilde-like Jump To glyph remains");
assert(!current.includes("jump-icon") && !backlog.includes("jump-icon"), "Jump To still contains an icon element");
assert(!/<article[^>]*class="book-card"[\s\S]*?<a\s/.test(current), "current cards contain clickable links");
assert(!/<article[^>]*class="book-card"[\s\S]*?<a\s/.test(backlog), "backlog cards contain clickable links");
assert(count(current, "data-book-image") === currentBooks.length, "current poll does not have one image element per card");
assert(count(backlog, "data-book-image") === allBooks.length, "backlog does not have one image element per card");
assert(count(current, "<dt>Form</dt>") === currentBooks.length, "current poll does not render Form on every card");
assert(count(current, "<dt>Poll premise</dt>") === currentBooks.length, "current poll does not render Poll premise on every card");
assert(count(backlog, "<dt>Published</dt>") === allBooks.length, "backlog does not render Published on every card");
assert(count(backlog, "<dt>Synopsis</dt>") === allBooks.filter((book) => book.longSynopsis).length, "backlog synopsis rendering does not match canonical data");
assert(count(current, "value=\"awards\"") === 1 && count(backlog, "value=\"awards\"") === 1 && count(admin, "value=\"awards\"") === 1, "Awards First sorting is missing from a generated page");
assert(currentBooks.every((book) => current.includes(`id="${book.slug}"`)), "a current Jump To target is missing");
assert(allBooks.every((book) => backlog.includes(`id="${book.slug}"`)), "a backlog Jump To target is missing");

if (failures.length) {
  console.error(failures.map((failure) => `FAIL: ${failure}`).join("\n"));
  process.exit(1);
}

console.log(`Book-club static checks passed: ${currentBooks.length} current cards, ${allBooks.length} backlog cards, ${allBooks.length} catalog image URLs configured.`);
