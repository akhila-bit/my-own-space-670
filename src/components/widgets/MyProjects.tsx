import { useState } from "react";
import { Plus, Trash2, ExternalLink } from "lucide-react";
import { useLS, LS, type Project } from "@/lib/storage";

const DEFAULTS: Project[] = [
  { id: "p1", title: "Churn cohort dashboard", oneLiner: "Weekly retention curves by acquisition channel in Tableau." },
  { id: "p2", title: "Pricing A/B analysis", oneLiner: "Designed + analyzed a 4-week pricing experiment; +6.2% ARPU." },
];

export function MyProjects() {
  const [projects, setProjects] = useLS<Project[]>(LS.projects, DEFAULTS);
  const [title, setTitle] = useState("");
  const [oneLiner, setOneLiner] = useState("");
  const [link, setLink] = useState("");

  const add = () => {
    if (!title.trim() || !oneLiner.trim()) return;
    setProjects([
      { id: Math.random().toString(36).slice(2), title: title.trim(), oneLiner: oneLiner.trim(), link: link.trim() || undefined },
      ...projects,
    ]);
    setTitle("");
    setOneLiner("");
    setLink("");
  };

  return (
    <div className="space-y-3">
      <ul className="space-y-2">
        {projects.map((p) => (
          <li key={p.id} className="group border-l-2 border-[var(--accent)] pl-3 py-1 flex items-start justify-between gap-2">
            <div className="min-w-0">
              <div className="font-medium text-sm flex items-center gap-1.5">
                {p.title}
                {p.link && (
                  <a href={p.link} target="_blank" rel="noreferrer" className="text-[var(--muted-foreground)] hover:text-[var(--accent)]">
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
              <div className="text-xs text-[var(--muted-foreground)]">{p.oneLiner}</div>
            </div>
            <button
              onClick={() => setProjects(projects.filter((x) => x.id !== p.id))}
              className="opacity-0 group-hover:opacity-100 transition text-[var(--muted-foreground)] hover:text-[var(--destructive)]"
              aria-label="Delete project"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </li>
        ))}
        {projects.length === 0 && (
          <li className="text-xs text-[var(--muted-foreground)] font-serif italic">No projects yet — add one below.</li>
        )}
      </ul>
      <div className="border-t border-dashed border-[var(--rule)] pt-3 space-y-2">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Project title"
          className="w-full bg-transparent border border-[var(--rule)] rounded px-2 py-1 text-sm focus:outline-none focus:border-[var(--accent)]"
        />
        <input
          value={oneLiner}
          onChange={(e) => setOneLiner(e.target.value)}
          placeholder="One-line description"
          className="w-full bg-transparent border border-[var(--rule)] rounded px-2 py-1 text-sm focus:outline-none focus:border-[var(--accent)]"
        />
        <div className="flex gap-2">
          <input
            value={link}
            onChange={(e) => setLink(e.target.value)}
            placeholder="Link (optional)"
            className="flex-1 bg-transparent border border-[var(--rule)] rounded px-2 py-1 text-xs font-mono focus:outline-none focus:border-[var(--accent)]"
          />
          <button
            onClick={add}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-[var(--ink)] text-[var(--primary-foreground)] text-xs font-mono"
          >
            <Plus className="w-3 h-3" /> Add
          </button>
        </div>
      </div>
    </div>
  );
}
