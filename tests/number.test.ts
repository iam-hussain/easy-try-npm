import { describe, it, expect } from "vitest";
import {
  clamp, randomInt, randomFloat, ordinal, toHumanReadable,
  formatNumber, round, percentOf, toPercent, lerp, mapRange,
  inRange, formatBytes,
} from "../src/number.js";

describe("number", () => {
  it("clamp", () => {
    expect(clamp(5, 0, 10)).toBe(5);
    expect(clamp(-5, 0, 10)).toBe(0);
    expect(clamp(15, 0, 10)).toBe(10);
  });

  it("randomInt", () => {
    for (let i = 0; i < 100; i++) {
      const val = randomInt(1, 10);
      expect(val).toBeGreaterThanOrEqual(1);
      expect(val).toBeLessThanOrEqual(10);
      expect(Number.isInteger(val)).toBe(true);
    }
  });

  it("randomFloat", () => {
    const val = randomFloat(0, 1, 4);
    expect(val).toBeGreaterThanOrEqual(0);
    expect(val).toBeLessThanOrEqual(1);
  });

  it("ordinal", () => {
    expect(ordinal(1)).toBe("1st");
    expect(ordinal(2)).toBe("2nd");
    expect(ordinal(3)).toBe("3rd");
    expect(ordinal(4)).toBe("4th");
    expect(ordinal(11)).toBe("11th");
    expect(ordinal(12)).toBe("12th");
    expect(ordinal(13)).toBe("13th");
    expect(ordinal(21)).toBe("21st");
    expect(ordinal(22)).toBe("22nd");
    expect(ordinal(111)).toBe("111th");
  });

  it("toHumanReadable", () => {
    expect(toHumanReadable(500)).toBe("500");
    expect(toHumanReadable(1500)).toBe("1.5K");
    expect(toHumanReadable(1500000)).toBe("1.5M");
    expect(toHumanReadable(1500000000)).toBe("1.5B");
    expect(toHumanReadable(-2500)).toBe("-2.5K");
  });

  it("formatNumber", () => {
    expect(formatNumber(1000000)).toBe("1,000,000");
  });

  it("round", () => {
    expect(round(1.2345, 2)).toBe(1.23);
    expect(round(1.5)).toBe(2);
  });

  it("percentOf / toPercent", () => {
    expect(percentOf(50, 200)).toBe(100);
    expect(toPercent(50, 200)).toBe(25);
    expect(toPercent(0, 0)).toBe(0);
  });

  it("lerp", () => {
    expect(lerp(0, 100, 0.5)).toBe(50);
    expect(lerp(0, 100, 0)).toBe(0);
    expect(lerp(0, 100, 1)).toBe(100);
  });

  it("mapRange", () => {
    expect(mapRange(5, 0, 10, 0, 100)).toBe(50);
  });

  it("inRange", () => {
    expect(inRange(5, 0, 10)).toBe(true);
    expect(inRange(15, 0, 10)).toBe(false);
  });

  it("formatBytes", () => {
    expect(formatBytes(0)).toBe("0 B");
    expect(formatBytes(1024)).toBe("1 KB");
    expect(formatBytes(1536)).toBe("1.5 KB");
    expect(formatBytes(1073741824)).toBe("1 GB");
  });
});
