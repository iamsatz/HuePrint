/**
 * Export generators for AI tools.
 * Each function takes a Kit object (from kit JSON) and returns a formatted string.
 */

function toCssVarName(key) {
  return key.replace(/([A-Z])/g, '-$1').toLowerCase()
}

function paletteEntries(kit, mode = 'light') {
  const palette = kit.palette?.[mode] || {}
  return Object.entries(palette)
}

/**
 * Generate a Claude system-prompt.md for the given kit.
 * @param {object} kit
 * @returns {string}
 */
export function generateClaudePrompt(kit) {
  const light = kit.palette?.light || {}
  const dark = kit.palette?.dark || {}
  const name = kit.name || 'Design System'
  const industry = kit.industry || 'Product'
  const description = kit.description || ''
  const headingFont = kit.typography?.headingFont || 'Inter'
  const bodyFont = kit.typography?.bodyFont || 'Inter'

  return `# Design System: ${name}

## Brand Overview
${description}
Industry: ${industry}

## Color Usage Rules

### Light Mode
- **Primary** (\`${light.primary}\`): Use for CTAs, primary buttons, links, and key interactive elements.
- **Secondary** (\`${light.secondary}\`): Use for secondary actions, tags, and supporting UI elements.
- **Accent** (\`${light.accent}\`): Use for highlights, badges, and attention-grabbing micro-elements.
- **Background** (\`${light.background}\`): Page-level background. Keep it clean and uncluttered.
- **Surface** (\`${light.surface}\`): Card backgrounds, panels, and elevated containers.
- **Text** (\`${light.text}\`): Primary body copy and headings.
- **Text Muted** (\`${light.textMuted}\`): Secondary labels, placeholders, captions.
- **Border** (\`${light.border}\`): Dividers, input outlines, and subtle separators.
- **Success** (\`${light.success}\`): Confirmation states, positive indicators, and success banners.
- **Warning** (\`${light.warning}\`): Alerts, degraded states, and cautionary feedback.

### Dark Mode
- **Primary** (\`${dark.primary}\`): Same role as light — CTAs and key actions.
- **Secondary** (\`${dark.secondary}\`): Secondary actions adapted for dark backgrounds.
- **Accent** (\`${dark.accent}\`): Highlights on dark surfaces.
- **Background** (\`${dark.background}\`): Page-level dark background.
- **Surface** (\`${dark.surface}\`): Elevated cards and panels on dark background.
- **Text** (\`${dark.text}\`): Primary readable text on dark.
- **Text Muted** (\`${dark.textMuted}\`): Subdued labels on dark.
- **Border** (\`${dark.border}\`): Subtle separators for dark UI.
- **Success** (\`${dark.success}\`): Positive feedback in dark mode.
- **Warning** (\`${dark.warning}\`): Cautionary feedback in dark mode.

## Typography
- Heading font: ${headingFont} — use for all h1–h4 elements
- Body font: ${bodyFont} — use for body copy, labels, and UI text
- Google Fonts import: @import url('https://fonts.googleapis.com/css2?family=${headingFont.replace(/ /g, '+')}${headingFont !== bodyFont ? `&family=${bodyFont.replace(/ /g, '+')}` : ''}&display=swap');
- Base font size: ${kit.typography?.baseFontSize || '16px'}
- Line height: ${kit.typography?.lineHeight || '1.6'}

## Spacing Guidelines
- Use a consistent 8px base spacing unit.
- Padding within components: 8px (tight), 16px (default), 24px (spacious).
- Section gaps: 32px–64px depending on content density.
- Never mix arbitrary values — always use multiples of 4 or 8.

## General Rules
- Maintain a minimum contrast ratio of 4.5:1 for text on backgrounds (WCAG AA).
- Use primary color sparingly — it should draw the eye to the most important action.
- Destructive actions (delete, remove) should use red tones, not the primary color.
- Disabled states should use muted/border colors at reduced opacity.
`
}

/**
 * Generate a v0 tailwind.config.js snippet for the given kit.
 * @param {object} kit
 * @returns {string}
 */
