import React, { useRef, useEffect } from 'react'

export default function PreviewPricing({ kit }) {
  const ref = useRef(null)
  useEffect(() => {
    if (!ref.current || !kit) return
    const el = ref.current
    const palette = kit.palette.light
    const roles = ['background', 'surface', 'primary', 'secondary', 'accent', 'text', 'textMuted', 'border', 'success', 'warning']
    roles.forEach((role) => { if (palette[role]) el.style.setProperty(`--hp-${role}`, palette[role]) })
  }, [kit])
  if (!kit) return null

  const tiers = [
    { name: 'Free', price: '$0', period: '/mo', features: ['1 project', '5 exports', 'Community support'], cta: 'Get started', highlight: false },
    { name: 'Pro', price: '$19', period: '/mo', features: ['Unlimited projects', 'Priority exports', 'Email support', 'Custom domain'], cta: 'Start free trial', highlight: true },
    { name: 'Enterprise', price: 'Custom', period: '', features: ['Everything in Pro', 'SSO / SAML', 'SLA guarantee', 'Dedicated CSM'], cta: 'Contact sales', highlight: false },
  ]

  return (
    <div className="lp-page" ref={ref}>
      <nav className="lp-app-nav">
        <div className="lp-app-logo">◈ Brand</div>
        <div className="lp-app-nav-links">
          <a className="lp-app-nav-link">Features</a>
          <a className="lp-app-nav-link lp-app-nav-link--active">Pricing</a>
          <a className="lp-app-nav-link">Docs</a>
        </div>
      </nav>

      <div style={{ padding: '32px 24px', background: 'var(--hp-background, #fff)', textAlign: 'center' }}>
        <h2 className="lp-app-hero-h1" style={{ marginBottom: 8 }}>Simple, transparent pricing</h2>
        <p className="lp-app-hero-sub" style={{ marginBottom: 28 }}>No hidden fees. Cancel anytime.</p>
        <div className="lp-pricing-grid">
          {tiers.map((tier, i) => (
            <div key={i} className={`lp-pricing-card ${tier.highlight ? 'lp-pricing-card--highlight' : ''}`}>
              {tier.highlight && <div className="lp-pricing-badge">Most Popular</div>}
              <div className="lp-pricing-name">{tier.name}</div>
              <div className="lp-pricing-price">{tier.price}<span className="lp-pricing-period">{tier.period}</span></div>
              <ul className="lp-pricing-features">
                {tier.features.map((f, j) => (
                  <li key={j} className="lp-pricing-feature">✓ {f}</li>
                ))}
              </ul>
              <button className={`lp-btn ${tier.highlight ? 'lp-btn--primary' : 'lp-btn--ghost'} lp-btn--full`}>{tier.cta}</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
