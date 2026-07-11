"use client";

import { useMemo, useRef, useState } from "react";
import {
  calculateLeak,
  formatChangeOrder,
  scopeInputSchema,
  type ScopeInput,
} from "@/lib/scope-calculator";
import { track } from "@/lib/analytics";

type DraftInput = Record<keyof ScopeInput, string>;

export const presets = {
  "Solo studio": {
    projectValue: 6000,
    extraHours: 2,
    hourlyCost: 45,
    requestsPerProject: 3,
    projectsPerYear: 16,
    markupPercent: 35,
  },
  "Small team": {
    projectValue: 12000,
    extraHours: 3,
    hourlyCost: 65,
    requestsPerProject: 4,
    projectsPerYear: 18,
    markupPercent: 40,
  },
  "Established agency": {
    projectValue: 25000,
    extraHours: 5,
    hourlyCost: 90,
    requestsPerProject: 5,
    projectsPerYear: 24,
    markupPercent: 45,
  },
} satisfies Record<string, ScopeInput>;

const toDraft = (input: ScopeInput): DraftInput =>
  Object.fromEntries(
    Object.entries(input).map(([key, value]) => [key, String(value)]),
  ) as DraftInput;

const money = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

async function copyText(text: string) {
  if (!navigator.clipboard?.writeText) throw new Error("Clipboard unavailable");
  await navigator.clipboard.writeText(text);
}

