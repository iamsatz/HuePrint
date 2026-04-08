import React from 'react'
import './TokenTable.css'

function TokenRow({ name, value }) {
  return (
    <tr className="tt-row">
      <td className="tt-name">{name}</td>
      <td className="tt-value"><code>{value}</code></td>
    </tr>
  )
}

function TokenSection({ title, rows }) {
  return (
    <div className="tt-section">
      <div className="tt-section-title">{title}</div>
      <table className="tt-table">
        <thead>
          <tr>
            <th className="tt-th">Token</th>
            <th className="tt-th">Value</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <TokenRow key={row.name} name={row.name} value={row.value} />
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default function TokenTable({ kit }) {
  if (!kit) return null

  const typographyRows = kit.typography
    ? [
        { name: '--hp-heading-font', value: kit.typography.headingFont },
        { name: '--hp-body-font', value: kit.typography.bodyFont },
        { name: '--hp-font-size', value: kit.typography.baseFontSize },
        { name: '--hp-line-height', value: String(kit.typography.lineHeight) },
      ]
    : []

  const spacingRows = kit.spacing
    ? [
        { name: '--hp-spacing-base', value: kit.spacing.base },
        { name: '--hp-spacing-scale', value: String(kit.spacing.scale) },
        { name: '--hp-spacing-xs', value: `calc(${kit.spacing.base} * 1)` },
        { name: '--hp-spacing-sm', value: `calc(${kit.spacing.base} * ${kit.spacing.scale})` },
        { name: '--hp-spacing-md', value: `calc(${kit.spacing.base} * ${Math.pow(kit.spacing.scale, 2).toFixed(2)})` },
        { name: '--hp-spacing-lg', value: `calc(${kit.spacing.base} * ${Math.pow(kit.spacing.scale, 3).toFixed(2)})` },
      ]
    : []

  const radiusRows = kit.borderRadius
    ? [
        { name: '--hp-radius-sm', value: kit.borderRadius.sm },
        { name: '--hp-radius-md', value: kit.borderRadius.md },
        { name: '--hp-radius-lg', value: kit.borderRadius.lg },
        { name: '--hp-radius-full', value: kit.borderRadius.full },
      ]
    : []

  const shadowRows = kit.shadow
    ? [
        { name: '--hp-shadow-sm', value: kit.shadow.sm },
        { name: '--hp-shadow-md', value: kit.shadow.md },
        { name: '--hp-shadow-lg', value: kit.shadow.lg },
      ]
    : []

  return (
    <div className="tt-root">
      {typographyRows.length > 0 && (
        <TokenSection title="Typography" rows={typographyRows} />
      )}
      {spacingRows.length > 0 && (
        <TokenSection title="Spacing" rows={spacingRows} />
      )}
      {radiusRows.length > 0 && (
        <TokenSection title="Border Radius" rows={radiusRows} />
      )}
      {shadowRows.length > 0 && (
        <TokenSection title="Shadows" rows={shadowRows} />
      )}
    </div>
  )
}
