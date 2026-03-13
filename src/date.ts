/**
 * Date utilities
 */

/** Get a human-readable "time ago" string */
export function timeAgo(date: Date | number | string): string {
  const now = Date.now();
  const past = new Date(date).getTime();
  const diff = now - past;

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  if (seconds < 5) return "just now";
  if (seconds < 60) return `${seconds} seconds ago`;
  if (minutes === 1) return "1 minute ago";
  if (minutes < 60) return `${minutes} minutes ago`;
  if (hours === 1) return "1 hour ago";
  if (hours < 24) return `${hours} hours ago`;
  if (days === 1) return "1 day ago";
  if (days < 7) return `${days} days ago`;
  if (weeks === 1) return "1 week ago";
  if (weeks < 4) return `${weeks} weeks ago`;
  if (months === 1) return "1 month ago";
  if (months < 12) return `${months} months ago`;
  if (years === 1) return "1 year ago";
  return `${years} years ago`;
}

/** Get a "time from now" string for future dates */
export function timeFromNow(date: Date | number | string): string {
  const now = Date.now();
  const future = new Date(date).getTime();
  const diff = future - now;

  if (diff < 0) return timeAgo(date);

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  if (seconds < 5) return "just now";
  if (seconds < 60) return `in ${seconds} seconds`;
  if (minutes === 1) return "in 1 minute";
  if (minutes < 60) return `in ${minutes} minutes`;
  if (hours === 1) return "in 1 hour";
  if (hours < 24) return `in ${hours} hours`;
  if (days === 1) return "in 1 day";
  if (days < 7) return `in ${days} days`;
  if (weeks === 1) return "in 1 week";
  if (weeks < 4) return `in ${weeks} weeks`;
  if (months === 1) return "in 1 month";
  if (months < 12) return `in ${months} months`;
  if (years === 1) return "in 1 year";
  return `in ${years} years`;
}

/** Simple date formatting with tokens */
export function formatDate(
  date: Date | number | string,
  format = "YYYY-MM-DD"
): string {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = d.getMonth() + 1;
  const day = d.getDate();
  const hours = d.getHours();
  const minutes = d.getMinutes();
  const seconds = d.getSeconds();

  return format
    .replace("YYYY", String(year))
    .replace("YY", String(year).slice(-2))
    .replace("MM", String(month).padStart(2, "0"))
    .replace("DD", String(day).padStart(2, "0"))
    .replace("HH", String(hours).padStart(2, "0"))
    .replace("mm", String(minutes).padStart(2, "0"))
    .replace("ss", String(seconds).padStart(2, "0"));
}

/** Check if a date is today */
export function isToday(date: Date | number | string): boolean {
  const d = new Date(date);
  const now = new Date();
  return (
    d.getDate() === now.getDate() &&
    d.getMonth() === now.getMonth() &&
    d.getFullYear() === now.getFullYear()
  );
}

/** Check if a date is yesterday */
export function isYesterday(date: Date | number | string): boolean {
  const d = new Date(date);
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return (
    d.getDate() === yesterday.getDate() &&
    d.getMonth() === yesterday.getMonth() &&
    d.getFullYear() === yesterday.getFullYear()
  );
}

/** Check if a date is tomorrow */
export function isTomorrow(date: Date | number | string): boolean {
  const d = new Date(date);
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return (
    d.getDate() === tomorrow.getDate() &&
    d.getMonth() === tomorrow.getMonth() &&
    d.getFullYear() === tomorrow.getFullYear()
  );
}

/** Get the number of days between two dates */
export function daysBetween(
  date1: Date | number | string,
  date2: Date | number | string
): number {
  const d1 = new Date(date1).getTime();
  const d2 = new Date(date2).getTime();
  return Math.round(Math.abs(d2 - d1) / (1000 * 60 * 60 * 24));
}

/** Add days to a date */
export function addDays(date: Date | number | string, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

/** Add hours to a date */
export function addHours(date: Date | number | string, hours: number): Date {
  const result = new Date(date);
  result.setTime(result.getTime() + hours * 60 * 60 * 1000);
  return result;
}

/** Add minutes to a date */
export function addMinutes(
  date: Date | number | string,
  minutes: number
): Date {
  const result = new Date(date);
  result.setTime(result.getTime() + minutes * 60 * 1000);
  return result;
}

/** Get the start of a day (midnight) */
export function startOfDay(date: Date | number | string): Date {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
}

/** Get the end of a day (23:59:59.999) */
export function endOfDay(date: Date | number | string): Date {
  const d = new Date(date);
  d.setHours(23, 59, 59, 999);
  return d;
}

/** Check if a date is within a range */
export function isDateBetween(
  date: Date | number | string,
  start: Date | number | string,
  end: Date | number | string
): boolean {
  const d = new Date(date).getTime();
  return d >= new Date(start).getTime() && d <= new Date(end).getTime();
}

/** Check if a year is a leap year */
export function isLeapYear(year: number): boolean {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

/** Get the number of days in a month */
export function daysInMonth(year: number, month: number): number {
  return new Date(year, month, 0).getDate();
}
