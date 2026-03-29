import { PILLAR_WEIGHTS } from "./constants";
import {
  PHASES,
  SCORED_PHASE_IDS,
  type Phase,
  getMaturityQuestionIds,
} from "./phases";

export interface PhaseScoreResult {
  average: number;
  count: number;
  total: number;
}

export interface PillarUrgencyRow {
  phaseId: string;
  title: string;
  icon: string;
  average: number;
  gap: number;
  weight: number;
  urgency: number;
}

export interface RoadmapResult {
  pillars: PillarUrgencyRow[];
  fixNow: PillarUrgencyRow[];
  buildNext: PillarUrgencyRow[];
  optimiseLater: PillarUrgencyRow[];
}

function getPhaseById(id: string): Phase | undefined {
  return PHASES.find((p) => p.id === id);
}

export function computePhaseScore(
  answers: Record<string, string | number>,
  phaseId: string,
): PhaseScoreResult | null {
  const phase = getPhaseById(phaseId);
  if (!phase) return null;

  const maturityIds = phase.questions
    .filter((q) => q.type === "maturity")
    .map((q) => q.id);

  const values: number[] = [];
  for (const mid of maturityIds) {
    const v = answers[mid];
    if (typeof v === "number" && v >= 0 && v <= 4) values.push(v);
  }

  if (values.length === 0) return null;

  const sum = values.reduce((a, b) => a + b, 0);
  return {
    average: sum / values.length,
    count: values.length,
    total: maturityIds.length,
  };
}

export function computeOverallScore(
  answers: Record<string, string | number>,
): number {
  const avgs: number[] = [];
  for (const id of SCORED_PHASE_IDS) {
    const ps = computePhaseScore(answers, id);
    if (ps) avgs.push(ps.average);
  }
  if (avgs.length === 0) return 0;
  return avgs.reduce((a, b) => a + b, 0) / avgs.length;
}

export function countAnsweredMaturity(
  answers: Record<string, string | number>,
): number {
  let n = 0;
  for (const id of getMaturityQuestionIds()) {
    const v = answers[id];
    if (typeof v === "number" && v >= 0 && v <= 4) n += 1;
  }
  return n;
}

export function getTotalMaturityCount(): number {
  return getMaturityQuestionIds().length;
}

function bucketForUrgency(u: number): "fix" | "build" | "optimise" {
  if (u > 3) return "fix";
  if (u >= 1.5) return "build";
  return "optimise";
}

export function computeRoadmap(
  answers: Record<string, string | number>,
): RoadmapResult {
  const pillars: PillarUrgencyRow[] = [];

  for (const phaseId of SCORED_PHASE_IDS) {
    const ps = computePhaseScore(answers, phaseId);
    if (!ps) continue;

    const phase = getPhaseById(phaseId);
    if (!phase) continue;

    const weight = PILLAR_WEIGHTS[phaseId] ?? 1;
    const gap = 4 - ps.average;
    const urgency = gap * weight;

    pillars.push({
      phaseId,
      title: phase.title,
      icon: phase.icon,
      average: ps.average,
      gap,
      weight,
      urgency,
    });
  }

  pillars.sort((a, b) => b.urgency - a.urgency);

  const fixNow: PillarUrgencyRow[] = [];
  const buildNext: PillarUrgencyRow[] = [];
  const optimiseLater: PillarUrgencyRow[] = [];

  for (const row of pillars) {
    const b = bucketForUrgency(row.urgency);
    if (b === "fix") fixNow.push(row);
    else if (b === "build") buildNext.push(row);
    else optimiseLater.push(row);
  }

  return { pillars, fixNow, buildNext, optimiseLater };
}
