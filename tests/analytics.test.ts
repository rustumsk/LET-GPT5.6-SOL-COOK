import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { track } from "@/lib/analytics";

describe("analytics adapter", () => {
  const info = vi.spyOn(console, "info").mockImplementation(() => {});

  beforeEach(() => {
    vi.unstubAllEnvs();
    window.plausible = vi.fn();
    Object.defineProperty(window, "doNotTrack", {
      configurable: true,
      value: "0",
    });
    Object.defineProperty(window.navigator, "doNotTrack", {
      configurable: true,
      value: "0",
    });
    Object.defineProperty(window.navigator, "globalPrivacyControl", {
      configurable: true,
      value: false,
    });
  });

  afterEach(() => {
    info.mockClear();
    delete window.plausible;
  });

  it("logs locally during development mode", () => {
    vi.stubEnv("NEXT_PUBLIC_ANALYTICS_MODE", "local");
    track("landing_viewed");
    expect(info).toHaveBeenCalledWith("[scope-signal]", "landing_viewed");
  });

  it("forwards events to Plausible when enabled", () => {
    vi.stubEnv("NEXT_PUBLIC_ANALYTICS_MODE", "plausible");
    track("preview_generated");
    expect(window.plausible).toHaveBeenCalledWith("preview_generated");
  });

  it("suppresses analytics when browser opt-out is enabled", () => {
    vi.stubEnv("NEXT_PUBLIC_ANALYTICS_MODE", "plausible");
    Object.defineProperty(window.navigator, "doNotTrack", {
      configurable: true,
      value: "1",
    });

    track("landing_viewed");

    expect(window.plausible).not.toHaveBeenCalled();
    expect(info).not.toHaveBeenCalled();
  });
});
