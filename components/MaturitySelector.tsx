"use client";

import { MATURITY_LEVELS } from "@/lib/constants";
import { cn } from "@/lib/cn";

interface MaturitySelectorProps {
  questionId: string;
  value: number | undefined;
  onChange: (value: number | undefined) => void;
}

const tintClass: Record<number, string> = {
  0: "border-red-500/40 bg-red-500/[0.08]",
  1: "border-orange-500/40 bg-orange-500/[0.08]",
  2: "border-amber-500/40 bg-amber-500/[0.08]",
  3: "border-lime-500/40 bg-lime-500/[0.08]",
  4: "border-emerald-500/40 bg-emerald-500/[0.08]",
};

export function MaturitySelector({
  questionId,
  value,
  onChange,
}: MaturitySelectorProps) {
  return (
    <div className="space-y-2" role="group" aria-labelledby={`${questionId}-label`}>
      {MATURITY_LEVELS.map((level) => {
        const selected = value === level.value;
        return (
          <button
            key={level.value}
            type="button"
            onClick={() =>
              onChange(selected ? undefined : level.value)
            }
            className={cn(
              "flex w-full items-center gap-3 rounded-lg border px-4 py-3 text-left transition",
              "border-white/[0.06] bg-black/20 hover:border-white/15",
              selected && tintClass[level.value],
            )}
          >
            <span
              className={cn("h-2.5 w-2.5 shrink-0 rounded-full", level.dot)}
            />
            <span className="text-sm text-zinc-200">
              <span className="font-mono text-xs text-zinc-500">
                {level.value}{" "}
              </span>
              {level.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
