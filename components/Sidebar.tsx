"use client";

import Image from "next/image";
import { PHASES } from "@/lib/phases";
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
  icon: string;
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
        "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition",
        active ? "bg-indigo-500/12" : "hover:bg-white/[0.04]",
        compact && "min-w-[3rem] shrink-0 flex-col justify-center px-2 py-2",
      )}
    >
      <span
        className={cn(
          "text-xl",
          hasData ? "opacity-100" : "opacity-40",
        )}
        aria-hidden
      >
        {icon}
      </span>
      {!compact && (
        <>
          <span className="min-w-0 flex-1 truncate text-sm font-medium text-zinc-200">
            {title}
          </span>
          {scoreLabel ? (
            <span
              className="shrink-0 text-xs tabular-nums text-zinc-500"
              style={{ fontFamily: "var(--font-jetbrains-mono)" }}
            >
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
  const {
    currentPhase,
    setCurrentPhase,
    setShowRoadmap,
    getPhaseScore,
    getAnsweredMaturityCount,
    getTotalMaturityCount,
  } = useDiagnosticStore();

  const answered = getAnsweredMaturityCount();
  const totalM = getTotalMaturityCount();
  const canGenerate = answered >= 5;

  return (
    <div className="flex h-full flex-col border-r border-white/[0.06] bg-[#0A0A0F]">
      <div className="border-b border-white/[0.06] px-5 py-6">
        <Image
          src="/logos/renatus-horizontal.png"
          alt="Renatus"
          width={140}
          height={24}
          className="h-auto w-[140px] brightness-0 invert"
          priority
        />
        <p className="mt-2 text-xs text-zinc-500">Business Diagnostic</p>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-4">
        <ul className="space-y-1">
          {PHASES.map((phase, i) => {
            const ps = getPhaseScore(phase.id);
            const hasData = !!ps && ps.count > 0;
            const scoreLabel =
              ps && ps.count > 0 ? ps.average.toFixed(1) : null;
            return (
              <li key={phase.id}>
                <PhaseNavItem
                  icon={phase.icon}
                  title={phase.title}
                  active={currentPhase === i}
                  hasData={hasData}
                  scoreLabel={scoreLabel}
                  onSelect={() => setCurrentPhase(i)}
                />
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="border-t border-white/[0.06] px-5 py-5">
        <p className="mb-2 text-xs text-zinc-500">
          <span
            className="font-medium text-zinc-400"
            style={{ fontFamily: "var(--font-jetbrains-mono)" }}
          >
            {answered}/{totalM}
          </span>{" "}
          scored
        </p>
        <ProgressBar value={answered} max={totalM} className="mb-4" />
        <button
          type="button"
          disabled={!canGenerate}
          onClick={() => setShowRoadmap(true)}
          className={cn(
            "w-full rounded-[10px] px-6 py-3 text-center text-sm font-semibold transition",
            canGenerate
              ? "bg-indigo-500 text-white hover:brightness-110"
              : "cursor-not-allowed bg-zinc-800 text-zinc-500",
          )}
        >
          Generate Roadmap →
        </button>
      </div>
    </div>
  );
}

export function MobileTopNav() {
  const { currentPhase, setCurrentPhase, getPhaseScore } =
    useDiagnosticStore();

  return (
    <nav
      className="no-print flex shrink-0 gap-1 overflow-x-auto border-b border-white/[0.06] bg-[#0A0A0F] px-2 py-2 md:hidden"
      aria-label="Phases"
    >
      {PHASES.map((phase, i) => {
        const ps = getPhaseScore(phase.id);
        const hasData = !!ps && ps.count > 0;
        return (
          <PhaseNavItem
            key={phase.id}
            icon={phase.icon}
            title={phase.title}
            active={currentPhase === i}
            hasData={hasData}
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
    getTotalMaturityCount,
  } = useDiagnosticStore();

  const answered = getAnsweredMaturityCount();
  const totalM = getTotalMaturityCount();
  const canGenerate = answered >= 5;

  return (
    <div className="no-print fixed bottom-0 left-0 right-0 z-20 border-t border-white/[0.06] bg-[#0A0A0F]/95 p-4 backdrop-blur md:hidden">
      <p className="mb-2 text-center text-xs text-zinc-500">
        <span
          className="font-medium text-zinc-400"
          style={{ fontFamily: "var(--font-jetbrains-mono)" }}
        >
          {answered}/{totalM}
        </span>{" "}
        scored
      </p>
      <ProgressBar value={answered} max={totalM} className="mb-3" />
      <button
        type="button"
        disabled={!canGenerate}
        onClick={() => setShowRoadmap(true)}
        className={cn(
          "w-full rounded-[10px] px-6 py-3 text-sm font-semibold transition",
          canGenerate
            ? "bg-indigo-500 text-white hover:brightness-110"
            : "cursor-not-allowed bg-zinc-800 text-zinc-500",
        )}
      >
        Generate Roadmap →
      </button>
    </div>
  );
}
