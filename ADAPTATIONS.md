# Git BBQ Adaptations

This file records changes made in the Git BBQ-maintained derivative. The source tree remains laid out like the upstream repository so a future Git BBQ submodule can pin an exact commit without a path translation layer.

## Source baseline

- Upstream repository: `https://github.com/mattpocock/skills.git`
- Baseline commit: `c55ee46073ed923f86ce59a5eb3b6d895095d1b7`
- Derivative repository: `https://github.com/averyfreeman/git-bbq-matt-skills.git`
- Initial derivative tag: `v0.1.0`

## Adaptation policy

- Preserve upstream meaning, skill names, supporting files, attribution, and license unless a Git BBQ compatibility change is explicitly recorded.
- Use US-English spelling in prose. Preserve code identifiers, URLs, package names, proper names, and quoted material when changing them would alter meaning or compatibility.
- Review possible UK idioms with the language-audit watchlist. Do not rewrite ordinary technical terms such as `queue` or neutral phrases such as `one-off`.
- Keep all upstream skills in the source tree until the manual Git BBQ API review is complete. The curation manifest, not deletion, controls selection.
- Git BBQ owns runtime packaging and provider-specific adaptation. This repository does not build or publish the Git BBQ plugin.

## Ledger

| Commit or release | Change | Reason |
| --- | --- | --- |
| `v0.1.0` | Created the source-only derivative, added curation records and reproducible language audit, and normalized US-English prose under `skills/`. | Establish a separately maintained, reviewable source for the future Git BBQ submodule. |
