"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { PHASES } from "@/lib/phases";
import { PhaseIcon } from "@/lib/phase-icons";
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
    getApplicableMaturityCount,
  } = useDiagnosticStore();

  const phase = PHASES[currentPhase];
  const answered = getAnsweredMaturityCount();
  const applicable = getApplicableMaturityCount();
  const canGenerate = answered >= 5;

  if (!phase) return null;

  const isLast = currentPhase === PHASES.length - 1;

  return (
    <div className="flex flex-1 flex-col px-4 pb-28 pt-8 md:px-12 md:pb-12 md:pt-12">
      <header className="mb-10 max-w-3xl">
        <p className="mb-2 font-mono text-[11px] font-normal uppercase tracking-[0.22em] text-zinc-500">
          Phase {String(currentPhase + 1).padStart(2, "0")} /{" "}
          {String(PHASES.length).padStart(2, "0")}
        </p>
        <div className="flex items-start gap-4">
          <div className="mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-md border border-zinc-200 bg-white text-zinc-700 shadow-sm">
            <PhaseIcon phaseId={phase.id} className="h-5 w-5" />
          </div>
          <div>
            <h1 className="font-display text-3xl font-semibold tracking-tight text-zinc-900 md:text-[2rem] md:leading-tight">
              {phase.title}
            </h1>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-zinc-600">
              {phase.subtitle}
            </p>
          </div>
        </div>
      </header>

      <div className="mx-auto flex w-full max-w-3xl flex-col gap-5">
        {phase.questions.map((q) => (
          <QuestionCard
            key={q.id}
            question={q}
            value={answers[q.id]}
            onChange={(v) => setAnswer(q.id, v)}
          />
        ))}

        {isLast && (
          <div className="rounded-lg border border-zinc-200 bg-white p-6 shadow-sm">
            <div className="mb-5 flex items-start gap-4">
              <Image
                src="/logos/renatus-square.png"
                alt=""
                width={40}
                height={40}
                className="h-10 w-10 shrink-0 object-contain"
                unoptimized
              />
              <div>
                <p className="font-display text-lg font-medium text-zinc-900">
                  Ready for your roadmap?
                </p>
                <p className="mt-1 text-sm text-zinc-600">
                  {answered} of {applicable} applicable maturity items scored — at
                  least 5 numeric scores required to generate.
                </p>
              </div>
            </div>
            <button
              type="button"
              disabled={!canGenerate}
              onClick={() => setShowRoadmap(true)}
              className={cn(
                "flex w-full items-center justify-center gap-2 rounded-lg px-5 py-3 text-sm font-semibold transition",
                canGenerate
                  ? "bg-zinc-900 text-white hover:bg-zinc-800"
                  : "cursor-not-allowed bg-zinc-200 text-zinc-400",
              )}
            >
              Generate roadmap
              <ArrowRight className="h-4 w-4" strokeWidth={2} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
