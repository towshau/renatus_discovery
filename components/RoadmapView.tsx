"use client";

import { useDiagnosticStore } from "@/stores/useDiagnosticStore";
import {
  PHASES,
  SCORED_PHASE_IDS,
  isNotesField,
} from "@/lib/phases";
import { computePhaseScore, type PillarUrgencyRow } from "@/lib/scoring";
import { cn } from "@/lib/cn";
import { ScoreBar } from "./ScoreBar";
import { ScoreRing } from "./ScoreRing";

function BucketSection({
  title,
  emoji,
  subtitle,
  borderClass,
  rows,
}: {
  title: string;
  emoji: string;
  subtitle: string;
  borderClass: string;
  rows: PillarUrgencyRow[];
}) {
  if (rows.length === 0) return null;
  return (
    <section
      className={cn(
        "rounded-xl border border-white/[0.06] bg-white/[0.03] p-6",
        "border-l-4",
        borderClass,
      )}
    >
      <h3 className="text-lg font-bold text-zinc-100">
        <span className="mr-2" aria-hidden>
          {emoji}
        </span>
        {title}
      </h3>
      <p className="mt-1 text-sm text-zinc-500">{subtitle}</p>
      <div className="mt-6 space-y-4">
        {rows.map((row) => (
          <div key={row.phaseId}>
            <p className="mb-2 text-sm font-medium text-zinc-300">
              <span className="mr-2">{row.icon}</span>
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

  const sessionBlocks: { phaseTitle: string; icon: string; entries: { label: string; text: string }[] }[] =
    [];

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
        phaseTitle: phase.title,
        icon: phase.icon,
        entries,
      });
    }
  }

  return (
    <div className="roadmap-print px-4 py-8 md:px-12 md:py-12">
      <header className="mx-auto max-w-4xl text-center print:py-4">
        <span className="inline-block rounded-full bg-indigo-500/15 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-indigo-300">
          Diagnostic complete
        </span>
        <h1 className="mt-6 text-3xl font-bold text-zinc-50 md:text-4xl">
          {businessName}
        </h1>
        <p className="mt-2 text-lg text-zinc-400">
          AI Transformation Roadmap for {ownerName}
        </p>

        <div className="relative mx-auto mt-10 flex justify-center">
          <div className="relative inline-flex items-center justify-center">
            <ScoreRing score={overall} />
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span
                className="text-4xl font-medium tabular-nums text-zinc-100"
                style={{ fontFamily: "var(--font-jetbrains-mono)" }}
              >
                {overall.toFixed(1)}
              </span>
            </div>
          </div>
        </div>
        <p
          className="mt-4 text-sm uppercase tracking-[0.15em] text-zinc-500"
          style={{ fontFamily: "var(--font-jetbrains-mono)" }}
        >
          Overall Maturity Score
        </p>
      </header>

      <div className="mx-auto mt-12 max-w-4xl space-y-10">
        <section className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-6">
          <h2 className="mb-6 text-lg font-bold text-zinc-100">
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

        <div className="space-y-6">
          <h2 className="text-lg font-bold text-zinc-100">
            Prioritised roadmap
          </h2>
          <BucketSection
            title="Fix Now"
            emoji="🔴"
            subtitle="High gap, high impact — address in the first 30 days"
            borderClass="border-l-red-500"
            rows={roadmap.fixNow}
          />
          <BucketSection
            title="Build Next"
            emoji="🟡"
            subtitle="Important foundations — target within 60–90 days"
            borderClass="border-l-amber-500"
            rows={roadmap.buildNext}
          />
          <BucketSection
            title="Optimise Later"
            emoji="🟢"
            subtitle="Efficiency gains — once the basics are solid"
            borderClass="border-l-emerald-500"
            rows={roadmap.optimiseLater}
          />
        </div>

        <section className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-6">
          <h2 className="mb-6 text-lg font-bold text-zinc-100">Key context</h2>
          <div className="space-y-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-indigo-400">
                12-Month Goal
              </p>
              <p className="mt-2 whitespace-pre-wrap text-zinc-300">
                {primaryGoal || "—"}
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-indigo-400">
                Biggest Pain Point
              </p>
              <p className="mt-2 whitespace-pre-wrap text-zinc-300">
                {biggestPain || "—"}
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-indigo-400">
                AI Quick Win
              </p>
              <p className="mt-2 whitespace-pre-wrap text-zinc-300">
                {aiPriorities || "—"}
              </p>
            </div>
          </div>
        </section>

        {sessionBlocks.length > 0 && (
          <section>
            <h2 className="mb-4 text-lg font-bold text-zinc-100">
              Session notes
            </h2>
            <div className="space-y-4">
              {sessionBlocks.map((block) => (
                <div
                  key={block.phaseTitle}
                  className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-6"
                >
                  <h3 className="flex items-center gap-2 text-base font-semibold text-zinc-100">
                    <span>{block.icon}</span>
                    {block.phaseTitle}
                  </h3>
                  <div className="mt-4 space-y-4">
                    {block.entries.map((e) => (
                      <div key={e.label}>
                        <p className="text-xs text-zinc-500">{e.label}</p>
                        <p className="mt-1 whitespace-pre-wrap text-sm text-zinc-300">
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

        <footer className="no-print flex flex-col gap-3 border-t border-white/[0.06] pt-8 sm:flex-row sm:justify-center">
          <button
            type="button"
            onClick={() => setShowRoadmap(false)}
            className="rounded-[10px] border border-white/[0.06] bg-transparent px-6 py-3 font-semibold text-zinc-500 transition hover:border-white/15 hover:text-zinc-300"
          >
            ← Back to Diagnostic
          </button>
          <button
            type="button"
            onClick={() => window.print()}
            className="rounded-[10px] bg-indigo-500 px-6 py-3 font-semibold text-white transition hover:brightness-110"
          >
            Print / Save PDF
          </button>
        </footer>
      </div>
    </div>
  );
}
