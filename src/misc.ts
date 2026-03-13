/**
 * Miscellaneous utilities
 */

const TIME_UNITS: Record<string, number> = {
  ms: 1,
  s: 1000,
  sec: 1000,
  m: 60_000,
  min: 60_000,
  h: 3_600_000,
  hr: 3_600_000,
  hour: 3_600_000,
  d: 86_400_000,
  day: 86_400_000,
  w: 604_800_000,
  week: 604_800_000,
};

/** Parse a human-readable time string to milliseconds */
export function ms(input: string | number): number {
  if (typeof input === "number") return input;

  const match = input.trim().match(/^(-?\d*\.?\d+)\s*(ms|s|sec|m|min|h|hr|hour|d|day|w|week)s?$/i);
  if (!match) throw new Error(`Invalid time string: "${input}"`);

  const value = parseFloat(match[1]);
  const unit = match[2].toLowerCase();

  return Math.round(value * TIME_UNITS[unit]);
}

/** Convert milliseconds to a human-readable string */
export function msToString(milliseconds: number): string {
  const abs = Math.abs(milliseconds);
  const sign = milliseconds < 0 ? "-" : "";

  if (abs < 1000) return `${sign}${abs}ms`;
  if (abs < 60_000) return `${sign}${(abs / 1000).toFixed(1)}s`;
  if (abs < 3_600_000) return `${sign}${(abs / 60_000).toFixed(1)}m`;
  if (abs < 86_400_000) return `${sign}${(abs / 3_600_000).toFixed(1)}h`;
  return `${sign}${(abs / 86_400_000).toFixed(1)}d`;
}

const BYTE_UNITS = ["B", "KB", "MB", "GB", "TB", "PB"];

/** Parse a human-readable byte string to bytes */
export function parseBytes(input: string): number {
  const match = input.trim().match(/^(-?\d*\.?\d+)\s*(b|kb|mb|gb|tb|pb)$/i);
  if (!match) throw new Error(`Invalid byte string: "${input}"`);

  const value = parseFloat(match[1]);
  const unit = match[2].toUpperCase();
  const index = BYTE_UNITS.indexOf(unit);

  return Math.round(value * 1024 ** index);
}

/** Safely read an environment variable with a default */
export function env(key: string, defaultValue?: string): string {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const g = globalThis as any;
  if (g.process?.env) {
    return g.process.env[key] ?? defaultValue ?? "";
  }
  return defaultValue ?? "";
}

/** Safely read an environment variable as a number */
export function envNumber(key: string, defaultValue = 0): number {
  const val = env(key);
  if (!val) return defaultValue;
  const parsed = Number(val);
  return isNaN(parsed) ? defaultValue : parsed;
}

/** Safely read an environment variable as a boolean */
export function envBool(key: string, defaultValue = false): boolean {
  const val = env(key).toLowerCase();
  if (!val) return defaultValue;
  return ["true", "1", "yes", "on"].includes(val);
}

/** Simple hash function (non-cryptographic, for quick checksums) */
export function hash(str: string): number {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    h = ((h << 5) - h + char) | 0;
  }
  return Math.abs(h);
}

/** Simple string hash to hex */
export function hashHex(str: string): string {
  return hash(str).toString(16).padStart(8, "0");
}

/** No-op function */
export function noop(): void {}

/** Identity function */
export function identity<T>(value: T): T {
  return value;
}

/** Create a memoized version of a function */
export function memoize<T extends (...args: unknown[]) => unknown>(
  fn: T,
  keyFn?: (...args: Parameters<T>) => string
): T {
  const cache = new Map<string, ReturnType<T>>();

  return ((...args: Parameters<T>) => {
    const key = keyFn ? keyFn(...args) : JSON.stringify(args);
    if (cache.has(key)) return cache.get(key)!;
    const result = fn(...args) as ReturnType<T>;
    cache.set(key, result);
    return result;
  }) as T;
}

/** Create a function that can only be called once */
export function once<T extends (...args: unknown[]) => unknown>(fn: T): T {
  let called = false;
  let result: ReturnType<T>;

  return ((...args: Parameters<T>) => {
    if (called) return result;
    called = true;
    result = fn(...args) as ReturnType<T>;
    return result;
  }) as T;
}

/** Pipe a value through a series of functions */
export function pipe<T>(value: T, ...fns: ((arg: T) => T)[]): T {
  return fns.reduce((acc, fn) => fn(acc), value);
}

/** Generate a simple enum-like object from an array of strings */
export function enumFromArray<T extends string>(values: T[]): Record<T, T> {
  return Object.fromEntries(values.map((v) => [v, v])) as Record<T, T>;
}

/** Deep freeze an object (make it fully immutable) */
export function deepFreeze<T>(obj: T): Readonly<T> {
  if (typeof obj !== "object" || obj === null) return obj;

  Object.freeze(obj);
  for (const value of Object.values(obj as Record<string, unknown>)) {
    if (typeof value === "object" && value !== null && !Object.isFrozen(value)) {
      deepFreeze(value);
    }
  }

  return obj;
}

/** Safely parse JSON without throwing */
export function safeJsonParse<T = unknown>(
  str: string,
  fallback?: T
): T | undefined {
  try {
    return JSON.parse(str) as T;
  } catch {
    return fallback;
  }
}
