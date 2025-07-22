/**
 * AI Hype Madlib Template - Benchmark
 */

const benchmarkTemplate = {
  id: 'ai-hype-benchmark',
  name: 'AI Benchmark',
  text: "Breaking: Our {adjective} AI just {verb} all previous benchmarks by {number}x! This is a {adjective2} breakthrough for {noun} as we know it.",
  inputs: [
    { id: 'adjective', label: 'Adjective' },
    { id: 'verb', label: 'Past Tense Verb' },
    { id: 'number', label: 'Number' },
    { id: 'adjective2', label: 'Another Adjective' },
    { id: 'noun', label: 'Noun' }
  ]
};

export default benchmarkTemplate;
