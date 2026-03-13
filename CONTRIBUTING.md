# Contributing to easytry

Thanks for your interest in contributing! Here's how to get started.

## Development Setup

```bash
git clone https://github.com/iam-hussain/easy-try-npm.git
cd easy-try-npm
npm install
```

## Commands

| Command | Description |
|---|---|
| `npm run build` | Build with tsup |
| `npm test` | Run tests |
| `npm run test:watch` | Watch mode tests |
| `npm run typecheck` | TypeScript type checking |
| `npm run dev` | Watch mode build |

## Adding a New Utility

1. Add your function to the appropriate `src/<module>.ts` file
2. Export it from `src/index.ts`
3. Add tests in `tests/<module>.test.ts`
4. Update `llms-full.txt` with the function signature and description
5. Run `npm test && npm run typecheck` to verify

## Guidelines

- **Zero dependencies** — Do not add runtime dependencies
- **Pure functions** — Prefer pure functions over classes
- **TypeScript strict** — All code must pass `tsc --noEmit` in strict mode
- **Tests required** — Every new function needs test coverage
- **JSDoc comments** — Add a single-line `/** description */` above every export

## Commit Messages

Use clear, imperative commit messages:

```
Add formatPhoneNumber to string module
Fix deepMerge handling of null values
Update llms-full.txt with new API docs
```

## Pull Requests

1. Fork and create a feature branch
2. Make your changes with tests
3. Ensure `npm test` and `npm run typecheck` pass
4. Open a PR with a clear description of the change

## Releasing

Releases are automated via GitHub Actions. When a `v*` tag is pushed, the package is published to npm and GitHub Packages.

```bash
npm version patch  # or minor / major
git push --follow-tags
```
