import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const coverHash = (bytes) => createHash("sha256").update(bytes).digest("hex");

export function imageExtension(bytes) {
  if (bytes.length < 100) throw new Error("Image is too small to be a cover");
  if (bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff) return "jpg";
  if (bytes.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]))) return "png";
  if (bytes.subarray(0, 4).toString() === "RIFF" && bytes.subarray(8, 12).toString() === "WEBP") return "webp";
  if (bytes.subarray(4, 8).toString() === "ftyp" && /avif|avis/.test(bytes.subarray(8, 64).toString())) return "avif";
  throw new Error("Response is not a supported image (JPEG, PNG, WebP, or AVIF)");
}

export function localCoverFile(book, root) {
  const path = book.cover?.localPath;
  if (!path) return null;
  if (!/^\/assets\/book-club\/covers\/[a-z0-9][a-z0-9-]*\.(?:jpg|png|webp|avif)$/.test(path)) {
    throw new Error(`${book.recordId}: invalid repository cover path`);
  }
  return join(root, path.slice(1));
}

export function coverUrl(book) {
  return book.cover?.localPath || book.cover?.url;
}

export async function verifyLocalCover(book, root) {
  const file = localCoverFile(book, root);
  if (!file) return false;
  const bytes = await readFile(file);
  const extension = imageExtension(bytes);
  if (!file.endsWith(`.${extension}`)) throw new Error(`${book.recordId}: image format and file extension disagree`);
  if (!book.cover.sha256 || coverHash(bytes) !== book.cover.sha256) {
    throw new Error(`${book.recordId}: local cover checksum is missing or incorrect`);
  }
  return true;
}
