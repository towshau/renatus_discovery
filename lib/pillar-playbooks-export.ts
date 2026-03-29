import type { PlaybookDefinition } from "./pillar-playbooks";
import { playbookKey } from "./pillar-playbooks";

function isChecked(v: string | boolean | undefined): boolean {
  if (typeof v === "boolean") return v;
  if (v === "true") return true;
  return false;
}

function fieldValue(v: string | boolean | undefined): string {
  if (v === undefined || typeof v === "boolean") return "";
  return String(v);
}

/** Build a single markdown document for one pillar (paste into Claude to draft a Skill or working chat). */
export function buildPlaybookMarkdown(
  def: PlaybookDefinition,
  responses: Record<string, string | boolean>,
): string {
  const lines: string[] = [
    `# ${def.title} — collection pack`,
    "",
    def.intro,
    "",
    "## Checklist",
    "",
  ];

  for (const item of def.checklist) {
    const k = playbookKey(def.phaseId, item.id);
    const done = isChecked(responses[k]);
    lines.push(`- [${done ? "x" : " "}] ${item.label}`);
  }

  lines.push("", "## Questionnaire", "");

  for (const f of def.fields) {
    const k = playbookKey(def.phaseId, f.id);
    const val = fieldValue(responses[k]).trim();
    lines.push(`### ${f.label}`, "", val || "_(not filled)_", "");
  }

  lines.push("## Claude setup (instructions)", "", def.claudeSetup, "");

  return lines.join("\n");
}
