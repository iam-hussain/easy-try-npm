import { describe, it, expect } from "vitest";
import {
  slugify, truncate, camelCase, snakeCase, kebabCase, pascalCase,
  titleCase, capitalize, maskString, template, reverse,
  countOccurrences, squish, isPalindrome, initials, escapeHtml,
  unescapeHtml, center, stripAnsi,
} from "../src/string.js";

describe("string", () => {
  it("slugify", () => {
    expect(slugify("Hello World!")).toBe("hello-world");
    expect(slugify("  Café  Résumé  ")).toBe("cafe-resume");
    expect(slugify("foo---bar")).toBe("foo-bar");
    expect(slugify("")).toBe("");
  });

  it("truncate", () => {
    expect(truncate("Hello World", 5)).toBe("He...");
    expect(truncate("Hi", 10)).toBe("Hi");
    expect(truncate("Hello World", 8, "~")).toBe("Hello W~");
  });

  it("camelCase", () => {
    expect(camelCase("hello world")).toBe("helloWorld");
    expect(camelCase("Hello-World")).toBe("helloWorld");
    expect(camelCase("FOO_BAR")).toBe("fOOBAR");
  });

  it("snakeCase", () => {
    expect(snakeCase("helloWorld")).toBe("hello_world");
    expect(snakeCase("Hello World")).toBe("hello_world");
    expect(snakeCase("hello-world")).toBe("hello_world");
  });

  it("kebabCase", () => {
    expect(kebabCase("helloWorld")).toBe("hello-world");
    expect(kebabCase("Hello World")).toBe("hello-world");
  });

  it("pascalCase", () => {
    expect(pascalCase("hello world")).toBe("HelloWorld");
  });

  it("titleCase", () => {
    expect(titleCase("hello world")).toBe("Hello World");
  });

  it("capitalize", () => {
    expect(capitalize("hello")).toBe("Hello");
    expect(capitalize("")).toBe("");
  });

  it("maskString", () => {
    expect(maskString("1234567890", { visibleStart: 2, visibleEnd: 2 })).toBe("12******90");
    expect(maskString("abc", { visibleStart: 0, visibleEnd: 0, maskChar: "#" })).toBe("###");
  });

  it("template", () => {
    expect(template("Hello {{name}}", { name: "World" })).toBe("Hello World");
    expect(template("{{a}} + {{b}}", { a: 1, b: 2 })).toBe("1 + 2");
    expect(template("{{missing}}", {})).toBe("{{missing}}");
  });

  it("reverse", () => {
    expect(reverse("hello")).toBe("olleh");
  });

  it("countOccurrences", () => {
    expect(countOccurrences("hello world hello", "hello")).toBe(2);
    expect(countOccurrences("aaa", "")).toBe(0);
  });

  it("squish", () => {
    expect(squish("  hello   world  ")).toBe("hello world");
  });

  it("isPalindrome", () => {
    expect(isPalindrome("racecar")).toBe(true);
    expect(isPalindrome("A man, a plan, a canal: Panama")).toBe(true);
    expect(isPalindrome("hello")).toBe(false);
  });

  it("initials", () => {
    expect(initials("John Doe")).toBe("JD");
    expect(initials("Alice Bob Charlie")).toBe("ABC");
  });

  it("escapeHtml / unescapeHtml", () => {
    expect(escapeHtml('<p>"hello" & \'world\'</p>')).toBe("&lt;p&gt;&quot;hello&quot; &amp; &#39;world&#39;&lt;/p&gt;");
    expect(unescapeHtml("&lt;p&gt;&amp;&lt;/p&gt;")).toBe("<p>&</p>");
  });

  it("center", () => {
    expect(center("hi", 6)).toBe("  hi  ");
    expect(center("hi", 7, "-")).toBe("--hi---");
  });

  it("stripAnsi", () => {
    expect(stripAnsi("\x1B[31mhello\x1B[0m")).toBe("hello");
  });
});
