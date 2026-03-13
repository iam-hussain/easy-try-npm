import { describe, it, expect } from "vitest";
import {
  ms, msToString, parseBytes, hash, hashHex, noop, identity,
  memoize, once, pipe, enumFromArray, deepFreeze, safeJsonParse,
} from "../src/misc.js";

describe("misc", () => {
  it("ms parses time strings", () => {
    expect(ms("1s")).toBe(1000);
    expect(ms("2m")).toBe(120000);
    expect(ms("1h")).toBe(3600000);
    expect(ms("1d")).toBe(86400000);
    expect(ms("500ms")).toBe(500);
    expect(ms("1.5h")).toBe(5400000);
    expect(ms(1000)).toBe(1000);
    expect(() => ms("invalid")).toThrow();
  });

  it("msToString", () => {
    expect(msToString(500)).toBe("500ms");
    expect(msToString(1500)).toBe("1.5s");
    expect(msToString(90000)).toBe("1.5m");
    expect(msToString(5400000)).toBe("1.5h");
    expect(msToString(129600000)).toBe("1.5d");
  });

  it("parseBytes", () => {
    expect(parseBytes("1KB")).toBe(1024);
    expect(parseBytes("1MB")).toBe(1048576);
    expect(parseBytes("1.5GB")).toBe(1610612736);
    expect(() => parseBytes("invalid")).toThrow();
  });

  it("hash / hashHex", () => {
    expect(typeof hash("hello")).toBe("number");
    expect(hash("hello")).toBe(hash("hello"));
    expect(hash("hello")).not.toBe(hash("world"));
    expect(hashHex("hello")).toMatch(/^[0-9a-f]+$/);
  });

  it("noop returns undefined", () => {
    expect(noop()).toBeUndefined();
  });

  it("identity returns its argument", () => {
    expect(identity(42)).toBe(42);
    expect(identity("hello")).toBe("hello");
  });

  it("memoize caches results", () => {
    let callCount = 0;
    const fn = memoize((x: unknown) => {
      callCount++;
      return (x as number) * 2;
    });
    expect(fn(5)).toBe(10);
    expect(fn(5)).toBe(10);
    expect(callCount).toBe(1);
    expect(fn(3)).toBe(6);
    expect(callCount).toBe(2);
  });

  it("once only calls function once", () => {
    let callCount = 0;
    const fn = once(() => {
      callCount++;
      return 42;
    });
    expect(fn()).toBe(42);
    expect(fn()).toBe(42);
    expect(callCount).toBe(1);
  });

  it("pipe", () => {
    const result = pipe(
      5,
      (x) => x * 2,
      (x) => x + 1,
      (x) => x.toString()
    );
    expect(result).toBe("11");
  });

  it("enumFromArray", () => {
    const status = enumFromArray(["active", "inactive", "pending"]);
    expect(status.active).toBe("active");
    expect(status.inactive).toBe("inactive");
  });

  it("deepFreeze", () => {
    const obj = deepFreeze({ a: { b: 1 } });
    expect(() => {
      (obj as any).a.b = 2;
    }).toThrow();
  });

  it("safeJsonParse", () => {
    expect(safeJsonParse('{"a":1}')).toEqual({ a: 1 });
    expect(safeJsonParse("invalid", null)).toBeNull();
    expect(safeJsonParse("invalid")).toBeUndefined();
  });
});
