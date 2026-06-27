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
};
