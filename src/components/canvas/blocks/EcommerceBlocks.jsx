import React from 'react'

const PRODUCTS = [
  { name: 'Leather Tote Bag', price: '$129', original: '$159', emoji: '👜', badge: 'Sale' },
  { name: 'Wireless Headphones', price: '$89', emoji: '🎧', badge: 'New' },
  { name: 'Running Sneakers', price: '$110', emoji: '👟' },
  { name: 'Analog Watch', price: '$249', emoji: '⌚' },
  { name: 'Canvas Backpack', price: '$74', original: '$90', emoji: '🎒', badge: 'Sale' },
  { name: 'Ceramic Mug Set', price: '$38', emoji: '☕' },
]

const CATEGORIES = [
  { name: 'Bags', count: 24, emoji: '👜' },
  { name: 'Tech', count: 18, emoji: '🎧' },
  { name: 'Footwear', count: 31, emoji: '👟' },
  { name: 'Apparel', count: 45, emoji: '🧥' },
]

export function EcommerceNavBlock() {
  return (
    <nav className="cv-block" style={{ background: 'var(--hp-background)', borderBottom: '1px solid var(--hp-border)', padding: '0 20px', display: 'flex', alignItems: 'center', gap: 16, height: 46 }}>
      <div style={{ fontSize: '0.9375rem', fontWeight: 800, color: 'var(--hp-primary)' }}>◈ Shop</div>
      {['All', 'Bags', 'Tech', 'Apparel'].map((item, i) => (
        <div key={item} style={{ fontSize: '0.8125rem', fontWeight: i === 0 ? 600 : 400, color: i === 0 ? 'var(--hp-primary)' : 'var(--hp-textMuted)' }}>{item}</div>
      ))}
      <div style={{ marginLeft: 'auto', display: 'flex', gap: 8 }}>
        <input style={{ padding: '4px 10px', fontSize: '0.75rem', border: '1px solid var(--hp-border)', borderRadius: 6, background: 'var(--hp-surface)', width: 120 }} placeholder="Search…" readOnly />
        <button style={{ padding: '4px 10px', borderRadius: 6, border: '1px solid var(--hp-border)', background: 'var(--hp-surface)', fontSize: '0.75rem' }}>🛒 Cart (2)</button>
      </div>
    </nav>
  )
}

