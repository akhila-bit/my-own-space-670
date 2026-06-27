import { useMemo, useState } from "react";
import { gradeAnswer } from "@/lib/grader";
import { useLS, LS, type ProgressMap, type LagEntry } from "@/lib/storage";

const SKILL = "credit";
const LAG_TOPIC = "Credit scorecard tradeoffs";
const KEYWORDS = ["dti", "utilization", "tenure", "tradeoff", "threshold", "default"];

// Seeded population of 200 applicants with hidden default labels.
type Applicant = { income: number; dti: number; util: number; tenure: number; defaulted: boolean };
function buildPop(): Applicant[] {
  let t = 1234;
  const rand = () => {
    t = (t + 0x6d2b79f5) >>> 0;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r = (r + Math.imul(r ^ (r >>> 7), 61 | r)) ^ r;
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
  const pop: Applicant[] = [];
  for (let i = 0; i < 200; i++) {
    const income = 0.2 + rand() * 0.8; // normalized
    const dti = rand(); // 0 good, 1 bad
    const util = rand();
    const tenure = rand(); // 1 = long
    // hidden true risk: dti & utilization dominate
    const risk = dti * 0.45 + util * 0.35 + (1 - tenure) * 0.15 + (1 - income) * 0.05 + (rand() - 0.5) * 0.1;
    pop.push({ income, dti, util, tenure, defaulted: risk > 0.55 });
  }
  return pop;
}
const POP = buildPop();

export function CreditScorecard() {
  const [wi, setWi] = useState(20);
  const [wd, setWd] = useState(35);
  const [wu, setWu] = useState(30);
  const [wt, setWt] = useState(15);
  const [threshold, setThreshold] = useState(50);
  const [answer, setAnswer] = useState("");
  const [graded, setGraded] = useState<null | ReturnType<typeof gradeAnswer>>(null);
  const [progress, setProgress] = useLS<ProgressMap>(LS.progress, {});
  const [lags, setLags] = useLS<LagEntry[]>(LS.lags, []);

  const stats = useMemo(() => {
    const sum = wi + wd + wu + wt || 1;
    const n = { i: wi / sum, d: wd / sum, u: wu / sum, t: wt / sum };
    let approved = 0;
    let approvedDefaults = 0;
    for (const a of POP) {
      // higher score = safer
      const score = a.income * n.i + (1 - a.dti) * n.d + (1 - a.util) * n.u + a.tenure * n.t;
      if (score * 100 >= threshold) {
        approved++;
        if (a.defaulted) approvedDefaults++;
      }
    }
    const approvalRate = (approved / POP.length) * 100;
    const defaultRate = approved ? (approvedDefaults / approved) * 100 : 0;
    return { approvalRate, defaultRate, approved, approvedDefaults };
  }, [wi, wd, wu, wt, threshold]);

  const submit = () => {
    const r = gradeAnswer(answer, KEYWORDS);
    setGraded(r);
    const prev = progress[SKILL] ?? { attempts: 0, passes: 0, partials: 0 };
    setProgress({
      ...progress,
      [SKILL]: {
        attempts: prev.attempts + 1,
        passes: prev.passes + (r.verdict === "pass" ? 1 : 0),
        partials: prev.partials + (r.verdict === "partial" ? 1 : 0),
      },
    });
    if (r.verdict !== "pass") {
      setLags([{ topic: LAG_TOPIC, skill: SKILL, at: Date.now() }, ...lags.filter((l) => l.topic !== LAG_TOPIC)].slice(0, 5));
    }
  };

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-2 text-xs font-mono">
        <Stat label="Approval rate" value={`${stats.approvalRate.toFixed(1)}%`} />
        <Stat label="Default rate" value={`${stats.defaultRate.toFixed(1)}%`} tone={stats.defaultRate > 15 ? "bad" : "ok"} />
        <Stat label="Approved" value={`${stats.approved}/200`} />
        <Stat label="Defaults in book" value={`${stats.approvedDefaults}`} />
      </div>
      <div className="space-y-1.5">
        <Slider label="Income weight" value={wi} onChange={setWi} />
        <Slider label="DTI weight" value={wd} onChange={setWd} />
        <Slider label="Utilization weight" value={wu} onChange={setWu} />
        <Slider label="Tenure weight" value={wt} onChange={setWt} />
        <Slider label="Approve threshold" value={threshold} onChange={setThreshold} max={100} accent />
      </div>
      <p className="font-serif text-[14px] leading-snug pt-2 border-t border-[var(--rule)]">
        Justify your weights. Which feature drives default most, and what's the tradeoff at this threshold?
      </p>
      <textarea
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        disabled={!!graded}
        rows={3}
        placeholder="Mention DTI, utilization, tenure, threshold tradeoff…"
        className="w-full bg-[oklch(0.99_0.01_85)] border border-[var(--rule)] rounded-md px-3 py-2 text-sm font-mono focus:outline-none focus:border-[var(--accent)] disabled:opacity-70"
      />
      {!graded ? (
        <button
          onClick={submit}
          disabled={!answer.trim()}
          className="px-3 py-1.5 rounded-md bg-[var(--ink)] text-[var(--primary-foreground)] text-sm font-mono disabled:opacity-40"
        >
          Submit
        </button>
      ) : (
        <div className="space-y-2 text-xs font-mono">
          <div className={graded.verdict === "pass" ? "text-green-700" : graded.verdict === "partial" ? "text-[var(--accent)]" : "text-[var(--destructive)]"}>
            {graded.verdict.toUpperCase()} · {graded.matched.length}/{KEYWORDS.length} key concepts
          </div>
          <div className="text-[var(--muted-foreground)] font-serif text-sm border-l-2 border-[var(--accent)] pl-3">
            In this seeded population, DTI (~0.45) and utilization (~0.35) dominate default risk; tenure helps modestly; income is
            mostly noise once DTI is controlled. Raising the threshold cuts default rate but shrinks the book — classic
            precision/recall tradeoff.
          </div>
          <button onClick={() => { setGraded(null); setAnswer(""); }} className="px-2 py-1 rounded border border-[var(--rule)]">
            Retry
          </button>
        </div>
      )}
    </div>
  );
}

function Stat({ label, value, tone }: { label: string; value: string; tone?: "ok" | "bad" }) {
  return (
    <div className="border border-[var(--rule)] rounded px-2 py-1.5 bg-[oklch(0.99_0.01_85)]">
      <div className="text-[10px] uppercase tracking-wider text-[var(--muted-foreground)]">{label}</div>
      <div className={`text-sm tabular-nums ${tone === "bad" ? "text-[var(--destructive)]" : "text-[var(--ink)]"}`}>{value}</div>
    </div>
  );
}

function Slider({
  label,
  value,
  onChange,
  max = 50,
  accent,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  max?: number;
  accent?: boolean;
}) {
  return (
    <label className="block text-[11px] font-mono">
      <div className="flex justify-between text-[var(--muted-foreground)]">
        <span className={accent ? "text-[var(--accent)]" : ""}>{label}</span>
        <span className="tabular-nums">{value}</span>
      </div>
      <input
        type="range"
        min={0}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-[var(--accent)]"
      />
    </label>
  );
}
