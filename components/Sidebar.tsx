"use client";

import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { PHASES } from "@/lib/phases";
import { PhaseIcon } from "@/lib/phase-icons";
import { useHydrated } from "@/lib/use-hydrated";
import { cn } from "@/lib/cn";
import { useDiagnosticStore } from "@/stores/useDiagnosticStore";
import { ProgressBar } from "./ProgressBar";

function PhaseNavItem({
  icon,
  title,
  active,
  hasData,
  scoreLabel,
  onSelect,
  compact,
}: {
  icon: ReactNode;
  title: string;
  active: boolean;
  hasData: boolean;
  scoreLabel: string | null;
  onSelect: () => void;
  compact?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      title={title}
      className={cn(
        "flex w-full items-center gap-3 rounded-md border border-transparent px-3 py-2.5 text-left transition",
        active
          ? "border-zinc-200 bg-zinc-100"
          : "hover:border-zinc-200 hover:bg-zinc-50",
        compact && "min-w-[2.75rem] shrink-0 flex-col justify-center px-2 py-2",
      )}
    >
      <span
        className={cn(
          "flex shrink-0 items-center justify-center text-zinc-400",
          compact ? "h-5 w-5" : "h-4 w-4",
          hasData ? "text-zinc-800" : "text-zinc-400",
        )}
        aria-hidden
      >
        {icon}
      </span>
      {!compact && (
        <>
          <span className="min-w-0 flex-1 truncate text-sm font-medium text-zinc-800">
            {title}
          </span>
          {scoreLabel ? (
            <span className="shrink-0 font-mono text-xs tabular-nums text-zinc-500">
              {scoreLabel}
            </span>
          ) : (
            <span className="w-8 shrink-0" />
          )}
        </>
      )}
    </button>
  );
}

export function Sidebar() {
  const hydrated = useHydrated();
  const {
    currentPhase,
    setCurrentPhase,
    setShowRoadmap,
    getPhaseScore,
    getAnsweredMaturityCount,
    getApplicableMaturityCount,
    getMaturityNaCount,
  } = useDiagnosticStore();

  const answered = getAnsweredMaturityCount();
  const applicable = getApplicableMaturityCount();
  const naCount = getMaturityNaCount();
  const canGenerate = answered >= 5;

  return (
    <div className="flex h-full flex-col border-r border-zinc-200 bg-zinc-50/90">
      <div className="border-b border-zinc-200 px-5 py-6">
        <p className="font-display text-lg font-semibold tracking-wide text-zinc-900">
          Diagnostic
        </p>
        <p className="mt-1 text-[10px] font-medium uppercase tracking-[0.2em] text-zinc-500">
          Business Diagnostic
        </p>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-4">
        <ul className="space-y-0.5">
          {PHASES.map((phase, i) => {
            const ps = getPhaseScore(phase.id);
            const hasData = !!ps && ps.count > 0;
            const scoreLabel =
              ps && ps.count > 0 ? ps.average.toFixed(1) : null;
            return (
              <li key={phase.id}>
                <PhaseNavItem
                  icon={
                    <PhaseIcon phaseId={phase.id} className="h-full w-full" />
                  }
                  title={phase.title}
                  active={currentPhase === i}
                  hasData={hydrated && hasData}
                  scoreLabel={hydrated ? scoreLabel : null}
                  onSelect={() => setCurrentPhase(i)}
                />
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="border-t border-zinc-200 px-5 py-5">
        <p className="mb-2 text-xs text-zinc-500">
          <span className="font-mono font-medium text-zinc-700">
            {answered}/{applicable}
          </span>{" "}
          scored
          {naCount > 0 ? (
            <span className="block pt-1 text-[11px] text-zinc-500">
              {naCount} not applicable (excluded)
            </span>
          ) : null}
        </p>
        <ProgressBar value={answered} max={applicable} className="mb-4" />
        <button
          type="button"
          disabled={!canGenerate}
          onClick={() => setShowRoadmap(true)}
          className={cn(
            "flex w-full items-center justify-center gap-2 rounded-lg px-5 py-3 text-center text-sm font-semibold transition",
            canGenerate
              ? "bg-zinc-900 text-white hover:bg-zinc-800"
              : "cursor-not-allowed bg-zinc-200 text-zinc-400",
          )}
        >
          Generate roadmap
          <ArrowRight className="h-4 w-4" strokeWidth={2} />
        </button>
      </div>
    </div>
  );
}

export function MobileTopNav() {
  const hydrated = useHydrated();
  const { currentPhase, setCurrentPhase, getPhaseScore } =
    useDiagnosticStore();

  return (
    <nav
      className="no-print flex shrink-0 gap-0.5 overflow-x-auto border-b border-zinc-200 bg-white px-2 py-2 md:hidden"
      aria-label="Phases"
    >
      {PHASES.map((phase, i) => {
        const ps = getPhaseScore(phase.id);
        const hasData = !!ps && ps.count > 0;
        return (
          <PhaseNavItem
            key={phase.id}
            icon={
              <PhaseIcon phaseId={phase.id} className="h-full w-full" />
            }
            title={phase.title}
            active={currentPhase === i}
            hasData={hydrated && hasData}
            scoreLabel={null}
            onSelect={() => setCurrentPhase(i)}
            compact
          />
        );
      })}
    </nav>
  );
}

export function MobileBottomBar() {
  const {
    setShowRoadmap,
    getAnsweredMaturityCount,
    getApplicableMaturityCount,
  } = useDiagnosticStore();

  const answered = getAnsweredMaturityCount();
  const applicable = getApplicableMaturityCount();
  const canGenerate = answered >= 5;

  return (
    <div className="no-print fixed bottom-0 left-0 right-0 z-20 border-t border-zinc-200 bg-white/95 p-4 shadow-[0_-4px_24px_rgba(0,0,0,0.06)] backdrop-blur md:hidden">
      <p className="mb-2 text-center text-xs text-zinc-500">
        <span className="font-mono font-medium text-zinc-700">
          {answered}/{applicable}
        </span>{" "}
        scored
      </p>
      <ProgressBar value={answered} max={applicable} className="mb-3" />
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
  );
}
