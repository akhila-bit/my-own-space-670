import { SKILLS_IN_DEMAND } from "@/lib/content/skills-in-demand";

export function SkillsInDemand() {
  return (
    <ol className="space-y-2">
      {SKILLS_IN_DEMAND.map((s, i) => (
        <li key={s.key} className="grid grid-cols-[1.5rem_1fr_auto] gap-3 items-baseline border-b border-dashed border-[var(--rule)] pb-1.5 last:border-0">
          <span className="font-mono text-xs text-[var(--muted-foreground)] tabular-nums">{String(i + 1).padStart(2, "0")}</span>
          <div>
            <div className="font-medium text-sm">{s.name}</div>
            <div className="text-xs text-[var(--muted-foreground)]">{s.blurb}</div>
          </div>
          <span className="font-mono text-[10px] tracking-wider text-[var(--accent)]" title={`Demand ${s.demand}/5`}>
            {"●".repeat(s.demand)}
            <span className="text-[var(--rule)]">{"○".repeat(5 - s.demand)}</span>
          </span>
        </li>
      ))}
    </ol>
  );
}
