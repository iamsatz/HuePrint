import React, { useState, useCallback } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useCustomKit } from '../context/CustomKitContext'
import { parseFigmaJson } from '../lib/parseFigmaJson'
import './CreatePage.css'

const ROLES = [
  { key: 'primary', label: 'Primary', required: true },
  { key: 'secondary', label: 'Secondary', required: false },
  { key: 'accent', label: 'Accent', required: false },
  { key: 'background', label: 'Background', required: true },
  { key: 'surface', label: 'Surface', required: false },
  { key: 'text', label: 'Text', required: true },
  { key: 'textMuted', label: 'Text Muted', required: false },
  { key: 'border', label: 'Border', required: false },
  { key: 'success', label: 'Success', required: false },
  { key: 'warning', label: 'Warning', required: false },
]

const FORMAT_LABELS = {
  radix: {
    description: 'Enter colors using Radix UI 12-step scale variable names (e.g. --violet-9)',
    fieldLabel: (role) => `--${role.key}-9`,
    placeholder: '#7c3aed',
  },
  tailwind: {
    description: 'Enter colors using Tailwind config scale names (e.g. violet-600)',
    fieldLabel: (role) => `${role.key}-600`,
    placeholder: '#7c3aed',
  },
  shadcn: {
    description: 'Enter colors using shadcn/ui CSS variable names (e.g. --primary)',
    fieldLabel: (role) => `--${role.key}`,
    placeholder: '#7c3aed',
  },
}

function isValidHex(val) {
  return /^#[0-9a-fA-F]{3,8}$/.test(val.trim())
}

function SwatchStrip({ values }) {
  const swatchRoles = ['background', 'surface', 'primary', 'secondary', 'accent', 'text', 'border']
  return (
    <div className="swatch-strip">
      {swatchRoles.map((role) => {
        const hex = values[role]
        const valid = hex && isValidHex(hex)
        return (
          <div key={role} className="swatch-item">
            <div
              className={`swatch-dot ${valid ? '' : 'swatch-dot--empty'}`}
              style={valid ? { background: hex } : {}}
            />
            <span className="swatch-label">{role}</span>
          </div>
        )
      })}
    </div>
  )
}

