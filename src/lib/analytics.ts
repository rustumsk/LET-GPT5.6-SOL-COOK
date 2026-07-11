export type FunnelEvent =
  | "calculator_started"
  | "calculator_completed"
  | "preview_generated"
  | "copy_clicked"
  | "interview_intent";

export function track(event: FunnelEvent) {
  if (process.env.NODE_ENV !== "production")
    console.info("[scope-signal]", event);
}
