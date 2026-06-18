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

// Light mode: step 1 near-white → step 12 near-black
const LIGHT_L = [0.97, 0.94, 0.90, 0.84, 0.76, 0.67, 0.58, 0.49, 0.40, 0.32, 0.23, 0.15]
// Dark mode: step 1 near-black → step 12 near-white (for dark surfaces + readable text)
const DARK_L  = [0.09, 0.12, 0.16, 0.20, 0.25, 0.31, 0.39, 0.49, 0.60, 0.70, 0.82, 0.93]

// Accent chroma multipliers: full chroma mid-range, tapered at extremes
const ACCENT_C = [0.20, 0.40, 0.62, 0.80, 0.92, 0.98, 0.98, 0.92, 0.88, 0.82, 0.70, 0.50]
// Gray chroma multipliers: very low chroma (slight hue tint only)
const GRAY_C   = [0.06, 0.06, 0.07, 0.07, 0.07, 0.08, 0.08, 0.08, 0.07, 0.07, 0.06, 0.05]

function buildScale(hex, lightnessRamp, chromaRamp) {
  const full = normalizeHexFull(hex)
  const [lr, lg, lb] = hexToLinearRgb(full)
  const [x, y, z] = linearRgbToXyz(lr, lg, lb)
  const [, a, b] = xyzToOklab(x, y, z)
  const chroma = Math.sqrt(a * a + b * b)
  const hue = Math.atan2(b, a)
  return lightnessRamp.map((L, i) => {
    const C = chroma * chromaRamp[i]
    const [r2, g2, b2] = oklabToLinearRgb(L, C * Math.cos(hue), C * Math.sin(hue))
    return linearRgbToHex(r2, g2, b2)
  })
}

/** Light accent — 12 steps, lightest→darkest, full chroma. */
export function generateScale(hex) { return buildScale(hex, LIGHT_L, ACCENT_C) }

/** Light gray — 12 steps, lightest→darkest, hue-tinted neutral. */
export function generateGrayScale(hex) { return buildScale(hex, LIGHT_L, GRAY_C) }

/** Dark accent — 12 steps for dark-mode surfaces, darkest→lightest. */
export function generateDarkScale(hex) { return buildScale(hex, DARK_L, ACCENT_C) }

/** Dark gray — 12 steps, dark-mode neutral with subtle hue tint. */
export function generateDarkGrayScale(hex) { return buildScale(hex, DARK_L, GRAY_C) }
