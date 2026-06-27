import { useMemo, useState } from "react";
import { gradeAnswer } from "@/lib/grader";
import { useLS, LS, type ProgressMap, type LagEntry } from "@/lib/storage";

const SKILL = "anomaly";
const LAG_TOPIC = "Anomaly root-cause";
const KEYWORDS = ["tracking", "promo", "outage", "seasonality", "holiday", "campaign"];

// 3 fixed scenarios: deterministic noise + injected anomaly day
type Scenario = { id: string; label: string; anomalyDay: number; spike: number; cause: string };
const SCENARIOS: Scenario[] = [
  { id: "s1", label: "Sudden dip", anomalyDay: 17, spike: -0.55, cause: "Likely a tracking break or checkout outage on day 18." },
  { id: "s2", label: "Mystery spike", anomalyDay: 22, spike: 0.9, cause: "Promo or paid campaign launch — verify against marketing calendar." },
  { id: "s3", label: "Slow drift", anomalyDay: 11, spike: -0.35, cause: "Seasonality shift or a competitor promo — compare YoY." },
];

function seededSeries(seed: number, anomalyDay: number, spike: number) {
  // mulberry32
  let t = seed >>> 0;
  const rand = () => {
    t = (t + 0x6d2b79f5) >>> 0;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r = (r + Math.imul(r ^ (r >>> 7), 61 | r)) ^ r;
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
  const days: number[] = [];
  for (let i = 0; i < 30; i++) {
    const base = 100 + Math.sin(i / 4) * 8 + (rand() - 0.5) * 10;
    days.push(i === anomalyDay ? base * (1 + spike) : base);
  }
  return days;
}

export function AnomalySpotter() {
  const [scenIdx, setScenIdx] = useState(0);
  const scen = SCENARIOS[scenIdx];
  const series = useMemo(() => seededSeries(42 + scenIdx, scen.anomalyDay, scen.spike), [scenIdx, scen]);
  const [picked, setPicked] = useState<number | null>(null);
  const [answer, setAnswer] = useState("");
  const [graded, setGraded] = useState<null | { ok: boolean; verdict: "pass" | "partial" | "lag"; matched: string[] }>(null);

  const [progress, setProgress] = useLS<ProgressMap>(LS.progress, {});
  const [lags, setLags] = useLS<LagEntry[]>(LS.lags, []);

  const max = Math.max(...series);
  const min = Math.min(...series);

  const submit = () => {
    const dayOk = picked !== null && Math.abs(picked - scen.anomalyDay) <= 1;
    const kw = gradeAnswer(answer, KEYWORDS);
    const score = (dayOk ? 0.5 : 0) + kw.score * 0.5;
    const verdict: "pass" | "partial" | "lag" = score >= 0.7 ? "pass" : score >= 0.4 ? "partial" : "lag";
    setGraded({ ok: dayOk, verdict, matched: kw.matched });
    const prev = progress[SKILL] ?? { attempts: 0, passes: 0, partials: 0 };
    setProgress({
      ...progress,
      [SKILL]: {
        attempts: prev.attempts + 1,
        passes: prev.passes + (verdict === "pass" ? 1 : 0),
        partials: prev.partials + (verdict === "partial" ? 1 : 0),
      },
    });
    if (verdict !== "pass") {
      setLags([{ topic: LAG_TOPIC, skill: SKILL, at: Date.now() }, ...lags.filter((l) => l.topic !== LAG_TOPIC)].slice(0, 5));
    }
  };

  const next = () => {
    setScenIdx((i) => (i + 1) % SCENARIOS.length);
    setPicked(null);
    setAnswer("");
    setGraded(null);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between text-[11px] font-mono uppercase tracking-wider text-[var(--muted-foreground)]">
        <span>Scenario: {scen.label}</span>
        <span>Click the anomalous day</span>
      </div>
      <svg viewBox="0 0 300 80" className="w-full h-24 border border-[var(--rule)] rounded bg-[oklch(0.99_0.01_85)]">
        {series.map((v, i) => {
          const x = (i / 29) * 290 + 5;
          const y = 75 - ((v - min) / (max - min)) * 65;
          const isPicked = picked === i;
          return (
            <g key={i}>
              <circle
                cx={x}
                cy={y}
                r={isPicked ? 3.5 : 1.8}
                fill={isPicked ? "var(--accent)" : "var(--ink)"}
                className="cursor-pointer"
                onClick={() => setPicked(i)}
              />
              {i > 0 && (
                <line
                  x1={((i - 1) / 29) * 290 + 5}
                  y1={75 - ((series[i - 1] - min) / (max - min)) * 65}
                  x2={x}
                  y2={y}
                  stroke="var(--ink)"
                  strokeWidth="0.6"
                  opacity="0.5"
                />
              )}
            </g>
          );
        })}
        {graded && (
          <circle
            cx={(scen.anomalyDay / 29) * 290 + 5}
            cy={75 - ((series[scen.anomalyDay] - min) / (max - min)) * 65}
            r={5}
            fill="none"
            stroke="var(--destructive)"
            strokeWidth="0.8"
          />
        )}
      </svg>
      <div className="text-[11px] font-mono text-[var(--muted-foreground)]">
        Picked: {picked === null ? "—" : `Day ${picked + 1}`}
      </div>
      <textarea
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        disabled={!!graded}
        rows={2}
        placeholder="What likely caused it? (tracking, promo, outage, seasonality…)"
        className="w-full bg-[oklch(0.99_0.01_85)] border border-[var(--rule)] rounded-md px-3 py-2 text-sm font-mono focus:outline-none focus:border-[var(--accent)] disabled:opacity-70"
      />
      {!graded ? (
        <button
          onClick={submit}
          disabled={picked === null || !answer.trim()}
          className="px-3 py-1.5 rounded-md bg-[var(--ink)] text-[var(--primary-foreground)] text-sm font-mono disabled:opacity-40"
        >
          Submit
        </button>
      ) : (
        <div className="space-y-2 text-xs font-mono">
          <div className={graded.verdict === "pass" ? "text-green-700" : graded.verdict === "partial" ? "text-[var(--accent)]" : "text-[var(--destructive)]"}>
            {graded.verdict.toUpperCase()} · day {graded.ok ? "✓" : "✗"} · {graded.matched.length}/{KEYWORDS.length} causes named
          </div>
          <div className="text-[var(--muted-foreground)] font-serif text-sm border-l-2 border-[var(--accent)] pl-3">
            Anomaly was day {scen.anomalyDay + 1}. {scen.cause}
          </div>
          <button onClick={next} className="px-2 py-1 rounded bg-[var(--ink)] text-[var(--primary-foreground)]">
            Next scenario →
          </button>
        </div>
      )}
    </div>
  );
}
