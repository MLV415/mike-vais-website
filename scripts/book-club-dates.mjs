const isoDatePattern = /^\d{4}-\d{2}-\d{2}$/;

export function formatMeetupDates(dates = []) {
  if (!Array.isArray(dates) || dates.length === 0) throw new Error("Meetup dates must contain at least one ISO date.");
  return dates.map((date) => {
    if (!isoDatePattern.test(date)) throw new Error(`Meetup date must be an ISO date: ${date}`);
    const parsed = new Date(`${date}T00:00:00Z`);
    if (Number.isNaN(parsed.valueOf())) throw new Error(`Meetup date is invalid: ${date}`);
    return new Intl.DateTimeFormat("en-US", {
      timeZone: "UTC",
      month: "long",
      day: "numeric",
      year: "numeric",
    }).format(parsed);
  }).join(" – ");
}

export function formatMeetupDateWithOrdinal(date) {
  if (!isoDatePattern.test(date)) throw new Error(`Meetup date must be an ISO date: ${date}`);
  const parsed = new Date(`${date}T00:00:00Z`);
  if (Number.isNaN(parsed.valueOf())) throw new Error(`Meetup date is invalid: ${date}`);
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "UTC",
    month: "long",
    day: "numeric",
    year: "numeric",
  }).formatToParts(parsed);
  const day = Number(parts.find((part) => part.type === "day").value);
  const suffix = day % 100 >= 11 && day % 100 <= 13 ? "th" : ({ 1: "st", 2: "nd", 3: "rd" }[day % 10] || "th");
  return parts.map((part) => part.type === "day" ? `${part.value}${suffix}` : part.value).join("");
}
