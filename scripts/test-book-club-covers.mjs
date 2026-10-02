import test from "node:test";
import assert from "node:assert/strict";
import { access, copyFile, mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { tmpdir } from "node:os";
import { cacheBookCovers } from "./cache-book-club-covers.mjs";
import { coverHash, coverUrl, imageExtension, localCoverFile, verifyLocalCover } from "./book-club-covers.mjs";

// Existing logo bytes are a test fixture, NOT a replacement book cover. All
// fixture assets/records are confined to disposable test directories.
const fixture = new URL("../assets/book-club/cosmic-chapter-chat-logo.png", import.meta.url);
const bytes = await readFile(fixture);
const sample = (id) => ({ recordId: id, slug: `test-${id.toLowerCase()}`, title: `Test ${id}`, cover: { url: `https://example.com/${id}.png`, sourceUrl: `https://example.com/${id}`, sourceNote: "Test source", rightsNote: "Test rights" } });
async function withDataset(books, action) {
  const root = await mkdtemp(join(tmpdir(), "book-club-cover-test-"));
  try {
    await mkdir(join(root, "data"));
    await writeFile(join(root, "data/book-club.json"), JSON.stringify({ dataVersion: "test", books }));
    await action(root);
  } finally {
    await rm(root, { recursive: true, force: true });
  }
}

test("format validation rejects HTML errors and unsafe asset paths", () => {
  assert.equal(imageExtension(bytes), "png");
  assert.throws(() => imageExtension(Buffer.from("<html>503 Service unavailable</html>".repeat(10))), /supported image/);
  for (const localPath of ["/assets/book-club/covers/../../index.html", "/assets/other.png", "/assets/book-club/covers/test.svg"]) {
    assert.throws(() => localCoverFile({ recordId: "TEST", cover: { localPath } }, "/tmp"), /invalid repository cover path/);
  }
});

test("failed download leaves canonical data and repository assets untouched", async () => {
  await withDataset([sample("T01"), sample("T02")], async (root) => {
    const before = await readFile(join(root, "data/book-club.json"), "utf8");
    await assert.rejects(cacheBookCovers({ root, download: async (url, destination) => {
      if (url.includes("T02")) throw new Error("503 unavailable");
      await copyFile(fixture, destination);
    } }), /T02.*503/);
    assert.equal(await readFile(join(root, "data/book-club.json"), "utf8"), before);
    await assert.rejects(access(join(root, "assets")), /ENOENT/);
  });
});

test("policy denial stops immediately without retrying other destinations", async () => {
  await withDataset([sample("T01"), sample("T02")], async (root) => {
    let downloads = 0;
    await assert.rejects(cacheBookCovers({ root, download: async () => { downloads++; throw new Error("CONNECT tunnel failed, response 403"); } }), /403/);
    assert.equal(downloads, 1);
    await assert.rejects(access(join(root, "assets")), /ENOENT/);
  });
});

test("successful import preserves source attribution and verifies cached bytes offline", async () => {
  await withDataset([sample("T01"), sample("T02")], async (root) => {
    assert.deepEqual(await cacheBookCovers({ root, download: async (_, destination) => copyFile(fixture, destination) }), { cached: 2, total: 2 });
    const data = JSON.parse(await readFile(join(root, "data/book-club.json"), "utf8"));
    for (const book of data.books) {
      assert.equal(book.cover.sha256, coverHash(bytes));
      assert.equal(book.cover.sourceNote, "Test source");
      assert.equal(book.cover.rightsNote, "Test rights");
      assert.equal(book.cover.url, `https://example.com/${book.recordId}.png`);
      assert.match(coverUrl(book), /^\/assets\/book-club\/covers\//);
      assert.equal(await verifyLocalCover(book, root), true);
    }
    const before = await readFile(join(root, "data/book-club.json"), "utf8");
    assert.deepEqual(await cacheBookCovers({ root, download: async () => assert.fail("A cached image must not be downloaded again") }), { cached: 0, total: 2 });
    assert.equal(await readFile(join(root, "data/book-club.json"), "utf8"), before);
    await writeFile(localCoverFile(data.books[0], root), Buffer.concat([bytes, Buffer.from("tampered")]));
    await assert.rejects(verifyLocalCover(data.books[0], root), /checksum/);
  });
});
