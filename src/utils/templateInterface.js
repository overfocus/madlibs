/**
 * Template Interface
 * 
 * This file defines the structure that all madlib templates should follow.
 * Each template should export an object with this structure.
 * 
 * Example:
 * {
 *   id: 'unique-template-id',
 *   name: 'Template Name',
 *   text: 'This is a {adjective} template with {noun} placeholders.',
 *   inputs: [
 *     { id: 'adjective', label: 'Adjective' },
 *     { id: 'noun', label: 'Noun' }
 *   ]
 * }
 */

/**
 * @typedef {Object} InputField
 * @property {string} id - Unique identifier for the input field
 * @property {string} label - Display label for the input field
 */

/**
 * @typedef {Object} Template
 * @property {string} id - Unique identifier for the template
 * @property {string} name - Display name for the template
 * @property {string} text - Template text with placeholders in {id} format
 * @property {InputField[]} inputs - Array of input fields required by the template
 */

export {};
