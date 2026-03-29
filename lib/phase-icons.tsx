import {
  Bot,
  Boxes,
  Coins,
  Database,
  Dna,
  Megaphone,
  Palette,
  Users,
  Workflow,
} from "lucide-react";

const PHASE_ICON_MAP = {
  business_dna: Dna,
  brand_identity: Palette,
  marketing_sales: Megaphone,
  operations: Workflow,
  data_systems: Database,
  finance_admin: Coins,
  team_culture: Users,
  ai_readiness: Bot,
} as const;

export type PhaseId = keyof typeof PHASE_ICON_MAP;

export function PhaseIcon({
  phaseId,
  className,
  strokeWidth = 1.5,
}: {
  phaseId: string;
  className?: string;
  strokeWidth?: number;
}) {
  const Icon = PHASE_ICON_MAP[phaseId as PhaseId] ?? Boxes;
  return (
    <Icon
      className={className}
      strokeWidth={strokeWidth}
      aria-hidden
    />
  );
}
