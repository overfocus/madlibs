import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import './BotsonMadlib.css';

// Word suggestion lists for different types of prompts
const suggestions = {
  noun: [
    'productivity', 'synergy', 'disruption', 'innovation', 'paradigm',
    'blockchain', 'algorithm', 'strategy', 'mindset', 'ecosystem',
    'transformation', 'leadership', 'engagement', 'optimization', 'scalability',
    'purpose', 'meaning', 'fulfillment', 'passion', 'inspiration'
  ],
  verb: [
    'reject', 'ignore', 'delete', 'trash', 'dismiss',
    'discard', 'decline', 'refuse', 'deny', 'block',
    'ban', 'blacklist', 'ghost', 'shun', 'avoid',
    'help', 'inspire', 'empower', 'motivate', 'transform'
  ],
  adjective: [
    'disruptive', 'innovative', 'game-changing', 'cutting-edge', 'revolutionary',
    'transformative', 'next-gen', 'state-of-the-art', 'groundbreaking', 'visionary',
    'paradigm-shifting', 'forward-thinking', 'bleeding-edge', 'trailblazing', 'pioneering'
  ],
  location: [
    'London', 'Manchester', 'Birmingham', 'Leeds', 'Glasgow',
    'Edinburgh', 'Liverpool', 'Bristol', 'Sheffield', 'Newcastle',
    'Belfast', 'Cardiff', 'Nottingham', 'Southampton', 'Oxford'
  ],
  place: [
    'office', 'headquarters', 'campus', 'innovation hub', 'tech center',
    'coworking space', 'incubator', 'accelerator', 'think tank', 'lab',
    'studio', 'garage', 'loft', 'warehouse', 'penthouse'
  ],
  danger: [
    'drug den', 'crack house', 'red light district', 'slum', 'ghetto',
    'crime hotspot', 'gang territory', 'no-go zone', 'skid row', 'shantytown',
    'abandoned warehouse', 'dark alley', 'underground club', 'black market', 'prison yard'
  ],
  group: [
    'homeless crackheads', 'dangerous criminals', 'knife gangs', 'drug dealers', 'violent thugs',
    'career criminals', 'hardened convicts', 'street gangs', 'armed robbers', 'escaped convicts',
    'cartel members', 'mob enforcers', 'prison escapees', 'illegal immigrants', 'human traffickers'
  ],
  lesson: [
    'creative', 'innovative', 'strategic', 'tactical', 'ruthless',
    'disruptive', 'aggressive', 'proactive', 'assertive', 'bold',
    'cunning', 'shrewd', 'calculating', 'methodical', 'relentless'
  ],
  people: [
    'millennials', 'Gen Z', 'entrepreneurs', 'startups', 'freelancers',
    'digital nomads', 'influencers', 'thought leaders', 'visionaries', 'changemakers',
    'innovators', 'disruptors', 'early adopters', 'content creators', 'solopreneurs',
    'lost souls', 'struggling professionals', 'aspiring leaders', 'young executives', 'career changers'
  ],
  number: [
    '42', '69', '100', '110', '150',
    '200', '500', '1000', '10000', '1000000',
    '42069', '80085', '31337', '9000+', '∞'
  ],
  image: [
    'a.jpeg',
    'b.jpeg',
    'c.jpeg',
    'd.jpeg',
    'e.jpeg',
    'f.jpeg',
    'g.jpeg',
    'h.jpeg',
    'i.jpeg',
  ],
  thing: [
    'Fame', 'Adulation', 'Inappropriate nudes', 'Recognition', 'Awards',
    'Accolades', 'Followers', 'Likes', 'Comments', 'Shares',
    'Retweets', 'Viral posts', 'Media attention', 'Public praise', 'Admiration'
  ],
  technology: [
    'AI', 'Machine Learning', 'Blockchain', 'Neural Networks', 'Deep Learning',
    'Quantum Computing', 'Virtual Reality', 'Augmented Reality', 'IoT', 'Cloud Computing',
    'Big Data', 'Robotics', 'Nanotechnology', 'Biotechnology', 'Web3'
  ],
  trait: [
    'Arrogant', 'Egotistical', 'Condescending', 'Pretentious', 'Self-absorbed',
    'Narcissistic', 'Pompous', 'Conceited', 'Smug', 'Patronizing',
    'Sanctimonious', 'Holier-than-thou', 'Preachy', 'Insufferable', 'Obnoxious'
  ],
  emotion: [
    'repressed anger', 'deep insecurity', 'hidden jealousy', 'unresolved trauma', 'personal frustration',
    'childhood issues', 'professional inadequacy', 'social anxiety', 'imposter syndrome', 'midlife crisis',
    'fear of failure', 'need for validation', 'desperate attention-seeking', 'fragile ego', 'toxic masculinity'
  ],
  conflict: [
    'inner conflict', 'identity crisis', 'personal demons', 'psychological baggage', 'emotional damage',
    'past trauma', 'daddy issues', 'mommy issues', 'abandonment issues', 'trust issues',
    'relationship problems', 'career disappointments', 'unfulfilled ambitions', 'existential dread', 'spiritual emptiness'
  ],
  response: [
    'Thank you', 'I appreciate you', 'You get me', 'Spot on', "You're absolutely right",
    "I'm flattered", 'How perceptive', 'Finally someone understands', 'You see the real me', "I'm touched",
    "I'm honored", "You're so insightful", "You've made my day", "I couldn't agree more", "You're a genius"
  ],
  feeling: [
    'seen', 'validated', 'understood', 'appreciated', 'recognized',
    'acknowledged', 'accepted', 'respected', 'valued', 'celebrated',
    'embraced', 'cherished', 'admired', 'honored', 'adored'
  ],
  reaction: [
    'Accepted the decision', 'Asked for feedback', 'Kept in touch', 'Wished them well', 'Stayed professional',
    'Remained gracious', 'Sent a thank you note', 'Offered to help', 'Maintained contact', 'Showed maturity',
    'Respected their choice', 'Handled it with class', 'Took the high road', 'Showed no hard feelings', 'Stayed positive'
  ],
  pettyResponse: [
    'Laughed in his face', 'Played the world\'s smallest violin', 'Told him he should have made better decisions',
    'Made him beg', 'Doubled the salary requirement', 'Reminded him of his mistake', 'Made him start from scratch',
    'Forwarded his email to the whole team', 'Posted screenshots on LinkedIn', 'Sent a passive-aggressive reply',
    'Left him on read', 'Told him the position was filled', 'Made him interview again', 'Tripled the workload', 'Added weekend shifts'
  ]
};

