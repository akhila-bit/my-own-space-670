import { useLS, LS, type LagEntry, type ProgressMap } from "@/lib/storage";
import { SKILLS_IN_DEMAND } from "@/lib/content/skills-in-demand";

export function LaggingIndicators() {
  const [lags, setLags] = useLS<LagEntry[]>(LS.lags, []);
  const [progress] = useLS<ProgressMap>(LS.progress, {});

  if (lags.length === 0) {
    return (
      <div className="text-sm text-[var(--muted-foreground)] font-serif italic">
        No lagging topics yet. Submit answers in the Interview Challenge widget to surface weak spots here.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <ul className="space-y-2">
        {lags.map((l) => {
          const skillName = SKILLS_IN_DEMAND.find((s) => s.key === l.skill)?.name ?? l.skill;
          return (
            <li key={l.topic} className="flex items-start justify-between gap-2 border-b border-dashed border-[var(--rule)] pb-2 last:border-0">
              <div>
                <div className="font-medium text-sm flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--destructive)]" />
                  {l.topic}
                </div>
                <div className="text-[11px] font-mono text-[var(--muted-foreground)] uppercase tracking-wider">
                  {skillName} · {new Date(l.at).toLocaleDateString()}
                </div>
              </div>
              <button
                onClick={() => setLags(lags.filter((x) => x.topic !== l.topic))}
                className="text-[11px] font-mono text-[var(--muted-foreground)] hover:text-[var(--ink)] underline"
              >
                clear
              </button>
            </li>
          );
        })}
      </ul>
      {Object.keys(progress).length > 0 && (
        <div className="pt-2 border-t border-[var(--rule)]">
          <div className="text-[11px] font-mono uppercase tracking-wider text-[var(--muted-foreground)] mb-2">Attempt tally</div>
          <div className="space-y-1">
            {Object.entries(progress).map(([k, p]) => {
              const name = SKILLS_IN_DEMAND.find((s) => s.key === k)?.name ?? k;
              const passRate = p.attempts ? Math.round((p.passes / p.attempts) * 100) : 0;
              return (
                <div key={k} className="flex items-center gap-2 text-xs font-mono">
                  <span className="w-24 truncate">{name}</span>
                  <div className="flex-1 h-1.5 bg-[var(--rule)] rounded">
                    <div className="h-full bg-[var(--accent)] rounded" style={{ width: `${passRate}%` }} />
                  </div>
                  <span className="tabular-nums text-[var(--muted-foreground)] w-16 text-right">
                    {p.passes}/{p.attempts} · {passRate}%
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
