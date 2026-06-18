export const WEBSITE_REFERENCE_CATEGORIES = [
  'All',
  'SaaS',
  'Fintech',
  'Productivity',
  'Ecommerce',
  'Healthcare',
  'Retail',
  'Design Tools',
  'Developer',
  'Portfolio',
  'Non-profit',
  'Travel',
  'Education',
]

function screenshotFor(url) {
  return `https://s.wordpress.com/mshots/v1/${encodeURIComponent(url)}?w=900`
}

// --- Font classification lookup ------------------------------------------

const FONT_CLASSIFICATIONS = {
  // Geometric sans
  Inter: 'geometric-sans', 'DM Sans': 'geometric-sans', Geist: 'geometric-sans',
  Satoshi: 'geometric-sans', Outfit: 'geometric-sans', 'Plus Jakarta Sans': 'geometric-sans',
  Sora: 'geometric-sans', Figtree: 'geometric-sans', Nunito: 'geometric-sans',
  'General Sans': 'geometric-sans', Graphik: 'geometric-sans', Switzer: 'geometric-sans',
  'Cabinet Grotesk': 'geometric-sans', 'Clash Grotesk': 'geometric-sans',
  'Space Grotesk': 'geometric-sans', Lexend: 'geometric-sans', 'Nunito Sans': 'geometric-sans',
  Manrope: 'geometric-sans', 'Be Vietnam Pro': 'geometric-sans', Jost: 'geometric-sans',
  Urbanist: 'geometric-sans', Poppins: 'geometric-sans', Montserrat: 'geometric-sans',
  'Bricolage Grotesque': 'geometric-sans', 'Hanken Grotesk': 'geometric-sans',
  // Humanist sans
  Roboto: 'humanist-sans', 'Open Sans': 'humanist-sans', 'Source Sans 3': 'humanist-sans',
  'Fira Sans': 'humanist-sans', 'IBM Plex Sans': 'humanist-sans', Karla: 'humanist-sans',
  Mulish: 'humanist-sans', 'Work Sans': 'humanist-sans', Lato: 'humanist-sans',
  Barlow: 'humanist-sans', Cabin: 'humanist-sans', Rubik: 'humanist-sans',
  // Neutral system sans
  'SF Pro': 'neutral-sans', Helvetica: 'neutral-sans', Arial: 'neutral-sans',
  'Noto Sans': 'neutral-sans', 'PT Sans': 'neutral-sans',
  // Transitional serif
  'Libre Baskerville': 'transitional-serif', Lora: 'transitional-serif',
  Merriweather: 'transitional-serif', 'PT Serif': 'transitional-serif',
  'Crimson Text': 'transitional-serif', 'Source Serif 4': 'transitional-serif',
  'EB Garamond': 'transitional-serif', Cormorant: 'transitional-serif',
  Bitter: 'transitional-serif', Georgia: 'transitional-serif',
  // Display serif
  'Playfair Display': 'display-serif', 'DM Serif Display': 'display-serif',
  'Bodoni Moda': 'display-serif', Fraunces: 'display-serif',
  'Instrument Serif': 'display-serif', 'Young Serif': 'display-serif',
  // Monospace
  'JetBrains Mono': 'monospace', 'Source Code Pro': 'monospace', 'Fira Code': 'monospace',
  'Roboto Mono': 'monospace', 'IBM Plex Mono': 'monospace', 'Space Mono': 'monospace',
  'DM Mono': 'monospace', 'Geist Mono': 'monospace',
}

function classifyFont(family) {
  if (!family) return null
  return FONT_CLASSIFICATIONS[family] || null
}

// --- Reference dataset ---------------------------------------------------

