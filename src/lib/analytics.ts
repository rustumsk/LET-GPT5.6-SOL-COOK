export type FunnelEvent =
  | "landing_viewed"
  | "calculator_started"
  | "calculator_completed"
  | "preset_selected"
  | "preview_generated"
  | "copy_clicked"
  | "share_clicked"
  | "interview_intent";

declare global {
  interface Window {
    doNotTrack?: string;
    plausible?: (event: FunnelEvent) => void;
  }
}

type PrivacyAwareNavigator = Navigator & {
  globalPrivacyControl?: boolean;
  msDoNotTrack?: string;
};

function browserOptedOut() {
  if (typeof window === "undefined") return true;
  const browser = window.navigator as PrivacyAwareNavigator;
  return (
    browser.doNotTrack === "1" ||
    browser.msDoNotTrack === "1" ||
    window.doNotTrack === "1" ||
    browser.globalPrivacyControl === true
  );
}

export function track(event: FunnelEvent) {
  if (browserOptedOut()) return;

  const mode = process.env.NEXT_PUBLIC_ANALYTICS_MODE;
  if (mode === "plausible") {
    window.plausible?.(event);
    return;
  }

  if (mode === "local" && process.env.NODE_ENV !== "production")
    console.info("[scope-signal]", event);
}
