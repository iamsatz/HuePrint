import React, { useRef, useEffect } from 'react'

export default function PreviewError404({ kit }) {
  const ref = useRef(null)
  useEffect(() => {
    if (!ref.current || !kit) return
    const el = ref.current
    const palette = kit.palette.light
    const roles = ['background', 'surface', 'primary', 'secondary', 'accent', 'text', 'textMuted', 'border', 'success', 'warning']
    roles.forEach((role) => { if (palette[role]) el.style.setProperty(`--hp-${role}`, palette[role]) })
  }, [kit])
  if (!kit) return null

  return (
    <div className="lp-page lp-page--centered" ref={ref}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: '5rem', fontWeight: 900, color: 'var(--hp-primary, #7c3aed)', lineHeight: 1, marginBottom: 8 }}>404</div>
        <h2 style={{ margin: '0 0 12px', color: 'var(--hp-text, #111827)', fontSize: '1.5rem', fontWeight: 800 }}>Page not found</h2>
        <p style={{ color: 'var(--hp-textMuted, #6b7280)', fontSize: '0.9375rem', maxWidth: 360, margin: '0 auto 28px', lineHeight: 1.6 }}>
          Sorry, we couldn't find the page you're looking for. It may have been moved or deleted.
        </p>
        <div className="lp-app-hero-ctas">
          <button className="lp-btn lp-btn--primary">← Back to home</button>
          <button className="lp-btn lp-btn--ghost">Contact support</button>
        </div>
      </div>
    </div>
  )
}
