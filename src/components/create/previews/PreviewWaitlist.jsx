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
    <div className="lp-page" ref={ref}>
      <nav className="lp-app-nav">
        <div className="lp-app-logo">◈ LaunchKit</div>
        <div className="lp-app-nav-links">
          <a className="lp-app-nav-link">Features</a>
          <a className="lp-app-nav-link">Pricing</a>
          <a className="lp-app-nav-link">Blog</a>
        </div>
        <button className="lp-btn lp-btn--ghost lp-btn--sm">Sign In</button>
      </nav>

      <div className="lp-waitlist-hero">
        <div className="lp-app-hero-eyebrow">Early Access — Limited Spots</div>
        <h1 className="lp-app-hero-h1" style={{ marginBottom: 12 }}>Something big is coming</h1>
        <p className="lp-app-hero-sub" style={{ marginBottom: 0 }}>
          We're putting the finishing touches on a tool that changes how teams ship design systems. Be first in line.
        </p>
      </div>

      <div className="lp-waitlist-main">
        <div className="lp-waitlist-countdown">
          {[['12', 'Days'], ['04', 'Hours'], ['32', 'Mins'], ['08', 'Secs']].map(([val, label], i) => (
            <div key={i} className="lp-waitlist-unit">
              <div className="lp-waitlist-num">{val}</div>
              <div className="lp-waitlist-label">{label}</div>
            </div>
          ))}
        </div>

        <div className="lp-waitlist-form" style={{ maxWidth: 420, margin: '0 auto 16px' }}>
          <input className="lp-input" type="email" placeholder="you@company.com" readOnly style={{ flex: 1 }} />
          <button className="lp-btn lp-btn--primary">Join waitlist</button>
        </div>

        <div className="lp-waitlist-social-proof">
          <div className="lp-waitlist-avatars">
            {[
              { init: 'JD', role: 'primary' },
              { init: 'SK', role: 'secondary' },
              { init: 'MR', role: 'accent' },
              { init: 'AL', role: 'success' },
            ].map(({ init, role }, i) => (
              <div key={i} className="lp-waitlist-avatar" style={{ background: `var(--hp-${role})` }}>{init}</div>
            ))}
          </div>
          <span style={{ fontSize: '0.8125rem', color: 'var(--hp-textMuted, #6b7280)' }}>
            <strong style={{ color: 'var(--hp-text, #111827)' }}>1,847 people</strong> already on the waitlist
          </span>
        </div>

        <div className="lp-waitlist-features">
          {[
            { icon: '⚡', title: 'Instant token export', desc: 'CSS variables, Tailwind, and JSON in one click' },
            { icon: '🎨', title: 'Visual color builder', desc: 'Real-time preview across 20 page types' },
            { icon: '🔒', title: 'Team collaboration', desc: 'Share kits and export directly to Figma' },
          ].map((f, i) => (
            <div key={i} className="lp-waitlist-feature-item">
              <span className="lp-waitlist-feature-icon">{f.icon}</span>
              <div>
                <div style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--hp-text, #111827)', marginBottom: 2 }}>{f.title}</div>
                <div style={{ fontSize: '0.8125rem', color: 'var(--hp-textMuted, #6b7280)' }}>{f.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="lp-404-footer">
        <span style={{ color: 'var(--hp-textMuted, #9ca3af)', fontSize: '0.75rem' }}>© 2025 LaunchKit Inc. — No spam, ever.</span>
        <div style={{ display: 'flex', gap: 16 }}>
          {['Privacy', 'Terms'].map((l, i) => (
            <a key={i} style={{ fontSize: '0.75rem', color: 'var(--hp-textMuted, #9ca3af)', cursor: 'pointer' }}>{l}</a>
          ))}
        </div>
      </div>
    </div>
  )
}
