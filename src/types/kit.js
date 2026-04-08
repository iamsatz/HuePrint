/**
 * @typedef {Object} Palette
 * @property {string} background
 * @property {string} surface
 * @property {string} primary
 * @property {string} secondary
 * @property {string} accent
 * @property {string} text
 * @property {string} textMuted
 * @property {string} border
 * @property {string} success
 * @property {string} warning
 */

/**
 * @typedef {Object} Kit
 * @property {string} id
 * @property {string} name
 * @property {string} industry
 * @property {string} description
 * @property {{ light: Palette, dark: Palette }} palette
 */

export const INDUSTRIES = [
  'All',
  'SaaS',
  'Finance',
  'Fintech',
  'Health',
  'Retail',
  'E-commerce',
  'Creative',
  'Education',
  'Gaming',
  'Legal',
  'Food & Restaurant',
  'Real Estate',
  'Startup/Indie',
  'Travel',
  'Non-profit',
  'Design Tools',
];
