import React, { useRef, useEffect } from 'react'

export default function PreviewDocumentation({ kit }) {
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
        <div className="lp-app-logo">◈ Docs</div>
        <div className="lp-app-nav-links">
          <a className="lp-app-nav-link lp-app-nav-link--active">Guides</a>
          <a className="lp-app-nav-link">API Reference</a>
          <a className="lp-app-nav-link">Changelog</a>
        </div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <input className="lp-input" placeholder="Search docs…" readOnly style={{ width: 130, padding: '5px 10px', fontSize: '0.8125rem' }} />
          <span className="lp-badge" style={{ background: 'var(--hp-surface, #f9fafb)', color: 'var(--hp-textMuted, #6b7280)', border: '1px solid var(--hp-border, #e5e7eb)', fontSize: '0.6875rem' }}>v2.4.1</span>
        </div>
      </nav>

      <div className="lp-docs-layout">
        <aside className="lp-docs-sidebar">
          <div className="lp-comp-label">Getting Started</div>
          {['Introduction', 'Installation', 'Quick Start', 'Configuration'].map((item, i) => (
            <a key={i} className={`lp-docs-link ${i === 0 ? 'lp-docs-link--active' : ''}`}>{item}</a>
          ))}
          <div className="lp-comp-label" style={{ marginTop: 16 }}>Concepts</div>
          {['Design Tokens', 'Color Roles', 'Typography', 'Spacing Scale'].map((item, i) => (
            <a key={i} className="lp-docs-link">{item}</a>
          ))}
          <div className="lp-comp-label" style={{ marginTop: 16 }}>Guides</div>
          {['Theming', 'Dark Mode', 'Exporting'].map((item, i) => (
            <a key={i} className="lp-docs-link">{item}</a>
          ))}
        </aside>
        <div className="lp-docs-content">
          <div className="lp-docs-breadcrumbs">
            <a style={{ color: 'var(--hp-primary, #7c3aed)', cursor: 'pointer' }}>Docs</a>
            <span style={{ margin: '0 6px' }}>›</span>
            <a style={{ color: 'var(--hp-primary, #7c3aed)', cursor: 'pointer' }}>Getting Started</a>
            <span style={{ margin: '0 6px' }}>›</span>
            <strong>Introduction</strong>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
            <h2 className="lp-settings-title" style={{ margin: 0 }}>Introduction</h2>
            <span className="lp-badge lp-badge--success" style={{ fontSize: '0.6875rem' }}>Updated</span>
          </div>

          <p className="lp-docs-p">Welcome to the documentation. This guide will help you get up and running with our design system in under 5 minutes.</p>
          <p className="lp-docs-p">Design tokens are the foundational building blocks of your visual language — the raw values of your design decisions expressed as named entities.</p>

          <div className="lp-docs-code-block">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
              <span className="lp-code-comment" style={{ fontSize: '0.6875rem' }}>tailwind.config.js</span>
              <span className="lp-code-comment" style={{ fontSize: '0.6875rem', cursor: 'pointer' }}>Copy</span>
            </div>
            <span className="lp-code-comment">{'// tailwind.config.js'}</span>{'\n'}
            <span style={{ color: 'var(--hp-primary, #7c3aed)' }}>module</span>
            <span className="lp-code-punctuation">.exports = {'{'}</span>{'\n'}
            {'  '}
            <span className="lp-code-keyword">theme</span>
            <span className="lp-code-punctuation">: {'{'}</span>{'\n'}
            {'    '}
            <span className="lp-code-keyword">extend</span>
            <span className="lp-code-punctuation">: {'{'} colors: {'{'}</span>{'\n'}
            {'      '}
            <span className="lp-code-string">primary</span>
            <span className="lp-code-punctuation">: </span>
            <span style={{ color: 'var(--hp-success, #10b981)' }}>'var(--hp-primary)'</span>{'\n'}
            {'    }}}}'}{'\n'}
            {'}'}
          </div>

          <div className="lp-docs-callout">
            <span style={{ color: 'var(--hp-primary, #7c3aed)', fontWeight: 700, marginRight: 6 }}>💡 Tip:</span>
            <span>Use CSS variables for runtime theming — swap themes without rebuilding your app.</span>
          </div>

          <p className="lp-docs-p">Next, install the package and import the base styles into your root layout file.</p>

          <div style={{ display: 'flex', gap: 10, marginTop: 16, paddingTop: 16, borderTop: '1px solid var(--hp-border, #e5e7eb)', justifyContent: 'space-between' }}>
            <button className="lp-btn lp-btn--ghost lp-btn--sm">← Previous</button>
            <button className="lp-btn lp-btn--primary lp-btn--sm">Next: Installation →</button>
          </div>

          <div style={{ marginTop: 20, padding: '14px 16px', background: 'var(--hp-surface, #f9fafb)', borderRadius: 10, border: '1px solid var(--hp-border, #e5e7eb)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '0.8125rem', color: 'var(--hp-textMuted, #6b7280)' }}>Was this page helpful?</span>
            <div style={{ display: 'flex', gap: 8 }}>
              <button className="lp-btn lp-btn--ghost lp-btn--sm">👍 Yes</button>
              <button className="lp-btn lp-btn--ghost lp-btn--sm">👎 No</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
