import React, { useState, useRef, useEffect } from 'react'
import { CopyPlus, FilePlus2, LayoutTemplate, Pencil, Sparkles, Trash2 } from 'lucide-react'
import { CANVAS_TEMPLATES } from '../../lib/canvasTemplates'

export default function CanvasLayoutControls({
  savedLayouts,
  activeLayoutId,
  activeLayoutName,
  blockCount,
  onSelectLayout,
  onCreateLayout,
  onDuplicateLayout,
  onRenameLayout,
  onDeleteLayout,
  onApplyTemplate,
  onExport,
}) {
  const [renaming, setRenaming] = useState(false)
  const [renameValue, setRenameValue] = useState(activeLayoutName)
  const renameRef = useRef(null)

  useEffect(() => {
    if (!renaming) setRenameValue(activeLayoutName)
  }, [activeLayoutName, renaming])

  useEffect(() => {
    if (renaming && renameRef.current) renameRef.current.focus()
  }, [renaming])

  function commitRename() {
    const trimmed = renameValue.trim()
    if (trimmed && trimmed !== activeLayoutName) onRenameLayout(trimmed)
    setRenaming(false)
  }

  function handleApplyTemplate(e) {
    const templateId = e.target.value
    if (!templateId) return
    e.target.value = ''
    if (blockCount > 0) {
      const template = CANVAS_TEMPLATES.find((t) => t.id === templateId)
      const ok = window.confirm(
        `Replace current canvas with "${template?.name}"? This will overwrite ${blockCount} block${blockCount !== 1 ? 's' : ''}.`
      )
      if (!ok) return
    }
    onApplyTemplate(templateId)
  }

  function handleDelete() {
    if (savedLayouts.length <= 1) return
    const ok = window.confirm(`Delete "${activeLayoutName}"? This cannot be undone.`)
    if (ok) onDeleteLayout(activeLayoutId)
  }

  return (
    <div className="cv-layout-bar">
      <div className="cv-layout-bar-left">
        <span className="cv-controls-label">Layout</span>
        <select
          className="cv-controls-select cv-controls-select--layout"
          value={activeLayoutId}
          onChange={(e) => onSelectLayout(e.target.value)}
          aria-label="Select saved layout"
        >
          {savedLayouts.map((l) => (
            <option key={l.id} value={l.id}>{l.name}</option>
          ))}
        </select>

        {renaming ? (
          <input
            ref={renameRef}
            type="text"
            className="cv-layout-rename-input"
            value={renameValue}
            onChange={(e) => setRenameValue(e.target.value)}
            onBlur={commitRename}
            onKeyDown={(e) => {
              if (e.key === 'Enter') commitRename()
              if (e.key === 'Escape') setRenaming(false)
            }}
            aria-label="Rename layout"
          />
        ) : (
          <button
            type="button"
            className="cv-layout-icon-btn"
            onClick={() => setRenaming(true)}
            title="Rename layout"
            aria-label="Rename layout"
          >
            <Pencil size={14} />
          </button>
        )}

        <button type="button" className="cv-layout-icon-btn" onClick={() => onCreateLayout()} title="New layout" aria-label="New layout">
          <FilePlus2 size={14} />
        </button>
        <button type="button" className="cv-layout-icon-btn" onClick={onDuplicateLayout} title="Duplicate layout" aria-label="Duplicate layout">
          <CopyPlus size={14} />
        </button>
        {savedLayouts.length > 1 && (
          <button type="button" className="cv-layout-icon-btn cv-layout-icon-btn--danger" onClick={handleDelete} title="Delete layout" aria-label="Delete layout">
            <Trash2 size={14} />
          </button>
        )}
      </div>

      <div className="cv-layout-bar-right">
        <div className="cv-layout-template">
          <LayoutTemplate size={14} aria-hidden />
          <select
            className="cv-controls-select cv-controls-select--template"
            defaultValue=""
            onChange={handleApplyTemplate}
            aria-label="Apply template"
          >
            <option value="" disabled>Templates…</option>
            {CANVAS_TEMPLATES.map((t) => (
              <option key={t.id} value={t.id}>{t.name}</option>
            ))}
          </select>
        </div>

        <button
          type="button"
          className="cv-export-btn"
          onClick={onExport}
          disabled={blockCount === 0}
          title={blockCount === 0 ? 'Add blocks to export' : 'Export for AI'}
        >
          <Sparkles size={14} />
          Export
        </button>
      </div>
    </div>
  )
}
