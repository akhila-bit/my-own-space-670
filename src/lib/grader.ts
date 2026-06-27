export type GradeResult = {
  score: number; // 0..1
  matched: string[];
  missed: string[];
  verdict: "pass" | "partial" | "lag";
};

export function gradeAnswer(answer: string, keywords: string[]): GradeResult {
  const normalized = " " + answer.toLowerCase().replace(/[^a-z0-9\s%=()_-]/g, " ").replace(/\s+/g, " ") + " ";
  const matched: string[] = [];
  const missed: string[] = [];
  for (const kw of keywords) {
    const k = kw.toLowerCase();
    if (normalized.includes(" " + k + " ") || normalized.includes(k)) matched.push(kw);
    else missed.push(kw);
  }
  const score = keywords.length === 0 ? 0 : matched.length / keywords.length;
  const verdict: GradeResult["verdict"] = score >= 0.7 ? "pass" : score >= 0.4 ? "partial" : "lag";
  return { score, matched, missed, verdict };
}
