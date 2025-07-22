/**
 * Utility functions for generating and managing suggestions
 */
import suggestions from './suggestions';

/**
 * Determines the appropriate suggestion type based on the input label
 * @param {string} label - The input label to analyze
 * @returns {string} - The suggestion type to use
 */
const getSuggestionType = (label) => {
  const lowerLabel = label.toLowerCase();
  
  if (lowerLabel.includes('image')) return 'image';
  if (lowerLabel.includes('adjective')) return 'adjective';
  if (lowerLabel.includes('verb')) return 'verb';
  if (lowerLabel.includes('location')) return 'location';
  if (lowerLabel.includes('place')) return 'place';
  if (lowerLabel.includes('danger')) return 'danger';
  if (lowerLabel.includes('group')) return 'group';
  if (lowerLabel.includes('lesson')) return 'lesson';
  if (lowerLabel.includes('people')) return 'people';
  if (lowerLabel.includes('technology')) return 'technology';
  if (lowerLabel.includes('thing')) return 'thing';
  if (lowerLabel.includes('trait')) return 'trait';
  if (lowerLabel.includes('emotion')) return 'emotion';
  if (lowerLabel.includes('conflict')) return 'conflict';
  if (lowerLabel.includes('response')) return 'response';
  if (lowerLabel.includes('feeling')) return 'feeling';
  if (lowerLabel.includes('event')) return 'event';
  if (lowerLabel.includes('activity')) return 'activity';
  if (lowerLabel.includes('person')) return 'person';
  if (lowerLabel.includes('achievement')) return 'achievement';
  if (lowerLabel.includes('approach')) return 'approach';
  if (lowerLabel.includes('industry')) return 'industry';
  if (lowerLabel.includes('innovation')) return 'innovation';
  if (lowerLabel.includes('result')) return 'result';
  if (lowerLabel.includes('opportunity')) return 'opportunity';
  if (lowerLabel.includes('value')) return 'value';
  if (lowerLabel.includes('motto')) return 'motto';
  if (lowerLabel.includes('reaction')) return 'reaction';
  if (lowerLabel.includes('number')) return 'number';
  
  // Default to noun if no specific type is found
  return 'noun';
};

/**
 * Generates suggestions for all steps in a template
 * @param {Object} template - The template object with inputs array
 * @param {number} count - Number of suggestions to generate per input
 * @returns {Object} - Object with suggestions for each step
 */
const generateSuggestionsForTemplate = (template, count = 6) => {
  const suggestionsByStep = {};
  
  template.inputs.forEach((input, index) => {
    const suggestionType = getSuggestionType(input.label);
    const suggestionList = suggestions[suggestionType] || suggestions.noun;
    
    suggestionsByStep[index] = [...suggestionList]
      .sort(() => 0.5 - Math.random())
      .slice(0, count);
  });
  
  return suggestionsByStep;
};

export { getSuggestionType, generateSuggestionsForTemplate };
