import React, { useRef, useEffect } from 'react'

export default function PreviewSettings({ kit }) {
  const ref = useRef(null)
  useEffect(() => {
    if (!ref.current || !kit) return
    const el = ref.current
    const palette = kit.palette.light
    const roles = ['background', 'surface', 'primary', 'secondary', 'accent', 'text', 'textMuted', 'border', 'success', 'warning']
    roles.forEach((role) => { if (palette[role]) el.style.setProperty(`--hp-${role}`, palette[role]) })
  }, [kit])
  if (!kit) return null

  return (
    <div className="lp-page" ref={ref}>
      <nav className="lp-app-nav">
        <div className="lp-app-logo">◈ App</div>
        <button className="lp-btn lp-btn--ghost lp-btn--sm">← Back</button>
      </nav>
      <div className="lp-settings-layout">
        <aside className="lp-settings-sidebar">
          <div className="lp-comp-label">Settings</div>
          {['Account', 'Security', 'Billing', 'Notifications', 'Integrations'].map((item, i) => (
            <a key={i} className={`lp-settings-link ${i === 0 ? 'lp-settings-link--active' : ''}`}>{item}</a>
          ))}
        </aside>
        <div className="lp-settings-body">
          <h2 className="lp-settings-title">Account Settings</h2>

          <div className="lp-settings-section">
            <div className="lp-settings-section-label">Profile</div>
            <div className="lp-settings-field">
              <label className="lp-label">Display Name</label>
              <input className="lp-input" type="text" placeholder="Jane Doe" readOnly style={{ maxWidth: 280 }} />
            </div>
            <div className="lp-settings-field">
              <label className="lp-label">Email Address</label>
              <input className="lp-input" type="email" placeholder="jane@example.com" readOnly style={{ maxWidth: 280 }} />
            </div>
          </div>

          <div className="lp-settings-section">
            <div className="lp-settings-section-label">Danger Zone</div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 0' }}>
              <div>
                <div style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--hp-text)' }}>Delete account</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--hp-textMuted)' }}>Permanently remove your account and data.</div>
              </div>
              <button className="lp-btn lp-btn--ghost lp-btn--sm" style={{ color: '#ef4444', borderColor: '#fecaca' }}>Delete</button>
            </div>
          </div>

          <div style={{ paddingTop: 8 }}>
            <button className="lp-btn lp-btn--primary">Save changes</button>
          </div>
        </div>
      </div>
    </div>
  )
}
