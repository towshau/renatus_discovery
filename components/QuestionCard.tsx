"use client";

import type { Question } from "@/lib/phases";
import { cn } from "@/lib/cn";
import { MaturitySelector } from "./MaturitySelector";
import { SelectGroup } from "./SelectGroup";

interface QuestionCardProps {
  question: Question;
  value: string | number | undefined;
  onChange: (value: string | number | undefined) => void;
}

export function QuestionCard({ question, value, onChange }: QuestionCardProps) {
  return (
    <div className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-6">
      <label
        id={`${question.id}-label`}
        className="mb-4 block text-base font-bold text-zinc-100"
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
            "w-full rounded-lg border border-white/[0.06] bg-black/30 px-4 py-3 text-zinc-200",
            "placeholder:text-zinc-600 outline-none transition focus:border-indigo-500",
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
            "w-full resize-y rounded-lg border border-white/[0.06] bg-black/30 px-4 py-3 text-zinc-200",
            "placeholder:text-zinc-600 outline-none transition focus:border-indigo-500",
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
          <p className="mb-4 text-sm text-zinc-500">{question.description}</p>
          <MaturitySelector
            questionId={question.id}
            value={typeof value === "number" ? value : undefined}
            onChange={onChange}
          />
        </>
      )}
    </div>
  );
}
