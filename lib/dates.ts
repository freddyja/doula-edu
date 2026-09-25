/** Calendar date key in the local timezone, YYYY-MM-DD. */
export function localDateKey(date = new Date()): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

/** UTC midnight for a real calendar day, or null when the key is not a real date. */
export function parseDateKey(key: string): number | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(key);
  if (!match) return null;
  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const utc = new Date(Date.UTC(year, month - 1, day));
  if (
    utc.getUTCFullYear() !== year ||
    utc.getUTCMonth() !== month - 1 ||
    utc.getUTCDate() !== day
  ) {
    return null;
  }
  return utc.getTime();
}

export function daysBetween(startKey: string, endKey: string): number | null {
  const start = parseDateKey(startKey);
  const end = parseDateKey(endKey);
  if (start === null || end === null) return null;
  return Math.round((end - start) / 86_400_000);
}

export function addDays(startKey: string, index: number): string | null {
  const start = parseDateKey(startKey);
  if (start === null) return null;
  const next = new Date(start + index * 86_400_000);
  const year = next.getUTCFullYear();
  const month = String(next.getUTCMonth() + 1).padStart(2, "0");
  const day = String(next.getUTCDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}
