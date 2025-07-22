import React from 'react';
import './App.css';

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
      <p>© {new Date().getFullYear()} AI Hype Madlibs</p>
      <p>Created by overfocus - <a href="https://github.com/overfocus/madlibs">source code @ github.com/overfocus/madlibs</a></p>
      <p>Visit <a href="https://kevinferron.com">kevinferron.com</a></p>
    </>
  );

  // Custom styles for AI Hype page
  const aiHypeStyles = {
    backgroundColor: '#f0f8ff',  // Light blue background
  };

  return (
    <MadlibPage
      templates={aiHypeTemplates}
      title="AI Hype Madlibs"
      backLink="/"
      backLinkText="Back to Home"
      customStyles={aiHypeStyles}
      footer={<AiHypeFooter />}
      supportsImageSelection={false}
    />
  );
}

export default App;
