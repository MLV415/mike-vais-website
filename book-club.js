function pageCount(item) {
  return Number.parseInt(item.dataset.pageCountMin || "0", 10);
}

function titleOf(item) {
  return item.querySelector("h3")?.textContent.trim() || item.cells?.[1]?.textContent.trim() || "";
}

function authorOf(item) {
  return item.querySelector(".book-author")?.textContent.trim() || item.cells?.[2]?.textContent.trim() || "";
}

function sortItems(items, sortBy) {
  return [...items].sort((a, b) => {
    if (sortBy === "title") return titleOf(a).localeCompare(titleOf(b)) || authorOf(a).localeCompare(authorOf(b));
    if (sortBy === "author") return authorOf(a).localeCompare(authorOf(b)) || titleOf(a).localeCompare(titleOf(b));
    if (sortBy === "year") return Number(a.dataset.publishedYear) - Number(b.dataset.publishedYear) || titleOf(a).localeCompare(titleOf(b));
    if (sortBy === "awards") return Number(b.dataset.awardBearing) - Number(a.dataset.awardBearing) || titleOf(a).localeCompare(titleOf(b));
    return pageCount(a) - pageCount(b) || titleOf(a).localeCompare(titleOf(b));
  });
}

function attachImageFallbacks() {
  document.querySelectorAll("[data-book-image]").forEach((image) => {
    image.addEventListener("load", () => image.closest(".book-media")?.classList.add("is-loaded"));
    image.addEventListener("error", () => {
      image.hidden = true;
      image.closest(".book-media")?.classList.add("is-fallback");
    });
    if (image.complete) {
      if (image.naturalWidth > 0) image.closest(".book-media")?.classList.add("is-loaded");
      else image.dispatchEvent(new Event("error"));
    }
  });
}

function attachListSorting(list) {
  const select = document.querySelector("[data-sort-books]");
  const status = document.querySelector("[data-sort-status]");
  const items = [...list.querySelectorAll(".book-card")];
  const apply = (sortBy) => {
    sortItems(items, sortBy).forEach((item) => list.append(item));
    if (status) status.textContent = `Sorted by ${select.options[select.selectedIndex].text}`;
  };
  select?.addEventListener("change", () => apply(select.value));
  apply(select?.value || "pages");
}

function attachTableSorting(table) {
  const select = document.querySelector("[data-sort-books]");
  const status = document.querySelector("[data-sort-status]");
  const body = table.tBodies[0];
  const rows = [...body.rows];
  const apply = (sortBy) => {
    sortItems(rows, sortBy).forEach((row) => body.append(row));
    if (status) status.textContent = `Sorted by ${select.options[select.selectedIndex].text}`;
  };
  select?.addEventListener("change", () => apply(select.value));
  apply(select?.value || "pages");
}

attachImageFallbacks();
document.querySelectorAll("[data-book-list]").forEach(attachListSorting);
document.querySelectorAll("[data-book-table]").forEach(attachTableSorting);
