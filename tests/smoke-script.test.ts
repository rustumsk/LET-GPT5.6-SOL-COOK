import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

describe("preview readiness", () => {
  it("ships a machine-readable health artifact", () => {
    expect(JSON.parse(readFileSync("public/health.json", "utf8"))).toEqual({
      status: "ok",
      service: "scope-signal",
    });
  });

  it("configures baseline browser security headers", () => {
    const config = JSON.parse(readFileSync("vercel.json", "utf8"));
    const names = config.headers[0].headers.map(
      (header: { key: string }) => header.key,
    );
    expect(names).toEqual(
      expect.arrayContaining([
        "Content-Security-Policy",
        "Referrer-Policy",
        "X-Content-Type-Options",
        "Permissions-Policy",
      ]),
    );
  });
});