export const WEBSITE_REFERENCES = [
  {
    id: 'linear',
    name: 'Linear',
    url: 'https://linear.app/',
    category: 'SaaS',
    screenshot: screenshotFor('https://linear.app/'),
    palette: ['#5e6ad2', '#08090a', '#f7f8f8', '#d0d6ff'],
    fonts: { heading: 'Inter', body: 'Inter', classification: 'geometric-sans' },
    typographyNotes: 'Tight modern product typography with restrained UI density.',
    styleTags: ['dark UI', 'product', 'high contrast', 'minimal accent'],
    matchNotes: ['dark surface system', 'restrained accent color', 'dense product feel'],
  },
  {
    id: 'stripe',
    name: 'Stripe',
    url: 'https://stripe.com/',
    category: 'Fintech',
    screenshot: screenshotFor('https://stripe.com/'),
    palette: ['#635bff', '#0a2540', '#f6f9fc', '#00d4ff'],
    fonts: { heading: 'Inter', body: 'Inter', classification: 'geometric-sans' },
    typographyNotes: 'Clear technical hierarchy with bright but disciplined color.',
    styleTags: ['fintech', 'technical', 'trust', 'gradient accents'],
    matchNotes: ['blue-violet primary', 'technical trust cues', 'clean documentation tone'],
  },
  {
    id: 'notion',
    name: 'Notion',
    url: 'https://www.notion.so/',
    category: 'Productivity',
    screenshot: screenshotFor('https://www.notion.so/'),
    palette: ['#000000', '#ffffff', '#f7f6f3', '#e03e3e'],
    fonts: { heading: 'Inter', body: 'Inter', classification: 'geometric-sans' },
    typographyNotes: 'Editorial utility with simple contrast and sparse accent use.',
    styleTags: ['neutral', 'workspace', 'editorial', 'low color'],
    matchNotes: ['neutral-first palette', 'small accent moments', 'content-heavy layouts'],
  },
  {
    id: 'shopify',
    name: 'Shopify',
    url: 'https://www.shopify.com/',
    category: 'Ecommerce',
    screenshot: screenshotFor('https://www.shopify.com/'),
    palette: ['#008060', '#004c3f', '#f3fcf4', '#111111'],
    fonts: { heading: 'Inter', body: 'Inter', classification: 'geometric-sans' },
    typographyNotes: 'Commercial clarity with a grounded green brand system.',
    styleTags: ['commerce', 'green', 'merchant', 'trust'],
    matchNotes: ['commerce-friendly green', 'trustworthy dark text', 'balanced brand usage'],
  },
  {
    id: 'calm',
    name: 'Calm',
    url: 'https://www.calm.com/',
    category: 'Healthcare',
    screenshot: screenshotFor('https://www.calm.com/'),
    palette: ['#173a5e', '#88d4f2', '#f7f4ef', '#ffffff'],
    fonts: { heading: 'Nunito', body: 'Nunito', classification: 'geometric-sans' },
    typographyNotes: 'Soft wellness language with low-stress contrast.',
    styleTags: ['wellness', 'blue', 'soft', 'calm'],
    matchNotes: ['soft blues', 'low visual noise', 'wellness-oriented tone'],
  },
  {
    id: 'apple',
    name: 'Apple',
    url: 'https://www.apple.com/',
    category: 'Retail',
    screenshot: screenshotFor('https://www.apple.com/'),
    palette: ['#000000', '#f5f5f7', '#ffffff', '#0071e3'],
    fonts: { heading: 'SF Pro', body: 'SF Pro', classification: 'neutral-sans' },
    typographyNotes: 'System typography, generous spacing, and minimal blue actions.',
    styleTags: ['premium', 'minimal', 'retail', 'product'],
    matchNotes: ['premium neutral base', 'selective action blue', 'product-focused restraint'],
  },
  {
    id: 'figma',
    name: 'Figma',
    url: 'https://www.figma.com/',
    category: 'Design Tools',
    screenshot: screenshotFor('https://www.figma.com/'),
    palette: ['#a259ff', '#0acf83', '#1abcfe', '#ffffff'],
    fonts: { heading: 'Inter', body: 'Inter', classification: 'geometric-sans' },
    typographyNotes: 'Creative product system with expressive secondary colors.',
    styleTags: ['creative', 'design tools', 'multi-color', 'collaboration'],
    matchNotes: ['colorful creative accents', 'tool-focused UI', 'collaboration energy'],
  },
  {
    id: 'vercel',
    name: 'Vercel',
    url: 'https://vercel.com/',
    category: 'Developer',
    screenshot: screenshotFor('https://vercel.com/'),
    palette: ['#000000', '#ffffff', '#666666', '#fafafa'],
    fonts: { heading: 'Geist', body: 'Geist', classification: 'geometric-sans' },
    typographyNotes: 'Developer-focused minimalism with strong contrast and sparse color.',
    styleTags: ['developer', 'minimal', 'monochrome', 'technical'],
    matchNotes: ['black-and-white foundation', 'developer credibility', 'high contrast'],
  },
  {
    id: 'superhuman',
    name: 'Superhuman',
    url: 'https://superhuman.com/',
    category: 'SaaS',
    screenshot: screenshotFor('https://superhuman.com/'),
    palette: ['#725cff', '#0b1020', '#f9fafb', '#9ee7ff'],
    fonts: { heading: 'Graphik', body: 'Graphik', classification: 'geometric-sans' },
    typographyNotes: 'Premium productivity styling with violet action moments.',
    styleTags: ['premium SaaS', 'productivity', 'violet', 'sharp'],
    matchNotes: ['violet action color', 'premium product tone', 'dark contrast moments'],
  },
  {
    id: 'framer',
    name: 'Framer',
    url: 'https://www.framer.com/',
    category: 'Design Tools',
    screenshot: screenshotFor('https://www.framer.com/'),
    palette: ['#0055ff', '#1a1a1a', '#f5f5f5', '#ffffff'],
    fonts: { heading: 'Inter', body: 'Inter', classification: 'geometric-sans' },
    typographyNotes: 'Bold creative tool with strong blue branding on near-black.',
    styleTags: ['dark', 'design tools', 'blue', 'bold'],
    matchNotes: ['saturated blue on dark', 'creative tool energy', 'sharp type contrast'],
  },
  {
    id: 'loom',
    name: 'Loom',
    url: 'https://www.loom.com/',
    category: 'Productivity',
    screenshot: screenshotFor('https://www.loom.com/'),
    palette: ['#625df5', '#1a1a2e', '#f9f8ff', '#ffffff'],
    fonts: { heading: 'Inter', body: 'Inter', classification: 'geometric-sans' },
    typographyNotes: 'Product-first purple with warm dark base.',
    styleTags: ['productivity', 'violet', 'dark', 'product'],
    matchNotes: ['indigo-violet primary', 'warm dark backgrounds', 'product workspace energy'],
  },
  {
    id: 'resend',
    name: 'Resend',
    url: 'https://resend.com/',
    category: 'Developer',
    screenshot: screenshotFor('https://resend.com/'),
    palette: ['#000000', '#1a1a1a', '#fafafa', '#ffffff'],
    fonts: { heading: 'Geist', body: 'Geist', classification: 'geometric-sans' },
    typographyNotes: 'Minimal developer branding with pure monochrome palette.',
    styleTags: ['developer', 'dark', 'minimal', 'monochrome'],
    matchNotes: ['pure dark mode', 'developer-first tone', 'Geist typography'],
  },
  {
    id: 'mercury',
    name: 'Mercury Bank',
    url: 'https://mercury.com/',
    category: 'Fintech',
    screenshot: screenshotFor('https://mercury.com/'),
    palette: ['#1a1a2e', '#f5f0e8', '#c5b99a', '#2d2d5e'],
    fonts: { heading: 'Sora', body: 'Sora', classification: 'geometric-sans' },
    typographyNotes: 'Warm editorial fintech with muted ochre and deep navy.',
    styleTags: ['fintech', 'editorial', 'warm neutrals', 'premium'],
    matchNotes: ['warm editorial palette', 'trust with restraint', 'ochre neutrals'],
  },
  {
    id: 'tailwindui',
    name: 'Tailwind UI',
    url: 'https://tailwindui.com/',
    category: 'Developer',
    screenshot: screenshotFor('https://tailwindui.com/'),
    palette: ['#6366f1', '#ffffff', '#f8fafc', '#1e293b'],
    fonts: { heading: 'Inter', body: 'Inter', classification: 'geometric-sans' },
    typographyNotes: 'Clean component library with indigo brand and slate backgrounds.',
    styleTags: ['developer', 'indigo', 'component library', 'light'],
    matchNotes: ['indigo brand color', 'clean light backgrounds', 'developer-component style'],
  },
  {
    id: 'webflow',
    name: 'Webflow',
    url: 'https://webflow.com/',
    category: 'SaaS',
    screenshot: screenshotFor('https://webflow.com/'),
    palette: ['#146ef5', '#1a1a1a', '#f0f4ff', '#ffffff'],
    fonts: { heading: 'Inter', body: 'Inter', classification: 'geometric-sans' },
    typographyNotes: 'Bold sky-blue brand with dark accents and white canvas.',
    styleTags: ['SaaS', 'blue', 'website builder', 'bold'],
    matchNotes: ['vibrant blue brand', 'dark-on-light contrast', 'bold web presence'],
  },
  {
    id: 'miro',
    name: 'Miro',
    url: 'https://miro.com/',
    category: 'Productivity',
    screenshot: screenshotFor('https://miro.com/'),
    palette: ['#ffdd33', '#050038', '#ffffff', '#4262ff'],
    fonts: { heading: 'Inter', body: 'Inter', classification: 'geometric-sans' },
    typographyNotes: 'High-energy collaboration tool with bold yellow-on-navy branding.',
    styleTags: ['collaboration', 'yellow', 'dark', 'energetic'],
    matchNotes: ['yellow-on-dark brand energy', 'collaboration tool tone', 'high visual contrast'],
  },
  {
    id: 'read-cv',
    name: 'Read.cv',
    url: 'https://read.cv/',
    category: 'Portfolio',
    screenshot: screenshotFor('https://read.cv/'),
    palette: ['#f5f0e8', '#1a1a1a', '#d4c9b8', '#8b7355'],
    fonts: { heading: 'Instrument Serif', body: 'Inter', classification: 'display-serif' },
    typographyNotes: 'Editorial portfolio with warm cream tones and serif character.',
    styleTags: ['portfolio', 'editorial', 'warm', 'serif'],
    matchNotes: ['cream editorial background', 'warm neutral palette', 'serif character display'],
  },
  {
    id: 'ghost',
    name: 'Ghost',
    url: 'https://ghost.org/',
    category: 'SaaS',
    screenshot: screenshotFor('https://ghost.org/'),
    palette: ['#15171a', '#ffffff', '#f9fafb', '#34d399'],
    fonts: { heading: 'Inter', body: 'Inter', classification: 'geometric-sans' },
    typographyNotes: 'Publishing platform with clean dark base and emerald green accent.',
    styleTags: ['publishing', 'dark', 'green accent', 'content'],
    matchNotes: ['dark editorial base', 'emerald green CTA', 'content-forward layout'],
  },
  {
    id: 'todoist',
    name: 'Todoist',
    url: 'https://todoist.com/',
    category: 'Productivity',
    screenshot: screenshotFor('https://todoist.com/'),
    palette: ['#db4035', '#202020', '#fafafa', '#ffffff'],
    fonts: { heading: 'Nunito Sans', body: 'Nunito Sans', classification: 'geometric-sans' },
    typographyNotes: 'Warm red brand on neutral dark with clean humanist type.',
    styleTags: ['productivity', 'red', 'warm', 'focused'],
    matchNotes: ['warm red primary', 'neutral-dark base', 'action-focused product'],
  },
]

