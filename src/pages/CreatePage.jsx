import React, { useState, useCallback, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { parseFigmaJson } from '../lib/parseFigmaJson'
import {
  generateClaudePrompt,
  generateV0Config,
  generateCursorRules,
  generateReplitPrompt,
} from '../lib/exportGenerators'
import './CreatePage.css'

const ROLES = [
  { key: 'primary', label: 'Primary', required: true, hint: 'CTAs, buttons, links' },
  { key: 'secondary', label: 'Secondary', required: false, hint: 'Auto-derived from primary' },
  { key: 'background', label: 'Background', required: true, hint: 'Page-level background' },
  { key: 'surface', label: 'Surface', required: false, hint: 'Auto-derived from background' },
  { key: 'text', label: 'Text', required: true, hint: 'Body copy, headings' },
]

const DEFAULT_COLORS = {
  primary: '#7c3aed',
  secondary: '',
  background: '#ffffff',
  surface: '',
  text: '#111827',
}

function isValidHex(val) {
  return /^#[0-9a-fA-F]{3,8}$/.test((val || '').trim())
}

function normalizeHex(val) {
  if (!val || !isValidHex(val)) return null
  let hex = val.replace('#', '')
  if (hex.length === 3) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2]
  }
  if (hex.length > 6) {
    hex = hex.slice(0, 6)
  }
  return hex
}

function deriveSecondary(primary) {
  const hex = normalizeHex(primary)
  if (!hex) return '#a855f7'
  let r = parseInt(hex.slice(0, 2), 16)
  let g = parseInt(hex.slice(2, 4), 16)
  let b = parseInt(hex.slice(4, 6), 16)
  r = Math.min(255, Math.round(r + (255 - r) * 0.25))
  g = Math.min(255, Math.round(g + (255 - g) * 0.25))
  b = Math.min(255, Math.round(b + (255 - b) * 0.25))
  return '#' + [r, g, b].map((v) => v.toString(16).padStart(2, '0')).join('')
}

function deriveSurface(background) {
  const hex = normalizeHex(background)
  if (!hex) return '#f9fafb'
  let r = parseInt(hex.slice(0, 2), 16)
  let g = parseInt(hex.slice(2, 4), 16)
  let b = parseInt(hex.slice(4, 6), 16)
  const isDark = (r * 299 + g * 587 + b * 114) / 1000 < 128
  if (isDark) {
    r = Math.min(255, r + 20)
    g = Math.min(255, g + 20)
    b = Math.min(255, b + 20)
  } else {
    r = Math.max(0, r - 12)
    g = Math.max(0, g - 10)
    b = Math.max(0, b - 8)
  }
  return '#' + [r, g, b].map((v) => v.toString(16).padStart(2, '0')).join('')
}

function buildKitFromColors(values, kitName) {
  const primary = values.primary || '#7c3aed'
  const secondary = (values.secondary && isValidHex(values.secondary))
    ? values.secondary
    : deriveSecondary(primary)
  const background = values.background || '#ffffff'
  const surface = (values.surface && isValidHex(values.surface))
    ? values.surface
    : deriveSurface(background)
  const text = values.text || '#111827'

  const bgHex = normalizeHex(background) || 'ffffff'
  let bgR = parseInt(bgHex.slice(0, 2), 16)
  let bgG = parseInt(bgHex.slice(2, 4), 16)
  let bgB = parseInt(bgHex.slice(4, 6), 16)
  const isDark = (bgR * 299 + bgG * 587 + bgB * 114) / 1000 < 128

  return {
    id: 'custom',
    name: kitName || 'My Custom Kit',
    industry: 'Custom',
    description: 'Your custom brand kit.',
    palette: {
      light: {
        background,
        surface,
        primary,
        secondary,
        accent: secondary,
        text,
        textMuted: isDark ? '#9ca3af' : '#6b7280',
        border: isDark ? '#374151' : '#e5e7eb',
        success: '#10b981',
        warning: '#f59e0b',
      },
      dark: {
        background: isDark ? background : '#111827',
        surface: isDark ? surface : '#1f2937',
        primary,
        secondary,
        accent: secondary,
        text: isDark ? text : '#f9fafb',
        textMuted: '#9ca3af',
        border: '#374151',
        success: '#34d399',
        warning: '#fcd34d',
      },
    },
  }
}