export function generateV0Config(kit) {
  const light = kit.palette?.light || {}
  const dark = kit.palette?.dark || {}
  const headingFont = kit.typography?.headingFont || 'Inter'
  const bodyFont = kit.typography?.bodyFont || 'Inter'

  const colorEntries = (palette, prefix) =>
    Object.entries(palette)
      .map(([key, val]) => `          '${prefix}${key}': '${val}',`)
      .join('\n')

  return `/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
${colorEntries(light, '')}
        },
        'brand-dark': {
${colorEntries(dark, '')}
        },
      },
      fontFamily: {
        sans: ['${bodyFont}', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        heading: ['${headingFont}', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
      },
      borderRadius: {
        sm: '4px',
        DEFAULT: '8px',
        md: '8px',
        lg: '12px',
        xl: '16px',
        full: '9999px',
      },
    },
  },
  plugins: [],
}
`
}

/**
 * Generate a .cursor/rules markdown file for the given kit.
 * @param {object} kit
 * @returns {string}
 */
export function generateCursorRules(kit) {
  const light = kit.palette?.light || {}
  const dark = kit.palette?.dark || {}
  const name = kit.name || 'Design System'
  const headingFont = kit.typography?.headingFont || 'Inter'
  const bodyFont = kit.typography?.bodyFont || 'Inter'

  const cssVarBlock = (palette, suffix) =>
    Object.entries(palette)
      .map(([key, val]) => `  --color-${toCssVarName(key)}${suffix}: ${val};`)
      .join('\n')

  return `# Cursor Rules — ${name} Design System

## Overview
This project uses the **${name}** design system. Always reference the design tokens below when writing or reviewing UI code. Do not hardcode hex values — use CSS variables or Tailwind \`brand-*\` classes.

## CSS Custom Properties

\`\`\`css
:root {
${cssVarBlock(light, '')}
  --font-heading: '${headingFont}', sans-serif;
  --font-body: '${bodyFont}', sans-serif;
}

[data-theme="dark"] {
${cssVarBlock(dark, '-dark')}
}
\`\`\`

## Color Usage Rules

| Token | Light | Dark | When to use |
|-------|-------|------|-------------|
| primary | \`${light.primary}\` | \`${dark.primary}\` | CTAs, primary buttons, key links |
| secondary | \`${light.secondary}\` | \`${dark.secondary}\` | Secondary actions, tags |
| accent | \`${light.accent}\` | \`${dark.accent}\` | Highlights, badges |
| background | \`${light.background}\` | \`${dark.background}\` | Page background |
| surface | \`${light.surface}\` | \`${dark.surface}\` | Cards, panels, modals |
| text | \`${light.text}\` | \`${dark.text}\` | Body copy, headings |
| textMuted | \`${light.textMuted}\` | \`${dark.textMuted}\` | Labels, captions, placeholders |
| border | \`${light.border}\` | \`${dark.border}\` | Dividers, input borders |
| success | \`${light.success}\` | \`${dark.success}\` | Positive states, confirmations |
| warning | \`${light.warning}\` | \`${dark.warning}\` | Alerts, degraded states |

## Component Guidelines
- Use \`var(--color-primary)\` for all CTA buttons.
- Use \`var(--color-surface)\` for card and panel backgrounds.
- Use \`var(--color-text-muted)\` for secondary labels and captions.
- Never use \`color: black\` or \`color: white\` directly — use token variables.
- Destructive actions must use a red tone, not the primary color.
- Disabled elements should use \`var(--color-border)\` with 60% opacity.
- Always use \`var(--font-heading)\` for h1–h4 elements.
- Always use \`var(--font-body)\` for body text, labels, and UI copy.

## Spacing
- Base unit: 8px
- Use multiples: 4px, 8px, 16px, 24px, 32px, 48px, 64px
- Never use arbitrary pixel values outside this scale.

## Accessibility
- Minimum contrast ratio: 4.5:1 (WCAG AA) for normal text.
- All interactive elements must have visible focus states.
- Do not rely on color alone to convey meaning.
`
}

/**
 * Generate a replit-prompt.md for the given kit.
 * @param {object} kit
 * @returns {string}
 */
