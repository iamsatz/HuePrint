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

  const activityBars = [40, 65, 30, 80, 55, 90, 45, 70, 60, 85, 50, 75]

  return (
    <div className="lp-page" ref={ref}>
      <nav className="lp-app-nav">
        <div className="lp-app-logo">◈ Community</div>
        <div className="lp-app-nav-links">
          <a className="lp-app-nav-link">Feed</a>
          <a className="lp-app-nav-link lp-app-nav-link--active">Profile</a>
          <a className="lp-app-nav-link">Explore</a>
        </div>
        <button className="lp-btn lp-btn--ghost lp-btn--sm">Edit Profile</button>
      </nav>

      <div className="lp-profile-cover" />

      <div style={{ padding: '0 24px 24px', background: 'var(--hp-background, #fff)' }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 16, marginTop: -20 }}>
          <div className="lp-profile-avatar" style={{ width: 64, height: 64, fontSize: '1.25rem', border: '3px solid var(--hp-background, #fff)' }}>JD</div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button className="lp-btn lp-btn--primary lp-btn--sm">Follow</button>
            <button className="lp-btn lp-btn--ghost lp-btn--sm">Message</button>
          </div>
        </div>

        <h2 style={{ margin: '0 0 2px', color: 'var(--hp-text, #111827)', fontWeight: 800, fontSize: '1.25rem' }}>Jane Doe</h2>
        <p style={{ margin: '0 0 4px', color: 'var(--hp-textMuted, #6b7280)', fontSize: '0.875rem' }}>@janedoe · Product Designer at Acme Co.</p>
        <p style={{ margin: '0 0 12px', color: 'var(--hp-text, #374151)', fontSize: '0.8125rem', lineHeight: 1.5 }}>
          Crafting digital experiences that are beautiful and intuitive. Previously at Figma and Stripe. Speaker, author, design systems nerd.
        </p>

        <div style={{ display: 'flex', gap: 16, marginBottom: 16 }}>
          {[['📍', 'San Francisco, CA'], ['🔗', 'janedoe.design'], ['📅', 'Joined Jan 2022']].map(([icon, text], i) => (
            <span key={i} style={{ fontSize: '0.75rem', color: 'var(--hp-textMuted, #6b7280)', display: 'flex', alignItems: 'center', gap: 4 }}>
              <span>{icon}</span> {text}
            </span>
          ))}
        </div>

        <div className="lp-profile-stats" style={{ marginTop: 0, marginBottom: 20 }}>
          {[['Posts', '142'], ['Followers', '3.2K'], ['Following', '208'], ['Likes', '8.4K']].map(([label, val], i) => (
            <div key={i} className="lp-profile-stat">
              <div style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--hp-text, #111827)' }}>{val}</div>
              <div style={{ fontSize: '0.6875rem', color: 'var(--hp-textMuted, #9ca3af)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{label}</div>
            </div>
          ))}
        </div>

        <div className="lp-comp-label" style={{ marginBottom: 8 }}>Pinned Projects</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 20 }}>
          {[
            { title: 'E-Commerce Redesign', tag: 'UX', icon: '🛒' },
            { title: 'Design System', tag: 'Systems', icon: '🎨' },
          ].map((p, i) => (
            <div key={i} style={{ background: 'var(--hp-surface, #f9fafb)', border: '1.5px solid var(--hp-border, #e5e7eb)', borderRadius: 10, overflow: 'hidden' }}>
              <div style={{ height: 60, background: 'var(--hp-primary, #7c3aed)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.75rem', opacity: 0.85 }}>{p.icon}</div>
              <div style={{ padding: '8px 10px' }}>
                <div style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--hp-text, #111827)', marginBottom: 4 }}>{p.title}</div>
                <span className="lp-badge lp-badge--secondary" style={{ fontSize: '0.6875rem' }}>{p.tag}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="lp-comp-label" style={{ marginBottom: 8 }}>Activity (last 12 weeks)</div>
        <div style={{ display: 'flex', gap: 4, alignItems: 'flex-end', height: 48, marginBottom: 20 }}>
          {activityBars.map((h, i) => (
            <div key={i} style={{ flex: 1, height: `${h}%`, background: 'var(--hp-primary, #7c3aed)', borderRadius: '3px 3px 0 0', opacity: 0.7 + (h / 300) }} />
          ))}
        </div>

        <div className="lp-comp-label" style={{ marginBottom: 10 }}>Recent Posts</div>
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
