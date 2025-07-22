import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import '../styles/MadlibPage.css';

// Import utilities
import { generateSuggestionsForTemplate } from '../utils/suggestionHelper';

/**
 * Generic MadlibPage component that can be used for any madlib page
 * 
 * @param {Object} props
 * @param {Array} props.templates - Array of templates for this madlib page
 * @param {string} props.title - Title of the madlib page
 * @param {string} props.backLink - URL to go back to (usually home page)
 * @param {string} props.backLinkText - Text for the back link
 * @param {Object} props.customStyles - Custom styles for this madlib page
 * @param {React.Component} props.footer - Custom footer component
 * @param {boolean} props.supportsImageSelection - Whether this madlib page supports image selection
 * @returns {React.Component}
 */
const MadlibPage = ({
  templates,
  title,
  backLink = '/',
  backLinkText = 'Back to Home',
  customStyles = {},
  footer,
  supportsImageSelection = false
}) => {
  // State variables
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [userInputs, setUserInputs] = useState({});
  const [currentInput, setCurrentInput] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [currentSuggestions, setCurrentSuggestions] = useState([]);
  const resultRef = useRef(null);

  // Function to get a new random template
  const getNewRandomTemplate = useCallback(() => {
    const randomIndex = Math.floor(Math.random() * templates.length);
    return templates[randomIndex];
  }, [templates]);

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
    if (!selectedTemplate || !selectedTemplate.allSuggestions || step >= selectedTemplate.inputs.length) {
      return [];
    }
    
    return selectedTemplate.allSuggestions[step] || [];
  }, [selectedTemplate]);

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
    
    // For non-image inputs, require non-empty input
    if (selectedTemplate.inputs[currentStep].id !== 'image' && currentInput.trim() === '') {
      return;
    }
    
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
    
    // Generate suggestions for all steps
    const templateWithSuggestions = {
      ...newTemplate,
      allSuggestions: generateSuggestionsForTemplate(newTemplate, 12)
    };
    
    setSelectedTemplate(templateWithSuggestions);
    setCurrentStep(0);
    setUserInputs({});
    setCurrentInput('');
    setIsComplete(false);
    setCopySuccess(false);
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

  // If no template is selected yet, show loading
  if (!selectedTemplate) {
    return <div className="madlib-page loading">Loading...</div>;
  }

  return (
    <div className="madlib-page" style={customStyles}>
      <header className="madlib-header">
        <div className="header-content">
          <h1>{title}</h1>
          <Link to={backLink} className="back-link">{backLinkText}</Link>
        </div>
      </header>

      <div className="madlib-content">
        {!isComplete ? (
          <div className="input-section">
            <h2>Fill in the blank ({currentStep + 1}/{selectedTemplate.inputs.length})</h2>
            <form onSubmit={handleSubmit}>
              <div className="input-group">
                <label>{selectedTemplate.inputs[currentStep].label}:</label>
                {supportsImageSelection && selectedTemplate.inputs[currentStep].id === 'image' ? (
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
                      placeholder={`Enter a ${selectedTemplate.inputs[currentStep].label.toLowerCase()}`}
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
            <h2>Your Madlib:</h2>
            {userInputs.image && supportsImageSelection && (
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
                Create Another
              </button>
              <button onClick={copyToClipboard} className="copy-btn">
                {copySuccess ? 'Copied!' : 'Copy to Clipboard'}
              </button>
            </div>
          </div>
        )}
      </div>

      {footer && (
        <footer className="madlib-footer">
          {footer}
        </footer>
      )}
    </div>
  );
};

export default MadlibPage;
