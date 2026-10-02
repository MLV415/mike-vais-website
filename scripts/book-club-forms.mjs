// Form describes the structure, not genre, audience, or a page-count guess.
export const BOOK_FORMS = Object.freeze(["Novel", "Novella", "Short Story Collection", "Anthology"]);

export function verifyBookForm(book) {
  if (!BOOK_FORMS.includes(book.form)) throw new Error(`${book.recordId}: form must be one of ${BOOK_FORMS.join(", ")}`);
}
