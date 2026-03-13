/**
 * Async utilities
 */

export interface RetryOptions {
  /** Number of retry attempts (default: 3) */
  attempts?: number;
  /** Delay between retries in ms (default: 1000) */
  delay?: number;
  /** Multiply delay by this factor each retry (default: 2) */
  backoff?: number;
  /** Maximum delay in ms (default: 30000) */
  maxDelay?: number;
  /** Called on each retry with error and attempt number */
  onRetry?: (error: Error, attempt: number) => void;
}

/** Retry an async function with exponential backoff */
export async function retry<T>(
  fn: () => Promise<T>,
  options: RetryOptions = {}
): Promise<T> {
  const {
    attempts = 3,
    delay = 1000,
    backoff = 2,
    maxDelay = 30000,
    onRetry,
  } = options;

  let lastError: Error | undefined;
  let currentDelay = delay;

  for (let attempt = 1; attempt <= attempts; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));

      if (attempt === attempts) break;

      onRetry?.(lastError, attempt);
      await sleep(currentDelay);
      currentDelay = Math.min(currentDelay * backoff, maxDelay);
    }
  }

  throw lastError;
}

/** Sleep for a specified number of milliseconds */
export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/** Create a debounced version of a function */
export function debounce<T extends (...args: unknown[]) => unknown>(
  fn: T,
  wait: number
): T & { cancel: () => void } {
  let timeoutId: ReturnType<typeof setTimeout> | undefined;

  const debounced = function (this: unknown, ...args: unknown[]) {
    if (timeoutId !== undefined) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      fn.apply(this, args);
      timeoutId = undefined;
    }, wait);
  } as T & { cancel: () => void };

  debounced.cancel = () => {
    if (timeoutId !== undefined) {
      clearTimeout(timeoutId);
      timeoutId = undefined;
    }
  };

  return debounced;
}

/** Create a throttled version of a function */
export function throttle<T extends (...args: unknown[]) => unknown>(
  fn: T,
  limit: number
): T & { cancel: () => void } {
  let inThrottle = false;
  let timeoutId: ReturnType<typeof setTimeout> | undefined;

  const throttled = function (this: unknown, ...args: unknown[]) {
    if (!inThrottle) {
      fn.apply(this, args);
      inThrottle = true;
      timeoutId = setTimeout(() => {
        inThrottle = false;
      }, limit);
    }
  } as T & { cancel: () => void };

  throttled.cancel = () => {
    inThrottle = false;
    if (timeoutId !== undefined) {
      clearTimeout(timeoutId);
      timeoutId = undefined;
    }
  };

  return throttled;
}

/** Run promises with a concurrency limit */
export async function pMap<T, R>(
  items: T[],
  fn: (item: T, index: number) => Promise<R>,
  concurrency = Infinity
): Promise<R[]> {
  if (items.length === 0) return [];
  const effectiveConcurrency = Math.max(1, Math.min(concurrency, items.length));
  const results: R[] = new Array(items.length);
  let index = 0;

  async function worker() {
    while (index < items.length) {
      const currentIndex = index++;
      results[currentIndex] = await fn(items[currentIndex], currentIndex);
    }
  }

  const workers = Array.from(
    { length: effectiveConcurrency },
    () => worker()
  );

  await Promise.all(workers);
  return results;
}

/** Create a deferred promise */
export function deferred<T>(): {
  promise: Promise<T>;
  resolve: (value: T) => void;
  reject: (reason?: unknown) => void;
} {
  let resolve!: (value: T) => void;
  let reject!: (reason?: unknown) => void;

  const promise = new Promise<T>((res, rej) => {
    resolve = res;
    reject = rej;
  });

  return { promise, resolve, reject };
}

/** Add a timeout to a promise */
export async function timeout<T>(
  promise: Promise<T>,
  ms: number,
  message = "Operation timed out"
): Promise<T> {
  let timeoutId: ReturnType<typeof setTimeout>;

  const timeoutPromise = new Promise<never>((_, reject) => {
    timeoutId = setTimeout(() => reject(new Error(message)), ms);
  });

  try {
    return await Promise.race([promise, timeoutPromise]);
  } finally {
    clearTimeout(timeoutId!);
  }
}

/** Create a mutex/lock for async operations */
export function createMutex() {
  let locked = false;
  const queue: (() => void)[] = [];

  return {
    async acquire(): Promise<() => void> {
      if (!locked) {
        locked = true;
        return () => {
          locked = false;
          const next = queue.shift();
          if (next) {
            locked = true;
            next();
          }
        };
      }

      return new Promise<() => void>((resolve) => {
        queue.push(() => {
          resolve(() => {
            locked = false;
            const next = queue.shift();
            if (next) {
              locked = true;
              next();
            }
          });
        });
      });
    },

    get isLocked(): boolean {
      return locked;
    },
  };
}
