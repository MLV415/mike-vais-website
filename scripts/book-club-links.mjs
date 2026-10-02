// Canonical research links stay in admin data unless explicitly verified for
// public display. Export only the label and URL, never verification notes.
export function publicBookLinks(book) {
  const seen = new Set();
  return (book.externalLinks || []).flatMap((link) => {
    const resource = ["Wikipedia", "Goodreads"].includes(link.label);
    if (!resource && link.public !== true) return [];
    const url = new URL(link.url);
    if (url.protocol !== "https:" || url.username || url.password) throw new Error(`${book.recordId}: public book links must use plain HTTPS URLs`);
    const label = resource ? link.label : link.publicLabel;
    if (!label || (!resource && !["Author Site", "Publisher Site", "Book Site"].includes(label))) throw new Error(`${book.recordId}: invalid compact book-link label`);
    if (label === "Publisher Site" && url.pathname.replace(/\/+$/, "") === "") throw new Error(`${book.recordId}: a generic publisher homepage is not a book resource`);
    if (seen.has(url.href)) return [];
    seen.add(url.href);
    return [{ label, url: link.url }];
  }).sort((a, b) => {
    const order = ["Wikipedia", "Goodreads", "Author Site", "Publisher Site", "Book Site"];
    return order.indexOf(a.label) - order.indexOf(b.label);
  });
}
