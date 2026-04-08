import React, { useRef, useEffect } from 'react'

export default function PreviewError404({ kit }) {
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
        <div className="lp-app-logo">◈ Brand</div>
        <div className="lp-app-nav-links">
          <a className="lp-app-nav-link">Home</a>
          <a className="lp-app-nav-link">Features</a>
          <a className="lp-app-nav-link">Docs</a>
          <a className="lp-app-nav-link">Blog</a>
        </div>
        <button className="lp-btn lp-btn--primary lp-btn--sm">Sign In</button>
      </nav>

      <div className="lp-404-body">
        <div className="lp-404-illustration">
          <div className="lp-404-number">404</div>
          <div style={{ fontSize: '2.5rem', lineHeight: 1, marginTop: -8 }}>🔍</div>
        </div>
        <h1 className="lp-404-heading">Page not found</h1>
        <p className="lp-404-sub">
          Sorry, we couldn't find the page you're looking for. It may have been moved, deleted, or you may have mistyped the URL.
        </p>

        <div style={{ display: 'flex', gap: 6, maxWidth: 380, margin: '0 auto 20px', width: '100%' }}>
          <input className="lp-input" placeholder="Search for a page…" readOnly style={{ flex: 1, fontSize: '0.875rem' }} />
          <button className="lp-btn lp-btn--primary">Search</button>
        </div>

        <div className="lp-app-hero-ctas" style={{ marginBottom: 24 }}>
          <button className="lp-btn lp-btn--primary">← Back to home</button>
          <button className="lp-btn lp-btn--ghost">Contact support</button>
        </div>

        <div className="lp-404-links">
          <div className="lp-404-link-label">You might be looking for</div>
          <div className="lp-404-link-row">
            {[
              { label: 'Dashboard', icon: '⚡' },
              { label: 'Documentation', icon: '📚' },
              { label: 'Pricing', icon: '💰' },
              { label: 'Blog', icon: '✍️' },
              { label: 'Community', icon: '💬' },
            ].map((item, i) => (
              <a key={i} className="lp-404-link-item">
                <span className="lp-404-link-icon">{item.icon}</span>
                <span>{item.label}</span>
              </a>
            ))}
          </div>
        </div>

        <div className="lp-404-support-row" style={{ marginTop: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ color: 'var(--hp-success, #059669)', fontWeight: 700 }}>●</span>
            <span style={{ fontSize: '0.8125rem', color: 'var(--hp-textMuted, #6b7280)' }}>All systems operational</span>
          </div>
          <a style={{ fontSize: '0.8125rem', color: 'var(--hp-primary, #7c3aed)', cursor: 'pointer', fontWeight: 600 }}>
            Check status page →
          </a>
        </div>
      </div>

      <div style={{ padding: '14px 24px', background: 'var(--hp-surface, #f9fafb)', borderTop: '1px solid var(--hp-border, #e5e7eb)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
        <span style={{ fontSize: '0.75rem', color: 'var(--hp-textMuted, #9ca3af)' }}>Error code: 404 · URL: /missing-page</span>
        <div style={{ display: 'flex', gap: 16 }}>
          {['Privacy', 'Terms', 'Status', 'Help'].map((l, i) => (
            <a key={i} style={{ fontSize: '0.75rem', color: 'var(--hp-textMuted, #9ca3af)', cursor: 'pointer' }}>{l}</a>
          ))}
        </div>
      </div>
    </div>
  )
}
