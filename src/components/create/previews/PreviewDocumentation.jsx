import React, { useRef, useEffect } from 'react'

export default function PreviewDocumentation({ kit }) {
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
    <div className="lp-page" ref={ref}>
      <nav className="lp-app-nav">
        <div className="lp-app-logo">◈ Docs</div>
        <div className="lp-app-nav-links">
          <a className="lp-app-nav-link lp-app-nav-link--active">Guides</a>
          <a className="lp-app-nav-link">API Reference</a>
          <a className="lp-app-nav-link">Changelog</a>
        </div>
        <button className="lp-btn lp-btn--ghost lp-btn--sm">Search</button>
      </nav>

      <div className="lp-docs-layout">
        <aside className="lp-docs-sidebar">
          <div className="lp-comp-label">Getting Started</div>
          {['Introduction', 'Installation', 'Quick Start', 'Configuration'].map((item, i) => (
            <a key={i} className={`lp-docs-link ${i === 0 ? 'lp-docs-link--active' : ''}`}>{item}</a>
          ))}
          <div className="lp-comp-label" style={{ marginTop: 16 }}>Concepts</div>
          {['Design Tokens', 'Color Roles', 'Typography'].map((item, i) => (
            <a key={i} className="lp-docs-link">{item}</a>
          ))}
        </aside>
        <div className="lp-docs-content">
          <div className="lp-docs-breadcrumbs">Docs / Getting Started / <strong>Introduction</strong></div>
          <h2 className="lp-settings-title">Introduction</h2>
          <p className="lp-docs-p">Welcome to the documentation. This guide will help you get up and running with our design system in minutes.</p>
          <p className="lp-docs-p">Design tokens are the foundational building blocks of your visual language. They represent the raw values of your design decisions — colors, spacing, typography — as named entities.</p>
          <div className="lp-docs-code-block">
            <span style={{ color: '#9ca3af' }}>{'// tailwind.config.js'}</span>{'\n'}
            <span style={{ color: 'var(--hp-primary)' }}>module</span>.exports = {'{'}{'\n'}
            {'  '}theme: {'{'} extend: {'{'} colors: {'{'} primary: <span style={{ color: '#10b981' }}>'#7c3aed'</span> {'}'} {'}'} {'}'}{'\n'}
            {'}'}
          </div>
          <div style={{ display: 'flex', gap: 10, marginTop: 20 }}>
            <button className="lp-btn lp-btn--ghost lp-btn--sm">← Previous</button>
            <button className="lp-btn lp-btn--primary lp-btn--sm">Next: Installation →</button>
          </div>
        </div>
      </div>
    </div>
  )
}
