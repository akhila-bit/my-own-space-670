import { useState } from "react";
import { Plus } from "lucide-react";
import type { WidgetType } from "@/lib/storage";

const CATALOG: { type: WidgetType; name: string; desc: string }[] = [
  { type: "thought", name: "Thought of the Day", desc: "Rotating quote for analysts." },
  { type: "skillsInDemand", name: "Skills in Demand", desc: "Ranked Data Analytics skill stack." },
  { type: "essentialsVsExpertise", name: "Essentials vs Expertise", desc: "Beginner checklist vs advanced ladder." },
  { type: "challenge", name: "Interview Challenge", desc: "Typed answer, keyword-graded." },
  { type: "laggingIndicators", name: "Lagging Indicators", desc: "Weak topics surfaced from your answers." },
  { type: "projects", name: "My Projects", desc: "One-line project cards you can edit." },
  { type: "clock", name: "Clock + Greeting", desc: "Time and a tailored hello." },
  { type: "pricingSim", name: "Pricing Elasticity Sim", desc: "Ecomm: slider, live revenue & profit, typed rationale." },
  { type: "anomalySpotter", name: "Anomaly Spotter", desc: "Click the spike in a 30-day revenue series + name the cause." },
  { type: "creditScorecard", name: "Credit Risk Scorecard", desc: "Fintech: weight sliders, approval & default tradeoff." },
];

export function AddWidgetDialog({ existing, onAdd }: { existing: WidgetType[]; onAdd: (t: WidgetType) => void }) {
  const [open, setOpen] = useState(false);
  const reAddable: WidgetType[] = ["projects", "thought", "challenge", "pricingSim", "anomalySpotter", "creditScorecard"];
  const available = CATALOG.filter((c) => !existing.includes(c.type) || reAddable.includes(c.type));
  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[var(--ink)] text-[var(--primary-foreground)] text-sm font-mono hover:opacity-90 transition"
      >
        <Plus className="w-4 h-4" /> Add widget
      </button>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4" onClick={() => setOpen(false)}>
          <div
            className="paper rounded-md w-full max-w-lg max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <header className="px-4 py-3 border-b border-[var(--rule)] flex items-center justify-between">
              <h3 className="font-mono text-sm uppercase tracking-wider">Widget catalog</h3>
              <button onClick={() => setOpen(false)} className="text-[var(--muted-foreground)] hover:text-[var(--ink)]">
                ×
              </button>
            </header>
            <ul className="divide-y divide-[var(--rule)]">
              {available.map((c) => (
                <li key={c.type}>
                  <button
                    onClick={() => {
                      onAdd(c.type);
                      setOpen(false);
                    }}
                    className="w-full text-left px-4 py-3 hover:bg-[oklch(0.95_0.025_85)] transition flex items-start gap-3"
                  >
                    <Plus className="w-4 h-4 mt-0.5 text-[var(--accent)]" />
                    <div>
                      <div className="font-medium text-sm">{c.name}</div>
                      <div className="text-xs text-[var(--muted-foreground)] font-mono">{c.desc}</div>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}
