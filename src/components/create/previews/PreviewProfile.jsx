import React, { useRef, useEffect } from 'react'

export default function PreviewProfile({ kit }) {
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
        <div className="lp-app-logo">◈ Community</div>
        <div className="lp-app-nav-links">
          <a className="lp-app-nav-link">Feed</a>
          <a className="lp-app-nav-link lp-app-nav-link--active">Profile</a>
        </div>
        <button className="lp-btn lp-btn--ghost lp-btn--sm">Edit Profile</button>
      </nav>

      <div style={{ background: 'var(--hp-background, #fff)', padding: '28px 24px' }}>
        <div className="lp-profile-header">
          <div className="lp-profile-avatar">JD</div>
          <div>
            <h2 style={{ margin: 0, color: 'var(--hp-text)', fontWeight: 800, fontSize: '1.25rem' }}>Jane Doe</h2>
            <p style={{ margin: '4px 0 0', color: 'var(--hp-textMuted)', fontSize: '0.875rem' }}>Product Designer · San Francisco, CA</p>
          </div>
        </div>

        <p style={{ color: 'var(--hp-textMuted)', fontSize: '0.875rem', marginTop: 16, lineHeight: 1.6 }}>
          I design digital products that are beautiful and intuitive. Currently building at Acme Co. Previously at Figma and Stripe.
        </p>

        <div className="lp-profile-stats">
          {[['Posts', '142'], ['Followers', '3.2K'], ['Following', '208']].map(([label, val], i) => (
            <div key={i} className="lp-profile-stat">
              <div className="lp-stat-value" style={{ fontSize: '1.125rem' }}>{val}</div>
              <div className="lp-stat-label">{label}</div>
            </div>
          ))}
        </div>

        <div className="lp-comp-label" style={{ marginTop: 20, marginBottom: 12 }}>Recent Activity</div>
        {['Published "Design Tokens in 2025"', 'Liked "Color System for Teams"', 'Commented on "Typography Scale"'].map((item, i) => (
          <div key={i} className="lp-dash-feed-item">
            <span className="lp-badge lp-badge--secondary" style={{ fontSize: '0.65rem' }}>✓</span>
            <span className="lp-dash-feed-text">{item}</span>
            <span className="lp-dash-feed-time">{i + 1}d ago</span>
          </div>
        ))}
      </div>
    </div>
  )
}
