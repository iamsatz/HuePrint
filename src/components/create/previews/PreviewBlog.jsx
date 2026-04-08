import React, { useRef, useEffect } from 'react'

export default function PreviewBlog({ kit }) {
  const ref = useRef(null)
  useEffect(() => {
    if (!ref.current || !kit) return
    const el = ref.current
    const palette = kit.palette.light
    const roles = ['background', 'surface', 'primary', 'secondary', 'accent', 'text', 'textMuted', 'border', 'success', 'warning']
    roles.forEach((role) => { if (palette[role]) el.style.setProperty(`--hp-${role}`, palette[role]) })
  }, [kit])
  if (!kit) return null

  const posts = [
    { title: 'Getting Started with Design Tokens', date: 'Apr 3, 2025', tag: 'Design' },
    { title: 'How to Build a Color System', date: 'Mar 21, 2025', tag: 'Tutorial' },
    { title: 'Typography Hierarchy That Works', date: 'Mar 10, 2025', tag: 'Typography' },
  ]

  return (
    <div className="lp-page" ref={ref}>
      <nav className="lp-app-nav">
        <div className="lp-app-logo">◈ Blog</div>
        <div className="lp-app-nav-links">
          <a className="lp-app-nav-link lp-app-nav-link--active">Articles</a>
          <a className="lp-app-nav-link">Topics</a>
          <a className="lp-app-nav-link">About</a>
        </div>
      </nav>

      <div className="lp-blog-hero">
        <div className="lp-app-hero-eyebrow">Design & Development</div>
        <h1 className="lp-app-hero-h1">Thoughts on craft,<br />design & code</h1>
      </div>

      <div className="lp-blog-list">
        {posts.map((post, i) => (
          <div key={i} className="lp-blog-card">
            <div className="lp-blog-card-img">{['✍️', '🎨', '🔤'][i]}</div>
            <div className="lp-blog-card-body">
              <div className="lp-blog-meta">
                <span className="lp-badge lp-badge--secondary">{post.tag}</span>
                <span className="lp-blog-date">{post.date}</span>
              </div>
              <div className="lp-blog-title">{post.title}</div>
              <div className="lp-blog-excerpt">A concise look at the key principles and patterns that make this topic essential for modern product teams.</div>
              <a className="lp-blog-read-more">Read more →</a>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
