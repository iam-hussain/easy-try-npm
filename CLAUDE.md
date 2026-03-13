# CLAUDE.md — AI Agent Context for easytry

## Project Overview

**easytry** is a modern, zero-dependency JavaScript/TypeScript utility toolkit with 110+ functions across 11 tree-shakeable modules. It targets universal environments (Node.js + Browser).

## Tech Stack

- **Language:** TypeScript (strict mode)
- **Build:** tsup (ESM + CJS dual output with `.d.ts`)
- **Test:** Vitest
- **CI:** GitHub Actions (Node 20/22/24)
- **Publish:** Tag-triggered (`v*`) to npm + GitHub Packages

## Project Structure

```
src/              # TypeScript source modules
  index.ts        # Main barrel export (re-exports all modules)
  string.ts       # String utilities (slugify, case conversion, etc.)
  id.ts           # ID generation (uuid, nanoid, Incrementer class)
  object.ts       # Object utilities (pick, omit, deepClone, etc.)
  array.ts        # Array utilities (chunk, groupBy, sortBy, etc.)
  number.ts       # Number utilities (clamp, format, ordinal, etc.)
  date.ts         # Date utilities (timeAgo, formatDate, etc.)
  validate.ts     # Validation (isEmail, isURL, isEmpty, etc.)
  async.ts        # Async utilities (retry, sleep, debounce, etc.)
  color.ts        # Color utilities (hex/rgb/hsl, lighten, darken)
  misc.ts         # Misc (ms parser, memoize, pipe, env readers)
tests/            # Vitest test files (one per module)
dist/             # Build output (git-ignored)
.github/workflows/
  ci.yml          # CI: test on push/PR
  publish.yml     # Publish on v* tags
```

## Commands

```bash
npm run build       # Build with tsup (output to dist/)
npm test            # Run tests with vitest
npm run test:watch  # Watch mode tests
npm run typecheck   # TypeScript type checking (tsc --noEmit)
npm run dev         # Watch mode build
```

## Key Design Principles

1. **Zero dependencies** — No runtime npm dependencies. Only devDependencies for build/test.
2. **Tree-shakeable** — Each module is a separate entry point (`easytry/string`, `easytry/array`, etc.)
3. **Universal** — Works in Node.js and browsers. Uses `crypto.getRandomValues` when available, falls back to `Math.random`.
4. **Pure functions** — Almost all functions are pure (no side effects). Exception: `Incrementer` class maintains state.
5. **Type-safe** — Full TypeScript with strict mode. Generic types where appropriate.

## Coding Conventions

- All functions are named exports (no default exports)
- Each module file exports only functions related to its domain
- `src/index.ts` re-exports everything from all modules
- JSDoc comments on every exported function (single-line `/** description */`)
- Tests are in `tests/<module>.test.ts`, using `describe`/`it`/`expect` from Vitest
- No classes except `Incrementer` (prefer functions)
- Options objects for functions with 3+ optional parameters

## Adding New Utilities

1. Add function to the appropriate `src/<module>.ts` file
2. Export from `src/index.ts`
3. Add tests in `tests/<module>.test.ts`
4. Update `llms-full.txt` with the function signature and description
5. Run `npm test` and `npm run typecheck` to verify

## Module Entry Points

The package.json `exports` map provides sub-path imports:
- `easytry` → everything
- `easytry/string` → string utilities only
- `easytry/array` → array utilities only
- etc.

This allows bundlers to tree-shake unused modules.

## AI-Friendly Documentation

- `llms.txt` — Short overview of all modules and import patterns
- `llms-full.txt` — Complete API reference with every function signature, types, and examples
- `CLAUDE.md` — This file, project context for AI agents
