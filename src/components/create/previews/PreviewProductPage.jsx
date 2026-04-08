import React, { useRef, useEffect } from 'react'

export default function PreviewProductPage({ kit }) {
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
        <div className="lp-app-logo">◈ Shop</div>
        <div className="lp-app-nav-links">
          <a className="lp-app-nav-link">All Products</a>
          <a className="lp-app-nav-link">Bags</a>
          <a className="lp-app-nav-link">Tech</a>
        </div>
        <button className="lp-btn lp-btn--ghost lp-btn--sm">🛒 Cart (1)</button>
      </nav>

      <div style={{ padding: '8px 24px', background: 'var(--hp-surface, #f9fafb)', borderBottom: '1px solid var(--hp-border, #e5e7eb)', fontSize: '0.75rem', color: 'var(--hp-textMuted, #6b7280)' }}>
        <a style={{ cursor: 'pointer', color: 'var(--hp-primary, #7c3aed)' }}>Home</a>
        <span style={{ margin: '0 6px' }}>›</span>
        <a style={{ cursor: 'pointer', color: 'var(--hp-primary, #7c3aed)' }}>Bags</a>
        <span style={{ margin: '0 6px' }}>›</span>
        <span>Premium Leather Tote</span>
      </div>

      <div className="lp-product-layout">
        <div className="lp-product-img-wrap">
          <div className="lp-product-img" style={{ background: 'var(--hp-surface, #f9fafb)', height: 180 }}>👜</div>
          <div className="lp-product-thumbs">
            {['👜', '🔍', '📦', '🏷️'].map((e, i) => (
              <div key={i} className={`lp-product-thumb ${i === 0 ? 'lp-product-thumb--active' : ''}`}>{e}</div>
            ))}
          </div>
        </div>
        <div className="lp-product-info">
          <div className="lp-comp-label">Bags / Leather</div>
          <h2 className="lp-product-title">Premium Leather Tote</h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
            <div className="lp-product-price">$129.00</div>
            <span style={{ fontSize: '0.75rem', color: 'var(--hp-textMuted, #6b7280)', textDecoration: 'line-through' }}>$159.00</span>
            <span className="lp-badge lp-badge--warning" style={{ fontSize: '0.6875rem' }}>19% OFF</span>
          </div>
          <div className="lp-product-rating">★★★★☆ <span style={{ color: 'var(--hp-textMuted)' }}>(42 reviews)</span></div>

          <div style={{ margin: '10px 0 6px', fontSize: '0.8125rem', fontWeight: 600, color: 'var(--hp-text, #111827)' }}>Color</div>
          <div style={{ display: 'flex', gap: 6, marginBottom: 10 }}>
            {['Tan', 'Black', 'Cognac'].map((c, i) => (
              <button key={i} className={`lp-btn lp-btn--ghost lp-btn--sm ${i === 0 ? 'lp-product-thumb--active' : ''}`} style={{ fontSize: '0.75rem', padding: '4px 10px' }}>{c}</button>
            ))}
          </div>

          <div className="lp-product-specs">
            <div className="lp-product-spec"><span>Material</span><span>Full-grain leather</span></div>
            <div className="lp-product-spec"><span>Dimensions</span><span>14" × 11" × 5"</span></div>
            <div className="lp-product-spec"><span>Ships in</span><span>2–3 business days</span></div>
            <div className="lp-product-spec"><span>Stock</span><span style={{ color: 'var(--hp-success, #059669)', fontWeight: 700 }}>In stock (8 left)</span></div>
          </div>

          <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
            <button className="lp-btn lp-btn--primary" style={{ flex: 1 }}>Add to Cart</button>
            <button className="lp-btn lp-btn--ghost">♡</button>
          </div>

          <div style={{ marginTop: 12, padding: '10px 12px', background: 'var(--hp-surface, #f9fafb)', borderRadius: 8, border: '1px solid var(--hp-border, #e5e7eb)', fontSize: '0.75rem', color: 'var(--hp-textMuted, #6b7280)', display: 'flex', gap: 6, alignItems: 'center' }}>
            <span style={{ color: 'var(--hp-success, #059669)' }}>✓</span> Free returns within 30 days
          </div>
        </div>
      </div>

      <div style={{ padding: '16px 24px', background: 'var(--hp-background, #fff)', borderTop: '1px solid var(--hp-border, #e5e7eb)' }}>
        <div className="lp-comp-label" style={{ marginBottom: 10 }}>Top Reviews</div>
        {[
          { author: 'Sarah K.', rating: '★★★★★', text: 'Absolutely beautiful bag. The leather quality is outstanding.' },
          { author: 'Michael R.', rating: '★★★★☆', text: 'Great bag, very spacious. Shipping was fast.' },
        ].map((rev, i) => (
          <div key={i} style={{ padding: '10px 0', borderBottom: i === 0 ? '1px solid var(--hp-border, #e5e7eb)' : 'none' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
              <span style={{ fontWeight: 700, fontSize: '0.875rem', color: 'var(--hp-text, #111827)' }}>{rev.author}</span>
              <span style={{ color: 'var(--hp-warning, #f59e0b)', fontSize: '0.8125rem' }}>{rev.rating}</span>
            </div>
            <p style={{ margin: 0, fontSize: '0.8125rem', color: 'var(--hp-textMuted, #6b7280)' }}>{rev.text}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
