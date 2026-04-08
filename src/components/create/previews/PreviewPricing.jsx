import React, { useRef, useEffect } from 'react'

export default function PreviewPricing({ kit }) {
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

  const tiers = [
    {
      name: 'Free', price: '$0', period: '/mo', highlight: false, cta: 'Get started',
      features: ['1 project', '5 token exports / mo', 'Community support', 'CSS variables export'],
    },
    {
      name: 'Pro', price: '$19', period: '/mo', highlight: true, cta: 'Start free trial',
      features: ['Unlimited projects', 'Unlimited exports', 'Priority support', 'Tailwind + JSON export', 'Custom domain', 'Team sharing'],
    },
    {
      name: 'Enterprise', price: 'Custom', period: '', highlight: false, cta: 'Contact sales',
      features: ['Everything in Pro', 'SSO / SAML', 'SLA guarantee', 'Dedicated CSM', 'Audit log', 'Custom contracts'],
    },
  ]

  return (
    <div className="lp-page" ref={ref}>
      <nav className="lp-app-nav">
        <div className="lp-app-logo">◈ Brand</div>
        <div className="lp-app-nav-links">
          <a className="lp-app-nav-link">Features</a>
          <a className="lp-app-nav-link lp-app-nav-link--active">Pricing</a>
          <a className="lp-app-nav-link">Docs</a>
          <a className="lp-app-nav-link">Blog</a>
        </div>
        <button className="lp-btn lp-btn--primary lp-btn--sm">Sign in</button>
      </nav>

      <div style={{ padding: '28px 24px 8px', background: 'var(--hp-background, #fff)', textAlign: 'center' }}>
        <div className="lp-app-hero-eyebrow" style={{ marginBottom: 10 }}>Pricing</div>
        <h2 className="lp-app-hero-h1" style={{ marginBottom: 8, fontSize: '1.625rem' }}>Simple, transparent pricing</h2>
        <p className="lp-app-hero-sub" style={{ marginBottom: 16 }}>No hidden fees. Start free, upgrade when you need more.</p>

        <div className="lp-pricing-toggle">
          <button className="lp-pricing-toggle-btn lp-pricing-toggle-btn--active">Monthly</button>
          <button className="lp-pricing-toggle-btn">
            Annual <span className="lp-pricing-save-badge">Save 20%</span>
          </button>
        </div>
      </div>

      <div style={{ padding: '0 24px 24px', background: 'var(--hp-background, #fff)' }}>
        <div className="lp-pricing-grid">
          {tiers.map((tier, i) => (
            <div key={i} className={`lp-pricing-card ${tier.highlight ? 'lp-pricing-card--highlight' : ''}`}>
              {tier.highlight && <div className="lp-pricing-badge">Most Popular</div>}
              <div className="lp-pricing-name">{tier.name}</div>
              <div className="lp-pricing-price">{tier.price}<span className="lp-pricing-period">{tier.period}</span></div>
              <ul className="lp-pricing-features">
                {tier.features.map((f, j) => (
                  <li key={j} className="lp-pricing-feature">
                    <span style={{ color: 'var(--hp-success, #059669)', marginRight: 6 }}>✓</span>{f}
                  </li>
                ))}
              </ul>
              <button className={`lp-btn ${tier.highlight ? 'lp-btn--primary' : 'lp-btn--ghost'} lp-btn--full`}>{tier.cta}</button>
            </div>
          ))}
        </div>
      </div>

      <div className="lp-pricing-faq">
        <div className="lp-comp-label" style={{ marginBottom: 12 }}>Frequently Asked</div>
        {[
          ['Can I cancel anytime?', 'Yes, you can cancel your subscription at any time. No questions asked.'],
          ['Is there a free trial?', 'Pro plan comes with a 14-day free trial. No credit card required.'],
        ].map(([q, a], i) => (
          <div key={i} className="lp-pricing-faq-item">
            <div style={{ fontWeight: 700, fontSize: '0.875rem', color: 'var(--hp-text, #111827)', marginBottom: 4 }}>{q}</div>
            <div style={{ fontSize: '0.8125rem', color: 'var(--hp-textMuted, #6b7280)' }}>{a}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
