/**
 * ID Generation utilities
 */

const ALPHANUMERIC = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
const HEX_CHARS = "0123456789abcdef";

/** Generate a random string of given length */
export function randomString(
  length = 16,
  chars: string = ALPHANUMERIC
): string {
  let result = "";
  const charsLen = chars.length;
  const randomValues = new Uint32Array(length);

  try {
    crypto.getRandomValues(randomValues);
  } catch {
    for (let i = 0; i < length; i++) {
      randomValues[i] = Math.floor(Math.random() * charsLen);
    }
  }

  for (let i = 0; i < length; i++) {
    result += chars[randomValues[i] % charsLen];
  }
  return result;
}

/** Generate a compact unique ID (like nanoid) */
export function nanoid(size = 21): string {
  const urlAlphabet = "useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict";
  return randomString(size, urlAlphabet);
}

/** Generate a UUID v4 */
export function uuid(): string {
  const hex = randomString(32, HEX_CHARS);
  return [
    hex.slice(0, 8),
    hex.slice(8, 12),
    "4" + hex.slice(13, 16),
    ((parseInt(hex[16], 16) & 0x3) | 0x8).toString(16) + hex.slice(17, 20),
    hex.slice(20, 32),
  ].join("-");
}

/** Generate a short unique ID (8 chars by default) */
export function shortId(length = 8): string {
  return randomString(length);
}

/** Generate a prefixed ID (e.g., "usr_abc123") */
export function prefixedId(prefix: string, length = 12): string {
  return `${prefix}_${randomString(length)}`;
}

/** Generate a CUID-like ID (collision-resistant) */
export function cuid(): string {
  const timestamp = Date.now().toString(36);
  const random = randomString(8);
  return `c${timestamp}${random}`;
}

/** Generate a timestamp-based sortable ID */
export function sortableId(): string {
  const timestamp = Date.now().toString(36).padStart(9, "0");
  const random = randomString(8);
  return `${timestamp}${random}`;
}

export interface IncrementerOptions {
  /** Convert output to uppercase */
  uppercase?: boolean;
  /** Increment step (default: 1) */
  incrementBy?: number;
  /** Pattern template (default: '000aa0'). Use 0 for digits, a/A for letters */
  format?: string;
}

/**
 * Sequential alphanumeric ID incrementer.
 * Generates the next ID in sequence based on a pattern.
 */
export class Incrementer {
  private uppercase: boolean;
  private incrementBy: number;
  private format: string;
  private lastValue: string;

  constructor(options: IncrementerOptions = {}) {
    this.uppercase = options.uppercase ?? false;
    this.incrementBy = options.incrementBy ?? 1;
    this.format = options.format ?? "000aa0";
    this.lastValue = "";
  }

  /** Get the next incremented value */
  next(input?: string): string {
    const current = input ?? (this.lastValue || this.format);
    const delimiters = /[/:;\\-]/;
    const parts = current.split(delimiters);
    const separators = current.match(new RegExp(delimiters.source, "g")) || [];

    let result: string[] = [];
    let carry = this.incrementBy;

    for (let i = parts.length - 1; i >= 0; i--) {
      if (carry > 0) {
        const { value, overflow } = this.incrementPart(parts[i], carry);
        result.unshift(value);
        carry = overflow;
      } else {
        result.unshift(parts[i]);
      }
    }

    let output = result[0];
    for (let i = 1; i < result.length; i++) {
      output += (separators[i - 1] || "") + result[i];
    }

    this.lastValue = output;
    return this.uppercase ? output.toUpperCase() : output;
  }

  private incrementPart(
    str: string,
    amount: number
  ): { value: string; overflow: number } {
    const chars = str.split("");
    let carry = amount;

    for (let i = chars.length - 1; i >= 0 && carry > 0; i--) {
      const char = chars[i];

      if (/[0-9]/.test(char)) {
        const val = parseInt(char) + carry;
        chars[i] = String(val % 10);
        carry = Math.floor(val / 10);
      } else if (/[a-z]/.test(char)) {
        const val = char.charCodeAt(0) - 97 + carry;
        chars[i] = String.fromCharCode((val % 26) + 97);
        carry = Math.floor(val / 26);
      } else if (/[A-Z]/.test(char)) {
        const val = char.charCodeAt(0) - 65 + carry;
        chars[i] = String.fromCharCode((val % 26) + 65);
        carry = Math.floor(val / 26);
      }
    }

    return { value: chars.join(""), overflow: carry };
  }

  /** Reset the incrementer */
  reset(): void {
    this.lastValue = "";
  }
}
