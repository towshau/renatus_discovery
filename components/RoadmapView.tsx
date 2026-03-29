"use client";

import type { ComponentType } from "react";
import {
  AlertCircle,
  ArrowLeft,
  Layers,
  Printer,
  TrendingUp,
} from "lucide-react";
import { useDiagnosticStore } from "@/stores/useDiagnosticStore";
import { PHASES, SCORED_PHASE_IDS, isNotesField } from "@/lib/phases";
import { PhaseIcon } from "@/lib/phase-icons";
import { computePhaseScore, type PillarUrgencyRow } from "@/lib/scoring";
import { cn } from "@/lib/cn";
import { ScoreBar } from "./ScoreBar";
import { ScoreRing } from "./ScoreRing";

function BucketSection({
  title,
  leadIcon: LeadIcon,
  subtitle,
  borderClass,
  rows,
}: {
  title: string;
  leadIcon: ComponentType<{ className?: string; strokeWidth?: number }>;
  subtitle: string;
  borderClass: string;
  rows: PillarUrgencyRow[];
}) {
  if (rows.length === 0) return null;
  return (
    <section
      className={cn(
        "rounded-lg border border-zinc-200 bg-white p-6 shadow-sm",
        "border-l-[3px]",
        borderClass,
      )}
    >
      <h3 className="flex items-center gap-2 font-display text-lg font-semibold text-zinc-900">
        <LeadIcon className="h-5 w-5 shrink-0 text-zinc-600" strokeWidth={1.5} />
        {title}
      </h3>
      <p className="mt-1 text-sm text-zinc-600">{subtitle}</p>
      <div className="mt-6 space-y-4">
        {rows.map((row) => (
          <div key={row.phaseId}>
            <p className="mb-2 flex items-center gap-2 text-sm font-medium text-zinc-800">
              <span className="flex h-6 w-6 items-center justify-center text-zinc-500">
                <PhaseIcon phaseId={row.phaseId} className="h-4 w-4" />
              </span>
              {row.title}
            </p>
            <ScoreBar score={row.average} showValue />
          </div>
        ))}
      </div>
    </section>
  );
}

