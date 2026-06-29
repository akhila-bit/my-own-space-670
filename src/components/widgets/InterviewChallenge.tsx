import { useMemo, useState } from "react";
import { CHALLENGES, type Challenge } from "@/lib/content/challenges";
import { SKILLS_IN_DEMAND } from "@/lib/content/skills-in-demand";
import { gradeAnswer, type GradeResult } from "@/lib/grader";
import { useLS, LS, type ProgressMap, type LagEntry } from "@/lib/storage";

export function InterviewChallenge() {
  const [skillFilter, setSkillFilter] = useState<string>("all");
  const pool = useMemo(
    () => (skillFilter === "all" ? CHALLENGES : CHALLENGES.filter((c) => c.skill === skillFilter)),
    [skillFilter],
  );
  const [idx, setIdx] = useState(0);
  const q: Challenge | undefined = pool[idx % Math.max(pool.length, 1)];
  const [answer, setAnswer] = useState("");
  const [result, setResult] = useState<GradeResult | null>(null);
  const [showModel, setShowModel] = useState(false);

  const [progress, setProgress] = useLS<ProgressMap>(LS.progress, {});
  const [lags, setLags] = useLS<LagEntry[]>(LS.lags, []);

  if (!q) return <div className="text-sm text-[var(--muted-foreground)]">No challenge in this filter.</div>;

  const submit = () => {
    const r = gradeAnswer(answer, q.expectedKeywords);
    setResult(r);
    const prev = progress[q.skill] ?? { attempts: 0, passes: 0, partials: 0 };
    setProgress({
      ...progress,
      [q.skill]: {
        attempts: prev.attempts + 1,
        passes: prev.passes + (r.verdict === "pass" ? 1 : 0),
        partials: prev.partials + (r.verdict === "partial" ? 1 : 0),
      },
    });
    if (r.verdict !== "pass") {
      const entry: LagEntry = { topic: q.lagIndicatorTopic, skill: q.skill, at: Date.now() };
      const next = [entry, ...lags.filter((l) => l.topic !== q.lagIndicatorTopic)].slice(0, 5);
      setLags(next);
    }
  };

  const next = () => {
    if (pool.length > 1) {
      let n = idx;
      while (n % pool.length === idx % pool.length) {
        n = Math.floor(Math.random() * pool.length * 7) + idx + 1;
      }
      setIdx(n);
    } else {
      setIdx((i) => i + 1);
    }
    setAnswer("");
    setResult(null);
    setShowModel(false);
  };

  const verdictColor =
    result?.verdict === "pass"
      ? "text-green-700"
      : result?.verdict === "partial"
      ? "text-[var(--accent)]"
      : "text-[var(--destructive)]";

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <select
          value={skillFilter}
          onChange={(e) => {
            setSkillFilter(e.target.value);
            setIdx(0);
            setAnswer("");
            setResult(null);
            setShowModel(false);
          }}
          className="bg-transparent border border-[var(--rule)] rounded-md px-2 py-1 text-xs font-mono"
        >
          <option value="all">All skills</option>
          {SKILLS_IN_DEMAND.map((s) => (
            <option key={s.key} value={s.key}>{s.name}</option>
          ))}
        </select>
        <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--muted-foreground)]">
          Q{idx + 1} · {SKILLS_IN_DEMAND.find((s) => s.key === q.skill)?.name}
        </span>
      </div>

      <p className="font-serif text-[15px] leading-snug">{q.question}</p>

      <textarea
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        placeholder="Type your answer…"
        rows={4}
        disabled={!!result}
        className="w-full bg-[oklch(0.99_0.01_85)] border border-[var(--rule)] rounded-md px-3 py-2 text-sm font-mono focus:outline-none focus:border-[var(--accent)] disabled:opacity-70"
      />

      {!result ? (
        <div className="flex gap-2">
          <button
            onClick={submit}
            disabled={!answer.trim()}
            className="px-3 py-1.5 rounded-md bg-[var(--ink)] text-[var(--primary-foreground)] text-sm font-mono disabled:opacity-40"
          >
            Submit
          </button>
          <button onClick={next} className="px-3 py-1.5 rounded-md border border-[var(--rule)] text-sm font-mono">
            Skip
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          <div className="flex items-baseline justify-between">
            <span className={`font-mono text-sm uppercase tracking-wider ${verdictColor}`}>
              {result.verdict === "pass" ? "✓ Pass" : result.verdict === "partial" ? "~ Partial" : "✗ Lagging"}
            </span>
            <span className="font-mono text-xs text-[var(--muted-foreground)] tabular-nums">
              {result.matched.length}/{q.expectedKeywords.length} key concepts
            </span>
          </div>
          {result.missed.length > 0 && (
            <div className="text-xs">
              <span className="font-mono uppercase tracking-wider text-[var(--muted-foreground)]">Missed: </span>
              {result.missed.map((m) => (
                <span key={m} className="inline-block mr-1.5 mb-1 px-1.5 py-0.5 rounded bg-[oklch(0.92_0.04_85)] font-mono text-[11px]">
                  {m}
                </span>
              ))}
            </div>
          )}
          <button
            onClick={() => setShowModel((s) => !s)}
            className="text-xs font-mono underline text-[var(--muted-foreground)] hover:text-[var(--ink)]"
          >
            {showModel ? "Hide" : "Show"} model answer
          </button>
          {showModel && (
            <div className="text-sm border-l-2 border-[var(--accent)] pl-3 text-[var(--ink)] font-serif">
              {q.modelAnswer}
            </div>
          )}
          <button onClick={next} className="px-3 py-1.5 rounded-md bg-[var(--ink)] text-[var(--primary-foreground)] text-sm font-mono">
            Next question →
          </button>
        </div>
      )}
    </div>
  );
}
