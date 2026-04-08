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

  return (
    <div className="lp-page" ref={ref}>
      <div className="lp-dash">
        <aside className="lp-dash-sidebar">
          <div className="lp-dash-logo">◈ Acme</div>
          <nav className="lp-dash-nav">
            <a className="lp-dash-nav-item lp-dash-nav-item--active">Dashboard</a>
            <a className="lp-dash-nav-item">Analytics</a>
            <a className="lp-dash-nav-item">Users</a>
            <a className="lp-dash-nav-item">Settings</a>
          </nav>
        </aside>
        <div className="lp-dash-main">
          <div className="lp-dash-topbar">
            <h2 className="lp-dash-title">Dashboard</h2>
            <button className="lp-btn lp-btn--primary lp-btn--sm">+ New</button>
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
          <div className="lp-dash-feed-row">
            <div className="lp-dash-feed">
              <div className="lp-comp-label">Activity Feed</div>
              {['User signed up', 'Plan upgraded to Pro', 'New support ticket', 'Invoice paid'].map((item, i) => (
                <div key={i} className="lp-dash-feed-item">
                  <span className="lp-badge lp-badge--primary" style={{ fontSize: '0.65rem' }}>{i === 2 ? '!' : '✓'}</span>
                  <span className="lp-dash-feed-text">{item}</span>
                  <span className="lp-dash-feed-time">{i + 1}h ago</span>
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
                  ].map(([name, amt, status], i) => (
                    <tr key={i}>
                      <td>{name}</td>
                      <td>{amt}</td>
                      <td><span className={`lp-badge ${status === 'Paid' ? 'lp-badge--success' : 'lp-badge--warning'}`}>{status}</span></td>
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
