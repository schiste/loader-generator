# Loader Generator

[![Live demo](https://img.shields.io/badge/demo-live-22c55e?style=flat-square)](https://schiste.github.io/loader-generator/)
[![CI](https://img.shields.io/github/actions/workflow/status/schiste/loader-generator/ci.yml?branch=main&style=flat-square&label=CI)](https://github.com/schiste/loader-generator/actions/workflows/ci.yml)
[![License: AGPL v3](https://img.shields.io/badge/license-AGPL--3.0-a855f7?style=flat-square)](./LICENSE)

A browser-based visual generator for animated loading spinners — tweak it live and
copy production-ready **CSS**, **Canvas**, or **SVG**. No build step, no
dependencies, no sign-up.

### ▶︎ [Try it live → schiste.github.io/loader-generator](https://schiste.github.io/loader-generator/)

## What it does

Design a loading animation by tweaking controls, and copy production-ready code in
the format you want — no build step, no dependencies to install.

- **Geometry** — circle, squircle, hexagon, or triangle silhouettes; size, stroke
  thickness, sweep angle (partial arcs), and dashed/segmented rings.
- **Color** — multi-stop conic gradients with per-stop opacity, quick presets,
  tapered tails, and a comet fade.
- **Motion** — spin speed, direction, easing, continuous hue-shifting, breathing
  pulse, reversing sweep, and mirror.
- **Extras** — guide tracks, ambient glow with blend modes, and a center overlay
  (percentage counter or custom text).
- **Export** — live, copyable output as a **CSS mask**, **HTML5 Canvas** script, or
  **SVG vector**.

## Usage

It's a single self-contained HTML file. Either:

- **Open directly** — double-click `index.html`, or
- **Serve locally** (recommended, so clipboard copy works reliably):

  ```bash
  python3 -m http.server 8000
  # then visit http://localhost:8000
  ```

No installation is required to use it. Styling is a precompiled Tailwind
stylesheet (`tailwind.css`); regenerate it with `npm run build:css` after
changing classes in `index.html`. Fonts load from Google Fonts at runtime.

## Development

The pure math helpers are unit tested (the tests extract the real functions from
`index.html`, so they cover exactly the shipped code):

```bash
npm test        # node --test  — no dependencies to install
npm run serve   # serve locally on http://localhost:8000
```

See [CONTRIBUTING.md](./CONTRIBUTING.md) for more. CI runs the tests and a parse
check on every push/PR; `main` auto-deploys to GitHub Pages.

## Accessibility

The app honors `prefers-reduced-motion`, ships a Pause/Play control for the
preview, and labels its controls for assistive tech. The generated CSS/Canvas/SVG
snippets also include a `prefers-reduced-motion` guard and `role="status"`, so the
loaders you export stay accessible by default.

## Roadmap / known limitations

- The renderer and the three code-exporters still re-read state independently;
  unifying them behind one shared config object would prevent preview/export drift.

## License

This project is licensed under the **GNU Affero General Public License v3.0**
(AGPL-3.0). See [LICENSE](./LICENSE) for the full text.

The AGPL is a strong copyleft license: if you run a modified version of this
software to provide a network service, you must make the complete corresponding
source code of your modified version available to the users of that service.

Copyright (C) 2026 Christophe Henner

This program is free software: you can redistribute it and/or modify it under
the terms of the GNU Affero General Public License as published by the Free
Software Foundation, either version 3 of the License, or (at your option) any
later version.

This program is distributed in the hope that it will be useful, but WITHOUT ANY
WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A
PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.

## Contributing

Contributions are welcome. By submitting a contribution you agree to license it
under the same AGPL-3.0 terms as the rest of the project.
