import React from 'react'

const POSTS = [
  { title: 'Getting Started with Design Tokens', date: 'Apr 3, 2025', tag: 'Design', author: 'Maya Chen', readTime: '5 min', emoji: '🎨', excerpt: 'A foundational guide to naming, grouping, and applying design tokens.' },
  { title: 'How to Build a Color System from Scratch', date: 'Mar 21, 2025', tag: 'Tutorial', author: 'Alex Park', readTime: '8 min', emoji: '🔤', excerpt: 'Start with primitives, define semantics, and ship a maintainable color system.' },
  { title: 'Typography Hierarchy That Works', date: 'Mar 10, 2025', tag: 'Typography', author: 'Sam Rivera', readTime: '6 min', emoji: '🛠️', excerpt: 'The practical approach to type scales, pairing, and responsive sizing.' },
]

export function BlogNavBlock() {
  return (
    <nav className="cv-block" style={{ background: 'var(--hp-background)', borderBottom: '1px solid var(--hp-border)', padding: '0 20px', display: 'flex', alignItems: 'center', gap: 16, height: 46 }}>
      <div style={{ fontSize: '0.9375rem', fontWeight: 800, color: 'var(--hp-primary)' }}>◈ Blog</div>
      {['Articles', 'Topics', 'Newsletter', 'About'].map((item, i) => (
        <div key={item} style={{ fontSize: '0.8125rem', fontWeight: i === 0 ? 600 : 400, color: i === 0 ? 'var(--hp-primary)' : 'var(--hp-textMuted)' }}>{item}</div>
      ))}
      <input style={{ marginLeft: 'auto', padding: '4px 10px', fontSize: '0.75rem', border: '1px solid var(--hp-border)', borderRadius: 6, background: 'var(--hp-surface)', width: 130 }} placeholder="Search…" readOnly />
    </nav>
  )
}

export function BlogHeaderBlock({ variant = 'hero', config }) {
  const title = config?.title?.trim()
  const pad = 'var(--cv-block-pad, 24px)'
  if (variant === 'masthead') {
    return (
      <div className="cv-block" style={{ background: 'var(--hp-surface)', borderBottom: '2px solid var(--hp-text)', padding: `${pad} ${pad}` }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 12 }}>
          <h1 style={{ margin: 0, fontSize: 'calc(1.75rem * var(--cv-block-scale, 1))', fontWeight: 900, color: 'var(--hp-text)', fontFamily: 'var(--hp-heading-font)' }}>{title || 'The Design Brief'}</h1>
          <div style={{ fontSize: '0.75rem', color: 'var(--hp-textMuted)' }}>Vol. 12 · Apr 2025</div>
        </div>
        <div style={{ height: 2, background: 'var(--hp-text)', marginBottom: 10 }} />
        <div style={{ display: 'flex', gap: 12 }}>
          {['All Topics', 'Design', 'Tutorial', 'Typography'].map((tag, i) => (
            <div key={tag} style={{ fontSize: '0.75rem', fontWeight: i === 0 ? 700 : 400, color: i === 0 ? 'var(--hp-text)' : 'var(--hp-textMuted)', borderBottom: i === 0 ? '2px solid var(--hp-primary)' : '2px solid transparent', paddingBottom: 2 }}>{tag}</div>
          ))}
        </div>
      </div>
    )
  }
  if (variant === 'featured') {
    return (
      <div className="cv-block" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', borderBottom: '1px solid var(--hp-border)' }}>
        <div style={{ background: 'var(--hp-text)', padding: pad }}>
          <div style={{ fontSize: '0.625rem', fontWeight: 700, color: 'var(--hp-accent)', textTransform: 'uppercase', marginBottom: 8 }}>Featured</div>
          <h2 style={{ margin: '0 0 8px', fontSize: 'calc(1.125rem * var(--cv-block-scale, 1))', fontWeight: 800, color: '#fff', fontFamily: 'var(--hp-heading-font)' }}>{title || 'The Complete Guide to Design Token Architecture'}</h2>
          <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.55)' }}>Maya Chen · Apr 10 · 12 min</div>
        </div>
        <div style={{ padding: 20, background: 'var(--hp-background)' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--hp-text)', marginBottom: 10 }}>Latest</div>
          {POSTS.map((p, i) => (
            <div key={i} style={{ padding: '6px 0', borderBottom: i < POSTS.length - 1 ? '1px solid var(--hp-border)' : 'none' }}>
              <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--hp-text)' }}>{p.title}</div>
              <div style={{ fontSize: '0.625rem', color: 'var(--hp-textMuted)' }}>{p.date}</div>
            </div>
          ))}
        </div>
      </div>
    )
  }
  return (
    <div className="cv-block" style={{ background: 'var(--hp-primary)', padding: `${pad} ${pad}`, textAlign: 'center' }}>
      <div style={{ fontSize: '0.6875rem', fontWeight: 700, color: 'rgba(255,255,255,0.65)', textTransform: 'uppercase', marginBottom: 8 }}>Design & Development</div>
      <h1 style={{ margin: '0 0 10px', fontSize: 'calc(1.5rem * var(--cv-block-scale, 1))', fontWeight: 900, color: '#fff', fontFamily: 'var(--hp-heading-font)' }}>{title || 'Thoughts on craft, design & code'}</h1>
      <p style={{ margin: 0, fontSize: '0.875rem', color: 'rgba(255,255,255,0.75)', maxWidth: 360, marginLeft: 'auto', marginRight: 'auto' }}>In-depth articles on design systems and developer workflows.</p>
    </div>
  )
}

