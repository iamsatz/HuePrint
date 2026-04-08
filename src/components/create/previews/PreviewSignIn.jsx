import React, { useRef, useEffect } from 'react'

export default function PreviewSignIn({ kit }) {
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
      <div className="lp-auth-card" style={{ maxWidth: 360, width: '100%' }}>
        <div className="lp-auth-logo">◈ Brand</div>
        <div className="lp-auth-title">Welcome back</div>
        <div className="lp-auth-sub">Sign in to your account to continue</div>

        <div className="lp-field">
          <label className="lp-label">Email</label>
          <input className="lp-input" type="email" placeholder="you@example.com" readOnly />
        </div>
        <div className="lp-field">
          <label className="lp-label">Password</label>
          <input className="lp-input" type="password" placeholder="••••••••" readOnly />
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: -4, marginBottom: 4 }}>
          <a style={{ fontSize: '0.75rem', color: 'var(--hp-primary, #7c3aed)', cursor: 'pointer' }}>Forgot password?</a>
        </div>

        <button className="lp-btn lp-btn--primary lp-btn--full">Sign in</button>
        <div className="lp-auth-divider">or</div>
        <button className="lp-btn lp-btn--ghost lp-btn--full">Continue with Google</button>

        <p style={{ textAlign: 'center', fontSize: '0.8125rem', color: 'var(--hp-textMuted)', marginTop: 8 }}>
          Don't have an account? <a style={{ color: 'var(--hp-primary, #7c3aed)', cursor: 'pointer' }}>Sign up</a>
        </p>
      </div>
    </div>
  )
}
