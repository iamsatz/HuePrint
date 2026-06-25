import { getBlockDef } from './canvasBlocks'

/** @typedef {'compact'|'comfortable'|'spacious'} BlockDensity */
/** @typedef {'desktop'|'tablet'|'mobile'} ViewportId */

export const VIEWPORTS = [
  { id: 'desktop', label: 'Desktop', width: null, icon: 'monitor' },
  { id: 'tablet', label: 'Tablet', width: 768, icon: 'tablet' },
  { id: 'mobile', label: 'Mobile', width: 375, icon: 'smartphone' },
]

export const DENSITY_OPTIONS = [
  { id: 'compact', label: 'Compact', scale: 0.85 },
  { id: 'comfortable', label: 'Comfortable', scale: 1 },
  { id: 'spacious', label: 'Spacious', scale: 1.15 },
]

/**
 * @typedef {Object} BlockInspectorConfig
 * @property {boolean} [title]
 * @property {boolean} [columns]
 * @property {number} [defaultColumns]
 * @property {number[]} [columnOptions]
 * @property {boolean} [density]
 */

/**
 * Per-block inspector field availability.
 * @type {Record<string, BlockInspectorConfig>}
 */
export const BLOCK_INSPECTOR = {
  'dashboard-header': { title: true, density: true },
  'dashboard-stats': { columns: true, defaultColumns: 4, columnOptions: [2, 3, 4], density: true },
  'dashboard-chart': { title: true, density: true },
  'dashboard-activity': { title: true, density: true },
  'marketing-hero': { title: true, density: true },
  'marketing-features': { columns: true, defaultColumns: 2, columnOptions: [1, 2, 3, 4], density: true },
  'marketing-pricing': { columns: true, defaultColumns: 3, columnOptions: [2, 3], density: true },
  'marketing-testimonials': { columns: true, defaultColumns: 3, columnOptions: [1, 2, 3], density: true },
  'ecommerce-products': { columns: true, defaultColumns: 4, columnOptions: [2, 3, 4], density: true },
  'blog-grid': { columns: true, defaultColumns: 3, columnOptions: [1, 2, 3], density: true },
  'blog-header': { title: true, density: true },
  'settings-section': { title: true, density: true },
  'docs-content': { title: true, density: true },
  'primitive-table': { title: true, density: true },
  'primitive-accordion': { title: true, density: true },
}

/** @param {string} blockId @returns {BlockInspectorConfig|null} */
export function getInspectorConfig(blockId) {
  return BLOCK_INSPECTOR[blockId] || null
}

/** @param {string} blockId */
export function blockSupportsInspector(blockId) {
  return Boolean(getInspectorConfig(blockId))
}

/** @param {string} blockId @returns {{ title: string, columns: number, density: BlockDensity }} */
export function getDefaultBlockProps(blockId) {
  const cfg = getInspectorConfig(blockId)
  return {
    title: '',
    columns: cfg?.defaultColumns ?? 3,
    density: 'comfortable',
  }
}

/** @param {string} blockId @param {Record<string, unknown>} props */
export function normalizeBlockProps(blockId, props = {}) {
  const defaults = getDefaultBlockProps(blockId)
  const cfg = getInspectorConfig(blockId)
  const density = ['compact', 'comfortable', 'spacious'].includes(props.density)
    ? props.density
    : defaults.density
  let columns = Number(props.columns)
  if (!Number.isFinite(columns) || columns < 1) columns = defaults.columns
  if (cfg?.columnOptions?.length && !cfg.columnOptions.includes(columns)) {
    columns = defaults.columns
  }
  return {
    title: typeof props.title === 'string' ? props.title : defaults.title,
    columns,
    density,
  }
}

/** @param {string} viewportId */
export function isValidViewport(viewportId) {
  return VIEWPORTS.some((v) => v.id === viewportId)
}

/** @param {string} viewportId */
export function getViewportWidth(viewportId) {
  const vp = VIEWPORTS.find((v) => v.id === viewportId)
  return vp?.width ?? null
}

/** @param {import('./canvasBlocks').CanvasBlockDef|null} def @param {{ title?: string, columns?: number, density?: string }} props */
export function resolveBlockTitle(def, props) {
  if (props?.title?.trim()) return props.title.trim()
  return def?.label || 'Section'
}

/** @param {BlockDensity} density */
export function densityPadding(density) {
  if (density === 'compact') return 12
  if (density === 'spacious') return 28
  return 18
}

/** @param {BlockDensity} density */
export function densityGap(density) {
  if (density === 'compact') return 8
  if (density === 'spacious') return 18
  return 12
}

/** @param {BlockDensity} density */
export function densityFontScale(density) {
  const found = DENSITY_OPTIONS.find((d) => d.id === density)
  return found?.scale ?? 1
}
