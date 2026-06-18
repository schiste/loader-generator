// Unit tests for the pure math helpers in index.html.
//
// The app is intentionally a single self-contained HTML file, so rather than
// duplicate the helpers here we extract the real function source from
// index.html and evaluate it in a sandbox. That keeps the tests honest: they
// exercise exactly the code that ships, and they fail if the helpers drift.

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import vm from 'node:vm';

const here = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(here, '..', 'index.html'), 'utf8');

function slice(startMarker, endMarker) {
  const a = html.indexOf(startMarker);
  const b = html.indexOf(endMarker, a);
  if (a === -1 || b === -1) throw new Error(`Markers not found: ${startMarker} .. ${endMarker}`);
  return html.slice(a, b);
}

// Two contiguous blocks of pure (DOM-free) helpers.
const colorBlock = slice('function hexToRgba', '// Dynamic Color Stops Renderer UI');
const geomBlock = slice('function getPolygonDistanceAtAngle', '// Dynamic Hardware-Accelerated Draw Dispatcher');

const ctx = { Math, parseInt, parseFloat };
vm.createContext(ctx);
vm.runInContext(
  `${colorBlock}\n${geomBlock}\n` +
  'this.hexToRgba = hexToRgba; this.interpolateColor = interpolateColor;' +
  'this.getColorAtRatio = getColorAtRatio; this.getDistanceAtAngle = getDistanceAtAngle;' +
  'this.getPolygonDistanceAtAngle = getPolygonDistanceAtAngle;',
  ctx
);
const { interpolateColor, getColorAtRatio, getDistanceAtAngle } = ctx;
// vm returns objects from another realm; re-wrap so deepStrictEqual's prototype
// check passes (we only care about the structural content here).
const hexToRgba = (...args) => ({ ...ctx.hexToRgba(...args) });

test('hexToRgba parses full 6-digit hex', () => {
  assert.deepEqual(hexToRgba('#a855f7'), { r: 168, g: 85, b: 247, a: 1 });
});

test('hexToRgba expands 3-digit shorthand', () => {
  assert.deepEqual(hexToRgba('#fff'), { r: 255, g: 255, b: 255, a: 1 });
});

test('hexToRgba carries opacity and falls back on garbage', () => {
  assert.equal(hexToRgba('#000000', 0.5).a, 0.5);
  assert.deepEqual(hexToRgba('not-a-color'), { r: 168, g: 85, b: 247, a: 1 });
});

test('interpolateColor returns the midpoint blend', () => {
  const c1 = { r: 0, g: 0, b: 0, a: 1 };
  const c2 = { r: 10, g: 20, b: 30, a: 0 };
  assert.equal(interpolateColor(c1, c2, 0.5), 'rgba(5, 10, 15, 0.5)');
});

test('getColorAtRatio clamps to the boundary stops', () => {
  const stops = [
    { color: '#000000', opacity: 1, position: 0 },
    { color: '#ffffff', opacity: 1, position: 1 },
  ];
  assert.equal(getColorAtRatio(-1, stops), 'rgba(0, 0, 0, 1)');
  assert.equal(getColorAtRatio(2, stops), 'rgba(255, 255, 255, 1)');
});

test('getColorAtRatio interpolates between stops (not flat)', () => {
  const stops = [
    { color: '#a855f7', opacity: 1, position: 0 },
    { color: '#22c55e', opacity: 1, position: 1 },
  ];
  const mid = getColorAtRatio(0.5, stops);
  assert.notEqual(mid, getColorAtRatio(0, stops));
  assert.equal(mid, 'rgba(101, 141, 171, 1)');
});

test('getColorAtRatio on empty stops returns the default', () => {
  assert.equal(getColorAtRatio(0.5, []), 'rgba(168, 85, 247, 1)');
});

test('getDistanceAtAngle for a circle is constant = radius', () => {
  assert.equal(getDistanceAtAngle('circle', 0, 50), 50);
  assert.equal(getDistanceAtAngle('circle', 1.234, 50), 50);
});

test('getDistanceAtAngle for a polygon is >= inradius and <= circumradius', () => {
  const radius = 50;
  for (let a = 0; a < Math.PI * 2; a += 0.3) {
    const d = getDistanceAtAngle('hexagon', a, radius);
    assert.ok(d >= radius * Math.cos(Math.PI / 6) - 1e-6, `inradius at ${a}`);
    assert.ok(d <= radius + 1e-6, `circumradius at ${a}`);
  }
});
