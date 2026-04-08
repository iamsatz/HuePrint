import React from 'react'
import './ColorPalette.css'

const COLOR_ROLES = [
  { key: 'background', label: 'Background' },
  { key: 'surface', label: 'Surface' },
  { key: 'primary', label: 'Primary' },
  { key: 'secondary', label: 'Secondary' },
  { key: 'accent', label: 'Accent' },
  { key: 'text', label: 'Text' },
  { key: 'textMuted', label: 'Text Muted' },
  { key: 'border', label: 'Border' },
  { key: 'success', label: 'Success' },
  { key: 'warning', label: 'Warning' },
]

function Swatch({ color, role }) {
  return (
    <div className="cp-swatch">
      <div
        className="cp-swatch-rect"
        style={{ background: color }}
        title={color}
      />
      <div className="cp-swatch-label">{role.label}</div>
      <div className="cp-swatch-hex">{color}</div>
    </div>
  )
}

export default function ColorPalette({ kit }) {
  if (!kit) return null
  const light = kit.palette.light
  const dark = kit.palette.dark

  return (
    <div className="cp-root">
      <div className="cp-column">
        <div className="cp-column-header">
          <span className="cp-mode-dot cp-mode-dot--light" />
          Light Mode
        </div>
        <div className="cp-grid">
          {COLOR_ROLES.map((role) => (
            <Swatch key={role.key} color={light[role.key]} role={role} />
          ))}
        </div>
      </div>
      <div className="cp-column">
        <div className="cp-column-header">
          <span className="cp-mode-dot cp-mode-dot--dark" />
          Dark Mode
        </div>
        <div className="cp-grid">
          {COLOR_ROLES.map((role) => (
            <Swatch key={role.key} color={dark[role.key]} role={role} />
          ))}
        </div>
      </div>
    </div>
  )
}