export function Calculator() {
  const [draft, setDraft] = useState(() => toDraft(presets["Small team"]));
  const [activePreset, setActivePreset] = useState<string>("Small team");
  const [description, setDescription] = useState(
    "Add a newsletter signup integration",
  );
  const [preview, setPreview] = useState(false);
  const [copyStatus, setCopyStatus] = useState("");
  const [shareStatus, setShareStatus] = useState("");
  const completedTracked = useRef(false);
  const parsed = useMemo(
    () =>
      scopeInputSchema.safeParse(
        Object.fromEntries(
          Object.entries(draft).map(([key, value]) => [key, Number(value)]),
        ),
      ),
    [draft],
  );
  const input = parsed.success ? parsed.data : null;
  const result = input ? calculateLeak(input) : null;

  const update = (key: keyof ScopeInput, value: string) => {
    setActivePreset("");
    setDraft((current) => {
      const next = { ...current, [key]: value };
      const valid = scopeInputSchema.safeParse(
        Object.fromEntries(
          Object.entries(next).map(([entryKey, entryValue]) => [
            entryKey,
            Number(entryValue),
          ]),
        ),
      ).success;
      if (valid && !completedTracked.current) {
        completedTracked.current = true;
        track("calculator_completed");
      }
      return next;
    });
  };
  const applyPreset = (name: keyof typeof presets) => {
    setDraft(toDraft(presets[name]));
    setActivePreset(name);
    track("preset_selected");
  };
  const showPreview = () => {
    if (!input) return;
    setPreview(true);
    track("preview_generated");
  };
  const copy = async () => {
    if (!input) return;
    try {
      await copyText(formatChangeOrder(description, input));
      setCopyStatus("Copied ✓");
      track("copy_clicked");
    } catch {
      setCopyStatus("Select the summary and copy it manually.");
    }
  };
  const share = async () => {
    const shareData = {
      title: "ScopeSignal",
      text: "See what unbilled scope changes may be costing your agency.",
      url: window.location.href.split("#")[0] + "#calculator",
    };
    try {
      const canShare = typeof navigator.share === "function";
      if (canShare) await navigator.share(shareData);
      else await copyText(shareData.url);
      setShareStatus(canShare ? "Shared ✓" : "Link copied ✓");
      track("share_clicked");
    } catch (error) {
      if ((error as DOMException).name !== "AbortError")
        setShareStatus("Copy the page address to share it.");
    }
  };

  return (
    <section className="calculator" id="calculator">
      <div className="calculator-intro">
        <p className="eyebrow">Your margin, made visible</p>
        <h2>How much work are you giving away?</h2>
        <p>
          Use a typical fixed-fee project. A directional estimate is enough.
        </p>
        <div className="presets" aria-label="Example agency sizes">
          <span>Start with an example</span>
          {Object.keys(presets).map((name) => (
            <button
              key={name}
              type="button"
              aria-pressed={activePreset === name}
              onClick={() => applyPreset(name as keyof typeof presets)}
            >
              {name}
            </button>
          ))}
          <small>Examples, not industry benchmarks.</small>
        </div>
      </div>
      <div className="workspace">
        <form onFocus={() => track("calculator_started")}>
          <Field
            label="Typical project value"
            prefix="$"
            value={draft.projectValue}
            min={500}
            max={1000000}
            onChange={(v) => update("projectValue", v)}
          />
          <Field
            label="Hours per ‘small’ request"
            suffix="hrs"
            value={draft.extraHours}
            min={0.5}
            max={500}
            step={0.5}
            onChange={(v) => update("extraHours", v)}
          />
          <Field
            label="Requests per project"
            value={draft.requestsPerProject}
            min={1}
            max={100}
            onChange={(v) => update("requestsPerProject", v)}
          />
          <Field
            label="Internal hourly cost"
            prefix="$"
            value={draft.hourlyCost}
            min={1}
            max={1000}
            onChange={(v) => update("hourlyCost", v)}
          />
          <Field
            label="Fixed-fee projects per year"
            value={draft.projectsPerYear}
            min={1}
            max={500}
            onChange={(v) => update("projectsPerYear", v)}
          />
          <Field
            label="Target markup"
            suffix="%"
            value={draft.markupPercent}
            min={0}
            max={500}
            onChange={(v) => update("markupPercent", v)}
          />
          {!input && (
            <p className="validation" role="alert">
              Complete every field using a value within the shown range.
            </p>
          )}
        </form>
        <div className="result" aria-live="polite">
          <p>Estimated annual margin leak</p>
          <strong>{result ? money.format(result.annualCost) : "—"}</strong>
          <button
            className="primary result-action"
            disabled={!input}
            onClick={showPreview}
          >
            Turn the next request into a change order
          </button>
          {result ? (
            <div className="result-lines">
              <span>
                <b>{Math.round(result.annualHours)}</b> unbilled hours
              </span>
              <span>
                <b>{result.projectLeakPercent.toFixed(1)}%</b> of each project
              </span>
              <span>
                <b>{money.format(result.recoverableRevenue)}</b> recoverable
                revenue
              </span>
            </div>
          ) : (
            <p className="result-help">
              Fix the highlighted inputs to see your estimate.
            </p>
          )}
          <p className="formula">
            Hours × requests × projects × internal cost. Recoverable revenue
            adds your target markup.
          </p>
          <button className="share" type="button" onClick={share}>
            Share this free calculator ↗
          </button>
          <span className="action-status" aria-live="polite">
            {shareStatus}
          </span>
          <p className="privacy-note">
            Sharing sends only this page link—never your calculator inputs.
          </p>
        </div>
      </div>
      {preview && input && (
        <div className="preview">
          <div>
            <p className="eyebrow">Client-ready preview</p>
            <h3>Make the boundary easy to accept.</h3>
            <label>
              What did they ask for?
              <textarea
                value={description}
                maxLength={240}
                onChange={(e) => setDescription(e.target.value)}
              />
            </label>
          </div>
          <pre>{formatChangeOrder(description, input)}</pre>
          <button onClick={copy}>{copyStatus || "Copy summary"}</button>
        </div>
      )}
    </section>
  );
}

function Field({
  label,
  prefix,
  suffix,
  value,
  min,
  max,
  step = 1,
  onChange,
}: {
  label: string;
  prefix?: string;
  suffix?: string;
  value: string;
  min: number;
  max: number;
  step?: number;
  onChange: (value: string) => void;
}) {
  const number = Number(value);
  const invalid =
    value === "" || !Number.isFinite(number) || number < min || number > max;
  return (
    <label className={`field${invalid ? " invalid" : ""}`}>
      <span>
        {label}{" "}
        <small>
          {min}–{max}
        </small>
      </span>
      <div>
        {prefix && <i>{prefix}</i>}
        <input
          aria-label={label}
          aria-invalid={invalid}
          type="number"
          value={value}
          min={min}
          max={max}
          step={step}
          onChange={(e) => onChange(e.target.value)}
        />
        {suffix && <i>{suffix}</i>}
      </div>
    </label>
  );
}
