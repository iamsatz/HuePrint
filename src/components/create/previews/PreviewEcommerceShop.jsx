import React, { useRef, useEffect } from 'react'

export default function PreviewEcommerceShop({ kit }) {
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

  const products = [
    { name: 'Leather Tote Bag', price: '$129', original: '$159', emoji: '👜', badge: 'Sale' },
    { name: 'Wireless Headphones', price: '$89', original: null, emoji: '🎧', badge: null },
    { name: 'Running Sneakers', price: '$110', original: null, emoji: '👟', badge: 'New' },
    { name: 'Analog Watch', price: '$249', original: null, emoji: '⌚', badge: null },
    { name: 'Aviator Sunglasses', price: '$65', original: null, emoji: '🕶️', badge: null },
    { name: 'Canvas Backpack', price: '$74', original: '$90', emoji: '🎒', badge: 'Sale' },
  ]

  return (
    <div className="lp-page" ref={ref}>
      <nav className="lp-app-nav">
        <div className="lp-app-logo">◈ Shop</div>
        <div className="lp-app-nav-links">
          <a className="lp-app-nav-link lp-app-nav-link--active">All</a>
          <a className="lp-app-nav-link">Bags</a>
          <a className="lp-app-nav-link">Tech</a>
          <a className="lp-app-nav-link">Apparel</a>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <input className="lp-input" placeholder="Search…" readOnly style={{ width: 120, padding: '5px 10px', fontSize: '0.8125rem' }} />
          <button className="lp-btn lp-btn--ghost lp-btn--sm">🛒 Cart (2)</button>
        </div>
      </nav>

      <div style={{ padding: '12px 24px', background: 'var(--hp-surface, #f9fafb)', borderBottom: '1px solid var(--hp-border, #e5e7eb)', display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
        <span style={{ fontSize: '0.75rem', color: 'var(--hp-textMuted, #6b7280)', fontWeight: 600 }}>Filter:</span>
        {['All Items', 'Under $100', '$100–$200', 'Sale', 'New Arrivals'].map((chip, i) => (
          <button key={i} className={`lp-chip ${i === 0 ? 'lp-chip--active' : ''}`}>{chip}</button>
        ))}
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 8, alignItems: 'center' }}>
          <span style={{ fontSize: '0.75rem', color: 'var(--hp-textMuted, #6b7280)' }}>48 products</span>
          <select className="lp-input" style={{ padding: '4px 8px', fontSize: '0.8125rem', maxWidth: 130 }}>
            <option>Sort: Featured</option>
            <option>Price: Low–High</option>
            <option>Best sellers</option>
          </select>
        </div>
      </div>

      <div style={{ padding: '20px 24px', background: 'var(--hp-background, #fff)' }}>
        <div className="lp-shop-grid">
          {products.map((p, i) => (
            <div key={i} className="lp-shop-card" style={{ position: 'relative' }}>
              {p.badge && (
                <div className="lp-shop-badge" style={{ background: p.badge === 'Sale' ? 'var(--hp-warning, #f59e0b)' : 'var(--hp-success, #059669)' }}>
                  {p.badge}
                </div>
              )}
              <div className="lp-shop-img">{p.emoji}</div>
              <div className="lp-shop-card-body">
                <div className="lp-shop-name">{p.name}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <div className="lp-shop-price">{p.price}</div>
                  {p.original && <div style={{ fontSize: '0.75rem', color: 'var(--hp-textMuted, #9ca3af)', textDecoration: 'line-through' }}>{p.original}</div>}
                </div>
                <div style={{ fontSize: '0.6875rem', color: 'var(--hp-warning, #f59e0b)', marginBottom: 4 }}>★★★★☆</div>
                <button className="lp-btn lp-btn--primary lp-btn--sm lp-btn--full">Add to cart</button>
              </div>
            </div>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: 20 }}>
          <button className="lp-btn lp-btn--ghost">Load more products</button>
        </div>
      </div>
    </div>
  )
}
