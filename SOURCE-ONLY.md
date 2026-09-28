# Git BBQ Skills Source

This repository is a maintained derivative of [Matt Pocock's skills](https://github.com/mattpocock/skills). It is the source tree consumed by Git BBQ, not a replacement for Matt's upstream distribution.

The `skills/` layout and upstream history are preserved so source paths stay stable. Git BBQ owns plugin packaging, target-specific adaptation, and the eventual submodule pin. The root curation manifest records which skills are candidates for the Git BBQ API; do not delete an unselected skill until that review is complete.

## Remotes

- `upstream`: `https://github.com/mattpocock/skills.git`
- `origin`: `https://github.com/averyfreeman/git-bbq-matt-skills.git`

## Maintenance

1. Rebase or merge upstream deliberately, preserving the source commit in `ADAPTATIONS.md`.
2. Run `npm run audit:us-english` after source updates.
3. Keep direct skill edits focused and record their rationale in `ADAPTATIONS.md`.
4. Change the curation manifest only through an explicit Git BBQ review.

This repository uses annotated SemVer tags for source snapshots. The reviewed derivative snapshot is `v0.2.0`.
