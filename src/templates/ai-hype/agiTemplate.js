/**
 * AI Hype AGI Template
 */

const agiTemplate = {
  id: "agi-breakthrough",
  name: "AGI Breakthrough",
  text: `BREAKING: {company} has achieved a major milestone toward Artificial General Intelligence with their {adjective} {model} system.

In tests, it demonstrated {capability} at a level {metric} better than human {experts}.

The system can now:
- {skill1}
- {skill2}
- {skill3}

{ceo}, CEO of {company}, stated: "{quote}"

While some experts warn about {risk}, the company has implemented {safeguard} to ensure responsible development.

This breakthrough could accelerate the timeline to full AGI by {timeframe}.`,
  inputs: [
    { id: "company", label: "AI Company" },
    { id: "adjective", label: "Impressive Adjective" },
    { id: "model", label: "AI Model Name" },
    { id: "capability", label: "Key Capability" },
    { id: "metric", label: "Performance Metric (e.g., '10x', '200%')" },
    { id: "experts", label: "Type of Experts" },
    { id: "skill1", label: "Impressive Skill 1" },
    { id: "skill2", label: "Impressive Skill 2" },
    { id: "skill3", label: "Impressive Skill 3" },
    { id: "ceo", label: "CEO Name" },
    { id: "quote", label: "Ambitious Quote" },
    { id: "risk", label: "Potential Risk" },
    { id: "safeguard", label: "Safety Measure" },
    { id: "timeframe", label: "Time Period" }
  ]
};

export default agiTemplate;
