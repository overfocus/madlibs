/**
 * AI Hype Future Prediction Template
 */

const futureTemplate = {
  id: "future-prediction",
  name: "Future Prediction",
  text: `In the next {timeframe}, {company}'s new {adjective} {model} will completely transform how we {activity}.

By leveraging {technology} and {technology2}, they've achieved a {metric} improvement in {capability}.

"This is just the beginning," says {expert}, {title} at {organization}. "Soon we'll see {prediction}."

Critics argue that {concern}, but supporters point to {benefit} as evidence of the technology's potential.

What's clear is that the {industry} industry will never be the same.`,
  inputs: [
    { id: "timeframe", label: "Timeframe (e.g., '5 years', 'decade')" },
    { id: "company", label: "AI Company" },
    { id: "adjective", label: "Adjective" },
    { id: "model", label: "AI Model Name" },
    { id: "activity", label: "Human Activity" },
    { id: "technology", label: "AI Technology" },
    { id: "technology2", label: "Another AI Technology" },
    { id: "metric", label: "Impressive Metric (e.g., '10x', '99%')" },
    { id: "capability", label: "AI Capability" },
    { id: "expert", label: "Expert Name" },
    { id: "title", label: "Expert Title" },
    { id: "organization", label: "Organization" },
    { id: "prediction", label: "Bold Prediction" },
    { id: "concern", label: "Ethical Concern" },
    { id: "benefit", label: "Claimed Benefit" },
    { id: "industry", label: "Industry" }
  ]
};

export default futureTemplate;
