import type { Metadata } from "next";
import { AnalyticsScript } from "@/components/analytics-script";
import "./globals.css";

export const metadata: Metadata = {
  title: "ScopeSignal — Price the work hiding in ‘one small change’",
  description:
    "A free scope-creep cost calculator and client-ready change-order preview for small agencies.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <AnalyticsScript />
        {children}
      </body>
    </html>
  );
}
