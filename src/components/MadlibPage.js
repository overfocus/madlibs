import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';

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
  
  // Get suggestions for a specific step
  const getSuggestionsForStep = useCallback((step) => {
    if (!selectedTemplate || !selectedTemplate.allSuggestions || step >= selectedTemplate.inputs.length) {
      return [];
    }
    
    return selectedTemplate.allSuggestions[step] || [];
  }, [selectedTemplate]);
  
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

  // Initialize the game with a random template and suggestions
  useEffect(() => {
    resetGame();
  }, [resetGame]); // Include resetGame in the dependency array

  // Update suggestions when the current step changes
  useEffect(() => {
    if (selectedTemplate) {
      const newSuggestions = getSuggestionsForStep(currentStep);
      setCurrentSuggestions(newSuggestions);
    }
  }, [currentStep, selectedTemplate, getSuggestionsForStep]); // Include getSuggestionsForStep in the dependency array

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
    return <div className="flex items-center justify-center h-screen text-xl font-semibold text-gray-600">Loading...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col" style={customStyles}>
      <header className="bg-dark-header text-white py-4 shadow-md">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">{title}</h1>
          <Link to={backLink} className="text-white hover:text-gray-200 transition-colors">{backLinkText}</Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 flex-grow">
        {!isComplete ? (
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl mx-auto">
            <h2 className="text-xl font-semibold mb-6 text-center">Fill in the blank ({currentStep + 1}/{selectedTemplate.inputs.length})</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-3">
                <label className="block text-gray-700 font-medium">{selectedTemplate.inputs[currentStep].label}:</label>
                {supportsImageSelection && selectedTemplate.inputs[currentStep].id === 'image' ? (
                  <div className="mt-3">
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                      {currentSuggestions.map((suggestion, index) => (
                        <div 
                          key={index}
                          className={`border-2 rounded-lg overflow-hidden cursor-pointer transition-all ${currentInput === suggestion ? 'border-primary ring-2 ring-primary' : 'border-gray-200 hover:border-gray-400'}`}
                          onClick={() => handleSuggestionClick(suggestion)}
                        >
                          <img src={suggestion} alt={`Option ${index + 1}`} className="w-full h-auto" />
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
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      autoFocus
                      required
                    />
                    <div className="mt-4">
                      <p className="font-semibold text-gray-800 mb-2">Suggestions:</p>
                      <div className="flex flex-wrap gap-2">
                        {currentSuggestions.map((suggestion, index) => (
                          <button 
                            key={index} 
                            type="button" 
                            className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-sm transition-colors"
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
              <button 
                type="submit" 
                className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                {currentStep === selectedTemplate.inputs.length - 1 ? 'Complete' : 'Next'}
              </button>
            </form>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl mx-auto">
            <h2 className="text-xl font-semibold mb-4">Your Madlib:</h2>
            {userInputs.image && supportsImageSelection && (
              <div className="mb-4 rounded-lg overflow-hidden border border-gray-200">
                <img src={userInputs.image} alt="Post illustration" className="w-full h-auto" />
              </div>
            )}
            <div className="bg-gray-50 p-4 rounded-md border-l-4 border-secondary mb-6" ref={resultRef}>
              {generateMadlib().split('\n').map((line, index) => (
                <p key={index} className="mb-2 last:mb-0">{line}</p>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={resetGame} 
                className="bg-secondary hover:bg-secondary-dark text-white font-bold py-2 px-6 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary"
              >
                Create Another
              </button>
              <button 
                onClick={copyToClipboard} 
                className="bg-accent hover:bg-accent-dark text-white font-bold py-2 px-6 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent"
              >
                {copySuccess ? 'Copied!' : 'Copy to Clipboard'}
              </button>
            </div>
          </div>
        )}
      </div>

      {footer && (
        <footer className="bg-gray-100 py-6 mt-8 text-center text-gray-600">
          {footer}
        </footer>
      )}
    </div>
  );
};

export default MadlibPage;
