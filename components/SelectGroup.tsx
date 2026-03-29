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
              "rounded-md border px-3.5 py-2 text-left text-sm transition",
              active
                ? "border-zinc-800 bg-zinc-900 text-white"
                : "border-zinc-200 bg-white text-zinc-600 hover:border-zinc-300 hover:text-zinc-900",
            )}
          >
            {opt}
          </button>
        );
      })}
    </div>
  );
}
