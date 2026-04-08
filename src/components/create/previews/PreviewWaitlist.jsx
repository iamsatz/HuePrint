import React, { useRef, useEffect } from 'react'

export default function PreviewWaitlist({ kit }) {
  const ref = useRef(null)
  useEffect(() => {
    if (!ref.current || !kit) return
    const el = ref.current
    const palette = kit.palette.light
    const roles = ['background', 'surface', 'primary', 'secondary', 'accent', 'text', 'textMuted', 'border', 'success', 'warning']
    roles.forEach((role) => { if (palette[role]) el.style.setProperty(`--hp-${role}`, palette[role]) })
    if (kit.typography) {
      if (kit.typography.headingFont) el.style.setProperty('--hp-heading-font', `'${kit.typography.headingFont}', sans-serif`)
      if (kit.typography.bodyFont) el.style.setProperty('--hp-body-font', `'${kit.typography.bodyFont}', sans-serif`)
    }
  }, [kit])
  if (!kit) return null

  return (
    <div className="lp-page lp-page--centered" ref={ref}>
      <div style={{ textAlign: 'center', maxWidth: 440, width: '100%' }}>
        <div className="lp-app-logo" style={{ fontSize: '1.25rem', marginBottom: 24, textAlign: 'center' }}>◈ Brand</div>

        <div className="lp-waitlist-countdown">
          {[['12', 'Days'], ['04', 'Hours'], ['32', 'Mins']].map(([val, label], i) => (
            <div key={i} className="lp-waitlist-unit">
              <div className="lp-waitlist-num">{val}</div>
              <div className="lp-waitlist-label">{label}</div>
            </div>
          ))}
        </div>

        <h1 className="lp-app-hero-h1" style={{ marginBottom: 12 }}>Something big is coming</h1>
        <p className="lp-app-hero-sub" style={{ marginBottom: 28 }}>We're putting the finishing touches on something you'll love. Be the first to know when we launch.</p>

        <div className="lp-waitlist-form">
          <input className="lp-input" type="email" placeholder="you@example.com" readOnly style={{ flex: 1 }} />
          <button className="lp-btn lp-btn--primary">Notify me</button>
        </div>

        <p style={{ marginTop: 16, fontSize: '0.75rem', color: 'var(--hp-textMuted)' }}>
          Join 2,400+ people already on the waitlist. No spam, ever.
        </p>
      </div>
    </div>
  )
}
