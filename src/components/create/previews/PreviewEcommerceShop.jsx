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
    { name: 'Leather Tote Bag', price: '$129', emoji: '👜' },
    { name: 'Wireless Headphones', price: '$89', emoji: '🎧' },
    { name: 'Running Sneakers', price: '$110', emoji: '👟' },
    { name: 'Analog Watch', price: '$249', emoji: '⌚' },
    { name: 'Sunglasses', price: '$65', emoji: '🕶️' },
    { name: 'Canvas Backpack', price: '$74', emoji: '🎒' },
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
        <button className="lp-btn lp-btn--ghost lp-btn--sm">🛒 Cart (0)</button>
      </nav>

      <div style={{ padding: '20px 24px', background: 'var(--hp-background, #fff)' }}>
        <div className="lp-comp-label" style={{ marginBottom: 16 }}>48 Products</div>
        <div className="lp-shop-grid">
          {products.map((p, i) => (
            <div key={i} className="lp-shop-card">
              <div className="lp-shop-img">{p.emoji}</div>
              <div className="lp-shop-card-body">
                <div className="lp-shop-name">{p.name}</div>
                <div className="lp-shop-price">{p.price}</div>
                <button className="lp-btn lp-btn--primary lp-btn--sm lp-btn--full">Add to cart</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