export function BlogGridBlock({ variant = 'three-col', config }) {
  const cols = Math.max(1, config?.columns || (variant === 'magazine' ? 2 : 3))
  const pad = 'var(--cv-block-pad, 16px)'
  if (variant === 'featured-list') {
    return (
      <div className="cv-block" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, padding: 16, background: 'var(--hp-background)' }}>
        <div style={{ background: 'var(--hp-surface)', border: '1px solid var(--hp-border)', borderRadius: 8, overflow: 'hidden' }}>
          <div style={{ height: 110, background: 'var(--hp-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem' }}>✍️</div>
          <div style={{ padding: 12 }}>
            <div style={{ fontSize: '0.9375rem', fontWeight: 700, color: 'var(--hp-text)', fontFamily: 'var(--hp-heading-font)' }}>{POSTS[0].title}</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--hp-textMuted)', marginTop: 6 }}>{POSTS[0].excerpt}</div>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {POSTS.slice(1).map((p) => (
            <div key={p.title} style={{ padding: '10px 12px', background: 'var(--hp-surface)', border: '1px solid var(--hp-border)', borderRadius: 8 }}>
              <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--hp-text)' }}>{p.title}</div>
              <div style={{ fontSize: '0.6875rem', color: 'var(--hp-textMuted)', marginTop: 2 }}>{p.date} · {p.readTime}</div>
            </div>
          ))}
        </div>
      </div>
    )
  }
  if (variant === 'magazine') {
    return (
      <div className="cv-block" style={{ padding: 16, background: 'var(--hp-background)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 12 }}>
          <div style={{ background: 'var(--hp-surface)', border: '1px solid var(--hp-border)', borderRadius: 8, padding: 16 }}>
            <span style={{ fontSize: '0.625rem', fontWeight: 700, color: 'var(--hp-primary)' }}>{POSTS[0].tag}</span>
            <div style={{ fontSize: '1.125rem', fontWeight: 800, color: 'var(--hp-text)', fontFamily: 'var(--hp-heading-font)', margin: '8px 0' }}>{POSTS[0].title}</div>
            <div style={{ fontSize: '0.8125rem', color: 'var(--hp-textMuted)' }}>{POSTS[0].excerpt}</div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {POSTS.slice(1).map((p) => (
              <div key={p.title} style={{ padding: 10, background: 'var(--hp-surface)', border: '1px solid var(--hp-border)', borderRadius: 8, fontSize: '0.8125rem', fontWeight: 600, color: 'var(--hp-text)' }}>{p.title}</div>
            ))}
          </div>
        </div>
      </div>
    )
  }
  return (
    <div className="cv-block" style={{ display: 'grid', gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: 'var(--cv-block-gap, 12px)', padding: pad, background: 'var(--hp-background)' }}>
      {POSTS.map((post, i) => (
        <div key={i} style={{ background: 'var(--hp-surface)', border: '1px solid var(--hp-border)', borderRadius: 8, overflow: 'hidden' }}>
          <div style={{ height: 72, background: 'var(--hp-primary)', opacity: 0.15 + i * 0.1, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem' }}>{post.emoji}</div>
          <div style={{ padding: '10px 12px' }}>
            <span style={{ padding: '1px 6px', borderRadius: 4, fontSize: '0.6rem', fontWeight: 700, background: 'rgba(124,58,237,0.1)', color: 'var(--hp-primary)' }}>{post.tag}</span>
            <div style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--hp-text)', marginTop: 6, fontFamily: 'var(--hp-heading-font)' }}>{post.title}</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--hp-textMuted)', marginTop: 4 }}>{post.excerpt}</div>
          </div>
        </div>
      ))}
    </div>
  )
}