function LivePreviewComponents({ kit }) {
  const ref = useRef(null)

  useEffect(() => {
    if (!ref.current || !kit) return
    const el = ref.current
    const palette = kit.palette.light
    const roles = ['background', 'surface', 'primary', 'secondary', 'accent', 'text', 'textMuted', 'border', 'success', 'warning']
    roles.forEach((role) => {
      if (palette[role]) el.style.setProperty(`--hp-${role}`, palette[role])
    })
  }, [kit])

  if (!kit) return null

  return (
    <div className="lp-components" ref={ref}>
      <div className="lp-comp-section">
        <div className="lp-comp-label">Auth Form</div>
        <div className="lp-auth-card">
          <div className="lp-auth-logo">◈ Acme</div>
          <div className="lp-auth-title">Create an account</div>
          <div className="lp-auth-sub">Sign up to get started today</div>
          <div className="lp-field">
            <label className="lp-label">Email</label>
            <input className="lp-input" type="email" placeholder="you@example.com" readOnly />
          </div>
          <div className="lp-field">
            <label className="lp-label">Password</label>
            <input className="lp-input" type="password" placeholder="••••••••" readOnly />
          </div>
          <button className="lp-btn lp-btn--primary lp-btn--full">Create account</button>
          <button className="lp-btn lp-btn--ghost lp-btn--full">Continue with GitHub</button>
        </div>
      </div>

      <div className="lp-comp-section">
        <div className="lp-comp-label">Buttons</div>
        <div className="lp-btn-row">
          <button className="lp-btn lp-btn--primary">Primary</button>
          <button className="lp-btn lp-btn--secondary">Secondary</button>
          <button className="lp-btn lp-btn--ghost">Ghost</button>
        </div>
        <div className="lp-comp-label" style={{ marginTop: 16 }}>Badges</div>
        <div className="lp-badge-row">
          <span className="lp-badge lp-badge--primary">Primary</span>
          <span className="lp-badge lp-badge--secondary">Secondary</span>
          <span className="lp-badge lp-badge--success">Success</span>
          <span className="lp-badge lp-badge--warning">Warning</span>
        </div>
      </div>

      <div className="lp-comp-section">
        <div className="lp-comp-label">Stat Cards</div>
        <div className="lp-stats">
          <div className="lp-stat lp-stat--primary">
            <div className="lp-stat-label">Revenue</div>
            <div className="lp-stat-value">$48,295</div>
            <div className="lp-stat-trend">↑ +12.4%</div>
          </div>
          <div className="lp-stat">
            <div className="lp-stat-label">Users</div>
            <div className="lp-stat-value">8,431</div>
            <div className="lp-stat-trend">↑ +5.2%</div>
          </div>
          <div className="lp-stat">
            <div className="lp-stat-label">Conversion</div>
            <div className="lp-stat-value">3.68%</div>
            <div className="lp-stat-trend lp-stat-trend--down">↓ −0.8%</div>
          </div>
        </div>
      </div>

      <div className="lp-comp-section">
        <div className="lp-comp-label">Card</div>
        <div className="lp-card">
          <div className="lp-card-header">
            <span className="lp-card-title">Card Title</span>
            <span className="lp-badge lp-badge--primary">New</span>
          </div>
          <div className="lp-card-body">
            Cards use surface color and border tokens from the kit for consistent theming.
          </div>
          <div className="lp-card-footer">
            <button className="lp-btn lp-btn--ghost lp-btn--sm">Cancel</button>
            <button className="lp-btn lp-btn--primary lp-btn--sm">Confirm</button>
          </div>
        </div>
      </div>
    </div>
  )
}

