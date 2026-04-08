export const FONT_PAIRS = [
  // Minimal
  {
    id: 'inter-inter',
    heading: 'Inter',
    body: 'Inter',
    personality: 'Minimal',
    description: 'Clean and utilitarian',
  },
  {
    id: 'inter-dm-sans',
    heading: 'Inter',
    body: 'DM Sans',
    personality: 'Minimal',
    description: 'Sharp meets smooth',
  },
  {
    id: 'plus-jakarta-inter',
    heading: 'Plus Jakarta Sans',
    body: 'Inter',
    personality: 'Minimal',
    description: 'Friendly meets neutral',
  },
  {
    id: 'dm-sans-dm-sans',
    heading: 'DM Sans',
    body: 'DM Sans',
    personality: 'Minimal',
    description: 'Smooth and consistent',
  },
  {
    id: 'outfit-outfit',
    heading: 'Outfit',
    body: 'Outfit',
    personality: 'Minimal',
    description: 'Geometric and balanced',
  },
  {
    id: 'manrope-inter',
    heading: 'Manrope',
    body: 'Inter',
    personality: 'Minimal',
    description: 'Contemporary and crisp',
  },

  // Warm
  {
    id: 'nunito-lato',
    heading: 'Nunito',
    body: 'Lato',
    personality: 'Warm',
    description: 'Rounded and friendly',
  },
  {
    id: 'quicksand-open-sans',
    heading: 'Quicksand',
    body: 'Open Sans',
    personality: 'Warm',
    description: 'Soft meets readable',
  },
  {
    id: 'poppins-nunito',
    heading: 'Poppins',
    body: 'Nunito',
    personality: 'Warm',
    description: 'Cheerful and approachable',
  },
  {
    id: 'nunito-nunito-sans',
    heading: 'Nunito',
    body: 'Nunito Sans',
    personality: 'Warm',
    description: 'Cohesive soft pairing',
  },
  {
    id: 'raleway-lato',
    heading: 'Raleway',
    body: 'Lato',
    personality: 'Warm',
    description: 'Graceful and welcoming',
  },
  {
    id: 'poppins-open-sans',
    heading: 'Poppins',
    body: 'Open Sans',
    personality: 'Warm',
    description: 'Bold meets open readability',
  },

  // Elegant
  {
    id: 'playfair-lora',
    heading: 'Playfair Display',
    body: 'Lora',
    personality: 'Elegant',
    description: 'Classic editorial contrast',
  },
  {
    id: 'dm-serif-dm-sans',
    heading: 'DM Serif Display',
    body: 'DM Sans',
    personality: 'Elegant',
    description: 'Serif drama meets simplicity',
  },
  {
    id: 'cormorant-karla',
    heading: 'Cormorant Garamond',
    body: 'Karla',
    personality: 'Elegant',
    description: 'Refined luxury pairing',
  },
  {
    id: 'merriweather-source-sans',
    heading: 'Merriweather',
    body: 'Source Sans Pro',
    personality: 'Elegant',
    description: 'Trustworthy and editorial',
  },
  {
    id: 'playfair-nunito',
    heading: 'Playfair Display',
    body: 'Nunito',
    personality: 'Elegant',
    description: 'Dramatic warmth',
  },
  {
    id: 'libre-baskerville-source-sans',
    heading: 'Libre Baskerville',
    body: 'Source Sans Pro',
    personality: 'Elegant',
    description: 'Scholarly and refined',
  },

  // Technical
  {
    id: 'jetbrains-inter',
    heading: 'JetBrains Mono',
    body: 'Inter',
    personality: 'Technical',
    description: 'Developer-first precision',
  },
  {
    id: 'ibm-plex-mono-ibm-plex-sans',
    heading: 'IBM Plex Mono',
    body: 'IBM Plex Sans',
    personality: 'Technical',
    description: 'Corporate code aesthetic',
  },
  {
    id: 'space-mono-space-grotesk',
    heading: 'Space Mono',
    body: 'Space Grotesk',
    personality: 'Technical',
    description: 'Sci-fi minimal contrast',
  },
  {
    id: 'roboto-mono-roboto',
    heading: 'Roboto Mono',
    body: 'Roboto',
    personality: 'Technical',
    description: 'System-native engineering',
  },
  {
    id: 'fira-code-fira-sans',
    heading: 'Fira Code',
    body: 'Fira Sans',
    personality: 'Technical',
    description: 'Ligature-forward coding',
  },
  {
    id: 'source-code-source-sans',
    heading: 'Source Code Pro',
    body: 'Source Sans Pro',
    personality: 'Technical',
    description: 'Adobe open source stack',
  },

  // Playful
  {
    id: 'syne-dm-sans',
    heading: 'Syne',
    body: 'DM Sans',
    personality: 'Playful',
    description: 'Eccentric and modern',
  },
  {
    id: 'caveat-nunito',
    heading: 'Caveat',
    body: 'Nunito',
    personality: 'Playful',
    description: 'Handwritten meets soft',
  },
  {
    id: 'righteous-open-sans',
    heading: 'Righteous',
    body: 'Open Sans',
    personality: 'Playful',
    description: 'Retro funky energy',
  },
  {
    id: 'pacifico-lato',
    heading: 'Pacifico',
    body: 'Lato',
    personality: 'Playful',
    description: 'Bubbly and expressive',
  },
  {
    id: 'fredoka-poppins',
    heading: 'Fredoka One',
    body: 'Poppins',
    personality: 'Playful',
    description: 'Bold fun contrast',
  },
  {
    id: 'satisfy-open-sans',
    heading: 'Satisfy',
    body: 'Open Sans',
    personality: 'Playful',
    description: 'Script meets clarity',
  },
]

export const FONT_PAIR_GROUPS = ['Minimal', 'Warm', 'Elegant', 'Technical', 'Playful']

export function getDefaultPair() {
  return FONT_PAIRS.find((p) => p.id === 'inter-inter') || FONT_PAIRS[0]
}

export function findPairByFonts(headingFont, bodyFont) {
  return FONT_PAIRS.find(
    (p) => p.heading === headingFont && p.body === bodyFont
  ) || null
}
