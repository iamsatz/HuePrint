import React, { useRef, useEffect } from 'react'

export default function PreviewAdminTable({ kit }) {
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

  const rows = [
    { name: 'Alice Martin', email: 'alice@co.com', role: 'Admin', status: 'Active' },
    { name: 'Bob Kumar', email: 'bob@co.com', role: 'Editor', status: 'Active' },
    { name: 'Carol Li', email: 'carol@co.com', role: 'Viewer', status: 'Inactive' },
    { name: 'Dave Osei', email: 'dave@co.com', role: 'Editor', status: 'Active' },
    { name: 'Emma Hall', email: 'emma@co.com', role: 'Viewer', status: 'Pending' },
  ]

  return (
    <div className="lp-page" ref={ref}>
      <nav className="lp-app-nav">
        <div className="lp-app-logo">◈ Admin</div>
        <button className="lp-btn lp-btn--primary lp-btn--sm">+ Invite User</button>
      </nav>

      <div style={{ padding: '20px 24px', background: 'var(--hp-background, #fff)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
          <h2 className="lp-settings-title" style={{ margin: 0 }}>Users</h2>
          <input className="lp-input" placeholder="Search users…" style={{ maxWidth: 200, padding: '6px 10px', fontSize: '0.8125rem' }} readOnly />
        </div>

        <div className="lp-card">
          <table className="lp-table" style={{ width: '100%' }}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={i}>
                  <td style={{ fontWeight: 600, color: 'var(--hp-text)' }}>{row.name}</td>
                  <td style={{ color: 'var(--hp-textMuted)', fontSize: '0.8125rem' }}>{row.email}</td>
                  <td><span className="lp-badge lp-badge--secondary">{row.role}</span></td>
                  <td>
                    <span className={`lp-badge ${row.status === 'Active' ? 'lp-badge--success' : row.status === 'Pending' ? 'lp-badge--warning' : ''}`}
                      style={row.status === 'Inactive' ? { background: '#f3f4f6', color: '#6b7280' } : {}}>
                      {row.status}
                    </span>
                  </td>
                  <td><button className="lp-btn lp-btn--ghost lp-btn--sm">Edit</button></td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="lp-table-pagination">
            <span style={{ color: 'var(--hp-textMuted)', fontSize: '0.8125rem' }}>Showing 5 of 24</span>
            <div style={{ display: 'flex', gap: 4 }}>
              <button className="lp-btn lp-btn--ghost lp-btn--sm">←</button>
              <button className="lp-btn lp-btn--primary lp-btn--sm">1</button>
              <button className="lp-btn lp-btn--ghost lp-btn--sm">2</button>
              <button className="lp-btn lp-btn--ghost lp-btn--sm">→</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