export function BlogSidebarBlock({ variant = 'tags-recent' }) {
  if (variant === 'newsletter') {
    return (
      <div className="cv-block" style={{ padding: 20, background: 'var(--hp-surface)', borderTop: '1px solid var(--hp-border)' }}>
        <div style={{ maxWidth: 400, margin: '0 auto', textAlign: 'center', padding: 20, background: 'var(--hp-primary)', borderRadius: 12, color: '#fff' }}>
          <div style={{ fontSize: '1rem', fontWeight: 800, fontFamily: 'var(--hp-heading-font)', marginBottom: 6 }}>Subscribe to the newsletter</div>
          <div style={{ fontSize: '0.8125rem', opacity: 0.85, marginBottom: 14 }}>Weekly design systems tips. No spam.</div>
          <div style={{ display: 'flex', gap: 8 }}>
            <input style={{ flex: 1, padding: '8px 12px', borderRadius: 8, border: 'none', fontSize: '0.8125rem' }} placeholder="you@email.com" readOnly />
            <button style={{ padding: '8px 16px', borderRadius: 8, border: 'none', background: '#fff', color: 'var(--hp-primary)', fontWeight: 700, fontSize: '0.8125rem' }}>Join</button>
          </div>
        </div>
      </div>
    )
  }
  if (variant === 'author') {
    return (
      <div className="cv-block" style={{ padding: 20, background: 'var(--hp-background)', borderTop: '1px solid var(--hp-border)' }}>
        <div style={{ display: 'flex', gap: 14, alignItems: 'center', maxWidth: 480, margin: '0 auto' }}>
          <div style={{ width: 52, height: 52, borderRadius: '50%', background: 'var(--hp-primary)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, flexShrink: 0 }}>MC</div>
          <div>
            <div style={{ fontSize: '0.9375rem', fontWeight: 700, color: 'var(--hp-text)', fontFamily: 'var(--hp-heading-font)' }}>Maya Chen</div>
            <div style={{ fontSize: '0.8125rem', color: 'var(--hp-textMuted)', marginTop: 4 }}>Design systems lead. Writing about tokens, typography, and craft.</div>
          </div>
        </div>
      </div>
    )
  }
  return (
    <div className="cv-block" style={{ padding: 16, background: 'var(--hp-surface)', borderTop: '1px solid var(--hp-border)' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, maxWidth: 560, margin: '0 auto' }}>
        <div>
          <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--hp-text)', marginBottom: 10 }}>Popular tags</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {['Design', 'Tutorial', 'Typography', 'Systems', 'Color'].map((t) => (
              <span key={t} style={{ padding: '3px 8px', borderRadius: 20, fontSize: '0.6875rem', background: 'var(--hp-background)', border: '1px solid var(--hp-border)', color: 'var(--hp-textMuted)' }}>{t}</span>
            ))}
          </div>
        </div>
        <div>
          <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--hp-text)', marginBottom: 10 }}>Recent posts</div>
          {POSTS.map((p) => (
            <div key={p.title} style={{ fontSize: '0.75rem', color: 'var(--hp-textMuted)', padding: '4px 0', borderBottom: '1px solid var(--hp-border)' }}>{p.title}</div>
          ))}
        </div>
      </div>
    </div>
  )
}
