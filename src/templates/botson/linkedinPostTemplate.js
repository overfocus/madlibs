/**
 * Botson Madlib Template - LinkedIn Post
 */

const linkedinPostTemplate = {
  id: 'botson-linkedin-post',
  name: 'Botson says:',
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

---------------

♻️ Repost if you found this useful 
🔥 Follow me for more boastwriting tips 

#LowQualityContent 
#DigitalGonad 
#Boastwriter`,
  inputs: [
    { id: 'image', label: 'Select an Image' },
    { id: 'verb', label: 'Past Tense Verb (e.g., rejected)' },
    { id: 'location', label: 'Location (e.g., London)' },
    { id: 'place', label: 'Place (e.g., office)' },
    { id: 'danger', label: 'Dangerous Place (e.g., drug den)' },
    { id: 'group1', label: 'Group of People 1 (e.g., homeless crackheads)' },
    { id: 'group2', label: 'Group of People 2 (e.g., dangerous criminals)' },
    { id: 'group3', label: 'Group of People 3 (e.g., knife gangs)' },
    { id: 'lesson', label: 'Business Lesson (e.g., creative)' }
  ]
};

export default linkedinPostTemplate;
