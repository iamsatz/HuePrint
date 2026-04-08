import React, { useState } from 'react'
import { useKitTheme } from '../../lib/useKitTheme'
import './ComponentGallery.css'

export default function ComponentGallery({ kit, mode }) {
  const ref = useKitTheme(kit, mode)
  const [checkboxChecked, setCheckboxChecked] = useState(true)
  const [selectValue, setSelectValue] = useState('option1')

  return (
    <div className="cg-root" ref={ref}>

      {/* === Row 1: Auth form + Stat cards === */}
      <div className="cg-grid cg-grid--2col">
        {/* Auth / Sign-up form */}
        <div className="cg-section">
          <div className="cg-section-label">Auth Form</div>
          <div className="cg-auth-card">
            <div className="cg-auth-header">
              <div className="cg-auth-logo">◈ Acme</div>
              <div className="cg-auth-title">Create an account</div>
              <div className="cg-auth-sub">Sign up to get started today</div>
            </div>
            <form className="cg-auth-body" onSubmit={(e) => e.preventDefault()}>
              <div className="cg-field">
                <label className="cg-label">Email address</label>
                <input className="cg-input" type="email" placeholder="you@example.com" readOnly />
              </div>
              <div className="cg-field">
                <label className="cg-label">Password</label>
                <input className="cg-input" type="password" placeholder="••••••••" readOnly />
              </div>
              <button className="cg-btn cg-btn--primary cg-btn--full" type="submit">Create account</button>
              <div className="cg-auth-divider">
                <span>or continue with</span>
              </div>
              <button className="cg-btn cg-btn--ghost cg-btn--full cg-btn--icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.741 0 .267.18.578.688.48C19.138 20.164 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
                </svg>
                Continue with GitHub
              </button>
            </form>
          </div>
        </div>

        {/* Stat cards */}
        <div className="cg-section">
          <div className="cg-section-label">Stat Cards</div>
          <div className="cg-stats-grid">
            <div className="cg-stat-card cg-stat-card--primary">
              <div className="cg-stat-label">Monthly Revenue</div>
              <div className="cg-stat-value">$48,295</div>
              <div className="cg-stat-trend cg-stat-trend--up">↑ +12.4%</div>
            </div>
            <div className="cg-stat-card">
              <div className="cg-stat-label">Active Users</div>
              <div className="cg-stat-value">8,431</div>
              <div className="cg-stat-trend cg-stat-trend--up">↑ +5.2%</div>
            </div>
            <div className="cg-stat-card">
              <div className="cg-stat-label">Conversion</div>
              <div className="cg-stat-value">3.68%</div>
              <div className="cg-stat-trend cg-stat-trend--down">↓ −0.8%</div>
            </div>
          </div>
        </div>
      </div>

      {/* === Row 2: Sidebar nav + Avatar list === */}
      <div className="cg-grid cg-grid--2col">
        {/* Sidebar nav */}
        <div className="cg-section">
          <div className="cg-section-label">Sidebar Navigation</div>
          <div className="cg-sidebar">
            <div className="cg-sidebar-brand">◈ Acme App</div>
            <div className="cg-sidebar-group-label">Main</div>
            <nav className="cg-sidebar-nav">
              <a href="#" className="cg-sidebar-link cg-sidebar-link--active">
                <span className="cg-sidebar-icon">⊟</span> Dashboard
              </a>
              <a href="#" className="cg-sidebar-link">
                <span className="cg-sidebar-icon">◻</span> Projects
              </a>
              <a href="#" className="cg-sidebar-link">
                <span className="cg-sidebar-icon">◷</span> Analytics
              </a>
              <a href="#" className="cg-sidebar-link">
                <span className="cg-sidebar-icon">⊞</span> Team
              </a>
            </nav>
            <div className="cg-sidebar-group-label">Settings</div>
            <nav className="cg-sidebar-nav">
              <a href="#" className="cg-sidebar-link">
                <span className="cg-sidebar-icon">◎</span> Account
              </a>
              <a href="#" className="cg-sidebar-link">
                <span className="cg-sidebar-icon">⊗</span> Billing
              </a>
            </nav>
          </div>
        </div>

        {/* Avatar list */}
        <div className="cg-section">
          <div className="cg-section-label">User List</div>
          <div className="cg-user-list">
            {[
              { initials: 'AJ', name: 'Alice Johnson', email: 'alice@example.com', role: 'Admin' },
              { initials: 'BK', name: 'Bob Kim', email: 'bob@example.com', role: 'Member' },
              { initials: 'CL', name: 'Carol Lee', email: 'carol@example.com', role: 'Viewer' },
            ].map((user) => (
              <div className="cg-user-row" key={user.email}>
                <div className="cg-avatar">{user.initials}</div>
                <div className="cg-user-info">
                  <div className="cg-user-name">{user.name}</div>
                  <div className="cg-user-email">{user.email}</div>
                </div>
                <span className="cg-badge cg-badge--secondary cg-badge--sm">{user.role}</span>
                <button className="cg-btn cg-btn--ghost cg-btn--sm">Edit</button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* === Row 3: Data table + Progress + Toast === */}
      <div className="cg-section">
        <div className="cg-section-label">Data Table, Progress &amp; Toasts</div>
        <div className="cg-grid cg-grid--2col cg-grid--gap-lg">
          {/* Data table */}
          <div className="cg-table-wrap">
            <table className="cg-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Status</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Homepage redesign</td>
                  <td><span className="cg-badge cg-badge--success">Live</span></td>
                  <td><a href="#" className="cg-table-link">View</a></td>
                </tr>
                <tr>
                  <td>Mobile onboarding</td>
                  <td><span className="cg-badge cg-badge--warning">Review</span></td>
                  <td><a href="#" className="cg-table-link">View</a></td>
                </tr>
                <tr>
                  <td>API v2 migration</td>
                  <td><span className="cg-badge cg-badge--primary">Active</span></td>
                  <td><a href="#" className="cg-table-link">View</a></td>
                </tr>
              </tbody>
            </table>

            {/* Progress bars */}
            <div className="cg-progress-stack">
              <div className="cg-progress-item">
                <div className="cg-progress-header">
                  <span className="cg-progress-label">Campaign reach</span>
                  <span className="cg-progress-pct">72%</span>
                </div>
                <div className="cg-progress-track">
                  <div className="cg-progress-fill" style={{ width: '72%' }} />
                </div>
              </div>
              <div className="cg-progress-item">
                <div className="cg-progress-header">
                  <span className="cg-progress-label">Storage used</span>
                  <span className="cg-progress-pct">41%</span>
                </div>
                <div className="cg-progress-track">
                  <div className="cg-progress-fill" style={{ width: '41%' }} />
                </div>
              </div>
            </div>
          </div>

          {/* Toasts */}
          <div className="cg-toasts">
            <div className="cg-toast cg-toast--success">
              <span className="cg-toast-icon">✓</span>
              <div className="cg-toast-body">
                <div className="cg-toast-title">Changes saved</div>
                <div className="cg-toast-msg">Your profile has been updated successfully.</div>
              </div>
              <button className="cg-toast-close">✕</button>
            </div>
            <div className="cg-toast cg-toast--error">
              <span className="cg-toast-icon">✕</span>
              <div className="cg-toast-body">
                <div className="cg-toast-title">Upload failed</div>
                <div className="cg-toast-msg">File size exceeds the 10 MB limit.</div>
              </div>
              <button className="cg-toast-close">✕</button>
            </div>
            <div className="cg-toast cg-toast--warning">
              <span className="cg-toast-icon">⚠</span>
              <div className="cg-toast-body">
                <div className="cg-toast-title">Session expiring</div>
                <div className="cg-toast-msg">You will be logged out in 5 minutes.</div>
              </div>
              <button className="cg-toast-close">✕</button>
            </div>
          </div>
        </div>
      </div>

      {/* === Row 4: Buttons + Form controls side-by-side === */}
      <div className="cg-grid cg-grid--2col">
        <div className="cg-section">
          <div className="cg-section-label">Buttons</div>
          <div className="cg-row">
            <button className="cg-btn cg-btn--primary">Primary</button>
            <button className="cg-btn cg-btn--secondary">Secondary</button>
            <button className="cg-btn cg-btn--ghost">Ghost</button>
            <button className="cg-btn cg-btn--destructive">Destructive</button>
          </div>
        </div>

        <div className="cg-section">
          <div className="cg-section-label">Form Controls</div>
          <div className="cg-form-row">
            <input
              className="cg-input"
              type="text"
              placeholder="Text input..."
              defaultValue=""
            />
            <select
              className="cg-select"
              value={selectValue}
              onChange={(e) => setSelectValue(e.target.value)}
            >
              <option value="option1">Option One</option>
              <option value="option2">Option Two</option>
              <option value="option3">Option Three</option>
            </select>
            <label className="cg-checkbox-label">
              <input
                type="checkbox"
                className="cg-checkbox"
                checked={checkboxChecked}
                onChange={(e) => setCheckboxChecked(e.target.checked)}
              />
              <span className="cg-checkbox-mark" />
              Checkbox option
            </label>
          </div>
        </div>
      </div>

      {/* === Row 5: Alerts + Badges side-by-side === */}
      <div className="cg-grid cg-grid--2col">
        <div className="cg-section">
          <div className="cg-section-label">Alerts</div>
          <div className="cg-alerts">
            <div className="cg-alert cg-alert--info">
              <span className="cg-alert-icon">ℹ</span>
              <div>
                <strong>Info</strong> — This is an informational message for the user.
              </div>
            </div>
            <div className="cg-alert cg-alert--success">
              <span className="cg-alert-icon">✓</span>
              <div>
                <strong>Success</strong> — Your changes have been saved successfully.
              </div>
            </div>
            <div className="cg-alert cg-alert--warning">
              <span className="cg-alert-icon">⚠</span>
              <div>
                <strong>Warning</strong> — Please review before continuing.
              </div>
            </div>
            <div className="cg-alert cg-alert--error">
              <span className="cg-alert-icon">✕</span>
              <div>
                <strong>Error</strong> — Something went wrong. Please try again.
              </div>
            </div>
          </div>
        </div>

        <div className="cg-section">
          <div className="cg-section-label">Badges</div>
          <div className="cg-row cg-row--wrap">
            <span className="cg-badge cg-badge--primary">Primary</span>
            <span className="cg-badge cg-badge--secondary">Secondary</span>
            <span className="cg-badge cg-badge--accent">Accent</span>
            <span className="cg-badge cg-badge--success">Success</span>
            <span className="cg-badge cg-badge--warning">Warning</span>
          </div>

          <div className="cg-section-label" style={{ marginTop: '16px' }}>Card</div>
          <div className="cg-card">
            <div className="cg-card-header">
              <span className="cg-card-title">Card Title</span>
              <span className="cg-badge cg-badge--accent">New</span>
            </div>
            <div className="cg-card-body">
              Cards use surface color and border tokens from the kit for consistent theming.
            </div>
            <div className="cg-card-footer">
              <button className="cg-btn cg-btn--ghost cg-btn--sm">Cancel</button>
              <button className="cg-btn cg-btn--primary cg-btn--sm">Confirm</button>
            </div>
          </div>
        </div>
      </div>

      {/* === Row 6: Navigation + Typography === */}
      <div className="cg-section">
        <div className="cg-section-label">Navigation</div>
        <nav className="cg-nav">
          <div className="cg-nav-logo">Brand</div>
          <div className="cg-nav-links">
            <a href="#" className="cg-nav-link cg-nav-link--active">Home</a>
            <a href="#" className="cg-nav-link">Features</a>
            <a href="#" className="cg-nav-link">Pricing</a>
            <a href="#" className="cg-nav-link">Docs</a>
          </div>
          <button className="cg-btn cg-btn--primary cg-btn--sm">Get Started</button>
        </nav>
      </div>

      <div className="cg-section">
        <div className="cg-section-label">Typography</div>
        <div className="cg-typography">
          <div className="cg-type-h1">Heading One — Build faster</div>
          <div className="cg-type-h2">Heading Two — Design with intent</div>
          <div className="cg-type-h3">Heading Three — Component system</div>
          <div className="cg-type-h4">Heading Four — Design tokens</div>
          <div className="cg-type-body">
            Body text — The quick brown fox jumps over the lazy dog. This paragraph
            demonstrates how body copy will look in your design system, including line
            height, font size, and color contrast.
          </div>
          <div className="cg-type-small">
            Small text — Secondary information, captions, and helper text appear at reduced size.
          </div>
        </div>
      </div>

    </div>
  )
}
