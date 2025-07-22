/**
 * AI Hype Madlib Template - Accuracy
 */

const accuracyTemplate = {
  id: 'ai-hype-accuracy',
  name: 'AI Accuracy',
  text: "I'm {adjective} to share that our AI has achieved {number}% accuracy in {noun} prediction, making {noun2} obsolete in just {number2} months!",
  inputs: [
    { id: 'adjective', label: 'Adjective (e.g., excited, proud)' },
    { id: 'number', label: 'Number' },
    { id: 'noun', label: 'Noun' },
    { id: 'noun2', label: 'Another Noun' },
    { id: 'number2', label: 'Another Number' }
  ]
};

export default accuracyTemplate;
