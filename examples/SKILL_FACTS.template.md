---
skill_facts_version: "0.1.0"
name: Your Skill
developer: Your Org
version: 0.1.0
status: active
license: Apache-2.0
kind: cursor-skill       # cursor-skill | claude-skill | agents-skill | other
purpose: One-line objective description of what this skill teaches
# homepage: https://example.com
# repository: https://github.com/org/skill
provenance:
  source: undisclosed    # repo URL, marketplace id, or undisclosed
  publisher: Your Org
instructions_reach:
  shell: none            # none | implied | explicit | undisclosed
  network: none          # none | implied | explicit | undisclosed
  filesystem: none       # none | read | read-write | implied | undisclosed
tools_referenced: []     # names or paths/URLs to TOOL_FACTS.md
bundled_artifacts: []
  # - path: scripts/setup.sh
  #   kind: script         # script | template | binary | other
egress:
  telemetry: none        # none | anonymous | identified | undisclosed
  destinations: []
generated:
  date: 2026-08-07
  generator: hand-authored
# credits:
#   generated_with: https://skillfacts.dev
#   built_by: "Your Name - https://example.com"
---

# Skill Facts - Your Skill

| | |
|---|---|
| **Developer** | Your Org |
| **Version** | 0.1.0 |
| **Status** | active |
| **License** | Apache-2.0 |
| **Kind** | cursor-skill |

## Purpose

One-line objective description of what this skill teaches.

## Provenance

| | |
|---|---|
| Source | undisclosed |
| Publisher | Your Org |

## Instructions reach

| | |
|---|---|
| Shell | none |
| Network | none |
| Filesystem | none |

## Tools referenced

(none)

## Bundled artifacts

(none)

## Egress

| | |
|---|---|
| Telemetry | none |
| Destinations | (none) |

---
*Generated with [SkillFacts](https://skillfacts.dev)*
