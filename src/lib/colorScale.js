// OKLCH-based accessible colour scale generator.
// Produces 12 steps from very light (step 1) to very dark (step 12),
// preserving the hue of the input colour with chroma tapered near extremes
// so the lightest and darkest steps stay clean and legible.
//
// All maths is original — no Radix UI data is used or copied.

function hexToLinearRgb(hex) {
  const r = parseInt(hex.slice(1, 3), 16) / 255
  const g = parseInt(hex.slice(3, 5), 16) / 255
  const b = parseInt(hex.slice(5, 7), 16) / 255
  const toLinear = (c) =>
    c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
  return [toLinear(r), toLinear(g), toLinear(b)]
}

function linearRgbToXyz(r, g, b) {
  return [
    r * 0.4124564 + g * 0.3575761 + b * 0.1804375,
    r * 0.2126729 + g * 0.7151522 + b * 0.0721750,
    r * 0.0193339 + g * 0.1191920 + b * 0.9503041,
  ]
}

function xyzToOklab(x, y, z) {
  const l = Math.cbrt(0.8189330101 * x + 0.3618667424 * y - 0.1288597137 * z)
  const m = Math.cbrt(0.0329845436 * x + 0.9293118715 * y + 0.0361456387 * z)
  const s = Math.cbrt(0.0482003018 * x + 0.2643662691 * y + 0.6338517070 * z)
  return [
    0.2104542553 * l + 0.7936177850 * m - 0.0040720468 * s,
    1.9779984951 * l - 2.4285922050 * m + 0.4505937099 * s,
    0.0259040371 * l + 0.7827717662 * m - 0.8086757660 * s,
  ]
}

function oklabToLinearRgb(L, a, b) {
  const l = (L + 0.3963377774 * a + 0.2158037573 * b) ** 3
  const m = (L - 0.1055613458 * a - 0.0638541728 * b) ** 3
  const s = (L - 0.0894841775 * a - 1.2914855480 * b) ** 3
  return [
     4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
    -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
    -0.0041960863 * l - 0.7034186147 * m + 1.7076147010 * s,
  ]
}

function linearToSrgb(c) {
  const v = Math.max(0, Math.min(1, c))
  return v <= 0.0031308 ? v * 12.92 : 1.055 * Math.pow(v, 1 / 2.4) - 0.055
}

function linearRgbToHex(r, g, b) {
  const hex = (v) => Math.round(linearToSrgb(v) * 255).toString(16).padStart(2, '0')
  return '#' + hex(r) + hex(g) + hex(b)
}

function normalizeHexFull(hex) {
  let h = (hex || '').replace('#', '').trim()
  if (h.length === 3) h = h[0] + h[0] + h[1] + h[1] + h[2] + h[2]
  return '#' + h.slice(0, 6).padEnd(6, '0')
}

// Lightness ramp: step 1 is near-white, step 12 is near-black (OKLCH L, 0-1 scale).
const LIGHTNESS_RAMP = [0.97, 0.94, 0.90, 0.84, 0.76, 0.67, 0.58, 0.49, 0.40, 0.32, 0.23, 0.15]

// Chroma multipliers: full chroma in the mid-range, tapered near the extremes.
const CHROMA_RAMP = [0.20, 0.40, 0.62, 0.80, 0.92, 0.98, 0.98, 0.92, 0.88, 0.82, 0.70, 0.50]

/**
 * Generate a 12-step OKLCH colour scale from a single base hex.
 * Returns an array of 12 hex strings, index 0 = lightest, index 11 = darkest.
 */
export function generateScale(hex) {
  const full = normalizeHexFull(hex)
  const [lr, lg, lb] = hexToLinearRgb(full)
  const [x, y, z] = linearRgbToXyz(lr, lg, lb)
  const [, a, b] = xyzToOklab(x, y, z)
  const chroma = Math.sqrt(a * a + b * b)
  const hue = Math.atan2(b, a) // radians — kept as-is to avoid degree/radian round-trip error

  return LIGHTNESS_RAMP.map((L, i) => {
    const C = chroma * CHROMA_RAMP[i]
    const oA = C * Math.cos(hue)
    const oB = C * Math.sin(hue)
    const [r2, g2, b2] = oklabToLinearRgb(L, oA, oB)
    return linearRgbToHex(r2, g2, b2)
  })
}
