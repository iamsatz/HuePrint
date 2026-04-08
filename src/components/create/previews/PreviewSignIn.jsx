import React, { useRef, useEffect } from 'react'

export default function PreviewSignIn({ kit }) {
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
    <div className="lp-page" ref={ref}>
      <div className="lp-signin-split">
        <div className="lp-signin-brand-panel">
          <div className="lp-signin-brand-logo">◈ Brand</div>
          <div className="lp-signin-brand-headline">Design systems<br />that feel alive</div>
          <p className="lp-signin-brand-sub">
            Build, preview, and export your color kit in minutes. Trusted by 12,000+ designers and engineers.
          </p>
          <div className="lp-signin-brand-stats">
            {[['12K+', 'Users'], ['200+', 'Kits'], ['99.9%', 'Uptime']].map(([val, lbl], i) => (
              <div key={i} className="lp-signin-brand-stat">
                <div className="lp-on-primary-stat-value">{val}</div>
                <div className="lp-on-primary-stat-label">{lbl}</div>
              </div>
            ))}
          </div>
          <div className="lp-signin-activity-divider">
            <div style={{ fontSize: '0.6875rem', marginBottom: 10 }} className="lp-on-primary-stat-label">Recent activity</div>
            {['Alice joined the Pro plan', 'Carlos exported a dark kit', '3 new kits trending'].map((evt, i) => (
              <div key={i} style={{ fontSize: '0.75rem', marginBottom: 6, display: 'flex', alignItems: 'center', gap: 7 }} className="lp-on-primary-muted">
                <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--hp-accent, #0ea5e9)', flexShrink: 0, display: 'inline-block' }} />
                {evt}
              </div>
            ))}
          </div>
        </div>
        <div className="lp-signin-form-panel">
          <div style={{ maxWidth: 360, width: '100%' }}>
            <div className="lp-auth-logo" style={{ marginBottom: 4 }}>Welcome back</div>
            <div className="lp-auth-sub" style={{ marginBottom: 20 }}>Sign in to your account to continue</div>

            <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
              <button className="lp-btn lp-btn--ghost lp-btn--full" style={{ fontSize: '0.8125rem' }}>G Google</button>
              <button className="lp-btn lp-btn--ghost lp-btn--full" style={{ fontSize: '0.8125rem' }}>⬡ GitHub</button>
            </div>
            <div className="lp-auth-divider">or sign in with email</div>

            <div className="lp-field">
              <label className="lp-label">Email</label>
              <input className="lp-input" type="email" placeholder="you@example.com" readOnly />
            </div>
            <div className="lp-field">
              <label className="lp-label">Password</label>
              <input className="lp-input" type="password" placeholder="••••••••" readOnly />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '4px 0 14px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.8125rem', color: 'var(--hp-textMuted, #6b7280)' }}>
                <input type="checkbox" readOnly /> Remember me
              </label>
              <a style={{ fontSize: '0.75rem', color: 'var(--hp-primary, #7c3aed)', cursor: 'pointer' }}>Forgot password?</a>
            </div>

            <button className="lp-btn lp-btn--primary lp-btn--full">Sign in</button>

            <div style={{ marginTop: 14, padding: '12px 14px', background: 'var(--hp-surface, #f9fafb)', border: '1.5px solid var(--hp-border, #e5e7eb)', borderRadius: 10 }}>
              <div style={{ fontSize: '0.6875rem', fontWeight: 700, color: 'var(--hp-textMuted, #9ca3af)', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 8 }}>
                Trusted by teams at
              </div>
              <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', alignItems: 'center' }}>
                {['Stripe', 'Linear', 'Figma', 'Vercel'].map((co, i) => (
                  <span key={i} style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--hp-textMuted, #9ca3af)' }}>{co}</span>
                ))}
              </div>
            </div>

            <p style={{ textAlign: 'center', fontSize: '0.8125rem', color: 'var(--hp-textMuted)', marginTop: 12, marginBottom: 0 }}>
              Don't have an account? <a style={{ color: 'var(--hp-primary, #7c3aed)', cursor: 'pointer', fontWeight: 600 }}>Sign up free</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
