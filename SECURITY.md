# Security Policy

## Supported Versions

| Version | Supported |
|---------|-----------|
| 3.x     | Yes       |
| < 3.0   | No        |

## Reporting a Vulnerability

If you discover a security vulnerability, please report it responsibly:

1. **Do not** open a public GitHub issue
2. Email the maintainer or use [GitHub's private vulnerability reporting](https://github.com/iam-hussain/easy-try-npm/security/advisories/new)
3. Include a description of the vulnerability and steps to reproduce

We will acknowledge receipt within 48 hours and aim to release a fix within 7 days for confirmed vulnerabilities.

## Security Design

easytry is designed with security in mind:

- **Zero runtime dependencies** — No supply chain risk from transitive dependencies
- **No network access** — All functions are pure computation, no outbound requests
- **No file system access** — No reading or writing files
- **No eval or dynamic code execution** — No `eval()`, `new Function()`, or similar patterns
