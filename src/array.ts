/**
 * Array utilities
 */

/** Split an array into chunks of a given size */
export function chunk<T>(arr: T[], size: number): T[][] {
  if (size <= 0) throw new Error("Chunk size must be positive");
  const result: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
}

/** Get unique values from an array */
export function unique<T>(arr: T[]): T[] {
  return [...new Set(arr)];
}

/** Get unique values by a key function */
export function uniqueBy<T>(arr: T[], keyFn: (item: T) => unknown): T[] {
  const seen = new Set();
  return arr.filter((item) => {
    const key = keyFn(item);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

/** Shuffle an array (Fisher-Yates) */
export function shuffle<T>(arr: T[]): T[] {
  const result = [...arr];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

/** Group array items by a key function */
export function groupBy<T>(
  arr: T[],
  keyFn: (item: T) => string
): Record<string, T[]> {
  const result: Record<string, T[]> = {};
  for (const item of arr) {
    const key = keyFn(item);
    if (!result[key]) result[key] = [];
    result[key].push(item);
  }
  return result;
}

/** Sort by a key (returns new array) */
export function sortBy<T>(
  arr: T[],
  keyFn: (item: T) => number | string,
  order: "asc" | "desc" = "asc"
): T[] {
  const sorted = [...arr].sort((a, b) => {
    const aKey = keyFn(a);
    const bKey = keyFn(b);
    if (aKey < bKey) return -1;
    if (aKey > bKey) return 1;
    return 0;
  });
  return order === "desc" ? sorted.reverse() : sorted;
}

/** Get items in first array but not in second */
export function difference<T>(arr1: T[], arr2: T[]): T[] {
  const set = new Set(arr2);
  return arr1.filter((item) => !set.has(item));
}

/** Get items present in both arrays */
export function intersection<T>(arr1: T[], arr2: T[]): T[] {
  const set = new Set(arr2);
  return arr1.filter((item) => set.has(item));
}

/** Get items present in either array but not both */
export function symmetricDifference<T>(arr1: T[], arr2: T[]): T[] {
  const set1 = new Set(arr1);
  const set2 = new Set(arr2);
  return [
    ...arr1.filter((item) => !set2.has(item)),
    ...arr2.filter((item) => !set1.has(item)),
  ];
}

/** Flatten a nested array to a given depth */
export function flatten<T>(arr: unknown[], depth = Infinity): T[] {
  return arr.flat(depth) as T[];
}

/** Get the last element of an array */
export function last<T>(arr: T[]): T | undefined {
  return arr[arr.length - 1];
}

/** Get the first element of an array */
export function first<T>(arr: T[]): T | undefined {
  return arr[0];
}

/** Pick a random element from an array */
export function sample<T>(arr: T[]): T | undefined {
  if (arr.length === 0) return undefined;
  return arr[Math.floor(Math.random() * arr.length)];
}

/** Pick N random elements from an array */
export function sampleMany<T>(arr: T[], count: number): T[] {
  return shuffle(arr).slice(0, count);
}

/** Partition an array into two based on a predicate */
export function partition<T>(
  arr: T[],
  predicate: (item: T) => boolean
): [T[], T[]] {
  const pass: T[] = [];
  const fail: T[] = [];
  for (const item of arr) {
    (predicate(item) ? pass : fail).push(item);
  }
  return [pass, fail];
}

/** Zip multiple arrays together */
export function zip<T>(...arrays: T[][]): T[][] {
  const maxLen = Math.max(...arrays.map((a) => a.length));
  const result: T[][] = [];
  for (let i = 0; i < maxLen; i++) {
    result.push(arrays.map((a) => a[i]));
  }
  return result;
}

/** Count items matching a predicate */
export function count<T>(arr: T[], predicate: (item: T) => boolean): number {
  return arr.reduce((acc, item) => acc + (predicate(item) ? 1 : 0), 0);
}

/** Sum numeric values */
export function sum(arr: number[]): number {
  return arr.reduce((acc, val) => acc + val, 0);
}

/** Get the average of numeric values */
export function average(arr: number[]): number {
  if (arr.length === 0) return 0;
  return sum(arr) / arr.length;
}

/** Create a range of numbers */
export function range(start: number, end: number, step = 1): number[] {
  const result: number[] = [];
  if (step > 0) {
    for (let i = start; i < end; i += step) result.push(i);
  } else if (step < 0) {
    for (let i = start; i > end; i += step) result.push(i);
  }
  return result;
}

/** Remove falsy values from an array */
export function compact<T>(arr: (T | null | undefined | false | 0 | "")[]): T[] {
  return arr.filter(Boolean) as T[];
}

/** Create a frequency map of array values */
export function frequency<T extends string | number>(arr: T[]): Record<T, number> {
  const result = {} as Record<T, number>;
  for (const item of arr) {
    result[item] = (result[item] || 0) + 1;
  }
  return result;
}
