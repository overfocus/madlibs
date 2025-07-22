/**
 * AI Hype Partnership Template
 */

const partnershipTemplate = {
  id: "strategic-partnership",
  name: "Strategic Partnership",
  text: `ANNOUNCEMENT: {company1} and {company2} have formed a strategic partnership to develop {adjective} AI solutions for the {industry} sector.

By combining {company1}'s expertise in {technology1} with {company2}'s leading {technology2} platform, the partnership aims to {goal}.

Initial tests show a {metric} improvement in {capability}, far exceeding industry standards.

"{quote}" said {executive}, {title} at {company1}.

The first joint products are expected to launch within {timeframe}, targeting a market opportunity of ${'{marketSize}'}.

Analysts at {firm} predict this collaboration could {prediction}.`,
  inputs: [
    { id: "company1", label: "First Company" },
    { id: "company2", label: "Second Company" },
    { id: "adjective", label: "Impressive Adjective" },
    { id: "industry", label: "Target Industry" },
    { id: "technology1", label: "First Technology" },
    { id: "technology2", label: "Second Technology" },
    { id: "goal", label: "Partnership Goal" },
    { id: "metric", label: "Performance Metric" },
    { id: "capability", label: "Key Capability" },
    { id: "quote", label: "Partnership Quote" },
    { id: "executive", label: "Executive Name" },
    { id: "title", label: "Executive Title" },
    { id: "timeframe", label: "Time Period" },
    { id: "marketSize", label: "Market Size (e.g., '$10B')" },
    { id: "firm", label: "Analyst Firm" },
    { id: "prediction", label: "Market Prediction" }
  ]
};

export default partnershipTemplate;
