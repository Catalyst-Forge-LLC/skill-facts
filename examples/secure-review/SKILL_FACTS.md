---
skill_facts_version: "0.1.0"
name: Secure Review
developer: Catalyst Forge
version: "0.1.0"
status: active
license: Apache-2.0
kind: cursor-skill
purpose: Teach an agent to review a workspace for common security footguns without mutating it
repository: https://github.com/Catalyst-Forge-LLC/skill-facts
provenance:
  source: https://github.com/Catalyst-Forge-LLC/skill-facts
  publisher: Catalyst Forge
instructions_reach:
  shell: implied
  network: none
  filesystem: read
tools_referenced:
  - runAudit
  - ../../tool-facts/examples/forgetrail-mcp/TOOL_FACTS.md
bundled_artifacts:
  - path: checklists/secure-review.md
    kind: template
egress:
  telemetry: none
  destinations: []
generated:
  date: 2026-08-07
  generator: hand-authored
credits:
  generated_with: https://skillfacts.dev
  built_by: "Catalyst Forge - https://www.catalystforge.com/"
---

# Skill Facts - Secure Review

| | |
|---|---|
| **Developer** | Catalyst Forge |
| **Version** | 0.1.0 |
| **Status** | active |
| **License** | Apache-2.0 |
| **Kind** | cursor-skill |

*Read-oriented review playbook. May suggest running an audit tool (`runAudit`) but
does not ship shell scripts. Shell is `implied`, not `explicit`.*

## Purpose

Teach an agent to review a workspace for common security footguns without mutating it.

## Provenance

| | |
|---|---|
| Source | https://github.com/Catalyst-Forge-LLC/skill-facts |
| Publisher | Catalyst Forge |

## Instructions reach

| | |
|---|---|
| Shell | implied |
| Network | none |
| Filesystem | read |

## Tools referenced

- runAudit
- ToolFacts: `forgetrail-mcp`

## Bundled artifacts

| Path | Kind |
|---|---|
| checklists/secure-review.md | template |

## Egress

| | |
|---|---|
| Telemetry | none |
| Destinations | (none) |

---
*Generated with [SkillFacts](https://skillfacts.dev) · Built by [Catalyst Forge](https://www.catalystforge.com/)*
