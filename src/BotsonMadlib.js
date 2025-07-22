import React from 'react';

// Import generic MadlibPage component
import MadlibPage from './components/MadlibPage';

// Import templates
import botsonTemplates from './templates/botson';

/**
 * Botson LinkedIn Madlibs page using the generic MadlibPage component
 */
const BotsonMadlib = () => {
  // Custom footer for Botson page
  const BotsonFooter = () => (
    <>
      <p className="mb-2">© {new Date().getFullYear()} LinkedIn Digital Gonad - Exposing LinkedIn Boastposting Culture One Post at a Time</p>
      <p className="mb-2">Created by overfocus - <a href="https://github.com/overfocus/madlibs" className="text-blue-600 hover:text-blue-800 underline">source code @ github.com/overfocus/madlibs</a></p>
      <p className="mb-2">Hosted by Vercel - <a href="https://vercel.com" className="text-blue-600 hover:text-blue-800 underline">vercel.com</a></p>
      <p>Visit <a href="https://kevinferron.com" className="text-blue-600 hover:text-blue-800 underline">kevinferron.com</a></p>
    </>
  );

  return (
    <MadlibPage
      templates={botsonTemplates}
      title="Stephen Botson: LinkedIn Digital Gonad"
      backLink="/"
      backLinkText="Back to Home"
      customStyles={{ backgroundColor: '#f5f5f5' }}
      footer={<BotsonFooter />}
      supportsImageSelection={true}
    />
  );
};

export default BotsonMadlib;
