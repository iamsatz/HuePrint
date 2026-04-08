import React, { useRef, useEffect } from 'react'

export default function PreviewAnalytics({ kit }) {
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

  const chartBars = [40, 65, 50, 80, 60, 90, 75]
  const chartBars2 = [30, 50, 45, 70, 55, 80, 65]
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

  const topPages = [
    { page: '/dashboard', views: '24,812', change: '+8.4%', up: true },
    { page: '/pricing', views: '18,391', change: '+12.1%', up: true },
    { page: '/docs/intro', views: '11,204', change: '-3.2%', up: false },
    { page: '/blog', views: '9,847', change: '+5.7%', up: true },
  ]

  return (
    <div className="lp-page" ref={ref}>
      <nav className="lp-app-nav">
        <div className="lp-app-logo">◈ Analytics</div>
        <div className="lp-app-nav-links">
          <a className="lp-app-nav-link lp-app-nav-link--active">Overview</a>
          <a className="lp-app-nav-link">Reports</a>
          <a className="lp-app-nav-link">Funnels</a>
          <a className="lp-app-nav-link">Audiences</a>
        </div>
        <button className="lp-btn lp-btn--ghost lp-btn--sm">Export</button>
      </nav>

      <div style={{ padding: '12px 24px', background: 'var(--hp-surface, #f9fafb)', borderBottom: '1px solid var(--hp-border, #e5e7eb)', display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
        <span style={{ fontSize: '0.75rem', color: 'var(--hp-textMuted, #6b7280)' }}>Date range:</span>
        {['7 days', '30 days', '90 days', 'Custom'].map((opt, i) => (
          <button key={i} className={`lp-chip ${i === 0 ? 'lp-chip--active' : ''}`}>{opt}</button>
        ))}
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--hp-success, #10b981)', display: 'inline-block' }} />
          <span style={{ fontSize: '0.75rem', color: 'var(--hp-textMuted, #6b7280)' }}>Live · 142 active now</span>
        </div>
      </div>

      <div style={{ padding: '20px 24px', background: 'var(--hp-background, #fff)' }}>
        <div className="lp-dash-stats" style={{ marginBottom: 16 }}>
          <div className="lp-stat lp-stat--primary">
            <div className="lp-stat-label">Page Views</div>
            <div className="lp-stat-value">128.4K</div>
            <div className="lp-stat-trend">↑ +18.2%</div>
          </div>
          <div className="lp-stat">
            <div className="lp-stat-label">Unique Visitors</div>
            <div className="lp-stat-value">42.1K</div>
            <div className="lp-stat-trend">↑ +7.4%</div>
          </div>
          <div className="lp-stat">
            <div className="lp-stat-label">Avg Session</div>
            <div className="lp-stat-value">3m 42s</div>
            <div className="lp-stat-trend">↑ +0.8%</div>
          </div>
          <div className="lp-stat">
            <div className="lp-stat-label">Bounce Rate</div>
            <div className="lp-stat-value">36.7%</div>
            <div className="lp-stat-trend lp-stat-trend--down">↓ −2.1%</div>
          </div>
        </div>

        <div className="lp-analytics-charts">
          <div className="lp-analytics-chart-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <div className="lp-comp-label" style={{ margin: 0 }}>Page Views</div>
              <span style={{ fontSize: '0.6875rem', color: 'var(--hp-textMuted, #9ca3af)' }}>Last 7 days</span>
            </div>
            <div className="lp-chart-bars">
              {chartBars.map((h, i) => (
                <div key={i} className="lp-chart-bar-col">
                  <div className="lp-chart-bar" style={{ height: `${h}%`, background: 'var(--hp-primary, #7c3aed)' }} />
                  <div className="lp-chart-bar-label">{days[i].slice(0, 1)}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="lp-analytics-chart-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <div className="lp-comp-label" style={{ margin: 0 }}>Unique Visitors</div>
              <span style={{ fontSize: '0.6875rem', color: 'var(--hp-textMuted, #9ca3af)' }}>Last 7 days</span>
            </div>
            <div className="lp-chart-bars">
              {chartBars2.map((h, i) => (
                <div key={i} className="lp-chart-bar-col">
                  <div className="lp-chart-bar" style={{ height: `${h}%`, background: 'var(--hp-secondary, #a855f7)' }} />
                  <div className="lp-chart-bar-label">{days[i].slice(0, 1)}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lp-comp-label" style={{ marginTop: 20, marginBottom: 8 }}>Top Pages</div>
        <div className="lp-card">
          <table className="lp-table" style={{ width: '100%' }}>
            <thead>
              <tr>
                <th>Page</th>
                <th>Views</th>
                <th>Change</th>
              </tr>
            </thead>
            <tbody>
              {topPages.map((row, i) => (
                <tr key={i}>
                  <td style={{ color: 'var(--hp-primary, #7c3aed)', fontSize: '0.8125rem', fontFamily: 'monospace' }}>{row.page}</td>
                  <td style={{ fontWeight: 600, color: 'var(--hp-text, #111827)' }}>{row.views}</td>
                  <td>
                    <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: row.up ? 'var(--hp-success, #059669)' : 'var(--hp-warning, #f59e0b)' }}>
                      {row.change}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
