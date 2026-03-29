"use client";

import { useEffect, useRef } from "react";
import { useDiagnosticStore } from "@/stores/useDiagnosticStore";
import { PhaseContent } from "./PhaseContent";
import { RoadmapView } from "./RoadmapView";
import { Sidebar, MobileBottomBar, MobileTopNav } from "./Sidebar";

export function DiagnosticShell() {
  const mainRef = useRef<HTMLElement>(null);
  const showRoadmap = useDiagnosticStore((s) => s.showRoadmap);
  const currentPhase = useDiagnosticStore((s) => s.currentPhase);

  useEffect(() => {
    mainRef.current?.scrollTo({ top: 0, behavior: "auto" });
  }, [currentPhase, showRoadmap]);

  return (
    <div className="flex h-dvh flex-col bg-[#0A0A0F] text-zinc-200 md:flex-row">
      {!showRoadmap && (
        <>
          <aside className="no-print hidden w-[280px] shrink-0 md:block">
            <Sidebar />
          </aside>
          <MobileTopNav />
        </>
      )}

      <main
        ref={mainRef}
        className="relative min-h-0 flex-1 overflow-y-auto print:overflow-visible"
      >
        {showRoadmap ? <RoadmapView /> : <PhaseContent />}
      </main>

      {!showRoadmap && <MobileBottomBar />}
    </div>
  );
}
