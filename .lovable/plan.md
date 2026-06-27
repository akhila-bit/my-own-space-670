
# Data Analytics Portfolio Dashboard (iGoogle-style, no auth, no AI)

A single-page iGoogle-style dashboard tailored to a **Data Analytics** profile. No sign-in, no backend AI calls. All content (in-demand skills, beginner→expert ladder, challenge questions, grading rules) is curated and shipped in the code. State lives in `localStorage`.

## Scope

In:
- Hardcoded Data Analytics knowledge base: in-demand skills, beginner-essentials vs expertise tiers, challenge-question bank with keyword-based grading
- iGoogle-style board: add/remove/reorder widgets
- User-editable project widgets (add/remove, one-line description, optional link)
- Lagging-indicator detection from typed answers (which sub-topics the user fumbles → highlighted as gaps)

Out:
- Auth, backend, database
- AI gateway / LLM calls of any kind (per user request)
- Resume PDF upload (replaced by curated DA profile)
- Other professions — DA only for now

## Stack

- TanStack Start (existing), client-only
- `@dnd-kit/core` + `@dnd-kit/sortable` for drag-and-drop
- `localStorage` for persistence
- shadcn UI primitives already present

## Single route

- `/` — the dashboard. Header has profile name (editable inline), "+ Add widget" button, and a settings menu (reset layout, clear data).

## Curated content (`src/lib/content/`)

- `skills-in-demand.ts` — ranked list of DA skills (SQL, Excel, Python/pandas, statistics, data viz/Tableau/Power BI, A/B testing, data storytelling, ETL basics, cloud warehouses, dbt) with short blurbs.
- `skill-ladder.ts` — for each skill: `essentials` (beginner checklist) and `expertise` (advanced checklist), e.g. SQL essentials = SELECT/JOIN/GROUP BY; expertise = window functions, CTEs, query plans.
- `challenges.ts` — bank of interview-style questions per skill. Each entry:
  ```
  { skill, question, expectedKeywords: string[], lagIndicatorTopic: string, modelAnswer }
  ```
  Grading = case-insensitive keyword coverage. Coverage ≥ 70% = pass, 40–70% = partial (logged as soft lag), <40% = lagging on `lagIndicatorTopic`.
- `thoughts.ts` — DA-tailored thought-of-the-day pool, with morning/afternoon/evening variants.

## Widgets (iGoogle-style)

Each widget = `{ id, type, settings, order }` in `localStorage`. Catalog:

1. **Thought of the Day** — rotates daily from `thoughts.ts`, time-of-day variant.
2. **Skills in Demand** — ranked list of DA skills with short blurbs.
3. **Beginner Essentials vs Expertise** — picker for any skill → side-by-side checklist; user ticks items, ticks persist.
4. **Interview Challenge** — draws a question from `challenges.ts` (cycle or skill-filtered), user types answer, grader scores it, lagging topics get pushed into…
5. **Lagging Indicators** — auto-populated list of topics the user has been weak on, with a "recommended next drill" link to the matching essentials/expertise card.
6. **My Projects** — user-editable text widgets. Each project = `{ title, oneLiner, link? }`. Add/remove inline; rendered as compact cards in a single widget.
7. **Clock + Greeting** (small utility widget).

Add/remove flow:
- "+ Add widget" → dialog lists catalog items not yet on the board (Thought, Projects can be re-added if removed).
- Each widget card has a drag handle and "×" remove. Order persists.
- Responsive grid: 1 / 2 / 3 columns.

## Lagging-indicator logic (no AI)

When the user submits an answer in the Challenge widget:
1. Normalize → lowercase, strip punctuation.
2. Compute keyword coverage against `expectedKeywords`.
3. Update `portfolio.progress[skill]` with `{ attempts, passes, partials, lastLagTopics[] }`.
4. If pass: streak++, XP+; if partial/fail: push `lagIndicatorTopic` to a rolling top-5 in `portfolio.lags`.
5. Lagging Indicators widget reads `portfolio.lags` and renders chips + "Practice now" CTA that opens the relevant Essentials checklist.

## localStorage keys

- `portfolio.profile` — `{ name, role: "Data Analyst" }`
- `portfolio.widgets` — ordered widget list
- `portfolio.projects` — user-added project cards
- `portfolio.checklist` — ticked items per skill (essentials/expertise)
- `portfolio.progress` — per-skill stats
- `portfolio.lags` — rolling lag-topic list

## File layout

```
src/
  routes/index.tsx
  components/
    dashboard/
      WidgetBoard.tsx          // dnd-kit sortable grid
      WidgetShell.tsx          // frame: title, drag handle, remove
      AddWidgetDialog.tsx
      Header.tsx
    widgets/
      ThoughtOfTheDay.tsx
      SkillsInDemand.tsx
      EssentialsVsExpertise.tsx
      InterviewChallenge.tsx
      LaggingIndicators.tsx
      MyProjects.tsx
      ClockGreeting.tsx
  lib/
    storage.ts                 // typed localStorage helpers
    grader.ts                  // keyword-coverage scoring
    content/
      skills-in-demand.ts
      skill-ladder.ts
      challenges.ts
      thoughts.ts
  styles.css
```

## Design direction

Distinctive, not generic. Proposed: **analyst's worksheet** aesthetic — soft cream background, deep navy ink, single warm accent (amber), monospaced numbers/keywords, subtle grid background reminiscent of a spreadsheet. Defined as semantic tokens in `src/styles.css`. Tell me if you'd rather have dark terminal or clean editorial; otherwise I'll build this.

## Confirm before build

- Design direction (analyst worksheet vs alternative)?
- Anything else to add/remove from the widget catalog?
