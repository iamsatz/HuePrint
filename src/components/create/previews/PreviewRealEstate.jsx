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
    { name: '12 Oak Lane', price: '$849,000', beds: '4 bd', baths: '3 ba', sqft: '2,400 sqft', emoji: '🏠', tag: 'New' },
    { name: '5 River View Dr', price: '$1.2M', beds: '5 bd', baths: '4 ba', sqft: '3,100 sqft', emoji: '🏡', tag: 'Featured' },
    { name: 'Apt 3B Maple St', price: '$425,000', beds: '2 bd', baths: '2 ba', sqft: '980 sqft', emoji: '🏢', tag: null },
  ]

  return (
    <div className="lp-page" ref={ref}>
      <nav className="lp-app-nav">
        <div className="lp-app-logo">◈ Estates</div>
        <div className="lp-app-nav-links">
          <a className="lp-app-nav-link lp-app-nav-link--active">Buy</a>
          <a className="lp-app-nav-link">Rent</a>
          <a className="lp-app-nav-link">Sell</a>
          <a className="lp-app-nav-link">Agents</a>
        </div>
        <button className="lp-btn lp-btn--primary lp-btn--sm">Sign In</button>
      </nav>

      <div style={{ padding: '14px 24px', background: 'var(--hp-surface, #f9fafb)', borderBottom: '1px solid var(--hp-border, #e5e7eb)', display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
        <input className="lp-input" placeholder="City, ZIP, or address" style={{ flex: 2, minWidth: 140 }} readOnly />
        <select className="lp-input" style={{ flex: 1, minWidth: 100, maxWidth: 130 }}>
          <option>Any price</option>
          <option>Under $500K</option>
          <option>$500K–$1M</option>
          <option>$1M+</option>
        </select>
        <select className="lp-input" style={{ flex: 1, minWidth: 90, maxWidth: 120 }}>
          <option>Any beds</option>
          <option>2+ beds</option>
          <option>3+ beds</option>
        </select>
        <select className="lp-input" style={{ flex: 1, minWidth: 90, maxWidth: 120 }}>
          <option>For Sale</option>
          <option>For Rent</option>
        </select>
        <button className="lp-btn lp-btn--primary lp-btn--sm">Search</button>
      </div>

      <div style={{ padding: '10px 24px', background: 'var(--hp-background, #fff)', borderBottom: '1px solid var(--hp-border, #e5e7eb)', display: 'flex', gap: 8, alignItems: 'center' }}>
        <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--hp-textMuted, #6b7280)' }}>Sort:</span>
        {['Best match', 'Price ↑', 'Price ↓', 'Newest'].map((opt, i) => (
          <button key={i} className={`lp-chip ${i === 0 ? 'lp-chip--active' : ''}`}>{opt}</button>
        ))}
      </div>

      <div className="lp-re-map-placeholder">
        <div className="lp-on-primary" style={{ fontSize: '0.8125rem', fontWeight: 600 }}>📍 Map View — San Francisco, CA</div>
        <div className="lp-on-primary-muted" style={{ fontSize: '0.75rem', marginTop: 4 }}>132 properties in this area</div>
      </div>

      <div style={{ padding: '20px 24px', background: 'var(--hp-background, #fff)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
          <div className="lp-comp-label" style={{ margin: 0 }}>132 properties near "San Francisco, CA"</div>
          <button className="lp-btn lp-btn--ghost lp-btn--sm">🗺 Map</button>
        </div>
        <div className="lp-re-grid">
          {properties.map((p, i) => (
            <div key={i} className="lp-re-card" style={{ position: 'relative' }}>
              {p.tag && (
                <div style={{ position: 'absolute', top: 8, left: 8, zIndex: 1, background: p.tag === 'New' ? 'var(--hp-success, #059669)' : 'var(--hp-primary, #7c3aed)', color: 'var(--hp-background, #fff)', fontSize: '0.6875rem', fontWeight: 700, padding: '2px 8px', borderRadius: 10 }}>
                  {p.tag}
                </div>
              )}
              <div className="lp-re-img" style={{ height: 100, position: 'relative', background: 'var(--hp-surface, #f9fafb)', fontSize: '3rem' }}>{p.emoji}</div>
              <div className="lp-re-body">
                <div className="lp-re-price">{p.price}</div>
                <div className="lp-re-name">{p.name}</div>
                <div className="lp-re-details">{p.beds} · {p.baths} · {p.sqft}</div>
                <div style={{ display: 'flex', gap: 6, marginTop: 8 }}>
                  <button className="lp-btn lp-btn--primary lp-btn--sm" style={{ flex: 1, fontSize: '0.75rem' }}>View</button>
                  <button className="lp-btn lp-btn--ghost lp-btn--sm" style={{ fontSize: '0.75rem' }}>♡</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="lp-re-mortgage-teaser">
          <div>
            <div style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--hp-text, #111827)', marginBottom: 2 }}>🏦 Mortgage Calculator</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--hp-textMuted, #6b7280)' }}>Est. $3,840/mo at 6.8% APR on $849K</div>
          </div>
          <button className="lp-btn lp-btn--primary lp-btn--sm">Calculate →</button>
        </div>
      </div>
    </div>
  )
}