export function getWebsiteReferencesByCategory(category = 'All') {
  if (category === 'All') return WEBSITE_REFERENCES
  return WEBSITE_REFERENCES.filter((reference) => reference.category === category)
}

// --- Perceptual colour distance (OKLab ΔE) -------------------------------

function normalizeHex(hex) {
  if (typeof hex !== 'string') return null
  const raw = hex.trim().replace('#', '')
  if (/^[0-9a-fA-F]{3}$/.test(raw)) {
    return raw.split('').map((char) => char + char).join('').toLowerCase()
  }
  if (/^[0-9a-fA-F]{6}$/.test(raw)) return raw.toLowerCase()
  return null
}

function hexToOklab(hex) {
  const h = normalizeHex(hex)
  if (!h) return null
  const r = parseInt(h.slice(0, 2), 16) / 255
  const g = parseInt(h.slice(2, 4), 16) / 255
  const b = parseInt(h.slice(4, 6), 16) / 255
  const toL = (c) => c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4
  const lr = toL(r), lg = toL(g), lb = toL(b)
  const x = lr * 0.4124564 + lg * 0.3575761 + lb * 0.1804375
  const y = lr * 0.2126729 + lg * 0.7151522 + lb * 0.0721750
  const z = lr * 0.0193339 + lg * 0.1191920 + lb * 0.9503041
  const l = Math.cbrt(0.8189330101 * x + 0.3618667424 * y - 0.1288597137 * z)
  const m = Math.cbrt(0.0329845436 * x + 0.9293118715 * y + 0.0361456387 * z)
  const s = Math.cbrt(0.0482003018 * x + 0.2643662691 * y + 0.6338517070 * z)
  return [
    0.2104542553 * l + 0.7936177850 * m - 0.0040720468 * s,
    1.9779984951 * l - 2.4285922050 * m + 0.4505937099 * s,
    0.0259040371 * l + 0.7827717662 * m - 0.8086757660 * s,
  ]
}

