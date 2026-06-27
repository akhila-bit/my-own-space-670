import { useState } from "react";
import { useLS, LS, type Profile } from "@/lib/storage";
import { Pencil } from "lucide-react";

export function Header() {
  const [profile, setProfile] = useLS<Profile>(LS.profile, { name: "Analyst", role: "Data Analyst" });
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(profile.name);

  return (
    <header className="border-b border-[var(--rule)] bg-[oklch(0.97_0.02_85)]/80 backdrop-blur sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-md bg-[var(--ink)] text-[var(--primary-foreground)] grid place-items-center font-mono font-bold">
            §
          </div>
          <div>
            <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--muted-foreground)]">
              Worksheet · {profile.role}
            </div>
            {editing ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setProfile({ ...profile, name: draft.trim() || "Analyst" });
                  setEditing(false);
                }}
                className="flex items-center gap-1"
              >
                <input
                  autoFocus
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  onBlur={() => {
                    setProfile({ ...profile, name: draft.trim() || "Analyst" });
                    setEditing(false);
                  }}
                  className="bg-transparent border-b border-[var(--accent)] text-lg font-serif focus:outline-none"
                />
              </form>
            ) : (
              <button
                onClick={() => {
                  setDraft(profile.name);
                  setEditing(true);
                }}
                className="group flex items-center gap-1.5 text-lg font-serif text-[var(--ink)]"
              >
                {profile.name}'s portfolio
                <Pencil className="w-3.5 h-3.5 opacity-0 group-hover:opacity-60 transition" />
              </button>
            )}
          </div>
        </div>
        <div className="hidden sm:block text-xs font-mono text-[var(--muted-foreground)] text-right">
          Personalized dashboard
          <br />
          <span className="text-[var(--accent)]">iGoogle-style · drag · add · remove</span>
        </div>
      </div>
    </header>
  );
}
