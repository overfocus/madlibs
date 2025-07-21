import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import './BotsonMadlib.css';

// Word suggestion lists for different types of prompts
const suggestions = {
  noun: [
    'CV', 'resume', 'candidate', 'interview', 'office', 'recruitment', 'hiring', 'talent', 'career',
    'leadership', 'mentorship', 'hustle', 'grind', 'success', 'failure', 'opportunity', 'challenge',
    'business', 'strategy', 'tactics', 'networking', 'connection', 'influence', 'engagement', 'content'
  ],
  adjective: [
    'disruptive', 'innovative', 'cutting-edge', 'game-changing', 'transformative', 'strategic',
    'visionary', 'forward-thinking', 'dynamic', 'agile', 'resilient', 'tenacious', 'relentless',
    'unstoppable', 'fearless', 'bold', 'authentic', 'transparent', 'humble', 'grateful'
  ],
  verb: [
    'rejected', 'hired', 'fired', 'promoted', 'mentored', 'coached', 'trained', 'inspired',
    'motivated', 'challenged', 'pushed', 'tested', 'evaluated', 'assessed', 'measured',
    'transformed', 'disrupted', 'innovated', 'revolutionized', 'changed'
  ],
  location: [
    'Slough', 'Manchester', 'Birmingham', 'London', 'Liverpool', 'Glasgow', 'Edinburgh',
    'Cardiff', 'Bristol', 'Newcastle', 'Leeds', 'Sheffield', 'Nottingham', 'Oxford',
    'Cambridge', 'Brighton', 'Portsmouth', 'Southampton', 'Plymouth', 'Exeter'
  ],
  place: [
    'office', 'headquarters', 'cafe', 'restaurant', 'pub', 'park', 'street corner',
    'train station', 'bus stop', 'airport', 'hotel lobby', 'conference room',
    'coworking space', 'library', 'university', 'shopping center'
  ],
  danger: [
    'drug den', 'abandoned building', 'sketchy neighborhood', 'dark alley',
    'underground club', 'illegal gambling spot', 'black market', 'crime hotspot',
    'no-go zone', 'red-light district', 'gang territory', 'high-crime area'
  ],
  people: [
    'homeless people', 'drug dealers', 'gang members', 'criminals', 'troublemakers',
    'sketchy characters', 'addicts', 'thieves', 'scammers', 'con artists',
    'hustlers', 'street gangs', 'hooligans', 'delinquents', 'outlaws'
  ],
  group: [
    'crackheads', 'criminals', 'knife gangs', 'drug dealers', 'troublemakers',
    'gangsters', 'thugs', 'hooligans', 'delinquents', 'outlaws', 'misfits',
    'vagrants', 'lowlifes', 'ruffians', 'miscreants'
  ],
  lesson: [
    'creativity', 'innovation', 'disruption', 'persistence', 'resilience',
    'determination', 'focus', 'vision', 'strategy', 'execution',
    'leadership', 'influence', 'impact', 'legacy', 'success'
  ],
  image: [
    'https://placehold.co/600x400?text=Professional+Headshot',
    'https://placehold.co/600x400?text=Business+Meeting',
    'https://placehold.co/600x400?text=Office+Building',
    'https://placehold.co/600x400?text=Handshake',
    'https://placehold.co/600x400?text=Success+Graph',
    'https://placehold.co/600x400?text=Team+Building',
    'https://placehold.co/600x400?text=Award+Ceremony',
    'https://placehold.co/600x400?text=Networking+Event',
    'https://placehold.co/600x400?text=Business+Conference',
    'https://placehold.co/600x400?text=Leadership+Summit'
  ]
};

