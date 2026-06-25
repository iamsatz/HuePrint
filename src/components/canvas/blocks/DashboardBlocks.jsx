import React from 'react'

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const BAR_HEIGHTS = [55, 70, 45, 85, 65, 95, 80, 60, 75, 90, 50, 88]
const SPARK_DATA = [30, 50, 40, 70, 55, 80, 65]
const ACTIVITY = [
  { text: 'User signed up', badge: '✓', type: 'primary', time: '1h ago' },
  { text: 'Plan upgraded to Pro', badge: '✓', type: 'success', time: '2h ago' },
  { text: 'New support ticket opened', badge: '!', type: 'warning', time: '3h ago' },
  { text: 'Invoice paid — $204', badge: '✓', type: 'primary', time: '4h ago' },
]
const ORDERS = [
  ['Alice M.', '$120', 'Paid'],
  ['Bob K.', '$89', 'Pending'],
  ['Carol L.', '$204', 'Paid'],
  ['David S.', '$55', 'Refunded'],
]
const QUICK_ACTIONS = [
  { label: 'Create invoice', icon: '📄', desc: 'Send a new invoice' },
  { label: 'Add user', icon: '👤', desc: 'Invite a team member' },
  { label: 'Run report', icon: '📊', desc: 'Generate a report' },
  { label: 'Export data', icon: '📦', desc: 'Download CSV' },
]

export function DashboardNavBlock({ variant = 'topbar' }) {
  if (variant === 'sidebar-dark') {
    return (
      <aside className="cv-block cv-block--nav" style={{ width: '100%', background: 'var(--hp-text, #111827)', display: 'flex', flexDirection: 'column', padding: '14px 0' }}>
        <div style={{ padding: '0 14px 12px', fontSize: '1rem', fontWeight: 800, color: '#fff' }}>◈ Acme</div>
        <nav>
          {['Dashboard', 'Analytics', 'Users', 'Projects', 'Billing', 'Settings'].map((item, i) => (
            <div key={item} style={{
              padding: '7px 14px', fontSize: '0.8125rem', fontWeight: i === 0 ? 600 : 400,
              background: i === 0 ? 'rgba(255,255,255,0.12)' : 'transparent',
              color: i === 0 ? '#fff' : 'rgba(255,255,255,0.55)',
              borderLeft: i === 0 ? '3px solid var(--hp-primary)' : '3px solid transparent',
            }}>{item}</div>
          ))}
        </nav>
      </aside>
    )
  }
  if (variant === 'sidebar-light') {
    return (
      <aside className="cv-block cv-block--nav" style={{ width: '100%', background: 'var(--hp-surface)', borderBottom: '1px solid var(--hp-border)', display: 'flex', flexDirection: 'column', padding: '14px 0' }}>
        <div style={{ padding: '0 14px 12px', fontSize: '1rem', fontWeight: 800, color: 'var(--hp-primary)' }}>◈ Acme</div>
        <nav>
          {['Dashboard', 'Analytics', 'Users', 'Projects', 'Billing', 'Settings'].map((item, i) => (
            <div key={item} style={{
              padding: '7px 14px', fontSize: '0.8125rem', fontWeight: i === 0 ? 600 : 400,
              color: i === 0 ? 'var(--hp-primary)' : 'var(--hp-textMuted)',
              borderLeft: i === 0 ? '3px solid var(--hp-primary)' : '3px solid transparent',
            }}>{item}</div>
          ))}
        </nav>
      </aside>
    )
  }
  return (
    <div className="cv-block cv-block--nav" style={{ background: 'var(--hp-background)', borderBottom: '1px solid var(--hp-border)', padding: '0 20px', display: 'flex', alignItems: 'center', gap: 16, height: 48 }}>
      <div style={{ fontSize: '0.9375rem', fontWeight: 800, color: 'var(--hp-primary)', marginRight: 8 }}>◈ Acme</div>
      {['Dashboard', 'Analytics', 'Users', 'Projects', 'Billing'].map((item, i) => (
        <div key={item} style={{
          fontSize: '0.8125rem', fontWeight: i === 0 ? 600 : 400,
          color: i === 0 ? 'var(--hp-primary)' : 'var(--hp-textMuted)',
          borderBottom: i === 0 ? '2px solid var(--hp-primary)' : '2px solid transparent',
          padding: '0 4px', height: '100%', display: 'flex', alignItems: 'center',
        }}>{item}</div>
      ))}
      <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 8 }}>
        <input style={{ padding: '4px 8px', fontSize: '0.75rem', border: '1px solid var(--hp-border)', borderRadius: 6, background: 'var(--hp-surface)', color: 'var(--hp-text)', width: 120 }} placeholder="Search…" readOnly />
        <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'var(--hp-primary)', color: '#fff', fontSize: '0.7rem', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>JD</div>
      </div>
    </div>
  )
}

