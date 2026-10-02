import { chromium } from "playwright";
import { readFile, mkdir } from "node:fs/promises";
import { signalOption } from "./book-club-signal.mjs";

const { books } = JSON.parse(await readFile(new URL("../data/book-club.json", import.meta.url), "utf8"));
const currentBooks = books.filter((book) => book.currentPoll);

const origin = process.env.BOOK_CLUB_ORIGIN || "http://127.0.0.1:4319";
const failures = [];
const assert = (condition, message) => {
  if (!condition) failures.push(message);
};

const offline = process.env.BOOK_CLUB_OFFLINE === "1";
const browser = await chromium.launch({
  headless: true,
  ...(process.env.BOOK_CLUB_CHROMIUM_PATH ? { executablePath: process.env.BOOK_CLUB_CHROMIUM_PATH } : {}),
  ...(!offline && process.env.HTTPS_PROXY ? { proxy: { server: process.env.HTTPS_PROXY, bypass: "127.0.0.1,localhost" } } : {}),
});
const newPage = async (options) => {
  const page = await browser.newPage(options);
  if (offline) await page.route("https://**/*", (route) => route.abort());
  return page;
};
const screenshots = process.env.BOOK_CLUB_SCREENSHOTS;
if (screenshots) await mkdir(screenshots, { recursive: true });
try {
  const checkPublicPage = async (path, expectedCards, pageName) => {
    const page = await newPage({ viewport: { width: 390, height: 1200 } });
    await page.goto(`${origin}${path}`, { waitUntil: "domcontentloaded", timeout: 45000 });
    await page.locator("img[data-book-image]").evaluateAll((images) => {
      images.forEach((image) => {
        image.loading = "eager";
        image.scrollIntoView({ block: "center" });
      });
    });
    await page.waitForFunction(
      () => [...document.querySelectorAll("img[data-book-image]")].every((image) => image.complete),
      null,
      { timeout: 45000 },
    );

    const imageState = await page.locator(".book-media").evaluateAll((media) => media.map((item) => ({
      width: item.querySelector("img")?.naturalWidth || 0,
      fallback: getComputedStyle(item.querySelector(".book-cover-fallback")).display,
    })));
    assert(await page.locator(".book-card").count() === expectedCards, `${pageName}: expected ${expectedCards} cards`);
    assert(await page.locator(".book-club-nav-meetup").count() === 1, `${pageName}: Meetup action is missing`);
    assert(await page.locator(".book-club-nav-signal").count() === 1, `${pageName}: Signal action is missing`);
    assert(await page.locator(".book-club-logo").count() === 1, `${pageName}: logo image is missing`);
    assert(await page.locator(".book-club-logo").evaluate((logo) => logo.complete && logo.naturalWidth > 0 && getComputedStyle(logo).objectFit === "contain"), `${pageName}: logo image did not render proportionally`);
    const mobileHeader = await page.locator(".book-club-local-nav .book-club-shell").evaluate((shell) => {
      const logo = shell.querySelector(".book-club-logo").getBoundingClientRect();
      const nav = shell.querySelector("nav");
      const navBox = nav.getBoundingClientRect();
      return {
        shellWidth: shell.getBoundingClientRect().width,
        logoWidth: logo.width,
        navWidth: navBox.width,
        navColumns: getComputedStyle(nav).gridTemplateColumns.split(" ").length,
      };
    });
    assert(mobileHeader.logoWidth >= mobileHeader.shellWidth - 2, `${pageName}: mobile logo does not use the full header width`);
    assert(mobileHeader.navWidth >= mobileHeader.shellWidth - 2 && mobileHeader.navColumns === 2, `${pageName}: mobile navigation is not a full-width two-option toggle`);
    assert(imageState.length === expectedCards && imageState.every((image) => image.width > 0 && image.fallback === "none"), `${pageName}: every rendered card image must load and hide its fallback`);
    assert(await page.locator(".book-card").evaluateAll((cards) => cards.every((card) => {
      const labels = [...card.querySelectorAll("dt")].map((label) => label.textContent.trim());
      return ["Page count", "Form", "Published", "Synopsis", "Themes", "Vibe"].every((name) => labels.includes(name));
    })), `${pageName}: shared card fields are incomplete`);
    assert(!/Poll premise|pollPremise/.test(await page.locator("body").innerText()), `${pageName}: Poll premise is visible`);
    const pageBooks = path === "/book-club/" ? currentBooks : books;
    assert(await page.locator(".book-external-links").count() === pageBooks.filter((book) => book.externalLinks.length).length, `${pageName}: show external-links sections only when links exist`);
    assert(!/No verified external links recorded/.test(await page.locator("body").innerText()), `${pageName}: missing-link filler remains`);
    assert(await page.locator(".book-card a").evaluateAll((links) => links.every((link) => link.closest(".book-external-links") && link.target === "_blank" && link.rel.includes("noopener"))), `${pageName}: external links are not safely labeled links`);
    assert((await page.locator(".jump-links a").evaluateAll((links) => links.every((link) => getComputedStyle(link).textAlign === "center"))), `${pageName}: Jump To text is not centered`);
    assert((await page.locator(".jump-links a").evaluateAll((links) => links.every((link) => document.querySelector(link.hash)))), `${pageName}: Jump To link target is missing`);
    assert(await page.locator(".book-card").evaluateAll((cards) => cards.every((card) => getComputedStyle(card).cursor !== "pointer")), `${pageName}: cards look clickable`);
    assert(await page.locator(".book-external-links a").evaluateAll((links) => links.every((link) => link.getBoundingClientRect().height >= 44)), `${pageName}: external links lack touch-sized targets`);
    assert(!/Suggested By|Stefan|Liam|Irene|Celeste|Personal website|mike vais/i.test(await page.locator("body").innerText()), `${pageName}: personal or private copy is visible`);

    await page.locator("[data-sort-books]").selectOption("awards");
    await page.waitForFunction(() => document.querySelector(".book-card")?.dataset.awardBearing === "1");
    for (const mode of ["pages", "title", "author", "year", "awards"]) {
      await page.locator("[data-sort-books]").selectOption(mode);
      const sortState = await page.locator(".book-card").evaluateAll((cards) => cards.map((card) => ({
        title: card.querySelector("h3").textContent.trim(), author: card.querySelector(".book-author").textContent.trim(),
        pages: Number(card.dataset.pageCountSortKey), year: Number(card.dataset.publishedYear), awards: Number(card.dataset.awardBearing),
      })));
      const compare = (a, b) => {
        if (mode === "pages") return a.pages - b.pages || a.title.localeCompare(b.title);
        if (mode === "year") return a.year - b.year || a.title.localeCompare(b.title);
        if (mode === "author") return a.author.localeCompare(b.author) || a.title.localeCompare(b.title);
        if (mode === "awards") return b.awards - a.awards || a.title.localeCompare(b.title);
        return a.title.localeCompare(b.title);
      };
      assert(sortState.every((value, index) => index === 0 || compare(sortState[index - 1], value) <= 0), `${pageName}: ${mode} sorting is incorrect`);
    }
    if (screenshots) await page.screenshot({ path: `${screenshots}/${pageName.replace(/ /g, "-")}-mobile.png`, fullPage: true });
    await page.close();
  };

  await checkPublicPage("/book-club/", currentBooks.length, "current poll");
  await checkPublicPage("/book-club/backlog/", books.length, "backlog");

  const checkGrid = async (path, width, expectedColumns, pageName) => {
    const page = await newPage({ viewport: { width, height: 900 } });
    await page.goto(`${origin}${path}`, { waitUntil: "domcontentloaded", timeout: 45000 });
    const columns = await page.locator(".book-list").evaluate((list) => getComputedStyle(list).gridTemplateColumns.split(" ").length);
    assert(columns === expectedColumns, `${pageName}: expected ${expectedColumns} card columns at ${width}px, found ${columns}`);
    await page.close();
  };

  await checkGrid("/book-club/", 1440, 3, "current poll desktop layout");
  await checkGrid("/book-club/", 900, 2, "current poll compressed layout");
  await checkGrid("/book-club/", 390, 1, "current poll mobile layout");
  await checkGrid("/book-club/backlog/", 900, 2, "backlog compressed layout");

  const current = await newPage({ viewport: { width: 390, height: 1200 } });
  await current.goto(`${origin}/book-club/`, { waitUntil: "networkidle", timeout: 45000 });
  assert((await current.locator(".book-club-nav-signal").innerText()).replace(/\s+/g, " ").trim() === "Vote in Signal", "current poll Signal action contains extra copy");
  assert(await current.locator(".book-club-nav-signal").getAttribute("href") === "https://signal.group/#CjQKIELXnb1Dqzb2Ppp_IIz49Ac4_aBG58FFr5jJnIgpLTytEhBtemm4UenXg4IaGaqJDYSX", "current poll Signal URL is incorrect");
  assert(await current.locator(".book-club-nav-meetup").getAttribute("href") === "https://www.meetup.com/cosmic-chapter-chat-santa-cruzs-sci-fi-book-club/", "current poll Meetup URL is incorrect");
  assert(await current.locator(".book-club-nav-signal .poll-signal-mark").count() === 1, "current poll Signal icon is missing");
  assert(await current.locator(".book-club-nav-signal").evaluate((button) => getComputedStyle(button).flexDirection === "row" && getComputedStyle(button).alignItems === "center"), "current poll Signal button layout is misaligned");
  assert(await current.locator(".book-club-nav-actions a").count() === 2, "current poll should show Meetup and Signal actions");
  await current.setViewportSize({ width: 1440, height: 1000 });
  const currentNav = await current.locator(".book-club-local-nav .book-club-shell").evaluate((shell) => getComputedStyle(shell).gridTemplateColumns);
  assert(currentNav.split(" ").length === 3, "current poll header does not reserve stable brand, tabs, and actions zones");
  assert(await current.locator(".book-club-nav-actions").evaluate((actions) => getComputedStyle(actions).gridColumnStart === "2"), "current poll actions are not centered in the header");
  assert(await current.locator(".book-club-local-nav nav").evaluate((nav) => getComputedStyle(nav).gridColumnStart === "3"), "current poll navigation tabs are not in the top-right zone");
  assert(await current.locator(".book-fields").evaluateAll((fields) => fields.every((field) => {
    const labels = [...field.querySelectorAll("dt")];
    const required = ["Page count", "Form", "Published", "Synopsis", "Themes", "Vibe"];
    return required.every((name) => labels.some((label) => label.textContent.trim() === name && getComputedStyle(label).display !== "none" && getComputedStyle(label).visibility !== "hidden"));
  })), "current poll fields are incomplete");
  assert(await current.locator(".book-card").evaluateAll((cards) => cards.every((card) => {
    const labels = [...card.querySelectorAll("dt")].map((label) => label.textContent.trim());
    return ["Page count", "Form", "Published", "Synopsis", "Themes", "Vibe"].every((name) => labels.includes(name));
  })), "current poll shared card fields are incomplete");
  if (screenshots) await current.screenshot({ path: `${screenshots}/current-poll-desktop.png`, fullPage: true });
  await current.locator('nav[aria-label="Book club navigation"] a[href="/book-club/backlog/"]').click();
  assert(new URL(current.url()).pathname === "/book-club/backlog/", "navigation to backlog failed");
  await current.locator('nav[aria-label="Book club navigation"] a[href="/book-club/"]').click();
  assert(new URL(current.url()).pathname === "/book-club/", "navigation to current poll failed");
  await current.close();

  const admin = await newPage({ viewport: { width: 1280, height: 900 } });
  await admin.goto(`${origin}/book-club/backlog/admin/`, { waitUntil: "networkidle", timeout: 45000 });
  assert(await admin.locator(".book-data-table tbody tr").count() === books.length, "admin page does not render all records");
  assert(await admin.locator(".book-club-logo").count() === 1, "admin page logo is missing");
  assert(await admin.locator(".book-club-logo").evaluate((logo) => logo.complete && logo.naturalWidth > 0 && getComputedStyle(logo).objectFit === "contain"), "admin page logo did not render proportionally");
  assert(await admin.locator(".book-club-nav-signal").count() === 1, "admin page Signal action is missing");
  await admin.locator("[data-sort-books]").selectOption("awards");
  await admin.waitForFunction(() => document.querySelector(".book-data-table tbody tr")?.dataset.awardBearing === "1");
  assert(!/Poll premise|Suggested By|Stefan|Liam|Irene|Celeste|Personal website|mike vais|Author Full Name|Research Status/i.test(await admin.locator("body").innerText()), "admin page exposes private or excluded copy");
  const adminHeaders = await admin.locator(".book-data-table thead th").allTextContents();
  const firstAdminCells = await admin.locator(".book-data-table tbody tr").filter({ has: admin.locator('th[scope="row"]', { hasText: /^B01$/ }) }).locator(":scope > *").allTextContents();
  assert(adminHeaders.length === firstAdminCells.length, "admin header and row cell counts differ");
  assert(adminHeaders[0].trim() === "ID" && firstAdminCells[0].trim() === "B01", "admin ID column is not paired with its values");
  assert(adminHeaders[1].trim() === "Title" && firstAdminCells[1].trim() === "Seven Views of Olduvai Gorge", "admin title column is shifted");
  const signalOptionIndex = adminHeaders.findIndex((header) => header.trim() === "Signal option");
  const signalStatusIndex = adminHeaders.findIndex((header) => header.trim() === "Signal option status");
  const signalRows = await admin.locator(".book-data-table tbody tr").evaluateAll((rows, indexes) => rows.map((row) => ({
    option: row.children[indexes[0]]?.textContent.trim() || "",
    status: row.children[indexes[1]]?.textContent.trim() || "",
  })), [signalOptionIndex, signalStatusIndex]);
  assert(signalRows.every((row) => row.status === "Ready" && row.option.length > 0 && row.option.length <= 100 && /\| \d+ pages$/.test(row.option)), "every rendered Signal option must be ready, within 100 characters, and have one discrete count");
  assert(signalRows.every((row) => books.some((book) => signalOption(book) === row.option)), "rendered Signal options differ from canonical formatting");
  const descriptionIndex = adminHeaders.findIndex((header) => header.trim() === "Poll description");
  assert(await admin.locator(".book-data-table tbody tr").evaluateAll((rows, index) => rows.every((row) => !/\.$/.test(row.children[index].textContent.trim())), descriptionIndex), "rendered descriptions still end in periods");
  for (const header of ["Author last name", "Page count display", "Page count sort key", "Poll description", "Signal option", "Signal option status", "Last poll date", "Last poll votes", "Total polls", "Total votes", "Award verification status", "Image verification status"]) {
    assert(adminHeaders.filter((label) => label.trim() === header).length === 1, `admin page is missing ${header}`);
  }
  if (screenshots) await admin.screenshot({ path: `${screenshots}/admin-desktop.png`, fullPage: true });
  await admin.close();
} finally {
  await browser.close();
}

if (failures.length) {
  console.error(failures.map((failure) => `FAIL: ${failure}`).join("\n"));
  process.exit(1);
}

console.log("Rendered book-club checks passed: current poll, backlog, and admin pages; all images loaded; sorting, banner, anchors, and isolation verified.");
