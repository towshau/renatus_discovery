"use client";

import { useEffect, useRef } from "react";
import { useDiagnosticStore } from "@/stores/useDiagnosticStore";
import { RenatusWordmark } from "@/components/RenatusWordmark";
import { PhaseContent } from "./PhaseContent";
import { RoadmapView } from "./RoadmapView";
import { Sidebar, MobileBottomBar, MobileTopNav } from "./Sidebar";

export function DiagnosticShell() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const showRoadmap = useDiagnosticStore((s) => s.showRoadmap);
  const currentPhase = useDiagnosticStore((s) => s.currentPhase);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0, behavior: "auto" });
  }, [currentPhase, showRoadmap]);

  return (
    <div className="flex h-dvh flex-col bg-white text-zinc-900 md:flex-row">
      {!showRoadmap && (
        <>
          <aside className="no-print hidden w-[280px] shrink-0 md:block">
            <Sidebar />
          </aside>
          <MobileTopNav />
        </>
      )}

      <div className="relative flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden bg-white print:overflow-visible">
        <header className="no-print flex min-h-[3.25rem] shrink-0 items-center justify-end border-b border-zinc-200 bg-white px-4 py-3 md:px-10">
          <RenatusWordmark size="md" priority className="shrink-0" />
        </header>

        <main
          ref={scrollRef}
          className="min-h-0 flex-1 overflow-y-auto bg-zinc-50/50 print:overflow-visible"
        >
          {showRoadmap ? <RoadmapView /> : <PhaseContent />}
        </main>
      </div>

      {!showRoadmap && <MobileBottomBar />}
    </div>
  );
}
