import { useState } from "react";
import { SKILLS_IN_DEMAND } from "@/lib/content/skills-in-demand";
import { SKILL_LADDER } from "@/lib/content/skill-ladder";
import { useLS, LS } from "@/lib/storage";

type ChecklistState = Record<string, Record<string, boolean>>; // skill -> "essentials:0" -> true

export function EssentialsVsExpertise({ initialSkill }: { initialSkill?: string }) {
  const [skill, setSkill] = useState(initialSkill ?? "sql");
  const [checks, setChecks] = useLS<ChecklistState>(LS.checklist, {});
  const ladder = SKILL_LADDER[skill];
  const skillChecks = checks[skill] ?? {};

  const toggle = (key: string) => {
    setChecks({ ...checks, [skill]: { ...skillChecks, [key]: !skillChecks[key] } });
  };

  const Section = ({ title, items, prefix, accent }: { title: string; items: string[]; prefix: string; accent?: boolean }) => {
    const done = items.filter((_, i) => skillChecks[`${prefix}:${i}`]).length;
    return (
      <div>
        <div className="flex items-baseline justify-between mb-2">
          <h3 className={`text-[11px] font-mono uppercase tracking-wider ${accent ? "text-[var(--accent)]" : "text-[var(--ink)]"}`}>{title}</h3>
          <span className="font-mono text-[10px] text-[var(--muted-foreground)] tabular-nums">{done}/{items.length}</span>
        </div>
        <ul className="space-y-1.5">
          {items.map((item, i) => {
            const k = `${prefix}:${i}`;
            const on = !!skillChecks[k];
            return (
              <li key={k}>
                <label className="flex items-start gap-2 text-sm cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={on}
                    onChange={() => toggle(k)}
                    className="mt-0.5 accent-[var(--accent)]"
                  />
                  <span className={on ? "line-through text-[var(--muted-foreground)]" : ""}>{item}</span>
                </label>
              </li>
            );
          })}
        </ul>
      </div>
    );
  };

  return (
    <div className="space-y-4">
      <select
        value={skill}
        onChange={(e) => setSkill(e.target.value)}
        className="w-full bg-transparent border border-[var(--rule)] rounded-md px-2 py-1.5 text-sm font-mono focus:outline-none focus:border-[var(--accent)]"
      >
        {SKILLS_IN_DEMAND.map((s) => (
          <option key={s.key} value={s.key}>{s.name}</option>
        ))}
      </select>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Section title="Beginner Essentials" items={ladder.essentials} prefix="essentials" />
        <Section title="Expertise" items={ladder.expertise} prefix="expertise" accent />
      </div>
    </div>
  );
}
