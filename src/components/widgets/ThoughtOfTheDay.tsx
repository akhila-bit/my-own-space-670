import { THOUGHTS } from "@/lib/content/thoughts";

function slotForHour(h: number): "morning" | "afternoon" | "evening" {
  if (h < 12) return "morning";
  if (h < 18) return "afternoon";
  return "evening";
}

export function ThoughtOfTheDay() {
  const now = new Date();
  const slot = slotForHour(now.getHours());
  const dayIdx = Math.floor(now.getTime() / 86400000);
  const pool = THOUGHTS.filter((t) => t.slot === slot || t.slot === "any");
  const t = pool[dayIdx % pool.length] ?? THOUGHTS[0];
  return (
    <figure className="space-y-3">
      <div className="text-[11px] font-mono uppercase tracking-wider text-[var(--accent)]">{slot} brief</div>
      <blockquote className="font-serif text-lg leading-snug text-[var(--ink)]">
        <span className="text-[var(--accent)] mr-1">“</span>
        {t.text}
        <span className="text-[var(--accent)] ml-0.5">”</span>
      </blockquote>
      {t.author && <figcaption className="text-xs font-mono text-[var(--muted-foreground)]">— {t.author}</figcaption>}
    </figure>
  );
}
