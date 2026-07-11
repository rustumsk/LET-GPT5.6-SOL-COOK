import { z } from "zod";

export const scopeInputSchema = z.object({
  projectValue: z.number().min(500).max(1_000_000),
  extraHours: z.number().min(0.5).max(500),
  hourlyCost: z.number().min(1).max(1_000),
  requestsPerProject: z.number().int().min(1).max(100),
  projectsPerYear: z.number().int().min(1).max(500),
  markupPercent: z.number().min(0).max(500),
});

export type ScopeInput = z.infer<typeof scopeInputSchema>;

export function calculateLeak(input: ScopeInput) {
  const value = scopeInputSchema.parse(input);
  const annualHours =
    value.extraHours * value.requestsPerProject * value.projectsPerYear;
  const annualCost = annualHours * value.hourlyCost;
  const recoverableRevenue = annualCost * (1 + value.markupPercent / 100);
  const projectLeakPercent =
    ((value.extraHours * value.requestsPerProject * value.hourlyCost) /
      value.projectValue) *
    100;

  return { annualHours, annualCost, recoverableRevenue, projectLeakPercent };
}

export function formatChangeOrder(description: string, input: ScopeInput) {
  const cost =
    input.extraHours * input.hourlyCost * (1 + input.markupPercent / 100);
  return `Change request: ${description.trim() || "Additional work"}\n\nEstimated effort: ${input.extraHours} hours\nProject investment: $${Math.round(cost).toLocaleString("en-US")}\nSchedule impact: confirm after approval\n\nThis work is outside the current scope. Please approve the added investment and schedule review before work begins.`;
}
