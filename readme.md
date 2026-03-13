# easytry

[![CI](https://github.com/iam-hussain/easy-try-npm/actions/workflows/ci.yml/badge.svg)](https://github.com/iam-hussain/easy-try-npm/actions/workflows/ci.yml)
[![npm version](https://img.shields.io/npm/v/easytry.svg)](https://www.npmjs.com/package/easytry)
[![npm downloads](https://img.shields.io/npm/dm/easytry.svg)](https://www.npmjs.com/package/easytry)
[![bundle size](https://img.shields.io/bundlephobia/minzip/easytry)](https://bundlephobia.com/package/easytry)
[![TypeScript](https://img.shields.io/badge/TypeScript-strict-blue.svg)](https://www.typescriptlang.org/)
[![zero dependencies](https://img.shields.io/badge/dependencies-0-green.svg)](https://www.npmjs.com/package/easytry)
[![license](https://img.shields.io/npm/l/easytry.svg)](https://github.com/iam-hussain/easy-try-npm/blob/master/LICENSE)

A modern, lightweight, **zero-dependency** utility toolkit for everyday JavaScript/TypeScript development.

**Tree-shakeable** | **ESM + CJS** | **Full TypeScript** | **110+ utilities** | **Universal (Node + Browser)**

## Installation

```bash
npm install easytry
```

```bash
yarn add easytry
```

```bash
pnpm add easytry
```

## Quick Start

```ts
// Import everything
import { slugify, chunk, timeAgo, uuid, retry } from 'easytry';

// Or import only what you need (tree-shakeable, recommended)
import { slugify, camelCase } from 'easytry/string';
import { chunk, groupBy } from 'easytry/array';
import { uuid, nanoid } from 'easytry/id';

// CommonJS
const { slugify, chunk } = require('easytry');
```

## Modules at a Glance

| Module | Key Functions | Import |
|---|---|---|
| **String** | `slugify`, `camelCase`, `snakeCase`, `truncate`, `maskString`, `template` | `easytry/string` |
| **ID** | `uuid`, `nanoid`, `shortId`, `prefixedId`, `sortableId`, `Incrementer` | `easytry/id` |
| **Object** | `pick`, `omit`, `deepClone`, `deepMerge`, `get`, `set`, `flattenObject` | `easytry/object` |
| **Array** | `chunk`, `unique`, `groupBy`, `sortBy`, `partition`, `range`, `compact` | `easytry/array` |
| **Number** | `clamp`, `formatCurrency`, `ordinal`, `toHumanReadable`, `formatBytes` | `easytry/number` |
| **Date** | `timeAgo`, `formatDate`, `daysBetween`, `addDays`, `isToday` | `easytry/date` |
| **Validate** | `isEmail`, `isURL`, `isEmpty`, `isEqual`, `isUUID`, `isCreditCard` | `easytry/validate` |
| **Async** | `retry`, `sleep`, `debounce`, `throttle`, `pMap`, `timeout`, `mutex` | `easytry/async` |
| **Color** | `hexToRgb`, `rgbToHex`, `lighten`, `darken`, `contrastRatio`, `textColor` | `easytry/color` |
| **Misc** | `ms`, `memoize`, `once`, `pipe`, `deepFreeze`, `safeJsonParse`, `env` | `easytry/misc` |

## String (`easytry/string`)

```ts
import {
  slugify, truncate, camelCase, snakeCase, kebabCase,
  pascalCase, titleCase, capitalize, maskString, template,
  reverse, countOccurrences, squish, isPalindrome, initials,
  escapeHtml, unescapeHtml, center, stripAnsi,
} from 'easytry/string';

slugify('Hello World!')           // 'hello-world'
truncate('Long text here', 8)     // 'Long ...'
camelCase('hello world')          // 'helloWorld'
snakeCase('helloWorld')           // 'hello_world'
kebabCase('helloWorld')           // 'hello-world'
pascalCase('hello world')         // 'HelloWorld'
titleCase('hello world')          // 'Hello World'
capitalize('hello')               // 'Hello'
maskString('4111111111111111', { visibleStart: 4, visibleEnd: 4 })
                                  // '4111********1111'
template('Hello {{name}}!', { name: 'World' })
                                  // 'Hello World!'
initials('John Doe')              // 'JD'
squish('  too   many   spaces ')  // 'too many spaces'
escapeHtml('<p>hi</p>')           // '&lt;p&gt;hi&lt;/p&gt;'
```

## ID Generation (`easytry/id`)

```ts
import {
  uuid, nanoid, shortId, randomString, prefixedId,
  cuid, sortableId, Incrementer,
} from 'easytry/id';

uuid()                       // '550e8400-e29b-41d4-a716-446655440000'
nanoid()                     // 'V1StGXR8_Z5jdHi6B-myT'
shortId()                    // 'x7Kp2mNq'
randomString(16)             // 'aBcDeFgHiJkLmNoP'
prefixedId('usr')            // 'usr_abc123def456'
cuid()                       // 'clx1234567abcdefgh'
sortableId()                 // monotonically increasing, sortable

// Sequential incrementer (upgraded from v2)
const inc = new Incrementer({ format: '000aa0' });
inc.next()                   // '000aa1'
inc.next()                   // '000aa2'
inc.next('2024/01/ABC009')   // '2024/01/ABC010'
```

## Object (`easytry/object`)

```ts
import {
  pick, omit, deepClone, deepMerge, flattenObject,
  unflattenObject, get, set, isPlainObject, mapValues,
  filterObject,
} from 'easytry/object';

pick({ a: 1, b: 2, c: 3 }, ['a', 'c'])     // { a: 1, c: 3 }
omit({ a: 1, b: 2, c: 3 }, ['b'])           // { a: 1, c: 3 }
deepClone({ a: { b: 1 } })                  // deep copy
deepMerge({ a: 1, b: { x: 1 } }, { b: { y: 2 } })
                                              // { a: 1, b: { x: 1, y: 2 } }
flattenObject({ a: { b: { c: 1 } } })       // { 'a.b.c': 1 }
get({ a: { b: 42 } }, 'a.b')                // 42
set({}, 'a.b.c', 42)                        // { a: { b: { c: 42 } } }
```

## Array (`easytry/array`)

```ts
import {
  chunk, unique, uniqueBy, shuffle, groupBy, sortBy,
  difference, intersection, partition, zip, range,
  compact, frequency, sum, average, count, first, last,
  sample, sampleMany, flatten, symmetricDifference,
} from 'easytry/array';

chunk([1, 2, 3, 4, 5], 2)        // [[1, 2], [3, 4], [5]]
unique([1, 2, 2, 3])             // [1, 2, 3]
groupBy(users, u => u.role)      // { admin: [...], user: [...] }
sortBy(items, i => i.price)      // sorted ascending
difference([1, 2, 3], [2])       // [1, 3]
intersection([1, 2], [2, 3])     // [2]
partition([1,2,3,4], n => n > 2) // [[3, 4], [1, 2]]
range(0, 5)                      // [0, 1, 2, 3, 4]
compact([0, 1, null, 2, ''])     // [1, 2]
frequency(['a','b','a'])         // { a: 2, b: 1 }
sum([1, 2, 3])                   // 6
average([1, 2, 3])               // 2
```

## Number (`easytry/number`)

```ts
import {
  clamp, randomInt, randomFloat, formatCurrency, ordinal,
  toHumanReadable, formatNumber, round, percentOf, toPercent,
  lerp, mapRange, inRange, formatBytes,
} from 'easytry/number';

clamp(15, 0, 10)                  // 10
randomInt(1, 100)                 // 42
formatCurrency(19.99, 'USD')      // '$19.99'
ordinal(3)                        // '3rd'
toHumanReadable(1500000)          // '1.5M'
formatNumber(1000000)             // '1,000,000'
formatBytes(1073741824)           // '1 GB'
lerp(0, 100, 0.5)                // 50
```

## Date (`easytry/date`)

```ts
import {
  timeAgo, timeFromNow, formatDate, isToday, isYesterday,
  isTomorrow, daysBetween, addDays, addHours, addMinutes,
  startOfDay, endOfDay, isDateBetween, isLeapYear, daysInMonth,
} from 'easytry/date';

timeAgo(new Date('2024-01-01'))     // '1 year ago'
timeFromNow(futureDate)             // 'in 3 days'
formatDate(new Date(), 'YYYY-MM-DD') // '2024-06-15'
isToday(new Date())                  // true
daysBetween('2024-01-01', '2024-12-31') // 365
addDays(new Date(), 7)               // Date (1 week from now)
isLeapYear(2024)                     // true
```

## Validation (`easytry/validate`)

```ts
import {
  isEmail, isURL, isEmpty, isEqual, isIPv4, isIPv6,
  isHexColor, isAlphanumeric, isJSON, isNumber, isUUID,
  isObject, isCreditCard, isPhoneNumber,
} from 'easytry/validate';

isEmail('user@example.com')    // true
isURL('https://example.com')   // true
isEmpty({})                    // true
isEmpty([])                    // true
isEmpty('  ')                  // true
isEqual({ a: 1 }, { a: 1 })   // true (deep)
isUUID('550e8400-e29b-...')    // true
isHexColor('#ff0000')          // true
isCreditCard('4111111111111111') // true (Luhn check)
```

## Async (`easytry/async`)

```ts
import {
  retry, sleep, debounce, throttle, pMap,
  deferred, timeout, createMutex,
} from 'easytry/async';

// Retry with exponential backoff
const data = await retry(() => fetchAPI(), {
  attempts: 3,
  delay: 1000,
  backoff: 2,
  onRetry: (err, attempt) => console.log(`Retry ${attempt}...`),
});

await sleep(1000);  // wait 1 second

// Run with concurrency limit
const results = await pMap(urls, url => fetch(url), 5);

// Timeout a promise
const result = await timeout(slowOperation(), 5000, 'Too slow!');

// Mutex for async operations
const mutex = createMutex();
const release = await mutex.acquire();
try { /* critical section */ } finally { release(); }
```

## Color (`easytry/color`)

```ts
import {
  hexToRgb, rgbToHex, rgbToHsl, hslToRgb, lighten, darken,
  randomColor, luminance, contrastRatio, textColor,
  mixColors, complementary, toRgba,
} from 'easytry/color';

hexToRgb('#ff0000')              // { r: 255, g: 0, b: 0 }
rgbToHex(255, 0, 0)              // '#ff0000'
lighten('#ff0000', 20)           // lighter red
darken('#ff0000', 20)            // darker red
randomColor()                    // '#a3f29c'
textColor('#1a1a1a')             // '#ffffff'
contrastRatio('#000', '#fff')    // 21
mixColors('#ff0000', '#0000ff')  // purple
complementary('#ff0000')         // '#00ffff'
toRgba('#ff0000', 0.5)           // 'rgba(255, 0, 0, 0.5)'
```

## Misc (`easytry/misc`)

```ts
import {
  ms, msToString, parseBytes, env, envNumber, envBool,
  hash, hashHex, noop, identity, memoize, once, pipe,
  enumFromArray, deepFreeze, safeJsonParse,
} from 'easytry/misc';

ms('2h')                    // 7200000
ms('500ms')                 // 500
msToString(90000)            // '1.5m'
parseBytes('1.5GB')          // 1610612736
env('NODE_ENV', 'development') // read env safely
envNumber('PORT', 3000)      // env as number
envBool('DEBUG', false)      // env as boolean
hash('hello')                // 99162322
memoize(expensiveFn)         // cached version
once(initFn)                 // only runs once
pipe(5, x => x * 2, x => x + 1) // 11
safeJsonParse('{"a":1}')     // { a: 1 } (no throw)
deepFreeze({ a: { b: 1 } }) // fully immutable
```

## AI / LLM / MCP Integration

This library provides machine-readable documentation for AI agents and LLM tools:

| File | Purpose |
|---|---|
| [`llms.txt`](./llms.txt) | Short overview — module list, import patterns, one-line descriptions |
| [`llms-full.txt`](./llms-full.txt) | Complete API reference — every function signature, types, and examples |
| [`CLAUDE.md`](./CLAUDE.md) | Project context for AI coding agents (structure, conventions, commands) |

These files follow the [llms.txt](https://llmstxt.org/) convention so AI tools can quickly understand and use this library.

## Migration from v2

v3 is a complete rewrite. Key changes:

- **Profanity filter removed** — Use a dedicated package like `leo-profanity` or `profanease`
- **Incrementer preserved** — Same concept, cleaner API:
  - `incrementer_by` -> `incrementBy`
  - `formate` -> `format`
- **TypeScript-first** with full type definitions
- **ESM + CJS** dual output
- **Tree-shakeable** — import only what you need

```ts
// v2 (CommonJS)
var easytry = require('easytry');
var inc = new easytry.Incrementer({ formate: '000', incrementer_by: 1 });

// v3 (ESM)
import { Incrementer } from 'easytry';
const inc = new Incrementer({ format: '000', incrementBy: 1 });
```

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for development setup and guidelines.

## License

[MIT](./LICENSE)
