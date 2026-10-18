import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { runInNewContext } from "node:vm";
import test from "node:test";

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));

test("Aurora loops automatically without capturing scroll, touch or keyboard", () => {
  const listeners = {};
  const messages = [];
  const timers = [];
  const parent = { postMessage: (message) => messages.push(message) };
  let selected = "Stream";
  let frameBottom = 800;
  const buttons = ["Stream", "Cascade", "Veil", "Ember"].map((name) => ({
    textContent: name,
    getAttribute: () => String(selected === name),
    click: () => { selected = name; },
  }));
  const window = {
    parent,
    frameElement: { getBoundingClientRect: () => ({ bottom: frameBottom }) },
    location: { origin: "https://prepara.test" },
    matchMedia: () => ({ matches: false }),
    setInterval: (callback, delay) => timers.push({ callback, delay }),
    addEventListener: (type, callback) => { listeners[type] = callback; },
  };
  const document = {
    visibilityState: "visible",
    createElement: () => ({}),
    head: { append: () => {} },
    addEventListener: (type, callback) => { listeners[type] = callback; },
    querySelectorAll: () => buttons,
  };
  runInNewContext(readFileSync(path.join(root, "public/aurora/adapter.js"), "utf8"), { window, document });

  assert.equal(timers[0].delay, 8000);
  assert.equal(listeners.wheel, undefined);
  assert.equal(listeners.touchmove, undefined);
  assert.equal(listeners.keydown, undefined);
  for (const preset of ["Cascade", "Veil", "Ember", "Stream"]) {
    timers[0].callback();
    assert.equal(selected, preset);
  }
  frameBottom = 0;
  timers[0].callback();
  assert.equal(selected, "Stream");
  listeners.click({ target: { closest: () => ({ textContent: "Conhecer o curso" }) } });
  assert.equal(messages.length, 1);
  assert.equal(messages[0].type, "prepara-aurora-cta");
  assert.equal(messages[0].target, "curso");
});
