import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { AnalyticsBeacon } from "@/components/analytics-beacon";
import { Calculator } from "@/components/calculator";
import { TrackedMailto } from "@/components/tracked-mailto";

const { track } = vi.hoisted(() => ({ track: vi.fn() }));

vi.mock("@/lib/analytics", () => ({ track }));

describe("analytics event coverage", () => {
  beforeEach(() => track.mockClear());
  afterEach(cleanup);

  it("tracks a landing view once on load", () => {
    render(<AnalyticsBeacon />);
    expect(track).toHaveBeenCalledWith("landing_viewed");
  });

  it("tracks calculator start only on the first interaction", () => {
    render(<Calculator />);
    fireEvent.focus(screen.getByLabelText("Typical project value"));
    fireEvent.focus(screen.getByLabelText("Requests per project"));

    expect(
      track.mock.calls.filter(([event]) => event === "calculator_started"),
    ).toHaveLength(1);
  });

  it("tracks interview intent from the feedback mailto link", () => {
    render(
      <TrackedMailto href="mailto:test@example.com">
        Share feedback
      </TrackedMailto>,
    );

    fireEvent.click(screen.getByText("Share feedback"));

    expect(track).toHaveBeenCalledWith("interview_intent");
  });
});
