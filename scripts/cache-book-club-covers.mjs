import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { copyFile, mkdir, mkdtemp, readFile, rename, rm, writeFile } from "node:fs/promises";
import { constants } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { coverHash, imageExtension, localCoverFile, verifyLocalCover } from "./book-club-covers.mjs";

const run = promisify(execFile);

export async function downloadCover(url, destination, { retries = 2, timeoutSeconds = 20 } = {}) {
  // curl honors the inherited environment proxy and CA trust. No proxy bypass.
  await run("curl", ["--fail", "--silent", "--show-error", "--location", "--proto", "=https", "--proto-redir", "=https", "--max-time", String(timeoutSeconds), "--retry", String(retries), "--retry-delay", "1", "--max-filesize", "8388608", "--header", "Accept: image/jpeg,image/png,image/webp,image/avif", "--output", destination, url], { timeout: (timeoutSeconds * (retries + 1) + 10) * 1000 });
}

export async function cacheBookCovers({ root, download = downloadCover }) {
  const dataPath = join(root, "data/book-club.json");
  const original = await readFile(dataPath, "utf8");
  const data = JSON.parse(original);
  const staging = await mkdtemp(join(tmpdir(), "book-club-cover-import-"));
  const pending = [];
  const failures = [];
  try {
    for (const book of data.books) {
      if (!/^[a-z0-9_-]+$/i.test(book.recordId)) throw new Error("Record ID cannot be used as a staging filename");
      if (book.cover?.localPath) {
        await verifyLocalCover(book, root);
        continue;
      }
      if (!book.cover?.sourceUrl || !book.cover?.rightsNote) {
        failures.push(`${book.recordId} ${book.title}: source/rights metadata is missing`);
        continue;
      }
      try {
        const source = new URL(book.cover.url);
        if (source.protocol !== "https:") throw new Error("Cover source must use HTTPS");
        // Request a real library image, not the Covers API's missing-book image.
        if (source.hostname === "covers.openlibrary.org") source.searchParams.set("default", "false");
        const stagedFile = join(staging, `${book.recordId}.image`);
        await download(source.href, stagedFile);
        const bytes = await readFile(stagedFile);
        const extension = imageExtension(bytes);
        const hash = coverHash(bytes);
        const localPath = `/assets/book-club/covers/${book.slug}-${hash.slice(0, 12)}.${extension}`;
        const plannedBook = { ...book, cover: { ...book.cover, localPath } };
        // Validate the slug-derived destination before writing outside staging.
        const destination = localCoverFile(plannedBook, root);
        pending.push({ book, stagedFile, destination, localPath, hash, downloadedFrom: source.href });
      } catch (error) {
        const detail = (error.stderr || error.message).trim();
        failures.push(`${book.recordId} ${book.title}: ${detail}`);
        // An access denial is not transient: do not repeatedly query blocked hosts.
        if (/403/.test(detail)) break;
      }
    }
    if (failures.length) {
      throw new Error(`Cover import stopped; no canonical rows or repository assets changed.\n${failures.join("\n")}`);
    }
    if (!pending.length) return { cached: 0, total: data.books.length };
    // Protect changes made while downloads were in progress.
    if (await readFile(dataPath, "utf8") !== original) throw new Error("Canonical data changed during import; nothing was installed");
    for (const item of pending) {
      await mkdir(dirname(item.destination), { recursive: true });
      try {
        await copyFile(item.stagedFile, item.destination, constants.COPYFILE_EXCL);
      } catch (error) {
        if (error.code !== "EEXIST" || coverHash(await readFile(item.destination)) !== item.hash) throw error;
      }
      Object.assign(item.book.cover, { localPath: item.localPath, sha256: item.hash, downloadedFrom: item.downloadedFrom, cachedAt: new Date().toISOString() });
    }
    data.dataVersion = new Date().toISOString().slice(0, 10);
    const temporaryData = `${dataPath}.cover-import-${process.pid}`;
    await writeFile(temporaryData, `${JSON.stringify(data, null, 2)}\n`, { flag: "wx" });
    await rename(temporaryData, dataPath);
    return { cached: pending.length, total: data.books.length };
  } finally {
    // Only remove this invocation's private, mkdtemp-created staging directory.
    await rm(staging, { recursive: true, force: true });
  }
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const root = join(dirname(fileURLToPath(import.meta.url)), "..");
  try {
    const result = await cacheBookCovers({ root });
    console.log(`Installed ${result.cached} source cover files (${result.total} books). Run npm run build:book-club, then verify the rendered pages.`);
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}
