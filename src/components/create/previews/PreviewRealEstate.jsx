import React, { useRef, useEffect } from 'react'

export default function PreviewRealEstate({ kit }) {
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

  const properties = [
    { name: '12 Oak Lane', price: '$849,000', beds: '4 bd', baths: '3 ba', sqft: '2,400 sqft', emoji: '🏠' },
    { name: '5 River View', price: '$1.2M', beds: '5 bd', baths: '4 ba', sqft: '3,100 sqft', emoji: '🏡' },
    { name: 'Apt 3B Maple', price: '$425,000', beds: '2 bd', baths: '2 ba', sqft: '980 sqft', emoji: '🏢' },
  ]

  return (
    <div className="lp-page" ref={ref}>
      <nav className="lp-app-nav">
        <div className="lp-app-logo">◈ Estates</div>
        <div className="lp-app-nav-links">
          <a className="lp-app-nav-link lp-app-nav-link--active">Buy</a>
          <a className="lp-app-nav-link">Rent</a>
          <a className="lp-app-nav-link">Sell</a>
        </div>
        <button className="lp-btn lp-btn--primary lp-btn--sm">Sign In</button>
      </nav>

      <div style={{ padding: '16px 24px', background: 'var(--hp-surface, #f9fafb)', borderBottom: '1px solid var(--hp-border, #e5e7eb)', display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <input className="lp-input" placeholder="City, ZIP, or address" style={{ flex: 1, minWidth: 140 }} readOnly />
        <select className="lp-input" style={{ maxWidth: 120 }}>
          <option>Any price</option>
        </select>
        <select className="lp-input" style={{ maxWidth: 120 }}>
          <option>Any beds</option>
        </select>
        <button className="lp-btn lp-btn--primary lp-btn--sm">Search</button>
      </div>

      <div style={{ padding: '20px 24px', background: 'var(--hp-background, #fff)' }}>
        <div className="lp-comp-label" style={{ marginBottom: 16 }}>132 properties near "San Francisco, CA"</div>
        <div className="lp-re-grid">
          {properties.map((p, i) => (
            <div key={i} className="lp-re-card">
              <div className="lp-re-img">{p.emoji}</div>
              <div className="lp-re-body">
                <div className="lp-re-price">{p.price}</div>
                <div className="lp-re-name">{p.name}</div>
                <div className="lp-re-details">{p.beds} · {p.baths} · {p.sqft}</div>
                <button className="lp-btn lp-btn--ghost lp-btn--sm" style={{ marginTop: 10 }}>View Details</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
