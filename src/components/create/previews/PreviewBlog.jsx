import React, { useRef, useEffect } from 'react'

export default function PreviewBlog({ kit }) {
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

  const posts = [
    { title: 'Getting Started with Design Tokens', date: 'Apr 3, 2025', tag: 'Design', author: 'Maya Chen', readTime: '5 min' },
    { title: 'How to Build a Color System from Scratch', date: 'Mar 21, 2025', tag: 'Tutorial', author: 'Alex Park', readTime: '8 min' },
    { title: 'Typography Hierarchy That Actually Works', date: 'Mar 10, 2025', tag: 'Typography', author: 'Sam Rivera', readTime: '6 min' },
  ]

  return (
    <div className="lp-page" ref={ref}>
      <nav className="lp-app-nav">
        <div className="lp-app-logo">◈ Blog</div>
        <div className="lp-app-nav-links">
          <a className="lp-app-nav-link lp-app-nav-link--active">Articles</a>
          <a className="lp-app-nav-link">Topics</a>
          <a className="lp-app-nav-link">Newsletter</a>
          <a className="lp-app-nav-link">About</a>
        </div>
        <input className="lp-input" placeholder="Search articles…" readOnly style={{ width: 140, padding: '5px 10px', fontSize: '0.8125rem' }} />
      </nav>

      <div className="lp-blog-hero">
        <div className="lp-app-hero-eyebrow">Design & Development</div>
        <h1 className="lp-app-hero-h1">Thoughts on craft,<br />design & code</h1>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 14 }}>
          {['All', 'Design', 'Tutorial', 'Typography', 'Systems'].map((tag, i) => (
            <button key={i} className={`lp-chip ${i === 0 ? 'lp-chip--active' : ''}`}>{tag}</button>
          ))}
        </div>
      </div>

      <div className="lp-blog-featured">
        <div className="lp-blog-featured-img">✍️</div>
        <div className="lp-blog-featured-body">
          <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
            <span className="lp-badge lp-badge--primary" style={{ fontSize: '0.6875rem' }}>Featured</span>
            <span className="lp-badge lp-badge--secondary" style={{ fontSize: '0.6875rem' }}>Design</span>
          </div>
          <div style={{ fontSize: '1.125rem', fontWeight: 800, color: 'var(--hp-text, #111827)', marginBottom: 6, lineHeight: 1.3 }}>
            The Complete Guide to Design Token Architecture
          </div>
          <div style={{ fontSize: '0.8125rem', color: 'var(--hp-textMuted, #6b7280)', marginBottom: 10, lineHeight: 1.5 }}>
            A deep dive into how top companies structure their design tokens — from naming conventions to multi-brand theming.
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--hp-textMuted, #9ca3af)' }}>Maya Chen · Apr 10 · 12 min read</span>
            <a className="lp-blog-read-more">Read article →</a>
          </div>
        </div>
      </div>

      <div className="lp-blog-list">
        {posts.map((post, i) => (
          <div key={i} className="lp-blog-card">
            <div className="lp-blog-card-img">{['🎨', '🔤', '🛠️'][i]}</div>
            <div className="lp-blog-card-body">
              <div className="lp-blog-meta">
                <span className="lp-badge lp-badge--secondary" style={{ fontSize: '0.6875rem' }}>{post.tag}</span>
                <span className="lp-blog-date">{post.date}</span>
                <span className="lp-blog-date">· {post.readTime} read</span>
              </div>
              <div className="lp-blog-title">{post.title}</div>
              <div className="lp-blog-excerpt">A concise look at the key principles and patterns that make this topic essential for modern product teams building at scale.</div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--hp-textMuted, #9ca3af)' }}>{post.author}</span>
                <a className="lp-blog-read-more">Read more →</a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
