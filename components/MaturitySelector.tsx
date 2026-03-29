"use client";

import { CircleSlash } from "lucide-react";
import { MATURITY_NOT_APPLICABLE } from "@/lib/maturity";
import { MATURITY_LEVELS } from "@/lib/constants";
import { cn } from "@/lib/cn";

export type MaturitySelection = number | typeof MATURITY_NOT_APPLICABLE | undefined;

interface MaturitySelectorProps {
  questionId: string;
  value: MaturitySelection;
  onChange: (value: MaturitySelection) => void;
}

const tintClass: Record<number, string> = {
  0: "border-red-300 bg-red-50",
  1: "border-orange-300 bg-orange-50",
  2: "border-amber-300 bg-amber-50",
  3: "border-lime-300 bg-lime-50",
  4: "border-emerald-300 bg-emerald-50",
};

export function MaturitySelector({
  questionId,
  value,
  onChange,
}: MaturitySelectorProps) {
  const naSelected = value === MATURITY_NOT_APPLICABLE;

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
              "flex w-full items-center gap-3 rounded-md border px-4 py-3 text-left text-sm transition",
              "border-zinc-200 bg-zinc-50/80 hover:border-zinc-300",
              selected && tintClass[level.value],
            )}
          >
            <span
              className={cn("h-2.5 w-2.5 shrink-0 rounded-full", level.dot)}
            />
            <span className="text-sm text-zinc-800">
              <span className="font-mono text-xs text-zinc-500">
                {level.value}{" "}
              </span>
              {level.label}
            </span>
          </button>
        );
      })}

      <button
        type="button"
        onClick={() =>
          onChange(naSelected ? undefined : MATURITY_NOT_APPLICABLE)
        }
        className={cn(
          "flex w-full items-center gap-3 rounded-md border px-4 py-3 text-left text-sm transition",
          "border-zinc-200 bg-zinc-50/80 hover:border-zinc-300",
          naSelected && "border-zinc-400 bg-zinc-100",
        )}
      >
        <CircleSlash
          className="h-4 w-4 shrink-0 text-zinc-500"
          strokeWidth={1.5}
          aria-hidden
        />
        <span className="text-sm text-zinc-700">
          <span className="font-mono text-xs text-zinc-500">— </span>
          Not applicable — excluded from pillar and overall averages
        </span>
      </button>
    </div>
  );
}
