export const BG = "#0A0A0F";
export const ACCENT = "#6366F1";

export const MATURITY_LEVELS = [
  { value: 0, label: "Non-existent", color: "#DC2626", dot: "bg-red-600" },
  { value: 1, label: "Ad-hoc / Manual", color: "#EA580C", dot: "bg-orange-600" },
  { value: 2, label: "Basic / Inconsistent", color: "#D97706", dot: "bg-amber-600" },
  { value: 3, label: "Defined & Working", color: "#65A30D", dot: "bg-lime-600" },
  { value: 4, label: "Optimised & Automated", color: "#059669", dot: "bg-emerald-600" },
] as const;

export const PILLAR_WEIGHTS: Record<string, number> = {
  brand_identity: 0.8,
  marketing_sales: 1.0,
  operations: 1.3,
  data_systems: 1.2,
  finance_admin: 1.1,
  team_culture: 1.0,
};

export function scoreToMaturityColor(score: number): string {
  if (score <= 1) return "#DC2626";
  if (score <= 2) return "#EA580C";
  if (score <= 3) return "#D97706";
  if (score <= 3.5) return "#65A30D";
  return "#059669";
}

/** Ring / headline colour bands for overall score (0–4) */
export function overallScoreToRingColor(score: number): string {
  if (score <= 1.5) return "#DC2626";
  if (score <= 2.5) return "#EA580C";
  if (score <= 3.0) return "#D97706";
  return "#059669";
}
