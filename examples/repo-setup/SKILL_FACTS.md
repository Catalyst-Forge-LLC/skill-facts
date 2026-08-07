---
skill_facts_version: "0.1.0"
name: Repo Setup
developer: Catalyst Forge (illustrative)
version: "0.2.0"
status: active
license: MIT
kind: claude-skill
purpose: Walk an agent through bootstrapping a new TypeScript ESM repo with pnpm
provenance:
  source: undisclosed
  publisher: Catalyst Forge (illustrative)
instructions_reach:
  shell: explicit
  network: explicit
  filesystem: read-write
tools_referenced: []
bundled_artifacts:
  - path: scripts/bootstrap.sh
    kind: script
  - path: templates/package.json
    kind: template
egress:
  telemetry: none
  destinations: [registry.npmjs.org]
generated:
  date: 2026-08-07
  generator: hand-authored
credits:
  generated_with: https://skillfacts.dev
  built_by: "Catalyst Forge - https://www.catalystforge.com/"
---

# Skill Facts - Repo Setup

| | |
|---|---|
| **Developer** | Catalyst Forge (illustrative) |
| **Version** | 0.2.0 |
| **Status** | active |
| **License** | MIT |
| **Kind** | claude-skill |

*Illustrative setup playbook: ships a bootstrap script, tells the agent to run
`pnpm install`, writes project files. High implied trust cost at install time.*

## Purpose

Walk an agent through bootstrapping a new TypeScript ESM repo with pnpm.

## Provenance

| | |
|---|---|
| Source | undisclosed |
| Publisher | Catalyst Forge (illustrative) |

## Instructions reach

| | |
|---|---|
| Shell | explicit |
| Network | explicit |
| Filesystem | read-write |

## Tools referenced

(none named; relies on host shell)

## Bundled artifacts

| Path | Kind |
|---|---|
| scripts/bootstrap.sh | script |
| templates/package.json | template |

## Egress

| | |
|---|---|
| Telemetry | none |
| Destinations | registry.npmjs.org |

---
*Generated with [SkillFacts](https://skillfacts.dev) · Built by [Catalyst Forge](https://www.catalystforge.com/)*
