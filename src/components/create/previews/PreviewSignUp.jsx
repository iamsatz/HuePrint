import React, { useRef, useEffect } from 'react'

export default function PreviewSignUp({ kit }) {
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
      <div className="lp-auth-card" style={{ maxWidth: 400, width: '100%' }}>
        <div className="lp-auth-logo">◈ Brand</div>
        <div className="lp-auth-title">Create your account</div>
        <div className="lp-auth-sub">Step 1 of 3 — Basic info</div>

        <div className="lp-signup-steps">
          {[1, 2, 3].map((step) => (
            <div key={step} className={`lp-signup-step ${step === 1 ? 'lp-signup-step--active' : ''}`}>
              <div className="lp-signup-step-num">{step}</div>
              <div className="lp-signup-step-label">{['Info', 'Profile', 'Finish'][step - 1]}</div>
            </div>
          ))}
        </div>

        <div className="lp-field">
          <label className="lp-label">Full Name</label>
          <input className="lp-input" type="text" placeholder="Jane Doe" readOnly />
        </div>
        <div className="lp-field">
          <label className="lp-label">Email</label>
          <input className="lp-input" type="email" placeholder="you@example.com" readOnly />
        </div>
        <div className="lp-field">
          <label className="lp-label">Password</label>
          <input className="lp-input" type="password" placeholder="Choose a secure password" readOnly />
        </div>

        <button className="lp-btn lp-btn--primary lp-btn--full" style={{ marginTop: 4 }}>Next →</button>
        <p style={{ textAlign: 'center', fontSize: '0.8125rem', color: 'var(--hp-textMuted)', marginTop: 8 }}>
          Already have an account? <a style={{ color: 'var(--hp-primary, #7c3aed)', cursor: 'pointer' }}>Sign in</a>
        </p>
      </div>
    </div>
  )
}
