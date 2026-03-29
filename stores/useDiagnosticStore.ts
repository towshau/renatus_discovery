"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  computeOverallScore,
  computePhaseScore,
  computeRoadmap,
  countAnsweredMaturity,
  countMaturityNa,
  getApplicableMaturityCount,
  type PhaseScoreResult,
  type RoadmapResult,
} from "@/lib/scoring";

export interface DiagnosticState {
  answers: Record<string, string | number>;
  currentPhase: number;
  showRoadmap: boolean;

  setAnswer: (id: string, value: string | number | undefined) => void;
  setCurrentPhase: (index: number) => void;
  setShowRoadmap: (show: boolean) => void;

  getPhaseScore: (phaseId: string) => PhaseScoreResult | null;
  getRoadmap: () => RoadmapResult;
  getOverallScore: () => number;
  getAnsweredMaturityCount: () => number;
  /** Maturity items still in scope for scoring (total − N/A) */
  getApplicableMaturityCount: () => number;
  getMaturityNaCount: () => number;

  resetAll: () => void;
}

export const useDiagnosticStore = create<DiagnosticState>()(
  persist(
    (set, get) => ({
      answers: {},
      currentPhase: 0,
      showRoadmap: false,

      setAnswer: (id, value) =>
        set((s) => {
          const next = { ...s.answers };
          if (value === undefined || value === "") {
            delete next[id];
          } else {
            next[id] = value;
          }
          return { answers: next };
        }),

      setCurrentPhase: (index) => set({ currentPhase: index }),

      setShowRoadmap: (show) => set({ showRoadmap: show }),

      getPhaseScore: (phaseId) => computePhaseScore(get().answers, phaseId),

      getRoadmap: () => computeRoadmap(get().answers),

      getOverallScore: () => computeOverallScore(get().answers),

      getAnsweredMaturityCount: () => countAnsweredMaturity(get().answers),

      getApplicableMaturityCount: () =>
        getApplicableMaturityCount(get().answers),

      getMaturityNaCount: () => countMaturityNa(get().answers),

      resetAll: () =>
        set({
          answers: {},
          currentPhase: 0,
          showRoadmap: false,
        }),
    }),
    {
      name: "renatus-diagnostic",
      partialize: (s) => ({
        answers: s.answers,
        currentPhase: s.currentPhase,
        showRoadmap: s.showRoadmap,
      }),
    },
  ),
);
