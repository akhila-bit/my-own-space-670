export type Ladder = {
  essentials: string[];
  expertise: string[];
};

export const SKILL_LADDER: Record<string, Ladder> = {
  sql: {
    essentials: [
      "SELECT, WHERE, ORDER BY, LIMIT",
      "INNER vs LEFT JOIN",
      "GROUP BY + aggregates (COUNT, SUM, AVG)",
      "HAVING vs WHERE",
      "Basic subqueries",
    ],
    expertise: [
      "Window functions (ROW_NUMBER, LAG, RANK)",
      "CTEs and recursive CTEs",
      "Query plans / EXPLAIN ANALYZE",
      "Indexes and selectivity",
      "Anti-joins and semi-joins (NOT EXISTS)",
    ],
  },
  excel: {
    essentials: ["Pivot tables", "VLOOKUP / XLOOKUP", "Absolute vs relative refs", "Basic charts", "Conditional formatting"],
    expertise: ["INDEX/MATCH/MATCH 2-D", "Power Query", "Array formulas / LET / LAMBDA", "What-if scenarios", "Pivot calc fields"],
  },
  python: {
    essentials: ["read_csv / read_sql", "Filter, select, sort", "groupby + agg", "merge / concat", "Handle NaN"],
    expertise: ["Vectorization vs apply", "Multi-index / pivot_table", "Memory dtypes (categorical)", "Chunked reads", "Time series resample"],
  },
  stats: {
    essentials: ["Mean, median, variance, std", "Normal distribution", "Sampling vs population", "Correlation vs causation", "Basic probability"],
    expertise: ["t-test / chi-square / ANOVA", "Confidence intervals", "Bayesian vs frequentist", "Bootstrapping", "Multiple comparisons"],
  },
  viz: {
    essentials: ["Bar / line / scatter choice", "Single source of truth", "Filters and parameters", "Color for meaning, not decoration", "Tooltips"],
    expertise: ["LOD / calculated measures", "Performance tuning extracts", "Row-level security", "Dashboard actions / drill-through", "Design systems for BI"],
  },
  ab: {
    essentials: ["Control vs treatment", "Randomization unit", "Primary metric", "p-value reading", "Sample size intuition"],
    expertise: ["Power analysis & MDE", "Sequential testing pitfalls", "Guardrail and counter metrics", "CUPED variance reduction", "Heterogeneous treatment effects"],
  },
  storytelling: {
    essentials: ["BLUF: bottom line up front", "One chart, one message", "Label everything", "Audience-appropriate jargon", "So-what for each insight"],
    expertise: ["Pyramid principle decks", "Decision-driving recommendations", "Counter-arguments addressed", "Executive 1-pagers", "Narrative arc across dashboards"],
  },
  etl: {
    essentials: ["Source → staging → mart", "Full vs incremental loads", "Primary keys and dedup", "Scheduling cadence", "Failure alerts"],
    expertise: ["Idempotent pipelines", "Slowly changing dimensions", "Data contracts", "Backfills without dupes", "Lineage and observability"],
  },
  warehouse: {
    essentials: ["Tables vs views", "Partitioning basics", "Clustering keys", "Cost of SELECT *", "Warehouses vs lakes"],
    expertise: ["Micro-partitions / clustering depth", "Materialized views", "Query cost tuning", "Workload isolation", "Time-travel / zero-copy clones"],
  },
  dbt: {
    essentials: ["models/ folder", "ref() and source()", "Schema tests", "Materializations (view/table)", "dbt run vs dbt build"],
    expertise: ["Incremental models + merge", "Snapshots", "Macros and Jinja", "Exposures and lineage", "CI for dbt PRs"],
  },
  ds: {
    essentials: ["Array vs linked list", "Hash map O(1) lookup", "Stack / queue", "Sets for dedup", "Tree basics"],
    expertise: ["Heaps for top-K", "Tries for prefix search", "Skip lists / B-trees", "Bloom filters", "Graph traversal (BFS/DFS)"],
  },
  algo: {
    essentials: ["O(n) vs O(n²)", "Sorting cost", "Binary search", "Recursion vs iteration", "Greedy intuition"],
    expertise: ["Hash vs sort-merge join Big-O", "Dynamic programming", "Streaming / online algorithms", "Approximate counting (HLL)", "Complexity of window funcs"],
  },
  db: {
    essentials: ["Tables, keys, FKs", "Normalization 1NF→3NF", "Index basics", "Transactions / ACID", "OLTP vs OLAP"],
    expertise: ["Index selectivity & covering", "Star vs snowflake schema", "MVCC and isolation levels", "Sharding & partitioning", "Query plans / EXPLAIN"],
  },
  econ: {
    essentials: ["Nominal vs real", "Inflation vs deflation", "CPI basket", "YoY vs MoM", "Seasonality"],
    expertise: ["Deflating series by CPI", "PPI vs CPI", "Core vs headline inflation", "Real wage analysis", "Index reweighting"],
  },
  kpi: {
    essentials: ["Leading vs lagging", "North Star metric", "Ratio vs absolute", "Numerator/denominator hygiene", "Vanity traps"],
    expertise: ["Metric trees", "Guardrails & counters", "Goodhart's law mitigation", "Metric instrumentation specs", "Driver decomposition"],
  },
  fe: {
    essentials: ["Standardize (μ=0, σ=1)", "One-hot vs label encode", "Handle missing values", "Train/test split", "Median for skewed features"],
    expertise: ["Target encoding out-of-fold", "Avoid target leakage", "Feature selection (MI, L1)", "Interaction features", "RobustScaler for outliers"],
  },
  pricing: {
    essentials: ["Demand curve intuition", "Elasticity sign & magnitude", "Margin = price − unit cost", "Revenue ≠ profit", "Promo lift vs cannibalization"],
    expertise: ["Constant-elasticity models", "Revenue-max at |ε|=1", "Profit-max with marginal cost", "Price tests & holdouts", "Willingness-to-pay surveys"],
  },
  anomaly: {
    essentials: ["Rolling mean / std", "Z-score thresholds", "Seasonality awareness", "YoY comparison", "Tracking-break check"],
    expertise: ["STL decomposition", "Robust z (MAD)", "Changepoint detection", "Prophet / ARIMA residuals", "Alert noise tuning"],
  },
  credit: {
    essentials: ["DTI ratio", "Credit utilization", "Tenure / age of credit", "Approval vs default tradeoff", "Threshold tuning"],
    expertise: ["Logistic regression scorecards", "WOE / IV feature prep", "Reject inference", "Population stability (PSI)", "Adverse-action reasoning"],
  },
};
