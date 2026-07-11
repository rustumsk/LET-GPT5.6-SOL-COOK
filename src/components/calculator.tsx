"use client";

import { useMemo, useState } from "react";
import {
  calculateLeak,
  formatChangeOrder,
  type ScopeInput,
} from "@/lib/scope-calculator";
import { track } from "@/lib/analytics";

const initial: ScopeInput = {
  projectValue: 12000,
  extraHours: 3,
  hourlyCost: 65,
  requestsPerProject: 4,
  projectsPerYear: 18,
  markupPercent: 40,
};
const money = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

export function Calculator() {
  const [input, setInput] = useState(initial);
  const [description, setDescription] = useState(
    "Add a newsletter signup integration",
  );
  const [preview, setPreview] = useState(false);
  const [copied, setCopied] = useState(false);
  const result = useMemo(() => calculateLeak(input), [input]);
  const update = (key: keyof ScopeInput, value: string) =>
    setInput((current) => ({ ...current, [key]: Number(value) }));
  const showPreview = () => {
    setPreview(true);
    track("preview_generated");
  };
  const copy = async () => {
    await navigator.clipboard.writeText(formatChangeOrder(description, input));
    setCopied(true);
    track("copy_clicked");
  };

  return (
    <section className="calculator" id="calculator">
      <div className="calculator-intro">
        <p className="eyebrow">Your margin, made visible</p>
        <h2>How much work are you giving away?</h2>
        <p>
          Use a typical fixed-fee project. A directional estimate is enough.
        </p>
      </div>
      <div className="workspace">
        <form
          onFocus={() => track("calculator_started")}
          onChange={() => track("calculator_completed")}
        >
          <Field
            label="Typical project value"
            prefix="$"
            value={input.projectValue}
            min={500}
            max={1000000}
            onChange={(v) => update("projectValue", v)}
          />
          <Field
            label="Hours per ‘small’ request"
            suffix="hrs"
            value={input.extraHours}
            min={0.5}
            max={500}
            step={0.5}
            onChange={(v) => update("extraHours", v)}
          />
          <Field
            label="Requests per project"
            value={input.requestsPerProject}
            min={1}
            max={100}
            onChange={(v) => update("requestsPerProject", v)}
          />
          <Field
            label="Internal hourly cost"
            prefix="$"
            value={input.hourlyCost}
            min={1}
            max={1000}
            onChange={(v) => update("hourlyCost", v)}
          />
          <Field
            label="Fixed-fee projects per year"
            value={input.projectsPerYear}
            min={1}
            max={500}
            onChange={(v) => update("projectsPerYear", v)}
          />
          <Field
            label="Target markup"
            suffix="%"
            value={input.markupPercent}
            min={0}
            max={500}
            onChange={(v) => update("markupPercent", v)}
          />
        </form>
        <div className="result" aria-live="polite">
          <p>Estimated annual margin leak</p>
          <strong>{money.format(result.annualCost)}</strong>
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
          <button className="primary" onClick={showPreview}>
            Turn the next request into a change order
          </button>
        </div>
      </div>
      {preview && (
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
          <button onClick={copy}>{copied ? "Copied ✓" : "Copy summary"}</button>
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
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (value: string) => void;
}) {
  return (
    <label className="field">
      <span>{label}</span>
      <div>
        {prefix && <i>{prefix}</i>}
        <input
          aria-label={label}
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
