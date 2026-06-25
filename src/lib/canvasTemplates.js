import { createInstanceId, normalizeLayoutData } from './canvasStorage'
import { getDefaultVariant, isValidVariant } from './canvasBlocks'
import { normalizeBlockProps } from './canvasInspector'

/**
 * @typedef {Object} CanvasTemplate
 * @property {string} id
 * @property {string} name
 * @property {string} description
 * @property {string} category
 * @property {import('./canvasStorage').CanvasLayoutData} layout
 */

/** @type {CanvasTemplate[]} */
export const CANVAS_TEMPLATES = [
  {
    id: 'saas-dashboard',
    name: 'SaaS Dashboard',
    description: 'Sidebar nav, header, stats, chart, and activity feed',
    category: 'dashboard',
    layout: {
      kitRef: { source: 'curated', id: 'saas-clarity' },
      mode: 'light',
      previewState: 'default',
      viewport: 'desktop',
      blocks: [
        { blockId: 'dashboard-nav', variant: 'sidebar-light' },
        { blockId: 'dashboard-header', variant: 'default', props: { title: 'Overview', density: 'comfortable' } },
        { blockId: 'dashboard-stats', variant: 'metric-cards', props: { columns: 4, density: 'comfortable' } },
        { blockId: 'dashboard-chart', variant: 'bar', props: { title: 'Revenue — 2025', density: 'comfortable' } },
        { blockId: 'dashboard-activity', variant: 'feed', props: { title: 'Activity Feed', density: 'comfortable' } },
      ],
    },
  },
  {
    id: 'marketing-landing',
    name: 'Marketing Landing',
    description: 'Hero, features, pricing, testimonials, CTA, and footer',
    category: 'marketing',
    layout: {
      kitRef: { source: 'curated', id: 'startup-fresh' },
      mode: 'light',
      previewState: 'default',
      viewport: 'desktop',
      blocks: [
        { blockId: 'marketing-hero', variant: 'centered', props: { title: 'Give your AI tools a design system', density: 'spacious' } },
        { blockId: 'marketing-features', variant: 'grid', props: { title: 'Why teams choose us', columns: 2, density: 'comfortable' } },
        { blockId: 'marketing-pricing', variant: 'three-col', props: { columns: 3, density: 'comfortable' } },
        { blockId: 'marketing-testimonials', variant: 'grid', props: { columns: 3, density: 'comfortable' } },
        { blockId: 'marketing-cta', variant: 'banner' },
        { blockId: 'marketing-footer', variant: 'simple' },
      ],
    },
  },
  {
    id: 'ecommerce-catalog',
    name: 'E-commerce Catalog',
    description: 'Store nav, promo banner, filters, and product grid',
    category: 'ecommerce',
    layout: {
      kitRef: { source: 'curated', id: 'ecommerce-boutique' },
      mode: 'light',
      previewState: 'default',
      viewport: 'desktop',
      blocks: [
        { blockId: 'ecommerce-nav', variant: 'default' },
        { blockId: 'ecommerce-banner', variant: 'promo' },
        { blockId: 'ecommerce-filters', variant: 'chips' },
        { blockId: 'ecommerce-products', variant: 'four-col', props: { columns: 4, density: 'comfortable' } },
      ],
    },
  },
  {
    id: 'docs-site',
    name: 'Docs Site',
    description: 'Sidebar navigation, article content, and code sample',
    category: 'docs',
    layout: {
      kitRef: { source: 'curated', id: 'education-digital' },
      mode: 'light',
      previewState: 'default',
      viewport: 'desktop',
      blocks: [
        { blockId: 'docs-sidebar', variant: 'full-tree' },
        { blockId: 'docs-content', variant: 'with-toc', props: { title: 'Installation', density: 'comfortable' } },
        { blockId: 'docs-code', variant: 'tabbed' },
      ],
    },
  },
  {
    id: 'blog-magazine',
    name: 'Blog Home',
    description: 'Blog nav, hero header, post grid, and sidebar',
    category: 'blog',
    layout: {
      kitRef: { source: 'curated', id: 'creative-bold' },
      mode: 'light',
      previewState: 'default',
      viewport: 'desktop',
      blocks: [
        { blockId: 'blog-nav', variant: 'default' },
        { blockId: 'blog-header', variant: 'hero', props: { title: 'Thoughts on craft, design & code', density: 'spacious' } },
        { blockId: 'blog-grid', variant: 'three-col', props: { columns: 3, density: 'comfortable' } },
        { blockId: 'blog-sidebar', variant: 'tags-recent' },
      ],
    },
  },
]

/** @param {string} templateId */
export function getTemplate(templateId) {
  return CANVAS_TEMPLATES.find((t) => t.id === templateId) || null
}

/**
 * Convert a template into layout data with fresh instance IDs.
 * @param {CanvasTemplate} template
 */
export function templateToLayoutData(template) {
  const src = template.layout
  return normalizeLayoutData({
    kitRef: src.kitRef,
    mode: src.mode,
    previewState: src.previewState,
    viewport: src.viewport,
    blocks: (src.blocks || []).map((b) => ({
      instanceId: createInstanceId(),
      blockId: b.blockId,
      variant: b.variant && isValidVariant(b.blockId, b.variant) ? b.variant : getDefaultVariant(b.blockId),
      props: normalizeBlockProps(b.blockId, b.props),
    })),
  })
}
