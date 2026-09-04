export type Project = {
  id: string;
  category: "Markets & Research" | "Quantitative Finance" | "Financial Modeling" | "Analytics & Simulation" | "Strategy & AI";
  title: string;
  subtitle: string;
  problem: string;
  approach: string;
  analysis: string;
  finding: string;
  previewImage: string;
  artifact?: string;
  artifactLabel?: string;
};

export const projects: Project[] = [
  {
    id: "etf",
    category: "Markets & Research",
    title: "Exchange-Traded Funds — Demand-Side Dynamics",
    subtitle: "Bloomberg • TradingView • Excel • Yahoo Finance",
    problem: "Why has investor demand shifted from mutual funds toward ETFs, and how does that behavior change during volatile markets?",
    approach: "Combined real-time order-flow evidence with structural product comparison. Examined Bloomberg FFLO net flows, trading volume, turnover, VIX behavior, expense ratios, bid–ask spreads, tax-cost ratios, transparency frequency, and a SPY vs. VFIAX timing comparison.",
    analysis: "Linked volatility regimes to ETF demand, compared execution and structural characteristics of ETFs versus mutual funds, and extended the analysis across major global markets.",
    finding: "The project found that ETF adoption is supported by both behavioral demand during market stress and structural advantages such as liquidity, transparency, tax efficiency, and intraday execution.",
    previewImage: "/projects/etf/ETF_Demand_Side_Dynamics.pdf",
    artifact: "/projects/etf/ETF_Demand_Side_Dynamics.pdf",
    artifactLabel: "Open full research poster"
  },
  {
    id: "momentum",
    category: "Quantitative Finance",
    title: "Momentum Crashes and the 52-Week High Strategy",
    subtitle: "Bloomberg • Excel • Fama-French Data • TradingView",
    problem: "Traditional momentum strategies can suffer severe crash risk during market reversals. Can proximity to the 52-week high improve momentum portfolio resilience?",
    approach: "Replicated Winner-Minus-Loser and near-high-neutral momentum portfolios based on the 52-week-high signal, using market-adjusted returns and portfolio-level risk metrics.",
    analysis: "Evaluated cumulative performance, monthly returns, standard deviation, skewness, minimum return, Sharpe ratio, and a live-market application during the 2025 market correction.",
    finding: "The analysis showed that incorporating proximity to 52-week highs can reduce extreme downside exposure while preserving competitive momentum returns.",
    previewImage: "/projects/momentum/momentum-poster.png"
  },
  {
    id: "nvidia",
    category: "Financial Modeling",
    title: "NVIDIA Financial Modeling & Valuation",
    subtitle: "Excel • Pro Forma Forecasting • FCFE • CAPM • Ratio Analysis",
    problem: "How can historical financial statements and operating assumptions be translated into an integrated forward valuation framework?",
    approach: "Built an Excel model with linked Financial Statements, Ratio Analysis, Common-Size Statements, Forecast Assumptions, Valuation, and Input sheets.",
    analysis: "Forecast revenue growth and operating ratios, projected financial statements, calculated FCFE, estimated terminal value, and used a CAPM-based required return within the valuation framework.",
    finding: "The model demonstrates an end-to-end assumption-driven valuation workflow: historical analysis → operating forecasts → cash-flow generation → discounted equity value.",
    previewImage: "/projects/nvidia/nvidia-valuation-preview.png",
    artifact: "/models/NVIDIA_Financial_Model_Valuation.xlsx",
    artifactLabel: "Download Excel model"
  },
  {
    id: "ncc",
    category: "Analytics & Simulation",
    title: "National Cranberry Cooperative Capacity Simulation",
    subtitle: "Excel • Operations Simulation • NPV • Sensitivity Analysis",
    problem: "The receiving plant faced dryer congestion, wet-bin overflow, truck queues, and overtime. What capacity configuration would remove the bottleneck economically?",
    approach: "Modeled hourly arrivals, wet-berry processing, inventory accumulation, wet-bin capacity, truck queues, labor schedules, and 3-, 4-, and 5-dryer scenarios.",
    analysis: "Identified the dryers as the primary bottleneck at 186% utilization, compared peak inventory and waiting across scenarios, and performed incremental NPV analysis for additional dryer investment.",
    finding: "The 5-dryer configuration reduced peak truck waiting from 42 to 0, eliminated wet-bin overflow and overtime beyond 11pm, and produced positive incremental NPV for both added dryers.",
    previewImage: "/projects/ncc/NCC_Capacity_Simulation.pdf",
    artifact: "/projects/ncc/NCC_Capacity_Simulation.pdf",
    artifactLabel: "Open full presentation"
  },
  {
    id: "alteryx",
    category: "Analytics & Simulation",
    title: "Business Data Preparation & Analytics Workflows",
    subtitle: "Alteryx • Data Cleaning • Transformation • Aggregation",
    problem: "How can repetitive business-data preparation tasks be converted into transparent, repeatable analytical workflows?",
    approach: "Built Alteryx workflows using input, formula, filtering, transformation, summarize, aggregation, sorting, and validation steps.",
    analysis: "Worked through structured business examples including category aggregation, time calculations, attendance analysis, and date-based filtering.",
    finding: "The workflows demonstrate hands-on ability to convert raw structured data into analysis-ready outputs using visual, auditable transformation logic.",
    previewImage: "/projects/alteryx/Alteryx_Workflows.pdf",
    artifact: "/projects/alteryx/Alteryx_Workflows.pdf",
    artifactLabel: "Open workflow examples"
  },
  {
    id: "harvey",
    category: "Strategy & AI",
    title: "Harvey AI — Building Durable Advantage in Legal AI",
    subtitle: "AI Strategy • Platform Economics • Governance • Capital Allocation",
    problem: "If foundation-model intelligence becomes widely accessible, where can a legal-AI application build durable competitive advantage?",
    approach: "Analyzed industry architecture, supplier power, bundling risk, enterprise workflows, proprietary legal data, governance, and multi-model orchestration.",
    analysis: "Developed a three-pillar strategy around workflow optimization, data advantage, and a trust/governance stack; proposed approximately $300M of capital allocation and a staged 2026–2029 roadmap.",
    finding: "Recommended repositioning Harvey from a standalone AI assistant toward a model-agnostic legal workflow and governance platform where switching costs, trusted infrastructure, and workflow integration create defensibility.",
    previewImage: "/projects/harvey-ai/Harvey_AI_Strategy.pdf",
    artifact: "/projects/harvey-ai/Harvey_AI_Strategy.pdf",
    artifactLabel: "Open full strategy deck"
  },
  {
    id: "disney",
    category: "Strategy & AI",
    title: "Disney Galactic Starcruiser Strategic Analysis",
    subtitle: "PESTEL • Porter’s Five Forces • VRIO/VRIN • SWOT • Scenario Analysis",
    problem: "Why did Disney’s Galactic Starcruiser underperform despite a globally powerful intellectual property and premium experiential concept?",
    approach: "Conducted external, competitive, and internal analysis using PESTEL, Five Forces, VRIO/VRIN, SWOT, and competitor analysis.",
    analysis: "Evaluated strategic alternatives and connected recommendation design to implementation risk, operating logic, scenario analysis, and estimated financial impact.",
    finding: "Recommended a seasonal Star Wars interactive-missions model intended to preserve immersive differentiation while improving accessibility and operating economics.",
    previewImage: "/projects/disney/Disney_Galactic_Starcruiser_Strategy.pdf",
    artifact: "/projects/disney/Disney_Galactic_Starcruiser_Strategy.pdf",
    artifactLabel: "Open full strategy deck"
  }
];
