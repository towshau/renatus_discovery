"use client";

import { useCallback, useState } from "react";
import { Copy, Check } from "lucide-react";
import {
  PILLAR_PLAYBOOKS,
  playbookKey,
} from "@/lib/pillar-playbooks";
import { buildPlaybookMarkdown } from "@/lib/pillar-playbooks-export";
import { useDiagnosticStore } from "@/stores/useDiagnosticStore";
import { PhaseIcon } from "@/lib/phase-icons";
import { cn } from "@/lib/cn";

function readBool(v: string | boolean | undefined): boolean {
  return v === true || v === "true";
}

export function PillarPlaybooksSection() {
  const playbookResponses = useDiagnosticStore((s) => s.playbookResponses);
  const setPlaybookField = useDiagnosticStore((s) => s.setPlaybookField);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copyMarkdown = useCallback(
    async (phaseId: string) => {
      const def = PILLAR_PLAYBOOKS.find((p) => p.phaseId === phaseId);
      if (!def) return;
      const md = buildPlaybookMarkdown(def, playbookResponses);
      try {
        await navigator.clipboard.writeText(md);
        setCopiedId(phaseId);
        setTimeout(() => setCopiedId(null), 2000);
      } catch {
        // ignore
      }
    },
    [playbookResponses],
  );

  return (
    <section className="rounded-lg border border-zinc-200 bg-white p-6 shadow-sm print:border-zinc-300 print:p-4">
      <h2 className="font-display text-xl font-semibold text-zinc-900">
        Pillar playbooks — what to collect next
      </h2>
      <p className="mt-2 text-sm text-zinc-600">
        Use these checklists and questionnaires to gather source material, then turn it
        into a <strong className="font-semibold text-zinc-800">Claude Skill</strong> for
        repeatable outputs (draft the Skill body in chat, then create the Skill in your
        account). Copy each pillar pack to paste into that drafting chat. Upload files
        in chat or a temporary Project if needed. Claude Pro is a common default
        (~US$20–25/mo depending on region—confirm current pricing on anthropic.com).
      </p>

      <div className="mt-8 space-y-3">
        {PILLAR_PLAYBOOKS.map((def) => {
          return (
            <details
              key={def.phaseId}
              className="group rounded-lg border border-zinc-200 bg-zinc-50/50 open:bg-white open:shadow-sm"
            >
              <summary className="flex cursor-pointer list-none items-center gap-3 rounded-lg px-4 py-3 font-medium text-zinc-900 marker:content-none print:py-2">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-zinc-200 bg-white text-zinc-600">
                  <PhaseIcon phaseId={def.phaseId} className="h-4 w-4" />
                </span>
                <span className="min-w-0 flex-1 text-left font-display text-base">
                  {def.title}
                </span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    void copyMarkdown(def.phaseId);
                  }}
                  className={cn(
                    "no-print inline-flex shrink-0 items-center gap-1.5 rounded-md border px-3 py-1.5 text-xs font-semibold transition",
                    copiedId === def.phaseId
                      ? "border-emerald-300 bg-emerald-50 text-emerald-800"
                      : "border-zinc-300 bg-white text-zinc-700 hover:bg-zinc-50",
                  )}
                  aria-label={`Copy ${def.title} for Claude`}
                >
                  {copiedId === def.phaseId ? (
                    <>
                      <Check className="h-3.5 w-3.5" strokeWidth={2} />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" strokeWidth={2} />
                      Copy for Claude
                    </>
                  )}
                </button>
              </summary>

              <div className="border-t border-zinc-100 px-4 pb-5 pt-4 text-sm print:border-t-0">
                <p className="text-zinc-600">{def.intro}</p>

                <div className="mt-5">
                  <h4 className="font-mono text-[10px] font-semibold uppercase tracking-[0.15em] text-zinc-500">
                    Checklist
                  </h4>
                  <ul className="mt-3 space-y-2">
                    {def.checklist.map((item) => {
                      const k = playbookKey(def.phaseId, item.id);
                      const checked = readBool(playbookResponses[k]);
                      return (
                        <li key={item.id} className="flex gap-3">
                          <input
                            id={k}
                            type="checkbox"
                            checked={checked}
                            onChange={(e) =>
                              setPlaybookField(k, e.target.checked)
                            }
                            className="mt-1 h-4 w-4 shrink-0 rounded border-zinc-300 text-zinc-900 focus:ring-zinc-400"
                          />
                          <label htmlFor={k} className="text-zinc-800">
                            {item.label}
                          </label>
                        </li>
                      );
                    })}
                  </ul>
                </div>

                <div className="mt-6 space-y-4">
                  <h4 className="font-mono text-[10px] font-semibold uppercase tracking-[0.15em] text-zinc-500">
                    Questionnaire
                  </h4>
                  {def.fields.map((field) => {
                    const k = playbookKey(def.phaseId, field.id);
                    const val =
                      typeof playbookResponses[k] === "string"
                        ? playbookResponses[k]
                        : "";
                    return (
                      <div key={field.id}>
                        <label
                          htmlFor={k}
                          className="mb-1.5 block text-sm font-medium text-zinc-800"
                        >
                          {field.label}
                        </label>
                        {field.multiline ? (
                          <textarea
                            id={k}
                            name={k}
                            value={val}
                            placeholder={field.placeholder}
                            rows={4}
                            onChange={(e) =>
                              setPlaybookField(k, e.target.value)
                            }
                            className="w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-400 focus:outline-none focus:ring-1 focus:ring-zinc-300"
                          />
                        ) : (
                          <input
                            id={k}
                            name={k}
                            type="text"
                            value={val}
                            placeholder={field.placeholder}
                            onChange={(e) =>
                              setPlaybookField(k, e.target.value)
                            }
                            className="w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-400 focus:outline-none focus:ring-1 focus:ring-zinc-300"
                          />
                        )}
                      </div>
                    );
                  })}
                </div>

                <div className="mt-6 rounded-md border border-zinc-100 bg-zinc-50 p-4">
                  <h4 className="font-mono text-[10px] font-semibold uppercase tracking-[0.15em] text-zinc-500">
                    Claude setup
                  </h4>
                  <pre className="mt-2 whitespace-pre-wrap font-sans text-xs leading-relaxed text-zinc-700">
                    {def.claudeSetup}
                  </pre>
                </div>
              </div>
            </details>
          );
        })}
      </div>
    </section>
  );
}
