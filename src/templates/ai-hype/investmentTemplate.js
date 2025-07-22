/**
 * AI Hype Investment Template
 */

const investmentTemplate = {
  id: "investment-announcement",
  name: "Investment Announcement",
  text: `JUST IN: {company} has secured ${'{amount}'} in {roundType} funding to develop their {adjective} {product}.

Led by {investor} with participation from {investor2} and {investor3}, this round values the company at ${'{valuation}'}.

Their platform uses {technology} to {benefit} for {industry} companies, a market estimated at ${'{marketSize}'}.

"{quote}" said {ceo}, founder and CEO.

The company plans to use the funds to {goal1}, {goal2}, and {goal3} over the next {timeframe}.`,
  inputs: [
    { id: "company", label: "AI Startup" },
    { id: "amount", label: "Funding Amount (e.g., '$100M')" },
    { id: "roundType", label: "Funding Round (e.g., 'Series A')" },
    { id: "adjective", label: "Impressive Adjective" },
    { id: "product", label: "AI Product" },
    { id: "investor", label: "Lead Investor" },
    { id: "investor2", label: "Second Investor" },
    { id: "investor3", label: "Third Investor" },
    { id: "valuation", label: "Valuation (e.g., '$1B')" },
    { id: "technology", label: "AI Technology" },
    { id: "benefit", label: "Business Benefit" },
    { id: "industry", label: "Target Industry" },
    { id: "marketSize", label: "Market Size (e.g., '$50B')" },
    { id: "quote", label: "Ambitious Quote" },
    { id: "ceo", label: "CEO Name" },
    { id: "goal1", label: "Business Goal 1" },
    { id: "goal2", label: "Business Goal 2" },
    { id: "goal3", label: "Business Goal 3" },
    { id: "timeframe", label: "Time Period" }
  ]
};

export default investmentTemplate;
