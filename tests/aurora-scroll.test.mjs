import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { runInNewContext } from "node:vm";
import test from "node:test";

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));

test("Aurora follows trusted scroll messages through all four presets", () => {
  const listeners = {};
  const properties = new Map();
  const steps = [];
  const parent = { postMessage: (message) => { steps.push(message); } };
  let selected = "Stream";
  const buttons = ["Stream", "Cascade", "Veil", "Ember"].map((name) => ({
    textContent: name,
    getAttribute: () => String(selected === name),
    click: () => { selected = name; },
  }));
  const window = {
    parent,
    location: { origin: "https://prepara.test" },
    addEventListener: (type, callback) => { listeners[type] = callback; },
    matchMedia: () => ({ matches: false }),
  };
  const document = {
    documentElement: { style: { setProperty: (name, value) => properties.set(name, value) } },
    createElement: () => ({}),
    head: { append: () => {} },
    addEventListener: () => {},
    querySelectorAll: () => buttons,
  };
  runInNewContext(readFileSync(path.join(root, "public/aurora/adapter.js"), "utf8"), { window, document });

  for (const [preset, reveal] of [["Stream", 0], ["Cascade", 0.5], ["Veil", 1], ["Ember", 1]]) {
    listeners.message({ origin: window.location.origin, source: parent, data: { type: "prepara-aurora-scroll", preset, reveal } });
    assert.equal(selected, preset);
    assert.equal(properties.get("--aurora-reveal"), String(reveal));
  }
  listeners.message({ origin: "https://other.test", source: parent, data: { type: "prepara-aurora-scroll", preset: "Stream", reveal: 0 } });
  assert.equal(selected, "Ember");
  listeners.message({ origin: window.location.origin, source: parent, data: { type: "prepara-aurora-scroll", preset: "Dusk", reveal: 0 } });
  assert.equal(selected, "Ember");

  let prevented = false;
  listeners.wheel({ deltaY: 3500, preventDefault: () => { prevented = true; } });
  assert.equal(prevented, true);
  assert.equal(steps.at(-1).type, "prepara-aurora-step");
  assert.equal(steps.at(-1).direction, 1);
  listeners.touchstart({ touches: [{ clientY: 200 }] });
  listeners.touchmove({ touches: [{ clientY: 130 }], preventDefault: () => {} });
  assert.equal(steps.at(-1).type, "prepara-aurora-step");
  assert.equal(steps.at(-1).direction, 1);
  assert.equal(steps.length, 2);
  listeners.touchmove({ touches: [{ clientY: 80 }], preventDefault: () => {} });
  assert.equal(steps.length, 2);
});