export function generateReplitPrompt(kit) {
  const light = kit.palette?.light || {}
  const dark = kit.palette?.dark || {}
  const name = kit.name || 'Design System'
  const industry = kit.industry || 'Product'
  const description = kit.description || ''
  const headingFont = kit.typography?.headingFont || 'Inter'
  const bodyFont = kit.typography?.bodyFont || 'Inter'

  const fontsParam = headingFont === bodyFont
    ? `family=${headingFont.replace(/ /g, '+')}`
    : `family=${headingFont.replace(/ /g, '+')}&family=${bodyFont.replace(/ /g, '+')}`

  const cssVarLines = (palette, suffix) =>
    Object.entries(palette)
      .map(([key, val]) => `  --color-${toCssVarName(key)}${suffix}: ${val};`)
      .join('\n')

  return `# Replit AI Context: ${name} Design System

## Project Context
${description}
Industry: ${industry}

This file provides the design system context for Replit AI. When generating or editing UI components, always use the CSS variables and color tokens defined below.

## Google Fonts Import

Add the following to the top of your global CSS:

\`\`\`css
@import url('https://fonts.googleapis.com/css2?${fontsParam}&display=swap');
\`\`\`

## CSS Variables

Add the following to your global CSS (e.g., \`index.css\` or \`globals.css\`):

\`\`\`css
:root {
${cssVarLines(light, '')}
  --font-heading: '${headingFont}', sans-serif;
  --font-body: '${bodyFont}', sans-serif;
}

[data-theme="dark"] {
${cssVarLines(dark, '-dark')}
}
\`\`\`

## How to Use These Variables

Reference variables in your styles like this:

\`\`\`css
h1, h2, h3, h4 {
  font-family: var(--font-heading);
}

body, p, label, input {
  font-family: var(--font-body);
}

.button-primary {
  background-color: var(--color-primary);
  color: var(--color-background);
}

.card {
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
}

.body-text {
  color: var(--color-text);
}

.muted-label {
  color: var(--color-text-muted);
}
\`\`\`

## Color Token Reference

| Token | Light Value | Dark Value | Purpose |
|-------|-------------|------------|---------|
| \`--color-primary\` | \`${light.primary}\` | \`${dark.primary}\` | Primary actions and CTAs |
| \`--color-secondary\` | \`${light.secondary}\` | \`${dark.secondary}\` | Secondary actions |
| \`--color-accent\` | \`${light.accent}\` | \`${dark.accent}\` | Highlights and badges |
| \`--color-background\` | \`${light.background}\` | \`${dark.background}\` | Page background |
| \`--color-surface\` | \`${light.surface}\` | \`${dark.surface}\` | Cards and panels |
| \`--color-text\` | \`${light.text}\` | \`${dark.text}\` | Primary text |
| \`--color-text-muted\` | \`${light.textMuted}\` | \`${dark.textMuted}\` | Secondary / muted text |
| \`--color-border\` | \`${light.border}\` | \`${dark.border}\` | Borders and dividers |
| \`--color-success\` | \`${light.success}\` | \`${dark.success}\` | Success states |
| \`--color-warning\` | \`${light.warning}\` | \`${dark.warning}\` | Warning states |

## Typography

| Token | Value | Purpose |
|-------|-------|---------|
| \`--font-heading\` | \`'${headingFont}', sans-serif\` | h1–h4 headings |
| \`--font-body\` | \`'${bodyFont}', sans-serif\` | Body text and UI labels |

## Design Rules for Replit AI
1. Always use CSS variables instead of hardcoded hex values.
2. Use \`var(--color-primary)\` for the main call-to-action button.
3. Use \`var(--color-surface)\` as the background for cards, modals, and sidebars.
4. Use \`var(--color-text-muted)\` for labels, captions, and helper text.
5. Use \`var(--font-heading)\` for all heading elements (h1–h4).
6. Use \`var(--font-body)\` for all body text, labels, inputs, and UI copy.
7. Spacing scale: 4px, 8px, 16px, 24px, 32px, 48px, 64px — avoid arbitrary values.
8. Border radius: small=4px, default=8px, large=12px, pill=9999px.
9. Ensure WCAG AA contrast (4.5:1) between text and background tokens.
`
}
