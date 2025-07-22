/**
 * AI Hype Madlib Template - Conversation
 */

const conversationTemplate = {
  id: 'ai-hype-conversation',
  name: 'AI Conversation',
  text: "Just had a {adjective} conversation with our AI about the future of {noun}. It predicted a {number}% increase in {noun2} by next quarter. The {adjective2} possibilities are endless!",
  inputs: [
    { id: 'adjective', label: 'Adjective' },
    { id: 'noun', label: 'Noun' },
    { id: 'number', label: 'Number' },
    { id: 'noun2', label: 'Another Noun' },
    { id: 'adjective2', label: 'Another Adjective' }
  ]
};

export default conversationTemplate;
