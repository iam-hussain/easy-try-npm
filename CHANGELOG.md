# Changelog

## 3.0.0 (2025)

Complete rewrite from the ground up.

### Breaking Changes

- Removed `Profanity` class and all profanity filter functionality (use a dedicated package like `leo-profanity`)
- Removed all language JSON files from `static/languages/`
- Changed from CommonJS to ESM-first (CJS still supported via dual output)
- `Incrementer` API renamed: `incrementer_by` → `incrementBy`, `formate` → `format`

### New Features

- **11 utility modules** with 110+ functions:
  - `easytry/string` — slugify, case conversion, truncate, mask, template, escape, initials
  - `easytry/id` — uuid, nanoid, shortId, prefixedId, cuid, sortableId, Incrementer
  - `easytry/object` — pick, omit, deepClone, deepMerge, flatten/unflatten, get/set
  - `easytry/array` — chunk, unique, groupBy, sortBy, partition, range, zip, compact
  - `easytry/number` — clamp, format, ordinal, humanReadable, lerp, formatBytes
  - `easytry/date` — timeAgo, formatDate, daysBetween, addDays, isToday
  - `easytry/validate` — isEmail, isURL, isEmpty, isEqual, isUUID, isJSON, isCreditCard
  - `easytry/async` — retry with backoff, sleep, debounce, throttle, pMap, timeout, mutex
  - `easytry/color` — hex/rgb/hsl conversion, lighten, darken, contrast, textColor
  - `easytry/misc` — ms parser, memoize, once, pipe, deepFreeze, safeJsonParse, env readers
- **TypeScript-first** with full type definitions (`.d.ts`)
- **ESM + CJS** dual output via tsup
- **Tree-shakeable** sub-path imports (`easytry/string`, `easytry/array`, etc.)
- **Zero runtime dependencies**
- **129 tests** with Vitest
- **GitHub Actions** CI and publish workflows
- **AI-friendly docs** — `llms.txt`, `llms-full.txt`, `CLAUDE.md`

### Preserved from v2

- `Incrementer` class with improved API and TypeScript types

## 2.0.2

- Documentation updates

## 2.0.0

- Added Incrementer utility
- Added multi-language profanity filter (23 languages)
- Initial release as `easytry`
