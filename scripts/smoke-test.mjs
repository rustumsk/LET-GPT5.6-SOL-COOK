const baseUrl = process.env.SMOKE_BASE_URL ?? process.argv[2];

if (!baseUrl) {
  throw new Error(
    "Set SMOKE_BASE_URL or pass the deployment URL as an argument.",
  );
}

const base = new URL(baseUrl);

async function assertResponse(path, assertion) {
  const response = await fetch(new URL(path, base), {
    headers: { "user-agent": "scope-signal-smoke-test" },
    redirect: "follow",
  });
  if (!response.ok) throw new Error(`${path} returned HTTP ${response.status}`);
  await assertion(response);
}

await assertResponse("/", async (response) => {
  const html = await response.text();
  if (!html.includes("ScopeSignal"))
    throw new Error("Landing page brand marker is missing.");
});

await assertResponse("/health.json", async (response) => {
  const health = await response.json();
  if (health.status !== "ok" || health.service !== "scope-signal") {
    throw new Error("Health response is invalid.");
  }
});

console.log(`Smoke test passed for ${base.origin}`);
