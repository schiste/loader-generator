# loader-generator

> **Hue-Shift Loader Lab** — a browser-based visual generator for animated loading
> spinners, with live preview and one-click export to CSS, Canvas, or SVG.

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

No installation or build is required. Tailwind and fonts load from CDNs at runtime.

## Roadmap / known limitations

- Tailwind is loaded via the Play CDN (a runtime JIT compiler) — fine for
  prototyping, but a future revision should ship a compiled stylesheet for
  production hardening and offline use.
- Clipboard copy uses the legacy `document.execCommand('copy')` path; migrating to
  the async Clipboard API is a candidate improvement.

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
