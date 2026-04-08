import React, { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { generateRadixScale } from '../lib/generateRadixScale'
import '../components/kit/ColorPalette.css'
import './CreatePage.css'

const CATEGORIES = [
  { label: 'Backgrounds', steps: [1, 2] },
  { label: 'Interactive components', steps: [3, 4, 5] },
  { label: 'Borders and separators', steps: [6, 7, 8] },
  { label: 'Solid colors', steps: [9, 10] },
  { label: 'Accessible text', steps: [11, 12] },
]

const DEFAULTS = {
  accent: '2563EB',
  gray: '64748B',
  background: 'F8FAFC',
}

function isValidHex(str) {
  return /^#?([0-9a-f]{3}|[0-9a-f]{6})$/i.test(str.trim())
}

function normalizeHex(str) {
  const clean = str.replace('#', '').trim()
  if (clean.length === 3) {
    return '#' + clean.split('').map(c => c + c).join('')
  }
  return '#' + clean
}

function ScaleGrid({ label, hex, mode }) {
  const [hoveredStep, setHoveredStep] = useState(null)
  const valid = isValidHex(hex)
  const steps = useMemo(() => {
    if (!valid) return []
    try { return generateRadixScale(normalizeHex(hex), mode) } catch { return [] }
  }, [hex, mode, valid])

  if (!valid || steps.length === 0) {
    return (
      <div className="cp-row" style={{ display: 'flex' }}>
        <div className="cp-row-label">{label}</div>
        {Array.from({ length: 12 }, (_, i) => (
          <div key={i} className="cp-cell cp-cell--empty" />
        ))}
      </div>
    )
  }

  return (
    <div className="cp-row" style={{ display: 'contents' }}>
      <div className="cp-row-label">{label}</div>
      {steps.map((step) => (
        <div
          key={step.step}
          className="cp-cell"
          style={{ background: step.hex }}
          onMouseEnter={() => setHoveredStep(step)}
          onMouseLeave={() => setHoveredStep(null)}
        >
          {hoveredStep?.step === step.step && (
            <div className="cp-cell-tooltip">
              <span className="cp-cell-tooltip-label">{step.label}</span>
              <span className="cp-cell-tooltip-hex">{step.hex.toUpperCase()}</span>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

function ColorInput({ label, value, onChange }) {
  const valid = isValidHex(value)
  const previewHex = valid ? normalizeHex(value) : '#cccccc'

  return (
    <div className="cr-color-group">
      <span className="cr-color-label">{label}</span>
      <div className={`cr-color-field${!valid && value ? ' cr-color-field--invalid' : ''}`}>
        <div className="cr-color-swatch" style={{ background: previewHex }} />
        <input
          className="cr-color-hex"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="2563EB"
          spellCheck={false}
          maxLength={7}
        />
      </div>
    </div>
  )
}

function buildKitFromInputs(accent, gray, bg, mode) {
  return {
    palette: {
      [mode]: {
        primary: normalizeHex(accent),
        secondary: normalizeHex(gray),
        background: normalizeHex(bg),
        surface: normalizeHex(bg),
        accent: normalizeHex(accent),
      },
    },
  }
}

export default function CreatePage() {
  const [mode, setMode] = useState('light')
  const [accent, setAccent] = useState(DEFAULTS.accent)
  const [gray, setGray] = useState(DEFAULTS.gray)
  const [background, setBackground] = useState(DEFAULTS.background)
  const [copied, setCopied] = useState(false)

  const allValid = isValidHex(accent) && isValidHex(gray) && isValidHex(background)

  const accentSteps = useMemo(() => {
    if (!isValidHex(accent)) return []
    try { return generateRadixScale(normalizeHex(accent), mode) } catch { return [] }
  }, [accent, mode])

  const graySteps = useMemo(() => {
    if (!isValidHex(gray)) return []
    try { return generateRadixScale(normalizeHex(gray), mode) } catch { return [] }
  }, [gray, mode])

  function buildTokensCSS() {
    if (!allValid) return ''
    const aSteps = generateRadixScale(normalizeHex(accent), mode)
    const gSteps = generateRadixScale(normalizeHex(gray), mode)
    const vars = [
      ...aSteps.map((s, i) => `  --accent-${i + 1}: ${s.hex};`),
      ...gSteps.map((s, i) => `  --gray-${i + 1}: ${s.hex};`),
      `  --background: ${normalizeHex(background)};`,
    ]
    return `:root {\n${vars.join('\n')}\n}`
  }

  function handleCopy() {
    const css = buildTokensCSS()
    if (!css) return
    navigator.clipboard.writeText(css).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <div className="cr-page">
      <div className="cr-inner">
        <Link to="/" className="cr-back">← HuePrint</Link>

        <div className="cr-hero">
          <h1 className="cr-title">Create a custom palette</h1>

          <div className="kd-mode-toggle" role="group" aria-label="Color mode" style={{ marginBottom: 0 }}>
            <button
              className={`kd-toggle-btn${mode === 'light' ? ' kd-toggle-btn--active' : ''}`}
              onClick={() => setMode('light')}
            >
              ☀ Light
            </button>
            <button
              className={`kd-toggle-btn${mode === 'dark' ? ' kd-toggle-btn--active' : ''}`}
              onClick={() => setMode('dark')}
            >
              ◑ Dark
            </button>
          </div>
        </div>

        {/* Input row */}
        <div className="cr-inputs-row">
          <ColorInput label="Accent" value={accent} onChange={setAccent} />
          <ColorInput label="Gray" value={gray} onChange={setGray} />
          <ColorInput label="Background" value={background} onChange={setBackground} />

          <div className="cr-copy-wrap">
            <button
              className="cr-copy-btn"
              onClick={handleCopy}
              disabled={!allValid}
            >
              {copied ? '✓ Copied!' : 'Copy CSS'}
            </button>
          </div>
        </div>

        {/* 12-step color scale — Radix style grid */}
        <div className="cr-scale-wrap">
          <div className="cp-root">
            {/* Category headers */}
            <div className="cp-categories-row" style={{ display: 'contents' }}>
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

            {/* Divider */}
            <div className="cp-divider-row" style={{ display: 'contents' }}>
              <div className="cp-row-label-spacer" />
              <div className="cp-divider-line" />
            </div>

            {/* Step numbers */}
            <div className="cp-numbers-row" style={{ display: 'contents' }}>
              <div className="cp-row-label-spacer" />
              {Array.from({ length: 12 }, (_, i) => (
                <div key={i + 1} className="cp-step-num">{i + 1}</div>
              ))}
            </div>

            {/* Accent scale */}
            <ScaleGrid label="Accent" hex={accent} mode={mode} />

            {/* Gray scale */}
            <ScaleGrid label="Gray" hex={gray} mode={mode} />
          </div>
        </div>

        {/* How to use tip */}
        <p className="cr-tip">
          Enter any hex color — the 12 steps are generated using perceptual lightness curves,
          same as Radix Colors. Copy the CSS variables and paste into your AI tool.
        </p>
      </div>
    </div>
  )
}
