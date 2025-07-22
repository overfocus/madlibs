/**
 * AI Hype Madlib Template - Announcement
 */

const announcementTemplate = {
  id: 'ai-hype-announcement',
  name: 'AI Platform Announcement',
  text: "I'm thrilled to announce our new {adjective} AI platform that has {verb} the industry by storm! We've seen {number}x improvement in {noun} and our clients can't stop {verb2} about the results.",
  inputs: [
    { id: 'adjective', label: 'Adjective' },
    { id: 'verb', label: 'Past Tense Verb' },
    { id: 'number', label: 'Number' },
    { id: 'noun', label: 'Noun' },
    { id: 'verb2', label: 'Present Tense Verb ending in -ing' }
  ]
};

export default announcementTemplate;
