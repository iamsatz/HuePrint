import React from 'react'

const S = {
  label: { display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--hp-text)', marginBottom: 5, fontFamily: 'var(--hp-body-font, sans-serif)' },
  input: { display: 'block', width: '100%', padding: '9px 12px', borderRadius: 8, border: '1px solid var(--hp-border)', background: 'var(--hp-surface)', color: 'var(--hp-text)', fontSize: 13, boxSizing: 'border-box', fontFamily: 'var(--hp-body-font, sans-serif)' },
  btnPrimary: { display: 'block', width: '100%', padding: '11px', borderRadius: 9, border: 'none', background: 'var(--hp-primary)', color: '#fff', fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: 'var(--hp-body-font, sans-serif)' },
  btnGhost: { padding: '9px 0', borderRadius: 8, border: '1px solid var(--hp-border)', background: 'transparent', color: 'var(--hp-text)', fontSize: 13, fontWeight: 500, cursor: 'pointer', fontFamily: 'var(--hp-body-font, sans-serif)', flex: 1 },
  field: { marginBottom: 12 },
  link: { color: 'var(--hp-primary)', cursor: 'pointer', fontWeight: 600, textDecoration: 'none' },
  muted: { fontSize: 12, color: 'var(--hp-textMuted)', fontFamily: 'var(--hp-body-font, sans-serif)' },
  footnote: { textAlign: 'center', fontSize: 13, color: 'var(--hp-textMuted)', fontFamily: 'var(--hp-body-font, sans-serif)', marginTop: 14 },
}

function SignInForm({ variant = 'standard' }) {
  if (variant === 'magic-link') {
    return (
      <>
        <div style={{ background: 'var(--hp-surface)', border: '1px solid var(--hp-border)', borderRadius: 10, padding: '12px 14px', marginBottom: 16 }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--hp-text)', marginBottom: 3 }}>No password needed</div>
          <div style={S.muted}>We'll email you a secure sign-in link.</div>
        </div>
        <div style={S.field}>
          <label style={S.label}>Email address</label>
          <input style={S.input} type="email" placeholder="you@example.com" readOnly />
        </div>
        <button style={S.btnPrimary}>Send magic link</button>
      </>
    )
  }
  if (variant === 'social-first') {
    return (
      <>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 16 }}>
          {[
            { icon: 'G', label: 'Continue with Google', bg: 'var(--hp-background)', border: '1px solid var(--hp-border)' },
            { icon: '⬡', label: 'Continue with GitHub', bg: 'var(--hp-text)', color: '#fff', border: 'none' },
          ].map(({ icon, label, bg, color = 'var(--hp-text)', border }) => (
            <button key={label} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, width: '100%', padding: '10px', borderRadius: 9, border: border || 'none', background: bg, color, fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
              <span>{icon}</span>{label}
            </button>
          ))}
        </div>
        <div style={S.field}>
          <label style={S.label}>Email</label>
          <input style={S.input} type="email" placeholder="you@example.com" readOnly />
        </div>
        <button style={S.btnPrimary}>Continue</button>
      </>
    )
  }
  return (
    <>
      <div style={S.field}>
        <label style={S.label}>Email address</label>
        <input style={S.input} type="email" placeholder="you@example.com" readOnly />
      </div>
      <div style={{ ...S.field, marginBottom: 4 }}>
        <label style={S.label}>Password</label>
        <input style={S.input} type="password" placeholder="••••••••" readOnly />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '6px 0 16px' }}>
        <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'var(--hp-textMuted)', cursor: 'pointer' }}>
          <input type="checkbox" readOnly /> Remember me
        </label>
        <a style={{ ...S.link, fontSize: 12, fontWeight: 500 }}>Forgot password?</a>
      </div>
      <button style={S.btnPrimary}>Sign in</button>
    </>
  )
}

