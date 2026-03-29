"use client";

import Image from "next/image";
import { PHASES } from "@/lib/phases";
import { useDiagnosticStore } from "@/stores/useDiagnosticStore";
import { QuestionCard } from "./QuestionCard";
import { cn } from "@/lib/cn";

export function PhaseContent() {
  const {
    currentPhase,
    answers,
    setAnswer,
    setShowRoadmap,
    getAnsweredMaturityCount,
    getTotalMaturityCount,
  } = useDiagnosticStore();

  const phase = PHASES[currentPhase];
  const answered = getAnsweredMaturityCount();
  const totalM = getTotalMaturityCount();
  const canGenerate = answered >= 5;

  if (!phase) return null;

  const isLast = currentPhase === PHASES.length - 1;

  return (
    <div className="flex flex-1 flex-col px-4 pb-28 pt-6 md:px-10 md:pb-10 md:pt-10">
      <header className="mb-8">
        <p
          className="mb-1 text-xs font-normal uppercase tracking-[0.2em] text-indigo-400"
          style={{ fontFamily: "var(--font-jetbrains-mono)" }}
        >
          Phase {currentPhase + 1} of {PHASES.length}
        </p>
        <div className="flex items-start gap-3">
          <span className="text-3xl" aria-hidden>
            {phase.icon}
          </span>
          <div>
            <h1 className="text-2xl font-bold text-zinc-100">{phase.title}</h1>
            <p className="mt-1 text-sm text-zinc-500">{phase.subtitle}</p>
          </div>
        </div>
      </header>

      <div className="mx-auto flex w-full max-w-3xl flex-col gap-6">
        {phase.questions.map((q) => (
          <QuestionCard
            key={q.id}
            question={q}
            value={answers[q.id]}
            onChange={(v) => setAnswer(q.id, v)}
          />
        ))}

        {isLast && (
          <div className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-6">
            <div className="mb-4 flex items-center gap-3">
              <Image
                src="/logos/renatus-square.png"
                alt=""
                width={40}
                height={40}
                className="h-10 w-10 shrink-0 brightness-0 invert"
              />
              <div>
                <p className="font-semibold text-zinc-100">Ready for your roadmap?</p>
                <p className="text-sm text-zinc-500">
                  {answered}/{totalM} maturity questions scored — need at least 5 to generate.
                </p>
              </div>
            </div>
            <button
              type="button"
              disabled={!canGenerate}
              onClick={() => setShowRoadmap(true)}
              className={cn(
                "w-full rounded-[10px] px-6 py-3 font-semibold transition",
                canGenerate
                  ? "bg-indigo-500 text-white hover:brightness-110"
                  : "cursor-not-allowed bg-zinc-800 text-zinc-500",
              )}
            >
              Generate Roadmap →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
