import React, { useRef, useEffect } from 'react'

export default function PreviewOnboarding({ kit }) {
  const ref = useRef(null)
  useEffect(() => {
    if (!ref.current || !kit) return
    const el = ref.current
    const palette = kit.palette.light
    const roles = ['background', 'surface', 'primary', 'secondary', 'accent', 'text', 'textMuted', 'border', 'success', 'warning']
    roles.forEach((role) => { if (palette[role]) el.style.setProperty(`--hp-${role}`, palette[role]) })
  }, [kit])
  if (!kit) return null

  const steps = ['Set up profile', 'Connect your team', 'Start building']

  return (
    <div className="lp-page lp-page--centered" ref={ref}>
      <div style={{ maxWidth: 480, width: '100%', textAlign: 'center' }}>
        <div className="lp-onboard-steps">
          {steps.map((step, i) => (
            <div key={i} className="lp-onboard-step">
              <div className={`lp-onboard-step-circle ${i === 0 ? 'lp-onboard-step-circle--active' : ''}`}>{i + 1}</div>
              <div className="lp-onboard-step-label">{step}</div>
              {i < steps.length - 1 && <div className="lp-onboard-step-line" />}
            </div>
          ))}
        </div>

        <div className="lp-onboard-illustration">🚀</div>

        <h2 className="lp-app-hero-h1" style={{ marginBottom: 12 }}>Set up your profile</h2>
        <p className="lp-app-hero-sub" style={{ marginBottom: 28 }}>Tell us a bit about yourself so we can personalize your experience and help your team find you.</p>

        <div style={{ textAlign: 'left', maxWidth: 360, margin: '0 auto' }}>
          <div className="lp-field" style={{ marginBottom: 12 }}>
            <label className="lp-label">Display name</label>
            <input className="lp-input" placeholder="Jane Doe" readOnly />
          </div>
          <div className="lp-field" style={{ marginBottom: 20 }}>
            <label className="lp-label">Your role</label>
            <input className="lp-input" placeholder="e.g. Product Designer" readOnly />
          </div>
        </div>

        <button className="lp-btn lp-btn--primary" style={{ minWidth: 160 }}>Continue →</button>
        <p style={{ marginTop: 12, fontSize: '0.8125rem', color: 'var(--hp-textMuted)' }}>Step 1 of 3</p>
      </div>
    </div>
  )
}
