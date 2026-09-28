import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";
import { applySpellingFixes, auditText, parseArgs } from "./audit-us-english.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const rules = JSON.parse(fs.readFileSync(path.join(root, "scripts/english-audit-rules.json"), "utf8"));

test("finds British spelling and idiom candidates while ignoring fenced code", () => {
  const text = [
    "The Behaviour needs to be minimised.",
    "Take a decision before the weekend.",
    "```md",
    "behaviour should stay untouched",
    "```",
  ].join("\n");
  const findings = auditText(text, rules, "fixture.md");

  assert.deepEqual(
    findings.map(({ category, match }) => [category, match]),
    [
      ["spelling", "Behaviour"],
      ["spelling", "minimised"],
      ["idiom-review", "Take a decision"],
    ],
  );
});

test("applies exact spelling fixes while preserving case", () => {
  assert.equal(
    applySpellingFixes("Behaviour, BEHAVIOUR, behaviour, and labelled.", rules),
    "Behavior, BEHAVIOR, behavior, and labeled.",
  );
});

test("uses explicit roots instead of silently retaining defaults", () => {
  assert.deepEqual(parseArgs(["--root", "skills/engineering"]), {
    roots: ["skills/engineering"],
    check: false,
    fix: false,
    report: null,
  });
});
