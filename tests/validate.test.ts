import { describe, it, expect } from "vitest";
import {
  isEmail, isURL, isEmpty, isEqual, isIPv4, isHexColor,
  isAlphanumeric, isJSON, isNumber, isUUID, isObject, isCreditCard,
} from "../src/validate.js";

describe("validate", () => {
  it("isEmail", () => {
    expect(isEmail("test@example.com")).toBe(true);
    expect(isEmail("user+tag@domain.co")).toBe(true);
    expect(isEmail("invalid")).toBe(false);
    expect(isEmail("@domain.com")).toBe(false);
    expect(isEmail("user@")).toBe(false);
  });

  it("isURL", () => {
    expect(isURL("https://example.com")).toBe(true);
    expect(isURL("http://localhost:3000")).toBe(true);
    expect(isURL("not a url")).toBe(false);
  });

  it("isEmpty", () => {
    expect(isEmpty(null)).toBe(true);
    expect(isEmpty(undefined)).toBe(true);
    expect(isEmpty("")).toBe(true);
    expect(isEmpty("  ")).toBe(true);
    expect(isEmpty([])).toBe(true);
    expect(isEmpty({})).toBe(true);
    expect(isEmpty(new Map())).toBe(true);
    expect(isEmpty("hello")).toBe(false);
    expect(isEmpty([1])).toBe(false);
    expect(isEmpty({ a: 1 })).toBe(false);
    expect(isEmpty(0)).toBe(false);
    expect(isEmpty(false)).toBe(false);
  });

  it("isEqual", () => {
    expect(isEqual({ a: 1, b: { c: 2 } }, { a: 1, b: { c: 2 } })).toBe(true);
    expect(isEqual([1, 2, 3], [1, 2, 3])).toBe(true);
    expect(isEqual([1, 2], [1, 3])).toBe(false);
    expect(isEqual(new Date("2024-01-01"), new Date("2024-01-01"))).toBe(true);
    expect(isEqual(null, null)).toBe(true);
    expect(isEqual(null, undefined)).toBe(false);
  });

  it("isIPv4", () => {
    expect(isIPv4("192.168.1.1")).toBe(true);
    expect(isIPv4("0.0.0.0")).toBe(true);
    expect(isIPv4("256.0.0.1")).toBe(false);
    expect(isIPv4("1.2.3")).toBe(false);
  });

  it("isHexColor", () => {
    expect(isHexColor("#fff")).toBe(true);
    expect(isHexColor("#ff0000")).toBe(true);
    expect(isHexColor("#ff000080")).toBe(true);
    expect(isHexColor("fff")).toBe(false);
    expect(isHexColor("#gggggg")).toBe(false);
  });

  it("isAlphanumeric", () => {
    expect(isAlphanumeric("abc123")).toBe(true);
    expect(isAlphanumeric("abc 123")).toBe(false);
    expect(isAlphanumeric("")).toBe(false);
  });

  it("isJSON", () => {
    expect(isJSON('{"a":1}')).toBe(true);
    expect(isJSON("not json")).toBe(false);
  });

  it("isNumber", () => {
    expect(isNumber(42)).toBe(true);
    expect(isNumber(NaN)).toBe(false);
    expect(isNumber("42")).toBe(false);
  });

  it("isUUID", () => {
    expect(isUUID("550e8400-e29b-41d4-a716-446655440000")).toBe(true);
    expect(isUUID("not-a-uuid")).toBe(false);
  });

  it("isObject", () => {
    expect(isObject({})).toBe(true);
    expect(isObject([])).toBe(false);
    expect(isObject(null)).toBe(false);
  });

  it("isCreditCard", () => {
    expect(isCreditCard("4111111111111111")).toBe(true); // Visa test
    expect(isCreditCard("1234567890123456")).toBe(false);
  });
});
