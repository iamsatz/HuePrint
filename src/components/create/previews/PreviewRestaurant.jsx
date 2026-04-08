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

  const starters = [
    { name: 'Burrata & Tomato', desc: 'Fresh burrata, heirloom tomatoes, basil oil', price: '$14' },
    { name: 'Soup du Jour', desc: "Chef's daily creation", price: '$10' },
  ]
  const mains = [
    { name: 'Grilled Salmon', desc: 'Lemon caper butter, seasonal vegetables', price: '$28' },
    { name: 'Truffle Risotto', desc: 'Arborio rice, black truffle, parmesan', price: '$24' },
    { name: 'NY Strip Steak', desc: '8oz, fries, chimichurri', price: '$38' },
  ]

  return (
    <div className="lp-page" ref={ref}>
      <div className="lp-restaurant-hero">
        <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff' }}>🍽 La Maison</div>
        <p style={{ color: 'var(--hp-background, #fff)', opacity: 0.8, fontSize: '0.875rem', margin: '8px 0 16px' }}>Fine dining in the heart of the city</p>
        <button className="lp-btn" style={{ background: '#fff', color: 'var(--hp-primary, #7c3aed)', border: '2px solid #fff' }}>Reserve a Table</button>
      </div>

      <div style={{ padding: '24px', background: 'var(--hp-background, #fff)' }}>
        <div className="lp-comp-label" style={{ marginBottom: 12 }}>Starters</div>
        {starters.map((item, i) => (
          <div key={i} className="lp-menu-item">
            <div>
              <div className="lp-menu-name">{item.name}</div>
              <div className="lp-menu-desc">{item.desc}</div>
            </div>
            <div className="lp-menu-price">{item.price}</div>
          </div>
        ))}

        <div className="lp-comp-label" style={{ marginBottom: 12, marginTop: 20 }}>Mains</div>
        {mains.map((item, i) => (
          <div key={i} className="lp-menu-item">
            <div>
              <div className="lp-menu-name">{item.name}</div>
              <div className="lp-menu-desc">{item.desc}</div>
            </div>
            <div className="lp-menu-price">{item.price}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
