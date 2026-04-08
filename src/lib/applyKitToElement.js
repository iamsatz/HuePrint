const COLOR_ROLES = ['background', 'surface', 'primary', 'secondary', 'accent', 'text', 'textMuted', 'border', 'success', 'warning']

export function applyKitToElement(el, kit) {
  if (!el || !kit) return
  const palette = kit.palette.light
  COLOR_ROLES.forEach((role) => {
    if (palette[role]) el.style.setProperty(`--hp-${role}`, palette[role])
  })
  if (kit.typography) {
    if (kit.typography.headingFont) el.style.setProperty('--hp-heading-font', `'${kit.typography.headingFont}', sans-serif`)
    if (kit.typography.bodyFont) el.style.setProperty('--hp-body-font', `'${kit.typography.bodyFont}', sans-serif`)
  }
}
