import { Calculator } from "@/components/calculator";

export default function Home() {
  return (
    <main>
      <header className="nav">
        <a className="brand" href="#top" aria-label="ScopeSignal home">
          ScopeSignal<span>.</span>
        </a>
        <a className="nav-link" href="#calculator">
          Run the numbers ↓
        </a>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow">For small web & design agencies</p>
          <h1>
            Price the work hiding inside <em>“one small change.”</em>
          </h1>
          <p className="lede">
            See what casual scope creep costs your agency—then turn the next
            request into a calm, client-ready change order.
          </p>
          <a className="primary" href="#calculator">
            Calculate your margin leak
          </a>
          <p className="privacy-note">
            Free · no signup · inputs stay in your browser
          </p>
        </div>
        <div className="leak-visual" aria-hidden="true">
          <div className="project-total">
            <span>PROJECT</span>
            <strong>$12,000</strong>
          </div>
          <div className="cut cut-one">
            <i />
            “Could we also…”
          </div>
          <div className="cut cut-two">
            <i />
            “Just one tweak…”
          </div>
          <div className="cut cut-three">
            <i />
            “While you’re in there…”
          </div>
          <div className="leak-total">
            <span>UNBILLED</span>
            <strong>− $2,460</strong>
          </div>
        </div>
      </section>

      <section className="proof">
        <p>Not a hypothetical nuisance.</p>
        <blockquote>
          30% of agencies say scope creep costs them more than $5,000 every
          month.
        </blockquote>
        <a
          href="https://www.ignitionapp.com/news/2025-agency-pricing-cashflow-report"
          target="_blank"
          rel="noreferrer"
        >
          Ignition, 2025 Agency Pricing & Cash Flow Report ↗
        </a>
      </section>
      <Calculator />
      <section className="how">
        <p className="eyebrow">A smaller, better habit</p>
        <h2>Notice it. Price it. Put it in writing.</h2>
        <ol>
          <li>
            <span>01</span>
            <div>
              <strong>Measure the leak</strong>
              <p>
                Translate harmless-sounding extras into hours, cost, and margin.
              </p>
            </div>
          </li>
          <li>
            <span>02</span>
            <div>
              <strong>Frame the change</strong>
              <p>
                State the added work, investment, and schedule impact without
                friction.
              </p>
            </div>
          </li>
          <li>
            <span>03</span>
            <div>
              <strong>Wait for approval</strong>
              <p>A clear boundary protects the relationship and the work.</p>
            </div>
          </li>
        </ol>
      </section>
      <footer>
        <a className="brand" href="#top">
          ScopeSignal<span>.</span>
        </a>
        <p>
          An early demand experiment. Estimates are not legal or accounting
          advice.
        </p>
        <a href="mailto:?subject=ScopeSignal%20feedback&body=I%20tried%20ScopeSignal%20and...">
          Share feedback
        </a>
      </footer>
    </main>
  );
}
