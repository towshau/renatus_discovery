/** Stored answer value for maturity questions marked not applicable */
export const MATURITY_NOT_APPLICABLE = "na" as const;

export type MaturityAnswerValue =
  | number
  | typeof MATURITY_NOT_APPLICABLE
  | undefined;

export function isMaturityNumeric(
  v: string | number | undefined,
): v is number {
  return typeof v === "number" && v >= 0 && v <= 4;
}

export function isMaturityNa(v: string | number | undefined): boolean {
  return v === MATURITY_NOT_APPLICABLE;
}
