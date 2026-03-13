import { describe, it, expect } from "vitest";
import {
  randomString, nanoid, uuid, shortId, prefixedId,
  cuid, sortableId, Incrementer,
} from "../src/id.js";

describe("id", () => {
  it("randomString generates correct length", () => {
    expect(randomString(10)).toHaveLength(10);
    expect(randomString(32)).toHaveLength(32);
  });

  it("nanoid generates correct length", () => {
    expect(nanoid()).toHaveLength(21);
    expect(nanoid(10)).toHaveLength(10);
  });

  it("uuid generates valid v4 format", () => {
    const id = uuid();
    expect(id).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/);
  });

  it("shortId generates correct length", () => {
    expect(shortId()).toHaveLength(8);
    expect(shortId(12)).toHaveLength(12);
  });

  it("prefixedId has correct prefix", () => {
    const id = prefixedId("usr");
    expect(id).toMatch(/^usr_/);
    expect(id.split("_")[1]).toHaveLength(12);
  });

  it("cuid starts with c", () => {
    expect(cuid()).toMatch(/^c/);
  });

  it("sortableId is sortable", () => {
    const id1 = sortableId();
    const id2 = sortableId();
    expect(id1 <= id2).toBe(true);
  });

  describe("Incrementer", () => {
    it("increments with default format", () => {
      const inc = new Incrementer();
      expect(inc.next()).toBe("000aa1");
      expect(inc.next()).toBe("000aa2");
    });

    it("handles rollover", () => {
      const inc = new Incrementer({ format: "009" });
      expect(inc.next()).toBe("010");
      expect(inc.next()).toBe("011");
    });

    it("handles letter rollover", () => {
      const inc = new Incrementer({ format: "00z" });
      expect(inc.next()).toBe("01a");
    });

    it("supports uppercase", () => {
      const inc = new Incrementer({ uppercase: true, format: "aaa" });
      expect(inc.next()).toBe("AAB");
    });

    it("supports custom increment step", () => {
      const inc = new Incrementer({ incrementBy: 5, format: "000" });
      expect(inc.next()).toBe("005");
      expect(inc.next()).toBe("010");
    });

    it("supports delimiters", () => {
      const inc = new Incrementer();
      expect(inc.next("AA-009")).toBe("AA-010");
    });

    it("reset works", () => {
      const inc = new Incrementer({ format: "000" });
      inc.next();
      inc.next();
      inc.reset();
      expect(inc.next()).toBe("001");
    });
  });
});
