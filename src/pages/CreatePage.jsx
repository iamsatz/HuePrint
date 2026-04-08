import React, { useState, useCallback, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { parseFigmaJson } from '../lib/parseFigmaJson'
import { BRAND_GUIDELINES, SUGGESTED_BRANDS } from '../lib/brandGuidelines'
import {
  generateClaudePrompt,
  generateV0Config,
  generateCursorRules,
  generateReplitPrompt,
} from '../lib/exportGenerators'
import { FONT_PAIRS, FONT_PAIR_GROUPS, getDefaultPair } from '../lib/fontPairs'
import { loadFontPair } from '../lib/loadGoogleFont'
import PreviewDashboard from '../components/create/previews/PreviewDashboard'
import PreviewPortfolio from '../components/create/previews/PreviewPortfolio'
import PreviewBlog from '../components/create/previews/PreviewBlog'
import PreviewEcommerceShop from '../components/create/previews/PreviewEcommerceShop'
import PreviewProductPage from '../components/create/previews/PreviewProductPage'
import PreviewPricing from '../components/create/previews/PreviewPricing'
import PreviewSignIn from '../components/create/previews/PreviewSignIn'
import PreviewSignUp from '../components/create/previews/PreviewSignUp'
import PreviewSettings from '../components/create/previews/PreviewSettings'
import PreviewProfile from '../components/create/previews/PreviewProfile'
import PreviewDocumentation from '../components/create/previews/PreviewDocumentation'
import PreviewAdminTable from '../components/create/previews/PreviewAdminTable'
import PreviewOnboarding from '../components/create/previews/PreviewOnboarding'
import PreviewRestaurant from '../components/create/previews/PreviewRestaurant'
import PreviewRealEstate from '../components/create/previews/PreviewRealEstate'
import PreviewJobBoard from '../components/create/previews/PreviewJobBoard'
import PreviewAnalytics from '../components/create/previews/PreviewAnalytics'
import PreviewError404 from '../components/create/previews/PreviewError404'
import PreviewWaitlist from '../components/create/previews/PreviewWaitlist'
import './CreatePage.css'

const PREVIEW_PAGES = [
  { id: 'components', icon: '🧩', label: 'Components', component: null },
  { id: 'saas', icon: '🚀', label: 'SaaS Landing', component: null },
  { id: 'dashboard', icon: '📊', label: 'Dashboard', component: PreviewDashboard },
  { id: 'portfolio', icon: '🎨', label: 'Portfolio', component: PreviewPortfolio },
  { id: 'blog', icon: '📝', label: 'Blog', component: PreviewBlog },
  { id: 'ecommerce', icon: '🛍', label: 'E-commerce Shop', component: PreviewEcommerceShop },
  { id: 'product', icon: '📦', label: 'Product Page', component: PreviewProductPage },
  { id: 'pricing', icon: '💳', label: 'Pricing Page', component: PreviewPricing },
  { id: 'signin', icon: '🔑', label: 'Sign-in / Auth', component: PreviewSignIn },
  { id: 'signup', icon: '📋', label: 'Sign-up Flow', component: PreviewSignUp },
  { id: 'settings', icon: '⚙️', label: 'Settings', component: PreviewSettings },
  { id: 'profile', icon: '👤', label: 'Profile', component: PreviewProfile },
  { id: 'docs', icon: '📖', label: 'Documentation', component: PreviewDocumentation },
  { id: 'admin', icon: '🗂', label: 'Admin Table', component: PreviewAdminTable },
  { id: 'onboarding', icon: '🎯', label: 'Onboarding', component: PreviewOnboarding },
  { id: 'restaurant', icon: '🍽', label: 'Restaurant / Menu', component: PreviewRestaurant },
  { id: 'realestate', icon: '🏠', label: 'Real Estate', component: PreviewRealEstate },
  { id: 'jobs', icon: '💼', label: 'Job Board', component: PreviewJobBoard },
  { id: 'analytics', icon: '📈', label: 'Analytics', component: PreviewAnalytics },
  { id: 'error', icon: '⚠️', label: '404 / Error', component: PreviewError404 },
  { id: 'waitlist', icon: '⏳', label: 'Waitlist / Coming Soon', component: PreviewWaitlist },
]

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

function buildKitFromColors(values, kitName, fontPair) {
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

  const pair = fontPair || getDefaultPair()

  return {
    id: 'custom',
    name: kitName || 'My Custom Kit',
    industry: 'Custom',
    description: 'Your custom brand kit.',
    typography: {
      headingFont: pair.heading,
      bodyFont: pair.body,
      baseFontSize: '16px',
      lineHeight: '1.6',
    },
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
    if (kit.typography) {
      if (kit.typography.headingFont) el.style.setProperty('--hp-heading-font', `'${kit.typography.headingFont}', sans-serif`)
      if (kit.typography.bodyFont) el.style.setProperty('--hp-body-font', `'${kit.typography.bodyFont}', sans-serif`)
    }
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
    if (kit.typography) {
      if (kit.typography.headingFont) el.style.setProperty('--hp-heading-font', `'${kit.typography.headingFont}', sans-serif`)
      if (kit.typography.bodyFont) el.style.setProperty('--hp-body-font', `'${kit.typography.bodyFont}', sans-serif`)
    }
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

function FontPairPicker({ value, onChange }) {
  const groups = FONT_PAIR_GROUPS.map((group) => ({
    group,
    pairs: FONT_PAIRS.filter((p) => p.personality === group),
  }))

  return (
    <div className="cp-typography-section">
      <div className="cp-section-divider">
        <span className="cp-section-label">Typography</span>
      </div>
      <div className="cp-font-pair-row">
        <div className="cp-font-pair-info">
          <span className="cp-font-pair-label">Font Pair</span>
          <span className="cp-font-pair-hint">Heading / Body</span>
        </div>
        <select
          className="cp-font-pair-select"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          aria-label="Select font pair"
        >
          {groups.map(({ group, pairs }) => (
            <optgroup key={group} label={group}>
              {pairs.map((pair) => (
                <option key={pair.id} value={pair.id}>
                  {pair.heading} / {pair.body}
                </option>
              ))}
            </optgroup>
          ))}
        </select>
      </div>
      {value && (() => {
        const pair = FONT_PAIRS.find((p) => p.id === value)
        return pair ? (
          <p className="cp-font-pair-desc">{pair.description}</p>
        ) : null
      })()}
    </div>
  )
}

function BuilderTab({ values, onChange, fontPairId, onFontPairChange }) {
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
      <FontPairPicker value={fontPairId} onChange={onFontPairChange} />
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

const ROLE_LABELS = {
  background: 'Background',
  surface: 'Surface',
  primary: 'Primary',
  secondary: 'Secondary',
  text: 'Text',
}

function autoMapColors(colors) {
  if (!colors || colors.length === 0) return {}
  const mapping = {}
  const sorted = [...colors]

  function luminance(hex) {
    const r = parseInt(hex.slice(1, 3), 16) / 255
    const g = parseInt(hex.slice(3, 5), 16) / 255
    const b = parseInt(hex.slice(5, 7), 16) / 255
    return 0.2126 * r + 0.7152 * g + 0.0722 * b
  }

  function saturation(hex) {
    const r = parseInt(hex.slice(1, 3), 16) / 255
    const g = parseInt(hex.slice(3, 5), 16) / 255
    const b = parseInt(hex.slice(5, 7), 16) / 255
    const max = Math.max(r, g, b)
    const min = Math.min(r, g, b)
    return max === 0 ? 0 : (max - min) / max
  }

  const colorful = sorted.filter((h) => saturation(h) > 0.2)
  const light = sorted.filter((h) => luminance(h) > 0.7)
  const dark = sorted.filter((h) => luminance(h) < 0.15)

  mapping.primary = colorful[0] || sorted[0]
  mapping.background = light[0] || '#ffffff'
  mapping.text = dark[0] || '#111827'
  mapping.secondary = colorful[1] || colorful[0] || sorted[1] || sorted[0]
  mapping.surface = light[1] || light[0] || '#f9fafb'

  return mapping
}

function UrlExtractTab({ onUseColors, onSwitchToColorPicker }) {
  const [urlInput, setUrlInput] = useState('')
  const [status, setStatus] = useState('idle')
  const [extractedColors, setExtractedColors] = useState([])
  const [semantic, setSemantic] = useState({})
  const [domain, setDomain] = useState('')
  const [roleMapping, setRoleMapping] = useState({})
  const [selectedRole, setSelectedRole] = useState(null)
  const [errorMsg, setErrorMsg] = useState('')
  const abortRef = useRef(null)

  const brandSuggestion = urlInput.trim().toLowerCase().replace(/\s+/g, '')
  const matchedBrand = Object.keys(BRAND_GUIDELINES).find((b) => b === brandSuggestion)

  async function handleExtractWithUrl(targetUrl) {
    const url = (targetUrl || urlInput).trim()
    if (!url) return
    setStatus('loading')
    setErrorMsg('')
    setExtractedColors([])
    setSemantic({})
    setRoleMapping({})
    setSelectedRole(null)

    const controller = new AbortController()
    abortRef.current = controller

    try {
      const resp = await fetch('/api/extract-url', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
        signal: controller.signal,
      })
      const data = await resp.json()
      if (data.error) {
        setErrorMsg(data.message)
        setStatus('error')
      } else {
        setExtractedColors(data.colors || [])
        setSemantic(data.semantic || {})
        setDomain(data.domain || url)
        setRoleMapping(autoMapColors(data.colors || []))
        setStatus('success')
      }
    } catch (err) {
      if (err.name === 'AbortError') {
        setStatus('idle')
      } else {
        setErrorMsg('Something went wrong. Please try again.')
        setStatus('error')
      }
    }
  }

  function handleExtract() {
    handleExtractWithUrl(urlInput)
  }

  function handleCancel() {
    abortRef.current?.abort()
    setStatus('idle')
  }

  function handleReset() {
    setStatus('idle')
    setUrlInput('')
    setExtractedColors([])
    setSemantic({})
    setRoleMapping({})
    setSelectedRole(null)
    setErrorMsg('')
  }

  function handleRoleMappingSwatchClick(role) {
    setSelectedRole(selectedRole === role ? null : role)
  }

  function handleUse() {
    onUseColors(roleMapping)
  }

  function handleBrandChip(brand) {
    const url = BRAND_GUIDELINES[brand]
    setUrlInput(url)
    setTimeout(() => handleExtractWithUrl(url), 0)
  }

  function handleMatchedBrandClick() {
    const url = BRAND_GUIDELINES[matchedBrand]
    setUrlInput(url)
    setTimeout(() => handleExtractWithUrl(url), 0)
  }

  const displayDomain = domain || urlInput

  return (
    <div className="cp-extract-tab cp-url-extract-tab">
      {status === 'idle' && (
        <>
          <div className="cp-url-input-wrap">
            <input
              className="cp-url-input"
              type="url"
              placeholder="Paste any website URL..."
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && urlInput.trim() && handleExtract()}
              autoComplete="off"
              spellCheck={false}
            />
            {matchedBrand && (
              <button className="cp-url-brand-suggestion" onClick={handleMatchedBrandClick}>
                Use {matchedBrand.charAt(0).toUpperCase() + matchedBrand.slice(1)}'s brand guidelines →
              </button>
            )}
          </div>
          <button
            className="cp-url-extract-btn"
            type="button"
            disabled={!urlInput.trim()}
            onClick={handleExtract}
          >
            Extract Colors →
          </button>
          <div className="cp-url-brands">
            <span className="cp-url-brands-label">Or try a brand</span>
            <div className="cp-url-brand-chips">
              {SUGGESTED_BRANDS.map((brand) => (
                <button
                  key={brand}
                  className="cp-url-brand-chip"
                  type="button"
                  onClick={() => handleBrandChip(brand)}
                >
                  {brand.charAt(0).toUpperCase() + brand.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </>
      )}

      {status === 'loading' && (
        <div className="cp-url-loading">
          <div className="cp-url-spinner" />
          <p className="cp-url-loading-text">Fetching colors from <strong>{(() => { try { return new URL(urlInput.trim().startsWith('http') ? urlInput.trim() : 'https://' + urlInput.trim()).hostname } catch { return urlInput.trim() } })()}</strong>...</p>
          <button className="cp-url-cancel-btn" type="button" onClick={handleCancel}>Cancel</button>
        </div>
      )}

      {status === 'error' && (
        <div className="cp-url-error">
          <div className="cp-url-error-icon">⚠️</div>
          <p className="cp-url-error-title">We couldn't extract colors from this URL.</p>
          <p className="cp-url-error-sub">{errorMsg}</p>
          <div className="cp-url-error-actions">
            <button className="cp-url-try-again-btn" type="button" onClick={handleReset}>Try another URL</button>
            <button className="cp-url-picker-btn" type="button" onClick={onSwitchToColorPicker}>Use Color Picker instead</button>
          </div>
        </div>
      )}

      {status === 'success' && (
        <>
          <div className="cp-extract-section">
            <div className="cp-url-success-header">
              <span className="cp-url-success-count">Found {extractedColors.length} colors from <strong>{displayDomain}</strong></span>
              <button className="cp-url-reset-link" onClick={handleReset}>Try another URL</button>
            </div>
            <div className="cp-extract-swatches">
              {extractedColors.map((hex) => (
                <button
                  key={hex}
                  className={`cp-extract-swatch ${selectedRole ? 'cp-extract-swatch--selectable' : ''}`}
                  style={{ background: hex }}
                  title={selectedRole ? `Assign ${hex} to ${ROLE_LABELS[selectedRole]}` : hex}
                  onClick={() => {
                    if (selectedRole) {
                      setRoleMapping((prev) => ({ ...prev, [selectedRole]: hex }))
                      setSelectedRole(null)
                    }
                  }}
                />
              ))}
            </div>
            {selectedRole && (
              <p className="cp-extract-pick-hint">Click a swatch above to assign it to <strong>{ROLE_LABELS[selectedRole]}</strong></p>
            )}
          </div>

          {Object.keys(semantic).length > 0 && (
            <div className="cp-extract-section">
              <div className="cp-extract-section-label">
                Semantic CSS Variables <span className="cp-semantic-badge">Semantic</span>
              </div>
              <div className="cp-semantic-vars">
                {Object.entries(semantic).slice(0, 8).map(([name, value]) => (
                  <div key={name} className="cp-semantic-var-row">
                    <div className="cp-semantic-var-swatch" style={{ background: value }} />
                    <code className="cp-semantic-var-name">--{name}</code>
                    <span className="cp-semantic-var-value">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="cp-extract-section">
            <div className="cp-extract-section-label">Role Mapping</div>
            <div className="cp-extract-roles">
              {Object.entries(ROLE_LABELS).map(([role, label]) => {
                const hex = roleMapping[role]
                const isActive = selectedRole === role
                return (
                  <div
                    key={role}
                    className={`cp-extract-role-row ${isActive ? 'cp-extract-role-row--active' : ''}`}
                    onClick={() => handleRoleMappingSwatchClick(role)}
                    title={`Click to reassign ${label}`}
                  >
                    <div
                      className="cp-extract-role-swatch"
                      style={hex ? { background: hex } : { background: '#e5e7eb' }}
                    />
                    <div className="cp-extract-role-info">
                      <span className="cp-extract-role-label">{label}</span>
                      <span className="cp-extract-role-hex">{hex || '—'}</span>
                    </div>
                    <span className="cp-extract-role-edit">✏</span>
                  </div>
                )
              })}
            </div>
          </div>

          <button className="cp-save-btn" type="button" onClick={handleUse}>
            Use These Colors →
          </button>
        </>
      )}
    </div>
  )
}

export default function CreatePage() {
  const [activeTab, setActiveTab] = useState('build')
  const [previewPage, setPreviewPage] = useState('components')
  const [values, setValues] = useState({ ...DEFAULT_COLORS })
  const [kitName, setKitName] = useState('')
  const [showExport, setShowExport] = useState(false)
  const [fontPairId, setFontPairId] = useState(getDefaultPair().id)

  const selectedFontPair = FONT_PAIRS.find((p) => p.id === fontPairId) || getDefaultPair()

  useEffect(() => {
    loadFontPair(selectedFontPair.heading, selectedFontPair.body)
  }, [selectedFontPair])

  const hasRequiredColors = isValidHex(values.primary) && isValidHex(values.background) && isValidHex(values.text)
  const kit = hasRequiredColors ? buildKitFromColors(values, kitName, selectedFontPair) : null

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

  function handleFontPairChange(id) {
    setFontPairId(id)
    const pair = FONT_PAIRS.find((p) => p.id === id)
    if (pair) loadFontPair(pair.heading, pair.body)
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
            <button
              className={`cp-tab ${activeTab === 'extract' ? 'cp-tab--active' : ''}`}
              onClick={() => setActiveTab('extract')}
              type="button"
            >
              From URL
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
                <BuilderTab
                  values={values}
                  onChange={handleColorChange}
                  fontPairId={fontPairId}
                  onFontPairChange={handleFontPairChange}
                />
              </>
            ) : activeTab === 'import' ? (
              <ImportTab onImport={handleImport} />
            ) : (
              <UrlExtractTab onUseColors={handleImport} onSwitchToColorPicker={() => setActiveTab('build')} />
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
            <div className="cp-preview-dropdown-wrap">
              <select
                className="cp-preview-dropdown"
                value={previewPage}
                onChange={(e) => setPreviewPage(e.target.value)}
                aria-label="Select preview page type"
              >
                {PREVIEW_PAGES.map((p) => (
                  <option key={p.id} value={p.id}>{p.icon} {p.label}</option>
                ))}
              </select>
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
            ) : previewPage === 'components' ? (
              <LivePreviewComponents kit={kit} />
            ) : previewPage === 'saas' ? (
              <LivePreviewApp kit={kit} />
            ) : (() => {
              const page = PREVIEW_PAGES.find((p) => p.id === previewPage)
              const PageComponent = page?.component
              return PageComponent ? <PageComponent kit={kit} /> : null
            })()}
          </div>
        </div>
      </div>
    </div>
  )
}