export function EcommerceBannerBlock({ variant = 'promo' }) {
  if (variant === 'categories') {
    return (
      <div className="cv-block" style={{ background: 'var(--hp-surface)', borderBottom: '1px solid var(--hp-border)', padding: '14px 20px' }}>
        <div style={{ fontSize: '0.625rem', fontWeight: 700, color: 'var(--hp-textMuted)', textTransform: 'uppercase', marginBottom: 10 }}>Browse categories</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
          {CATEGORIES.map((cat, i) => (
            <div key={cat.name} style={{ background: 'var(--hp-background)', border: '1px solid var(--hp-border)', borderRadius: 8, padding: '10px 12px', borderTop: i === 0 ? '2px solid var(--hp-primary)' : undefined }}>
              <div style={{ fontSize: '1.25rem', marginBottom: 4 }}>{cat.emoji}</div>
              <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--hp-text)' }}>{cat.name}</div>
              <div style={{ fontSize: '0.6rem', color: 'var(--hp-textMuted)' }}>{cat.count} items</div>
            </div>
          ))}
        </div>
      </div>
    )
  }
  if (variant === 'sale') {
    return (
      <div className="cv-block" style={{ background: 'var(--hp-warning)', padding: '10px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ fontSize: '0.875rem', fontWeight: 800, color: '#000' }}>Summer Sale — Up to 40% off</div>
        <button style={{ padding: '5px 14px', borderRadius: 6, border: 'none', background: '#000', color: '#fff', fontSize: '0.75rem', fontWeight: 700 }}>Shop now</button>
      </div>
    )
  }
  return (
    <div className="cv-block" style={{ background: 'linear-gradient(135deg, var(--hp-primary), var(--hp-secondary))', padding: '28px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <div>
        <div style={{ fontSize: '0.6875rem', fontWeight: 700, color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', marginBottom: 6 }}>Limited time</div>
        <h2 style={{ margin: '0 0 6px', fontSize: '1.375rem', fontWeight: 900, color: '#fff', fontFamily: 'var(--hp-heading-font)' }}>Up to 40% off<br />summer essentials</h2>
        <button style={{ padding: '7px 16px', borderRadius: 6, border: 'none', background: '#fff', color: 'var(--hp-primary)', fontSize: '0.8125rem', fontWeight: 700, marginTop: 10 }}>Shop the sale</button>
      </div>
      <div style={{ fontSize: '3rem', opacity: 0.5 }}>🏷️</div>
    </div>
  )
}

export function EcommerceFiltersBlock({ variant = 'chips' }) {
  if (variant === 'sidebar-filters') {
    return (
      <div className="cv-block" style={{ display: 'flex', padding: 16, gap: 16, background: 'var(--hp-background)' }}>
        <aside style={{ width: 140, flexShrink: 0 }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--hp-text)', marginBottom: 10 }}>Filters</div>
          {['Category', 'Price', 'Brand', 'Rating'].map((f) => (
            <div key={f} style={{ padding: '6px 0', fontSize: '0.75rem', color: 'var(--hp-textMuted)', borderBottom: '1px solid var(--hp-border)' }}>{f}</div>
          ))}
        </aside>
        <div style={{ flex: 1, fontSize: '0.75rem', color: 'var(--hp-textMuted)', padding: 20, background: 'var(--hp-surface)', borderRadius: 8, border: '1px solid var(--hp-border)', textAlign: 'center' }}>Product grid area →</div>
      </div>
    )
  }
  if (variant === 'dropdown') {
    return (
      <div className="cv-block" style={{ padding: '10px 20px', background: 'var(--hp-surface)', borderBottom: '1px solid var(--hp-border)', display: 'flex', gap: 10, alignItems: 'center' }}>
        {['Category', 'Price range', 'Sort by'].map((label) => (
          <select key={label} style={{ padding: '4px 10px', fontSize: '0.75rem', border: '1px solid var(--hp-border)', borderRadius: 6, background: 'var(--hp-background)', color: 'var(--hp-text)' }}>
            <option>{label}</option>
          </select>
        ))}
        <span style={{ marginLeft: 'auto', fontSize: '0.75rem', color: 'var(--hp-textMuted)' }}>48 products</span>
      </div>
    )
  }
  return (
    <div className="cv-block" style={{ padding: '10px 20px', background: 'var(--hp-surface)', borderBottom: '1px solid var(--hp-border)', display: 'flex', gap: 6, flexWrap: 'wrap', alignItems: 'center' }}>
      <span style={{ fontSize: '0.75rem', color: 'var(--hp-textMuted)', fontWeight: 600 }}>Filter:</span>
      {['All Items', 'Under $100', 'Sale', 'New Arrivals'].map((chip, i) => (
        <button key={chip} style={{ padding: '3px 10px', borderRadius: 20, fontSize: '0.75rem', fontWeight: i === 0 ? 700 : 500, border: i === 0 ? 'none' : '1px solid var(--hp-border)', background: i === 0 ? 'var(--hp-primary)' : 'var(--hp-background)', color: i === 0 ? '#fff' : 'var(--hp-textMuted)' }}>{chip}</button>
      ))}
    </div>
  )
}

export function EcommerceProductsBlock({ variant = 'four-col', config }) {
  const cols = Math.max(1, config?.columns || (variant === 'list' ? 1 : variant === 'three-col' ? 3 : 4))
  const pad = 'var(--cv-block-pad, 16px)'
  const items = variant === 'list' ? PRODUCTS.slice(0, 4) : PRODUCTS

  if (variant === 'list') {
    return (
      <div className="cv-block" style={{ padding: pad, background: 'var(--hp-background)' }}>
        {items.map((p) => (
          <div key={p.name} style={{ display: 'flex', gap: 14, padding: '12px 0', borderBottom: '1px solid var(--hp-border)' }}>
            <div style={{ width: 64, height: 64, borderRadius: 8, background: 'var(--hp-surface)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', flexShrink: 0 }}>{p.emoji}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--hp-text)' }}>{p.name}</div>
              <div style={{ fontSize: '0.8125rem', color: 'var(--hp-primary)', fontWeight: 700, marginTop: 4 }}>{p.price}</div>
            </div>
            <button style={{ padding: '6px 12px', borderRadius: 6, border: 'none', background: 'var(--hp-primary)', color: '#fff', fontSize: '0.75rem', fontWeight: 600, alignSelf: 'center' }}>Add</button>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="cv-block" style={{ padding: pad, background: 'var(--hp-background)' }}>
      <div style={{ display: 'grid', gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: 'var(--cv-block-gap, 12px)' }}>
        {items.map((p) => (
          <div key={p.name} style={{ background: 'var(--hp-surface)', border: '1px solid var(--hp-border)', borderRadius: 8, overflow: 'hidden' }}>
            <div style={{ height: 80, background: 'var(--hp-primary)', opacity: 0.1, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', position: 'relative' }}>
              {p.emoji}
              {p.badge && <span style={{ position: 'absolute', top: 6, right: 6, padding: '2px 6px', borderRadius: 4, fontSize: '0.6rem', fontWeight: 700, background: 'var(--hp-warning)', color: '#000' }}>{p.badge}</span>}
            </div>
            <div style={{ padding: '10px 12px' }}>
              <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--hp-text)', lineHeight: 1.3 }}>{p.name}</div>
              <div style={{ display: 'flex', gap: 6, alignItems: 'center', marginTop: 6 }}>
                <span style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--hp-primary)' }}>{p.price}</span>
                {p.original && <span style={{ fontSize: '0.75rem', color: 'var(--hp-textMuted)', textDecoration: 'line-through' }}>{p.original}</span>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
