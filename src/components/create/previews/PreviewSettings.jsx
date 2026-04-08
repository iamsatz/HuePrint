import React, { useRef, useEffect } from 'react'

export default function PreviewSettings({ kit }) {
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

  return (
    <div className="lp-page" ref={ref}>
      <nav className="lp-app-nav">
        <div className="lp-app-logo">◈ App</div>
        <div className="lp-app-nav-links">
          <a className="lp-app-nav-link">Dashboard</a>
          <a className="lp-app-nav-link">Team</a>
        </div>
        <div className="lp-settings-avatar-row">
          <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'var(--hp-primary, #7c3aed)', color: 'var(--hp-background, #fff)', fontSize: '0.75rem', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>JD</div>
        </div>
      </nav>
      <div className="lp-settings-layout">
        <aside className="lp-settings-sidebar">
          <div className="lp-settings-sidebar-section-label">Account</div>
          {['Profile', 'Appearance', 'Notifications'].map((item, i) => (
            <a key={i} className={`lp-settings-link ${i === 0 ? 'lp-settings-link--active' : ''}`}>{item}</a>
          ))}
          <div className="lp-settings-sidebar-section-label" style={{ marginTop: 16 }}>Workspace</div>
          {['Security', 'Billing', 'Integrations', 'Team Members'].map((item, i) => (
            <a key={i} className="lp-settings-link">{item}</a>
          ))}
        </aside>
        <div className="lp-settings-body">
          <h2 className="lp-settings-title">Profile Settings</h2>

          <div className="lp-settings-section">
            <div className="lp-settings-section-label">Public Profile</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16 }}>
              <div className="lp-settings-avatar-row lp-on-primary" style={{ width: 56, height: 56, borderRadius: '50%', background: 'var(--hp-primary, #7c3aed)', fontWeight: 800, fontSize: '1.125rem', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>JD</div>
              <div>
                <button className="lp-btn lp-btn--ghost lp-btn--sm" style={{ marginRight: 8 }}>Upload photo</button>
                <button className="lp-btn lp-btn--ghost lp-btn--danger lp-btn--sm">Remove</button>
              </div>
            </div>
            <div className="lp-settings-field">
              <label className="lp-label">Display Name</label>
              <input className="lp-input" type="text" placeholder="Jane Doe" readOnly style={{ maxWidth: 280 }} />
            </div>
            <div className="lp-settings-field">
              <label className="lp-label">Email Address</label>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <input className="lp-input" type="email" placeholder="jane@example.com" readOnly style={{ maxWidth: 240 }} />
                <span className="lp-badge lp-badge--success" style={{ fontSize: '0.6875rem' }}>Verified</span>
              </div>
            </div>
            <div className="lp-settings-field">
              <label className="lp-label">Bio</label>
              <textarea className="lp-input" placeholder="A short bio about yourself…" readOnly style={{ maxWidth: 320, height: 60, resize: 'none', fontFamily: 'inherit' }} />
            </div>
          </div>

          <div className="lp-settings-section">
            <div className="lp-settings-section-label">Preferences</div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 0' }}>
              <div>
                <div style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--hp-text, #111827)' }}>Email digest</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--hp-textMuted, #6b7280)' }}>Receive weekly activity summary</div>
              </div>
              <div className="lp-settings-toggle lp-settings-toggle--on" />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 0' }}>
              <div>
                <div style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--hp-text, #111827)' }}>Marketing emails</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--hp-textMuted, #6b7280)' }}>Tips, product updates, and news</div>
              </div>
              <div className="lp-settings-toggle" />
            </div>
          </div>

          <div className="lp-settings-section" style={{ borderBottom: 'none', marginBottom: 0 }}>
            <div className="lp-settings-section-label lp-danger-label">Danger Zone</div>
            <div className="lp-danger-zone">
              <div>
                <div className="lp-danger-zone-title">Delete account</div>
                <div className="lp-danger-zone-sub">Permanently remove your account and all data.</div>
              </div>
              <button className="lp-btn lp-btn--ghost lp-btn--danger lp-btn--sm">Delete</button>
            </div>
          </div>

          <div style={{ paddingTop: 16, display: 'flex', gap: 8 }}>
            <button className="lp-btn lp-btn--primary">Save changes</button>
            <button className="lp-btn lp-btn--ghost">Cancel</button>
          </div>
        </div>
      </div>
    </div>
  )
}
