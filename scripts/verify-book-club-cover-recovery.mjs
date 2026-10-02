import { chromium } from "playwright";
import { readFile } from "node:fs/promises";
import assert from "node:assert/strict";

const script = await readFile(new URL("../book-club.js", import.meta.url), "utf8");
const styles = await readFile(new URL("../styles.css", import.meta.url), "utf8");
// Logo bytes are only a decoding fixture on a test document. No mock bytes
// replace real cover requests in the full-page rendered verification.
const fixture = await readFile(new URL("../assets/book-club/cosmic-chapter-chat-logo.png", import.meta.url));
const browser = await chromium.launch({ headless: true, ...(process.env.BOOK_CLUB_CHROMIUM_PATH ? { executablePath: process.env.BOOK_CLUB_CHROMIUM_PATH } : {}) });
try {
  for (const mode of ["transient", "permanent", "cached"]) {
    const page = await browser.newPage();
    let requests = 0;
    await page.route("**/*", async (route) => {
      requests++;
      const success = mode === "cached" || (mode === "transient" && requests > 1);
      await route.fulfill({ status: success ? 200 : 503, contentType: success ? "image/png" : "text/plain", body: success ? fixture : "Unavailable" });
    });
    await page.setContent('<body class="book-club-page"><div class="book-media"><img data-book-image src="http://127.0.0.1/cover-fixture.png" alt="Recovery test fixture"><div class="book-cover-fallback">Unavailable</div></div></body>');
    await page.addStyleTag({ content: styles });
    await page.addScriptTag({ content: script });
    if (mode === "permanent") {
      await page.waitForTimeout(3500);
      assert.equal(requests, 2, "permanent failures must stop after one retry");
      assert.equal(await page.locator(".book-media").evaluate((media) => media.classList.contains("is-fallback") && media.querySelector("img").hidden), true);
    } else {
      await page.waitForFunction(() => document.querySelector(".book-media").classList.contains("is-loaded"), null, { timeout: 6000 });
      assert.equal(requests, mode === "transient" ? 2 : 1);
      assert.equal(await page.locator(".book-media").evaluate((media) => {
        const image = media.querySelector("img");
        return !media.classList.contains("is-fallback") && !image.hidden && image.naturalWidth > 0 && getComputedStyle(image).display !== "none" && getComputedStyle(media.querySelector(".book-cover-fallback")).display === "none";
      }), true, "a successful retry must actually show the loaded image");
    }
    await page.close();
  }
} finally {
  await browser.close();
}
console.log("Cover loader regression checks passed: transient recovery is visible, retries are bounded, and cached success remains visible. Fixture tests do not claim book-cover verification.");
