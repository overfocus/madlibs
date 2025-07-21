import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './App.css';

// Word suggestion lists for different types of prompts
const suggestions = {
  noun: [
    'productivity', 'efficiency', 'workflow', 'ROI', 'synergy', 'disruption', 'innovation', 'transformation', 
    'paradigm', 'algorithm', 'pipeline', 'ecosystem', 'framework', 'solution', 'platform', 'interface',
    'neural network', 'machine learning', 'data', 'analytics', 'insights', 'KPIs', 'metrics', 'benchmark',
    'scalability', 'optimization', 'throughput', 'bandwidth', 'latency', 'bottleneck', 'overhead', 'cloud'
  ],
  adjective: [
    'groundbreaking', 'revolutionary', 'disruptive', 'innovative', 'cutting-edge', 'state-of-the-art', 
    'next-generation', 'game-changing', 'transformative', 'paradigm-shifting', 'bleeding-edge', 'future-proof',
    'seamless', 'frictionless', 'intuitive', 'robust', 'scalable', 'enterprise-grade', 'mission-critical',
    'hyper-efficient', 'ultra-optimized', 'quantum-level', 'unprecedented', 'unparalleled', 'extraordinary'
  ],
  verb: [
    'revolutionized', 'disrupted', 'transformed', 'optimized', 'streamlined', 'accelerated', 'amplified', 
    'leveraged', 'engineered', 'architected', 'pioneered', 'spearheaded', 'orchestrated', 'implemented',
    'deployed', 'scaled', 'iterated', 'innovated', 'enhanced', 'elevated', 'maximized', 'unlocked',
    'unleashed', 'catalyzed', 'empowered', 'enabled', 'expedited', 'facilitated', 'generated', 'harnessed'
  ],
  number: [
    '10', '42', '100', '250', '500', '1000', '10000', '1000000', '1000000000', '99.9', '150', '200', '300',
    '3', '5', '7', '12', '15', '20', '25', '30', '50', '75', '90', '99', '110', '125', '200', '400', '750'
  ]
};

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
  },
  {
    text: "Breaking: Our {adjective} AI just {verb} all previous benchmarks by {number}x! This is a {adjective2} breakthrough for {noun} as we know it.",
    inputs: [
      { id: 'adjective', label: 'Adjective' },
      { id: 'verb', label: 'Past Tense Verb' },
      { id: 'number', label: 'Number' },
      { id: 'adjective2', label: 'Another Adjective' },
      { id: 'noun', label: 'Noun' }
    ]
  },
  {
    text: "I'm {adjective} to share that our AI has achieved {number}% accuracy in {noun} prediction, making {noun2} obsolete in just {number2} months!",
    inputs: [
      { id: 'adjective', label: 'Adjective (e.g., excited, proud)' },
      { id: 'number', label: 'Number' },
      { id: 'noun', label: 'Noun' },
      { id: 'noun2', label: 'Another Noun' },
      { id: 'number2', label: 'Another Number' }
    ]
  }
];

const App = () => {
  // Initialize with a random template first
  const initialTemplate = templates[Math.floor(Math.random() * templates.length)];
  
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
    const suggestionsByStep = {};
    initialTemplate.inputs.forEach((input, index) => {
      let suggestionType = 'noun';
      const currentLabel = input.label.toLowerCase();
      
      if (currentLabel.includes('adjective')) {
        suggestionType = 'adjective';
      } else if (currentLabel.includes('verb')) {
        suggestionType = 'verb';
      } else if (currentLabel.includes('number')) {
        suggestionType = 'number';
      } else if (currentLabel.includes('noun')) {
        suggestionType = 'noun';
      }
      
      const suggestionList = suggestions[suggestionType] || suggestions.noun;
      suggestionsByStep[index] = [...suggestionList]
        .sort(() => 0.5 - Math.random())
        .slice(0, 3);
    });
    return suggestionsByStep;
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
    const newTemplate = templates[Math.floor(Math.random() * templates.length)];
    setSelectedTemplate(newTemplate);
    setCurrentStep(0);
    setUserInputs({});
    setCurrentInput('');
    setIsComplete(false);
    setCopySuccess(false);
    
    // Create new suggestions for the new template
    const suggestionsByStep = {};
    newTemplate.inputs.forEach((input, index) => {
      let suggestionType = 'noun';
      const currentLabel = input.label.toLowerCase();
      
      if (currentLabel.includes('adjective')) {
        suggestionType = 'adjective';
      } else if (currentLabel.includes('verb')) {
        suggestionType = 'verb';
      } else if (currentLabel.includes('number')) {
        suggestionType = 'number';
      } else if (currentLabel.includes('noun')) {
        suggestionType = 'noun';
      }
      
      const suggestionList = suggestions[suggestionType] || suggestions.noun;
      suggestionsByStep[index] = [...suggestionList]
        .sort(() => 0.5 - Math.random())
        .slice(0, 3);
    });
    
    setAllSuggestions(suggestionsByStep);
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
};

export default App;
