import React, { useState, useEffect } from 'react'
import IndustryFilter from '../components/browse/IndustryFilter'
import KitGrid from '../components/browse/KitGrid'
import { loadKits } from '../lib/loadKits'
import './BrowsePage.css'

export default function BrowsePage() {
  const [kits, setKits] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedIndustry, setSelectedIndustry] = useState('All')

  useEffect(() => {
    loadKits()
      .then((data) => {
        setKits(data)
        setLoading(false)
      })
      .catch((err) => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  const filteredKits =
    selectedIndustry === 'All'
      ? kits
      : kits.filter((kit) => kit.industry === selectedIndustry)

  return (
    <div className="browse-page">
      <div className="browse-page-inner">
        <header className="browse-header">
          <h1 className="browse-title">Design Token Kits</h1>
          <p className="browse-subtitle">
            Curated brand palettes for AI-generated UI. Pick a kit, copy the tokens, get
            consistent design instantly.
          </p>
        </header>

        <IndustryFilter selected={selectedIndustry} onChange={setSelectedIndustry} />

        {loading && (
          <div className="browse-loading">
            <div className="browse-loading-spinner" />
            <p>Loading kits…</p>
          </div>
        )}

        {error && (
          <div className="browse-error">
            <p>Failed to load kits: {error}</p>
          </div>
        )}

        {!loading && !error && <KitGrid kits={filteredKits} />}
      </div>
    </div>
  )
}