function oklabDelta(hexA, hexB) {
  const a = hexToOklab(hexA)
  const b = hexToOklab(hexB)
  if (!a || !b) return Infinity
  return Math.sqrt((a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2 + (a[2] - b[2]) ** 2)
}

function nearestOklabDelta(color, palette) {
  if (!color) return Infinity
  return Math.min(...palette.map((p) => oklabDelta(color, p)))
}

function deltaScore(delta, threshold = 0.5) {
  if (!isFinite(delta)) return 0
  return Math.max(0, 1 - delta / threshold)
}

// Perceptual brightness (0 = black, 1 = white) from OKLab L component.
function oklabLightness(hex) {
  const lab = hexToOklab(hex)
  return lab ? lab[0] : 0.5
}

function brightnessMood(hex) {
  const L = oklabLightness(hex)
  if (L < 0.35) return 'dark'
  if (L > 0.80) return 'light'
  return 'balanced'
}

// --- Color reason phrasing -----------------------------------------------

function colorReason(delta, roleLabel) {
  if (!isFinite(delta)) return null
  if (delta < 0.04) return `Near-identical ${roleLabel}`
  if (delta < 0.12) return `Very similar ${roleLabel}`
  if (delta < 0.22) return `Similar ${roleLabel} direction`
  if (delta < 0.35) return `Compatible ${roleLabel}`
  return null
}

// --- Typography signal ---------------------------------------------------

function extractColorSignal(input = {}) {
  const lightPalette = input.palette?.light || input.light || {}
  return {
    primary: input.primary || lightPalette.primary || input.palette?.primary,
    secondary: input.secondary || lightPalette.secondary || input.palette?.secondary,
    background: input.background || lightPalette.background || input.palette?.background,
    surface: input.surface || lightPalette.surface || input.palette?.surface,
    category: input.category || input.industry || 'All',
    headingFont: input.typography?.headingFont || input.headingFont,
    bodyFont: input.typography?.bodyFont || input.bodyFont,
  }
}

function categoryMatches(referenceCategory, category) {
  if (!category || category === 'All' || category === 'Custom') return false
  return referenceCategory.toLowerCase() === category.toLowerCase()
}

// --- Main matcher --------------------------------------------------------

export function matchWebsiteReferences(input = {}, category = 'All', limit = 5) {
  const signal = extractColorSignal(input)
  const targetCategory = category === 'All' ? signal.category : category
  const inputBg = signal.background || signal.surface || '#ffffff'
  const sourceMood = brightnessMood(inputBg)
  const userHeadingClass = classifyFont(signal.headingFont)
  const userBodyClass = classifyFont(signal.bodyFont)

  const scored = WEBSITE_REFERENCES.map((ref) => {
    // Background/surface match (40 pts) — mood + exact colour closeness
    const bgDelta = nearestOklabDelta(inputBg, ref.palette)
    const bgScore = deltaScore(bgDelta, 0.45) * 40
    const refBgHex = ref.palette[2] || ref.palette[1] || ref.palette[0]
    const refMood = brightnessMood(refBgHex)
    const moodBonus = sourceMood === refMood ? 8 : 0

    // Primary match (35 pts)
    const primaryDelta = nearestOklabDelta(signal.primary, ref.palette)
    const primaryScore = deltaScore(primaryDelta, 0.45) * 35

    // Secondary match (10 pts)
    const secondaryDelta = nearestOklabDelta(signal.secondary, ref.palette)
    const secondaryScore = deltaScore(secondaryDelta, 0.45) * 10

    // Typography match (15 pts)
    const refClass = ref.fonts?.classification
    const exactHeadingMatch = signal.headingFont && ref.fonts?.heading === signal.headingFont
    const exactBodyMatch = signal.bodyFont && ref.fonts?.body === signal.bodyFont
    const classMatch =
      (userHeadingClass && refClass === userHeadingClass) ||
      (userBodyClass && refClass === userBodyClass)
    const typScore = exactHeadingMatch || exactBodyMatch ? 15 : classMatch ? 8 : 0

    // Category boost (10 pts)
    const catScore = categoryMatches(ref.category, targetCategory) ? 10 : 0

    const score = Math.round(bgScore + moodBonus + primaryScore + secondaryScore + typScore + catScore)

    // Build human-readable reasons
    const reasons = []

    const bgReason = colorReason(bgDelta, `${sourceMood} background`)
    if (bgReason) reasons.push(bgReason)
    else if (sourceMood === refMood) reasons.push(`Matching ${sourceMood} contrast mood`)

    const primaryReason = colorReason(primaryDelta, 'primary color')
    if (primaryReason) reasons.push(primaryReason)

    if (exactHeadingMatch) reasons.push(`Same heading font: ${signal.headingFont}`)
    else if (classMatch && refClass) reasons.push(`Also uses ${refClass.replace('-', ' ')} type`)

    if (categoryMatches(ref.category, targetCategory)) reasons.push(`${ref.category} category`)
    if (reasons.length < 2 && ref.matchNotes[0]) reasons.push(ref.matchNotes[0])

    return {
      ...ref,
      score: Math.min(100, score),
      reasons: reasons.slice(0, 3),
      matchDetails: { bgDelta, primaryDelta, refMood, typScore },
    }
  })

  // Sort: higher score first; ties broken alphabetically
  scored.sort((a, b) => b.score - a.score || a.name.localeCompare(b.name))

  // Never empty — always return up to limit results
  return scored.slice(0, limit)
}
