import { chromium } from "playwright";

const origin = process.env.BOOK_CLUB_ORIGIN || "http://127.0.0.1:4319";
const failures = [];
const assert = (condition, message) => {
  if (!condition) failures.push(message);
};

const browser = await chromium.launch({ headless: true });
try {
  const checkPublicPage = async (path, expectedCards, pageName) => {
    const page = await browser.newPage({ viewport: { width: 390, height: 1200 } });
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
    assert(imageState.length === expectedCards && imageState.every((image) => image.width > 0 && image.fallback === "none"), `${pageName}: every rendered card image must load and hide its fallback`);
    assert(await page.locator(".book-card").evaluateAll((cards) => cards.every((card) => {
      const labels = [...card.querySelectorAll("dt")].map((label) => label.textContent.trim());
      return ["Page count", "Form", "Published", "Synopsis", "Themes", "Vibe"].every((name) => labels.includes(name));
    })), `${pageName}: shared card fields are incomplete`);
    assert(!/Poll premise|pollPremise/.test(await page.locator("body").innerText()), `${pageName}: Poll premise is visible`);
    assert(await page.locator(".book-card a").count() === 0, `${pageName}: cards must not contain links`);
    assert((await page.locator(".jump-links a").evaluateAll((links) => links.every((link) => getComputedStyle(link).textAlign === "center"))), `${pageName}: Jump To text is not centered`);
    assert((await page.locator(".jump-links a").evaluateAll((links) => links.every((link) => document.querySelector(link.hash)))), `${pageName}: Jump To link target is missing`);
    assert(!/Suggested By|Stefan|Liam|Irene|Celeste|Personal website|mike vais/i.test(await page.locator("body").innerText()), `${pageName}: personal or private copy is visible`);

    await page.locator("[data-sort-books]").selectOption("awards");
    await page.waitForFunction(() => document.querySelector(".book-card")?.dataset.awardBearing === "1");
    await page.close();
  };

  await checkPublicPage("/book-club/", 6, "current poll");
  await checkPublicPage("/book-club/backlog/", 14, "backlog");

  const checkGrid = async (path, width, expectedColumns, pageName) => {
    const page = await browser.newPage({ viewport: { width, height: 900 } });
    await page.goto(`${origin}${path}`, { waitUntil: "domcontentloaded", timeout: 45000 });
    const columns = await page.locator(".book-list").evaluate((list) => getComputedStyle(list).gridTemplateColumns.split(" ").length);
    assert(columns === expectedColumns, `${pageName}: expected ${expectedColumns} card columns at ${width}px, found ${columns}`);
    await page.close();
  };

  await checkGrid("/book-club/", 1440, 3, "current poll desktop layout");
  await checkGrid("/book-club/", 900, 2, "current poll compressed layout");
  await checkGrid("/book-club/", 390, 1, "current poll mobile layout");
  await checkGrid("/book-club/backlog/", 900, 2, "backlog compressed layout");

  const current = await browser.newPage({ viewport: { width: 390, height: 1200 } });
  await current.goto(`${origin}/book-club/`, { waitUntil: "networkidle", timeout: 45000 });
  assert((await current.locator(".book-club-nav-signal").innerText()).replace(/\s+/g, " ").trim() === "Vote in Signal", "current poll Signal action contains extra copy");
  assert(await current.locator(".book-club-nav-signal").getAttribute("href") === "https://signal.group/#CjQKIELXnb1Dqzb2Ppp_IIz49Ac4_aBG58FFr5jJnIgpLTytEhBtemm4UenXg4IaGaqJDYSX", "current poll Signal URL is incorrect");
  assert(await current.locator(".book-club-nav-meetup").getAttribute("href") === "https://www.meetup.com/cosmic-chapter-chat-santa-cruzs-sci-fi-book-club/", "current poll Meetup URL is incorrect");
  assert(await current.locator(".book-club-nav-signal .poll-signal-mark").count() === 1, "current poll Signal icon is missing");
  assert(await current.locator(".book-club-nav-signal").evaluate((button) => getComputedStyle(button).flexDirection === "row" && getComputedStyle(button).alignItems === "center"), "current poll Signal button layout is misaligned");
  assert(await current.locator(".book-club-nav-actions a").count() === 2, "current poll should show Meetup and Signal actions");
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
  await current.close();

  const admin = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  await admin.goto(`${origin}/book-club/backlog/admin/`, { waitUntil: "networkidle", timeout: 45000 });
  assert(await admin.locator(".book-data-table tbody tr").count() === 14, "admin page does not render all records");
  assert(await admin.locator(".book-club-logo").count() === 1, "admin page logo is missing");
  assert(await admin.locator(".book-club-logo").evaluate((logo) => logo.complete && logo.naturalWidth > 0 && getComputedStyle(logo).objectFit === "contain"), "admin page logo did not render proportionally");
  assert(await admin.locator(".book-club-nav-signal").count() === 1, "admin page Signal action is missing");
  await admin.locator("[data-sort-books]").selectOption("awards");
  await admin.waitForFunction(() => document.querySelector(".book-data-table tbody tr")?.dataset.awardBearing === "1");
  assert(!/Poll premise|Suggested By|Stefan|Liam|Irene|Celeste|Personal website|mike vais|Author Full Name|Research Status/i.test(await admin.locator("body").innerText()), "admin page exposes private or excluded copy");
  const adminHeaders = await admin.locator(".book-data-table thead th").allTextContents();
  const firstAdminCells = await admin.locator(".book-data-table tbody tr").first().locator(":scope > *").allTextContents();
  assert(adminHeaders.length === firstAdminCells.length, "admin header and row cell counts differ");
  assert(adminHeaders[0].trim() === "ID" && firstAdminCells[0].trim() === "B01", "admin ID column is not paired with its values");
  assert(adminHeaders[1].trim() === "Title" && firstAdminCells[1].trim() === "Seven Views of Olduvai Gorge", "admin title column is shifted");
  for (const header of ["Last poll date", "Last poll votes", "Total polls", "Total votes", "Award verification status", "Image verification status"]) {
    assert(await admin.locator(".book-data-table th").filter({ hasText: header }).count() === 1, `admin page is missing ${header}`);
  }
  await admin.close();
} finally {
  await browser.close();
}

if (failures.length) {
  console.error(failures.map((failure) => `FAIL: ${failure}`).join("\n"));
  process.exit(1);
}

console.log("Rendered book-club checks passed: current poll, backlog, and admin pages; all images loaded; sorting, banner, anchors, and isolation verified.");
