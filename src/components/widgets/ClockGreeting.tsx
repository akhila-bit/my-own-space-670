import { useEffect, useState } from "react";
import { useLS, LS, type Profile } from "@/lib/storage";

export function ClockGreeting() {
  const [now, setNow] = useState(() => new Date());
  const [profile] = useLS<Profile>(LS.profile, { name: "Analyst", role: "Data Analyst" });

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const h = now.getHours();
  const greet = h < 12 ? "Good morning" : h < 18 ? "Good afternoon" : "Good evening";
  const time = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" });
  const date = now.toLocaleDateString([], { weekday: "long", month: "long", day: "numeric" });

  return (
    <div className="flex flex-col gap-1">
      <div className="font-mono text-3xl tabular-nums tracking-tight text-[var(--ink)]">{time}</div>
      <div className="text-xs font-mono uppercase tracking-wider text-[var(--muted-foreground)]">{date}</div>
      <div className="mt-2 text-sm font-serif">
        {greet}, <span className="text-[var(--accent)]">{profile.name}</span>. Ready to ship signal.
      </div>
    </div>
  );
}
