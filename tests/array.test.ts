import { describe, it, expect } from "vitest";
import {
  chunk, unique, uniqueBy, shuffle, groupBy, sortBy,
  difference, intersection, symmetricDifference, flatten,
  last, first, sample, partition, zip, count, sum, average,
  range, compact, frequency,
} from "../src/array.js";

describe("array", () => {
  it("chunk", () => {
    expect(chunk([1, 2, 3, 4, 5], 2)).toEqual([[1, 2], [3, 4], [5]]);
    expect(chunk([1, 2, 3], 3)).toEqual([[1, 2, 3]]);
    expect(() => chunk([1], 0)).toThrow();
  });

  it("unique", () => {
    expect(unique([1, 2, 2, 3, 3])).toEqual([1, 2, 3]);
  });

  it("uniqueBy", () => {
    const items = [{ id: 1, name: "a" }, { id: 2, name: "b" }, { id: 1, name: "c" }];
    expect(uniqueBy(items, (i) => i.id)).toEqual([{ id: 1, name: "a" }, { id: 2, name: "b" }]);
  });

  it("shuffle returns same elements", () => {
    const arr = [1, 2, 3, 4, 5];
    const result = shuffle(arr);
    expect(result).toHaveLength(5);
    expect(result.sort()).toEqual([1, 2, 3, 4, 5]);
    expect(arr).toEqual([1, 2, 3, 4, 5]); // original unchanged
  });

  it("groupBy", () => {
    const items = [{ type: "a", v: 1 }, { type: "b", v: 2 }, { type: "a", v: 3 }];
    expect(groupBy(items, (i) => i.type)).toEqual({
      a: [{ type: "a", v: 1 }, { type: "a", v: 3 }],
      b: [{ type: "b", v: 2 }],
    });
  });

  it("sortBy", () => {
    expect(sortBy([3, 1, 2], (n) => n)).toEqual([1, 2, 3]);
    expect(sortBy([3, 1, 2], (n) => n, "desc")).toEqual([3, 2, 1]);
  });

  it("difference", () => {
    expect(difference([1, 2, 3], [2, 4])).toEqual([1, 3]);
  });

  it("intersection", () => {
    expect(intersection([1, 2, 3], [2, 3, 4])).toEqual([2, 3]);
  });

  it("symmetricDifference", () => {
    expect(symmetricDifference([1, 2, 3], [2, 3, 4])).toEqual([1, 4]);
  });

  it("flatten", () => {
    expect(flatten([[1, [2]], [3]])).toEqual([1, 2, 3]);
  });

  it("first / last", () => {
    expect(first([1, 2, 3])).toBe(1);
    expect(last([1, 2, 3])).toBe(3);
    expect(first([])).toBeUndefined();
  });

  it("sample returns an element from the array", () => {
    const arr = [1, 2, 3];
    expect(arr).toContain(sample(arr));
    expect(sample([])).toBeUndefined();
  });

  it("partition", () => {
    expect(partition([1, 2, 3, 4], (n) => n % 2 === 0)).toEqual([[2, 4], [1, 3]]);
  });

  it("zip", () => {
    expect(zip([1, 2], ["a", "b"])).toEqual([[1, "a"], [2, "b"]]);
  });

  it("count", () => {
    expect(count([1, 2, 3, 4], (n) => n > 2)).toBe(2);
  });

  it("sum / average", () => {
    expect(sum([1, 2, 3])).toBe(6);
    expect(average([1, 2, 3])).toBe(2);
    expect(average([])).toBe(0);
  });

  it("range", () => {
    expect(range(0, 5)).toEqual([0, 1, 2, 3, 4]);
    expect(range(0, 10, 3)).toEqual([0, 3, 6, 9]);
  });

  it("compact", () => {
    expect(compact([0, 1, false, 2, "", 3, null, undefined])).toEqual([1, 2, 3]);
  });

  it("frequency", () => {
    expect(frequency(["a", "b", "a", "c", "b", "a"])).toEqual({ a: 3, b: 2, c: 1 });
  });
});
