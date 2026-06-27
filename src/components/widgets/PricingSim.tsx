import { useMemo, useState } from "react";
import { gradeAnswer } from "@/lib/grader";
import { useLS, LS, type ProgressMap, type LagEntry } from "@/lib/storage";

const BASE_PRICE = 40;
const BASE_QTY = 1000;
const ELASTICITY = -1.4;
const UNIT_COST = 18;
const SKILL = "pricing";
const LAG_TOPIC = "Pricing elasticity";
const KEYWORDS = ["elastic", "marginal", "profit", "revenue", "unit cost", "demand"];

function qtyAt(price: number) {
  // constant-elasticity demand: Q = Q0 * (P/P0)^e
  return BASE_QTY * Math.pow(price / BASE_PRICE, ELASTICITY);
}

export function PricingSim() {
  const [pct, setPct] = useState(0);
  const [answer, setAnswer] = useState("");
  const [graded, setGraded] = useState<null | ReturnType<typeof gradeAnswer>>(null);
  const [progress, setProgress] = useLS<ProgressMap>(LS.progress, {});
  const [lags, setLags] = useLS<LagEntry[]>(LS.lags, []);

  const price = useMemo(() => BASE_PRICE * (1 + pct / 100), [pct]);
  const qty = qtyAt(price);
  const revenue = price * qty;
  const profit = (price - UNIT_COST) * qty;
  const baseRev = BASE_PRICE * BASE_QTY;
  const baseProfit = (BASE_PRICE - UNIT_COST) * BASE_QTY;

  // sparkline of revenue across price range
  const curve = useMemo(() => {
    const pts: { p: number; r: number }[] = [];
    for (let d = -50; d <= 50; d += 2) {
      const pp = BASE_PRICE * (1 + d / 100);
      pts.push({ p: pp, r: pp * qtyAt(pp) });
    }
    const maxR = Math.max(...pts.map((x) => x.r));
    return pts.map((x, i) => ({
      x: (i / (pts.length - 1)) * 100,
      y: 40 - (x.r / maxR) * 36,
    }));
  }, []);

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

  const path = "M " + curve.map((p) => `${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(" L ");
  const markerX = ((pct + 50) / 100) * 100;

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-2 text-xs font-mono">
        <Stat label="Price" value={`$${price.toFixed(2)}`} delta={`${pct >= 0 ? "+" : ""}${pct}%`} />
        <Stat label="Quantity" value={qty.toFixed(0)} delta={`${(((qty - BASE_QTY) / BASE_QTY) * 100).toFixed(1)}%`} />
        <Stat label="Revenue" value={`$${revenue.toFixed(0)}`} delta={`${(((revenue - baseRev) / baseRev) * 100).toFixed(1)}%`} />
        <Stat label="Profit" value={`$${profit.toFixed(0)}`} delta={`${(((profit - baseProfit) / baseProfit) * 100).toFixed(1)}%`} />
      </div>
      <svg viewBox="0 0 100 42" className="w-full h-16 border border-[var(--rule)] rounded bg-[oklch(0.99_0.01_85)]">
        <path d={path} fill="none" stroke="var(--ink)" strokeWidth="0.6" />
        <line x1={markerX} y1="2" x2={markerX} y2="40" stroke="var(--accent)" strokeWidth="0.6" strokeDasharray="1 1" />
      </svg>
      <input
        type="range"
        min={-50}
        max={50}
        step={1}
        value={pct}
        onChange={(e) => setPct(Number(e.target.value))}
        className="w-full accent-[var(--accent)]"
      />
      <div className="text-[11px] font-mono text-[var(--muted-foreground)]">
        Baseline P=$40, Q=1000, ε={ELASTICITY}, unit cost ${UNIT_COST}
      </div>
      <p className="font-serif text-[14px] leading-snug pt-2 border-t border-[var(--rule)]">
        Which price maximizes <em>revenue</em>? Which maximizes <em>profit</em>? Why do they differ?
      </p>
      <textarea
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        disabled={!!graded}
        rows={3}
        placeholder="Explain using elasticity and marginal cost…"
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
            Revenue max sits where |ε|=1; profit max comes earlier because each unit must clear marginal (unit) cost. With ε=−1.4
            (elastic), price cuts grow revenue but profit peaks above unit cost — typically near $35 here.
          </div>
          <button onClick={() => { setGraded(null); setAnswer(""); }} className="px-2 py-1 rounded border border-[var(--rule)]">
            Retry
          </button>
        </div>
      )}
    </div>
  );
}

function Stat({ label, value, delta }: { label: string; value: string; delta: string }) {
  return (
    <div className="border border-[var(--rule)] rounded px-2 py-1.5 bg-[oklch(0.99_0.01_85)]">
      <div className="text-[10px] uppercase tracking-wider text-[var(--muted-foreground)]">{label}</div>
      <div className="text-sm text-[var(--ink)] tabular-nums">{value}</div>
      <div className="text-[10px] text-[var(--accent)] tabular-nums">{delta}</div>
    </div>
  );
}
