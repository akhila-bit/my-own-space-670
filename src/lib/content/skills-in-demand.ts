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
];
