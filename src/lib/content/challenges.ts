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
  {
    id: "ds-1",
    skill: "ds",
    question: "You need O(1) average lookups by user_id. Hash map or B-tree index, and why?",
    expectedKeywords: ["hash", "o(1)", "b-tree", "range", "ordered", "average"],
    lagIndicatorTopic: "Hash vs tree lookups",
    modelAnswer:
      "Hash map for O(1) average point lookups. B-tree wins when you also need range scans or ordered iteration (e.g. BETWEEN, ORDER BY).",
  },
  {
    id: "algo-1",
    skill: "algo",
    question: "Why is a hash join O(n+m) typically faster than a nested-loop join on large tables?",
    expectedKeywords: ["nested", "o(n*m)", "hash", "o(n+m)", "build", "probe"],
    lagIndicatorTopic: "Join algorithm Big-O",
    modelAnswer:
      "Nested loop is O(n*m) — scans inner table per outer row. Hash join builds a hash on one side O(n) then probes O(m), giving O(n+m). Sort-merge is O(n log n + m log m) and good when inputs are pre-sorted.",
  },
  {
    id: "db-1",
    skill: "db",
    question: "What is index selectivity and why does it matter for query planners?",
    expectedKeywords: ["selectivity", "distinct", "cardinality", "low", "high", "scan"],
    lagIndicatorTopic: "Index selectivity",
    modelAnswer:
      "Selectivity = fraction of distinct rows an index returns. High-selectivity (many distinct values) indexes are useful; low-selectivity ones (e.g. boolean) are often ignored — the planner picks a full scan instead.",
  },
  {
    id: "db-2",
    skill: "db",
    question: "Why denormalize for an analytics warehouse instead of keeping 3NF like an OLTP DB?",
    expectedKeywords: ["oltp", "olap", "join", "read", "wide", "denormal"],
    lagIndicatorTopic: "OLTP vs OLAP modeling",
    modelAnswer:
      "OLTP optimizes writes via normalization. OLAP optimizes reads: wide denormalized / star-schema tables minimize joins and let columnar engines prune columns. Storage is cheap; query latency isn't.",
  },
  {
    id: "econ-1",
    skill: "econ",
    question: "Revenue grew 6% YoY but CPI was 8%. Did the business actually grow?",
    expectedKeywords: ["real", "nominal", "inflation", "cpi", "deflate", "shrank"],
    lagIndicatorTopic: "Nominal vs real growth",
    modelAnswer:
      "No — in real terms revenue shrank ~2%. Nominal growth (6%) ignores inflation; deflate by CPI (8%) to get real growth ≈ −2%.",
  },
  {
    id: "econ-2",
    skill: "econ",
    question: "What does CPI measure, and why are basket weights important?",
    expectedKeywords: ["basket", "weight", "consumer", "price", "index", "representative"],
    lagIndicatorTopic: "CPI mechanics",
    modelAnswer:
      "CPI tracks the price of a representative consumer basket over time. Weights reflect spend share, so housing/food moves CPI more than minor categories. Wrong weights → biased inflation reading.",
  },
  {
    id: "kpi-1",
    skill: "kpi",
    question: "Distinguish a leading vs lagging indicator with one ecomm example each.",
    expectedKeywords: ["leading", "lagging", "predict", "outcome", "cart", "revenue"],
    lagIndicatorTopic: "Leading vs lagging KPIs",
    modelAnswer:
      "Leading predicts future outcomes (add-to-cart rate, signups). Lagging confirms past outcomes (revenue, churn). Steer with leading, judge with lagging.",
  },
  {
    id: "kpi-2",
    skill: "kpi",
    question: "What makes a metric a 'vanity metric' and how do you replace it?",
    expectedKeywords: ["vanity", "actionable", "decision", "engagement", "depth", "outcome"],
    lagIndicatorTopic: "Vanity metric traps",
    modelAnswer:
      "Vanity metrics (pageviews, signups, followers) trend up regardless of value. Replace with actionable, ratio/depth metrics tied to a decision: activation rate, paid conversion, D7 retention.",
  },
  {
    id: "fe-1",
    skill: "fe",
    question: "Why standardize features to mean=0, std=1 before fitting a linear or distance-based model?",
    expectedKeywords: ["scale", "mean", "std", "gradient", "distance", "regulariz"],
    lagIndicatorTopic: "Feature scaling",
    modelAnswer:
      "Distance and gradient methods are scale-sensitive: a large-range feature dominates. Standardizing (mean=0, std=1) puts features on equal footing, speeds convergence, and makes L1/L2 regularization fair.",
  },
  {
    id: "fe-2",
    skill: "fe",
    question: "You use the target to compute a feature (e.g. mean revenue per category) on the full dataset. What's wrong?",
    expectedKeywords: ["leakage", "target", "train", "test", "fold", "out-of-fold"],
    lagIndicatorTopic: "Target leakage",
    modelAnswer:
      "Target leakage — test rows influenced the feature, inflating validation scores. Compute target encodings out-of-fold or only on the training partition.",
  },
  {
    id: "fe-3",
    skill: "fe",
    question: "Skewed income with extreme outliers. Centre by mean or median? Why?",
    expectedKeywords: ["median", "robust", "outlier", "skew", "mean", "iqr"],
    lagIndicatorTopic: "Robust centering",
    modelAnswer:
      "Median — it's robust to outliers. Mean is pulled by the long tail. Pair with IQR scaling (RobustScaler) for the same reason.",
  },
];
