import {
  DashboardNavBlock,
  DashboardStatsBlock,
  DashboardChartBlock,
  DashboardActivityBlock,
  DashboardHeaderBlock,
} from '../components/canvas/blocks/DashboardBlocks'
import {
  MarketingHeroBlock,
  MarketingFeaturesBlock,
  MarketingPricingBlock,
  MarketingTestimonialsBlock,
  MarketingCtaBlock,
  MarketingFooterBlock,
} from '../components/canvas/blocks/MarketingBlocks'
import {
  AuthSignInBlock,
  AuthSignUpBlock,
} from '../components/canvas/blocks/AuthBlocks'
import {
  EcommerceNavBlock,
  EcommerceBannerBlock,
  EcommerceFiltersBlock,
  EcommerceProductsBlock,
} from '../components/canvas/blocks/EcommerceBlocks'
import {
  BlogNavBlock,
  BlogHeaderBlock,
  BlogGridBlock,
  BlogSidebarBlock,
} from '../components/canvas/blocks/BlogBlocks'
import {
  SettingsLayoutBlock,
  SettingsSectionBlock,
} from '../components/canvas/blocks/SettingsBlocks'
import {
  DocsSidebarBlock,
  DocsContentBlock,
  DocsCodeBlock,
} from '../components/canvas/blocks/DocsBlocks'
import {
  PrimitiveDataTableBlock,
  PrimitivePaginationBlock,
  PrimitiveAccordionBlock,
  PrimitiveBreadcrumbBlock,
  PrimitiveModalBlock,
  PrimitiveToastBlock,
  PrimitiveStepperBlock,
  PrimitiveButtonsBlock,
  PrimitiveDatePickerBlock,
  PrimitiveCommandMenuBlock,
  PrimitiveChartBlock,
  PrimitiveIconGridBlock,
  PrimitiveLoaderBlock,
} from '../components/canvas/blocks/PrimitivesBlocks'

/** @typedef {'default'|'loading'|'empty'|'error'} PreviewState */

export const PREVIEW_STATES = [
  { id: 'default', label: 'Default' },
  { id: 'loading', label: 'Loading' },
  { id: 'empty', label: 'Empty' },
  { id: 'error', label: 'Error' },
]

/**
 * @typedef {Object} CanvasBlockVariant
 * @property {string} id
 * @property {string} label
 */

/**
 * @typedef {Object} CanvasBlockDef
 * @property {string} id
 * @property {string} label
 * @property {string} category
 * @property {string} description
 * @property {CanvasBlockVariant[]} variants
 * @property {boolean} [supportsStates]
 * @property {React.ComponentType<{ variant?: string }>} Component
 */

/** @type {Record<string, { id: string, label: string }>} */
export const CANVAS_CATEGORIES = {
  dashboard: { id: 'dashboard', label: 'Dashboard' },
  marketing: { id: 'marketing', label: 'Marketing / Landing' },
  auth: { id: 'auth', label: 'Auth' },
  ecommerce: { id: 'ecommerce', label: 'E-commerce' },
  blog: { id: 'blog', label: 'Blog' },
  settings: { id: 'settings', label: 'Settings' },
  docs: { id: 'docs', label: 'Documentation' },
  primitives: { id: 'primitives', label: 'UI Primitives' },
}

