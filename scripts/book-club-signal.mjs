export const SIGNAL_OPTION_LIMIT = 100;

// Preserve the title, surname, formatting and numeric count. Only edit the
// source-backed description to fit each book's remaining character budget.
export function signalDescriptionBudget(book) {
  return SIGNAL_OPTION_LIMIT - `${book.title} - ${book.authorLastName} |  | ${book.pageCountDisplay} pages`.length;
}

export function signalOption(book) {
  const description = book.pollDescription;
  if (!/^\d+$/.test(String(book.pageCountDisplay)) || Number(book.pageCountDisplay) <= 0) {
    throw new Error(`${book.recordId}: page count must be one positive integer`);
  }
  if (typeof description !== "string" || !description.trim() || description !== description.trim() || /\.$/.test(description)) {
    throw new Error(`${book.recordId}: poll description must be nonempty, trimmed, and have no trailing period`);
  }
  const budget = signalDescriptionBudget(book);
  const option = `${book.title} - ${book.authorLastName} | ${description} | ${book.pageCountDisplay} pages`;
  if (option.length > SIGNAL_OPTION_LIMIT) {
    throw new Error(`${book.recordId}: description is ${description.length} characters; budget is ${budget}. Shorten the source-backed description before building (option: ${option.length}/${SIGNAL_OPTION_LIMIT})`);
  }
  return option;
}
