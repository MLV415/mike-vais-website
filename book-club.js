const bookLists = document.querySelectorAll("[data-book-list]");

function pageCount(card) {
  const pageField = [...card.querySelectorAll(".book-fields > div")].find((field) => field.querySelector("dt")?.textContent.trim() === "Page count");
  return Number.parseInt(pageField?.querySelector("dd")?.textContent || "0", 10);
}

bookLists.forEach((list) => {
  const cards = [...list.querySelectorAll(".book-card")];
  const originalOrder = new Map(cards.map((card, index) => [card, index]));
  const select = document.querySelector("[data-sort-books]");
  const status = document.querySelector("[data-sort-status]");

  function sortCards(sortBy) {
    const sorted = [...cards].sort((a, b) => {
      if (sortBy === "title") return a.querySelector("h3").textContent.localeCompare(b.querySelector("h3").textContent);
      if (sortBy === "author") return a.querySelector(".book-author").textContent.localeCompare(b.querySelector(".book-author").textContent);
      if (sortBy === "awards") {
        const awardDifference = Number(Boolean(b.querySelector(".book-award"))) - Number(Boolean(a.querySelector(".book-award")));
        if (awardDifference) return awardDifference;
      }
      const pageDifference = pageCount(a) - pageCount(b);
      if (pageDifference) return sortBy === "pages-desc" ? -pageDifference : pageDifference;
      return originalOrder.get(a) - originalOrder.get(b);
    });

    sorted.forEach((card) => list.append(card));
    if (status) status.textContent = `Sorted by ${select.options[select.selectedIndex].text}`;
  }

  select?.addEventListener("change", () => sortCards(select.value));
  sortCards("pages-asc");
});
