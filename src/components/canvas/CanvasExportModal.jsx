import React, { useMemo, useState } from 'react'
import { Check, Download, X } from 'lucide-react'
import { buildCanvasExport, copyToClipboard, downloadJson } from '../../lib/canvasExport'

export default function CanvasExportModal({ layout, layoutName, kitName, onClose }) {
  const [tab, setTab] = useState('brief')
  const [copied, setCopied] = useState(false)

  const exportData = useMemo(
    () => buildCanvasExport(layout, { name: layoutName, kitName }),
    [layout, layoutName, kitName]
  )

  const content = tab === 'brief' ? exportData.aiBrief : exportData.json

  async function handleCopy() {
    const ok = await copyToClipboard(content)
    if (ok) {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  function handleDownload() {
    const slug = layoutName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'canvas'
    downloadJson(`${slug}-export.json`, exportData.json)
  }

  return (
    <div className="cv-export-overlay" onClick={onClose} role="presentation">
      <div
        className="cv-export-modal"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="cv-export-title"
      >
        <div className="cv-export-header">
          <div>
            <h2 id="cv-export-title" className="cv-export-title">Export for AI</h2>
            <p className="cv-export-sub">{layoutName} · {exportData.blockCount} block{exportData.blockCount !== 1 ? 's' : ''}</p>
          </div>
          <button type="button" className="cv-inspector-close" onClick={onClose} aria-label="Close export">
            <X size={16} />
          </button>
        </div>

        <div className="cv-export-tabs" role="tablist">
          <button
            type="button"
            role="tab"
            aria-selected={tab === 'brief'}
            className={`cv-export-tab${tab === 'brief' ? ' cv-export-tab--active' : ''}`}
            onClick={() => setTab('brief')}
          >
            AI Brief
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={tab === 'json'}
            className={`cv-export-tab${tab === 'json' ? ' cv-export-tab--active' : ''}`}
            onClick={() => setTab('json')}
          >
            JSON
          </button>
        </div>

        <pre className="cv-export-body">{content}</pre>

        <div className="cv-export-actions">
          <button type="button" className="cv-export-action-btn" onClick={handleCopy}>
            {copied ? <Check size={14} /> : null}
            {copied ? 'Copied' : 'Copy'}
          </button>
          <button type="button" className="cv-export-action-btn cv-export-action-btn--primary" onClick={handleDownload}>
            <Download size={14} />
            Download JSON
          </button>
        </div>
      </div>
    </div>
  )
}
