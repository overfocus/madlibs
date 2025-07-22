import React from 'react';

// Import generic MadlibPage component
import MadlibPage from './components/MadlibPage';

// Import templates
import aiHypeTemplates from './templates/ai-hype';

/**
 * AI Hype Madlibs page using the generic MadlibPage component
 */
function App() {
  // Custom footer for AI Hype page
  const AiHypeFooter = () => (
    <>
      <p className="mb-2">© {new Date().getFullYear()} AI Hype Madlibs</p>
      <p className="mb-2">Created by overfocus - <a href="https://github.com/overfocus/madlibs" className="text-blue-600 hover:text-blue-800 underline">source code @ github.com/overfocus/madlibs</a></p>
      <p>Visit <a href="https://kevinferron.com" className="text-blue-600 hover:text-blue-800 underline">kevinferron.com</a></p>
    </>
  );

  return (
    <MadlibPage
      templates={aiHypeTemplates}
      title="AI Hype Madlibs"
      backLink="/"
      backLinkText="Back to Home"
      customStyles={{ backgroundColor: '#f0f8ff' }}
      footer={<AiHypeFooter />}
      supportsImageSelection={false}
    />
  );
}

export default App;
