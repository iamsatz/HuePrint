import React, { useRef, useEffect } from 'react'

export default function PreviewPortfolio({ kit }) {
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
        <div className="lp-app-logo">Jane Doe</div>
        <div className="lp-app-nav-links">
          <a className="lp-app-nav-link lp-app-nav-link--active">Work</a>
          <a className="lp-app-nav-link">About</a>
          <a className="lp-app-nav-link">Contact</a>
        </div>
      </nav>

      <section className="lp-port-hero">
        <div className="lp-port-avatar">JD</div>
        <h1 className="lp-app-hero-h1" style={{ marginBottom: 8 }}>Hi, I'm Jane Doe</h1>
        <p className="lp-app-hero-sub">Product designer crafting digital experiences that are beautiful, accessible, and impactful.</p>
        <div className="lp-app-hero-ctas">
          <button className="lp-btn lp-btn--primary">View my work</button>
          <button className="lp-btn lp-btn--ghost">Download CV</button>
        </div>
      </section>

      <section style={{ padding: '28px 28px 0', background: 'var(--hp-background, #fff)' }}>
        <div className="lp-comp-label" style={{ marginBottom: 16 }}>Selected Projects</div>
        <div className="lp-port-grid">
          {[
            { title: 'E-Commerce Redesign', tag: 'UX Design' },
            { title: 'Mobile Banking App', tag: 'Product' },
            { title: 'Design System', tag: 'Systems' },
          ].map((p, i) => (
            <div key={i} className="lp-port-card">
              <div className="lp-port-img">{['🛒', '🏦', '🎨'][i]}</div>
              <div className="lp-port-card-body">
                <div className="lp-port-card-title">{p.title}</div>
                <span className="lp-badge lp-badge--secondary">{p.tag}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
