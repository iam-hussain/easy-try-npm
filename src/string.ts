/**
 * String utilities
 */

/** Convert a string to a URL-friendly slug */
export function slugify(str: string): string {
  return str
    .toString()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

/** Truncate a string to a max length, adding suffix if truncated */
export function truncate(
  str: string,
  maxLength: number,
  suffix = "..."
): string {
  if (str.length <= maxLength) return str;
  return str.slice(0, maxLength - suffix.length) + suffix;
}

/** Convert string to camelCase */
export function camelCase(str: string): string {
  return str
    .replace(/[^a-zA-Z0-9]+(.)/g, (_, char) => char.toUpperCase())
    .replace(/^[A-Z]/, (char) => char.toLowerCase());
}

/** Convert string to snake_case */
export function snakeCase(str: string): string {
  return str
    .replace(/([a-z])([A-Z])/g, "$1_$2")
    .replace(/[\s\-]+/g, "_")
    .replace(/[^a-zA-Z0-9_]/g, "")
    .toLowerCase();
}

/** Convert string to kebab-case */
export function kebabCase(str: string): string {
  return str
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .replace(/[\s_]+/g, "-")
    .replace(/[^a-zA-Z0-9-]/g, "")
    .toLowerCase();
}

/** Convert string to PascalCase */
export function pascalCase(str: string): string {
  return str
    .replace(/[^a-zA-Z0-9]+(.)/g, (_, char) => char.toUpperCase())
    .replace(/^[a-z]/, (char) => char.toUpperCase());
}

/** Convert string to Title Case */
export function titleCase(str: string): string {
  return str
    .toLowerCase()
    .replace(/(?:^|\s|[-_])\w/g, (match) => match.toUpperCase());
}

/** Capitalize the first letter of a string */
export function capitalize(str: string): string {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/** Mask a string, showing only first/last N characters */
export function maskString(
  str: string,
  options: { visibleStart?: number; visibleEnd?: number; maskChar?: string } = {}
): string {
  const { visibleStart = 0, visibleEnd = 0, maskChar = "*" } = options;
  if (str.length <= visibleStart + visibleEnd) return str;
  const start = str.slice(0, visibleStart);
  const end = visibleEnd > 0 ? str.slice(-visibleEnd) : "";
  const masked = maskChar.repeat(str.length - visibleStart - visibleEnd);
  return start + masked + end;
}

/** Simple template string interpolation */
export function template(
  str: string,
  data: Record<string, string | number>
): string {
  return str.replace(/\{\{(\w+)\}\}/g, (_, key) =>
    key in data ? String(data[key]) : `{{${key}}}`
  );
}

/** Reverse a string (Unicode-safe) */
export function reverse(str: string): string {
  return [...str].reverse().join("");
}

/** Count occurrences of a substring */
export function countOccurrences(str: string, substring: string): number {
  if (!substring) return 0;
  let count = 0;
  let pos = 0;
  while ((pos = str.indexOf(substring, pos)) !== -1) {
    count++;
    pos += substring.length;
  }
  return count;
}

/** Remove extra whitespace and trim */
export function squish(str: string): string {
  return str.replace(/\s+/g, " ").trim();
}

/** Check if string is a palindrome */
export function isPalindrome(str: string): boolean {
  const cleaned = str.toLowerCase().replace(/[^a-z0-9]/g, "");
  return cleaned === [...cleaned].reverse().join("");
}

/** Generate initials from a name */
export function initials(str: string): string {
  return str
    .split(/\s+/)
    .filter(Boolean)
    .map((word) => word[0].toUpperCase())
    .join("");
}

/** Escape HTML special characters */
export function escapeHtml(str: string): string {
  const map: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  };
  return str.replace(/[&<>"']/g, (char) => map[char]);
}

/** Unescape HTML entities */
export function unescapeHtml(str: string): string {
  const map: Record<string, string> = {
    "&amp;": "&",
    "&lt;": "<",
    "&gt;": ">",
    "&quot;": '"',
    "&#39;": "'",
  };
  return str.replace(/&(?:amp|lt|gt|quot|#39);/g, (entity) => map[entity]);
}

/** Pad a string on both sides to center it */
export function center(str: string, width: number, fillChar = " "): string {
  if (str.length >= width) return str;
  const totalPad = width - str.length;
  const leftPad = Math.floor(totalPad / 2);
  const rightPad = totalPad - leftPad;
  return fillChar.repeat(leftPad) + str + fillChar.repeat(rightPad);
}

/** Strip ANSI escape codes from a string */
export function stripAnsi(str: string): string {
  // eslint-disable-next-line no-control-regex
  return str.replace(/\x1B\[[0-9;]*[a-zA-Z]/g, "");
}
