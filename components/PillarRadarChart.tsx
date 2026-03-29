"use client";

import { PHASES, SCORED_PHASE_IDS } from "@/lib/phases";
import { computePhaseScore } from "@/lib/scoring";

const N = 6;
const SIZE = 300;
const CX = SIZE / 2;
const CY = SIZE / 2;
const R_MAX = 108;
const LABEL_R = R_MAX + 36;

const SHORT_LABEL: Record<string, string> = {
  brand_identity: "Brand",
  marketing_sales: "Marketing",
  operations: "Operations",
  data_systems: "Data",
  finance_admin: "Finance",
  team_culture: "Team",
};

function angleForIndex(i: number) {
  return -Math.PI / 2 + (i * 2 * Math.PI) / N;
}

function hexPolygonPoints(r: number): string {
  return Array.from({ length: N }, (_, i) => {
    const a = angleForIndex(i);
    return `${CX + r * Math.cos(a)},${CY + r * Math.sin(a)}`;
  }).join(" ");
}

interface PillarRadarChartProps {
  answers: Record<string, string | number>;
}

export function PillarRadarChart({ answers }: PillarRadarChartProps) {
  const values = SCORED_PHASE_IDS.map((id) => {
    const ps = computePhaseScore(answers, id);
    return ps?.average ?? 0;
  });

  const points = values.map((v, i) => {
    const t = (Math.min(4, Math.max(0, v)) / 4) * R_MAX;
    const a = angleForIndex(i);
    return [CX + t * Math.cos(a), CY + t * Math.sin(a)] as const;
  });

  const polyPoints = points.map((p) => p.join(",")).join(" ");

  const gridLevels = [0.25, 0.5, 0.75, 1];

  return (
    <svg
      width={SIZE}
      height={SIZE}
      viewBox={`0 0 ${SIZE} ${SIZE}`}
      className="pillar-radar-chart max-w-full shrink-0"
      aria-label="Radar chart of pillar maturity scores from 0 to 4"
      role="img"
    >
      <title>Pillar maturity radar (0 to 4 on each axis)</title>
      {gridLevels.map((g) => (
        <polygon
          key={g}
          points={hexPolygonPoints(R_MAX * g)}
          fill="none"
          stroke="#e4e4e7"
          strokeWidth={1}
        />
      ))}

      {SCORED_PHASE_IDS.map((_, i) => {
        const a = angleForIndex(i);
        const x2 = CX + R_MAX * Math.cos(a);
        const y2 = CY + R_MAX * Math.sin(a);
        return (
          <line
            key={i}
            x1={CX}
            y1={CY}
            x2={x2}
            y2={y2}
            stroke="#e4e4e7"
            strokeWidth={1}
          />
        );
      })}

      <polygon
        points={polyPoints}
        fill="rgba(24, 24, 27, 0.1)"
        stroke="#18181b"
        strokeWidth={1.5}
        strokeLinejoin="round"
      />

      {SCORED_PHASE_IDS.map((phaseId, i) => {
        const a = angleForIndex(i);
        const lx = CX + LABEL_R * Math.cos(a);
        const ly = CY + LABEL_R * Math.sin(a);
        const label = SHORT_LABEL[phaseId] ?? PHASES.find((p) => p.id === phaseId)?.title ?? phaseId;
        return (
          <text
            key={phaseId}
            x={lx}
            y={ly}
            textAnchor="middle"
            dominantBaseline="middle"
            className="fill-zinc-600 text-[9px] font-medium md:text-[10px]"
          >
            {label}
          </text>
        );
      })}
    </svg>
  );
}
