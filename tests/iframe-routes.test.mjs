import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";

const site = path.dirname(path.dirname(fileURLToPath(import.meta.url)));

test("embedded pages use exported directory routes", () => {
  const files = ["app/Hero.tsx", "app/MethodTimeline.tsx", "app/page.tsx"];
  const sources = files.map((file) => readFileSync(path.join(site, file), "utf8")).join("\n");
  const routes = [...sources.matchAll(/src=\{`\$\{basePath\}(\/[\w-]+\/)`\}/g)].map((match) => match[1]);
  assert.deepEqual(routes.sort(), ["/3d-proof/", "/aurora/", "/closing/", "/folders/", "/proof/", "/timeline/"]);
  for (const route of routes) {
    assert.ok(existsSync(path.join(site, "public", route, "index.html")), `Missing ${route}`);
  }
});
