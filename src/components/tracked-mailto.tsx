"use client";

import type { ReactNode } from "react";
import { track } from "@/lib/analytics";

export function TrackedMailto({
  children,
  className,
  href,
}: {
  children: ReactNode;
  className?: string;
  href: string;
}) {
  return (
    <a
      className={className}
      href={href}
      onClick={() => track("interview_intent")}
    >
      {children}
    </a>
  );
}
