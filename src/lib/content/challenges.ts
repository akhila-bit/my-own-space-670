export type Challenge = {
  id: string;
  skill: string;
  question: string;
  expectedKeywords: string[]; // lowercase
  lagIndicatorTopic: string;
  modelAnswer: string;
};

export const CHALLENGES: Challenge[] = [
  {
    id: "sql-1",
    skill: "sql",
    question:
      "You have an `orders` table. Write the idea (in words or SQL) for finding the 2nd highest order amount per customer.",
    expectedKeywords: ["partition by", "row_number", "order by", "rank", "window", "= 2"],
    lagIndicatorTopic: "Window functions",
    modelAnswer:
      "Use a window function: ROW_NUMBER() OVER (PARTITION BY customer_id ORDER BY amount DESC) AS rn, then filter rn = 2.",
  },
  {
    id: "sql-2",
    skill: "sql",
    question: "Difference between INNER JOIN and LEFT JOIN, and when would you use each?",
    expectedKeywords: ["inner", "left", "matching", "null", "preserve", "missing"],
    lagIndicatorTopic: "Joins fundamentals",
    modelAnswer:
      "INNER returns only matching rows from both sides. LEFT preserves all rows from the left table; non-matches on the right become NULL. Use LEFT when you need to keep all left-side rows and detect missing matches.",
  },
  {
    id: "sql-3",
    skill: "sql",
    question: "What's a CTE and why use it over a subquery?",
    expectedKeywords: ["with", "common table", "readability", "reuse", "recursive"],
    lagIndicatorTopic: "CTEs",
    modelAnswer:
      "A CTE (WITH ... AS) names a query block so you can reference it later, improving readability and enabling recursion. Often clearer than nested subqueries.",
  },
  {
    id: "python-1",
    skill: "python",
    question: "In pandas, how would you compute average revenue per customer from a `df` with columns customer_id, revenue?",
    expectedKeywords: ["groupby", "customer_id", "mean", "revenue", "agg"],
    lagIndicatorTopic: "pandas groupby",
    modelAnswer: "df.groupby('customer_id')['revenue'].mean() — or .agg({'revenue': 'mean'}) for more columns.",
  },
  {
    id: "python-2",
    skill: "python",
    question: "Why prefer vectorized pandas ops over .apply with a Python loop?",
    expectedKeywords: ["vector", "c", "faster", "loop", "performance", "numpy"],
    lagIndicatorTopic: "Vectorization",
    modelAnswer:
      "Vectorized ops push work to C-level numpy code, avoiding Python-level per-row overhead. Orders of magnitude faster on large frames.",
  },
  {
    id: "stats-1",
    skill: "stats",
    question: "Explain what a p-value of 0.03 means in plain words.",
    expectedKeywords: ["null", "hypothesis", "probability", "observed", "as extreme", "assuming"],
    lagIndicatorTopic: "p-value interpretation",
    modelAnswer:
      "If the null hypothesis were true, there's a 3% chance of seeing data as extreme as what we observed. It is NOT the probability the null is true.",
  },
  {
    id: "stats-2",
    skill: "stats",
    question: "Why does correlation not imply causation? Give one mechanism.",
    expectedKeywords: ["confounder", "third", "variable", "causal", "spurious", "lurking"],
    lagIndicatorTopic: "Causal reasoning",
    modelAnswer:
      "A confounding variable can drive both. Ice cream sales and drownings correlate because both rise with summer temperature.",
  },
  {
    id: "ab-1",
    skill: "ab",
    question: "What is statistical power and why does it matter when designing an A/B test?",
    expectedKeywords: ["power", "detect", "effect", "false negative", "sample size", "1 - beta"],
    lagIndicatorTopic: "Experiment power",
    modelAnswer:
      "Power = probability of detecting a real effect (1 − β). Low power means you'll miss true wins. Drives required sample size.",
  },
  {
    id: "ab-2",
    skill: "ab",
    question: "What is a guardrail metric and why include one?",
    expectedKeywords: ["guardrail", "regression", "harm", "secondary", "protect", "side effect"],
    lagIndicatorTopic: "Guardrail metrics",
    modelAnswer:
      "A guardrail metric (e.g. page load time, error rate) protects against winning on your primary metric while harming the product elsewhere.",
  },
  {
    id: "viz-1",
    skill: "viz",
    question: "When would you choose a bar chart over a line chart?",
    expectedKeywords: ["categor", "discrete", "compare", "time", "continuous", "trend"],
    lagIndicatorTopic: "Chart choice",
    modelAnswer:
      "Bars for comparing discrete categories. Lines for continuous trends over time. Don't use lines for unordered categories.",
  },
  {
    id: "storytelling-1",
    skill: "storytelling",
    question: "What does BLUF mean in an exec data summary and why does it work?",
    expectedKeywords: ["bottom line", "up front", "recommendation", "first", "decision", "summary"],
    lagIndicatorTopic: "BLUF / exec comms",
    modelAnswer:
      "Bottom Line Up Front — lead with the recommendation/answer; details follow. Respects exec time and frames the rest as supporting evidence.",
  },
  {
    id: "excel-1",
    skill: "excel",
    question: "Why is XLOOKUP often preferred over VLOOKUP?",
    expectedKeywords: ["left", "default", "exact", "any direction", "not found", "flexible"],
    lagIndicatorTopic: "Lookup formulas",
    modelAnswer:
      "XLOOKUP can look left, defaults to exact match, supports a not-found argument, and returns arrays — VLOOKUP can do none of these cleanly.",
  },
  {
    id: "warehouse-1",
    skill: "warehouse",
    question: "Why is SELECT * costly on a columnar warehouse like BigQuery or Snowflake?",
    expectedKeywords: ["column", "scan", "bytes", "cost", "prune", "only"],
    lagIndicatorTopic: "Columnar cost model",
    modelAnswer:
      "Columnar stores bill by bytes scanned per column. SELECT * reads every column, defeating column pruning and inflating cost.",
  },
];
