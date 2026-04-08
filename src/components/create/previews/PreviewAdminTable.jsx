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
    { checked: true, name: 'Alice Martin', email: 'alice@co.com', role: 'Admin', status: 'Active', joined: 'Jan 12, 2024' },
    { checked: false, name: 'Bob Kumar', email: 'bob@co.com', role: 'Editor', status: 'Active', joined: 'Feb 3, 2024' },
    { checked: false, name: 'Carol Li', email: 'carol@co.com', role: 'Viewer', status: 'Inactive', joined: 'Mar 8, 2024' },
    { checked: true, name: 'Dave Osei', email: 'dave@co.com', role: 'Editor', status: 'Active', joined: 'Apr 22, 2024' },
    { checked: false, name: 'Emma Hall', email: 'emma@co.com', role: 'Viewer', status: 'Pending', joined: 'May 1, 2024' },
  ]

  return (
    <div className="lp-page" ref={ref}>
      <nav className="lp-app-nav">
        <div className="lp-app-logo">◈ Admin</div>
        <div className="lp-app-nav-links">
          <a className="lp-app-nav-link lp-app-nav-link--active">Users</a>
          <a className="lp-app-nav-link">Roles</a>
          <a className="lp-app-nav-link">Logs</a>
        </div>
        <button className="lp-btn lp-btn--primary lp-btn--sm">+ Invite User</button>
      </nav>

      <div style={{ padding: '20px 24px', background: 'var(--hp-background, #fff)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14, gap: 10, flexWrap: 'wrap' }}>
          <div>
            <h2 className="lp-settings-title" style={{ margin: 0 }}>Users</h2>
            <div style={{ fontSize: '0.75rem', color: 'var(--hp-textMuted, #6b7280)', marginTop: 2 }}>24 total · 2 selected</div>
          </div>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
            <input className="lp-input" placeholder="Search users…" style={{ width: 180, padding: '6px 10px', fontSize: '0.8125rem' }} readOnly />
            <select className="lp-input" style={{ maxWidth: 110, fontSize: '0.8125rem' }}>
              <option>All roles</option>
              <option>Admin</option>
              <option>Editor</option>
            </select>
            <button className="lp-btn lp-btn--ghost lp-btn--sm">↓ Export</button>
          </div>
        </div>

        <div style={{ padding: '8px 12px', background: 'var(--hp-surface, #f9fafb)', border: '1.5px solid var(--hp-border, #e5e7eb)', borderRadius: '8px 8px 0 0', display: 'flex', gap: 8, alignItems: 'center' }}>
          <input type="checkbox" readOnly checked style={{ cursor: 'pointer' }} />
          <span style={{ fontSize: '0.8125rem', color: 'var(--hp-textMuted, #6b7280)' }}>2 selected</span>
          <div style={{ display: 'flex', gap: 6, marginLeft: 8 }}>
            <button className="lp-btn lp-btn--ghost lp-btn--sm" style={{ fontSize: '0.75rem' }}>Deactivate</button>
            <button className="lp-btn lp-btn--ghost lp-btn--danger lp-btn--sm" style={{ fontSize: '0.75rem' }}>Remove</button>
          </div>
        </div>

        <div className="lp-card" style={{ borderTopLeftRadius: 0, borderTopRightRadius: 0, borderTop: 'none' }}>
          <table className="lp-table" style={{ width: '100%' }}>
            <thead>
              <tr>
                <th style={{ width: 32 }}><input type="checkbox" readOnly /></th>
                <th>
                  <span style={{ cursor: 'pointer' }}>Name ↕</span>
                </th>
                <th>Email</th>
                <th>
                  <span style={{ cursor: 'pointer' }}>Role ↕</span>
                </th>
                <th>Status</th>
                <th>
                  <span style={{ cursor: 'pointer' }}>Joined ↑</span>
                </th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={i} className={row.checked ? 'lp-row--selected' : ''}>
                  <td><input type="checkbox" readOnly checked={row.checked} /></td>
                  <td style={{ fontWeight: 600, color: 'var(--hp-text, #111827)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'var(--hp-primary, #7c3aed)', color: 'var(--hp-background, #fff)', fontSize: '0.6875rem', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        {row.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      {row.name}
                    </div>
                  </td>
                  <td style={{ color: 'var(--hp-textMuted, #6b7280)', fontSize: '0.8125rem' }}>{row.email}</td>
                  <td><span className="lp-badge lp-badge--secondary" style={{ fontSize: '0.7rem' }}>{row.role}</span></td>
                  <td>
                    <span className={`lp-badge ${row.status === 'Active' ? 'lp-badge--success' : row.status === 'Pending' ? 'lp-badge--warning' : ''}`}
                      style={row.status === 'Inactive' ? { background: 'var(--hp-surface, #f3f4f6)', color: 'var(--hp-textMuted, #6b7280)', fontSize: '0.7rem' } : { fontSize: '0.7rem' }}>
                      {row.status}
                    </span>
                  </td>
                  <td style={{ fontSize: '0.75rem', color: 'var(--hp-textMuted, #9ca3af)' }}>{row.joined}</td>
                  <td>
                    <div style={{ display: 'flex', gap: 4 }}>
                      <button className="lp-btn lp-btn--ghost lp-btn--sm">Edit</button>
                      <button className="lp-btn lp-btn--ghost lp-btn--sm">⋯</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="lp-table-pagination">
            <span style={{ color: 'var(--hp-textMuted, #6b7280)', fontSize: '0.8125rem' }}>Showing 5 of 24 users</span>
            <div style={{ display: 'flex', gap: 4 }}>
              <button className="lp-btn lp-btn--ghost lp-btn--sm">←</button>
              <button className="lp-btn lp-btn--primary lp-btn--sm">1</button>
              <button className="lp-btn lp-btn--ghost lp-btn--sm">2</button>
              <button className="lp-btn lp-btn--ghost lp-btn--sm">3</button>
              <button className="lp-btn lp-btn--ghost lp-btn--sm">→</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
