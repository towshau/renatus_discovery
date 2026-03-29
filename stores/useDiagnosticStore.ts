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
  /** Roadmap playbook: checklist + questionnaire fields (string | boolean) */
  playbookResponses: Record<string, string | boolean>;
  currentPhase: number;
  showRoadmap: boolean;

  setAnswer: (id: string, value: string | number | undefined) => void;
  setPlaybookField: (id: string, value: string | boolean | undefined) => void;
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
      playbookResponses: {},
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

      setPlaybookField: (id, value) =>
        set((s) => {
          const next = { ...s.playbookResponses };
          if (value === undefined || value === "") {
            delete next[id];
          } else {
            next[id] = value;
          }
          return { playbookResponses: next };
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
          playbookResponses: {},
          currentPhase: 0,
          showRoadmap: false,
        }),
    }),
    {
      name: "renatus-diagnostic",
      merge: (persisted, current) => {
        const p = persisted as Partial<DiagnosticState> | undefined;
        return {
          ...current,
          ...p,
          playbookResponses: p?.playbookResponses ?? current.playbookResponses,
        };
      },
      partialize: (s) => ({
        answers: s.answers,
        playbookResponses: s.playbookResponses,
        currentPhase: s.currentPhase,
        showRoadmap: s.showRoadmap,
      }),
    },
  ),
);
