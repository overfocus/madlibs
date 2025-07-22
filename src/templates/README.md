# Madlibs Templates System

This directory contains the template system for the Madlibs application. The system is designed to be modular and extensible, allowing you to easily add new templates and even entire new madlib pages.

## Directory Structure

```
templates/
├── ai-hype/             # Templates for AI Hype madlibs
│   ├── accuracyTemplate.js
│   ├── announcementTemplate.js
│   ├── benchmarkTemplate.js
│   ├── conversationTemplate.js
│   ├── reductionTemplate.js
│   └── index.js         # Exports all AI Hype templates
├── botson/              # Templates for LinkedIn Botson madlibs
│   ├── linkedinPostTemplate.js
│   ├── networkingTemplate.js
│   └── index.js         # Exports all Botson templates
└── README.md            # This documentation file
```

## How to Add a New Template to an Existing Page

1. Create a new template file in the appropriate folder (e.g., `ai-hype/newTemplate.js`)
2. Follow the template structure (see below)
3. Update the corresponding `index.js` file to include your new template

### Template Structure

Each template should export an object with the following structure:

```javascript
const templateName = {
  id: "unique-id",          // Unique identifier for the template
  name: "Template Name",    // Display name for the template
  text: `Template text with {placeholder} values`,  // The template text with placeholders
  inputs: [                 // Array of input fields
    { 
      id: "placeholder",    // Must match the placeholder in the text
      label: "Human-readable label" // Displayed to the user
    },
    // Add more inputs as needed
  ]
};

export default templateName;
```

Example:

```javascript
const newTemplate = {
  id: "new-template",
  name: "My New Template",
  text: `This is a {adjective} template about {topic}.`,
  inputs: [
    { id: "adjective", label: "Adjective" },
    { id: "topic", label: "Topic" }
  ]
};

export default newTemplate;
```

## How to Add a New Madlib Page

To create an entirely new madlib page:

1. Create a new folder in the `templates` directory (e.g., `templates/new-page/`)
2. Add template files following the structure above
3. Create an `index.js` file in your new folder that exports all templates:

```javascript
// templates/new-page/index.js
import templateOne from './templateOne';
import templateTwo from './templateTwo';
// Import other templates

const newPageTemplates = [
  templateOne,
  templateTwo,
  // Add other templates
];

export default newPageTemplates;
```

4. Update the template loader in `src/utils/templateLoader.js` to include your new page:

```javascript
// Add this import
import newPageTemplates from '../templates/new-page';

// Add to the templates object
const templates = {
  'ai-hype': aiHypeTemplates,
  'botson': botsonTemplates,
  'new-page': newPageTemplates
};
```

5. Create a new component for your page (similar to App.js or BotsonMadlib.js)
6. Update the routing in `src/index.js` to include your new page

## Suggestions System

The application uses a suggestion helper system to provide relevant suggestions based on input labels. To ensure your templates work with the suggestion system:

1. Use standardized input labels that match the suggestion types in `src/utils/suggestions.js`
2. If you need a new suggestion type, add it to the `suggestions.js` file
3. Update the `getSuggestionType` function in `src/utils/suggestionHelper.js` if needed

## Testing Your Templates

After adding new templates:

1. Start the development server: `npm start`
2. Navigate to your madlib page
3. Test that all templates render correctly
4. Verify that appropriate suggestions appear for each input field
5. Check that the completed madlib displays properly with all user inputs

For any questions or issues, please refer to the codebase or contact the project maintainers.
