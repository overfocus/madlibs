# AI Hype Madlibs

A fun React application that generates hilarious AI hype sentences that sound like LinkedIn influencer posts. Users input various words (nouns, verbs, adjectives, and numbers) which are then inserted into pre-defined templates.

## Features

- Random selection of AI hype templates
- Step-by-step word input process
- Generates amusing AI hype sentences
- Clean, responsive UI
- Easy to extend with new templates

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository or navigate to the project folder
2. Install dependencies:

```bash
npm install
```

### Running the App

Start the development server:

```bash
npm start
```

The application will open in your browser at `http://localhost:3000`.

## How to Play

1. The app will present you with a form asking for different types of words (nouns, verbs, adjectives, numbers)
2. Fill in each prompt and click "Next"
3. After filling in all prompts, the app will generate a humorous AI hype sentence using your inputs
4. Click "Create Another Post" to start over with a new template

## Extending the App

To add more templates, edit the `templates` array in `App.js`. Each template should include:
- A `text` string with placeholders in curly braces `{placeholder}`
- An `inputs` array defining each placeholder and its label

## License

MIT
