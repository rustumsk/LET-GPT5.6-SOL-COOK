import { existsSync } from "node:fs";

if (existsSync("drizzle") || existsSync("prisma")) {
  throw new Error(
    "A database directory exists but migration validation is not configured.",
  );
}
console.log("No database or migrations in the static validation asset.");
