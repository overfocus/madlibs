/**
 * AI Hype Madlib Template - Reduction
 */

const reductionTemplate = {
  id: 'ai-hype-reduction',
  name: 'AI Reduction Claims',
  text: "Our AI reduces {noun} by exactly {number}%, increases {noun2} by {number2}x, and eliminates the need for {noun3} entirely.",
  inputs: [
    { id: 'noun', label: 'Noun' },
    { id: 'number', label: 'Number' },
    { id: 'noun2', label: 'Another Noun' },
    { id: 'number2', label: 'Another Number' },
    { id: 'noun3', label: 'One More Noun' }
  ]
};

export default reductionTemplate;
