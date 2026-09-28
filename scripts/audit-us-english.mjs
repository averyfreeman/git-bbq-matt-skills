#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const TEXT_EXTENSIONS = new Set([
  ".cjs",
  ".js",
  ".json",
  ".mjs",
  ".md",
  ".sh",
  ".ts",
  ".txt",
  ".yaml",
  ".yml",
]);

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function preserveCase(value, replacement) {
  if (value === value.toUpperCase()) return replacement.toUpperCase();
  if (value[0] === value[0].toUpperCase()) {
    return replacement[0].toUpperCase() + replacement.slice(1);
  }
  return replacement;
}

function maskCodeFences(text) {
  const lines = text.split("\n");
  let inFence = false;
  return lines
    .map((line) => {
      if (/^\s*(```|~~~)/.test(line)) {
        inFence = !inFence;
        return " ".repeat(line.length);
      }
      return inFence ? " ".repeat(line.length) : line;
    })
    .join("\n");
}

function lineAndColumn(text, offset) {
  const prefix = text.slice(0, offset);
  const line = prefix.split("\n").length;
  const lastBreak = prefix.lastIndexOf("\n");
  return { line, column: offset - lastBreak };
}

export function auditText(text, rules, file = "<text>") {
  const masked = maskCodeFences(text);
  const findings = [];

  for (const [source, replacement] of Object.entries(rules.spelling)) {
    const expression = new RegExp(`\\b${escapeRegExp(source)}\\b`, "gi");
    for (const match of masked.matchAll(expression)) {
      const location = lineAndColumn(text, match.index);
      findings.push({
        category: "spelling",
        file,
        line: location.line,
        column: location.column,
        match: text.slice(match.index, match.index + match[0].length),
        replacement: preserveCase(match[0], replacement),
        offset: match.index,
      });
    }
  }

  for (const { phrase, note } of rules.idioms) {
    const expression = new RegExp(escapeRegExp(phrase), "gi");
    for (const match of masked.matchAll(expression)) {
      const location = lineAndColumn(text, match.index);
      findings.push({
        category: "idiom-review",
        file,
        line: location.line,
        column: location.column,
        match: text.slice(match.index, match.index + match[0].length),
        note,
        offset: match.index,
      });
    }
  }

  return findings.sort((left, right) => left.offset - right.offset);
}

export function applySpellingFixes(text, rules) {
  const findings = auditText(text, { spelling: rules.spelling, idioms: [] });
  return findings
    .sort((left, right) => right.offset - left.offset)
    .reduce(
      (current, finding) =>
        current.slice(0, finding.offset) +
        finding.replacement +
        current.slice(finding.offset + finding.match.length),
      text,
    );
}

function walk(root) {
  if (!fs.existsSync(root)) return [];
  const stat = fs.statSync(root);
  if (stat.isFile()) return [root];

  const files = [];
  for (const entry of fs.readdirSync(root, { withFileTypes: true })) {
    if (entry.name === ".git" || entry.name === "node_modules") continue;
    const entryPath = path.join(root, entry.name);
    if (entry.isDirectory()) files.push(...walk(entryPath));
    else if (TEXT_EXTENSIONS.has(path.extname(entry.name).toLowerCase())) files.push(entryPath);
  }
  return files.sort();
}

export function auditFiles(roots, rules) {
  const findings = [];
  for (const relativeRoot of roots) {
    const absoluteRoot = path.resolve(ROOT, relativeRoot);
    for (const file of walk(absoluteRoot)) {
      const text = fs.readFileSync(file, "utf8");
      const relativeFile = path.relative(ROOT, file) || path.basename(file);
      findings.push(...auditText(text, rules, relativeFile));
    }
  }
  return findings.sort(
    (left, right) =>
      left.file.localeCompare(right.file) || left.line - right.line || left.column - right.column,
  );
}

export function formatReport(roots, findings) {
  const lines = [
    "# US-English Audit",
    "",
    `Scope: ${roots.join(", ")}`,
    "",
    `Findings: ${findings.length}`,
    "",
  ];

  if (findings.length === 0) {
    lines.push("No unapproved British-English spellings or UK idiom candidates found.", "");
    return lines.join("\n");
  }

  lines.push("| Category | File | Line | Match | Action |", "| --- | --- | ---: | --- | --- |");
  for (const finding of findings) {
    const action = finding.category === "spelling" ? `Use \`${finding.replacement}\`` : finding.note;
    lines.push(
      `| ${finding.category} | \`${finding.file}\` | ${finding.line} | \`${finding.match}\` | ${action} |`,
    );
  }
  lines.push("");
  return lines.join("\n");
}

export function parseArgs(argv) {
  const args = { roots: [], check: false, fix: false, report: null };
  for (let index = 0; index < argv.length; index += 1) {
    const argument = argv[index];
    if (argument === "--root") {
      const root = argv[++index];
      if (!root || root.startsWith("--")) throw new Error("--root requires a path");
      args.roots.push(root);
    }
    else if (argument === "--check") args.check = true;
    else if (argument === "--fix") args.fix = true;
    else if (argument === "--report") args.report = argv[++index];
    else if (argument === "--help") {
      console.log("Usage: audit-us-english.mjs [--root PATH] [--check] [--fix] [--report PATH]");
      process.exit(0);
    } else throw new Error(`Unknown argument: ${argument}`);
  }
  if (args.roots.length === 0) args.roots = ["skills", ".agents/adr"];
  return args;
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  const rules = JSON.parse(fs.readFileSync(path.join(ROOT, "scripts/english-audit-rules.json"), "utf8"));

  if (args.fix) {
    for (const relativeRoot of args.roots) {
      for (const file of walk(path.resolve(ROOT, relativeRoot))) {
        const original = fs.readFileSync(file, "utf8");
        const updated = applySpellingFixes(original, rules);
        if (updated !== original) fs.writeFileSync(file, updated);
      }
    }
  }

  const findings = auditFiles(args.roots, rules);
  const report = formatReport(args.roots, findings);
  if (args.report) {
    const reportPath = path.resolve(ROOT, args.report);
    fs.mkdirSync(path.dirname(reportPath), { recursive: true });
    fs.writeFileSync(reportPath, report);
  }
  process.stdout.write(report);
  if (args.check && findings.length > 0) process.exitCode = 1;
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) main();
