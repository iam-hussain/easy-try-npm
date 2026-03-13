import { describe, it, expect } from "vitest";
import { retry, sleep, deferred, timeout, pMap } from "../src/async.js";

describe("async", () => {
  it("sleep", async () => {
    const start = Date.now();
    await sleep(50);
    expect(Date.now() - start).toBeGreaterThanOrEqual(40);
  });

  it("retry succeeds after failures", async () => {
    let attempts = 0;
    const fn = async () => {
      attempts++;
      if (attempts < 3) throw new Error("fail");
      return "success";
    };
    const result = await retry(fn, { attempts: 3, delay: 10 });
    expect(result).toBe("success");
    expect(attempts).toBe(3);
  });

  it("retry throws after all attempts fail", async () => {
    const fn = async () => {
      throw new Error("always fail");
    };
    await expect(retry(fn, { attempts: 2, delay: 10 })).rejects.toThrow("always fail");
  });

  it("deferred", async () => {
    const { promise, resolve } = deferred<string>();
    setTimeout(() => resolve("done"), 10);
    expect(await promise).toBe("done");
  });

  it("timeout resolves before deadline", async () => {
    const result = await timeout(
      Promise.resolve("ok"),
      1000
    );
    expect(result).toBe("ok");
  });

  it("timeout rejects after deadline", async () => {
    await expect(
      timeout(sleep(500).then(() => "late"), 10, "too slow")
    ).rejects.toThrow("too slow");
  });

  it("pMap with concurrency", async () => {
    const results = await pMap(
      [1, 2, 3, 4],
      async (n) => n * 2,
      2
    );
    expect(results).toEqual([2, 4, 6, 8]);
  });
});
