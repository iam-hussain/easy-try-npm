/**
 * Number utilities
 */

/** Clamp a number between min and max */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/** Generate a random integer between min and max (inclusive) */
export function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/** Generate a random float between min and max */
export function randomFloat(min: number, max: number, decimals = 2): number {
  const val = Math.random() * (max - min) + min;
  return parseFloat(val.toFixed(decimals));
}

/** Format a number as currency */
export function formatCurrency(
  amount: number,
  currency = "USD",
  locale = "en-US"
): string {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
  }).format(amount);
}

/** Get the ordinal suffix for a number (1st, 2nd, 3rd, etc.) */
export function ordinal(n: number): string {
  const abs = Math.abs(n);
  const lastTwo = abs % 100;
  const lastOne = abs % 10;

  if (lastTwo >= 11 && lastTwo <= 13) return `${n}th`;
  if (lastOne === 1) return `${n}st`;
  if (lastOne === 2) return `${n}nd`;
  if (lastOne === 3) return `${n}rd`;
  return `${n}th`;
}

/** Convert a number to human readable format (1.5K, 2.3M, etc.) */
export function toHumanReadable(num: number, decimals = 1): string {
  const units = ["", "K", "M", "B", "T"];
  const sign = num < 0 ? "-" : "";
  let absNum = Math.abs(num);

  if (absNum < 1000) return `${sign}${absNum}`;

  let unitIndex = 0;
  while (absNum >= 1000 && unitIndex < units.length - 1) {
    absNum /= 1000;
    unitIndex++;
  }

  return `${sign}${absNum.toFixed(decimals).replace(/\.0+$/, "")}${units[unitIndex]}`;
}

/** Format a number with thousand separators */
export function formatNumber(num: number, locale = "en-US"): string {
  return new Intl.NumberFormat(locale).format(num);
}

/** Round to a specific number of decimal places */
export function round(num: number, decimals = 0): number {
  const factor = 10 ** decimals;
  return Math.round(num * factor) / factor;
}

/** Convert a percentage to a value */
export function percentOf(percent: number, total: number): number {
  return (percent / 100) * total;
}

/** Calculate what percentage a value is of a total */
export function toPercent(value: number, total: number, decimals = 1): number {
  if (total === 0) return 0;
  return round((value / total) * 100, decimals);
}

/** Linear interpolation between two values */
export function lerp(start: number, end: number, t: number): number {
  return start + (end - start) * clamp(t, 0, 1);
}

/** Map a value from one range to another */
export function mapRange(
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number
): number {
  return ((value - inMin) / (inMax - inMin)) * (outMax - outMin) + outMin;
}

/** Check if a number is between min and max (inclusive) */
export function inRange(value: number, min: number, max: number): boolean {
  return value >= min && value <= max;
}

/** Convert bytes to human-readable size */
export function formatBytes(bytes: number, decimals = 2): string {
  if (bytes === 0) return "0 B";
  const units = ["B", "KB", "MB", "GB", "TB", "PB"];
  const sign = bytes < 0 ? "-" : "";
  const absBytes = Math.abs(bytes);
  const unitIndex = Math.floor(Math.log(absBytes) / Math.log(1024));
  const value = absBytes / 1024 ** unitIndex;
  return `${sign}${value.toFixed(decimals).replace(/\.?0+$/, "")} ${units[unitIndex]}`;
}
