export interface PlaybookChecklistItem {
  id: string;
  label: string;
}

export interface PlaybookField {
  id: string;
  label: string;
  placeholder?: string;
  multiline?: boolean;
}

export interface PlaybookDefinition {
  phaseId: string;
  title: string;
  intro: string;
  checklist: PlaybookChecklistItem[];
  fields: PlaybookField[];
  /** Markdown-friendly plain text for Claude setup */
  claudeSetup: string;
}

export function playbookKey(phaseId: string, suffix: string): string {
  return `${phaseId}__${suffix}`;
}

export const PILLAR_PLAYBOOKS: PlaybookDefinition[] = [
  {
    phaseId: "brand_identity",
    title: "Brand & Identity",
    intro:
      "Collect assets and answers so you can turn them into a Claude Skill—a repeatable playbook for on-brand outputs. Typical Claude Pro usage is in the ~US$20–25/mo range (varies by region and plan)—adjust for your billing context.",
    checklist: [
      { id: "chk_logo", label: "Current logo files (vector + PNG) located or exported" },
      { id: "chk_website", label: "Primary website URL and access to update or brief a web person" },
      { id: "chk_palette", label: "Colour palette documented (hex codes)" },
      { id: "chk_typography", label: "Fonts chosen (web-safe or licensed) and usage rules" },
      { id: "chk_voice", label: "Brand voice / tone notes drafted (even bullet points)" },
    ],
    fields: [
      {
        id: "field_logo_location",
        label: "Where are logo files stored (link or folder)?",
        placeholder: "e.g. Google Drive / brand folder URL",
      },
      {
        id: "field_website",
        label: "Website URL",
        placeholder: "https://",
      },
      {
        id: "field_colours",
        label: "Colour palette (hex)",
        placeholder: "Primary: #...  Secondary: #...  Accent: #...",
        multiline: true,
      },
      {
        id: "field_competitors",
        label: "Who do you want to sound different from (competitors or references)?",
        multiline: true,
      },
      {
        id: "field_audience",
        label: "Ideal customer in one paragraph",
        multiline: true,
      },
      {
        id: "field_brand_story",
        label: "Why does this business exist? (origin story / mission)",
        multiline: true,
      },
    ],
    claudeSetup: `## Claude setup — Brand & Identity

**What you’re building:** A **Claude Skill** that encodes how brand work gets done every time—voice, colours, typography, logo rules, and output formats—so you are not re-setting “project instructions” for each asset.

1. **Gather source material** — Logo files, any brand PDFs, hex lists, competitor notes. Add the questionnaire answers below in the same paste block (or upload files in a chat that supports attachments). Ask Claude to treat only this material as fact.

2. **Draft the Skill body in one working chat** — Prompt for **Skill-ready text**, not a loose essay. Example: *"From the uploads and pasted answers only, write the full body I should paste into a new Claude Skill: voice and tone rules, colour palette with hex codes, typography, logo do/don'ts, and short templates per output type (e.g. brief for design, deck outline, email, social). Use bullets; flag anything missing."*

3. **Create the Skill** — In Claude’s Skills area (see Anthropic’s Skills docs for your plan), create a Skill and paste the draft from step 2. Refine until it reads like repeatable operating rules, not a one-off summary.

4. **Use it as the repeatable layer** — Enable the Skill so future requests for copy or creative follow the same process. Use a Project with file uploads only when you need a **temporary** workspace for a specific campaign; the Skill stays the durable, reusable layer.

5. **Optional check** — Run one test prompt after enabling: *"Write a short on-brand email header using only the Skill rules."* Adjust the Skill if it drifts.

Paste questionnaire answers below when you run step 2.`,
  },
  {
    phaseId: "marketing_sales",
    title: "Marketing & Sales",
    intro:
      "Capture funnel, channels, and numbers so you can bake them into a Marketing & Sales Skill—repeatable messaging and pipeline guardrails instead of one-off project settings.",
    checklist: [
      { id: "chk_icp", label: "Ideal customer profile (ICP) written down" },
      { id: "chk_channels", label: "Active marketing channels listed (paid + organic)" },
      { id: "chk_crm", label: "CRM or lead list location identified" },
      { id: "chk_metrics", label: "Last 90 days lead/revenue metrics approximated" },
    ],
    fields: [
      {
        id: "field_icp",
        label: "Ideal customer (role, industry, geography, budget signals)",
        multiline: true,
      },
      {
        id: "field_channels",
        label: "Which channels do you use today? What works / what failed?",
        multiline: true,
      },
      {
        id: "field_offer",
        label: "Core offer in one sentence (what you sell)",
      },
      {
        id: "field_objections",
        label: "Top 3 buyer objections and how you answer them",
        multiline: true,
      },
      {
        id: "field_kpis",
        label: "KPIs you watch (e.g. leads/week, conversion %, CAC)",
        multiline: true,
      },
      {
        id: "field_sales_process",
        label: "Sales process steps from first touch to close",
        multiline: true,
      },
    ],
    claudeSetup: `## Claude setup — Marketing & Sales

**What you’re building:** A **Claude Skill** that encodes ICP, core messaging, KPI guardrails, and channel rules—so every campaign, script, or pipeline touch follows the same playbook without rebuilding context each time.

1. **Gather source material** — ICP notes, past campaign examples, a simple metrics spreadsheet if you have one, plus the questionnaire answers below.

2. **Draft the Skill body in one working chat** — Ask for **Skill-ready text** grounded in that material. Example: *"From this context only, write the full Skill body I should paste into Claude: ICP summary, positioning and value props, tone, channel-specific rules (email, social, ads), pipeline stages we care about, and KPIs to respect. Bullets and constraints—no generic marketing lecture."*

3. **Create the Skill** — Paste the draft into a new Skill (Anthropic Skills documentation for your plan). Iterate in a short follow-up until it is stable enough to reuse weekly.

4. **Projects vs Skills** — A **Project** is optional: use it when you need persistent file uploads for a season. The **Skill** is what makes the *process* repeatable across chats. Do not confuse “custom instructions in a Project” with the Skill—you want the Skill to hold the durable rules.

5. **Naming** — There is no guaranteed in-product name like “Marketing Manager skill.” Name the Skill after your business or offer (e.g. "Acme — marketing & pipeline").

6. **Inspiration only** — Community or open-source Skill templates can give structure; copy the pattern into **your** Skill with your ICP and numbers.

Use questionnaire answers below when you run step 2.`,
  },
  {
    phaseId: "operations",
    title: "Operations & Workflows",
    intro:
      "Document products, journeys, and handoffs so Claude can help you refine SOPs and a living client journey map.",
    checklist: [
      { id: "chk_products", label: "List of products/services is written" },
      { id: "chk_journey", label: "At least one end-to-end customer journey drafted" },
      { id: "chk_sops", label: "Critical SOPs identified (even if not yet written)" },
      { id: "chk_handoffs", label: "Handoff points between people/tools named" },
    ],
    fields: [
      {
        id: "field_products",
        label: "What do you sell? (one block per product/service line)",
        multiline: true,
      },
      {
        id: "field_journey_main",
        label: "For your main offer: step-by-step customer journey (awareness → delivery → referral)",
        multiline: true,
      },
      {
        id: "field_comms_per_step",
        label: "At each step: what communication happens (email, SMS, call, portal)? Who owns it?",
        multiline: true,
      },
      {
        id: "field_bottlenecks",
        label: "Where does work get stuck today?",
        multiline: true,
      },
      {
        id: "field_tools_ops",
        label: "Tools used for scheduling, tasks, and comms",
        multiline: true,
      },
    ],
    claudeSetup: `## Claude setup — Operations & workflows

1. **Create a Project** (e.g. "Operations & journeys — [Business name]").
2. **Custom instructions**: "You help document SOPs and client journeys. Use structured headings. Ask for missing owners and deadlines."
3. **Upload**: any existing process docs, screenshots, or checklists.
4. **First prompt**: "Turn my journey notes into a master client journey: stages, owner, tools, SLA, and failure points. Then list SOPs to write first."

5. **Skill (optional)** — When the journey and SOP structure stabilise, ask Claude to distil them into **Skill-ready text** (headings, owners, SLAs, escalation) and save as a Skill so repeat process work does not depend on Project settings alone.

Add to a Project over time as you refine steps—treat it as a living system; the Skill holds the durable repeat playbook.`,
  },
  {
    phaseId: "data_systems",
    title: "Data & Systems",
    intro:
      "Clarify systems of record, integrations, and reporting so AI suggestions stay grounded in how data actually flows.",
    checklist: [
      { id: "chk_stack", label: "Core apps listed (finance, CRM, ops)" },
      { id: "chk_source", label: "Primary source of truth per key dataset named" },
      { id: "chk_backup", label: "Backup / access recovery understood at high level" },
    ],
    fields: [
      {
        id: "field_stack",
        label: "Main software stack (list each and what it’s for)",
        multiline: true,
      },
      {
        id: "field_integrations",
        label: "What integrates today? What is manual copy-paste?",
        multiline: true,
      },
      {
        id: "field_reporting",
        label: "Reports you wish you had weekly",
        multiline: true,
      },
      {
        id: "field_risks",
        label: "Data security or single-point-of-failure worries",
        multiline: true,
      },
    ],
    claudeSetup: `## Claude setup — Data & systems

1. **Project**: "Data & reporting — [Business name]".
2. **Instructions**: "You advise on systems and reporting. Never invent system names—use the stack list. Prefer practical, staged improvements."
3. **Upload**: exports or screenshots if safe to share (redact secrets).
4. **First prompt**: "Given my stack, propose a simple architecture diagram in text, top 3 integration wins, and a minimal KPI dashboard spec."

5. **Skill (optional)** — Once you like the output, convert it into a Skill that codifies your stack truth and reporting rules so future advice stays consistent.`,
  },
  {
    phaseId: "finance_admin",
    title: "Finance & Admin",
    intro:
      "Capture how money moves and who is responsible—so guidance stays aligned with compliance and cash reality.",
    checklist: [
      { id: "chk_accounting", label: "Accounting platform named" },
      { id: "chk_cadence", label: "How often books are reconciled (approx.)" },
      { id: "chk_payroll", label: "Payroll / contractor process identified" },
    ],
    fields: [
      {
        id: "field_fin_tools",
        label: "Accounting, invoicing, payroll tools",
        multiline: true,
      },
      {
        id: "field_cashflow",
        label: "How do you track cash flow today? Pain points?",
        multiline: true,
      },
      {
        id: "field_compliance",
        label: "Regulatory or industry compliance notes (high level)",
        multiline: true,
      },
      {
        id: "field_fin_goals",
        label: "Financial goals for the next 12 months",
        multiline: true,
      },
    ],
    claudeSetup: `## Claude setup — Finance & admin

1. **Project**: "Finance ops — [Business name]".
2. **Instructions**: "You support finance admin planning, not tax advice. Encourage qualified professionals for legal/tax decisions."
3. **Upload**: chart of accounts export (if appropriate), invoice templates—only non-sensitive summaries if preferred.
4. **First prompt**: "Summarise gaps in my finance workflow and a 90-day improvement plan with owners and tools."

5. **Skill (optional)** — If the same cadence and tools apply repeatedly, distill that into a Skill (non–tax-advice guardrails, tools named, review rhythm) for consistent check-ins.`,
  },
  {
    phaseId: "team_culture",
    title: "Team & Culture",
    intro:
      "Describe roles, culture, and delegation so AI suggestions fit how your team actually works.",
    checklist: [
      { id: "chk_org", label: "Org chart or role list (even informal)" },
      { id: "chk_rituals", label: "Recurring meetings / cadence noted" },
      { id: "chk_delegation", label: "What only the owner can do today (honest list)" },
    ],
    fields: [
      {
        id: "field_roles",
        label: "Who does what? (roles and names)",
        multiline: true,
      },
      {
        id: "field_culture",
        label: "How would you describe team culture in one paragraph?",
        multiline: true,
      },
      {
        id: "field_hiring",
        label: "Next hires or skill gaps",
        multiline: true,
      },
      {
        id: "field_delegation",
        label: "What would you delegate first if you had capacity?",
        multiline: true,
      },
    ],
    claudeSetup: `## Claude setup — Team & culture

1. **Project**: "Team & culture — [Business name]".
2. **Instructions**: "You coach on org design, meetings, and delegation. Be direct and kind. Respect small-team constraints."
3. **First prompt**: "Suggest a simple RACI for our key processes and a 30-day delegation experiment with metrics."

4. **Skill (optional)** — When roles and cadence are clear, capture them in a Skill so team and culture prompts stay aligned without re-explaining the org each time.`,
  },
];

export function getPlaybook(phaseId: string): PlaybookDefinition | undefined {
  return PILLAR_PLAYBOOKS.find((p) => p.phaseId === phaseId);
}
