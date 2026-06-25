import React, { useEffect, useState } from 'react'
import { Moon, Sun, Trash2, Monitor, Tablet, Smartphone } from 'lucide-react'
import { loadKits } from '../../lib/loadKits'
import { useCustomKit } from '../../context/CustomKitContext'
import { loadFontPair } from '../../lib/loadGoogleFont'
import { normalizeTypography } from '../../lib/typographyRoles'

import { PREVIEW_STATES } from '../../lib/canvasBlocks'
import { VIEWPORTS } from '../../lib/canvasInspector'

const VIEWPORT_ICONS = { monitor: Monitor, tablet: Tablet, smartphone: Smartphone }

export default function KitControls({ kitRef, mode, previewState, viewport, onKitRefChange, onModeChange, onPreviewStateChange, onViewportChange, onClearCanvas, blockCount }) {
  const { customKit } = useCustomKit()
  const [kits, setKits] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadKits()
      .then(setKits)
      .catch(() => setKits([]))
      .finally(() => setLoading(false))
  }, [])

  const selectedKit = kitRef.source === 'custom' && customKit
    ? customKit
    : kits.find((k) => k.id === kitRef.id) || kits[0]

  useEffect(() => {
    if (!selectedKit?.typography) return
    const typo = normalizeTypography(selectedKit.typography)
    loadFontPair(typo.headingFont, typo.bodyFont)
    if (typo.displayFont && typo.displayFont !== typo.headingFont) loadFontPair(typo.displayFont, null)
    if (typo.monoFont) loadFontPair(typo.monoFont, null)
  }, [selectedKit])

  function handleKitChange(e) {
    const value = e.target.value
    if (value === 'custom') {
      if (customKit) {
        onKitRefChange({ source: 'custom', id: customKit.id || 'custom' })
      }
      return
    }
    onKitRefChange({ source: 'curated', id: value })
  }

  const currentValue = kitRef.source === 'custom' ? 'custom' : kitRef.id

  return (
    <div className="cv-controls">
      <div className="cv-controls-left">
        <span className="cv-controls-label">Kit</span>
        <select
          className="cv-controls-select"
          value={currentValue}
          onChange={handleKitChange}
          disabled={loading}
          aria-label="Select design kit"
        >
          {kits.map((kit) => (
            <option key={kit.id} value={kit.id}>{kit.name}</option>
          ))}
          {customKit && (
            <option value="custom">{customKit.name || 'Custom Kit'}</option>
          )}
        </select>

        {selectedKit && (
          <span className="cv-controls-kit-meta">{selectedKit.industry}</span>
        )}
      </div>

      <div className="cv-controls-right">
        <span className="cv-controls-block-count">{blockCount} block{blockCount !== 1 ? 's' : ''}</span>

        <div className="cv-controls-state" role="group" aria-label="Preview state">
          <span className="cv-controls-label">State</span>
          <select
            className="cv-controls-select cv-controls-select--state"
            value={previewState}
            onChange={(e) => onPreviewStateChange(e.target.value)}
            aria-label="Preview UI state"
          >
            {PREVIEW_STATES.map((s) => (
              <option key={s.id} value={s.id}>{s.label}</option>
            ))}
          </select>
        </div>

        <div className="cv-controls-viewport" role="group" aria-label="Preview viewport">
          {VIEWPORTS.map((vp) => {
            const Icon = VIEWPORT_ICONS[vp.icon] || Monitor
            return (
              <button
                key={vp.id}
                type="button"
                className={`cv-mode-btn${viewport === vp.id ? ' cv-mode-btn--active' : ''}`}
                onClick={() => onViewportChange(vp.id)}
                aria-pressed={viewport === vp.id}
                title={vp.label}
              >
                <Icon size={14} />
                {vp.label}
              </button>
            )
          })}
        </div>

        <div className="cv-controls-mode" role="group" aria-label="Color mode">
          <button
            type="button"
            className={`cv-mode-btn${mode === 'light' ? ' cv-mode-btn--active' : ''}`}
            onClick={() => onModeChange('light')}
            aria-pressed={mode === 'light'}
          >
            <Sun size={14} />
            Light
          </button>
          <button
            type="button"
            className={`cv-mode-btn${mode === 'dark' ? ' cv-mode-btn--active' : ''}`}
            onClick={() => onModeChange('dark')}
            aria-pressed={mode === 'dark'}
          >
            <Moon size={14} />
            Dark
          </button>
        </div>

        {blockCount > 0 && (
          <button
            type="button"
            className="cv-clear-btn"
            onClick={onClearCanvas}
            aria-label="Clear canvas"
          >
            <Trash2 size={14} />
            Clear
          </button>
        )}
      </div>
    </div>
  )
}
