import React from 'react';
import './BotsonMadlib.css';

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
      <p> {new Date().getFullYear()} LinkedIn Digital Gonad - Exposing LinkedIn Boastposting Culture One Post at a Time</p>
      <p>Created by overfocus - <a href="https://github.com/overfocus/madlibs">source code @ github.com/overfocus/madlibs</a></p>
      <p>Hosted by Vercel - <a href="https://vercel.com">vercel.com</a></p>
      <p>Visit <a href="https://kevinferron.com">kevinferron.com</a></p>
    </>
  );

  // Custom styles for Botson page
  const botsonStyles = {
    backgroundColor: '#f5f5f5',  // Light gray background
  };

  return (
    <MadlibPage
      templates={botsonTemplates}
      title="Stephen Botson: LinkedIn Digital Gonad"
      backLink="/"
      backLinkText="Back to Home"
      customStyles={botsonStyles}
      footer={<BotsonFooter />}
      supportsImageSelection={true}
    />
  );
};

export default BotsonMadlib;
