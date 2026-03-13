import { describe, it, expect } from "vitest";
import {
  pick, omit, deepClone, deepMerge, flattenObject, unflattenObject,
  get, set, isPlainObject, mapValues, filterObject,
} from "../src/object.js";

describe("object", () => {
  it("pick", () => {
    const obj = { a: 1, b: 2, c: 3 };
    expect(pick(obj, ["a", "c"])).toEqual({ a: 1, c: 3 });
  });

  it("omit", () => {
    const obj = { a: 1, b: 2, c: 3 };
    expect(omit(obj, ["b"])).toEqual({ a: 1, c: 3 });
  });

  it("deepClone", () => {
    const obj = { a: { b: { c: 1 } }, d: [1, 2] };
    const cloned = deepClone(obj);
    expect(cloned).toEqual(obj);
    expect(cloned).not.toBe(obj);
    expect(cloned.a).not.toBe(obj.a);
    cloned.a.b.c = 999;
    expect(obj.a.b.c).toBe(1);
  });

  it("deepClone handles Date and RegExp", () => {
    const date = new Date("2024-01-01");
    const regex = /test/gi;
    expect(deepClone(date)).toEqual(date);
    expect(deepClone(regex)).toEqual(regex);
  });

  it("deepMerge", () => {
    const target = { a: 1, b: { x: 1, y: 2 } };
    const source = { b: { y: 3, z: 4 }, c: 5 };
    expect(deepMerge(target, source)).toEqual({ a: 1, b: { x: 1, y: 3, z: 4 }, c: 5 });
  });

  it("flattenObject / unflattenObject", () => {
    const obj = { a: { b: { c: 1 } }, d: 2 };
    const flat = flattenObject(obj);
    expect(flat).toEqual({ "a.b.c": 1, d: 2 });
    expect(unflattenObject(flat)).toEqual(obj);
  });

  it("get", () => {
    const obj = { a: { b: { c: 42 } } };
    expect(get(obj, "a.b.c")).toBe(42);
    expect(get(obj, "a.b.x", "default")).toBe("default");
    expect(get(obj, "x.y.z")).toBeUndefined();
  });

  it("set", () => {
    const obj: Record<string, unknown> = {};
    set(obj, "a.b.c", 42);
    expect(obj).toEqual({ a: { b: { c: 42 } } });
  });

  it("isPlainObject", () => {
    expect(isPlainObject({})).toBe(true);
    expect(isPlainObject([])).toBe(false);
    expect(isPlainObject(null)).toBe(false);
    expect(isPlainObject(new Date())).toBe(false);
  });

  it("mapValues", () => {
    expect(mapValues({ a: 1, b: 2 }, (v) => (v as number) * 2)).toEqual({ a: 2, b: 4 });
  });

  it("filterObject", () => {
    expect(filterObject({ a: 1, b: 2, c: 3 }, (v) => (v as number) > 1)).toEqual({ b: 2, c: 3 });
  });
});
