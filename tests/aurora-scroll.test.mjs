import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { runInNewContext } from "node:vm";
import test from "node:test";

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));

test("Aurora cycles four original presets while one scroll advances the page", () => {
  const listeners = {};
  const properties = new Map();
  const messages = [];
  const timers = [];
  const parent = { postMessage: (message) => { messages.push(message); } };
  let selected = "Stream";
  let now = 0;
  let mounted = false;
  let onMutation;
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
    querySelector: () => mounted ? {} : null,
    querySelectorAll: () => buttons,
  };
  runInNewContext(readFileSync(path.join(root, "public/aurora/adapter.js"), "utf8"), {
    window, document, performance: { now: () => now },
    setInterval: (callback, delay) => timers.push({ callback, delay }),
    MutationObserver: class {
      constructor(callback) { onMutation = callback; }
      observe() {}
      disconnect() {}
    },
  });

  listeners.message({ origin: window.location.origin, source: parent, data: { type: "prepara-aurora-ping" } });
  assert.equal(messages.length, 0);
  assert.equal(timers.length, 0);
  mounted = true;
  onMutation();
  assert.equal(messages.at(-1).type, "prepara-aurora-ready");
  assert.equal(timers.length, 1);
  assert.equal(timers[0].delay, 2500);
  const count = messages.length;
  listeners.message({ origin: "https://other.test", source: parent, data: { type: "prepara-aurora-ping" } });
  assert.equal(messages.length, count);
  listeners.message({ origin: window.location.origin, source: parent, data: { type: "prepara-aurora-ping" } });
  assert.equal(messages.at(-1).type, "prepara-aurora-ready");
  assert.equal(properties.has("--aurora-reveal"), false);
  for (const preset of ["Cascade", "Veil", "Ember", "Stream"]) {
    timers[0].callback();
    assert.equal(selected, preset);
  }

  let prevented = false;
  listeners.wheel({ deltaY: 3500, preventDefault: () => { prevented = true; } });
  now = 100;
  listeners.wheel({ deltaY: 3500, preventDefault: () => {} });
  assert.equal(prevented, true);
  assert.equal(messages.filter((message) => message.type === "prepara-aurora-step").length, 1);
  now = 600;
  listeners.wheel({ deltaY: 3500, preventDefault: () => {} });
  assert.equal(messages.filter((message) => message.type === "prepara-aurora-step").length, 2);
  listeners.touchstart({ touches: [{ clientY: 200 }] });
  listeners.touchmove({ touches: [{ clientY: 130 }], preventDefault: () => {} });
  listeners.touchmove({ touches: [{ clientY: 80 }], preventDefault: () => {} });
  assert.equal(messages.filter((message) => message.type === "prepara-aurora-step").length, 3);
});
