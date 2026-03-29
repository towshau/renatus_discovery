export type QuestionType = "text" | "textarea" | "select" | "maturity";

export interface QuestionText {
  id: string;
  type: "text";
  label: string;
  placeholder: string;
}

export interface QuestionTextarea {
  id: string;
  type: "textarea";
  label: string;
  placeholder: string;
}

export interface QuestionSelect {
  id: string;
  type: "select";
  label: string;
  options: string[];
}

export interface QuestionMaturity {
  id: string;
  type: "maturity";
  label: string;
  description: string;
}

export type Question =
  | QuestionText
  | QuestionTextarea
  | QuestionSelect
  | QuestionMaturity;

export interface Phase {
  id: string;
  title: string;
  subtitle: string;
  questions: Question[];
}

export const PHASES: Phase[] = [
  {
    id: "business_dna",
    title: "Business DNA",
    subtitle: "Understanding the foundation",
    questions: [
      {
        id: "business_name",
        type: "text",
        label: "Business Name",
        placeholder: "e.g. Smith & Co Electrical",
      },
      {
        id: "owner_name",
        type: "text",
        label: "Owner / Decision Maker",
        placeholder: "Full name",
      },
      {
        id: "industry",
        type: "text",
        label: "Industry / Sector",
        placeholder: "e.g. Trade Services, Hospitality, Retail",
      },
      {
        id: "years_operating",
        type: "select",
        label: "How long has the business been operating?",
        options: ["< 1 year", "1–3 years", "3–5 years", "5–10 years", "10+ years"],
      },
      {
        id: "team_size",
        type: "select",
        label: "Team size (including owner)",
        options: ["Solo", "2–5", "6–15", "16–30", "30+"],
      },
      {
        id: "revenue_band",
        type: "select",
        label: "Approximate annual revenue",
        options: [
          "< $250K",
          "$250K–$500K",
          "$500K–$1M",
          "$1M–$3M",
          "$3M–$10M",
          "$10M+",
        ],
      },
      {
        id: "business_origin",
        type: "select",
        label: "How did you come to own/run this business?",
        options: [
          "Founded it myself",
          "Inherited / Family",
          "Acquired / Bought in",
          "Partnership",
          "Other",
        ],
      },
      {
        id: "primary_goal",
        type: "textarea",
        label:
          "What's the single biggest thing you want to achieve in the next 12 months?",
        placeholder:
          "Be specific — e.g. 'reduce admin time by 50%', 'open a second location', 'stop being the bottleneck'",
      },
      {
        id: "biggest_pain",
        type: "textarea",
        label:
          "What's the most frustrating part of running the business right now?",
        placeholder:
          "The thing that keeps you up at night or eats your time",
      },
    ],
  },
  {
    id: "brand_identity",
    title: "Brand & Identity",
    subtitle: "How you show up to the world",
    questions: [
      {
        id: "brand_logo",
        type: "maturity",
        label: "Logo & Visual Identity",
        description:
          "Do you have a professional logo, brand colours, and typography defined?",
      },
      {
        id: "brand_guidelines",
        type: "maturity",
        label: "Brand Guidelines Document",
        description:
          "Is there a documented style guide your team (or contractors) can reference?",
      },
      {
        id: "brand_assets",
        type: "maturity",
        label: "Digital Asset Organisation",
        description:
          "Are logos, photos, templates stored in one accessible place (not someone's phone)?",
      },
      {
        id: "brand_website",
        type: "maturity",
        label: "Website & Online Presence",
        description:
          "Is your website up to date, mobile-friendly, and reflecting your current offering?",
      },
      {
        id: "brand_consistency",
        type: "maturity",
        label: "Brand Consistency Across Channels",
        description:
          "Does your branding look the same on socials, signage, invoices, and uniforms?",
      },
      {
        id: "brand_notes",
        type: "textarea",
        label: "Notes — anything specific about brand/identity?",
        placeholder:
          "e.g. 'We rebranded 2 years ago but half the old stuff is still floating around'",
      },
    ],
  },
  {
    id: "marketing_sales",
    title: "Marketing & Sales",
    subtitle: "How you attract and convert customers",
    questions: [
      {
        id: "mkt_social",
        type: "maturity",
        label: "Social Media Presence",
        description:
          "Active profiles with consistent posting and engagement?",
      },
      {
        id: "mkt_content",
        type: "maturity",
        label: "Content Creation Process",
        description:
          "Do you have a repeatable system for creating posts, blogs, videos, or emails?",
      },
      {
        id: "mkt_lead_capture",
        type: "maturity",
        label: "Lead Capture & Follow-up",
        description:
          "When someone enquires, is there a defined process to capture and follow up?",
      },
      {
        id: "mkt_crm",
        type: "maturity",
        label: "CRM / Customer Database",
        description:
          "Do you have a central system tracking all prospects and customers?",
      },
      {
        id: "mkt_paid",
        type: "maturity",
        label: "Paid Advertising",
        description:
          "Running any paid ads (Google, Meta, etc.) with tracking in place?",
      },
      {
        id: "mkt_referrals",
        type: "maturity",
        label: "Referral / Word-of-Mouth System",
        description:
          "Is there a structured referral program or review collection process?",
      },
      {
        id: "mkt_notes",
        type: "textarea",
        label: "Notes — anything specific about marketing/sales?",
        placeholder:
          "e.g. 'All our leads come from Google but we've never touched socials'",
      },
    ],
  },
  {
    id: "operations",
    title: "Operations & Workflows",
    subtitle: "How work actually gets done",
    questions: [
      {
        id: "ops_sops",
        type: "maturity",
        label: "Standard Operating Procedures (SOPs)",
        description:
          "Are your key processes documented so anyone could follow them?",
      },
      {
        id: "ops_project_mgmt",
        type: "maturity",
        label: "Project / Task Management",
        description:
          "Using a tool (Asana, Monday, Linear, Trello) to track work and deadlines?",
      },
      {
        id: "ops_scheduling",
        type: "maturity",
        label: "Scheduling & Calendar Management",
        description:
          "Appointments, jobs, shifts — is scheduling centralised and automated?",
      },
      {
        id: "ops_comms",
        type: "maturity",
        label: "Internal Communication",
        description:
          "Does the team have a structured comms channel (Slack, Teams) beyond group texts?",
      },
      {
        id: "ops_handoffs",
        type: "maturity",
        label: "Handoffs & Accountability",
        description:
          "When work moves between people, is it clear who owns what and when?",
      },
      {
        id: "ops_automation",
        type: "maturity",
        label: "Workflow Automation",
        description:
          "Any repetitive tasks automated (email sequences, invoice reminders, form routing)?",
      },
      {
        id: "ops_notes",
        type: "textarea",
        label: "Notes — anything specific about operations?",
        placeholder:
          "e.g. 'Everything lives in the owner's head — if he's away, nothing moves'",
      },
    ],
  },
  {
    id: "data_systems",
    title: "Data & Systems",
    subtitle: "Your digital infrastructure",
    questions: [
      {
        id: "data_central",
        type: "maturity",
        label: "Central Source of Truth",
        description:
          "Is there one system where key business data lives (not scattered spreadsheets)?",
      },
      {
        id: "data_reporting",
        type: "maturity",
        label: "Reporting & Dashboards",
        description:
          "Can you see KPIs at a glance, or do you have to manually compile numbers?",
      },
      {
        id: "data_integrations",
        type: "maturity",
        label: "System Integrations",
        description:
          "Do your tools talk to each other, or is data manually moved between systems?",
      },
      {
        id: "data_inventory",
        type: "maturity",
        label: "Inventory / Stock Management",
        description:
          "If applicable — is stock tracked digitally with alerts and reorder points?",
      },
      {
        id: "data_security",
        type: "maturity",
        label: "Data Security & Backups",
        description:
          "Are passwords managed, access controlled, and data backed up?",
      },
      {
        id: "data_tools",
        type: "textarea",
        label: "List the main tools/software you currently use",
        placeholder:
          "e.g. Xero, Google Workspace, Excel, pen & paper, custom app",
      },
      {
        id: "data_notes",
        type: "textarea",
        label: "Notes — anything specific about data/systems?",
        placeholder:
          "e.g. 'We have 10 years of customer data in spreadsheets that nobody uses'",
      },
    ],
  },
  {
    id: "finance_admin",
    title: "Finance & Admin",
    subtitle: "Money in, money out, compliance",
    questions: [
      {
        id: "fin_invoicing",
        type: "maturity",
        label: "Invoicing & Payments",
        description:
          "Automated invoicing with online payment options and follow-up on overdue?",
      },
      {
        id: "fin_bookkeeping",
        type: "maturity",
        label: "Bookkeeping & Accounting",
        description:
          "Using proper accounting software (Xero, MYOB, QBO) with regular reconciliation?",
      },
      {
        id: "fin_cashflow",
        type: "maturity",
        label: "Cash Flow Visibility",
        description:
          "Can you see forward cash position, or are you guessing week to week?",
      },
      {
        id: "fin_payroll",
        type: "maturity",
        label: "Payroll & HR Compliance",
        description:
          "Payroll automated, awards/entitlements tracked, contracts in place?",
      },
      {
        id: "fin_contracts",
        type: "maturity",
        label: "Contracts & Legal",
        description:
          "Customer/supplier contracts templated, signed digitally, stored centrally?",
      },
      {
        id: "fin_notes",
        type: "textarea",
        label: "Notes — anything specific about finance/admin?",
        placeholder:
          "e.g. 'Bookkeeper does everything — we have no visibility until BAS time'",
      },
    ],
  },
  {
    id: "team_culture",
    title: "Team & Culture",
    subtitle: "Your people engine",
    questions: [
      {
        id: "team_onboarding",
        type: "maturity",
        label: "Onboarding Process",
        description:
          "New hires have a structured first week with clear expectations and training?",
      },
      {
        id: "team_training",
        type: "maturity",
        label: "Ongoing Training & Development",
        description:
          "Regular upskilling, performance reviews, or development plans?",
      },
      {
        id: "team_accountability",
        type: "maturity",
        label: "Role Clarity & Accountability",
        description:
          "Everyone has a clear role description and knows their KPIs?",
      },
      {
        id: "team_meetings",
        type: "maturity",
        label: "Meeting Cadence & Structure",
        description:
          "Regular team meetings with agendas, action items, and follow-through?",
      },
      {
        id: "team_delegation",
        type: "maturity",
        label: "Owner Delegation Level",
        description:
          "Can the business run for a week without the owner being involved?",
      },
      {
        id: "team_notes",
        type: "textarea",
        label: "Notes — anything specific about team/culture?",
        placeholder:
          "e.g. 'I do everything — the team just does what I tell them each morning'",
      },
    ],
  },
  {
    id: "ai_readiness",
    title: "AI Readiness",
    subtitle: "Where AI can accelerate you",
    questions: [
      {
        id: "ai_current",
        type: "select",
        label: "Current AI usage in the business",
        options: [
          "None — haven't touched it",
          "Dabbled — tried ChatGPT a few times",
          "Using it occasionally for content or ideas",
          "Integrated into a few workflows",
          "AI is embedded across operations",
        ],
      },
      {
        id: "ai_comfort",
        type: "select",
        label: "Owner's comfort level with technology",
        options: [
          "Avoids it — prefers pen & paper",
          "Basic — can use email and apps",
          "Competent — picks up new tools reasonably fast",
          "Strong — comfortable building in no-code tools",
          "Technical — can code or has dev experience",
        ],
      },
      {
        id: "ai_team_comfort",
        type: "select",
        label: "Team's comfort level with technology",
        options: [
          "Very low — resistant to change",
          "Low — will use what's required but slowly",
          "Moderate — open to learning",
          "High — team picks things up quickly",
          "Very high — team drives tech adoption",
        ],
      },
      {
        id: "ai_budget",
        type: "select",
        label: "Monthly budget for tools & software",
        options: [
          "Minimal ($0–$100/mo)",
          "Modest ($100–$500/mo)",
          "Moderate ($500–$1,500/mo)",
          "Significant ($1,500–$5,000/mo)",
          "Flexible ($5,000+/mo)",
        ],
      },
      {
        id: "ai_priorities",
        type: "textarea",
        label:
          "If AI could fix ONE thing in your business tomorrow, what would it be?",
        placeholder: "e.g. 'Stop me from manually quoting every single job'",
      },
    ],
  },
];

export const SCORED_PHASE_IDS = [
  "brand_identity",
  "marketing_sales",
  "operations",
  "data_systems",
  "finance_admin",
  "team_culture",
] as const;

export function getMaturityQuestionIds(): string[] {
  const ids: string[] = [];
  for (const phase of PHASES) {
    for (const q of phase.questions) {
      if (q.type === "maturity") ids.push(q.id);
    }
  }
  return ids;
}

export function isNotesField(questionId: string): boolean {
  return questionId === "data_tools" || questionId.endsWith("_notes");
}
