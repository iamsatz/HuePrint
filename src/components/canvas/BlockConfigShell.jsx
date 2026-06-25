import React from 'react'
import { densityFontScale, densityGap, densityPadding } from '../../lib/canvasInspector'

/**
 * Applies inspector-driven layout tokens to any block.
 * Blocks can also read `config` prop directly for grids/titles.
 */
export default function BlockConfigShell({ config, children }) {
  const density = config?.density || 'comfortable'
  const pad = densityPadding(density)
  const gap = densityGap(density)
  const scale = densityFontScale(density)

  return (
    <div
      className="cv-block-config-shell"
      data-density={density}
      data-columns={config?.columns ?? ''}
      style={{
        '--cv-block-pad': `${pad}px`,
        '--cv-block-gap': `${gap}px`,
        '--cv-block-scale': scale,
        '--cv-block-columns': config?.columns ?? 3,
      }}
    >
      {children}
    </div>
  )
}