function SignUpForm({ variant = 'basic' }) {
  if (variant === 'detailed') {
    return (
      <>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 12 }}>
          <div><label style={S.label}>First name</label><input style={S.input} placeholder="Jane" readOnly /></div>
          <div><label style={S.label}>Last name</label><input style={S.input} placeholder="Doe" readOnly /></div>
        </div>
        <div style={S.field}><label style={S.label}>Work email</label><input style={S.input} type="email" placeholder="jane@company.com" readOnly /></div>
        <div style={S.field}><label style={S.label}>Company</label><input style={S.input} placeholder="Acme Inc." readOnly /></div>
        <div style={{ ...S.field, marginBottom: 16 }}><label style={S.label}>Password</label><input style={S.input} type="password" placeholder="Min. 8 characters" readOnly /></div>
        <button style={S.btnPrimary}>Create account</button>
      </>
    )
  }
  if (variant === 'social') {
    return (
      <>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 16 }}>
          {['Continue with Google', 'Continue with GitHub'].map((label) => (
            <button key={label} style={{ width: '100%', padding: '10px', borderRadius: 9, border: '1px solid var(--hp-border)', background: 'var(--hp-background)', color: 'var(--hp-text)', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>{label}</button>
          ))}
        </div>
        <div style={S.field}><label style={S.label}>Email address</label><input style={S.input} type="email" placeholder="jane@example.com" readOnly /></div>
        <div style={{ ...S.field, marginBottom: 16 }}><label style={S.label}>Password</label><input style={S.input} type="password" placeholder="Min. 8 characters" readOnly /></div>
        <button style={S.btnPrimary}>Create account</button>
      </>
    )
  }
  return (
    <>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 12 }}>
        <div><label style={S.label}>First name</label><input style={S.input} placeholder="Jane" readOnly /></div>
        <div><label style={S.label}>Last name</label><input style={S.input} placeholder="Doe" readOnly /></div>
      </div>
      <div style={S.field}><label style={S.label}>Email address</label><input style={S.input} type="email" placeholder="jane@example.com" readOnly /></div>
      <div style={{ ...S.field, marginBottom: 16 }}><label style={S.label}>Password</label><input style={S.input} type="password" placeholder="Min. 8 characters" readOnly /></div>
      <button style={S.btnPrimary}>Create account</button>
    </>
  )
}