function ManualEntryTab({ onKitReady }) {
  const [format, setFormat] = useState('shadcn')
  const [values, setValues] = useState({})
  const [errors, setErrors] = useState({})
  const [kitName, setKitName] = useState('')
  const [submitError, setSubmitError] = useState('')

  const fmt = FORMAT_LABELS[format]

  function handleChange(key, val) {
    setValues((prev) => ({ ...prev, [key]: val }))
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: '' }))
    setSubmitError('')
  }

  function handleBlur(key, val) {
    if (val && !isValidHex(val)) {
      setErrors((prev) => ({ ...prev, [key]: 'Enter a valid hex color (e.g. #7c3aed)' }))
    }
  }

  function validate() {
    const newErrors = {}
    for (const role of ROLES) {
      const val = values[role.key] || ''
      if (role.required && !val) {
        newErrors[role.key] = 'Required'
      } else if (val && !isValidHex(val)) {
        newErrors[role.key] = 'Invalid hex color'
      }
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  function handlePreview() {
    if (!validate()) {
      setSubmitError('Please fix the errors above before previewing.')
      return
    }
    const palette = {}
    for (const role of ROLES) {
      palette[role.key] = values[role.key] || null
    }
    onKitReady({
      name: kitName.trim() || 'My Custom Kit',
      palette,
    })
  }

  return (
    <div className="manual-tab">
      <div className="format-selector">
        {['radix', 'tailwind', 'shadcn'].map((f) => (
          <button
            key={f}
            className={`format-btn ${format === f ? 'format-btn--active' : ''}`}
            onClick={() => setFormat(f)}
            type="button"
          >
            {f === 'radix' ? 'Radix Scale' : f === 'tailwind' ? 'Tailwind' : 'shadcn/ui'}
          </button>
        ))}
      </div>
      <p className="format-description">{fmt.description}</p>

      <div className="field-group">
        <label className="field-label" htmlFor="kit-name">
          Kit Name <span className="field-optional">(optional)</span>
        </label>
        <input
          id="kit-name"
          className="field-input"
          type="text"
          placeholder="My Brand Kit"
          value={kitName}
          onChange={(e) => setKitName(e.target.value)}
        />
      </div>

      <div className="color-fields">
        {ROLES.map((role) => (
          <div key={role.key} className={`field-group ${errors[role.key] ? 'field-group--error' : ''}`}>
            <label className="field-label" htmlFor={`color-${role.key}`}>
              <code className="field-code">{fmt.fieldLabel(role)}</code>
              <span className="field-role-label">{role.label}</span>
              {role.required && <span className="field-required">*</span>}
            </label>
            <div className="field-input-row">
              <div
                className={`color-preview ${values[role.key] && isValidHex(values[role.key]) ? '' : 'color-preview--empty'}`}
                style={
                  values[role.key] && isValidHex(values[role.key])
                    ? { background: values[role.key] }
                    : {}
                }
              />
              <input
                id={`color-${role.key}`}
                className="field-input"
                type="text"
                placeholder={fmt.placeholder}
                value={values[role.key] || ''}
                onChange={(e) => handleChange(role.key, e.target.value)}
                onBlur={(e) => handleBlur(role.key, e.target.value)}
              />
            </div>
            {errors[role.key] && <p className="field-error">{errors[role.key]}</p>}
          </div>
        ))}
      </div>

      <SwatchStrip values={values} />

      {submitError && <p className="submit-error">{submitError}</p>}

      <button className="preview-btn" type="button" onClick={handlePreview}>
        Preview Kit →
      </button>
    </div>
  )
}

function ImportJsonTab({ onKitReady }) {
  const [jsonText, setJsonText] = useState('')
  const [parseError, setParseError] = useState('')
  const [parsed, setParsed] = useState(null)
  const [overrides, setOverrides] = useState({})
  const [isDragOver, setIsDragOver] = useState(false)
  const [kitName, setKitName] = useState('')

  function handleParse() {
    if (!jsonText.trim()) {
      setParseError('Paste or drop a Figma variables JSON file.')
      return
    }
    try {
      const result = parseFigmaJson(jsonText)
      setParsed(result)
      setOverrides({})
      setParseError('')
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

  function handleOverride(role, val) {
    setOverrides((prev) => ({ ...prev, [role]: val }))
  }

  function handlePreview() {
    if (!parsed) {
      setParseError('Parse the JSON first.')
      return
    }
    const palette = { ...parsed.palette }
    for (const [role, val] of Object.entries(overrides)) {
      if (val && isValidHex(val)) palette[role] = val
    }
    const required = ['primary', 'background', 'text']
    const missing = required.filter((r) => !palette[r])
    if (missing.length > 0) {
      setParseError(`Missing required colors: ${missing.join(', ')}. Fill them in below.`)
      return
    }
    onKitReady({
      name: kitName.trim() || 'Figma Import',
      palette,
    })
  }

  const allRoles = ROLES.map((r) => r.key)
  const detectedRoles = parsed ? Object.keys(parsed.palette) : []
  const missingRoles = parsed ? allRoles.filter((r) => !detectedRoles.includes(r)) : []

  return (
    <div className="import-tab">
      <div className="field-group">
        <label className="field-label" htmlFor="kit-name-import">
          Kit Name <span className="field-optional">(optional)</span>
        </label>
        <input
          id="kit-name-import"
          className="field-input"
          type="text"
          placeholder="My Figma Kit"
          value={kitName}
          onChange={(e) => setKitName(e.target.value)}
        />
      </div>

      <div
        className={`drop-zone ${isDragOver ? 'drop-zone--active' : ''}`}
        onDragOver={(e) => { e.preventDefault(); setIsDragOver(true) }}
        onDragLeave={() => setIsDragOver(false)}
        onDrop={handleDrop}
      >
        <p className="drop-zone-hint">Drop a <code>.json</code> file here or paste below</p>
        <textarea
          className="json-textarea"
          placeholder={'Paste Figma variables JSON here…\n\nExample:\n{\n  "variables": [\n    { "name": "color/primary", "value": "#7c3aed" },\n    { "name": "color/background", "value": "#ffffff" }\n  ]\n}'}
          value={jsonText}
          onChange={(e) => { setJsonText(e.target.value); setParseError(''); setParsed(null) }}
          rows={10}
        />
      </div>

      <button className="parse-btn" type="button" onClick={handleParse}>
        Parse JSON
      </button>

      {parseError && <p className="submit-error">{parseError}</p>}

      {parsed && (
        <div className="mapping-result">
          <h3 className="mapping-title">Mapping Preview</h3>

          {detectedRoles.length > 0 && (
            <div className="mapping-section">
              <p className="mapping-section-label">Detected ({detectedRoles.length})</p>
              <div className="mapping-table">
                {detectedRoles.map((role) => (
                  <div key={role} className="mapping-row mapping-row--detected">
                    <div
                      className="swatch-dot swatch-dot--sm"
                      style={{ background: parsed.palette[role] }}
                    />
                    <code className="mapping-role">{role}</code>
                    <span className="mapping-arrow">→</span>
                    <span className="mapping-hex">{parsed.palette[role]}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {parsed.unmapped.length > 0 && (
            <div className="mapping-section">
              <p className="mapping-section-label">Skipped / Unrecognized ({parsed.unmapped.length})</p>
              <div className="mapping-table">
                {parsed.unmapped.map((item, i) => (
                  <div key={i} className="mapping-row mapping-row--skipped">
                    <code className="mapping-role mapping-role--skipped">{item.name}</code>
                    <span className="mapping-arrow">→</span>
                    <span className="mapping-hex mapping-hex--skipped">{item.value ?? 'n/a'}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {missingRoles.length > 0 && (
            <div className="mapping-section">
              <p className="mapping-section-label">Fill in missing roles manually</p>
              <div className="color-fields">
                {missingRoles.map((roleKey) => {
                  const role = ROLES.find((r) => r.key === roleKey)
                  const val = overrides[roleKey] || ''
                  return (
                    <div
                      key={roleKey}
                      className={`field-group ${val && !isValidHex(val) ? 'field-group--error' : ''}`}
                    >
                      <label className="field-label" htmlFor={`override-${roleKey}`}>
                        <code className="field-code">--{roleKey}</code>
                        <span className="field-role-label">{role?.label ?? roleKey}</span>
                        {role?.required && <span className="field-required">*</span>}
                      </label>
                      <div className="field-input-row">
                        <div
                          className={`color-preview ${val && isValidHex(val) ? '' : 'color-preview--empty'}`}
                          style={val && isValidHex(val) ? { background: val } : {}}
                        />
                        <input
                          id={`override-${roleKey}`}
                          className="field-input"
                          type="text"
                          placeholder="#7c3aed"
                          value={val}
                          onChange={(e) => handleOverride(roleKey, e.target.value)}
                        />
                      </div>
                      {val && !isValidHex(val) && (
                        <p className="field-error">Enter a valid hex color (e.g. #7c3aed)</p>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          <SwatchStrip values={{ ...parsed.palette, ...Object.fromEntries(Object.entries(overrides).filter(([, v]) => isValidHex(v))) }} />

          <button className="preview-btn" type="button" onClick={handlePreview}>
            Preview Kit →
          </button>
        </div>
      )}
    </div>
  )
}

export default function CreatePage() {
  const [activeTab, setActiveTab] = useState('manual')
  const { setCustomKit } = useCustomKit()
  const navigate = useNavigate()

  function handleKitReady({ name, palette }) {
    const kit = {
      id: 'custom',
      name,
      industry: 'Custom',
      description: 'Your custom brand kit.',
      palette: {
        light: {
          background: palette.background ?? '#ffffff',
          surface: palette.surface ?? palette.background ?? '#f9fafb',
          primary: palette.primary ?? '#7c3aed',
          secondary: palette.secondary ?? palette.primary ?? '#a855f7',
          accent: palette.accent ?? palette.primary ?? '#ec4899',
          text: palette.text ?? '#111827',
          textMuted: palette.textMuted ?? '#6b7280',
          border: palette.border ?? '#e5e7eb',
          success: palette.success ?? '#10b981',
          warning: palette.warning ?? '#f59e0b',
        },
        dark: {
          background: palette.backgroundDark ?? '#111827',
          surface: palette.surfaceDark ?? '#1f2937',
          primary: palette.primaryDark ?? palette.primary ?? '#a78bfa',
          secondary: palette.secondaryDark ?? palette.secondary ?? '#c084fc',
          accent: palette.accentDark ?? palette.accent ?? '#f472b6',
          text: palette.textDark ?? '#f9fafb',
          textMuted: palette.textMutedDark ?? '#9ca3af',
          border: palette.borderDark ?? '#374151',
          success: palette.successDark ?? palette.success ?? '#34d399',
          warning: palette.warningDark ?? palette.warning ?? '#fcd34d',
        },
      },
    }
    setCustomKit(kit)
    navigate('/kit/custom')
  }

  return (
    <div className="create-page">
      <div className="create-inner">
        <Link to="/" className="create-back">
          ← Back to home
        </Link>

        <div className="create-header">
          <h1 className="create-title">Build Your Own Kit</h1>
          <p className="create-subtitle">
            Enter your brand colors to generate a full HuePrint design kit — component previews
            and token exports included.
          </p>
        </div>

        <div className="create-tabs">
          <button
            className={`create-tab ${activeTab === 'manual' ? 'create-tab--active' : ''}`}
            onClick={() => setActiveTab('manual')}
            type="button"
          >
            Enter Colors
          </button>
          <button
            className={`create-tab ${activeTab === 'import' ? 'create-tab--active' : ''}`}
            onClick={() => setActiveTab('import')}
            type="button"
          >
            Import JSON
          </button>
        </div>

        <div className="create-panel">
          {activeTab === 'manual' ? (
            <ManualEntryTab onKitReady={handleKitReady} />
          ) : (
            <ImportJsonTab onKitReady={handleKitReady} />
          )}
        </div>
      </div>
    </div>
  )
}
