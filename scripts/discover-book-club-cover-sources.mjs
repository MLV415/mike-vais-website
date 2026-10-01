import { readFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const { books } = JSON.parse(await readFile(join(root, "data/book-club.json"), "utf8"));
const targets = new Set(["Infernal Desire Machines of Dr. Hoffman", "The Science Fiction Hall of Fame, Volume One: 1929–1964"]);

for (const book of books.filter((item) => targets.has(item.title))) {
  for (const source of book.sources) {
    try {
      const response = await fetch(source, { headers: { "user-agent": "mike-vais-book-club-cover-check/1.0" } });
      const html = await response.text();
      const matches = [
        ...html.matchAll(/<meta[^>]+(?:property|name)=["'](?:og:image|twitter:image)["'][^>]+content=["']([^"']+)["'][^>]*>/gi),
        ...html.matchAll(/<meta[^>]+content=["']([^"']+)["'][^>]+(?:property|name)=["'](?:og:image|twitter:image)["'][^>]*>/gi),
      ];
      const image = matches[0]?.[1] ? new URL(matches[0][1], source).href : null;
      console.log(JSON.stringify({ title: book.title, source, status: response.status, image }));
    } catch (error) {
      console.log(JSON.stringify({ title: book.title, source, error: error.message }));
    }
  }
}
