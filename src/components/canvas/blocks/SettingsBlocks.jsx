import React from 'react'

const TABS = ['Profile', 'Account', 'Notifications', 'Security', 'Billing']

function Toggle({ on }) {
  return (
    <div style={{ width: 36, height: 20, borderRadius: 10, background: on ? 'var(--hp-primary)' : 'var(--hp-border)', position: 'relative', flexShrink: 0 }}>
      <div style={{ position: 'absolute', top: 2, left: on ? 18 : 2, width: 16, height: 16, borderRadius: '50%', background: '#fff' }} />
    </div>
  )
}

const SECTION_TITLES = { profile: 'Public profile', account: 'Plan & billing', notifications: 'Email notifications' }

function ProfileSection({ sectionTitle = 'Public profile' }) {
  return (
    <div style={{ padding: 'var(--cv-block-pad, 20px)' }}>
      <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', color: 'var(--hp-textMuted)', marginBottom: 12 }}>{sectionTitle}</div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 18 }}>
        <div style={{ width: 52, height: 52, borderRadius: '50%', background: 'var(--hp-primary)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800 }}>JD</div>
        <div>
          <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--hp-text)' }}>Jane Doe</div>
          <button style={{ marginTop: 6, padding: '6px 12px', borderRadius: 8, border: '1px solid var(--hp-border)', background: 'transparent', fontSize: 12 }}>Upload photo</button>
        </div>
      </div>
      {['Display name', 'Username', 'Bio'].map((label) => (
        <div key={label} style={{ marginBottom: 14 }}>
          <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--hp-text)', marginBottom: 5 }}>{label}</label>
          <input style={{ width: '100%', maxWidth: 320, padding: '8px 12px', borderRadius: 8, border: '1px solid var(--hp-border)', background: 'var(--hp-surface)', fontSize: 13 }} readOnly />
        </div>
      ))}
      <button style={{ padding: '8px 18px', borderRadius: 8, border: 'none', background: 'var(--hp-primary)', color: '#fff', fontSize: 13, fontWeight: 600 }}>Save changes</button>
    </div>
  )
}

function NotificationsSection({ sectionTitle = 'Email notifications' }) {
  return (
    <div style={{ padding: 'var(--cv-block-pad, 20px)' }}>
      <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', color: 'var(--hp-textMuted)', marginBottom: 12 }}>{sectionTitle}</div>
      {[
        { label: 'Product updates', desc: 'New features and improvements', on: true },
        { label: 'Weekly digest', desc: 'Summary of your activity', on: false },
        { label: 'Marketing emails', desc: 'Tips, offers, and news', on: false },
      ].map((item) => (
        <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid var(--hp-border)' }}>
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--hp-text)' }}>{item.label}</div>
            <div style={{ fontSize: 12, color: 'var(--hp-textMuted)' }}>{item.desc}</div>
          </div>
          <Toggle on={item.on} />
        </div>
      ))}
    </div>
  )
}

export function SettingsLayoutBlock({ variant = 'sidebar-tabs' }) {
  if (variant === 'top-tabs') {
    return (
      <div className="cv-block" style={{ background: 'var(--hp-background)' }}>
        <div style={{ borderBottom: '1px solid var(--hp-border)', padding: '0 20px', display: 'flex', gap: 4 }}>
          {TABS.slice(0, 4).map((tab, i) => (
            <div key={tab} style={{ padding: '12px 14px', fontSize: 13, fontWeight: i === 0 ? 600 : 400, color: i === 0 ? 'var(--hp-primary)' : 'var(--hp-textMuted)', borderBottom: i === 0 ? '2px solid var(--hp-primary)' : '2px solid transparent' }}>{tab}</div>
          ))}
        </div>
        <ProfileSection />
      </div>
    )
  }
  if (variant === 'accordion') {
    return (
      <div className="cv-block" style={{ padding: 16, background: 'var(--hp-background)' }}>
        {TABS.slice(0, 3).map((tab, i) => (
          <div key={tab} style={{ border: '1px solid var(--hp-border)', borderRadius: 8, marginBottom: 8, overflow: 'hidden' }}>
            <div style={{ padding: '12px 16px', fontSize: 13, fontWeight: 600, color: 'var(--hp-text)', background: i === 0 ? 'var(--hp-surface)' : 'var(--hp-background)', display: 'flex', justifyContent: 'space-between' }}>
              {tab}
              <span>{i === 0 ? '−' : '+'}</span>
            </div>
            {i === 0 && <div style={{ padding: '0 16px 16px', background: 'var(--hp-surface)' }}><ProfileSection /></div>}
          </div>
        ))}
      </div>
    )
  }
  return (
    <div className="cv-block" style={{ display: 'flex', minHeight: 320, background: 'var(--hp-background)' }}>
      <aside style={{ width: 180, flexShrink: 0, borderRight: '1px solid var(--hp-border)', padding: '16px 0' }}>
        <div style={{ padding: '0 16px 12px', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', color: 'var(--hp-textMuted)' }}>Settings</div>
        {TABS.map((tab, i) => (
          <div key={tab} style={{ padding: '8px 16px', fontSize: 13, fontWeight: i === 0 ? 600 : 400, color: i === 0 ? 'var(--hp-primary)' : 'var(--hp-textMuted)', background: i === 0 ? 'var(--hp-surface)' : 'transparent', borderLeft: i === 0 ? '2px solid var(--hp-primary)' : '2px solid transparent' }}>{tab}</div>
        ))}
      </aside>
      <div style={{ flex: 1 }}><ProfileSection /></div>
    </div>
  )
}

export function SettingsSectionBlock({ variant = 'profile', config }) {
  const sectionTitle = config?.title?.trim() || SECTION_TITLES[variant] || SECTION_TITLES.profile
  if (variant === 'account') {
    return (
      <div className="cv-block" style={{ padding: 'var(--cv-block-pad, 20px)', background: 'var(--hp-background)' }}>
        <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', color: 'var(--hp-textMuted)', marginBottom: 12 }}>{sectionTitle}</div>
        <div style={{ border: '1px solid var(--hp-border)', borderRadius: 12, padding: '16px 18px', marginBottom: 14 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--hp-text)' }}>Pro Plan</div>
              <div style={{ fontSize: 12, color: 'var(--hp-textMuted)' }}>$29/month · Renews Apr 15</div>
            </div>
            <button style={{ padding: '6px 14px', borderRadius: 8, border: '1px solid var(--hp-border)', background: 'transparent', fontSize: 12, fontWeight: 600 }}>Manage</button>
          </div>
        </div>
        <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', color: 'var(--hp-textMuted)', marginBottom: 12 }}>Payment method</div>
        <div style={{ padding: '12px 14px', border: '1px solid var(--hp-border)', borderRadius: 10, fontSize: 13, color: 'var(--hp-text)' }}>•••• •••• •••• 4242 · Exp 12/27</div>
      </div>
    )
  }
  if (variant === 'notifications') {
    return (
      <div className="cv-block" style={{ background: 'var(--hp-background)' }}>
        <NotificationsSection sectionTitle={sectionTitle} />
      </div>
    )
  }
  return (
    <div className="cv-block" style={{ background: 'var(--hp-background)' }}>
      <ProfileSection sectionTitle={sectionTitle} />
    </div>
  )
}
