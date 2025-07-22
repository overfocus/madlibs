/**
 * Template loader utility
 * Handles loading and managing templates from different directories
 */

// Import all templates dynamically
const importAllTemplates = async (templateType) => {
  let templates = [];
  
  try {
    if (templateType === 'ai-hype') {
      const context = require.context('../templates/ai-hype', false, /\.js$/);
      templates = context.keys().map(key => context(key).default);
    } else if (templateType === 'botson') {
      const context = require.context('../templates/botson', false, /\.js$/);
      templates = context.keys().map(key => context(key).default);
    }
  } catch (error) {
    console.error(`Error loading templates for ${templateType}:`, error);
  }
  
  return templates;
};

// Get a random template from the list
const getRandomTemplate = (templates) => {
  if (!templates || templates.length === 0) {
    throw new Error('No templates available');
  }
  const randomIndex = Math.floor(Math.random() * templates.length);
  return templates[randomIndex];
};

export { importAllTemplates, getRandomTemplate };
