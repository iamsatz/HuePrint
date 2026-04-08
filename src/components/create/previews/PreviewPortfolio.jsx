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
        <div className="lp-app-logo" style={{ fontWeight: 800, color: 'var(--hp-text, #111827)' }}>Jane Doe</div>
        <div className="lp-app-nav-links">
          <a className="lp-app-nav-link lp-app-nav-link--active">Work</a>
          <a className="lp-app-nav-link">About</a>
          <a className="lp-app-nav-link">Writing</a>
          <a className="lp-app-nav-link">Contact</a>
        </div>
        <button className="lp-btn lp-btn--primary lp-btn--sm">Hire me</button>
      </nav>

      <section className="lp-port-hero">
        <div className="lp-port-avatar" style={{ width: 72, height: 72, fontSize: '1.5rem' }}>JD</div>
        <h1 className="lp-app-hero-h1" style={{ marginBottom: 8 }}>Hi, I'm Jane Doe 👋</h1>
        <p className="lp-app-hero-sub" style={{ marginBottom: 4 }}>Product designer crafting experiences that are beautiful, accessible, and impactful.</p>
        <p style={{ fontSize: '0.875rem', color: 'var(--hp-textMuted, #6b7280)', marginBottom: 20 }}>Currently @ Acme Co. · Previously Figma, Stripe</p>
        <div className="lp-app-hero-ctas">
          <button className="lp-btn lp-btn--primary">View my work</button>
          <button className="lp-btn lp-btn--ghost">Download CV</button>
        </div>
        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', marginTop: 16 }}>
          {[['Twitter', '@janedoe'], ['Dribbble', 'janedoe'], ['LinkedIn', 'janedoe']].map(([platform, handle], i) => (
            <a key={i} style={{ fontSize: '0.75rem', color: 'var(--hp-primary, #7c3aed)', cursor: 'pointer' }}>{platform}</a>
          ))}
        </div>
      </section>

      <section style={{ padding: '24px 28px', background: 'var(--hp-background, #fff)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
          <div className="lp-comp-label" style={{ margin: 0 }}>Selected Projects</div>
          <div style={{ display: 'flex', gap: 6 }}>
            {['All', 'UX', 'Product', 'Systems'].map((tag, i) => (
              <button key={i} className={`lp-chip ${i === 0 ? 'lp-chip--active' : ''}`}>{tag}</button>
            ))}
          </div>
        </div>
        <div className="lp-port-grid">
          {[
            { title: 'E-Commerce Redesign', tag: 'UX Design', year: '2024', icon: '🛒', color: 'var(--hp-primary, #7c3aed)' },
            { title: 'Mobile Banking App', tag: 'Product', year: '2024', icon: '🏦', color: 'var(--hp-secondary, #a855f7)' },
            { title: 'Brand Design System', tag: 'Systems', year: '2023', icon: '🎨', color: 'var(--hp-accent, #0ea5e9)' },
          ].map((p, i) => (
            <div key={i} className="lp-port-card">
              <div className="lp-port-img" style={{ background: p.color, height: 90, opacity: 0.85 }}>
                <span style={{ fontSize: '2.5rem' }}>{p.icon}</span>
              </div>
              <div className="lp-port-card-body">
                <div className="lp-port-card-title">{p.title}</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span className="lp-badge lp-badge--secondary" style={{ fontSize: '0.6875rem' }}>{p.tag}</span>
                  <span style={{ fontSize: '0.6875rem', color: 'var(--hp-textMuted, #9ca3af)' }}>{p.year}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ padding: '20px 28px 24px', background: 'var(--hp-surface, #f9fafb)', borderTop: '1.5px solid var(--hp-border, #e5e7eb)' }}>
        <div className="lp-comp-label" style={{ marginBottom: 12 }}>Skills & Tools</div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {['Figma', 'Prototyping', 'Design Systems', 'User Research', 'Framer', 'React', 'TypeScript', 'Accessibility'].map((skill, i) => (
            <span key={i} style={{ padding: '5px 12px', background: 'var(--hp-background, #fff)', border: '1.5px solid var(--hp-border, #e5e7eb)', borderRadius: 20, fontSize: '0.8125rem', color: 'var(--hp-text, #374151)', fontWeight: 500 }}>
              {skill}
            </span>
          ))}
        </div>
      </section>
    </div>
  )
}