/** @type {CanvasBlockDef[]} */
export const CANVAS_BLOCKS = [
  // Dashboard
  {
    id: 'dashboard-header',
    label: 'Page Header',
    category: 'dashboard',
    description: 'Dashboard title and actions',
    variants: [{ id: 'default', label: 'Default' }],
    supportsStates: false,
    Component: DashboardHeaderBlock,
  },
  {
    id: 'dashboard-nav',
    label: 'Navigation',
    category: 'dashboard',
    description: 'Sidebar or top bar navigation',
    variants: [
      { id: 'topbar', label: 'Top bar' },
      { id: 'sidebar-dark', label: 'Dark sidebar' },
      { id: 'sidebar-light', label: 'Light sidebar' },
    ],
    supportsStates: false,
    Component: DashboardNavBlock,
  },
  {
    id: 'dashboard-stats',
    label: 'Stats Row',
    category: 'dashboard',
    description: 'Key metrics and KPI cards',
    variants: [
      { id: 'metric-cards', label: 'Metric cards' },
      { id: 'sparklines', label: 'Sparklines' },
      { id: 'inline', label: 'Inline stats' },
    ],
    Component: DashboardStatsBlock,
  },
  {
    id: 'dashboard-chart',
    label: 'Chart',
    category: 'dashboard',
    description: 'Revenue or analytics chart',
    variants: [
      { id: 'bar', label: 'Bar chart' },
      { id: 'line', label: 'Line chart' },
      { id: 'area', label: 'Area chart' },
    ],
    Component: DashboardChartBlock,
  },
  {
    id: 'dashboard-activity',
    label: 'Activity',
    category: 'dashboard',
    description: 'Feed, table, or quick actions',
    variants: [
      { id: 'feed', label: 'Activity feed' },
      { id: 'table', label: 'Recent table' },
      { id: 'actions', label: 'Quick actions' },
    ],
    Component: DashboardActivityBlock,
  },
  // Marketing
  {
    id: 'marketing-hero',
    label: 'Hero',
    category: 'marketing',
    description: 'Landing page hero section',
    variants: [
      { id: 'bold', label: 'Bold centered' },
      { id: 'split', label: 'Split layout' },
      { id: 'centered', label: 'CTA centered' },
    ],
    supportsStates: false,
    Component: MarketingHeroBlock,
  },
  {
    id: 'marketing-features',
    label: 'Features',
    category: 'marketing',
    description: 'Feature highlights grid or list',
    variants: [
      { id: 'grid', label: '2-column grid' },
      { id: 'list', label: 'List' },
      { id: 'icons', label: 'Icon row' },
    ],
    Component: MarketingFeaturesBlock,
  },
  {
    id: 'marketing-pricing',
    label: 'Pricing',
    category: 'marketing',
    description: 'Pricing plans section',
    variants: [
      { id: 'three-col', label: '3-column cards' },
      { id: 'two-col', label: '2-column cards' },
      { id: 'table', label: 'Feature table' },
    ],
    Component: MarketingPricingBlock,
  },
  {
    id: 'marketing-testimonials',
    label: 'Testimonials',
    category: 'marketing',
    description: 'Customer quotes and social proof',
    variants: [
      { id: 'grid', label: '3-column grid' },
      { id: 'carousel', label: 'Horizontal scroll' },
      { id: 'single', label: 'Single quote' },
    ],
    Component: MarketingTestimonialsBlock,
  },
  {
    id: 'marketing-cta',
    label: 'Call to Action',
    category: 'marketing',
    description: 'Conversion banner or CTA strip',
    variants: [
      { id: 'banner', label: 'Full banner' },
      { id: 'split', label: 'Split CTA' },
      { id: 'minimal', label: 'Minimal strip' },
    ],
    supportsStates: false,
    Component: MarketingCtaBlock,
  },
  {
    id: 'marketing-footer',
    label: 'Footer',
    category: 'marketing',
    description: 'Page footer with links',
    variants: [
      { id: 'simple', label: 'Simple' },
      { id: 'columns', label: 'Multi-column' },
      { id: 'minimal', label: 'Minimal bar' },
    ],
    supportsStates: false,
    Component: MarketingFooterBlock,
  },
  // Auth
  {
    id: 'auth-signin',
    label: 'Sign In',
    category: 'auth',
    description: 'Authentication sign-in form',
    variants: [
      { id: 'centered', label: 'Centered card' },
      { id: 'split', label: 'Split panel' },
      { id: 'full-bleed', label: 'Full bleed' },
    ],
    supportsStates: false,
    Component: AuthSignInBlock,
  },
  {
    id: 'auth-signup',
    label: 'Sign Up',
    category: 'auth',
    description: 'Registration sign-up form',
    variants: [
      { id: 'single', label: 'Single step' },
      { id: 'multi-step', label: 'Multi-step' },
      { id: 'split', label: 'Split panel' },
    ],
    supportsStates: false,
    Component: AuthSignUpBlock,
  },
  // E-commerce
  {
    id: 'ecommerce-nav',
    label: 'Shop Navigation',
    category: 'ecommerce',
    description: 'Store nav with search and cart',
    variants: [{ id: 'default', label: 'Default' }],
    supportsStates: false,
    Component: EcommerceNavBlock,
  },
  {
    id: 'ecommerce-banner',
    label: 'Promo Banner',
    category: 'ecommerce',
    description: 'Hero promo or category strip',
    variants: [
      { id: 'promo', label: 'Promo hero' },
      { id: 'categories', label: 'Category strip' },
      { id: 'sale', label: 'Sale header' },
    ],
    supportsStates: false,
    Component: EcommerceBannerBlock,
  },
  {
    id: 'ecommerce-filters',
    label: 'Filter Bar',
    category: 'ecommerce',
    description: 'Product filters and sort',
    variants: [
      { id: 'chips', label: 'Filter chips' },
      { id: 'sidebar-filters', label: 'Sidebar + grid' },
      { id: 'dropdown', label: 'Dropdowns' },
    ],
    Component: EcommerceFiltersBlock,
  },
  {
    id: 'ecommerce-products',
    label: 'Product Grid',
    category: 'ecommerce',
    description: 'Product cards or list view',
    variants: [
      { id: 'four-col', label: '4-column' },
      { id: 'three-col', label: '3-column' },
      { id: 'list', label: 'List view' },
    ],
    Component: EcommerceProductsBlock,
  },
  // Blog
  {
    id: 'blog-nav',
    label: 'Blog Navigation',
    category: 'blog',
    description: 'Blog header navigation',
    variants: [{ id: 'default', label: 'Default' }],
    supportsStates: false,
    Component: BlogNavBlock,
  },
  {
    id: 'blog-header',
    label: 'Blog Header',
    category: 'blog',
    description: 'Hero, masthead, or featured layout',
    variants: [
      { id: 'hero', label: 'Full hero' },
      { id: 'masthead', label: 'Masthead' },
      { id: 'featured', label: 'Featured story' },
    ],
    supportsStates: false,
    Component: BlogHeaderBlock,
  },
  {
    id: 'blog-grid',
    label: 'Post Grid',
    category: 'blog',
    description: 'Article cards and layouts',
    variants: [
      { id: 'three-col', label: '3-column' },
      { id: 'featured-list', label: 'Featured + list' },
      { id: 'magazine', label: 'Magazine' },
    ],
    Component: BlogGridBlock,
  },
  {
    id: 'blog-sidebar',
    label: 'Blog Sidebar',
    category: 'blog',
    description: 'Tags, newsletter, or author',
    variants: [
      { id: 'tags-recent', label: 'Tags & recent' },
      { id: 'newsletter', label: 'Newsletter CTA' },
      { id: 'author', label: 'About author' },
    ],
    Component: BlogSidebarBlock,
  },
  // Settings
  {
    id: 'settings-layout',
    label: 'Settings Layout',
    category: 'settings',
    description: 'Sidebar, top tabs, or accordion',
    variants: [
      { id: 'sidebar-tabs', label: 'Sidebar tabs' },
      { id: 'top-tabs', label: 'Top tabs' },
      { id: 'accordion', label: 'Accordion' },
    ],
    supportsStates: false,
    Component: SettingsLayoutBlock,
  },
  {
    id: 'settings-section',
    label: 'Settings Section',
    category: 'settings',
    description: 'Profile, account, or notifications',
    variants: [
      { id: 'profile', label: 'Profile' },
      { id: 'account', label: 'Account' },
      { id: 'notifications', label: 'Notifications' },
    ],
    Component: SettingsSectionBlock,
  },
  // Docs
  {
    id: 'docs-sidebar',
    label: 'Docs Sidebar',
    category: 'docs',
    description: 'Navigation tree or categories',
    variants: [
      { id: 'full-tree', label: 'Full tree' },
      { id: 'compact', label: 'Compact' },
      { id: 'categories', label: 'Categories' },
    ],
    supportsStates: false,
    Component: DocsSidebarBlock,
  },
  {
    id: 'docs-content',
    label: 'Docs Content',
    category: 'docs',
    description: 'Article body with optional TOC',
    variants: [
      { id: 'wide', label: 'Wide body' },
      { id: 'with-toc', label: 'With TOC' },
    ],
    Component: DocsContentBlock,
  },
  {
    id: 'docs-code',
    label: 'Code Block',
    category: 'docs',
    description: 'Highlighted, terminal, or tabbed code',
    variants: [
      { id: 'highlighted', label: 'Highlighted' },
      { id: 'terminal', label: 'Terminal' },
      { id: 'tabbed', label: 'Tabbed' },
    ],
    Component: DocsCodeBlock,
  },
  // UI Primitives
  {
    id: 'primitive-buttons',
    label: 'Buttons & Badges',
    category: 'primitives',
    description: 'Primary, outline, ghost, and badge styles',
    variants: [
      { id: 'primary-set', label: 'Color set' },
      { id: 'ghost-outline', label: 'Outline & ghost' },
      { id: 'sizes', label: 'Size variants' },
    ],
    supportsStates: false,
    Component: PrimitiveButtonsBlock,
  },
  {
    id: 'primitive-table',
    label: 'Data Table',
    category: 'primitives',
    description: 'Full, compact, or card view table',
    variants: [
      { id: 'full-data', label: 'Full data' },
      { id: 'compact', label: 'Compact' },
      { id: 'card-view', label: 'Card view' },
    ],
    Component: PrimitiveDataTableBlock,
  },
  {
    id: 'primitive-pagination',
    label: 'Pagination',
    category: 'primitives',
    description: 'Simple prev/next or page selector',
    variants: [
      { id: 'simple', label: 'Simple' },
      { id: 'page-selector', label: 'Page selector' },
    ],
    Component: PrimitivePaginationBlock,
  },
  {
    id: 'primitive-accordion',
    label: 'Accordion',
    category: 'primitives',
    description: 'Expandable FAQ or settings panels',
    variants: [
      { id: 'default', label: 'Default' },
      { id: 'bordered', label: 'Bordered cards' },
    ],
    Component: PrimitiveAccordionBlock,
  },
  {
    id: 'primitive-breadcrumb',
    label: 'Breadcrumb',
    category: 'primitives',
    description: 'Navigation path trail',
    variants: [
      { id: 'default', label: 'Default' },
      { id: 'with-icon', label: 'Deep path' },
    ],
    supportsStates: false,
    Component: PrimitiveBreadcrumbBlock,
  },
  {
    id: 'primitive-modal',
    label: 'Modal / Drawer',
    category: 'primitives',
    description: 'Centered dialog or side drawer',
    variants: [
      { id: 'centered', label: 'Centered modal' },
      { id: 'drawer', label: 'Side drawer' },
    ],
    supportsStates: false,
    Component: PrimitiveModalBlock,
  },
  {
    id: 'primitive-toast',
    label: 'Toast / Alert',
    category: 'primitives',
    description: 'Success, error, or info notification',
    variants: [
      { id: 'success', label: 'Success' },
      { id: 'error', label: 'Error' },
      { id: 'info', label: 'Info' },
    ],
    supportsStates: false,
    Component: PrimitiveToastBlock,
  },
  {
    id: 'primitive-stepper',
    label: 'Stepper',
    category: 'primitives',
    description: 'Horizontal or vertical progress steps',
    variants: [
      { id: 'horizontal', label: 'Horizontal' },
      { id: 'vertical', label: 'Vertical' },
    ],
    supportsStates: false,
    Component: PrimitiveStepperBlock,
  },
  {
    id: 'primitive-datepicker',
    label: 'Date Picker',
    category: 'primitives',
    description: 'Single date, range, or inline picker',
    variants: [
      { id: 'single', label: 'Single date' },
      { id: 'range', label: 'Date range' },
      { id: 'inline', label: 'Inline bar' },
    ],
    supportsStates: false,
    Component: PrimitiveDatePickerBlock,
  },
  {
    id: 'primitive-command',
    label: 'Command Menu',
    category: 'primitives',
    description: 'Searchable command palette',
    variants: [
      { id: 'default', label: 'Full palette' },
      { id: 'grouped', label: 'Grouped' },
      { id: 'compact', label: 'Compact trigger' },
    ],
    supportsStates: false,
    Component: PrimitiveCommandMenuBlock,
  },
  {
    id: 'primitive-chart',
    label: 'Chart',
    category: 'primitives',
    description: 'Donut, radial, or horizontal bar chart',
    variants: [
      { id: 'donut', label: 'Donut' },
      { id: 'radial', label: 'Radial progress' },
      { id: 'bar-horizontal', label: 'Horizontal bars' },
    ],
    Component: PrimitiveChartBlock,
  },
  {
    id: 'primitive-icons',
    label: 'Icon Grid',
    category: 'primitives',
    description: 'Lucide icon set preview',
    variants: [
      { id: 'outline', label: 'Outline tiles' },
      { id: 'filled', label: 'Filled tiles' },
    ],
    supportsStates: false,
    Component: PrimitiveIconGridBlock,
  },
  {
    id: 'primitive-loader',
    label: 'Loaders',
    category: 'primitives',
    description: 'Spinner, skeleton, or shimmer animation',
    variants: [
      { id: 'spinner', label: 'Spinner' },
      { id: 'skeleton', label: 'Skeleton' },
      { id: 'shimmer', label: 'Shimmer bars' },
    ],
    supportsStates: false,
    Component: PrimitiveLoaderBlock,
  },
]

/** @param {string} blockId */
export function getBlockDef(blockId) {
  return CANVAS_BLOCKS.find((b) => b.id === blockId) || null
}

/** @param {string} categoryId */
export function getBlocksByCategory(categoryId) {
  return CANVAS_BLOCKS.filter((b) => b.category === categoryId)
}

/** @param {string} blockId */
export function getDefaultVariant(blockId) {
  const def = getBlockDef(blockId)
  return def?.variants[0]?.id || 'default'
}

/** @param {string} blockId @param {string} variantId */
export function isValidVariant(blockId, variantId) {
  const def = getBlockDef(blockId)
  if (!def) return false
  return def.variants.some((v) => v.id === variantId)
}

/** @param {string} stateId */
export function isValidPreviewState(stateId) {
  return PREVIEW_STATES.some((s) => s.id === stateId)
}

export function getBlockCount() {
  return CANVAS_BLOCKS.length
}

export function getVariantCount() {
  return CANVAS_BLOCKS.reduce((sum, b) => sum + b.variants.length, 0)
}
