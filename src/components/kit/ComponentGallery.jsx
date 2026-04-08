import React, { useState } from 'react'
import { useKitTheme } from '../../lib/useKitTheme'
import './ComponentGallery.css'

export default function ComponentGallery({ kit, mode }) {
  const ref = useKitTheme(kit, mode)
  const [checkboxChecked, setCheckboxChecked] = useState(true)
  const [selectValue, setSelectValue] = useState('option1')

  return (
    <div className="cg-root" ref={ref}>
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
      </div>

      <div className="cg-section">
        <div className="cg-section-label">Card</div>
        <div className="cg-card">
          <div className="cg-card-header">
            <span className="cg-card-title">Card Title</span>
            <span className="cg-badge cg-badge--accent">New</span>
          </div>
          <div className="cg-card-body">
            This is the card body. It can contain any content — text, images, or other components.
            Cards use surface color and border tokens from the kit.
          </div>
          <div className="cg-card-footer">
            <button className="cg-btn cg-btn--ghost cg-btn--sm">Cancel</button>
            <button className="cg-btn cg-btn--primary cg-btn--sm">Confirm</button>
          </div>
        </div>
      </div>

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
