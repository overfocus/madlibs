import React, { useState, useEffect } from 'react';
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

const App = () => {
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
  // State to track copy to clipboard success
  const [copySuccess, setCopySuccess] = useState(false);

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
    },
    {
      text: "The future is here! Our {adjective} AI can now {verb} your {noun} in just {number} seconds, saving you {number2} hours of {noun2} every month.",
      inputs: [
        { id: 'adjective', label: 'Adjective' },
        { id: 'verb', label: 'Verb' },
        { id: 'noun', label: 'Noun' },
        { id: 'number', label: 'Number' },
        { id: 'number2', label: 'Another Number' },
        { id: 'noun2', label: 'Another Noun' }
      ]
    },
    {
      text: "After {number} years of research, we've created an AI that {verb} {number2}x faster than humans, making {noun} more {adjective} than ever before!",
      inputs: [
        { id: 'number', label: 'Number' },
        { id: 'verb', label: 'Verb (present tense)' },
        { id: 'number2', label: 'Another Number' },
        { id: 'noun', label: 'Noun' },
        { id: 'adjective', label: 'Adjective' }
      ]
    },
    {
      text: "Proud to announce our AI has {verb} the impossible! It now {verb2} {noun} with {number}% more {noun2} while using {number2}% less {noun3}.",
      inputs: [
        { id: 'verb', label: 'Past Tense Verb' },
        { id: 'verb2', label: 'Present Tense Verb' },
        { id: 'noun', label: 'Noun' },
        { id: 'number', label: 'Number' },
        { id: 'noun2', label: 'Another Noun' },
        { id: 'number2', label: 'Another Number' },
        { id: 'noun3', label: 'One More Noun' }
      ]
    },
    {
      text: "Our {adjective} AI doesn't just {verb} {noun} — it {verb2} the entire {noun2} paradigm by {number}x! This is truly a {adjective2} moment for our industry.",
      inputs: [
        { id: 'adjective', label: 'Adjective' },
        { id: 'verb', label: 'Verb' },
        { id: 'noun', label: 'Noun' },
        { id: 'verb2', label: 'Another Verb' },
        { id: 'noun2', label: 'Another Noun' },
        { id: 'number', label: 'Number' },
        { id: 'adjective2', label: 'Another Adjective' }
      ]
    },
    {
      text: "Just witnessed our AI {verb} a {adjective} {noun} in only {number} milliseconds! The {noun2} industry will never be the same again.",
      inputs: [
        { id: 'verb', label: 'Verb' },
        { id: 'adjective', label: 'Adjective' },
        { id: 'noun', label: 'Noun' },
        { id: 'number', label: 'Number' },
        { id: 'noun2', label: 'Another Noun (industry type)' }
      ]
    },
    {
      text: "Humbled to share that our {adjective} AI solution has been {verb} by {number} {noun} leaders, resulting in {number2}x more {noun2} for their businesses!",
      inputs: [
        { id: 'adjective', label: 'Adjective' },
        { id: 'verb', label: 'Past Participle Verb (e.g., adopted)' },
        { id: 'number', label: 'Number' },
        { id: 'noun', label: 'Noun (industry type)' },
        { id: 'number2', label: 'Another Number' },
        { id: 'noun2', label: 'Another Noun' }
      ]
    },
    {
      text: "Excited to unveil our {adjective} AI that {verb} {noun} at {number}x the speed of traditional methods. Say goodbye to {noun2} forever!",
      inputs: [
        { id: 'adjective', label: 'Adjective' },
        { id: 'verb', label: 'Verb (present tense)' },
        { id: 'noun', label: 'Noun' },
        { id: 'number', label: 'Number' },
        { id: 'noun2', label: 'Another Noun' }
      ]
    },
    {
      text: "Our team has created an AI that {verb} {noun} with {number}% more {noun2} than any competitor. The {adjective} results speak for themselves!",
      inputs: [
        { id: 'verb', label: 'Verb (present tense)' },
        { id: 'noun', label: 'Noun' },
        { id: 'number', label: 'Number' },
        { id: 'noun2', label: 'Another Noun' },
        { id: 'adjective', label: 'Adjective' }
      ]
    },
    {
      text: "Mind-blown! Our AI just {verb} a new record for {noun} by achieving {number}x more {noun2} than ever thought possible!",
      inputs: [
        { id: 'verb', label: 'Past Tense Verb' },
        { id: 'noun', label: 'Noun' },
        { id: 'number', label: 'Number' },
        { id: 'noun2', label: 'Another Noun' }
      ]
    },
    {
      text: "Today marks a {adjective} milestone: our AI has {verb} the {noun} barrier, delivering {number}x more {noun2} than the industry standard!",
      inputs: [
        { id: 'adjective', label: 'Adjective' },
        { id: 'verb', label: 'Past Tense Verb' },
        { id: 'noun', label: 'Noun' },
        { id: 'number', label: 'Number' },
        { id: 'noun2', label: 'Another Noun' }
      ]
    },
    {
      text: "Grateful to announce our {adjective} AI now {verb} {noun} with {number}% accuracy while reducing {noun2} by {number2}%! #AIRevolution",
      inputs: [
        { id: 'adjective', label: 'Adjective' },
        { id: 'verb', label: 'Verb (present tense)' },
        { id: 'noun', label: 'Noun' },
        { id: 'number', label: 'Number' },
        { id: 'noun2', label: 'Another Noun' },
        { id: 'number2', label: 'Another Number' }
      ]
    },
    {
      text: "After {number} sleepless nights, our team has built an AI that {verb} {noun} at {number2}x the speed while being {number3}% more {adjective}!",
      inputs: [
        { id: 'number', label: 'Number' },
        { id: 'verb', label: 'Verb (present tense)' },
        { id: 'noun', label: 'Noun' },
        { id: 'number2', label: 'Another Number' },
        { id: 'number3', label: 'One More Number' },
        { id: 'adjective', label: 'Adjective' }
      ]
    },
    {
      text: "Honored to reveal our AI has {verb} the {adjective} barrier of {noun}, achieving what {number} experts said was impossible just {number2} months ago!",
      inputs: [
        { id: 'verb', label: 'Past Tense Verb' },
        { id: 'adjective', label: 'Adjective' },
        { id: 'noun', label: 'Noun' },
        { id: 'number', label: 'Number' },
        { id: 'number2', label: 'Another Number' }
      ]
    },
    {
      text: "Game-changer alert! Our {adjective} AI has {verb} the way we think about {noun}, increasing {noun2} by an unprecedented {number}%!",
      inputs: [
        { id: 'adjective', label: 'Adjective' },
        { id: 'verb', label: 'Past Tense Verb' },
        { id: 'noun', label: 'Noun' },
        { id: 'noun2', label: 'Another Noun' },
        { id: 'number', label: 'Number' }
      ]
    },
    {
      text: "Thrilled to announce that our AI now {verb} {noun} with {number}% more {noun2} while simultaneously {verb2} {number2}x more {noun3}!",
      inputs: [
        { id: 'verb', label: 'Verb (present tense)' },
        { id: 'noun', label: 'Noun' },
        { id: 'number', label: 'Number' },
        { id: 'noun2', label: 'Another Noun' },
        { id: 'verb2', label: 'Another Verb (present tense)' },
        { id: 'number2', label: 'Another Number' },
        { id: 'noun3', label: 'One More Noun' }
      ]
    },
    {
      text: "Just in: Our {adjective} AI has {verb} all expectations by {verb2} {number}x more {noun} than the top {number2} competitors combined!",
      inputs: [
        { id: 'adjective', label: 'Adjective' },
        { id: 'verb', label: 'Past Tense Verb' },
        { id: 'verb2', label: 'Present Participle Verb (-ing)' },
        { id: 'number', label: 'Number' },
        { id: 'noun', label: 'Noun' },
        { id: 'number2', label: 'Another Number' }
      ]
    },
    {
      text: "Proud moment! Our AI has achieved a {number}x improvement in {noun} efficiency, making it the most {adjective} solution for {noun2} in the industry!",
      inputs: [
        { id: 'number', label: 'Number' },
        { id: 'noun', label: 'Noun' },
        { id: 'adjective', label: 'Adjective' },
        { id: 'noun2', label: 'Another Noun' }
      ]
    },
    {
      text: "Revolutionary breakthrough! Our AI {verb} {noun} in just {number} seconds, making it {number2}x more {adjective} than traditional {noun2} methods!",
      inputs: [
        { id: 'verb', label: 'Verb (present tense)' },
        { id: 'noun', label: 'Noun' },
        { id: 'number', label: 'Number' },
        { id: 'number2', label: 'Another Number' },
        { id: 'adjective', label: 'Adjective' },
        { id: 'noun2', label: 'Another Noun' }
      ]
    },
    {
      text: "Incredible news! Our AI has {verb} the {adjective} world of {noun}, delivering {number}% more {noun2} with {number2}% less effort!",
      inputs: [
        { id: 'verb', label: 'Past Tense Verb' },
        { id: 'adjective', label: 'Adjective' },
        { id: 'noun', label: 'Noun' },
        { id: 'number', label: 'Number' },
        { id: 'noun2', label: 'Another Noun' },
        { id: 'number2', label: 'Another Number' }
      ]
    },
    {
      text: "Feeling blessed! Our AI has reached a {adjective} milestone by {verb} {noun} at {number}x the normal rate! This changes everything about {noun2}.",
      inputs: [
        { id: 'adjective', label: 'Adjective' },
        { id: 'verb', label: 'Present Participle Verb (-ing)' },
        { id: 'noun', label: 'Noun' },
        { id: 'number', label: 'Number' },
        { id: 'noun2', label: 'Another Noun' }
      ]
    },
    {
      text: "Breakthrough moment! Our {adjective} AI has {verb} the {noun} industry by achieving a mind-blowing {number}% reduction in {noun2}!",
      inputs: [
        { id: 'adjective', label: 'Adjective' },
        { id: 'verb', label: 'Past Tense Verb' },
        { id: 'noun', label: 'Noun' },
        { id: 'number', label: 'Number' },
        { id: 'noun2', label: 'Another Noun' }
      ]
    },
    {
      text: "Humbled by the response to our new AI that {verb} {noun} with {number}x more {noun2}! Over {number2} industry leaders have already {verb2} it!",
      inputs: [
        { id: 'verb', label: 'Verb (present tense)' },
        { id: 'noun', label: 'Noun' },
        { id: 'number', label: 'Number' },
        { id: 'noun2', label: 'Another Noun' },
        { id: 'number2', label: 'Another Number' },
        { id: 'verb2', label: 'Past Tense Verb' }
      ]
    },
    {
      text: "Excited to share that our AI has {verb} a new {adjective} approach to {noun}, making traditional methods look {number}x less {adjective2}!",
      inputs: [
        { id: 'verb', label: 'Past Tense Verb' },
        { id: 'adjective', label: 'Adjective' },
        { id: 'noun', label: 'Noun' },
        { id: 'number', label: 'Number' },
        { id: 'adjective2', label: 'Another Adjective' }
      ]
    },
    {
      text: "Just witnessed our AI {verb} {number} different {noun} tasks in parallel, each one {number2}% more {adjective} than a human expert!",
      inputs: [
        { id: 'verb', label: 'Verb (infinitive)' },
        { id: 'number', label: 'Number' },
        { id: 'noun', label: 'Noun' },
        { id: 'number2', label: 'Another Number' },
        { id: 'adjective', label: 'Adjective' }
      ]
    },
    {
      text: "Our {adjective} AI has officially {verb} the {noun} ceiling! It now processes {number}x more {noun2} while consuming {number2}% less resources.",
      inputs: [
        { id: 'adjective', label: 'Adjective' },
        { id: 'verb', label: 'Past Tense Verb' },
        { id: 'noun', label: 'Noun' },
        { id: 'number', label: 'Number' },
        { id: 'noun2', label: 'Another Noun' },
        { id: 'number2', label: 'Another Number' }
      ]
    },
    {
      text: "Proud to unveil our AI that {verb} {noun} with {number}% more {noun2} than ever before! This is truly a {adjective} moment for our industry.",
      inputs: [
        { id: 'verb', label: 'Verb (present tense)' },
        { id: 'noun', label: 'Noun' },
        { id: 'number', label: 'Number' },
        { id: 'noun2', label: 'Another Noun' },
        { id: 'adjective', label: 'Adjective' }
      ]
    },
    {
      text: "After {number} months of development, our AI now {verb} {noun} at {number2}x the speed with {number3}% more {adjective} results!",
      inputs: [
        { id: 'number', label: 'Number' },
        { id: 'verb', label: 'Verb (present tense)' },
        { id: 'noun', label: 'Noun' },
        { id: 'number2', label: 'Another Number' },
        { id: 'number3', label: 'One More Number' },
        { id: 'adjective', label: 'Adjective' }
      ]
    },
    {
      text: "Thrilled to announce our AI has {verb} a new {adjective} record in {noun} by achieving {number}x better {noun2} than the previous state-of-the-art!",
      inputs: [
        { id: 'verb', label: 'Past Tense Verb' },
        { id: 'adjective', label: 'Adjective' },
        { id: 'noun', label: 'Noun' },
        { id: 'number', label: 'Number' },
        { id: 'noun2', label: 'Another Noun' }
      ]
    },
    {
      text: "Groundbreaking! Our AI has {verb} the {adjective} limits of {noun}, delivering {number}x more {noun2} while using {number2}% less {noun3}!",
      inputs: [
        { id: 'verb', label: 'Past Tense Verb' },
        { id: 'adjective', label: 'Adjective' },
        { id: 'noun', label: 'Noun' },
        { id: 'number', label: 'Number' },
        { id: 'noun2', label: 'Another Noun' },
        { id: 'number2', label: 'Another Number' },
        { id: 'noun3', label: 'One More Noun' }
      ]
    },
    {
      text: "Just shipped our {adjective} AI that {verb} {noun} with unprecedented {noun2}! Early users report {number}x improvement in their {noun3}!",
      inputs: [
        { id: 'adjective', label: 'Adjective' },
        { id: 'verb', label: 'Verb (present tense)' },
        { id: 'noun', label: 'Noun' },
        { id: 'noun2', label: 'Another Noun' },
        { id: 'number', label: 'Number' },
        { id: 'noun3', label: 'One More Noun' }
      ]
    },
    {
      text: "Honored to share that our AI has {verb} a new {adjective} benchmark in {noun}, outperforming traditional methods by {number}x while using {number2}% less {noun2}!",
      inputs: [
        { id: 'verb', label: 'Past Tense Verb' },
        { id: 'adjective', label: 'Adjective' },
        { id: 'noun', label: 'Noun' },
        { id: 'number', label: 'Number' },
        { id: 'number2', label: 'Another Number' },
        { id: 'noun2', label: 'Another Noun' }
      ]
    },
    {
      text: "Game-changing moment! Our {adjective} AI has {verb} the way we approach {noun}, delivering {number}x more {noun2} in just {number2}% of the time!",
      inputs: [
        { id: 'adjective', label: 'Adjective' },
        { id: 'verb', label: 'Past Tense Verb' },
        { id: 'noun', label: 'Noun' },
        { id: 'number', label: 'Number' },
        { id: 'noun2', label: 'Another Noun' },
        { id: 'number2', label: 'Another Number' }
      ]
    },
    {
      text: "Thrilled to announce our AI has {verb} the {adjective} barrier in {noun} technology! It's now {number}x more {adjective2} than anything else on the market.",
      inputs: [
        { id: 'verb', label: 'Past Tense Verb' },
        { id: 'adjective', label: 'Adjective' },
        { id: 'noun', label: 'Noun' },
        { id: 'number', label: 'Number' },
        { id: 'adjective2', label: 'Another Adjective' }
      ]
    },
    {
      text: "Humbled by the {adjective} response to our AI that {verb} {noun} with {number}% more {noun2}! We've already {verb2} over {number2} {noun3} use cases!",
      inputs: [
        { id: 'adjective', label: 'Adjective' },
        { id: 'verb', label: 'Verb (present tense)' },
        { id: 'noun', label: 'Noun' },
        { id: 'number', label: 'Number' },
        { id: 'noun2', label: 'Another Noun' },
        { id: 'verb2', label: 'Past Tense Verb' },
        { id: 'number2', label: 'Another Number' },
        { id: 'noun3', label: 'One More Noun' }
      ]
    },
    {
      text: "Our {adjective} AI has {verb} all expectations by {verb2} {noun} at {number}x the speed while maintaining {number2}% more {noun2}!",
      inputs: [
        { id: 'adjective', label: 'Adjective' },
        { id: 'verb', label: 'Past Tense Verb' },
        { id: 'verb2', label: 'Present Participle Verb (-ing)' },
        { id: 'noun', label: 'Noun' },
        { id: 'number', label: 'Number' },
        { id: 'number2', label: 'Another Number' },
        { id: 'noun2', label: 'Another Noun' }
      ]
    },
    {
      text: "Proud to reveal our AI now {verb} {noun} with {number}% more {noun2} than the top {number2} competitors combined! This is truly {adjective}.",
      inputs: [
        { id: 'verb', label: 'Verb (present tense)' },
        { id: 'noun', label: 'Noun' },
        { id: 'number', label: 'Number' },
        { id: 'noun2', label: 'Another Noun' },
        { id: 'number2', label: 'Another Number' },
        { id: 'adjective', label: 'Adjective' }
      ]
    },
    {
      text: "After {number} iterations, our AI has finally {verb} the {adjective} frontier of {noun}! It's now {number2}x more {adjective2} than we ever imagined possible!",
      inputs: [
        { id: 'number', label: 'Number' },
        { id: 'verb', label: 'Past Tense Verb' },
        { id: 'adjective', label: 'Adjective' },
        { id: 'noun', label: 'Noun' },
        { id: 'number2', label: 'Another Number' },
        { id: 'adjective2', label: 'Another Adjective' }
      ]
    },
    {
      text: "Breaking news! Our {adjective} AI has {verb} a new {noun} record by achieving {number}% more {noun2} while using {number2}% less {noun3}!",
      inputs: [
        { id: 'adjective', label: 'Adjective' },
        { id: 'verb', label: 'Past Tense Verb' },
        { id: 'noun', label: 'Noun' },
        { id: 'number', label: 'Number' },
        { id: 'noun2', label: 'Another Noun' },
        { id: 'number2', label: 'Another Number' },
        { id: 'noun3', label: 'One More Noun' }
      ]
    },
    {
      text: "Excited to announce our AI has {verb} the {adjective} challenge of {noun} by delivering {number}x more {noun2} than previously thought possible!",
      inputs: [
        { id: 'verb', label: 'Past Tense Verb' },
        { id: 'adjective', label: 'Adjective' },
        { id: 'noun', label: 'Noun' },
        { id: 'number', label: 'Number' },
        { id: 'noun2', label: 'Another Noun' }
      ]
    },
    {
      text: "Just in: Our {adjective} AI has {verb} all previous {noun} records! It now {verb2} {number}x faster while being {number2}% more {adjective2}!",
      inputs: [
        { id: 'adjective', label: 'Adjective' },
        { id: 'verb', label: 'Past Tense Verb' },
        { id: 'noun', label: 'Noun' },
        { id: 'verb2', label: 'Verb (present tense)' },
        { id: 'number', label: 'Number' },
        { id: 'number2', label: 'Another Number' },
        { id: 'adjective2', label: 'Another Adjective' }
      ]
    },
    {
      text: "Humbled to announce our AI has {verb} a new {adjective} approach to {noun}, making it {number}x more {adjective2} for {number2}+ use cases!",
      inputs: [
        { id: 'verb', label: 'Past Tense Verb' },
        { id: 'adjective', label: 'Adjective' },
        { id: 'noun', label: 'Noun' },
        { id: 'number', label: 'Number' },
        { id: 'adjective2', label: 'Another Adjective' },
        { id: 'number2', label: 'Another Number' }
      ]
    },
    {
      text: "Excited to share that our AI has {verb} a {number}x improvement in {noun} by leveraging {adjective} {noun2} technology! The future is here!",
      inputs: [
        { id: 'verb', label: 'Past Tense Verb' },
        { id: 'number', label: 'Number' },
        { id: 'noun', label: 'Noun' },
        { id: 'adjective', label: 'Adjective' },
        { id: 'noun2', label: 'Another Noun' }
      ]
    },
    {
      text: "Our {adjective} AI has {verb} the impossible! It now {verb2} {noun} with {number}% more {noun2} while using {number2}% less {noun3}!",
      inputs: [
        { id: 'adjective', label: 'Adjective' },
        { id: 'verb', label: 'Past Tense Verb' },
        { id: 'verb2', label: 'Verb (present tense)' },
        { id: 'noun', label: 'Noun' },
        { id: 'number', label: 'Number' },
        { id: 'noun2', label: 'Another Noun' },
        { id: 'number2', label: 'Another Number' },
        { id: 'noun3', label: 'One More Noun' }
      ]
    },
    {
      text: "After {number} years in stealth mode, we're unveiling our AI that {verb} {noun} at {number2}x the speed with {number3}% more {adjective} results!",
      inputs: [
        { id: 'number', label: 'Number' },
        { id: 'verb', label: 'Verb (present tense)' },
        { id: 'noun', label: 'Noun' },
        { id: 'number2', label: 'Another Number' },
        { id: 'number3', label: 'One More Number' },
        { id: 'adjective', label: 'Adjective' }
      ]
    },
    {
      text: "Grateful to announce our AI has {verb} a new {adjective} milestone in {noun}! It's now {number}x more {adjective2} than any solution on the market!",
      inputs: [
        { id: 'verb', label: 'Past Tense Verb' },
        { id: 'adjective', label: 'Adjective' },
        { id: 'noun', label: 'Noun' },
        { id: 'number', label: 'Number' },
        { id: 'adjective2', label: 'Another Adjective' }
      ]
    },
    {
      text: "Just witnessed our AI {verb} {noun} with {number}% more {noun2} than ever before! This is truly a {adjective} moment for {noun3} everywhere!",
      inputs: [
        { id: 'verb', label: 'Verb (infinitive)' },
        { id: 'noun', label: 'Noun' },
        { id: 'number', label: 'Number' },
        { id: 'noun2', label: 'Another Noun' },
        { id: 'adjective', label: 'Adjective' },
        { id: 'noun3', label: 'One More Noun (plural)' }
      ]
    },
    {
      text: "Proud to share that our {adjective} AI has {verb} the {noun} industry by delivering {number}x more {noun2} in just {number2}% of the time!",
      inputs: [
        { id: 'adjective', label: 'Adjective' },
        { id: 'verb', label: 'Past Tense Verb' },
        { id: 'noun', label: 'Noun' },
        { id: 'number', label: 'Number' },
        { id: 'noun2', label: 'Another Noun' },
        { id: 'number2', label: 'Another Number' }
      ]
    },
    {
      text: "Breakthrough alert! Our AI has {verb} the {adjective} limits of {noun}, achieving a mind-blowing {number}% improvement in {noun2}!",
      inputs: [
        { id: 'verb', label: 'Past Tense Verb' },
        { id: 'adjective', label: 'Adjective' },
        { id: 'noun', label: 'Noun' },
        { id: 'number', label: 'Number' },
        { id: 'noun2', label: 'Another Noun' }
      ]
    },
    {
      text: "Excited to reveal our AI now {verb} {noun} with {number}x more {noun2} than the industry standard! This is truly a {adjective} revolution!",
      inputs: [
        { id: 'verb', label: 'Verb (present tense)' },
        { id: 'noun', label: 'Noun' },
        { id: 'number', label: 'Number' },
        { id: 'noun2', label: 'Another Noun' },
        { id: 'adjective', label: 'Adjective' }
      ]
    },
    {
      text: "After {number} months of development, our {adjective} AI has {verb} all previous {noun} records! It's now {number2}% more {adjective2} than ever before!",
      inputs: [
        { id: 'number', label: 'Number' },
        { id: 'adjective', label: 'Adjective' },
        { id: 'verb', label: 'Past Tense Verb' },
        { id: 'noun', label: 'Noun' },
        { id: 'number2', label: 'Another Number' },
        { id: 'adjective2', label: 'Another Adjective' }
      ]
    },
    {
      text: "Humbled by the response to our AI that has {verb} the {adjective} world of {noun}! Users report {number}x more {noun2} with {number2}% less effort!",
      inputs: [
        { id: 'verb', label: 'Past Tense Verb' },
        { id: 'adjective', label: 'Adjective' },
        { id: 'noun', label: 'Noun' },
        { id: 'number', label: 'Number' },
        { id: 'noun2', label: 'Another Noun' },
        { id: 'number2', label: 'Another Number' }
      ]
    },
    {
      text: "Just deployed our {adjective} AI that {verb} {noun} at {number}x the speed while delivering {number2}% more {noun2}! This changes everything!",
      inputs: [
        { id: 'adjective', label: 'Adjective' },
        { id: 'verb', label: 'Verb (present tense)' },
        { id: 'noun', label: 'Noun' },
        { id: 'number', label: 'Number' },
        { id: 'number2', label: 'Another Number' },
        { id: 'noun2', label: 'Another Noun' }
      ]
    },
    {
      text: "Thrilled to announce our AI has {verb} a new {adjective} approach to {noun}, making traditional methods look {number}x less {adjective2}!",
      inputs: [
        { id: 'verb', label: 'Past Tense Verb' },
        { id: 'adjective', label: 'Adjective' },
        { id: 'noun', label: 'Noun' },
        { id: 'number', label: 'Number' },
        { id: 'adjective2', label: 'Another Adjective' }
      ]
    },
    {
      text: "Our {adjective} AI has officially {verb} the {noun} ceiling! It now delivers {number}x more {noun2} while being {number2}% more {adjective2}!",
      inputs: [
        { id: 'adjective', label: 'Adjective' },
        { id: 'verb', label: 'Past Tense Verb' },
        { id: 'noun', label: 'Noun' },
        { id: 'number', label: 'Number' },
        { id: 'noun2', label: 'Another Noun' },
        { id: 'number2', label: 'Another Number' },
        { id: 'adjective2', label: 'Another Adjective' }
      ]
    }
  ];

  // Randomly select a template when the component mounts
  const [selectedTemplate] = useState(() => {
    const randomIndex = Math.floor(Math.random() * templates.length);
    return templates[randomIndex];
  });

  // Generate random suggestions based on the current input type
  const generateSuggestions = (step, count = 3) => {
    if (!selectedTemplate.inputs[step]) return [];
    
    // Determine which suggestion list to use based on the label
    let suggestionType = 'noun'; // default
    const currentLabel = selectedTemplate.inputs[step].label.toLowerCase();
    
    if (currentLabel.includes('adjective')) {
      suggestionType = 'adjective';
    } else if (currentLabel.includes('verb')) {
      suggestionType = 'verb';
    } else if (currentLabel.includes('number')) {
      suggestionType = 'number';
    } else if (currentLabel.includes('noun')) {
      suggestionType = 'noun';
    }
    
    // Get the appropriate suggestion list
    const suggestionList = suggestions[suggestionType] || suggestions.noun;
    
    // Shuffle and take the first 'count' items
    return [...suggestionList]
      .sort(() => 0.5 - Math.random())
      .slice(0, count);
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
      setCurrentSuggestions(generateSuggestions(currentStep));
    }
  }, [currentStep, isComplete, selectedTemplate]);

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
    setCurrentStep(0);
    setUserInputs({});
    setCurrentInput('');
    setIsComplete(false);
    setCopySuccess(false);
    // Refresh the page to get a new random template
    window.location.reload();
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
      </div>

      <footer>
        <p>© {new Date().getFullYear()} AI Hype Madlibs - Exposing LinkedIn AI Influencer Culture One Post at a Time</p>
        <p>Created by overfocus - <a href="https://github.com/overfocus/madlibs">source code @ github.com/overfocus/madlibs</a></p>
        <p>Hosted by Vercel - <a href="https://vercel.com">vercel.com</a></p>
        <p>Visit <a href="https://kevinferron.com">kevinferron.com</a></p>
      </footer>
    </div>
  );
};

export default App;
