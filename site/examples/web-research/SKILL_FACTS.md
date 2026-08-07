---
skill_facts_version: "0.1.0"
name: Web Research Playbook
developer: Catalyst Forge (illustrative)
version: "0.1.0"
status: preview
license: Apache-2.0
kind: agents-skill
purpose: Instruct an agent to gather sources from the open web and cite them in notes
provenance:
  source: marketplace:illustrative/web-research
  publisher: undisclosed
instructions_reach:
  shell: none
  network: explicit
  filesystem: read-write
tools_referenced:
  - fetch
  - ../../tool-facts/examples/fetch-mcp/TOOL_FACTS.md
bundled_artifacts:
  - path: templates/research-notes.md
    kind: template
egress:
  telemetry: undisclosed
  destinations: [undisclosed]
generated:
  date: 2026-08-07
  generator: hand-authored
credits:
  generated_with: https://skillfacts.dev
  built_by: "Catalyst Forge - https://www.catalystforge.com/"
---

# Skill Facts - Web Research Playbook

| | |
|---|---|
| **Developer** | Catalyst Forge (illustrative) |
| **Version** | 0.1.0 |
| **Status** | preview |
| **License** | Apache-2.0 |
| **Kind** | agents-skill |

*Illustrative research skill: explicit network use via fetch tooling; destinations
are caller-chosen so egress stays `undisclosed`. Publisher silence is labeled.*

## Purpose

Instruct an agent to gather sources from the open web and cite them in notes.

## Provenance

| | |
|---|---|
| Source | marketplace:illustrative/web-research |
| Publisher | undisclosed |

## Instructions reach

| | |
|---|---|
| Shell | none |
| Network | explicit |
| Filesystem | read-write |

## Tools referenced

- fetch
- ToolFacts: `fetch-mcp`

## Bundled artifacts

| Path | Kind |
|---|---|
| templates/research-notes.md | template |

## Egress

| | |
|---|---|
| Telemetry | undisclosed |
| Destinations | undisclosed |

---
*Generated with [SkillFacts](https://skillfacts.dev) · Built by [Catalyst Forge](https://www.catalystforge.com/)*
