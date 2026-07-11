import { describe, expect, it } from "vitest";
import { calculateLeak, formatChangeOrder } from "@/lib/scope-calculator";

const input = {
  projectValue: 12000,
  extraHours: 3,
  hourlyCost: 65,
  requestsPerProject: 4,
  projectsPerYear: 18,
  markupPercent: 40,
};

describe("scope calculator", () => {
  it("calculates annual leakage and recoverable revenue", () => {
    expect(calculateLeak(input)).toEqual({
      annualHours: 216,
      annualCost: 14040,
      recoverableRevenue: 19656,
      projectLeakPercent: 6.5,
    });
  });
  it("creates a client-readable change summary", () => {
    expect(formatChangeOrder("Add integration", input)).toContain(
      "Project investment: $273",
    );
  });
  it("rejects implausible public input", () => {
    expect(() => calculateLeak({ ...input, extraHours: 1000 })).toThrow();
  });
});
