import React, { useRef, useEffect } from 'react'

function applyKit(ref, kit) {
  if (!ref.current || !kit) return
  const el = ref.current
  const palette = kit.palette.light
  const roles = ['background', 'surface', 'primary', 'secondary', 'accent', 'text', 'textMuted', 'border', 'success', 'warning']
  roles.forEach((role) => {
    if (palette[role]) el.style.setProperty(`--hp-${role}`, palette[role])
  })
  if (kit.typography) {
    if (kit.typography.headingFont) el.style.setProperty('--hp-heading-font', `'${kit.typography.headingFont}', sans-serif`)
    if (kit.typography.bodyFont) el.style.setProperty('--hp-body-font', `'${kit.typography.bodyFont}', sans-serif`)
  }
}

export default function PreviewDashboard({ kit }) {
  const ref = useRef(null)
  useEffect(() => { applyKit(ref, kit) }, [kit])
  if (!kit) return null

  const chartBars = [55, 70, 45, 85, 65, 95, 80, 60, 75, 90, 50, 88]
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

  return (
    <div className="lp-page" ref={ref}>
      <div className="lp-dash">
        <aside className="lp-dash-sidebar">
          <div className="lp-dash-logo">◈ Acme</div>
          <nav className="lp-dash-nav">
            <a className="lp-dash-nav-item lp-dash-nav-item--active">Dashboard</a>
            <a className="lp-dash-nav-item">Analytics</a>
            <a className="lp-dash-nav-item">Users</a>
            <a className="lp-dash-nav-item">Projects</a>
            <a className="lp-dash-nav-item">Billing</a>
            <a className="lp-dash-nav-item">Settings</a>
          </nav>
          <div style={{ marginTop: 'auto', padding: '12px 0 0', borderTop: '1px solid var(--hp-border, #e5e7eb)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 10px' }}>
              <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'var(--hp-primary, #7c3aed)', color: 'var(--hp-background, #fff)', fontSize: '0.7rem', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>JD</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--hp-text, #111827)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>Jane Doe</div>
                <div style={{ fontSize: '0.625rem', color: 'var(--hp-textMuted, #9ca3af)' }}>Pro Plan</div>
              </div>
            </div>
          </div>
        </aside>
        <div className="lp-dash-main">
          <div className="lp-dash-topbar">
            <div>
              <h2 className="lp-dash-title">Dashboard</h2>
              <div style={{ fontSize: '0.75rem', color: 'var(--hp-textMuted, #9ca3af)', marginTop: 2 }}>Apr 1 – Apr 7, 2025</div>
            </div>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <select className="lp-input" style={{ fontSize: '0.8125rem', padding: '5px 10px', maxWidth: 130 }}>
                <option>Last 7 days</option>
                <option>Last 30 days</option>
                <option>This year</option>
              </select>
              <button className="lp-btn lp-btn--primary lp-btn--sm">+ New</button>
            </div>
          </div>

          <div className="lp-dash-stats">
            <div className="lp-stat lp-stat--primary">
              <div className="lp-stat-label">Revenue</div>
              <div className="lp-stat-value">$48,295</div>
              <div className="lp-stat-trend">↑ +12.4%</div>
            </div>
            <div className="lp-stat">
              <div className="lp-stat-label">Users</div>
              <div className="lp-stat-value">8,431</div>
              <div className="lp-stat-trend">↑ +5.2%</div>
            </div>
            <div className="lp-stat">
              <div className="lp-stat-label">Sessions</div>
              <div className="lp-stat-value">24.1K</div>
              <div className="lp-stat-trend">↑ +3.1%</div>
            </div>
            <div className="lp-stat">
              <div className="lp-stat-label">Bounce</div>
              <div className="lp-stat-value">38.2%</div>
              <div className="lp-stat-trend lp-stat-trend--down">↓ −1.4%</div>
            </div>
          </div>

          <div className="lp-analytics-chart-card" style={{ marginBottom: 14 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <div className="lp-comp-label" style={{ margin: 0 }}>Revenue — 2025</div>
              <div style={{ display: 'flex', gap: 6 }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: '0.6875rem', color: 'var(--hp-textMuted, #9ca3af)' }}>
                  <span style={{ width: 8, height: 8, borderRadius: 2, background: 'var(--hp-primary, #7c3aed)', display: 'inline-block' }} />
                  Revenue
                </span>
              </div>
            </div>
            <div className="lp-chart-bars" style={{ height: 72 }}>
              {chartBars.map((h, i) => (
                <div key={i} className="lp-chart-bar-col">
                  <div className="lp-chart-bar" style={{ height: `${h}%`, background: i === 11 ? 'var(--hp-secondary, #a855f7)' : 'var(--hp-primary, #7c3aed)', opacity: i === 11 ? 1 : 0.7 }} />
                  <div className="lp-chart-bar-label">{months[i].slice(0, 1)}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="lp-dash-feed-row">
            <div className="lp-dash-feed">
              <div className="lp-comp-label">Activity Feed</div>
              {[
                { text: 'User signed up', badge: '✓', type: 'primary', time: '1h ago' },
                { text: 'Plan upgraded to Pro', badge: '✓', type: 'success', time: '2h ago' },
                { text: 'New support ticket', badge: '!', type: 'warning', time: '3h ago' },
                { text: 'Invoice paid — $204', badge: '✓', type: 'primary', time: '4h ago' },
              ].map((item, i) => (
                <div key={i} className="lp-dash-feed-item">
                  <span className={`lp-badge lp-badge--${item.type}`} style={{ fontSize: '0.6rem', padding: '2px 5px' }}>{item.badge}</span>
                  <span className="lp-dash-feed-text">{item.text}</span>
                  <span className="lp-dash-feed-time">{item.time}</span>
                </div>
              ))}
            </div>
            <div className="lp-dash-table-wrap">
              <div className="lp-comp-label">Recent Orders</div>
              <table className="lp-table">
                <thead>
                  <tr>
                    <th>Customer</th>
                    <th>Amount</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['Alice M.', '$120', 'Paid'],
                    ['Bob K.', '$89', 'Pending'],
                    ['Carol L.', '$204', 'Paid'],
                    ['David S.', '$55', 'Refunded'],
                  ].map(([name, amt, status], i) => (
                    <tr key={i}>
                      <td style={{ fontWeight: 600, color: 'var(--hp-text, #111827)' }}>{name}</td>
                      <td>{amt}</td>
                      <td>
                        <span className={`lp-badge ${status === 'Paid' ? 'lp-badge--success' : status === 'Pending' ? 'lp-badge--warning' : ''}`}
                          style={status === 'Refunded' ? { background: 'var(--hp-surface, #f3f4f6)', color: 'var(--hp-textMuted, #6b7280)', fontSize: '0.7rem' } : { fontSize: '0.7rem' }}>
                          {status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
