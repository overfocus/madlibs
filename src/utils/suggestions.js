/**
 * Shared suggestion lists for madlib components
 * These are used by both AI Hype and Botson Madlib components
 */

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
  ],
  event: [
    'Industry conference', 'Networking mixer', 'Leadership summit', 'Tech meetup', 'Executive dinner',
    'Charity gala', 'Award ceremony', 'Product launch', 'Investor pitch night', 'Thought leadership panel',
    'Innovation showcase', 'Entrepreneurship forum', 'Business breakfast', 'Corporate retreat', 'VIP reception'
  ],
  activity: [
    'drinking free champagne', 'collecting swag', 'taking selfies', 'eating canapés', 'making small talk',
    'exchanging business cards', 'checking their phones', 'laughing at bad jokes', 'hovering near the buffet', 'avoiding eye contact',
    'posting on social media', 'complaining about the venue', 'talking about the weather', 'discussing sports', 'gossiping about colleagues'
  ],
  person: [
    'CEO of a Fortune 500', 'most influential person', 'keynote speaker', 'industry pioneer', 'venture capitalist',
    'angel investor', 'tech billionaire', 'thought leader', 'company founder', 'serial entrepreneur',
    'bestselling author', 'celebrity entrepreneur', 'social media influencer', 'industry disruptor', 'market maker'
  ],
  achievement: [
    'increased revenue by 500%', 'built a 7-figure business', 'exited 3 startups', 'disrupted an entire industry', 'invented a new business model',
    'scaled to 10 countries in 6 months', 'grew my LinkedIn following to 500K', 'secured $10M in funding', 'built a team of 100+ A-players', 'achieved 300% YOY growth',
    'turned around a failing business', 'created a viral marketing campaign', 'developed a revolutionary algorithm', 'published a bestselling business book', 'launched a successful podcast'
  ],
  approach: [
    'disruptive mindset', 'growth hacking strategy', 'blue ocean thinking', 'first-principles approach', 'agile methodology',
    'lean startup philosophy', 'design thinking framework', 'data-driven decision making', 'customer-centric model', 'radical innovation',
    'exponential growth strategy', 'platform ecosystem', 'network effect leverage', 'digital transformation roadmap', 'value chain optimization'
  ],
  industry: [
    'blockchain', 'artificial intelligence', 'SaaS', 'fintech', 'e-commerce',
    'digital marketing', 'healthtech', 'edtech', 'clean energy', 'cybersecurity',
    'IoT', 'cloud computing', 'big data', 'virtual reality', 'quantum computing'
  ],
  innovation: [
    'AI-powered toothbrush', 'blockchain for pets', 'NFT marketplace for dreams', 'metaverse dating app', 'crypto-mining shower head',
    'machine learning coffee maker', 'AR business card', 'drone delivery for office snacks', 'smart contract toilet', 'digital twin of myself',
    'wearable productivity tracker', 'mindfulness algorithm', 'virtual networking platform', 'blockchain-based resume', 'AI career coach'
  ],
  result: [
    'Offered me a job', 'Invested in my startup', 'Introduced me to their network', 'Asked me to speak at their event', 'Requested a follow-up meeting',
    'Became my mentor', 'Endorsed me on LinkedIn', 'Shared my content with their followers', 'Invited me to their mastermind group', 'Proposed a partnership',
    'Asked for my advice', 'Recommended me to their board', 'Featured me in their newsletter', 'Invited me to their podcast', 'Offered me a book deal'
  ],
  opportunity: [
    'partnership deal', 'exclusive contract', 'speaking engagement', 'book deal', 'consulting gig',
    'advisory position', 'investment opportunity', 'joint venture', 'licensing agreement', 'distribution deal',
    'media appearance', 'brand ambassadorship', 'strategic alliance', 'franchise opportunity', 'global expansion'
  ],
  value: [
    '$10 million', '$5 million', '$1 million', '$500K', '$250K',
    '$100K', '$50K', '7 figures', '6 figures', '8 figures',
    'priceless exposure', 'immeasurable value', 'industry-changing potential', 'market-disrupting impact', 'legacy-defining significance'
  ],
  motto: [
    'Network or Not Worth', 'Connect or Collect Dust', 'Disrupt or Be Disrupted', 'Innovate or Evaporate', 'Scale or Fail',
    'Hustle or Be Hustled', 'Lead or Be Led', 'Pivot or Perish', 'Adapt or Die', 'Grow or Go Home',
    'Execute or Exit', 'Monetize or Minimize', 'Optimize or Obsolete', 'Leverage or Leave', 'Automate or Evaporate'
  ]
};

export default suggestions;
