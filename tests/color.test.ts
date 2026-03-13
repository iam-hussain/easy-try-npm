import { describe, it, expect } from "vitest";
import {
  hexToRgb, rgbToHex, rgbToHsl, hslToRgb, lighten, darken,
  randomColor, luminance, contrastRatio, textColor, mixColors,
  complementary, toRgba,
} from "../src/color.js";

describe("color", () => {
  it("hexToRgb", () => {
    expect(hexToRgb("#ff0000")).toEqual({ r: 255, g: 0, b: 0 });
    expect(hexToRgb("#f00")).toEqual({ r: 255, g: 0, b: 0 });
    expect(hexToRgb("00ff00")).toEqual({ r: 0, g: 255, b: 0 });
  });

  it("rgbToHex", () => {
    expect(rgbToHex(255, 0, 0)).toBe("#ff0000");
    expect(rgbToHex(0, 255, 0)).toBe("#00ff00");
    expect(rgbToHex(0, 0, 255)).toBe("#0000ff");
  });

  it("rgbToHsl / hslToRgb roundtrip", () => {
    const hsl = rgbToHsl(255, 0, 0);
    expect(hsl.h).toBe(0);
    expect(hsl.s).toBe(100);
    expect(hsl.l).toBe(50);

    const rgb = hslToRgb(0, 100, 50);
    expect(rgb.r).toBe(255);
    expect(rgb.g).toBe(0);
    expect(rgb.b).toBe(0);
  });

  it("lighten / darken", () => {
    const lighter = lighten("#ff0000", 20);
    const lighterRgb = hexToRgb(lighter);
    expect(lighterRgb.r).toBe(255);
    expect(lighterRgb.g).toBeGreaterThan(0);

    const darker = darken("#ff0000", 20);
    const darkerRgb = hexToRgb(darker);
    expect(darkerRgb.r).toBeLessThan(255);
  });

  it("randomColor returns valid hex", () => {
    expect(randomColor()).toMatch(/^#[0-9a-f]{6}$/);
  });

  it("luminance", () => {
    expect(luminance("#ffffff")).toBeCloseTo(1, 1);
    expect(luminance("#000000")).toBeCloseTo(0, 1);
  });

  it("contrastRatio", () => {
    const ratio = contrastRatio("#000000", "#ffffff");
    expect(ratio).toBeCloseTo(21, 0);
  });

  it("textColor", () => {
    expect(textColor("#ffffff")).toBe("#000000");
    expect(textColor("#000000")).toBe("#ffffff");
  });

  it("mixColors", () => {
    const mixed = mixColors("#ff0000", "#0000ff", 0.5);
    const rgb = hexToRgb(mixed);
    expect(rgb.r).toBe(128);
    expect(rgb.b).toBe(128);
  });

  it("complementary", () => {
    expect(complementary("#ff0000")).toBe("#00ffff");
  });

  it("toRgba", () => {
    expect(toRgba("#ff0000")).toBe("rgba(255, 0, 0, 1)");
    expect(toRgba("#ff0000", 0.5)).toBe("rgba(255, 0, 0, 0.5)");
  });
});
