import { readFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const { books } = JSON.parse(await readFile(join(root, "data/book-club.json"), "utf8"));
const timeoutMs = 15000;
const failures = [];

for (const book of books) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(book.cover.url, {
      signal: controller.signal,
      headers: { Accept: "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8" },
    });
    const contentType = response.headers.get("content-type") || "";
    const bytes = new Uint8Array(await response.arrayBuffer());
    if (!response.ok || !contentType.startsWith("image/") || bytes.length < 100) {
      failures.push(`${book.title} — HTTP ${response.status}, ${contentType || "no content type"}, ${bytes.length} bytes`);
    } else {
      console.log(`OK: ${book.title} (${contentType}, ${bytes.length} bytes)`);
    }
  } catch (error) {
    failures.push(`${book.title} — ${error.name === "AbortError" ? `timed out after ${timeoutMs}ms` : error.message}`);
  } finally {
    clearTimeout(timeout);
  }
}

if (failures.length) {
  console.error("Image verification failed for:");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log(`Image verification passed: ${books.length}/${books.length} catalog images returned image data.`);
