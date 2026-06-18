# Contributing to loader-generator

Thanks for your interest in improving the Hue-Shift Loader Lab! Contributions of
all sizes are welcome — bug reports, fixes, new shapes/effects, accessibility
improvements, and docs.

## Project shape

The app is a single self-contained file: **`index.html`**. It bundles the markup,
styles, and all logic. There is no build step to run it — open the file in a
browser, or serve it locally:

```bash
npm run serve   # python3 -m http.server 8000, then visit http://localhost:8000
```

Serving (rather than opening via `file://`) is recommended so the async Clipboard
API works.

## Tests

The pure math helpers (color parsing, gradient sampling, shape geometry) are unit
tested. The tests extract the real functions from `index.html` at runtime, so they
verify exactly the code that ships:

```bash
npm test        # node --test
```

If you change any of `hexToRgba`, `interpolateColor`, `getColorAtRatio`,
`getPolygonDistanceAtAngle`, or `getDistanceAtAngle`, please keep the tests green
(and add cases for new behavior).

## Pull requests

1. Keep changes focused; one logical change per PR.
2. Make sure `npm test` passes and the page still loads without console errors.
3. Match the surrounding code style (it's plain, dependency-free browser JS).
4. For UI changes, consider accessibility: keep controls labeled, preserve the
   `prefers-reduced-motion` and Pause behavior, and don't remove focus rings.

## Licensing of contributions

By submitting a contribution you agree to license it under the project's
**AGPL-3.0-or-later** terms (see [LICENSE](./LICENSE)). Because the AGPL applies to
network use, please keep the in-app "Source · AGPL" link pointing at the canonical
repository.
