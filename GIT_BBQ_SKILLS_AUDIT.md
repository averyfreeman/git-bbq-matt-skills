# Git BBQ Skills Audit

**Source commit:** `c55ee46073ed923f86ce59a5eb3b6d895095d1b7`
**Scope:** all 38 `SKILL.md` files, supporting files under `skills/`, and skill-related ADRs
**Selection authority:** [`git-bbq-curation.json`](./git-bbq-curation.json)

## Language audit

The initial scan found 55 British-English spelling candidates across 25 files. The confirmed mechanical updates normalize terms such as `behaviour` to `behavior`, `minimise` to `minimize`, `visualisation` to `visualization`, `summarise` to `summarize`, `categorise` to `categorize`, `labelled` to `labeled`, and `travelling` to `traveling`.

The UK-idiom watchlist found no clearly UK-specific idioms. Technical `queue` and neutral `one-off` phrasing were treated as valid in US technical writing. Future candidates are reported for human review rather than rewritten automatically.

Run the repeatable audit with:

```bash
npm ci
npm run audit:us-english
npm run test:language
```

Use `npm run audit:us-english:report` to regenerate the tracked report, or pass `--fix` directly to the audit command for exact mechanical spelling replacements after reviewing its findings. Do not use automatic fixes for idioms, proper names, URLs, code identifiers, or quoted material.

## Skill recommendations

| Skill | What it does | Git BBQ recommendation |
| --- | --- | --- |
| `engineering/ask-matt` | Routes users through the engineering skill flows. | Keep; regenerate against the final subset. |
| `engineering/code-review` | Reviews standards and specification compliance separately. | Keep. |
| `engineering/codebase-design` | Defines deep-module and seam vocabulary. | Keep. |
| `engineering/diagnosing-bugs` | Builds a tight reproduce, minimize, hypothesize, and fix loop. | Keep. |
| `engineering/domain-modeling` | Maintains glossary, scenarios, and ADR decisions. | Keep. |
| `engineering/grill-with-docs` | Combines grilling with domain documentation. | Keep as a composite entrypoint. |
| `engineering/implement` | Implements specs or issues with TDD and review. | Keep; adapt to Git BBQ execution conventions. |
| `engineering/improve-codebase-architecture` | Finds deepening opportunities and presents an architecture report. | Keep, but optional because of its heavier workflow. |
| `engineering/prototype` | Builds disposable logic or UI prototypes. | Keep. |
| `engineering/research` | Captures delegated primary-source research. | Keep; adapt agent terminology. |
| `engineering/resolving-merge-conflicts` | Resolves conflicts by intent and completes the operation. | Keep. |
| `engineering/setup-matt-pocock-skills` | Configures tracker, labels, and domain docs. | Conditional on tracker-dependent skills. |
| `engineering/tdd` | Defines seam-based red-green-refactor practice. | Keep. |
| `engineering/to-spec` | Turns conversation context into a published spec. | Conditional on tracker integration. |
| `engineering/to-tickets` | Creates dependency-aware tracer tickets. | Conditional on tracker integration. |
| `engineering/triage` | Moves issues and PRs through triage states. | Conditional on tracker and labels. |
| `engineering/wayfinder` | Maps large efforts as decision tickets. | Hold for a later API revision. |
| `engineering/wizard` | Generates human-only setup and migration procedures. | Hold for a later API revision. |
| `in-progress/claude-handoff` | Launches a Claude-specific background handoff. | Omit; replace only with a Codex version later. |
| `in-progress/implement-spec` | Orchestrates multi-agent implementation through worktrees. | Omit or merge into `implement`. |
| `in-progress/loop-me` | Specifies recurring personal workflows. | Omit from the Git BBQ API. |
| `in-progress/pr` | Produces a structured pull-request body. | Hold as a possible Git workflow extension. |
| `in-progress/retro` | Reviews sessions for environment improvements. | Hold outside the initial core API. |
| `in-progress/setup-ts-deep-modules` | Adds TypeScript dependency-cruiser boundaries. | Omit initially; retain as an extension. |
| `in-progress/writing-beats` | Shapes raw writing into article beats. | Omit. |
| `in-progress/writing-fragments` | Collects unstructured writing fragments. | Omit. |
| `in-progress/writing-shape` | Shapes raw material into an article. | Omit. |
| `misc/git-guardrails-claude-code` | Installs Claude-specific dangerous-Git hooks. | Omit; Git BBQ owns Git safety. |
| `misc/migrate-to-shoehorn` | Migrates TypeScript tests to Shoehorn. | Omit as package-specific. |
| `misc/scaffold-exercises` | Creates course exercise structures. | Omit as course-specific. |
| `misc/setup-pre-commit` | Installs Husky, lint-staged, and checks. | Omit as generic project bootstrap. |
| `productivity/grill-me` | Wraps the `grilling` primitive. | Alias to `grilling`, not an independent capability. |
| `productivity/grilling` | Runs the decision-tree interview. | Keep. |
| `productivity/handoff` | Creates a portable session handoff. | Keep; adapt host-specific behavior. |
| `productivity/teach` | Maintains a stateful teaching workspace. | Omit from the Git BBQ API. |
| `productivity/to-questionnaire` | Creates questionnaires for missing human context. | Omit initially. |
| `productivity/wait-what` | Re-explains misunderstood requests. | Keep. |
| `productivity/writing-for-agents` | Guides agent-facing skill and instruction writing. | Keep. |

The manifest intentionally retains every source path. These are recommendations, not the final `v0.3.0` inclusion decision.
