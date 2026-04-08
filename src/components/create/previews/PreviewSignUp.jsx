import React, { useRef, useEffect } from 'react'

export default function PreviewSignUp({ kit }) {
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
      <div style={{ maxWidth: 440, width: '100%' }}>
        <div className="lp-auth-logo" style={{ textAlign: 'center', marginBottom: 4, fontSize: '1.125rem' }}>◈ Brand</div>
        <div className="lp-auth-title" style={{ textAlign: 'center', marginBottom: 4 }}>Create your account</div>
        <div className="lp-auth-sub" style={{ textAlign: 'center', marginBottom: 20 }}>Join 12,000+ designers and engineers</div>

        <div className="lp-signup-steps" style={{ marginBottom: 24 }}>
          {[['Info', 1, true], ['Plan', 2, false], ['Finish', 3, false]].map(([label, step, active], i) => (
            <React.Fragment key={i}>
              <div className={`lp-signup-step ${active ? 'lp-signup-step--active' : ''}`}>
                <div className="lp-signup-step-num">{active ? step : '○'}</div>
                <div className="lp-signup-step-label">{label}</div>
              </div>
              {i < 2 && <div style={{ flex: 1, height: 2, background: 'var(--hp-border, #e5e7eb)', alignSelf: 'center', margin: '0 4px 14px' }} />}
            </React.Fragment>
          ))}
        </div>

        <div className="lp-auth-card" style={{ padding: 20 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 10 }}>
            <div className="lp-field">
              <label className="lp-label">First name</label>
              <input className="lp-input" placeholder="Jane" readOnly />
            </div>
            <div className="lp-field">
              <label className="lp-label">Last name</label>
              <input className="lp-input" placeholder="Doe" readOnly />
            </div>
          </div>
          <div className="lp-field" style={{ marginBottom: 10 }}>
            <label className="lp-label">Work email</label>
            <input className="lp-input" type="email" placeholder="jane@company.com" readOnly />
          </div>
          <div className="lp-field" style={{ marginBottom: 10 }}>
            <label className="lp-label">Password</label>
            <input className="lp-input" type="password" placeholder="Min. 8 characters" readOnly />
          </div>
          <div className="lp-field" style={{ marginBottom: 14 }}>
            <label className="lp-label">How did you hear about us?</label>
            <select className="lp-input">
              <option>Search engine</option>
              <option>Social media</option>
              <option>Friend / colleague</option>
            </select>
          </div>

          <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--hp-text, #111827)', marginBottom: 8 }}>Choose your plan</div>
          <div className="lp-signup-plan-row" style={{ marginBottom: 14 }}>
            {[
              { name: 'Free', price: '$0/mo', desc: 'Up to 3 kits', highlight: false },
              { name: 'Pro', price: '$19/mo', desc: 'Unlimited kits', highlight: true },
            ].map((plan, i) => (
              <div key={i} className={`lp-signup-plan-tile ${plan.highlight ? 'lp-signup-plan-tile--active' : ''}`}>
                <div style={{ fontWeight: 700, fontSize: '0.875rem', color: plan.highlight ? 'var(--hp-primary, #7c3aed)' : 'var(--hp-text, #111827)' }}>{plan.name}</div>
                <div style={{ fontSize: '0.75rem', fontWeight: 800, color: plan.highlight ? 'var(--hp-primary, #7c3aed)' : 'var(--hp-textMuted, #6b7280)', margin: '2px 0' }}>{plan.price}</div>
                <div style={{ fontSize: '0.6875rem', color: 'var(--hp-textMuted, #9ca3af)' }}>{plan.desc}</div>
              </div>
            ))}
          </div>

          <label style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: '0.75rem', color: 'var(--hp-textMuted, #6b7280)', marginBottom: 14 }}>
            <input type="checkbox" readOnly style={{ marginTop: 2, flexShrink: 0 }} />
            I agree to the{' '}
            <a style={{ color: 'var(--hp-primary, #7c3aed)', cursor: 'pointer' }}>Terms of Service</a>
            {' '}and{' '}
            <a style={{ color: 'var(--hp-primary, #7c3aed)', cursor: 'pointer' }}>Privacy Policy</a>
          </label>

          <button className="lp-btn lp-btn--primary lp-btn--full">Next: Choose your plan →</button>

          <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4, flex: 1, padding: '6px 10px', background: 'var(--hp-surface, #f9fafb)', borderRadius: 8, border: '1px solid var(--hp-border, #e5e7eb)' }}>
              <span style={{ fontSize: '0.75rem' }}>🔒</span>
              <span style={{ fontSize: '0.6875rem', color: 'var(--hp-textMuted, #6b7280)' }}>SSL secure</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4, flex: 1, padding: '6px 10px', background: 'var(--hp-surface, #f9fafb)', borderRadius: 8, border: '1px solid var(--hp-border, #e5e7eb)' }}>
              <span style={{ fontSize: '0.75rem' }}>✓</span>
              <span style={{ fontSize: '0.6875rem', color: 'var(--hp-textMuted, #6b7280)' }}>No card required</span>
            </div>
          </div>

          <p style={{ textAlign: 'center', fontSize: '0.8125rem', color: 'var(--hp-textMuted)', marginTop: 10 }}>
            Already have an account? <a style={{ color: 'var(--hp-primary, #7c3aed)', cursor: 'pointer' }}>Sign in</a>
          </p>
        </div>
      </div>
    </div>
  )
}