const BotsonMadlib = () => {
  // Define the templates
  const templates = [
    {
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
    },
    {
      text: `When I'm hunched over my laptop late at night.

Knocking out yet another powerful thought leadership piece, for my followers on LinkedIn.

There's one thing that keeps me going.

It's not the:

→ {thing1}
→ {thing2} 
→ {thing3} 

Nor is it the:

→ {thing4} 
→ {thing5} 
→ {thing6}

Those are just nice to have ✔️

So why keep posting?

It's because of the many thousands of messages of thanks I'm sent, from {people} who were struggling before they found me, and now have {noun} in their lives again.

That's what drives me to keep selflessly showing up, daily on this platform.

→ I just want to {verb} people ✔️

Next up, I plan to create a perfect digital clone of myself, using {technology}.

This will allow me to help thousands more people than I am currently able to, restrained as I am, by the limits of physical form.

I trust you agree?

---------------

♻️ Repost if you found this useful 
🔥 Follow me for more boastwriting tips 

#LowQualityContent 
#DigitalGonad 
#Boastwriter`,
      inputs: [
        { id: 'image', label: 'Select an Image' },
        { id: 'thing1', label: 'Desirable Thing 1 (e.g., Fame)' },
        { id: 'thing2', label: 'Desirable Thing 2 (e.g., Adulation)' },
        { id: 'thing3', label: 'Desirable Thing 3 (e.g., Inappropriate nudes)' },
        { id: 'thing4', label: 'Desirable Thing 4 (e.g., Celebrity friends)' },
        { id: 'thing5', label: 'Desirable Thing 5 (e.g., Commercial opportunities)' },
        { id: 'thing6', label: 'Desirable Thing 6 (e.g., Sponsorship deals)' },
        { id: 'people', label: 'Type of People (e.g., lost souls)' },
        { id: 'noun', label: 'Positive Noun (e.g., meaning)' },
        { id: 'verb', label: 'Helpful Verb (e.g., help)' },
        { id: 'technology', label: 'Technology (e.g., AI)' }
      ]
    },
    {
      text: `I've recently discovered that not everyone is a fan of my content on LinkedIn.

Some men find me:

→ {trait1}
→ {trait2} 
→ {trait3} 

They think my content is driven by {emotion} and unresolved {conflict}.

To those guys, I have just one thing to say.

→ {response} ✔️

I feel {feeling} and {feeling2} 🥰

For the first time in my LinkedIn journey, people have taken the time to understand the real me, beneath my Digital Gonad persona.

The lesson?

→ {lesson} ✔️

I trust you agree?

---------------

♻️ Repost if you found this useful 
🔥 Follow me for more boastwriting tips 

#LowQualityContent 
#DigitalGonad 
#Boastwriter`,
      inputs: [
        { id: 'image', label: 'Select an Image' },
        { id: 'trait1', label: 'Negative Trait 1 (e.g., Arrogant)' },
        { id: 'trait2', label: 'Negative Trait 2 (e.g., Egotistical)' },
        { id: 'trait3', label: 'Negative Trait 3 (e.g., Condescending)' },
        { id: 'emotion', label: 'Negative Emotion (e.g., repressed anger)' },
        { id: 'conflict', label: 'Personal Issue (e.g., inner conflict)' },
        { id: 'response', label: 'Response (e.g., Thank you)' },
        { id: 'feeling', label: 'Positive Feeling 1 (e.g., seen)' },
        { id: 'feeling2', label: 'Positive Feeling 2 (e.g., validated)' },
        { id: 'lesson', label: 'Life Lesson (e.g., Never judge a book by the cover)' }
      ]
    },
    {
      text: `A candidate rejected my offer. 

He had another opportunity and made his choice. 

I took it extremely well. 

→ {reaction1} 
→ {reaction2} 
→ {reaction3} 

And followed his progress from afar, on LinkedIn. 

A few months later, the role wasn't working out. 

He reached out to me and asked if a position was still available. 

My response? 

→ {response1} 
→ {response2}
→ {response3} 

None of which would have been possible if I hadn't kept lines of communication open.

The lesson? 

→ {lesson} ✔️

You never know when an opportunity may present itself.

What's the agree/disagree ratio on this one? 

---------------

♻️ Repost if you found this useful 
🔥 Follow me for more boastwriting tips 

#LowQualityContent 
#DigitalGonad 
#Boastwriter`,
      inputs: [
        { id: 'image', label: 'Select an Image' },
        { id: 'reaction1', label: 'Positive Reaction 1 (e.g., Accepted the decision)' },
        { id: 'reaction2', label: 'Positive Reaction 2 (e.g., Asked for feedback)' },
        { id: 'reaction3', label: 'Positive Reaction 3 (e.g., Kept in touch)' },
        { id: 'response1', label: 'Petty Response 1 (e.g., Laughed in his face)' },
        { id: 'response2', label: 'Petty Response 2 (e.g., Played the world\'s smallest violin)' },
        { id: 'response3', label: 'Petty Response 3 (e.g., Told him he should have made better decisions)' },
        { id: 'lesson', label: 'Business Lesson (e.g., Don\'t burn your bridges)' }
      ]
    }
  ];
  
  // Randomly select a template
  const [selectedTemplate, setSelectedTemplate] = useState(() => {
    const randomIndex = Math.floor(Math.random() * templates.length);
    return templates[randomIndex];
  });
  
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
    selectedTemplate.inputs.forEach((input, index) => {
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
        .slice(0, 6);
    });
    return suggestionsByStep;
  });
  // State to track copy to clipboard success
  const [copySuccess, setCopySuccess] = useState(false);

  // Get suggestions for a specific step
  const getSuggestionsForStep = (step) => {
    return allSuggestions[step] || [];
  };
  
  // Function to get a new random template
  const getNewRandomTemplate = () => {
    const randomIndex = Math.floor(Math.random() * templates.length);
    return templates[randomIndex];
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
    const currentInputField = selectedTemplate.inputs[currentStep];
    setUserInputs({
      ...userInputs,
      [currentInputField.id]: currentInput
    });
    setCurrentInput('');
    if (currentStep < selectedTemplate.inputs.length - 1) {
      setCurrentStep(currentStep + 1);
      // New suggestions will be generated via useEffect when currentStep changes
    } else {
      setIsComplete(true);
    }
  };

  // Function to reset the game
  const resetGame = () => {
    // Select a new random template
    const newTemplate = getNewRandomTemplate();
    setSelectedTemplate(newTemplate);
    
    // Reset all state
    setCurrentStep(0);
    setUserInputs({});
    setCurrentInput('');
    setIsComplete(false);
    setCopySuccess(false);
    
    // Regenerate suggestions for the new template
    const suggestionsByStep = {};
    newTemplate.inputs.forEach((input, index) => {
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
      } else if (currentLabel.includes('technology')) {
        suggestionType = 'technology';
      } else if (currentLabel.includes('thing')) {
        suggestionType = 'thing';
      } else if (currentLabel.includes('trait')) {
        suggestionType = 'trait';
      } else if (currentLabel.includes('emotion')) {
        suggestionType = 'emotion';
      } else if (currentLabel.includes('conflict')) {
        suggestionType = 'conflict';
      } else if (currentLabel.includes('response')) {
        suggestionType = 'response';
      } else if (currentLabel.includes('feeling')) {
        suggestionType = 'feeling';
      }
      
      const suggestionList = suggestions[suggestionType] || suggestions.noun;
      suggestionsByStep[index] = [...suggestionList]
        .sort(() => 0.5 - Math.random())
        .slice(0, 6);
    });
    
    setAllSuggestions(suggestionsByStep);
  };
  
  // Function to replace placeholders with user inputs
  const generateMadlib = () => {
    let result = selectedTemplate.text;
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
