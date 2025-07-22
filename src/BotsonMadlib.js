import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import './BotsonMadlib.css';

// Import templates and utilities
import botsonTemplates from './templates/botson';
import { generateSuggestionsForTemplate, getSuggestionType } from './utils/suggestionHelper';
import suggestions from './utils/suggestions';

const BotsonMadlib = () => {
  // State variables
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [userInputs, setUserInputs] = useState({});
  const [currentInput, setCurrentInput] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [currentSuggestions, setCurrentSuggestions] = useState([]);
  const resultRef = useRef(null);

  // Initialize the game with a random template and suggestions
  useEffect(() => {
    resetGame();
  }, []);

  // Update suggestions when the current step changes
  useEffect(() => {
    if (selectedTemplate) {
      const newSuggestions = getSuggestionsForStep(currentStep);
      setCurrentSuggestions(newSuggestions);
    }
  }, [currentStep, selectedTemplate]);

  // Get suggestions for a specific step
  const getSuggestionsForStep = useCallback((step) => {
    if (!selectedTemplate || step >= selectedTemplate.inputs.length) {
      return [];
    }
    
    const input = selectedTemplate.inputs[step];
    const suggestionType = getSuggestionType(input.label);
    return suggestions[suggestionType] || [];
  }, [selectedTemplate]);

  // Function to get a new random template
  const getNewRandomTemplate = useCallback(() => {
    const randomIndex = Math.floor(Math.random() * botsonTemplates.length);
    return botsonTemplates[randomIndex];
  }, []);

  // Handle input change
  const handleInputChange = (e) => {
    setCurrentInput(e.target.value);
  };

  // Handle suggestion click
  const handleSuggestionClick = (suggestion) => {
    setCurrentInput(suggestion);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Save the current input
    const updatedInputs = {
      ...userInputs,
      [selectedTemplate.inputs[currentStep].id]: currentInput
    };
    
    setUserInputs(updatedInputs);
    
    // Move to the next step or complete
    if (currentStep < selectedTemplate.inputs.length - 1) {
      setCurrentStep(currentStep + 1);
      setCurrentInput('');
    } else {
      setIsComplete(true);
    }
  };

  // Function to reset the game
  const resetGame = useCallback(() => {
    const newTemplate = getNewRandomTemplate();
    setSelectedTemplate(newTemplate);
    setCurrentStep(0);
    setUserInputs({});
    setCurrentInput('');
    setIsComplete(false);
    setCopySuccess(false);
    
    // Pre-generate suggestions for all steps
    if (newTemplate) {
      const suggestionsByStep = generateSuggestionsForTemplate(newTemplate, suggestions);
      setCurrentSuggestions(suggestionsByStep[0] || []);
    }
  }, [getNewRandomTemplate]);

  // Function to replace placeholders with user inputs
  const generateMadlib = () => {
    if (!selectedTemplate) return '';
    
    let result = selectedTemplate.text;
    Object.keys(userInputs).forEach(key => {
      const regex = new RegExp(`{${key}}`, 'g');
      result = result.replace(regex, userInputs[key]);
    });
    
    return result;
  };

  // Function to copy generated madlib to clipboard
  const copyToClipboard = () => {
    if (resultRef.current) {
      const textToCopy = resultRef.current.innerText;
      navigator.clipboard.writeText(textToCopy)
        .then(() => {
          setCopySuccess(true);
          setTimeout(() => setCopySuccess(false), 2000);
        })
        .catch(err => {
          console.error('Failed to copy text: ', err);
        });
    }
  };

  // Function to go back to the main page
  const goToMainPage = () => {
    window.location.href = '/';
  };

  // If no template is selected yet, show loading
  if (!selectedTemplate) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="botson-madlib">
      <header>
        <div className="header-content">
          <h1>LinkedIn Boastpost Generator</h1>
          <p>Create your own LinkedIn boastpost with this madlib generator.</p>
        </div>
      </header>

      <div className="content">
        {!isComplete ? (
          <div className="input-section">
            <h2>Fill in the blank ({currentStep + 1}/{selectedTemplate.inputs.length})</h2>
            <form onSubmit={handleSubmit}>
              <div className="input-group">
                <label>{selectedTemplate.inputs[currentStep].label}:</label>
                {selectedTemplate.inputs[currentStep].id === 'image' ? (
                  <div className="image-selection">
                    <div className="suggestion-buttons image-suggestions">
                      {currentSuggestions.map((suggestion, index) => (
                        <div 
                          key={index}
                          className={`image-option ${currentInput === suggestion ? 'selected' : ''}`}
                          onClick={() => handleSuggestionClick(suggestion)}
                        >
                          <img src={suggestion} alt={`Option ${index + 1}`} />
                        </div>
                      ))}
                    </div>
                    <input
                      type="hidden"
                      value={currentInput}
                      required
                    />
                  </div>
                ) : (
                  <>
                    <input
                      type="text"
                      value={currentInput}
                      onChange={handleInputChange}
                      autoFocus
                      required
                    />
                    <div className="suggestions">
                      <p>Suggestions:</p>
                      <div className="suggestion-buttons">
                        {currentSuggestions.map((suggestion, index) => (
                          <button 
                            key={index} 
                            type="button" 
                            className="suggestion-btn"
                            onClick={() => handleSuggestionClick(suggestion)}
                          >
                            {suggestion}
                          </button>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </div>
              <button type="submit" className="submit-btn">
                {currentStep === selectedTemplate.inputs.length - 1 ? 'Complete' : 'Next'}
              </button>
            </form>
          </div>
        ) : (
          <div className="result-section">
            <h2>Botson says:</h2>
            {userInputs.image && (
              <div className="post-image">
                <img src={userInputs.image} alt="Post illustration" />
              </div>
            )}
            <div className="madlib-result" ref={resultRef}>
              {generateMadlib().split('\n').map((line, index) => (
                <p key={index}>{line}</p>
              ))}
            </div>
            <div className="result-actions">
              <button onClick={resetGame} className="reset-btn">
                Create Another Post
              </button>
              <button onClick={copyToClipboard} className="copy-btn">
                {copySuccess ? 'Copied!' : 'Copy to Clipboard'}
              </button>
            </div>
          </div>
        )}
        
        <div className="navigation-buttons">
          <button onClick={goToMainPage} className="nav-btn">
            Back to AI Hype Madlibs
          </button>
        </div>
      </div>

      <footer>
        <p>© {new Date().getFullYear()} LinkedIn Digital Gonad - Exposing LinkedIn Boastposting Culture One Post at a Time</p>
        <p>Created by overfocus - <a href="https://github.com/overfocus/madlibs">source code @ github.com/overfocus/madlibs</a></p>
        <p>Hosted by Vercel - <a href="https://vercel.com">vercel.com</a></p>
        <p>Visit <a href="https://kevinferron.com">kevinferron.com</a></p>
      </footer>
    </div>
  );
};

export default BotsonMadlib;
