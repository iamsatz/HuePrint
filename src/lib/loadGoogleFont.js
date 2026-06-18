const loadedFonts = new Set()

export function loadFont(fontName) {
  if (!fontName || loadedFonts.has(fontName)) return
  loadedFonts.add(fontName)
  const encoded = fontName.replace(/ /g, '+')
  const href = `https://fonts.googleapis.com/css2?family=${encoded}:wght@400;500;600;700;800&display=swap`
  const existing = document.querySelector(`link[href="${href}"]`)
  if (existing) return
  const link = document.createElement('link')
  link.rel = 'stylesheet'
  link.href = href
  document.head.appendChild(link)
}

export function loadFontPair(headingFont, bodyFont) {
  if (headingFont) loadFont(headingFont)
  if (bodyFont && bodyFont !== headingFont) loadFont(bodyFont)
}

export function loadFontRecord(font) {
  if (!font?.family) return
  if (!font.cssEmbedUrl) {
    loadFont(font.family)
    return
  }
  const key = `${font.family}:${font.cssEmbedUrl}`
  if (loadedFonts.has(key)) return
  loadedFonts.add(key)
  const existing = document.querySelector(`link[href="${font.cssEmbedUrl}"]`)
  if (existing) return
  const link = document.createElement('link')
  link.rel = 'stylesheet'
  link.href = font.cssEmbedUrl
  document.head.appendChild(link)
}

// Fontshare slug: lowercase, non-alphanumerics collapsed to single hyphens.
export function fontshareSlug(family) {
  return String(family || '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function fontshareCssUrl(family) {
  return `https://api.fontshare.com/v2/css?f[]=${fontshareSlug(family)}@400,500,700&display=swap`
}

/**
 * Load a font-library record { family, provider, cssEmbedUrl? } on demand.
 * Google → Google Fonts CSS2; Fontshare → derived api.fontshare.com URL.
 * A bad URL simply 404s the stylesheet (browser falls back) — graceful.
 */
export function loadLibraryFont(font) {
  if (!font?.family) return
  if (font.cssEmbedUrl) {
    loadFontRecord(font)
    return
  }
  if (font.provider === 'fontshare' || font.provider === 'curated') {
    loadFontRecord({ family: font.family, cssEmbedUrl: fontshareCssUrl(font.family) })
    return
  }
  loadFont(font.family)
}