export function DashboardStatsBlock({ variant = 'metric-cards', config }) {
  const cols = Math.max(1, config?.columns || 4)
  const pad = 'var(--cv-block-pad, 16px)'
  if (variant === 'sparklines') {
    return (
      <div className="cv-block cv-block--stats" style={{ display: 'grid', gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: 'var(--cv-block-gap, 10px)', padding: pad }}>
        {[
          { label: 'Revenue', value: '$48,295', color: 'var(--hp-primary)', data: [40, 55, 45, 70, 60, 80, 75] },
          { label: 'Users', value: '8,431', color: 'var(--hp-secondary)', data: [60, 50, 65, 55, 70, 65, 80] },
          { label: 'Sessions', value: '24.1K', color: 'var(--hp-accent)', data: [30, 45, 35, 60, 50, 65, 55] },
          { label: 'Bounce', value: '38.2%', color: '#ef4444', data: [55, 50, 48, 52, 45, 42, 38] },
        ].map((s) => (
          <div key={s.label} style={{ background: 'var(--hp-surface)', border: '1px solid var(--hp-border)', borderRadius: 8, padding: '10px 12px' }}>
            <div style={{ fontSize: '0.6875rem', color: 'var(--hp-textMuted)', marginBottom: 2 }}>{s.label}</div>
            <div style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--hp-text)', marginBottom: 6 }}>{s.value}</div>
            <svg viewBox="0 0 56 20" width="100%" height={20}>
              <polyline points={s.data.map((v, i) => `${i * (56 / 6)},${20 - (v / 80) * 18}`).join(' ')} fill="none" stroke={s.color} strokeWidth="1.5" />
            </svg>
          </div>
        ))}
      </div>
    )
  }
  if (variant === 'inline') {
    return (
      <div className="cv-block cv-block--stats" style={{ background: 'var(--hp-surface)', border: '1px solid var(--hp-border)', borderRadius: 8, margin: 16, padding: '10px 16px', display: 'flex' }}>
        {[
          { label: 'Revenue', value: '$48,295', trend: '+12.4%' },
          { label: 'Users', value: '8,431', trend: '+5.2%' },
          { label: 'Sessions', value: '24.1K', trend: '+3.1%' },
          { label: 'Bounce', value: '38.2%', trend: '−1.4%' },
        ].map((s, i, arr) => (
          <div key={s.label} style={{ flex: 1, padding: '4px 12px', borderRight: i < arr.length - 1 ? '1px solid var(--hp-border)' : 'none' }}>
            <div style={{ fontSize: '0.625rem', color: 'var(--hp-textMuted)', textTransform: 'uppercase' }}>{s.label}</div>
            <div style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--hp-text)' }}>{s.value}</div>
            <div style={{ fontSize: '0.6875rem', color: 'var(--hp-success)', fontWeight: 600 }}>{s.trend}</div>
          </div>
        ))}
      </div>
    )
  }
  return (
    <div className="cv-block cv-block--stats" style={{ display: 'grid', gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: 'var(--cv-block-gap, 10px)', padding: pad }}>
      {[
        { label: 'Revenue', value: '$48,295', trend: '↑ +12.4%', up: true },
        { label: 'Users', value: '8,431', trend: '↑ +5.2%', up: true },
        { label: 'Sessions', value: '24.1K', trend: '↑ +3.1%', up: true },
        { label: 'Bounce Rate', value: '38.2%', trend: '↓ −1.4%', up: false },
      ].map((s) => (
        <div key={s.label} style={{ background: 'var(--hp-surface)', border: '1px solid var(--hp-border)', borderRadius: 8, padding: '10px 12px' }}>
          <div style={{ fontSize: '0.6875rem', color: 'var(--hp-textMuted)', marginBottom: 4 }}>{s.label}</div>
          <div style={{ fontSize: '1.125rem', fontWeight: 800, color: 'var(--hp-text)' }}>{s.value}</div>
          <div style={{ fontSize: '0.6875rem', color: s.up ? 'var(--hp-success)' : '#ef4444', marginTop: 4, fontWeight: 600 }}>{s.trend}</div>
        </div>
      ))}
    </div>
  )
}