function LivePreviewApp({ kit }) {
  const ref = useRef(null)

  useEffect(() => {
    if (!ref.current || !kit) return
    const el = ref.current
    const palette = kit.palette.light
    const roles = ['background', 'surface', 'primary', 'secondary', 'accent', 'text', 'textMuted', 'border', 'success', 'warning']
    roles.forEach((role) => {
      if (palette[role]) el.style.setProperty(`--hp-${role}`, palette[role])
    })
  }, [kit])

  if (!kit) return null

  return (
    <div className="lp-app" ref={ref}>
      <nav className="lp-app-nav">
        <div className="lp-app-logo">◈ Brand</div>
        <div className="lp-app-nav-links">
          <a className="lp-app-nav-link lp-app-nav-link--active">Home</a>
          <a className="lp-app-nav-link">Features</a>
          <a className="lp-app-nav-link">Pricing</a>
          <a className="lp-app-nav-link">Docs</a>
        </div>
        <button className="lp-btn lp-btn--primary lp-btn--sm">Get Started</button>
      </nav>

      <section className="lp-app-hero">
        <div className="lp-app-hero-eyebrow">Introducing v2.0</div>
        <h1 className="lp-app-hero-h1">Build faster with your brand</h1>
        <p className="lp-app-hero-sub">
          The design system that keeps your product on-brand from day one. Every component, every token, every export — yours.
        </p>
        <div className="lp-app-hero-ctas">
          <button className="lp-btn lp-btn--primary">Start for free</button>
          <button className="lp-btn lp-btn--ghost">See demo →</button>
        </div>
      </section>

      <section className="lp-app-features">
        <div className="lp-app-feature-card">
          <div className="lp-app-feature-icon">⚡</div>
          <div className="lp-app-feature-title">Instant Tokens</div>
          <div className="lp-app-feature-body">Generate CSS variables, Tailwind configs, and more from your brand palette.</div>
        </div>
        <div className="lp-app-feature-card">
          <div className="lp-app-feature-icon">🎨</div>
          <div className="lp-app-feature-title">Live Preview</div>
          <div className="lp-app-feature-body">See every component update in real time as you pick your colors.</div>
        </div>
        <div className="lp-app-feature-card">
          <div className="lp-app-feature-icon">🤖</div>
          <div className="lp-app-feature-title">AI-Ready Export</div>
          <div className="lp-app-feature-body">Export for Claude, v0, Cursor, and Replit with a single click.</div>
        </div>
      </section>

      <footer className="lp-app-footer">
        <div className="lp-app-footer-logo">◈ Brand</div>
        <div className="lp-app-footer-copy">© 2025 Brand Inc. All rights reserved.</div>
        <div className="lp-app-footer-links">
          <a className="lp-app-footer-link">Privacy</a>
          <a className="lp-app-footer-link">Terms</a>
          <a className="lp-app-footer-link">Contact</a>
        </div>
      </footer>
    </div>
  )
}

const EXPORT_TABS = [
  { id: 'claude', label: 'Claude', filename: 'system-prompt.md', generate: generateClaudePrompt },
  { id: 'v0', label: 'v0', filename: 'tailwind.config.js', generate: generateV0Config },
  { id: 'cursor', label: 'Cursor', filename: '.cursor/rules', generate: generateCursorRules },
  { id: 'replit', label: 'Replit', filename: 'replit-prompt.md', generate: generateReplitPrompt },
]

