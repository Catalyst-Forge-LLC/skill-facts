# Project Notes - SkillFacts

> Working notes for maintainers/agents picking up this project. Not published to the site.
> Last updated: 2026-08-03 (bootstrap / reserved stub).

## What this is

SkillFacts (skillfacts.dev) is the **Playbook** label in the xFacts family: a
nutrition label for installable agent skills (`SKILL.md` and kin). It answers
*"What will this teach my agent to do?"*

Domain reserved 2026-07-31. Suite vision:
`catalyst-forge/docs/xfacts-suite-vision.md`.

## State as of 2026-08-03

Bootstrap only. Intentionally lighter than ToolFacts / AgentFacts genesis repos.

| Piece | Where | Status |
|---|---|---|
| Genesis bootstrap | `GENESIS.md` | Done. Draft taxonomy, boundaries, open decisions. |
| README | `README.md` | Short stub. |
| Stub site | `site/index.html` | Reserved landing; accent `#f472b6`. |
| SPEC / schema / validator / generator | - | **Not started.** Do not build until ToolFacts and AgentFacts ship. |

Remote: not configured in this bootstrap. GitHub org target
`Catalyst-Forge-LLC/skill-facts` (owner creates and pushes). **Never push without
explicit ask.**

## Why we stop here

Admission is yes-later (vision doc): facts are machine-derivable from skill text
and bundled scripts, but the suite must not carry three unbuilt specs at once.
ToolFacts scanner work is the natural foundation; SkillFacts reuses it.

## Boundaries (keep crisp)

- **ToolFacts** = executable instrument (side effects when invoked).
- **SkillFacts** = instructions an agent follows (teaching surface + implied reach).
- **AgentFacts** = actor configuration (leash, permissions, model binding).

## Accent

Suggested rose/pink `#f472b6`. Confirm later against the shared family footer.

## Next (when ToolFacts + AgentFacts are live)

1. Formalize `SPEC.md` + JSON Schema from the draft taxonomy in GENESIS.
2. Worked example + template.
3. Validator, then generator (parse `SKILL.md` + scan bundled scripts).
4. Deploy stub → real site; update xfacts.dev and sibling footers.
