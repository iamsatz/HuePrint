import React from 'react'
import { X } from 'lucide-react'
import { getBlockDef } from '../../lib/canvasBlocks'
import { DENSITY_OPTIONS, getInspectorConfig, getDefaultBlockProps } from '../../lib/canvasInspector'

export default function BlockInspector({ instance, onClose, onPropsChange }) {
  if (!instance) return null

  const def = getBlockDef(instance.blockId)
  const cfg = getInspectorConfig(instance.blockId)
  const props = { ...getDefaultBlockProps(instance.blockId), ...instance.props }

  if (!def || !cfg) return null

  function update(key, value) {
    onPropsChange(instance.instanceId, { ...props, [key]: value })
  }

  return (
    <aside className="cv-inspector">
      <div className="cv-inspector-header">
        <div>
          <h2 className="cv-inspector-title">Block Inspector</h2>
          <p className="cv-inspector-sub">{def.label}</p>
        </div>
        <button type="button" className="cv-inspector-close" onClick={onClose} aria-label="Close inspector">
          <X size={16} />
        </button>
      </div>

      <div className="cv-inspector-body">
        {cfg.title && (
          <label className="cv-inspector-field">
            <span className="cv-inspector-label">Section title</span>
            <input
              type="text"
              className="cv-inspector-input"
              value={props.title}
              onChange={(e) => update('title', e.target.value)}
              placeholder={`Default: ${def.label}`}
            />
            <span className="cv-inspector-hint">Leave empty to use the block default heading.</span>
          </label>
        )}

        {cfg.columns && (
          <div className="cv-inspector-field">
            <span className="cv-inspector-label">Columns</span>
            <div className="cv-inspector-segment" role="group" aria-label="Column count">
              {(cfg.columnOptions || [2, 3, 4]).map((n) => (
                <button
                  key={n}
                  type="button"
                  className={`cv-inspector-segment-btn${props.columns === n ? ' cv-inspector-segment-btn--active' : ''}`}
                  onClick={() => update('columns', n)}
                  aria-pressed={props.columns === n}
                >
                  {n}
                </button>
              ))}
            </div>
          </div>
        )}

        {cfg.density && (
          <div className="cv-inspector-field">
            <span className="cv-inspector-label">Density</span>
            <div className="cv-inspector-segment cv-inspector-segment--wrap" role="group" aria-label="Density">
              {DENSITY_OPTIONS.map((d) => (
                <button
                  key={d.id}
                  type="button"
                  className={`cv-inspector-segment-btn${props.density === d.id ? ' cv-inspector-segment-btn--active' : ''}`}
                  onClick={() => update('density', d.id)}
                  aria-pressed={props.density === d.id}
                >
                  {d.label}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="cv-inspector-field">
          <span className="cv-inspector-label">Variant</span>
          <span className="cv-inspector-readonly">
            {def.variants.find((v) => v.id === instance.variant)?.label || instance.variant}
          </span>
          <span className="cv-inspector-hint">Change variant from the block toolbar on canvas.</span>
        </div>
      </div>
    </aside>
  )
}
