
## What I'll add

### 3 new interactive widgets (fixed seeds)

**1. Pricing Elasticity Sim** (`widgets/PricingSim.tsx`)
- Seeded baseline: price $40, qty 1000, elasticity −1.4, unit cost $18.
- Slider: price change −50%…+50%. Live readouts: new qty (constant-elasticity curve), revenue, gross profit, Δ vs baseline. Tiny ASCII/SVG revenue curve.
- Challenge prompt: "What price maximizes revenue? Profit? Explain why they differ."
- Typed answer → keyword grade (elasticity, marginal cost, |ε|>1, profit-max ≠ revenue-max). Feeds `progress`/`lags` under skill `pricing`.

**2. Anomaly Spotter** (`widgets/AnomalySpotter.tsx`)
- Seeded 30-day revenue sparkline (deterministic noise + one injected anomaly per scenario; 3 rotatable scenarios picked by `scenarioIdx` in localStorage, default 0).
- User clicks the day they think is anomalous, then types likely cause.
- Grade: correct day (±1) = +50%, keyword match on cause (tracking, promo, outage, seasonality, holiday) = remainder. Skill `anomaly`.

**3. Credit Risk Scorecard** (`widgets/CreditScorecard.tsx`)
- 4 weight sliders (income, DTI, utilization, tenure), sum auto-normalized to 1.
- Seeded population of 200 applicants (deterministic). Live: approval rate, expected default rate, expected $ loss vs $ revenue (simple formulas).
- Challenge: "Justify your weights. Which feature drives default most and why?"
- Keyword grade (DTI, utilization, tenure, feature importance, tradeoff, threshold). Skill `credit`.

### Challenge bank expansion (`lib/content/challenges.ts`)

Add new skills + questions covering the topics you listed:

- **`ds` Data structures** — hash map vs btree for lookups; when to use a heap.
- **`algo` Algorithm analysis** — Big-O of sort/scan/join; why O(n log n) joins beat nested loops.
- **`db` Databases** — index selectivity; OLTP vs OLAP; normalization vs denormalization for analytics.
- **`econ` Macro/CPI** — inflation vs deflation impact on nominal vs real revenue; what CPI measures; basket weights.
- **`kpi` KPIs** — leading vs lagging indicator; North Star vs guardrail; vanity metrics.
- **`fe` Feature engineering / selection** — why standardize (mean=0, std=1); when to use median (=0 after centering) over mean for skewed features; encoding categoricals; leakage; mutual information vs correlation for selection.

Each gets `expectedKeywords` + `modelAnswer` + `lagIndicatorTopic`, same pattern as today.

Also register new skills in `lib/content/skills-in-demand.ts` (so the skill filter dropdown in Interview Challenge shows them) and add `essentials`/`expertise` rows in `skill-ladder.ts` for the new skills.

### Wiring

- Extend `WidgetType` in `lib/storage.ts`: add `"pricingSim" | "anomalySpotter" | "creditScorecard"`.
- Register them in `WidgetBoard.tsx` `META` + `renderWidget` switch and in `AddWidgetDialog.tsx` catalog.
- Defaults stay as-is — new widgets are opt-in via "+ Add widget" so the board doesn't get crowded.
- All new widgets write to existing `portfolio.progress` / `portfolio.lags` keys so the **Lagging Indicators** widget surfaces weak spots from them too.

### Design

Match current "analyst worksheet" aesthetic: paper cards, mono labels, amber accent, dashed rules. Sliders styled with cream track + ink thumb; sparkline as inline SVG using `var(--ink)` + `var(--accent)` for the anomaly marker. No new fonts, no new deps.

### Files

Create: `src/components/widgets/PricingSim.tsx`, `AnomalySpotter.tsx`, `CreditScorecard.tsx`.
Edit: `src/lib/storage.ts`, `src/lib/content/challenges.ts`, `skills-in-demand.ts`, `skill-ladder.ts`, `src/components/dashboard/WidgetBoard.tsx`, `AddWidgetDialog.tsx`.
