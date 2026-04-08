import React, { useState, useRef, useEffect } from 'react'
import { generateRadixScale } from '../../lib/generateRadixScale'
import './ColorPalette.css'

const CATEGORIES = [
  { label: 'Backgrounds', steps: [1, 2] },
  { label: 'Interactive components', steps: [3, 4, 5] },
  { label: 'Borders and separators', steps: [6, 7, 8] },
  { label: 'Solid colors', steps: [9, 10] },
  { label: 'Accessible text', steps: [11, 12] },
]

const SCALE_COLORS = [
  { key: 'primary', label: 'Primary' },
  { key: 'secondary', label: 'Secondary' },
  { key: 'accent', label: 'Accent' },
  { key: 'success', label: 'Success' },
  { key: 'warning', label: 'Warning' },
]

function StepCell({ step }) {
  const [tooltip, setTooltip] = useState(false)
  return (
    <div
      className="cp-cell"
      style={{ background: step.hex }}
      onMouseEnter={() => setTooltip(true)}
      onMouseLeave={() => setTooltip(false)}
    >
      {tooltip && (
        <div className="cp-cell-tooltip">
          <span className="cp-cell-tooltip-label">{step.label}</span>
          <span className="cp-cell-tooltip-hex">{step.hex}</span>
        </div>
      )}
    </div>
  )
}

function ColorRow({ colorKey, label, palette, mode }) {
  const hex = palette[colorKey]
  if (!hex) return null
  const steps = generateRadixScale(hex, mode)
  return (
    <div className="cp-row">
      <div className="cp-row-label">{label}</div>
      {steps.map((step) => (
        <StepCell key={step.step} step={step} />
      ))}
    </div>
  )
}

export default function ColorPalette({ kit, mode = 'light' }) {
  const rootRef = useRef(null)

  useEffect(() => {
    if (!rootRef.current || !kit) return
    const el = rootRef.current
    if (kit.typography) {
      if (kit.typography.headingFont) el.style.setProperty('--hp-heading-font', `'${kit.typography.headingFont}', sans-serif`)
      if (kit.typography.bodyFont) el.style.setProperty('--hp-body-font', `'${kit.typography.bodyFont}', sans-serif`)
    }
  }, [kit])

  if (!kit) return null
  const palette = kit.palette[mode]

  return (
    <div className="cp-root" ref={rootRef}>
      {/* Category group labels */}
      <div className="cp-categories-row">
        <div className="cp-row-label-spacer" />
        {CATEGORIES.map((cat) => (
          <div
            key={cat.label}
            className="cp-category"
            style={{ gridColumn: `span ${cat.steps.length}` }}
          >
            {cat.label}
          </div>
        ))}
      </div>

      {/* Divider line under categories */}
      <div className="cp-divider-row">
        <div className="cp-row-label-spacer" />
        <div className="cp-divider-line" />
      </div>

      {/* Step numbers */}
      <div className="cp-numbers-row">
        <div className="cp-row-label-spacer" />
        {Array.from({ length: 12 }, (_, i) => (
          <div key={i + 1} className="cp-step-num">{i + 1}</div>
        ))}
      </div>

      {/* Color scale rows */}
      {SCALE_COLORS.map(({ key, label }) => (
        <ColorRow
          key={key}
          colorKey={key}
          label={label}
          palette={palette}
          mode={mode}
        />
      ))}
    </div>
  )
}
