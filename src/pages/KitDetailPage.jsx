import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import ColorPalette from '../components/kit/ColorPalette'
import ComponentGallery from '../components/kit/ComponentGallery'
import TokenTable from '../components/kit/TokenTable'
import ExportPanel from '../components/kit-detail/ExportPanel'
import { useCustomKit } from '../context/CustomKitContext'
import './KitDetailPage.css'

function ColorInput({ label, hex }) {
  const display = hex ? hex.replace('#', '').toUpperCase() : ''
  return (
    <div className="kd-color-input-group">
      <span className="kd-color-input-label">{label}</span>
      <div className="kd-color-field">
        <div className="kd-color-swatch" style={{ background: hex || '#ccc' }} />
        <input
          className="kd-color-hex"
          value={display}
          readOnly
          spellCheck={false}
        />
      </div>
    </div>
  )
}

function CustomKitDetail({ kit }) {
  const { palette } = kit
  const light = palette?.light ?? {}
  const dark = palette?.dark ?? {}

  const roles = [
    'background', 'surface', 'primary', 'secondary', 'accent',
    'text', 'textMuted', 'border', 'success', 'warning',
  ]

  return (
    <div className="kit-detail-custom">
      <div className="kit-detail-custom-header">
        <h1 className="kit-detail-custom-name">{kit.name}</h1>
        <span className="kit-detail-custom-badge">{kit.industry}</span>
      </div>
      <p className="kit-detail-custom-desc">{kit.description}</p>

      <div className="kit-detail-palettes">
        <div className="kit-palette-block">
          <h2 className="kit-palette-title">Light Mode</h2>
          <div className="kit-palette-swatches">
            {roles.map((role) =>
              light[role] ? (
                <div key={role} className="kit-palette-swatch">
                  <div
                    className="kit-palette-dot"
                    style={{ background: light[role] }}
                    title={light[role]}
                  />
                  <span className="kit-palette-role">{role}</span>
                  <span className="kit-palette-hex">{light[role]}</span>
                </div>
              ) : null
            )}
          </div>
        </div>

        <div className="kit-palette-block">
          <h2 className="kit-palette-title">Dark Mode</h2>
          <div className="kit-palette-swatches">
            {roles.map((role) =>
              dark[role] ? (
                <div key={role} className="kit-palette-swatch">
                  <div
                    className="kit-palette-dot"
                    style={{ background: dark[role] }}
                    title={dark[role]}
                  />
                  <span className="kit-palette-role">{role}</span>
                  <span className="kit-palette-hex">{dark[role]}</span>
                </div>
              ) : null
            )}
          </div>
        </div>
      </div>

      <div className="kit-detail-export">
        <h2 className="kit-export-title">Export Tokens</h2>
        <p className="kit-export-desc">
          Full token export and component previews are coming soon. Your custom kit is saved in this
          session — you can always go back to <Link to="/create">Edit Kit</Link> to make changes.
        </p>
      </div>
    </div>
  )
}

export default function KitDetailPage() {
  const { id } = useParams()
  const { customKit } = useCustomKit()
  const [kit, setKit] = useState(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)
  const [mode, setMode] = useState('light')

  const isCustom = id === 'custom'

  useEffect(() => {
    if (isCustom) {
      setLoading(false)
      return
    }
    setLoading(true)
    setNotFound(false)
    fetch(`/kits/${id}.json`)
      .then((res) => {
        if (!res.ok) throw new Error('not found')
        return res.json()
      })
      .then((data) => {
        setKit(data)
        setLoading(false)
      })
      .catch(() => {
        setNotFound(true)
        setLoading(false)
      })
  }, [id, isCustom])

  if (isCustom) {
    return (
      <div className="kd-page">
        <div className="kd-inner">
          <Link to="/create" className="kd-back">← Back to create</Link>
          {customKit ? (
            <CustomKitDetail kit={customKit} />
          ) : (
            <div className="kd-not-found">
              <span className="kd-not-found-icon">🎨</span>
              <h1>No Custom Kit Found</h1>
              <p>
                It looks like your custom kit session has expired or was never created.
                Head back to the create page to build your kit.
              </p>
              <Link to="/create" className="kd-btn kd-btn--primary">Create a Kit →</Link>
            </div>
          )}
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="kd-page">
        <div className="kd-inner">
          <Link to="/browse" className="kd-back">← Browse kits</Link>
          <div className="kd-loading">
            <div className="kd-loading-spinner" />
            <p>Loading kit…</p>
          </div>
        </div>
      </div>
    )
  }

  if (notFound) {
    return (
      <div className="kd-page">
        <div className="kd-inner">
          <Link to="/browse" className="kd-back">← Browse kits</Link>
          <div className="kd-not-found">
            <span className="kd-not-found-icon">🔍</span>
            <h1>Kit not found</h1>
            <p>We couldn't find a kit with the ID <code>{id}</code>.</p>
            <Link to="/browse" className="kd-btn kd-btn--primary">Browse all kits</Link>
          </div>
        </div>
      </div>
    )
  }

  const palette = kit.palette?.[mode] || {}

  return (
    <div className="kd-page">
      <div className="kd-inner">
        <Link to="/browse" className="kd-back">← Browse kits</Link>

        {/* Centered header */}
        <div className="kd-hero">
          <div className="kd-hero-text">
            <div className="kd-industry-badge">{kit.industry}</div>
            <h1 className="kd-kit-name">{kit.name}</h1>
            <p className="kd-kit-desc">{kit.description}</p>
          </div>

          {/* Light / Dark pill toggle + Export shortcut */}
          <div className="kd-hero-actions">
            <div className="kd-mode-toggle" role="group" aria-label="Color mode">
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
            <a
              className="kd-export-shortcut"
              href="#export-panel"
              onClick={(e) => {
                e.preventDefault()
                document.getElementById('export-panel')?.scrollIntoView({ behavior: 'smooth' })
              }}
            >
              Export for AI →
            </a>
          </div>
        </div>

        {/* Color swatch inputs — like Radix Colors */}
        <div className="kd-color-inputs">
          <ColorInput label="Primary" hex={palette.primary} />
          <ColorInput label="Secondary" hex={palette.secondary} />
          <ColorInput label="Accent" hex={palette.accent} />
          <ColorInput label="Background" hex={palette.background} />
          <ColorInput label="Surface" hex={palette.surface} />
        </div>

        {/* 12-step color scales */}
        <section className="kd-section">
          <ColorPalette kit={kit} mode={mode} />
        </section>

        {/* Component gallery */}
        <section className="kd-section">
          <div className="kd-section-header">
            <h2 className="kd-section-title">Component Preview</h2>
            <p className="kd-section-desc">Live UI components rendered with this kit's tokens. Toggle light/dark to see both modes.</p>
          </div>
          <ComponentGallery kit={kit} mode={mode} />
        </section>

        {/* Token table */}
        <section className="kd-section">
          <div className="kd-section-header">
            <h2 className="kd-section-title">Design Tokens</h2>
            <p className="kd-section-desc">Raw token values for typography, spacing, border radius, and shadows.</p>
          </div>
          <TokenTable kit={kit} />
        </section>

        <ExportPanel kit={kit} />
      </div>
    </div>
  )
}
