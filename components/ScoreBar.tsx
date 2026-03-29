"use client";

import { useEffect, useState } from "react";
import { scoreToMaturityColor } from "@/lib/constants";
import { cn } from "@/lib/cn";

interface ScoreBarProps {
  score: number;
  maxScore?: number;
  className?: string;
  label?: string;
  showValue?: boolean;
  /** When set, shown instead of numeric score (e.g. "—") */
  valueLabel?: string | null;
}

export function ScoreBar({
  score,
  maxScore = 4,
  className,
  label,
  showValue = true,
  valueLabel,
}: ScoreBarProps) {
  const [mounted, setMounted] = useState(false);
  const pct = Math.min(100, Math.max(0, (score / maxScore) * 100));
  const fillColor = scoreToMaturityColor(Math.min(maxScore, Math.max(0, score)));

  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <div className={cn("flex min-w-0 items-center gap-3", className)}>
      {label ? (
        <span className="w-40 shrink-0 text-sm text-zinc-300">{label}</span>
      ) : null}
      <div className="relative h-1.5 min-w-0 flex-1 overflow-hidden rounded-full bg-white/[0.08]">
        <div
          className="absolute left-0 top-0 h-full rounded-full transition-[width] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
          style={{
            width: mounted ? `${pct}%` : "0%",
            backgroundColor: fillColor,
          }}
        />
      </div>
      {showValue ? (
        <span
          className="min-w-[2.5rem] shrink-0 text-right font-mono text-sm font-medium tabular-nums text-zinc-200"
          style={{ fontFamily: "var(--font-jetbrains-mono)" }}
        >
          {valueLabel != null ? valueLabel : score.toFixed(1)}
        </span>
      ) : null}
    </div>
  );
}
