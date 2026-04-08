function rgbToHex(r, g, b) {
  return (
    '#' +
    [r, g, b]
      .map((v) => Math.round(v).toString(16).padStart(2, '0'))
      .join('')
  )
}

function hexToRgb(hex) {
  const h = hex.replace('#', '')
  return {
    r: parseInt(h.slice(0, 2), 16),
    g: parseInt(h.slice(2, 4), 16),
    b: parseInt(h.slice(4, 6), 16),
  }
}

function rgbDistance(a, b) {
  const dr = a.r - b.r
  const dg = a.g - b.g
  const db = a.b - b.b
  return Math.sqrt(dr * dr + dg * dg + db * db)
}

function luminance(r, g, b) {
  return (r * 299 + g * 587 + b * 114) / 1000
}

function saturation(r, g, b) {
  const max = Math.max(r, g, b) / 255
  const min = Math.min(r, g, b) / 255
  const l = (max + min) / 2
  if (max === min) return 0
  const d = max - min
  return l > 0.5 ? d / (2 - max - min) : d / (max + min)
}

function medianCut(pixels, depth) {
  if (depth === 0 || pixels.length === 0) {
    const avg = pixels.reduce(
      (acc, p) => ({ r: acc.r + p.r, g: acc.g + p.g, b: acc.b + p.b }),
      { r: 0, g: 0, b: 0 }
    )
    const n = pixels.length || 1
    return [{ r: avg.r / n, g: avg.g / n, b: avg.b / n }]
  }

  let rMin = 255, rMax = 0, gMin = 255, gMax = 0, bMin = 255, bMax = 0
  for (const p of pixels) {
    rMin = Math.min(rMin, p.r); rMax = Math.max(rMax, p.r)
    gMin = Math.min(gMin, p.g); gMax = Math.max(gMax, p.g)
    bMin = Math.min(bMin, p.b); bMax = Math.max(bMax, p.b)
  }

  const rRange = rMax - rMin
  const gRange = gMax - gMin
  const bRange = bMax - bMin

  let channel = 'r'
  if (gRange >= rRange && gRange >= bRange) channel = 'g'
  else if (bRange >= rRange && bRange >= gRange) channel = 'b'

  const sorted = [...pixels].sort((a, b) => a[channel] - b[channel])
  const mid = Math.floor(sorted.length / 2)

  return [
    ...medianCut(sorted.slice(0, mid), depth - 1),
    ...medianCut(sorted.slice(mid), depth - 1),
  ]
}

export function extractColorsFromImage(imageElement, targetCount = 10) {
  const canvas = document.createElement('canvas')
  const MAX_DIM = 200
  let w = imageElement.naturalWidth || imageElement.width
  let h = imageElement.naturalHeight || imageElement.height

  const scale = Math.min(1, MAX_DIM / Math.max(w, h))
  w = Math.round(w * scale)
  h = Math.round(h * scale)

  canvas.width = w
  canvas.height = h
  const ctx = canvas.getContext('2d')
  ctx.drawImage(imageElement, 0, 0, w, h)

  const imageData = ctx.getImageData(0, 0, w, h).data

  const sampleStep = Math.max(1, Math.floor((w * h) / 2000))
  const pixels = []

  for (let i = 0; i < w * h; i += sampleStep) {
    const idx = i * 4
    const r = imageData[idx]
    const g = imageData[idx + 1]
    const b = imageData[idx + 2]
    const a = imageData[idx + 3]
    if (a < 128) continue
    if (r === g && g === b && r > 245) continue
    pixels.push({ r, g, b })
  }

  if (pixels.length === 0) return []

  const depth = Math.ceil(Math.log2(targetCount))
  const buckets = medianCut(pixels, depth)

  const deduped = []
  for (const color of buckets) {
    const isDuplicate = deduped.some((c) => rgbDistance(c, color) < 30)
    if (!isDuplicate) {
      deduped.push(color)
    }
  }

  return deduped
    .slice(0, targetCount)
    .map((c) => rgbToHex(c.r, c.g, c.b))
}

export function mapColorsToRoles(hexColors) {
  if (!hexColors || hexColors.length === 0) return {}

  const colors = hexColors.map((hex) => {
    const { r, g, b } = hexToRgb(hex)
    return {
      hex,
      lum: luminance(r, g, b),
      sat: saturation(r, g, b),
    }
  })

  const sorted = [...colors].sort((a, b) => b.lum - a.lum)

  const background = sorted[0]
  const textColor = sorted[sorted.length - 1]

  let surface = sorted[1] || background
  if (Math.abs(surface.lum - background.lum) < 5 && sorted.length > 2) {
    surface = sorted[2]
  }

  const midColors = colors.filter(
    (c) => c !== background && c !== textColor && c !== surface
  )
  midColors.sort((a, b) => b.sat - a.sat)

  const primary = midColors[0] || colors[Math.floor(colors.length / 2)]
  const secondary = midColors[1] || primary

  return {
    background: background.hex,
    surface: surface.hex,
    primary: primary.hex,
    secondary: secondary.hex,
    text: textColor.hex,
  }
}
