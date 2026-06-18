import { getDefaultPair } from './fontPairs.js'

const VALID_MODES = ['single', 'two', 'three', 'four']

export function getDefaultTypography() {
  const pair = getDefaultPair()
  return {
    mode: 'two',
    displayFont: pair.heading,
    headingFont: pair.heading,
    bodyFont: pair.body,
    monoFont: 'JetBrains Mono',
    uiFont: pair.body,
    baseFontSize: '16px',
    lineHeight: '1.6',
    roles: {
      hero: 'displayFont',
      headings: 'headingFont',
      body: 'bodyFont',
      ui: 'uiFont',
      code: 'monoFont',
    },
  }
}

export function normalizeTypography(input = getDefaultTypography()) {
  const mode = VALID_MODES.includes(input.mode) ? input.mode : 'two'
  let displayFont = input.displayFont || input.headingFont || 'Inter'
  let headingFont = input.headingFont || displayFont || 'Inter'
  let bodyFont = input.bodyFont || headingFont || 'Inter'
  let monoFont = input.monoFont || 'JetBrains Mono'
  // Action/UI font defaults to body when unset, so previews that don't yet
  // consume --hp-ui-font are visually unchanged.
  let uiFont = input.uiFont || bodyFont

  if (mode === 'single') {
    bodyFont = headingFont
    displayFont = headingFont
    monoFont = headingFont
    uiFont = headingFont
  }

  if (mode === 'two') {
    displayFont = headingFont
    monoFont = 'JetBrains Mono'
    uiFont = input.uiFont || bodyFont
  }

  if (mode === 'three') {
    monoFont = input.monoFont || 'JetBrains Mono'
    uiFont = input.uiFont || bodyFont
  }

  return {
    mode,
    displayFont,
    headingFont,
    bodyFont,
    monoFont,
    uiFont,
    baseFontSize: input.baseFontSize || '16px',
    lineHeight: input.lineHeight || '1.6',
    roles: {
      hero: 'displayFont',
      headings: 'headingFont',
      body: 'bodyFont',
      ui: 'uiFont',
      code: 'monoFont',
      ...(input.roles || {}),
    },
  }
}
