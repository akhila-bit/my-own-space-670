export type DemandSkill = {
  key: string;
  name: string;
  blurb: string;
  demand: 1 | 2 | 3 | 4 | 5; // 5 = highest
};

export const SKILLS_IN_DEMAND: DemandSkill[] = [
  { key: "sql", name: "SQL", blurb: "Lingua franca of data. Joins, aggregations, window functions.", demand: 5 },
  { key: "excel", name: "Excel / Sheets", blurb: "Pivot tables, XLOOKUP, INDEX/MATCH, basic modeling.", demand: 4 },
  { key: "python", name: "Python (pandas)", blurb: "DataFrames, groupby, merges, cleaning, automation.", demand: 5 },
  { key: "stats", name: "Statistics", blurb: "Distributions, hypothesis testing, confidence intervals.", demand: 4 },
  { key: "viz", name: "Tableau / Power BI", blurb: "Dashboards stakeholders actually read.", demand: 5 },
  { key: "ab", name: "A/B Testing", blurb: "Experiment design, power, p-values, guardrails.", demand: 4 },
  { key: "storytelling", name: "Data Storytelling", blurb: "Translate findings into decisions in <5 slides.", demand: 5 },
  { key: "etl", name: "ETL Basics", blurb: "Sources → staging → models. Idempotency. Scheduling.", demand: 3 },
  { key: "warehouse", name: "Cloud Warehouses", blurb: "Snowflake / BigQuery / Redshift fundamentals.", demand: 4 },
  { key: "dbt", name: "dbt", blurb: "Modular SQL transforms, tests, lineage.", demand: 3 },
  { key: "ds", name: "Data Structures", blurb: "Hash maps, trees, heaps — pick the right shape for the lookup.", demand: 3 },
  { key: "algo", name: "Algorithm Analysis", blurb: "Big-O intuition for scans, sorts, joins.", demand: 3 },
  { key: "db", name: "Databases (general)", blurb: "Indexes, OLTP vs OLAP, normalization tradeoffs.", demand: 4 },
  { key: "econ", name: "Macro / CPI", blurb: "Inflation, deflation, nominal vs real, basket weights.", demand: 3 },
  { key: "kpi", name: "KPI Design", blurb: "Leading vs lagging, North Star, vanity-metric traps.", demand: 4 },
  { key: "fe", name: "Feature Engineering", blurb: "Standardize, encode, select — and avoid leakage.", demand: 4 },
  { key: "pricing", name: "Pricing & Elasticity", blurb: "Demand curves, revenue-max vs profit-max.", demand: 3 },
  { key: "anomaly", name: "Anomaly Detection", blurb: "Spot the spike, name the cause.", demand: 3 },
  { key: "credit", name: "Credit Risk", blurb: "Scorecards, DTI, utilization, default tradeoffs.", demand: 3 },
];
