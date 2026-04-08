import React, { useRef, useEffect } from 'react'

export default function PreviewRestaurant({ kit }) {
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

  const menu = {
    Starters: [
      { name: 'Burrata & Tomato', desc: 'Fresh burrata, heirloom tomatoes, basil oil', price: '$14', popular: true },
      { name: 'Soup du Jour', desc: "Chef's daily creation with house-baked bread", price: '$10', popular: false },
    ],
    Mains: [
      { name: 'Grilled Salmon', desc: 'Lemon caper butter, seasonal vegetables, potato gratin', price: '$28', popular: true },
      { name: 'Truffle Risotto', desc: 'Arborio rice, black truffle, aged parmesan', price: '$24', popular: false },
      { name: 'NY Strip Steak', desc: '8oz prime cut, hand-cut fries, chimichurri sauce', price: '$38', popular: false },
    ],
    Desserts: [
      { name: 'Crème Brûlée', desc: 'Classic French custard with fresh berries', price: '$12', popular: false },
    ],
  }

  return (
    <div className="lp-page" ref={ref}>
      <div className="lp-restaurant-hero">
        <div className="lp-on-primary" style={{ fontSize: '1.625rem', fontWeight: 800, letterSpacing: '-0.03em' }}>🍽 La Maison</div>
        <p className="lp-on-primary-muted" style={{ fontSize: '0.875rem', margin: '6px 0 4px' }}>Fine dining · Downtown · Open until 10pm</p>
        <div style={{ display: 'flex', gap: 6, justifyContent: 'center', margin: '6px 0 16px' }}>
          <span className="lp-on-primary-chip">⭐ 4.8 (312 reviews)</span>
          <span className="lp-on-primary-chip">🏆 Michelin Bib</span>
        </div>
        <button className="lp-btn lp-btn--surface-on-primary" style={{ fontWeight: 700 }}>Reserve a Table</button>
      </div>

      <div style={{ padding: '12px 24px', background: 'var(--hp-surface, #f9fafb)', borderBottom: '1px solid var(--hp-border, #e5e7eb)', display: 'flex', gap: 8, overflowX: 'auto' }}>
        {Object.keys(menu).map((cat, i) => (
          <button key={i} className={`lp-chip ${i === 0 ? 'lp-chip--active' : ''}`}>{cat}</button>
        ))}
        <button className="lp-chip">Wine List</button>
        <button className="lp-chip">Cocktails</button>
      </div>

      <div style={{ padding: '20px 24px', background: 'var(--hp-background, #fff)' }}>
        {Object.entries(menu).map(([category, items]) => (
          <div key={category} style={{ marginBottom: 20 }}>
            <div className="lp-comp-label" style={{ marginBottom: 10 }}>{category}</div>
            {items.map((item, i) => (
              <div key={i} className="lp-menu-item">
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 2 }}>
                    <div className="lp-menu-name">{item.name}</div>
                    {item.popular && <span className="lp-badge" style={{ background: 'var(--hp-warning, #fef3c7)', color: 'var(--hp-text, #374151)', fontSize: '0.6rem', padding: '1px 6px' }}>Chef's Pick</span>}
                  </div>
                  <div className="lp-menu-desc">{item.desc}</div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 6, flexShrink: 0 }}>
                  <div className="lp-menu-price">{item.price}</div>
                  <button className="lp-btn lp-btn--primary lp-btn--sm" style={{ fontSize: '0.7rem', padding: '3px 10px' }}>+ Add</button>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>

      <div style={{ position: 'sticky', bottom: 0, background: 'var(--hp-surface, #f9fafb)', borderTop: '1.5px solid var(--hp-border, #e5e7eb)', padding: '12px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--hp-text, #111827)' }}>Your order (3 items)</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--hp-textMuted, #6b7280)' }}>Subtotal: $66.00</div>
        </div>
        <button className="lp-btn lp-btn--primary">View Cart →</button>
      </div>
    </div>
  )
}
