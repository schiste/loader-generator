# Security Policy

## Scope

loader-generator is a purely client-side static web app. It makes no network
requests of its own beyond loading the Tailwind Play CDN and Google Fonts, stores
no data, and has no backend. The practical attack surface is small.

## Reporting a vulnerability

If you find a security issue, please report it privately rather than opening a
public issue:

- Use GitHub's **"Report a vulnerability"** (Security → Advisories) on the
  repository, or
- Email the maintainer at the address on their GitHub profile.

Please include steps to reproduce and the affected revision. We aim to acknowledge
reports within a few days.

## Known hardening notes

- The app loads the Tailwind **Play CDN**, a runtime JIT compiler that cannot be
  pinned with Subresource Integrity. Migrating to a compiled Tailwind stylesheet
  (and self-hosted fonts) is tracked as a hardening task and would allow a strict
  Content-Security-Policy.
- DOM is built with `innerHTML` only from browser-constrained `<input type="color">`
  values and numeric ids; user free-text is written via `textContent`. Keep it that
  way — route any new user-supplied text through `textContent`/DOM APIs, never into
  an HTML string.
