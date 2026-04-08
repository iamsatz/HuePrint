import React, { useRef, useEffect } from 'react'

export default function PreviewOnboarding({ kit }) {
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

  const steps = [
    { label: 'Your Profile', done: false, active: true },
    { label: 'Your Team', done: false, active: false },
    { label: 'Start Building', done: false, active: false },
  ]

  return (
    <div className="lp-page" ref={ref}>
      <nav className="lp-app-nav" style={{ borderBottom: '1px solid var(--hp-border, #e5e7eb)' }}>
        <div className="lp-app-logo">◈ Brand</div>
        <div style={{ fontSize: '0.8125rem', color: 'var(--hp-textMuted, #6b7280)' }}>Step 1 of 3</div>
        <a style={{ fontSize: '0.8125rem', color: 'var(--hp-textMuted, #9ca3af)', cursor: 'pointer' }}>Save & exit</a>
      </nav>

      <div className="lp-onboard-page">
        <div className="lp-onboard-steps">
          {steps.map((step, i) => (
            <div key={i} className="lp-onboard-step">
              <div className={`lp-onboard-step-circle ${step.active ? 'lp-onboard-step-circle--active' : step.done ? 'lp-onboard-step-circle--done' : ''}`}>
                {step.done ? '✓' : i + 1}
              </div>
              <div className="lp-onboard-step-label" style={{ fontWeight: step.active ? 600 : 400, color: step.active ? 'var(--hp-text, #111827)' : 'var(--hp-textMuted, #9ca3af)' }}>{step.label}</div>
              {i < steps.length - 1 && <div className="lp-onboard-step-line" />}
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <div style={{ fontSize: '2.5rem', marginBottom: 12 }}>👋</div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--hp-text, #111827)', margin: '0 0 8px' }}>Set up your profile</h2>
          <p style={{ fontSize: '0.875rem', color: 'var(--hp-textMuted, #6b7280)', margin: 0 }}>Help your team find and recognize you.</p>
        </div>

        <div style={{ maxWidth: 380, margin: '0 auto', width: '100%' }}>
          <div style={{ display: 'flex', gap: 10, marginBottom: 12 }}>
            <div className="lp-field" style={{ flex: 1 }}>
              <label className="lp-label">First name</label>
              <input className="lp-input" placeholder="Jane" readOnly />
            </div>
            <div className="lp-field" style={{ flex: 1 }}>
              <label className="lp-label">Last name</label>
              <input className="lp-input" placeholder="Doe" readOnly />
            </div>
          </div>
          <div className="lp-field" style={{ marginBottom: 12 }}>
            <label className="lp-label">Your role</label>
            <input className="lp-input" placeholder="e.g. Product Designer" readOnly />
          </div>
          <div className="lp-field" style={{ marginBottom: 12 }}>
            <label className="lp-label">Company</label>
            <input className="lp-input" placeholder="e.g. Acme Inc." readOnly />
          </div>
          <div className="lp-field" style={{ marginBottom: 20 }}>
            <label className="lp-label">Team size</label>
            <div style={{ display: 'flex', gap: 8 }}>
              {['Solo', '2–10', '11–50', '50+'].map((size, i) => (
                <button key={i} className={`lp-btn lp-btn--ghost lp-btn--sm ${i === 1 ? 'lp-product-thumb--active' : ''}`} style={{ flex: 1, fontSize: '0.75rem' }}>{size}</button>
              ))}
            </div>
          </div>

          <button className="lp-btn lp-btn--primary lp-btn--full" style={{ marginBottom: 10 }}>Continue to team setup →</button>
          <div style={{ textAlign: 'center' }}>
            <a style={{ fontSize: '0.8125rem', color: 'var(--hp-textMuted, #9ca3af)', cursor: 'pointer' }}>Skip for now</a>
          </div>
        </div>
      </div>
    </div>
  )
}
