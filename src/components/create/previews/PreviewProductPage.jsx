import React, { useRef, useEffect } from 'react'

export default function PreviewProductPage({ kit }) {
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
        <div className="lp-app-logo">◈ Shop</div>
        <div className="lp-app-nav-links">
          <a className="lp-app-nav-link">All Products</a>
          <a className="lp-app-nav-link">Bags</a>
        </div>
        <button className="lp-btn lp-btn--ghost lp-btn--sm">🛒 Cart</button>
      </nav>

      <div className="lp-product-layout">
        <div className="lp-product-img-wrap">
          <div className="lp-product-img">👜</div>
          <div className="lp-product-thumbs">
            {['👜', '🔍', '📦'].map((e, i) => (
              <div key={i} className={`lp-product-thumb ${i === 0 ? 'lp-product-thumb--active' : ''}`}>{e}</div>
            ))}
          </div>
        </div>
        <div className="lp-product-info">
          <div className="lp-comp-label">Bags / Leather</div>
          <h2 className="lp-product-title">Premium Leather Tote</h2>
          <div className="lp-product-price">$129.00</div>
          <div className="lp-product-rating">★★★★☆ <span style={{ color: 'var(--hp-textMuted)' }}>(42 reviews)</span></div>

          <div className="lp-product-specs">
            <div className="lp-product-spec"><span>Material</span><span>Full-grain leather</span></div>
            <div className="lp-product-spec"><span>Color</span><span>Tan / Black</span></div>
            <div className="lp-product-spec"><span>Ships in</span><span>2–3 business days</span></div>
          </div>

          <div className="lp-app-hero-ctas" style={{ justifyContent: 'flex-start', marginTop: 16 }}>
            <button className="lp-btn lp-btn--primary">Add to Cart</button>
            <button className="lp-btn lp-btn--ghost">Save to Wishlist</button>
          </div>
        </div>
      </div>
    </div>
  )
}
