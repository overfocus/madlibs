import React, { useState } from 'react';
import './App.css';

const App = () => {
  // State to track the current step in the madlib process
  const [currentStep, setCurrentStep] = useState(0);
  // State to store user inputs
  const [userInputs, setUserInputs] = useState({});
  // State to track the current input being collected
  const [currentInput, setCurrentInput] = useState('');
  // State to track if the madlib is complete
  const [isComplete, setIsComplete] = useState(false);

  // Collection of AI hype templates
  const templates = [
    {
      text: "Our AI reduces {noun} by exactly {number}%, increases {noun2} by {number2}x, and eliminates the need for {noun3} entirely.",
      inputs: [
        { id: 'noun', label: 'Noun' },
        { id: 'number', label: 'Number' },
        { id: 'noun2', label: 'Another Noun' },
        { id: 'number2', label: 'Another Number' },
        { id: 'noun3', label: 'One More Noun' }
      ]
    },
    {
      text: "I'm thrilled to announce our new {adjective} AI platform that has {verb} the industry by storm! We've seen {number}x improvement in {noun} and our clients can't stop {verb2} about the results.",
      inputs: [
        { id: 'adjective', label: 'Adjective' },
        { id: 'verb', label: 'Past Tense Verb' },
        { id: 'number', label: 'Number' },
        { id: 'noun', label: 'Noun' },
        { id: 'verb2', label: 'Present Tense Verb ending in -ing' }
      ]
    },
    {
      text: "Just had a {adjective} conversation with our AI about the future of {noun}. It predicted a {number}% increase in {noun2} by next quarter. The {adjective2} possibilities are endless!",
      inputs: [
        { id: 'adjective', label: 'Adjective' },
        { id: 'noun', label: 'Noun' },
        { id: 'number', label: 'Number' },
        { id: 'noun2', label: 'Another Noun' },
        { id: 'adjective2', label: 'Another Adjective' }
      ]
    }
  ];

  // Randomly select a template when the component loads
  const [selectedTemplate] = useState(() => {
    const randomIndex = Math.floor(Math.random() * templates.length);
    return templates[randomIndex];
  });

  // Handle input change
  const handleInputChange = (e) => {
    setCurrentInput(e.target.value);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Get the current input field
    const currentInputField = selectedTemplate.inputs[currentStep];
    
    // Update userInputs with the current input
    setUserInputs({
      ...userInputs,
      [currentInputField.id]: currentInput
    });
    
    // Clear the current input
    setCurrentInput('');
    
    // Move to the next step or complete the madlib
    if (currentStep < selectedTemplate.inputs.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsComplete(true);
    }
  };

  // Function to reset the game
  const resetGame = () => {
    setCurrentStep(0);
    setUserInputs({});
    setCurrentInput('');
    setIsComplete(false);
    // Refresh the page to get a new random template
    window.location.reload();
  };

  // Function to replace placeholders with user inputs
  const generateMadlib = () => {
    let result = selectedTemplate.text;
    
    // Replace each placeholder with its corresponding user input
    Object.keys(userInputs).forEach(key => {
      result = result.replace(`{${key}}`, userInputs[key]);
    });
    
    return result;
  };

  return (
    <div className="app-container">
      <header>
        <h1>AI Hype Madlibs</h1>
        <p className="subtitle">Become a 500000000x LinkedIn influencer in 1/1000000000th of the time!</p>
      </header>

      <div className="content">
        {!isComplete ? (
          <div className="input-section">
            <h2>Fill in the blank ({currentStep + 1}/{selectedTemplate.inputs.length})</h2>
            <form onSubmit={handleSubmit}>
              <div className="input-group">
                <label>{selectedTemplate.inputs[currentStep].label}:</label>
                <input
                  type="text"
                  value={currentInput}
                  onChange={handleInputChange}
                  autoFocus
                  required
                />
              </div>
              <button type="submit" className="submit-btn">
                {currentStep === selectedTemplate.inputs.length - 1 ? 'Complete' : 'Next'}
              </button>
            </form>
          </div>
        ) : (
          <div className="result-section">
            <h2>Your AI Hype Post</h2>
            <div className="madlib-result">
              {generateMadlib()}
            </div>
            <button onClick={resetGame} className="reset-btn">
              Create Another Post
            </button>
          </div>
        )}
      </div>

      <footer>
        <p>© {new Date().getFullYear()} AI Hype Madlibs - Exposing LinkedIn AI Influencer Culture One Post at a Time</p>
      </footer>
    </div>
  );
};

export default App;
