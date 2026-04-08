import React, { useState, useCallback } from 'react'
import {
  generateClaudePrompt,
  generateV0Config,
  generateCursorRules,
  generateReplitPrompt,
} from '../../lib/exportGenerators'
import './ExportPanel.css'

const TABS = [
  {
    id: 'claude',
    label: 'Claude',
    filename: 'system-prompt.md',
    ext: 'md',
    description:
      'A markdown system prompt for Claude. Paste this into Claude\'s system prompt field to give it full context about your design system — colors, usage rules, typography, and spacing.',
    generate: generateClaudePrompt,
  },
  {
    id: 'v0',
    label: 'v0',
    filename: 'tailwind.config.js',
    ext: 'js',
    description:
      'A Tailwind CSS config snippet for v0 by Vercel. Paste or merge this into your tailwind.config.js to make your brand tokens available as Tailwind utility classes.',
    generate: generateV0Config,
  },
  {
    id: 'cursor',
    label: 'Cursor',
    filename: '.cursor/rules',
    ext: 'md',
    description:
      'A Cursor rules file with design token context. Place this at .cursor/rules in your project so Cursor AI understands your color system and coding conventions.',
    generate: generateCursorRules,
  },
  {
    id: 'replit',
    label: 'Replit',
    filename: 'replit-prompt.md',
    ext: 'md',
    description:
      'A Replit AI context block with CSS variable definitions and usage rules. Add this to your project so Replit AI generates on-brand components with the correct tokens.',
    generate: generateReplitPrompt,
  },
]

export default function ExportPanel({ kit }) {
  const [activeTab, setActiveTab] = useState('claude')
  const [copied, setCopied] = useState(false)

  const tab = TABS.find((t) => t.id === activeTab)
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

  if (!kit) return null

  return (
    <section className="export-panel">
      <div className="export-panel-header">
        <h2 className="export-panel-title">Export for AI Tools</h2>
        <p className="export-panel-subtitle">
          Generate tool-specific output from your design tokens — ready to paste into Claude, v0, Cursor, or Replit.
        </p>
      </div>

      <div className="export-tab-row" role="tablist">
        {TABS.map((t) => (
          <button
            key={t.id}
            role="tab"
            aria-selected={activeTab === t.id}
            className={`export-tab-btn${activeTab === t.id ? ' export-tab-btn--active' : ''}`}
            onClick={() => setActiveTab(t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="export-panel-body">
        <p className="export-usage-hint">{tab.description}</p>

        <div className="export-code-wrapper">
          <div className="export-code-toolbar">
            <span className="export-code-filename">{tab.filename}</span>
            <div className="export-code-actions">
              <button
                className={`export-action-btn${copied ? ' export-action-btn--copied' : ''}`}
                onClick={handleCopy}
                title="Copy to clipboard"
              >
                {copied ? 'Copied ✓' : 'Copy'}
              </button>
              <button
                className="export-action-btn"
                onClick={handleDownload}
                title="Download file"
              >
                Download
              </button>
            </div>
          </div>
          <pre className="export-code-block">
            <code>{output}</code>
          </pre>
        </div>
      </div>
    </section>
  )
}