function BrandPanel() {
  return (
    <div style={{ background: 'var(--hp-primary)', padding: '48px 36px', display: 'flex', flexDirection: 'column', justifyContent: 'center', minHeight: 400 }}>
      <div style={{ fontSize: 20, fontWeight: 800, color: '#fff', fontFamily: 'var(--hp-heading-font)', marginBottom: 24 }}>Acme</div>
      <h2 style={{ fontSize: 28, fontWeight: 800, color: '#fff', fontFamily: 'var(--hp-display-font)', lineHeight: 1.25, margin: '0 0 12px' }}>Design systems that feel alive</h2>
      <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.75)', lineHeight: 1.6 }}>Build, preview, and export your color kit in minutes.</p>
      <div style={{ display: 'flex', gap: 24, marginTop: 28 }}>
        {[['12K+', 'Users'], ['200+', 'Kits'], ['99.9%', 'Uptime']].map(([val, lbl]) => (
          <div key={lbl}>
            <div style={{ fontSize: 22, fontWeight: 800, color: '#fff' }}>{val}</div>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.65)' }}>{lbl}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export function AuthSignInBlock({ variant = 'centered' }) {
  const formVariant = variant === 'centered' ? 'standard' : variant === 'split' ? 'standard' : 'social-first'

  if (variant === 'split') {
    return (
      <div className="cv-block cv-block--auth" style={{ display: 'flex', minHeight: 420, fontFamily: 'var(--hp-body-font, sans-serif)', background: 'var(--hp-background)' }}>
        <BrandPanel />
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 32px' }}>
          <div style={{ maxWidth: 360, width: '100%' }}>
            <div style={{ fontSize: 22, fontWeight: 800, color: 'var(--hp-text)', fontFamily: 'var(--hp-heading-font)', marginBottom: 4 }}>Welcome back</div>
            <div style={{ ...S.muted, marginBottom: 20 }}>Sign in to your account</div>
            <SignInForm variant={formVariant} />
            <p style={S.footnote}>Don't have an account? <a style={S.link}>Sign up free</a></p>
          </div>
        </div>
      </div>
    )
  }
  if (variant === 'full-bleed') {
    return (
      <div className="cv-block cv-block--auth" style={{ minHeight: 480, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--hp-primary)', fontFamily: 'var(--hp-body-font, sans-serif)' }}>
        <div style={{ maxWidth: 380, width: '100%', background: 'var(--hp-background)', borderRadius: 16, padding: '32px 28px', boxShadow: '0 20px 60px rgba(0,0,0,0.2)' }}>
          <div style={{ fontSize: 22, fontWeight: 800, color: 'var(--hp-text)', fontFamily: 'var(--hp-heading-font)', marginBottom: 4 }}>Welcome back</div>
          <div style={{ ...S.muted, marginBottom: 20 }}>Sign in to your account</div>
          <SignInForm variant="standard" />
          <p style={S.footnote}>Don't have an account? <a style={S.link}>Sign up free</a></p>
        </div>
      </div>
    )
  }
  return (
    <div className="cv-block cv-block--auth" style={{ minHeight: 420, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--hp-background)', fontFamily: 'var(--hp-body-font, sans-serif)', padding: '40px 24px' }}>
      <div style={{ maxWidth: 360, width: '100%' }}>
        <div style={{ fontSize: 22, fontWeight: 800, color: 'var(--hp-text)', fontFamily: 'var(--hp-heading-font)', marginBottom: 4 }}>Welcome back</div>
        <div style={{ ...S.muted, marginBottom: 20 }}>Sign in to your account</div>
        <SignInForm variant="standard" />
        <p style={S.footnote}>Don't have an account? <a style={S.link}>Sign up free</a></p>
      </div>
    </div>
  )
}

export function AuthSignUpBlock({ variant = 'single' }) {
  if (variant === 'split') {
    return (
      <div className="cv-block cv-block--auth" style={{ display: 'flex', minHeight: 420, fontFamily: 'var(--hp-body-font, sans-serif)', background: 'var(--hp-background)' }}>
        <BrandPanel />
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 32px' }}>
          <div style={{ maxWidth: 360, width: '100%' }}>
            <div style={{ fontSize: 22, fontWeight: 800, color: 'var(--hp-text)', fontFamily: 'var(--hp-heading-font)', marginBottom: 4 }}>Create your account</div>
            <div style={{ ...S.muted, marginBottom: 20 }}>Start free — no credit card required</div>
            <SignUpForm variant="basic" />
            <p style={S.footnote}>Already have an account? <a style={S.link}>Sign in</a></p>
          </div>
        </div>
      </div>
    )
  }
  if (variant === 'multi-step') {
    return (
      <div className="cv-block cv-block--auth" style={{ minHeight: 420, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--hp-background)', fontFamily: 'var(--hp-body-font, sans-serif)', padding: '40px 24px' }}>
        <div style={{ maxWidth: 400, width: '100%' }}>
          <div style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
            {['Account', 'Profile', 'Done'].map((step, i) => (
              <div key={step} style={{ flex: 1, textAlign: 'center' }}>
                <div style={{ width: 28, height: 28, borderRadius: '50%', background: i === 0 ? 'var(--hp-primary)' : 'var(--hp-surface)', border: i === 0 ? 'none' : '1px solid var(--hp-border)', color: i === 0 ? '#fff' : 'var(--hp-textMuted)', fontSize: 12, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 6px' }}>{i + 1}</div>
                <div style={{ fontSize: 11, color: i === 0 ? 'var(--hp-primary)' : 'var(--hp-textMuted)', fontWeight: i === 0 ? 600 : 400 }}>{step}</div>
              </div>
            ))}
          </div>
          <div style={{ fontSize: 22, fontWeight: 800, color: 'var(--hp-text)', fontFamily: 'var(--hp-heading-font)', marginBottom: 4 }}>Create your account</div>
          <div style={{ ...S.muted, marginBottom: 20 }}>Step 1 of 3 — Account details</div>
          <SignUpForm variant="basic" />
          <p style={S.footnote}>Already have an account? <a style={S.link}>Sign in</a></p>
        </div>
      </div>
    )
  }
  return (
    <div className="cv-block cv-block--auth" style={{ minHeight: 420, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--hp-background)', fontFamily: 'var(--hp-body-font, sans-serif)', padding: '40px 24px' }}>
      <div style={{ maxWidth: 360, width: '100%' }}>
        <div style={{ fontSize: 22, fontWeight: 800, color: 'var(--hp-text)', fontFamily: 'var(--hp-heading-font)', marginBottom: 4 }}>Create your account</div>
        <div style={{ ...S.muted, marginBottom: 20 }}>Start free — no credit card required</div>
        <SignUpForm variant="basic" />
        <p style={S.footnote}>Already have an account? <a style={S.link}>Sign in</a></p>
      </div>
    </div>
  )
}
