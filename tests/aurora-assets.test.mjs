import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";

const site = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const aurora = path.join(site, "public/aurora");
const html = readFileSync(path.join(aurora, "index.html"), "utf8");
const heroBundle = readFileSync(path.join(aurora, "_next/static/chunks/0c3z-90flfp5o.js"), "utf8");

test("Aurora keeps its original WebGL module and all four requested presets", () => {
  assert.match(heroBundle, /function iU\(\{config:/);
  for (const preset of ["stream", "cascade", "veil", "ember"]) {
    assert.match(heroBundle, new RegExp(`id:"${preset}"`));
  }
  assert.ok(existsSync(path.join(aurora, "_next/static/chunks/02y6c_gs73h-x.js")));
});

test("Aurora HTML resolves its local assets and contains the adapted message", () => {
  for (const [, asset] of html.matchAll(/(?:src|href)="(\.\/(?:_next|adapter)[^"]+)"/g)) {
    assert.ok(existsSync(path.resolve(aurora, asset)), `Missing ${asset}`);
  }
  assert.match(html, /Sua vaga em saúde bucal começa com um plano/);
  assert.doesNotMatch(html, /analytics\.modulify\.ai/);
  assert.doesNotMatch(html, /data-modulify-badge|Edit with Modulify/);
});
