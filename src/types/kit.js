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
 * @property {'SaaS'|'Finance'|'Health'|'Retail'|'Creative'} industry
 * @property {string} description
 * @property {{ light: Palette, dark: Palette }} palette
 */

export const INDUSTRIES = ['All', 'SaaS', 'Finance', 'Health', 'Retail', 'Creative'];
