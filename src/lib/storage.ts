import { useEffect, useState, useCallback } from "react";

const isBrowser = typeof window !== "undefined";

export function readLS<T>(key: string, fallback: T): T {
  if (!isBrowser) return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function writeLS<T>(key: string, value: T) {
  if (!isBrowser) return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
    window.dispatchEvent(new CustomEvent("portfolio:storage", { detail: { key } }));
  } catch {}
}

export function useLS<T>(key: string, fallback: T): [T, (v: T | ((prev: T) => T)) => void] {
  const [val, setVal] = useState<T>(fallback);
  useEffect(() => {
    setVal(readLS<T>(key, fallback));
    const handler = (e: Event) => {
      const ce = e as CustomEvent<{ key: string }>;
      if (ce.detail?.key === key) setVal(readLS<T>(key, fallback));
    };
    window.addEventListener("portfolio:storage", handler);
    return () => window.removeEventListener("portfolio:storage", handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);
  const set = useCallback(
    (v: T | ((prev: T) => T)) => {
      setVal((prev) => {
        const next = typeof v === "function" ? (v as (p: T) => T)(prev) : v;
        writeLS(key, next);
        return next;
      });
    },
    [key],
  );
  return [val, set];
}

// Keys
export const LS = {
  profile: "portfolio.profile",
  widgets: "portfolio.widgets",
  projects: "portfolio.projects",
  checklist: "portfolio.checklist",
  progress: "portfolio.progress",
  lags: "portfolio.lags",
};

export type Profile = { name: string; role: string };
export type WidgetType =
  | "thought"
  | "skillsInDemand"
  | "essentialsVsExpertise"
  | "challenge"
  | "laggingIndicators"
  | "projects"
  | "clock";

export type WidgetInstance = { id: string; type: WidgetType };

export type Project = { id: string; title: string; oneLiner: string; link?: string };

export type SkillProgress = { attempts: number; passes: number; partials: number };
export type ProgressMap = Record<string, SkillProgress>;
export type LagEntry = { topic: string; skill: string; at: number };
