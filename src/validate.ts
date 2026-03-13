/**
 * Validation utilities
 */

/** Check if a string is a valid email */
export function isEmail(str: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(str);
}

/** Check if a string is a valid URL */
export function isURL(str: string): boolean {
  try {
    new URL(str);
    return true;
  } catch {
    return false;
  }
}

/** Check if a value is empty (null, undefined, empty string, empty array, empty object) */
export function isEmpty(value: unknown): boolean {
  if (value === null || value === undefined) return true;
  if (typeof value === "string") return value.trim().length === 0;
  if (Array.isArray(value)) return value.length === 0;
  if (value instanceof Map || value instanceof Set) return value.size === 0;
  if (typeof value === "object") return Object.keys(value).length === 0;
  return false;
}

/** Deep equality check */
export function isEqual(a: unknown, b: unknown): boolean {
  if (a === b) return true;
  if (a === null || b === null) return false;
  if (typeof a !== typeof b) return false;

  if (a instanceof Date && b instanceof Date) {
    return a.getTime() === b.getTime();
  }

  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) return false;
    return a.every((item, i) => isEqual(item, b[i]));
  }

  if (typeof a === "object" && typeof b === "object") {
    const keysA = Object.keys(a as Record<string, unknown>);
    const keysB = Object.keys(b as Record<string, unknown>);
    if (keysA.length !== keysB.length) return false;
    return keysA.every((key) =>
      isEqual(
        (a as Record<string, unknown>)[key],
        (b as Record<string, unknown>)[key]
      )
    );
  }

  return false;
}

/** Check if a string is a valid IPv4 address */
export function isIPv4(str: string): boolean {
  const parts = str.split(".");
  if (parts.length !== 4) return false;
  return parts.every((part) => {
    const num = parseInt(part, 10);
    return String(num) === part && num >= 0 && num <= 255;
  });
}

/** Check if a string is a valid IPv6 address (supports compressed forms like 2001:db8::1) */
export function isIPv6(str: string): boolean {
  // Full form: 8 groups of 1-4 hex digits
  if (/^([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$/.test(str)) return true;

  // Compressed form with ::
  if (!str.includes("::")) return false;
  // Only one :: allowed
  if (str.indexOf("::") !== str.lastIndexOf("::")) return false;
  // Cannot start or end with single colon (but :: at start/end is fine)
  if ((str.startsWith(":") && !str.startsWith("::")) ||
      (str.endsWith(":") && !str.endsWith("::"))) return false;

  const parts = str.split("::");
  const left = parts[0] ? parts[0].split(":") : [];
  const right = parts[1] ? parts[1].split(":") : [];
  const totalGroups = left.length + right.length;

  // :: expands to at least one group, so total must be < 8
  if (totalGroups >= 8) return false;

  const hexGroup = /^[0-9a-fA-F]{1,4}$/;
  return left.every((g) => hexGroup.test(g)) &&
         right.every((g) => hexGroup.test(g));
}

/** Check if a string is a valid hex color */
export function isHexColor(str: string): boolean {
  return /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/.test(str);
}

/** Check if a string contains only alphanumeric characters */
export function isAlphanumeric(str: string): boolean {
  return /^[a-zA-Z0-9]+$/.test(str);
}

/** Check if a string is valid JSON */
export function isJSON(str: string): boolean {
  try {
    JSON.parse(str);
    return true;
  } catch {
    return false;
  }
}

/** Check if a value is a number (not NaN) */
export function isNumber(value: unknown): value is number {
  return typeof value === "number" && !isNaN(value);
}

/** Check if a string is a valid UUID */
export function isUUID(str: string): boolean {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
    str
  );
}

/** Check if a value is a non-null object */
export function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

/** Check if a string matches a credit card format (Luhn algorithm) */
export function isCreditCard(str: string): boolean {
  const cleaned = str.replace(/[\s-]/g, "");
  if (!/^\d{13,19}$/.test(cleaned)) return false;

  let sum = 0;
  let alternate = false;
  for (let i = cleaned.length - 1; i >= 0; i--) {
    let n = parseInt(cleaned[i], 10);
    if (alternate) {
      n *= 2;
      if (n > 9) n -= 9;
    }
    sum += n;
    alternate = !alternate;
  }
  return sum % 10 === 0;
}

/** Check if a string is a valid phone number (basic international format) */
export function isPhoneNumber(str: string): boolean {
  return /^\+?[\d\s\-().]{7,20}$/.test(str);
}
