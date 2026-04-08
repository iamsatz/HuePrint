import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import ColorPalette from '../components/kit/ColorPalette'
import ComponentGallery from '../components/kit/ComponentGallery'
import TokenTable from '../components/kit/TokenTable'
import './KitDetailPage.css'

function SectionHeader({ title, description }) {
  return (
    <div className="kd-section-header">
      <h2 className="kd-section-title">{title}</h2>
      {description && <p className="kd-section-desc">{description}</p>}
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
          <Link to="/browse" className="kd-back">← Back to kits</Link>
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
          <Link to="/browse" className="kd-back">← Back to kits</Link>
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

  return (
    <div className="kd-page">
      <div className="kd-inner">
        <Link to="/browse" className="kd-back">← Back to kits</Link>

        <div className="kd-hero">
          <div className="kd-hero-text">
            <div className="kd-industry-badge">{kit.industry}</div>
            <h1 className="kd-kit-name">{kit.name}</h1>
            <p className="kd-kit-desc">{kit.description}</p>
          </div>
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

        <section className="kd-section">
          <SectionHeader
            title="Color Scales"
            description="12-step perceptual scales for each color, generated from the kit's base tokens. Hover any step to see its semantic purpose."
          />
          <ColorPalette kit={kit} mode={mode} />
        </section>

        <section className="kd-section">
          <SectionHeader
            title="Component Gallery"
            description="Live preview of UI components rendered with this kit's tokens. Toggle light/dark above to see the mode switch in real time."
          />
          <ComponentGallery kit={kit} mode={mode} />
        </section>

        <section className="kd-section">
          <SectionHeader
            title="Design Tokens"
            description="Raw token values for typography, spacing, border radius, and shadows."
          />
          <TokenTable kit={kit} />
        </section>
      </div>
    </div>
  )
}
