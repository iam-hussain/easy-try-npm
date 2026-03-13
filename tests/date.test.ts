import { describe, it, expect } from "vitest";
import {
  formatDate, isToday, isYesterday, isTomorrow, daysBetween,
  addDays, addHours, addMinutes, startOfDay, endOfDay,
  isDateBetween, isLeapYear, daysInMonth,
} from "../src/date.js";

describe("date", () => {
  it("formatDate", () => {
    const d = new Date(2024, 0, 15, 9, 30, 45);
    expect(formatDate(d, "YYYY-MM-DD")).toBe("2024-01-15");
    expect(formatDate(d, "DD/MM/YYYY HH:mm:ss")).toBe("15/01/2024 09:30:45");
  });

  it("isToday", () => {
    expect(isToday(new Date())).toBe(true);
    expect(isToday(new Date("2000-01-01"))).toBe(false);
  });

  it("isYesterday", () => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    expect(isYesterday(yesterday)).toBe(true);
    expect(isYesterday(new Date())).toBe(false);
  });

  it("isTomorrow", () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    expect(isTomorrow(tomorrow)).toBe(true);
    expect(isTomorrow(new Date())).toBe(false);
  });

  it("daysBetween", () => {
    expect(daysBetween("2024-01-01", "2024-01-11")).toBe(10);
    expect(daysBetween("2024-01-11", "2024-01-01")).toBe(10);
  });

  it("addDays / addHours / addMinutes", () => {
    const d = new Date("2024-01-01T00:00:00Z");
    expect(addDays(d, 5).getDate()).toBe(6);
    expect(addHours(d, 2).getUTCHours()).toBe(2);
    expect(addMinutes(d, 30).getUTCMinutes()).toBe(30);
  });

  it("startOfDay / endOfDay", () => {
    const d = new Date("2024-06-15T14:30:00");
    const start = startOfDay(d);
    expect(start.getHours()).toBe(0);
    expect(start.getMinutes()).toBe(0);
    const end = endOfDay(d);
    expect(end.getHours()).toBe(23);
    expect(end.getMinutes()).toBe(59);
  });

  it("isDateBetween", () => {
    expect(isDateBetween("2024-06-15", "2024-01-01", "2024-12-31")).toBe(true);
    expect(isDateBetween("2025-06-15", "2024-01-01", "2024-12-31")).toBe(false);
  });

  it("isLeapYear", () => {
    expect(isLeapYear(2024)).toBe(true);
    expect(isLeapYear(2023)).toBe(false);
    expect(isLeapYear(2000)).toBe(true);
    expect(isLeapYear(1900)).toBe(false);
  });

  it("daysInMonth", () => {
    expect(daysInMonth(2024, 2)).toBe(29);
    expect(daysInMonth(2023, 2)).toBe(28);
    expect(daysInMonth(2024, 1)).toBe(31);
  });
});