export function RoadmapView() {
  const { answers, setShowRoadmap, getRoadmap, getOverallScore } =
    useDiagnosticStore();
  const roadmap = getRoadmap();
  const overall = getOverallScore();
  const businessName =
    typeof answers.business_name === "string" && answers.business_name.trim()
      ? answers.business_name
      : "Your business";
  const ownerName =
    typeof answers.owner_name === "string" && answers.owner_name.trim()
      ? answers.owner_name
      : "the owner";

  const primaryGoal =
    typeof answers.primary_goal === "string" ? answers.primary_goal.trim() : "";
  const biggestPain =
    typeof answers.biggest_pain === "string" ? answers.biggest_pain.trim() : "";
  const aiPriorities =
    typeof answers.ai_priorities === "string" ? answers.ai_priorities.trim() : "";

  const sessionBlocks: {
    phaseId: string;
    phaseTitle: string;
    entries: { label: string; text: string }[];
  }[] = [];

  for (const phase of PHASES) {
    const entries: { label: string; text: string }[] = [];
    for (const q of phase.questions) {
      if (!isNotesField(q.id)) continue;
      const raw = answers[q.id];
      if (typeof raw !== "string" || !raw.trim()) continue;
      entries.push({ label: q.label, text: raw.trim() });
    }
    if (entries.length > 0) {
      sessionBlocks.push({
        phaseId: phase.id,
        phaseTitle: phase.title,
        entries,
      });
    }
  }

  return (
    <div className="roadmap-print bg-zinc-50/50 px-4 py-10 md:px-14 md:py-14">
      <header className="mx-auto max-w-3xl text-center print:py-4">
        <span className="inline-block rounded-md border border-zinc-200 bg-white px-3 py-1 font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-zinc-600">
          Diagnostic complete
        </span>
        <h1 className="font-display mt-8 text-4xl font-semibold tracking-tight text-zinc-900 md:text-5xl">
          {businessName}
        </h1>
        <p className="mt-3 text-base text-zinc-600">
          AI transformation roadmap — <span className="text-zinc-800">{ownerName}</span>
        </p>

        <div className="relative mx-auto mt-12 flex justify-center">
          <div className="relative inline-flex items-center justify-center">
            <ScoreRing score={overall} />
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="font-mono text-4xl font-medium tabular-nums text-zinc-900">
                {overall.toFixed(1)}
              </span>
            </div>
          </div>
        </div>
        <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-500">
          Overall maturity score
        </p>
      </header>

      <div className="mx-auto mt-14 max-w-3xl space-y-10">
        <section className="rounded-lg border border-zinc-200 bg-white p-6 shadow-sm">
          <h2 className="mb-6 font-display text-xl font-semibold text-zinc-900">
            Pillar breakdown
          </h2>
          <div className="space-y-4">
            {SCORED_PHASE_IDS.map((phaseId) => {
              const phase = PHASES.find((p) => p.id === phaseId);
              const ps = computePhaseScore(answers, phaseId);
              const label = phase?.title ?? phaseId;
              return (
                <ScoreBar
                  key={phaseId}
                  label={label}
                  score={ps?.average ?? 0}
                  valueLabel={ps ? undefined : "—"}
                  showValue
                />
              );
            })}
          </div>
        </section>

        <div className="space-y-5">
          <h2 className="font-display text-xl font-semibold text-zinc-900">
            Prioritised roadmap
          </h2>
          <BucketSection
            title="Fix now"
            leadIcon={AlertCircle}
            subtitle="High gap, high impact — address in the first 30 days"
            borderClass="border-l-red-500"
            rows={roadmap.fixNow}
          />
          <BucketSection
            title="Build next"
            leadIcon={Layers}
            subtitle="Important foundations — target within 60–90 days"
            borderClass="border-l-amber-500"
            rows={roadmap.buildNext}
          />
          <BucketSection
            title="Optimise later"
            leadIcon={TrendingUp}
            subtitle="Efficiency gains — once the basics are solid"
            borderClass="border-l-emerald-600"
            rows={roadmap.optimiseLater}
          />
        </div>

        <section className="rounded-lg border border-zinc-200 bg-white p-6 shadow-sm">
          <h2 className="mb-6 font-display text-xl font-semibold text-zinc-900">
            Key context
          </h2>
          <div className="space-y-6">
            <div>
              <p className="font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-zinc-500">
                12-month goal
              </p>
              <p className="mt-2 whitespace-pre-wrap text-sm leading-relaxed text-zinc-800">
                {primaryGoal || "—"}
              </p>
            </div>
            <div>
              <p className="font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-zinc-500">
                Biggest pain point
              </p>
              <p className="mt-2 whitespace-pre-wrap text-sm leading-relaxed text-zinc-800">
                {biggestPain || "—"}
              </p>
            </div>
            <div>
              <p className="font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-zinc-500">
                AI quick win
              </p>
              <p className="mt-2 whitespace-pre-wrap text-sm leading-relaxed text-zinc-800">
                {aiPriorities || "—"}
              </p>
            </div>
          </div>
        </section>

        {sessionBlocks.length > 0 && (
          <section>
            <h2 className="mb-4 font-display text-xl font-semibold text-zinc-900">
              Session notes
            </h2>
            <div className="space-y-4">
              {sessionBlocks.map((block) => (
                <div
                  key={block.phaseId}
                  className="rounded-lg border border-zinc-200 bg-white p-6 shadow-sm"
                >
                  <h3 className="flex items-center gap-2.5 font-display text-base font-semibold text-zinc-900">
                    <span className="flex h-8 w-8 items-center justify-center rounded-md border border-zinc-200 bg-zinc-50 text-zinc-600">
                      <PhaseIcon phaseId={block.phaseId} className="h-4 w-4" />
                    </span>
                    {block.phaseTitle}
                  </h3>
                  <div className="mt-4 space-y-4">
                    {block.entries.map((e) => (
                      <div key={e.label}>
                        <p className="text-xs text-zinc-500">{e.label}</p>
                        <p className="mt-1 whitespace-pre-wrap text-sm leading-relaxed text-zinc-800">
                          {e.text}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        <footer className="no-print flex flex-col gap-3 border-t border-zinc-200 pt-10 sm:flex-row sm:justify-center">
          <button
            type="button"
            onClick={() => setShowRoadmap(false)}
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-zinc-300 bg-white px-6 py-3 text-sm font-semibold text-zinc-700 transition hover:border-zinc-400 hover:bg-zinc-50"
          >
            <ArrowLeft className="h-4 w-4" strokeWidth={2} />
            Back to diagnostic
          </button>
          <button
            type="button"
            onClick={() => window.print()}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-zinc-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-zinc-800"
          >
            <Printer className="h-4 w-4" strokeWidth={2} />
            Print / Save PDF
          </button>
        </footer>
      </div>
    </div>
  );
}
