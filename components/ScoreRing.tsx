"use client";

import { overallScoreToRingColor } from "@/lib/constants";

interface ScoreRingProps {
  score: number;
  maxScore?: number;
  size?: number;
  stroke?: number;
}

export function ScoreRing({
  score,
  maxScore = 4,
  size = 200,
  stroke = 12,
}: ScoreRingProps) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const pct = Math.min(1, Math.max(0, score / maxScore));
  const offset = c * (1 - pct);
  const color = overallScoreToRingColor(score);

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className="shrink-0"
      aria-hidden
    >
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke="#e4e4e7"
        strokeWidth={stroke}
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke={color}
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeDasharray={c}
        strokeDashoffset={offset}
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
        className="transition-[stroke-dashoffset] duration-1000 ease-out"
      />
    </svg>
  );
}
