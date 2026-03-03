export function formatPostDate(date: string): string {
  const match = date.match(
    /^(\d{4})-(\d{2})-(\d{2})(?:[T ](\d{2}):(\d{2})(?::(\d{2}))?)?$/
  );

  if (!match) {
    return date;
  }

  const [, year, month, day, hour, minute, second] = match;

  if (!hour || !minute) {
    return `${day}/${month}/${year}`;
  }

  return `${day}/${month}/${year}, ${hour}:${minute}${
    second ? `:${second}` : ""
  }`;
}
