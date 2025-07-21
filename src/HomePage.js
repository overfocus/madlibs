import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="home-container">
      <header className="home-header">
        <h1>Madlibs Generator</h1>
        <p className="subtitle">Choose your LinkedIn content generator</p>
      </header>

      <div className="templates-container">
        <div className="template-card">
          <h2>AI Hype Madlibs</h2>
          <p>Generate ridiculous AI hype posts that sound just like LinkedIn influencers!</p>
          <div className="template-example">
            "Our AI reduces productivity by exactly 42%, increases efficiency by 10x, and eliminates the need for data entirely."
          </div>
          <Link to="/ai-hype" className="template-button">
            Create AI Hype Post
          </Link>
        </div>

        <div className="template-card">
          <h2>Stephen Botson: LinkedIn Digital Gonad</h2>
          <p>Create boastful LinkedIn posts that nobody asked for!</p>
          <div className="template-example">
            "I rejected a candidate's CV twice. He applied for a third time so I invited him in for an interview..."
          </div>
          <Link to="/botson" className="template-button">
            Create Botson Post
          </Link>
        </div>
      </div>

      <footer>
        <p>© {new Date().getFullYear()} Madlibs Generator - Exposing LinkedIn Culture One Post at a Time</p>
        <p>Created by overfocus - <a href="https://github.com/overfocus/madlibs">source code @ github.com/overfocus/madlibs</a></p>
        <p>Hosted by Vercel - <a href="https://vercel.com">vercel.com</a></p>
        <p>Visit <a href="https://kevinferron.com">kevinferron.com</a></p>
      </footer>
    </div>
  );
};

export default HomePage;
