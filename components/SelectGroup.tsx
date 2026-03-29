"use client";

import { cn } from "@/lib/cn";

interface SelectGroupProps {
  options: string[];
  value: string | undefined;
  onChange: (value: string) => void;
}

export function SelectGroup({ options, value, onChange }: SelectGroupProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => {
        const active = value === opt;
        return (
          <button
            key={opt}
            type="button"
            onClick={() => onChange(opt)}
            className={cn(
              "rounded-[10px] border px-4 py-2 text-sm font-medium transition",
              active
                ? "border-indigo-500 bg-indigo-500/15 text-indigo-200"
                : "border-white/[0.06] bg-transparent text-zinc-500 hover:border-white/15 hover:text-zinc-300",
            )}
          >
            {opt}
          </button>
        );
      })}
    </div>
  );
}
