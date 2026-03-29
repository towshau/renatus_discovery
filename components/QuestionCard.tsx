"use client";

import type { Question } from "@/lib/phases";
import { isMaturityNa, MATURITY_NOT_APPLICABLE } from "@/lib/maturity";
import { cn } from "@/lib/cn";
import { MaturitySelector, type MaturitySelection } from "./MaturitySelector";
import { SelectGroup } from "./SelectGroup";

interface QuestionCardProps {
  question: Question;
  value: string | number | undefined;
  onChange: (value: string | number | undefined) => void;
}

export function QuestionCard({ question, value, onChange }: QuestionCardProps) {
  return (
    <div className="rounded-lg border border-zinc-200 bg-white p-6 shadow-sm">
      <label
        id={`${question.id}-label`}
        className="mb-3 block text-[15px] font-medium leading-snug text-zinc-900"
      >
        {question.label}
      </label>

      {question.type === "text" && (
        <input
          type="text"
          value={typeof value === "string" ? value : ""}
          onChange={(e) => onChange(e.target.value)}
          placeholder={question.placeholder}
          className={cn(
            "w-full rounded-md border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-900",
            "placeholder:text-zinc-400 outline-none transition focus:border-zinc-400 focus:ring-1 focus:ring-zinc-300",
          )}
        />
      )}

      {question.type === "textarea" && (
        <textarea
          value={typeof value === "string" ? value : ""}
          onChange={(e) => onChange(e.target.value)}
          placeholder={question.placeholder}
          rows={4}
          className={cn(
            "w-full resize-y rounded-md border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-900",
            "placeholder:text-zinc-400 outline-none transition focus:border-zinc-400 focus:ring-1 focus:ring-zinc-300",
          )}
        />
      )}

      {question.type === "select" && (
        <SelectGroup
          options={question.options}
          value={typeof value === "string" ? value : undefined}
          onChange={(v) => onChange(v)}
        />
      )}

      {question.type === "maturity" && (
        <>
          <p className="mb-4 text-sm leading-relaxed text-zinc-600">
            {question.description}
          </p>
          <MaturitySelector
            questionId={question.id}
            value={
              isMaturityNa(value)
                ? MATURITY_NOT_APPLICABLE
                : typeof value === "number"
                  ? value
                  : undefined
            }
            onChange={(v: MaturitySelection) => onChange(v)}
          />
        </>
      )}
    </div>
  );
}
