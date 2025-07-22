import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './App.css';

// Import templates and utilities
import aiHypeTemplates from './templates/ai-hype';
import { generateSuggestionsForTemplate, getSuggestionType } from './utils/suggestionHelper';
import suggestions from './utils/suggestions';

function App() {
  // Initialize with a random template first
  const initialTemplate = aiHypeTemplates[Math.floor(Math.random() * aiHypeTemplates.length)];
  
  // State to track the current step in the madlib process
  const [currentStep, setCurrentStep] = useState(0);
  // State to store user inputs
  const [userInputs, setUserInputs] = useState({});
  // State to track the current input being collected
  const [currentInput, setCurrentInput] = useState('');
  // State to track if the madlib is complete
  const [isComplete, setIsComplete] = useState(false);
  // State to track current suggestions
  const [currentSuggestions, setCurrentSuggestions] = useState([]);
  // State to track the selected template
  const [selectedTemplate, setSelectedTemplate] = useState(initialTemplate);
  // State to track copy to clipboard success
  const [copySuccess, setCopySuccess] = useState(false);
  
  // Generate and store all suggestions for each step at initialization
  const [allSuggestions, setAllSuggestions] = useState(() => {
    return generateSuggestionsForTemplate(initialTemplate, 3);
  });

  // Function to get suggestions for the current step
  const getSuggestionsForStep = (step) => {
    return allSuggestions[step] || [];
  };

  // Update current suggestions when the step changes
  useEffect(() => {
    if (currentStep < selectedTemplate.inputs.length) {
      setCurrentSuggestions(getSuggestionsForStep(currentStep));
    }
  }, [currentStep, selectedTemplate, getSuggestionsForStep]);

  // Handle input changes
  const handleInputChange = (e) => {
    setCurrentInput(e.target.value);
  };

  // Handle suggestion clicks
  const handleSuggestionClick = (suggestion) => {
    setCurrentInput(suggestion);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (currentInput.trim() === '') return;
    
    const updatedInputs = {
      ...userInputs,
      [selectedTemplate.inputs[currentStep].id]: currentInput
    };
    
    setUserInputs(updatedInputs);
    setCurrentInput('');
    
    if (currentStep < selectedTemplate.inputs.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsComplete(true);
    }
  };

  // Generate the final madlib
  const generateMadlib = () => {
    let result = selectedTemplate.text;
    
    Object.keys(userInputs).forEach(key => {
      const regex = new RegExp(`{${key}}`, 'g');
      result = result.replace(regex, userInputs[key]);
    });
    
    return result;
  };

  // Copy to clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(generateMadlib())
      .then(() => {
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000);
      })
      .catch(err => {
        console.error('Failed to copy text: ', err);
      });
  };

  // Reset the game
  const resetGame = () => {
    const newTemplate = aiHypeTemplates[Math.floor(Math.random() * aiHypeTemplates.length)];
    setSelectedTemplate(newTemplate);
    setCurrentStep(0);
    setUserInputs({});
    setCurrentInput('');
    setIsComplete(false);
    setCopySuccess(false);
    
    // Create new suggestions for the new template
    setAllSuggestions(generateSuggestionsForTemplate(newTemplate, 3));
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>AI Hype Madlibs</h1>
        <Link to="/" className="home-link">Back to Home</Link>
      </header>
      
      <div className="madlib-container">
        {!isComplete ? (
          <div className="input-section">
            <h2>Fill in the blank ({currentStep + 1}/{selectedTemplate.inputs.length})</h2>
            <p className="input-label">{selectedTemplate.inputs[currentStep].label}</p>
            
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                value={currentInput}
                onChange={handleInputChange}
                placeholder={`Enter a ${selectedTemplate.inputs[currentStep].label.toLowerCase()}`}
                autoFocus
              />
              <button type="submit">Next</button>
            </form>
            
            <div className="suggestions">
              <p>Suggestions:</p>
              <div className="suggestion-buttons">
                {currentSuggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="suggestion-button"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="result-section">
            <h2>Your AI Hype Post</h2>
            <div className="madlib-result">
              {generateMadlib()}
            </div>
            <div className="action-buttons">
              <button onClick={copyToClipboard} className="copy-button">
                {copySuccess ? 'Copied!' : 'Copy to Clipboard'}
              </button>
              <button onClick={resetGame} className="reset-button">
                Create Another
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
