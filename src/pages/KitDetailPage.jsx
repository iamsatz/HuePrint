import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import ColorPalette from '../components/kit/ColorPalette'
import ComponentGallery from '../components/kit/ComponentGallery'
import TokenTable from '../components/kit/TokenTable'
import ExportPanel from '../components/kit-detail/ExportPanel'
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

export default function KitDetailPage() {
  const { id } = useParams()
  const [kit, setKit] = useState(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)
  const [mode, setMode] = useState('light')

  useEffect(() => {
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
  }, [id])

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

          {/* Light / Dark pill toggle */}
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
