import { readFile, mkdtemp, rm } from "node:fs/promises";
import { dirname, join } from "node:path";
import { tmpdir } from "node:os";
import { fileURLToPath } from "node:url";
import { imageExtension, verifyLocalCover } from "./book-club-covers.mjs";
import { downloadCover } from "./cache-book-club-covers.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const { books } = JSON.parse(await readFile(join(root, "data/book-club.json"), "utf8"));
const failures = [];
const staging = await mkdtemp(join(tmpdir(), "book-club-image-check-"));
try {
  for (const book of books) {
    try {
      if (await verifyLocalCover(book, root)) {
        console.log(`OK: ${book.title} (repository file; checksum verified; no external request)`);
        continue;
      }
      const destination = join(staging, `${book.recordId}.image`);
      const source = new URL(book.cover.url);
      if (source.hostname === "covers.openlibrary.org") source.searchParams.set("default", "false");
      await downloadCover(source.href, destination, { retries: 1, timeoutSeconds: 10 });
      const bytes = await readFile(destination);
      console.log(`OK: ${book.title} (${imageExtension(bytes)}, ${bytes.length} bytes)`);
    } catch (error) {
      failures.push(`${book.title} — ${(error.stderr || error.message).trim()}`);
    }
  }
} finally {
  await rm(staging, { recursive: true, force: true });
}
if (failures.length) {
  console.error("Image verification failed for:\n" + failures.map((failure) => `- ${failure}`).join("\n"));
  process.exitCode = 1;
} else {
  console.log(`Image verification passed: ${books.length}/${books.length} covers returned verified image data.`);
}
