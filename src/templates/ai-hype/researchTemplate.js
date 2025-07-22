/**
 * AI Hype Research Breakthrough Template
 */

const researchTemplate = {
  id: "research-breakthrough",
  name: "Research Breakthrough",
  text: `Researchers at {university} have published a groundbreaking paper in {journal} demonstrating a new {adjective} approach to {problem}.

Their method, called {methodName}, uses {technology} to achieve {metric} improvement over previous state-of-the-art techniques.

"We were surprised by how well it worked," says lead researcher {researcher}. "This could revolutionize {field} as we know it."

The team's approach can solve problems that were previously thought to be {limitation} for at least {timeframe}.

Industry experts from {company} and {company2} are already exploring commercial applications.`,
  inputs: [
    { id: "university", label: "Research University" },
    { id: "journal", label: "Academic Journal" },
    { id: "adjective", label: "Technical Adjective" },
    { id: "problem", label: "AI Research Problem" },
    { id: "methodName", label: "Method Name" },
    { id: "technology", label: "AI Technology" },
    { id: "metric", label: "Performance Metric" },
    { id: "researcher", label: "Researcher Name" },
    { id: "field", label: "Field of Study" },
    { id: "limitation", label: "Technical Limitation" },
    { id: "timeframe", label: "Time Period" },
    { id: "company", label: "Tech Company" },
    { id: "company2", label: "Another Tech Company" }
  ]
};

export default researchTemplate;
