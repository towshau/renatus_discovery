import { PILLAR_WEIGHTS } from "./constants";
import { isMaturityNa, isMaturityNumeric } from "./maturity";
import {
  PHASES,
  SCORED_PHASE_IDS,
  type Phase,
  getMaturityQuestionIds,
} from "./phases";

export interface PhaseScoreResult {
  average: number;
  /** Maturity questions included in the average (numeric 0–4) */
  count: number;
  /** Maturity questions that apply to this pillar (excludes N/A) */
  applicable: number;
}

export interface PillarUrgencyRow {
  phaseId: string;
  title: string;
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

  const applicableIds = maturityIds.filter(
    (mid) => !isMaturityNa(answers[mid]),
  );

  const values: number[] = [];
  for (const mid of maturityIds) {
    const v = answers[mid];
    if (isMaturityNumeric(v)) values.push(v);
  }

  if (values.length === 0) return null;

  const sum = values.reduce((a, b) => a + b, 0);
  return {
    average: sum / values.length,
    count: values.length,
    applicable: applicableIds.length,
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

/** Maturity questions answered with a numeric score (0–4); N/A excluded */
export function countAnsweredMaturity(
  answers: Record<string, string | number>,
): number {
  let n = 0;
  for (const id of getMaturityQuestionIds()) {
    const v = answers[id];
    if (isMaturityNumeric(v)) n += 1;
  }
  return n;
}

/** Total maturity items that count toward scoring (excludes N/A) */
export function getApplicableMaturityCount(
  answers: Record<string, string | number>,
): number {
  let n = 0;
  for (const id of getMaturityQuestionIds()) {
    if (!isMaturityNa(answers[id])) n += 1;
  }
  return n;
}

export function countMaturityNa(
  answers: Record<string, string | number>,
): number {
  let n = 0;
  for (const id of getMaturityQuestionIds()) {
    if (isMaturityNa(answers[id])) n += 1;
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
