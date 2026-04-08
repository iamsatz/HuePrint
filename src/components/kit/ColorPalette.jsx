import React, { useState } from 'react'
import { generateRadixScale } from '../../lib/generateRadixScale'
import './ColorPalette.css'

const SCALE_COLORS = [
  { key: 'primary', label: 'Primary' },
  { key: 'secondary', label: 'Secondary' },
  { key: 'accent', label: 'Accent' },
  { key: 'success', label: 'Success' },
  { key: 'warning', label: 'Warning' },
]

const SEMANTIC_ROLES = [
  { key: 'background', label: 'Background' },
  { key: 'surface', label: 'Surface' },
  { key: 'text', label: 'Text' },
  { key: 'textMuted', label: 'Text Muted' },
  { key: 'border', label: 'Border' },
]

function ScaleStep({ step, isLast }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      className="cp-step"
      style={{ background: step.hex }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      title={`Step ${step.step}: ${step.label} — ${step.hex}`}
    >
      {hovered && (
        <div className="cp-step-tooltip">
          <span className="cp-step-tooltip-label">{step.label}</span>
          <span className="cp-step-tooltip-hex">{step.hex}</span>
        </div>
      )}
      <span
        className="cp-step-num"
        style={{ color: step.isLight ? 'rgba(0,0,0,0.45)' : 'rgba(255,255,255,0.5)' }}
      >
        {step.step}
      </span>
    </div>
  )
}

function ColorScale({ colorKey, label, palette, mode }) {
  const hex = palette[colorKey]
  if (!hex) return null
  const steps = generateRadixScale(hex, mode)

  return (
    <div className="cp-scale-row">
      <div className="cp-scale-label">
        <span className="cp-scale-swatch" style={{ background: hex }} />
        <span className="cp-scale-name">{label}</span>
        <span className="cp-scale-hex">{hex}</span>
      </div>
      <div className="cp-scale-steps">
        {steps.map((step) => (
          <ScaleStep key={step.step} step={step} />
        ))}
      </div>
    </div>
  )
}

function SemanticSwatch({ colorKey, label, palette }) {
  const hex = palette[colorKey]
  const [hovered, setHovered] = useState(false)

  return (
    <div
      className="cp-semantic-swatch"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="cp-semantic-rect" style={{ background: hex }} title={hex} />
      <div className="cp-semantic-info">
        <span className="cp-semantic-role">{label}</span>
        <span className="cp-semantic-hex">{hex}</span>
      </div>
    </div>
  )
}

export default function ColorPalette({ kit, mode = 'light' }) {
  if (!kit) return null
  const palette = kit.palette[mode]

  return (
    <div className="cp-root">
      <div className="cp-scales-header">
        <span className="cp-scales-title">Color Scales</span>
        <span className="cp-scales-hint">Hover any step to see its semantic purpose and hex value</span>
        <div className="cp-step-labels">
          {Array.from({ length: 12 }, (_, i) => (
            <span key={i + 1} className="cp-step-label-num">{i + 1}</span>
          ))}
        </div>
      </div>

      <div className="cp-scales">
        {SCALE_COLORS.map(({ key, label }) => (
          <ColorScale
            key={key}
            colorKey={key}
            label={label}
            palette={palette}
            mode={mode}
          />
        ))}
      </div>

      <div className="cp-semantic-section">
        <span className="cp-scales-title">Semantic Roles</span>
        <div className="cp-semantic-grid">
          {SEMANTIC_ROLES.map(({ key, label }) => (
            <SemanticSwatch key={key} colorKey={key} label={label} palette={palette} />
          ))}
        </div>
      </div>
    </div>
  )
}
