import Link from "next/link";

export default function PrivacyPage() {
  return (
    <main>
      <header className="nav">
        <Link className="brand" href="/" aria-label="ScopeSignal home">
          ScopeSignal<span>.</span>
        </Link>
        <Link className="nav-link" href="/">
          Back to calculator
        </Link>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow">Privacy notice</p>
          <h1>What ScopeSignal collects</h1>
          <p className="lede">
            The calculator keeps project values, hours, rates, and change
            descriptions in your browser only. Inputs are not stored on a
            server, shared with third parties, or sent when you copy/share a
            result.
          </p>
        </div>
      </section>

      <section className="how">
        <p className="eyebrow">Current data use</p>
        <h2>Minimal by default</h2>
        <ol>
          <li>
            <span>01</span>
            <div>
              <strong>Calculator inputs stay local</strong>
              <p>
                Estimated project values, hours, markup, and optional change
                descriptions remain in browser memory until you close or reload
                the page.
              </p>
            </div>
          </li>
          <li>
            <span>02</span>
            <div>
              <strong>Optional aggregate funnel analytics</strong>
              <p>
                If production analytics is explicitly enabled, ScopeSignal sends
                only aggregate page and event names such as
                <code> landing_viewed </code>
                and
                <code> preview_generated </code>
                without calculator inputs, client names, email addresses, or
                cookies.
              </p>
            </div>
          </li>
          <li>
            <span>03</span>
            <div>
              <strong>Browser opt-out respected</strong>
              <p>
                Aggregate analytics do not run when your browser sends Do Not
                Track or Global Privacy Control.
              </p>
            </div>
          </li>
        </ol>
      </section>
    </main>
  );
}
