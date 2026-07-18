import Script from "next/script";

export function AnalyticsScript() {
  if (
    process.env.NEXT_PUBLIC_ANALYTICS_MODE !== "plausible" ||
    !process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN
  )
    return null;

  return (
    <Script
      defer
      data-domain={process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN}
      src="https://plausible.io/js/script.js"
    />
  );
}
