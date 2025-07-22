import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="bg-dark-header text-white py-12 text-center">
        <h1 className="text-4xl font-bold mb-2">Madlibs Generator</h1>
        <p className="text-xl text-gray-200">Choose your LinkedIn content generator</p>
      </header>

      <div className="container mx-auto px-4 py-12 flex-grow">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
            <div className="p-6">
              <h2 className="text-2xl font-bold text-secondary mb-3">AI Hype Madlibs</h2>
              <p className="text-gray-700 mb-4">Generate ridiculous AI hype posts that sound just like LinkedIn influencers!</p>
              <div className="bg-blue-50 p-4 rounded-md text-gray-800 italic mb-6 text-sm">
                "Our AI reduces productivity by exactly 42%, increases efficiency by 10x, and eliminates the need for data entirely."
              </div>
              <Link to="/ai-hype" className="block w-full bg-secondary hover:bg-secondary-dark text-white text-center py-3 rounded-md transition-colors font-medium">
                Create AI Hype Post
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
            <div className="p-6">
              <h2 className="text-2xl font-bold text-primary mb-3">Stephen Botson: LinkedIn Digital Gonad</h2>
              <p className="text-gray-700 mb-4">Create boastful LinkedIn posts that nobody asked for!</p>
              <div className="bg-green-50 p-4 rounded-md text-gray-800 italic mb-6 text-sm">
                "I rejected a candidate's CV twice. He applied for a third time so I invited him in for an interview..."
              </div>
              <Link to="/botson" className="block w-full bg-primary hover:bg-primary-dark text-white text-center py-3 rounded-md transition-colors font-medium">
                Create Botson Post
              </Link>
            </div>
          </div>
        </div>
      </div>

      <footer className="bg-gray-100 py-6 text-center text-gray-600">
        <p className="mb-2">© {new Date().getFullYear()} Madlibs Generator - Exposing LinkedIn Culture One Post at a Time</p>
        <p className="mb-2">Created by overfocus - <a href="https://github.com/overfocus/madlibs" className="text-blue-600 hover:text-blue-800 underline">source code @ github.com/overfocus/madlibs</a></p>
        <p className="mb-2">Hosted by Vercel - <a href="https://vercel.com" className="text-blue-600 hover:text-blue-800 underline">vercel.com</a></p>
        <p>Visit <a href="https://kevinferron.com" className="text-blue-600 hover:text-blue-800 underline">kevinferron.com</a></p>
      </footer>
    </div>
  );
};

export default HomePage;