const CHART_TITLES = { bar: 'Revenue — 2025', line: 'Revenue trend — 2025', area: 'Sessions — 2025' }

export function DashboardChartBlock({ variant = 'bar', config }) {
  const title = config?.title?.trim() || CHART_TITLES[variant] || CHART_TITLES.bar
  const shell = { background: 'var(--hp-surface)', border: '1px solid var(--hp-border)', borderRadius: 8, margin: '0 var(--cv-block-pad, 16px) var(--cv-block-pad, 16px)', padding: 'var(--cv-block-pad, 12px) 14px' }
  const heading = { fontSize: 'calc(0.75rem * var(--cv-block-scale, 1))', fontWeight: 700, color: 'var(--hp-text)', marginBottom: 10 }
  if (variant === 'line') {
    const w = 320, h = 72
    const pts = SPARK_DATA.concat([70, 80, 85, 78, 88])
    const xs = pts.map((_, i) => (i / (pts.length - 1)) * w)
    const ys = pts.map((v) => h - (v / 100) * (h - 8))
    const polyline = xs.map((x, i) => `${x},${ys[i]}`).join(' ')
    return (
      <div className="cv-block cv-block--chart" style={shell}>
        <div style={heading}>{title}</div>
        <svg viewBox={`0 0 ${w} ${h}`} width="100%" height={h}>
          <polyline points={polyline} fill="none" stroke="var(--hp-primary)" strokeWidth="2" />
        </svg>
      </div>
    )
  }
  if (variant === 'area') {
    const w = 320, h = 72
    const pts = [28, 42, 35, 58, 50, 72, 65, 80, 70, 85, 78, 88]
    const xs = pts.map((_, i) => (i / (pts.length - 1)) * w)
    const ys = pts.map((v) => h - (v / 100) * (h - 8))
    const polyline = xs.map((x, i) => `${x},${ys[i]}`).join(' ')
    const area = `${xs[0]},${h} ${polyline} ${xs[xs.length - 1]},${h}`
    return (
      <div className="cv-block cv-block--chart" style={shell}>
        <div style={heading}>{title}</div>
        <svg viewBox={`0 0 ${w} ${h}`} width="100%" height={h}>
          <polygon points={area} fill="var(--hp-primary)" fillOpacity="0.15" />
          <polyline points={polyline} fill="none" stroke="var(--hp-primary)" strokeWidth="2" />
        </svg>
      </div>
    )
  }
  return (
    <div className="cv-block cv-block--chart" style={shell}>
      <div style={heading}>{title}</div>
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 4, height: 72 }}>
        {BAR_HEIGHTS.map((h, i) => (
          <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%', justifyContent: 'flex-end', gap: 2 }}>
            <div style={{ width: '100%', height: `${h}%`, background: 'var(--hp-primary)', opacity: i === 11 ? 1 : 0.55, borderRadius: '2px 2px 0 0' }} />
            <div style={{ fontSize: '0.5rem', color: 'var(--hp-textMuted)' }}>{MONTHS[i].slice(0, 1)}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

const ACTIVITY_TITLES = { feed: 'Activity Feed', table: 'Recent Orders', actions: 'Quick Actions' }

export function DashboardActivityBlock({ variant = 'feed', config }) {
  const title = config?.title?.trim() || ACTIVITY_TITLES[variant] || ACTIVITY_TITLES.feed
  const shell = { background: 'var(--hp-surface)', border: '1px solid var(--hp-border)', borderRadius: 8, margin: '0 var(--cv-block-pad, 16px) var(--cv-block-pad, 16px)', padding: 'var(--cv-block-pad, 12px) 14px' }
  const heading = { fontSize: 'calc(0.75rem * var(--cv-block-scale, 1))', fontWeight: 700, color: 'var(--hp-text)', marginBottom: 10 }
  if (variant === 'table') {
    return (
      <div className="cv-block cv-block--activity" style={shell}>
        <div style={heading}>{title}</div>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.75rem' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--hp-border)' }}>
              {['Customer', 'Amount', 'Status'].map((h) => (
                <th key={h} style={{ textAlign: 'left', padding: '4px 6px', fontSize: '0.625rem', color: 'var(--hp-textMuted)', textTransform: 'uppercase' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ORDERS.map(([name, amt, status], i) => (
              <tr key={i} style={{ borderBottom: i < ORDERS.length - 1 ? '1px solid var(--hp-border)' : 'none' }}>
                <td style={{ padding: '5px 6px', fontWeight: 600, color: 'var(--hp-text)' }}>{name}</td>
                <td style={{ padding: '5px 6px', color: 'var(--hp-textMuted)' }}>{amt}</td>
                <td style={{ padding: '5px 6px' }}>
                  <span style={{
                    padding: '1px 6px', borderRadius: 4, fontSize: '0.6rem', fontWeight: 700,
                    background: status === 'Paid' ? 'rgba(5,150,105,0.12)' : 'rgba(245,158,11,0.12)',
                    color: status === 'Paid' ? 'var(--hp-success)' : 'var(--hp-warning)',
                  }}>{status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }
  if (variant === 'actions') {
    return (
      <div className="cv-block cv-block--activity" style={shell}>
        <div style={heading}>{title}</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--cv-block-gap, 8px)' }}>
          {QUICK_ACTIONS.map((action) => (
            <div key={action.label} style={{ background: 'var(--hp-background)', border: '1px solid var(--hp-border)', borderRadius: 7, padding: '8px 10px' }}>
              <div style={{ fontSize: '1rem', marginBottom: 3 }}>{action.icon}</div>
              <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--hp-text)' }}>{action.label}</div>
              <div style={{ fontSize: '0.625rem', color: 'var(--hp-textMuted)' }}>{action.desc}</div>
            </div>
          ))}
        </div>
      </div>
    )
  }
  return (
    <div className="cv-block cv-block--activity" style={shell}>
      <div style={heading}>{title}</div>
      {ACTIVITY.map((item, i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '5px 0', borderBottom: i < ACTIVITY.length - 1 ? '1px solid var(--hp-border)' : 'none' }}>
          <div style={{
            width: 20, height: 20, borderRadius: '50%', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '0.6rem', fontWeight: 700, color: '#fff',
            background: item.type === 'success' ? 'var(--hp-success)' : item.type === 'warning' ? 'var(--hp-warning)' : 'var(--hp-primary)',
          }}>{item.badge}</div>
          <span style={{ flex: 1, fontSize: '0.75rem', color: 'var(--hp-text)' }}>{item.text}</span>
          <span style={{ fontSize: '0.625rem', color: 'var(--hp-textMuted)' }}>{item.time}</span>
        </div>
      ))}
    </div>
  )
}

export function DashboardHeaderBlock({ config }) {
  const title = config?.title?.trim() || 'Dashboard'
  return (
    <div className="cv-block cv-block--header" style={{ padding: 'var(--cv-block-pad, 16px) var(--cv-block-pad, 16px) 0', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
      <div>
        <h2 style={{ margin: 0, fontSize: 'calc(1rem * var(--cv-block-scale, 1))', fontWeight: 800, color: 'var(--hp-text)', fontFamily: 'var(--hp-heading-font)' }}>{title}</h2>
        <div style={{ fontSize: '0.75rem', color: 'var(--hp-textMuted)', marginTop: 2 }}>Apr 1 – Apr 7, 2025</div>
      </div>
      <div style={{ display: 'flex', gap: 8 }}>
        <select style={{ fontSize: '0.75rem', padding: '4px 8px', border: '1px solid var(--hp-border)', borderRadius: 6, background: 'var(--hp-surface)', color: 'var(--hp-text)' }}>
          <option>Last 7 days</option>
        </select>
        <button style={{ fontSize: '0.75rem', padding: '4px 10px', background: 'var(--hp-primary)', color: '#fff', border: 'none', borderRadius: 6, fontWeight: 600 }}>+ New</button>
      </div>
    </div>
  )
}
