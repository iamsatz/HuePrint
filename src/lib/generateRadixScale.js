import chroma from 'chroma-js';

const STEP_LABELS = [
  'App Background',
  'Subtle Background',
  'UI Element Background',
  'Hovered UI Element Background',
  'Active / Selected Background',
  'Subtle Borders & Separators',
  'UI Element Border & Focus Rings',
  'Hovered UI Element Border',
  'Solid Backgrounds',
  'Hovered Solid Backgrounds',
  'Low-Contrast Text',
  'High-Contrast Text',
];

function clampLightness(color, min, max) {
  const l = chroma(color).get('hsl.l');
  return chroma(color).set('hsl.l', Math.min(max, Math.max(min, l)));
}

export function generateRadixScale(hex, mode = 'light') {
  try {
    const base = chroma(hex);
    const h = base.get('hsl.h') || 0;
    const s = Math.min(base.get('hsl.s'), 0.85);

    let steps;

    if (mode === 'light') {
      steps = [
        chroma.hsl(h, Math.min(s * 0.15, 0.12), 0.988),
        chroma.hsl(h, Math.min(s * 0.25, 0.18), 0.972),
        chroma.hsl(h, Math.min(s * 0.35, 0.25), 0.946),
        chroma.hsl(h, Math.min(s * 0.45, 0.35), 0.915),
        chroma.hsl(h, Math.min(s * 0.55, 0.45), 0.882),
        chroma.hsl(h, Math.min(s * 0.6, 0.5), 0.840),
        chroma.hsl(h, Math.min(s * 0.7, 0.6), 0.770),
        chroma.hsl(h, Math.min(s * 0.8, 0.7), 0.670),
        base,
        base.darken(0.4),
        base.darken(1.2),
        base.darken(2.2),
      ];
    } else {
      steps = [
        chroma.hsl(h, Math.min(s * 0.2, 0.15), 0.065),
        chroma.hsl(h, Math.min(s * 0.25, 0.2), 0.098),
        chroma.hsl(h, Math.min(s * 0.35, 0.3), 0.138),
        chroma.hsl(h, Math.min(s * 0.45, 0.38), 0.175),
        chroma.hsl(h, Math.min(s * 0.55, 0.45), 0.218),
        chroma.hsl(h, Math.min(s * 0.6, 0.5), 0.268),
        chroma.hsl(h, Math.min(s * 0.65, 0.55), 0.335),
        chroma.hsl(h, Math.min(s * 0.75, 0.65), 0.415),
        base.brighten(0.3),
        base.brighten(0.6),
        base.brighten(1.5),
        chroma.hsl(h, Math.min(s * 0.15, 0.12), 0.96),
      ];
    }

    return steps.map((c, i) => ({
      step: i + 1,
      hex: c.hex(),
      label: STEP_LABELS[i],
      isLight: chroma(c.hex()).luminance() > 0.35,
    }));
  } catch {
    return Array.from({ length: 12 }, (_, i) => ({
      step: i + 1,
      hex: hex,
      label: STEP_LABELS[i],
      isLight: false,
    }));
  }
}

export { STEP_LABELS };
