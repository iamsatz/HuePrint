import React, { useRef, useEffect } from 'react'

export default function PreviewAnalytics({ kit }) {
  const ref = useRef(null)
  useEffect(() => {
    if (!ref.current || !kit) return
    const el = ref.current
    const palette = kit.palette.light
    const roles = ['background', 'surface', 'primary', 'secondary', 'accent', 'text', 'textMuted', 'border', 'success', 'warning']
    roles.forEach((role) => { if (palette[role]) el.style.setProperty(`--hp-${role}`, palette[role]) })
  }, [kit])
  if (!kit) return null

  const chartBars = [40, 65, 50, 80, 60, 90, 75]
  const chartBars2 = [30, 50, 45, 70, 55, 80, 65]

  return (
    <div className="lp-page" ref={ref}>
      <nav className="lp-app-nav">
        <div className="lp-app-logo">◈ Analytics</div>
        <div className="lp-app-nav-links">
          <a className="lp-app-nav-link lp-app-nav-link--active">Overview</a>
          <a className="lp-app-nav-link">Reports</a>
          <a className="lp-app-nav-link">Funnels</a>
        </div>
        <button className="lp-btn lp-btn--ghost lp-btn--sm">Export</button>
      </nav>

      <div style={{ padding: '20px 24px', background: 'var(--hp-background, #fff)' }}>
        <div className="lp-dash-stats">
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
            <div className="lp-comp-label" style={{ marginBottom: 12 }}>Page Views — Last 7 Days</div>
            <div className="lp-chart-bars">
              {chartBars.map((h, i) => (
                <div key={i} className="lp-chart-bar-col">
                  <div className="lp-chart-bar" style={{ height: `${h}%`, background: 'var(--hp-primary, #7c3aed)' }} />
                  <div className="lp-chart-bar-label">{['M', 'T', 'W', 'T', 'F', 'S', 'S'][i]}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="lp-analytics-chart-card">
            <div className="lp-comp-label" style={{ marginBottom: 12 }}>Unique Visitors — Last 7 Days</div>
            <div className="lp-chart-bars">
              {chartBars2.map((h, i) => (
                <div key={i} className="lp-chart-bar-col">
                  <div className="lp-chart-bar" style={{ height: `${h}%`, background: 'var(--hp-secondary, #a855f7)' }} />
                  <div className="lp-chart-bar-label">{['M', 'T', 'W', 'T', 'F', 'S', 'S'][i]}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lp-comp-label" style={{ marginTop: 20, marginBottom: 10 }}>Activity Log</div>
        {['Spike in traffic from Twitter', 'Campaign "Spring Launch" ended', 'A/B test variant B winning'].map((item, i) => (
          <div key={i} className="lp-dash-feed-item">
            <span className="lp-badge lp-badge--primary" style={{ fontSize: '0.65rem' }}>ℹ</span>
            <span className="lp-dash-feed-text">{item}</span>
            <span className="lp-dash-feed-time">{i + 1}h ago</span>
          </div>
        ))}
      </div>
    </div>
  )
}
