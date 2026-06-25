import { CANVAS_CATEGORIES, getBlockDef } from './canvasBlocks'
import { DENSITY_OPTIONS } from './canvasInspector'

/**
 * @param {import('./canvasStorage').CanvasLayoutData} layout
 * @param {{ name?: string, kitName?: string }} meta
 */
export function buildCanvasExport(layout, meta = {}) {
  const blocks = layout.blocks.map((b, index) => {
    const def = getBlockDef(b.blockId)
    const variantDef = def?.variants.find((v) => v.id === b.variant)
    const categoryLabel = def?.category ? CANVAS_CATEGORIES[def.category]?.label : undefined
    return {
      order: index + 1,
      blockId: b.blockId,
      label: def?.label || b.blockId,
      category: def?.category,
      categoryLabel,
      description: def?.description,
      variant: b.variant,
      variantLabel: variantDef?.label || b.variant,
      props: b.props || {},
    }
  })

  const payload = {
    version: 1,
    exportedAt: new Date().toISOString(),
    layoutName: meta.name || 'Untitled canvas',
    kit: {
      ...layout.kitRef,
      name: meta.kitName || layout.kitRef.id,
    },
    mode: layout.mode,
    viewport: layout.viewport,
    previewState: layout.previewState,
    blockCount: blocks.length,
    blocks,
  }

  return {
    ...payload,
    aiBrief: generateAIBrief(payload),
    json: JSON.stringify(payload, null, 2),
  }
}

/** @param {ReturnType<typeof buildCanvasExport>} payload */
export function generateAIBrief(payload) {
  const lines = []
  const kitLabel = payload.kit.name || payload.kit.id
  const source = payload.kit.source === 'custom' ? 'custom kit' : 'curated kit'

  lines.push(`# Canvas layout: ${payload.layoutName}`)
  lines.push('')
  lines.push(`Build a vertical page layout using the **${kitLabel}** ${source} in **${payload.mode}** mode. Design for **${payload.viewport}** viewport. Preview state: ${payload.previewState}.`)
  lines.push('')
  lines.push('## Section stack (top to bottom)')
  lines.push('')

  if (payload.blocks.length === 0) {
    lines.push('_No blocks on canvas yet._')
  } else {
    payload.blocks.forEach((block) => {
      const props = formatBlockProps(block.props)
      const propsSuffix = props ? ` — ${props}` : ''
      lines.push(`${block.order}. **${block.label}** (${block.variantLabel} variant)${propsSuffix}`)
      if (block.description) lines.push(`   ${block.description}`)
    })
  }

  lines.push('')
  lines.push('## Implementation notes')
  lines.push('- Use design tokens from the selected kit (`var(--hp-*)` CSS variables).')
  lines.push('- Preserve section order and variant choices.')
  lines.push('- Honor inspector props (title, columns, density) where specified.')
  lines.push('- Match spacing density: compact = tight, spacious = generous padding.')
  lines.push('')
  lines.push('## Kit reference')
  lines.push(`- Kit ID: \`${payload.kit.id}\``)
  lines.push(`- Source: ${payload.kit.source}`)
  lines.push(`- Color mode: ${payload.mode}`)

  return lines.join('\n')
}

/** @param {Record<string, unknown>} props */
function formatBlockProps(props) {
  if (!props || typeof props !== 'object') return ''
  const parts = []
  if (typeof props.title === 'string' && props.title.trim()) {
    parts.push(`title: "${props.title.trim()}"`)
  }
  if (props.columns != null) parts.push(`columns: ${props.columns}`)
  if (props.density) {
    const label = DENSITY_OPTIONS.find((d) => d.id === props.density)?.label || props.density
    parts.push(`density: ${label}`)
  }
  return parts.join(', ')
}

export async function copyToClipboard(text) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text)
    return true
  }
  const textarea = document.createElement('textarea')
  textarea.value = text
  textarea.style.position = 'fixed'
  textarea.style.opacity = '0'
  document.body.appendChild(textarea)
  textarea.select()
  const ok = document.execCommand('copy')
  document.body.removeChild(textarea)
  return ok
}

export function downloadJson(filename, jsonString) {
  const blob = new Blob([jsonString], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  link.click()
  URL.revokeObjectURL(url)
}
