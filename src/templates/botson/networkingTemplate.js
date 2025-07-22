/**
 * Botson Madlib Template - Networking Event
 */

const networkingTemplate = {
  id: 'botson-networking',
  name: 'Botson Networking Event',
  text: `I was at a {event} last night.

While everyone else was {activity}, I spotted the {person} across the room.

Most people would be intimidated, but I walked straight up and introduced myself:

"Hi, I'm {name}. I recently {achievement}."

Their initial reaction:

→ {reaction1}
→ {reaction2}
→ {reaction3}

But after I explained my {approach} to {industry} and my vision for {innovation}, everything changed.

They immediately:

→ {result1}
→ {result2}
→ {result3}

The lesson?

→ {lesson} ✔️

While everyone else was wasting time on small talk, I secured a {opportunity} worth {value}.

This is why I always say: {motto}

I trust you agree?

---------------

♻️ Repost if you found this useful 
🔥 Follow me for more boastwriting tips 

#LowQualityContent 
#DigitalGonad 
#Boastwriter`,
  inputs: [
    { id: 'image', label: 'Select an Image' },
    { id: 'event', label: 'Networking Event (e.g., Industry conference)' },
    { id: 'activity', label: 'Wasteful Activity (e.g., drinking free champagne)' },
    { id: 'person', label: 'Important Person (e.g., CEO of a Fortune 500)' },
    { id: 'name', label: 'Your Name (e.g., John Smith)' },
    { id: 'achievement', label: 'Achievement (e.g., increased revenue by 500%)' },
    { id: 'reaction1', label: 'Negative Reaction 1 (e.g., Looked confused)' },
    { id: 'reaction2', label: 'Negative Reaction 2 (e.g., Tried to escape)' },
    { id: 'reaction3', label: 'Negative Reaction 3 (e.g., Called security)' },
    { id: 'approach', label: 'Business Approach (e.g., disruptive mindset)' },
    { id: 'industry', label: 'Industry (e.g., blockchain)' },
    { id: 'innovation', label: 'Innovation (e.g., AI-powered toothbrush)' },
    { id: 'result1', label: 'Positive Result 1 (e.g., Offered me a job)' },
    { id: 'result2', label: 'Positive Result 2 (e.g., Invested in my startup)' },
    { id: 'result3', label: 'Positive Result 3 (e.g., Introduced me to their network)' },
    { id: 'lesson', label: 'Business Lesson (e.g., Fortune favors the bold)' },
    { id: 'opportunity', label: 'Opportunity (e.g., partnership deal)' },
    { id: 'value', label: 'Monetary Value (e.g., $10 million)' },
    { id: 'motto', label: 'Personal Motto (e.g., Network or Not Worth)' }
  ]
};

export default networkingTemplate;