const BotsonMadlib = () => {
  // Define the template first
  const template = {
    text: `I {verb} a candidate's CV twice.

He applied for a third time so I invited him in for an interview.

→ At our {location} {place} ✔️

(We don't have a {location} {place})

Instead, I gave him the address of a well-known and extremely dangerous {danger} in the middle of {location}.

A place frequented day and night by:

→ {group1} 
→ {group2} 
→ {group3} 

That was the last time he sent me his CV.

The lesson?

When it comes to business, insanity is doing the same things over and over again and expecting different results.

→ You've got to get {lesson} ✔️

Also, if you waste my time, expect the favour to be returned in full.

I trust you agree?

---------------

♻️ Repost if you found this useful 
🔥 Follow me for more boastwriting tips 

#LowQualityContent 
#DigitalGonad 
#Boastwriter`,
    inputs: [
      { id: 'image', label: 'Select an Image' },
      { id: 'verb', label: 'Past Tense Verb (e.g., rejected)' },
      { id: 'location', label: 'Location (e.g., Slough)' },
      { id: 'place', label: 'Place (e.g., office)' },
      { id: 'danger', label: 'Dangerous Place (e.g., drug den)' },
      { id: 'group1', label: 'Group of People 1 (e.g., Homeless crackheads)' },
      { id: 'group2', label: 'Group of People 2 (e.g., Dangerous criminals)' },
      { id: 'group3', label: 'Group of People 3 (e.g., Knife gangs)' },
      { id: 'lesson', label: 'Business Lesson (e.g., creative)' }
    ]
  };
  
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
  
  // Generate and store all suggestions for each step at initialization
  const [allSuggestions, setAllSuggestions] = useState(() => {
    const suggestionsByStep = {};
    template.inputs.forEach((input, index) => {
      let suggestionType = 'noun';
      const currentLabel = input.label.toLowerCase();
      
      if (currentLabel.includes('image')) {
        suggestionType = 'image';
      } else if (currentLabel.includes('adjective')) {
        suggestionType = 'adjective';
      } else if (currentLabel.includes('verb')) {
        suggestionType = 'verb';
      } else if (currentLabel.includes('location')) {
        suggestionType = 'location';
      } else if (currentLabel.includes('place')) {
        suggestionType = 'place';
      } else if (currentLabel.includes('danger')) {
        suggestionType = 'danger';
      } else if (currentLabel.includes('group')) {
        suggestionType = 'group';
      } else if (currentLabel.includes('lesson')) {
        suggestionType = 'lesson';
      } else if (currentLabel.includes('people')) {
        suggestionType = 'people';
      }
      
      const suggestionList = suggestions[suggestionType] || suggestions.noun;
      suggestionsByStep[index] = [...suggestionList]
        .sort(() => 0.5 - Math.random())
        .slice(0, 3);
    });
    return suggestionsByStep;
  });
  // State to track copy to clipboard success
  const [copySuccess, setCopySuccess] = useState(false);

  // Get suggestions for a specific step
  const getSuggestionsForStep = (step) => {
    return allSuggestions[step] || [];
  };

  // Handle input change
  const handleInputChange = (e) => {
    setCurrentInput(e.target.value);
  };
  
  // Handle suggestion click
  const handleSuggestionClick = (suggestion) => {
    setCurrentInput(suggestion);
  };
  
  // Update suggestions when current step changes
  useEffect(() => {
    if (!isComplete) {
      setCurrentSuggestions(getSuggestionsForStep(currentStep));
    }
  }, [currentStep, isComplete, allSuggestions]);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const currentInputField = template.inputs[currentStep];
    setUserInputs({
      ...userInputs,
      [currentInputField.id]: currentInput
    });
    setCurrentInput('');
    if (currentStep < template.inputs.length - 1) {
      setCurrentStep(currentStep + 1);
      // New suggestions will be generated via useEffect when currentStep changes
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
    setCopySuccess(false);
  };
  
  // Function to replace placeholders with user inputs
  const generateMadlib = () => {
    let result = template.text;
    Object.keys(userInputs).forEach(key => {
      result = result.replace(`{${key}}`, userInputs[key]);
    });
    return result;
  };
  
  // Function to copy generated madlib to clipboard
  const copyToClipboard = () => {
    const text = generateMadlib();
    navigator.clipboard.writeText(text)
      .then(() => {
        setCopySuccess(true);
        // Reset the success message after 2 seconds
        setTimeout(() => {
          setCopySuccess(false);
        }, 2000);
      })
      .catch(err => {
        console.error('Failed to copy text: ', err);
      });
  };

  // Function to go back to the main page
  const goToMainPage = () => {
    window.location.href = '/';
  };

  return (
    <div className="app-container">
      <header>
        <h1>Stephen Botson: LinkedIn Digital Gonad</h1>
        <p className="subtitle">Create your own boastful LinkedIn post that nobody asked for!</p>
        <div className="nav-links">
          <Link to="/" className="home-link">← Back to Home</Link>
        </div>
      </header>

      <div className="content">
        {!isComplete ? (
          <div className="input-section">
            <h2>Fill in the blank ({currentStep + 1}/{template.inputs.length})</h2>
            <form onSubmit={handleSubmit}>
              <div className="input-group">
                <label>{template.inputs[currentStep].label}:</label>
                {template.inputs[currentStep].id === 'image' ? (
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
                {currentStep === template.inputs.length - 1 ? 'Complete' : 'Next'}
              </button>
            </form>
          </div>
        ) : (
          <div className="result-section">
            <h2>Your LinkedIn Boast Post</h2>
            {userInputs.image && (
              <div className="post-image">
                <img src={userInputs.image} alt="Post illustration" />
              </div>
            )}
            <div className="madlib-result">
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