function ExportPanel({ kit, onClose }) {
  const [activeTab, setActiveTab] = useState('claude')
  const [copied, setCopied] = useState(false)

  const tab = EXPORT_TABS.find((t) => t.id === activeTab)
  const output = tab && kit ? tab.generate(kit) : ''

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(output)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      const el = document.createElement('textarea')
      el.value = output
      document.body.appendChild(el)
      el.select()
      document.execCommand('copy')
      document.body.removeChild(el)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }, [output])

  const handleDownload = useCallback(() => {
    const blob = new Blob([output], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = tab.filename
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }, [output, tab])

  return (
    <div className="cp-export-panel">
      <div className="cp-export-header">
        <div>
          <h3 className="cp-export-title">Export for AI Tools</h3>
          <p className="cp-export-sub">Generate design token context for your AI coding assistant.</p>
        </div>
        <button className="cp-export-close" onClick={onClose} aria-label="Close export panel">✕</button>
      </div>
      <div className="cp-export-tabs">
        {EXPORT_TABS.map((t) => (
          <button
            key={t.id}
            className={`cp-export-tab ${activeTab === t.id ? 'cp-export-tab--active' : ''}`}
            onClick={() => setActiveTab(t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>
      <pre className="cp-export-code">{output}</pre>
      <div className="cp-export-actions">
        <button className="cp-export-btn" onClick={handleCopy}>
          {copied ? '✓ Copied!' : 'Copy'}
        </button>
        <button className="cp-export-btn" onClick={handleDownload}>
          Download
        </button>
      </div>
    </div>
  )
}

function ColorInput({ roleKey, label, hint, required, value, onChange }) {
  const pickerRef = useRef(null)

  function handlePickerChange(e) {
    onChange(roleKey, e.target.value)
  }

  function handleTextChange(e) {
    onChange(roleKey, e.target.value)
  }

  function openPicker() {
    pickerRef.current?.click()
  }

  const valid = value && isValidHex(value)

  return (
    <div className="cp-color-row">
      <button
        className="cp-swatch-btn"
        type="button"
        onClick={openPicker}
        style={valid ? { background: value, borderColor: value } : {}}
        aria-label={`Pick color for ${label}`}
        title="Click to open color picker"
      >
        {!valid && <span className="cp-swatch-empty-icon">+</span>}
      </button>
      <input
        ref={pickerRef}
        type="color"
        className="cp-picker-hidden"
        value={valid ? value : '#7c3aed'}
        onChange={handlePickerChange}
        tabIndex={-1}
      />
      <div className="cp-color-info">
        <div className="cp-color-label-row">
          <span className="cp-color-label">{label}</span>
          {required && <span className="cp-color-required">*</span>}
          {!required && <span className="cp-color-optional">auto</span>}
        </div>
        <span className="cp-color-hint">{hint}</span>
      </div>
      <input
        type="text"
        className={`cp-hex-input ${value && !valid ? 'cp-hex-input--error' : ''}`}
        value={value}
        onChange={handleTextChange}
        placeholder="#7c3aed"
        maxLength={9}
        spellCheck={false}
      />
    </div>
  )
}

function BuilderTab({ values, onChange }) {
  return (
    <div className="cp-builder-colors">
      {ROLES.map((role) => (
        <ColorInput
          key={role.key}
          roleKey={role.key}
          label={role.label}
          hint={role.hint}
          required={role.required}
          value={values[role.key] || ''}
          onChange={onChange}
        />
      ))}
    </div>
  )
}

function ImportTab({ onImport }) {
  const [jsonText, setJsonText] = useState('')
  const [parseError, setParseError] = useState('')
  const [parsed, setParsed] = useState(null)
  const [isDragOver, setIsDragOver] = useState(false)

  function handleParse() {
    if (!jsonText.trim()) {
      setParseError('Paste or drop a Figma variables JSON file.')
      return
    }
    try {
      const result = parseFigmaJson(jsonText)
      setParsed(result)
      setParseError('')
      onImport(result.palette)
    } catch (e) {
      setParseError('Could not parse JSON: ' + e.message)
      setParsed(null)
    }
  }

  function handleDrop(e) {
    e.preventDefault()
    setIsDragOver(false)
    const file = e.dataTransfer.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => setJsonText(ev.target.result)
    reader.readAsText(file)
  }

  return (
    <div className="cp-import-tab">
      <div
        className={`cp-drop-zone ${isDragOver ? 'cp-drop-zone--active' : ''}`}
        onDragOver={(e) => { e.preventDefault(); setIsDragOver(true) }}
        onDragLeave={() => setIsDragOver(false)}
        onDrop={handleDrop}
      >
        <p className="cp-drop-hint">Drop a <code>.json</code> file here or paste below</p>
        <textarea
          className="cp-json-textarea"
          placeholder={'Paste Figma variables JSON here…\n\nExample:\n{\n  "variables": [\n    { "name": "color/primary", "value": "#7c3aed" },\n    { "name": "color/background", "value": "#ffffff" }\n  ]\n}'}
          value={jsonText}
          onChange={(e) => { setJsonText(e.target.value); setParseError(''); setParsed(null) }}
          rows={8}
        />
      </div>
      <button className="cp-parse-btn" type="button" onClick={handleParse}>Parse JSON</button>
      {parseError && <p className="cp-parse-error">{parseError}</p>}
      {parsed && (
        <div className="cp-parse-success">
          <span>✓</span> Detected {Object.keys(parsed.palette).length} color roles — live preview updated
        </div>
      )}
    </div>
  )
}

export default function CreatePage() {
  const [activeTab, setActiveTab] = useState('build')
  const [previewTab, setPreviewTab] = useState('components')
  const [values, setValues] = useState({ ...DEFAULT_COLORS })
  const [kitName, setKitName] = useState('')
  const [showExport, setShowExport] = useState(false)

  const hasRequiredColors = isValidHex(values.primary) && isValidHex(values.background) && isValidHex(values.text)
  const kit = hasRequiredColors ? buildKitFromColors(values, kitName) : null

  function handleColorChange(key, val) {
    setValues((prev) => ({ ...prev, [key]: val }))
  }

  function handleImport(palette) {
    const next = { ...DEFAULT_COLORS }
    for (const role of ROLES) {
      if (palette[role.key]) next[role.key] = palette[role.key]
    }
    setValues(next)
    setActiveTab('build')
  }

  return (
    <div className="cp-page">
      <div className="cp-layout">
        <div className="cp-left">
          <div className="cp-left-header">
            <Link to="/" className="cp-back">← Back</Link>
            <h1 className="cp-title">Build Your Kit</h1>
            <p className="cp-subtitle">Pick colors and see your UI update live.</p>
          </div>

          <div className="cp-tabs">
            <button
              className={`cp-tab ${activeTab === 'build' ? 'cp-tab--active' : ''}`}
              onClick={() => setActiveTab('build')}
              type="button"
            >
              Color Picker
            </button>
            <button
              className={`cp-tab ${activeTab === 'import' ? 'cp-tab--active' : ''}`}
              onClick={() => setActiveTab('import')}
              type="button"
            >
              Import JSON
            </button>
          </div>

          <div className="cp-left-body">
            {activeTab === 'build' ? (
              <>
                <div className="cp-kit-name-row">
                  <label className="cp-kit-name-label">Kit Name</label>
                  <input
                    className="cp-kit-name-input"
                    type="text"
                    placeholder="My Brand Kit"
                    value={kitName}
                    onChange={(e) => setKitName(e.target.value)}
                  />
                </div>
                <BuilderTab values={values} onChange={handleColorChange} />
              </>
            ) : (
              <ImportTab onImport={handleImport} />
            )}
          </div>

          <div className="cp-left-footer">
            {showExport && kit ? (
              <ExportPanel kit={kit} onClose={() => setShowExport(false)} />
            ) : (
              <button
                className="cp-save-btn"
                type="button"
                onClick={() => setShowExport(true)}
                disabled={!hasRequiredColors}
                title={!hasRequiredColors ? 'Set Primary, Background, and Text colors first' : ''}
              >
                Save &amp; Export
              </button>
            )}
          </div>
        </div>

        <div className="cp-right">
          <div className="cp-preview-header">
            <div className="cp-preview-tabs">
              <button
                className={`cp-preview-tab ${previewTab === 'components' ? 'cp-preview-tab--active' : ''}`}
                onClick={() => setPreviewTab('components')}
                type="button"
              >
                Components
              </button>
              <button
                className={`cp-preview-tab ${previewTab === 'app' ? 'cp-preview-tab--active' : ''}`}
                onClick={() => setPreviewTab('app')}
                type="button"
              >
                App Preview
              </button>
            </div>
            {!hasRequiredColors && (
              <span className="cp-preview-hint">Set Primary, Background &amp; Text to see preview</span>
            )}
          </div>

          <div className="cp-preview-body">
            {!hasRequiredColors ? (
              <div className="cp-preview-empty">
                <div className="cp-preview-empty-icon">🎨</div>
                <p>Set your Primary, Background, and Text colors to see a live preview of your kit.</p>
              </div>
            ) : previewTab === 'components' ? (
              <LivePreviewComponents kit={kit} />
            ) : (
              <LivePreviewApp kit={kit} />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
