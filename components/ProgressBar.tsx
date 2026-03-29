"use client";

import { cn } from "@/lib/cn";

interface ProgressBarProps {
  value: number;
  max: number;
  className?: string;
}

export function ProgressBar({ value, max, className }: ProgressBarProps) {
  const pct = max > 0 ? Math.min(100, (value / max) * 100) : 0;
  return (
    <div
      className={cn(
        "h-1 w-full overflow-hidden rounded-full bg-zinc-200",
        className,
      )}
    >
      <div
        className="h-full rounded-full bg-zinc-900 transition-[width] duration-500 ease-out"
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}
