# SkillFacts Specification - v0.1.2

> *"Know what it will teach before you install it."*

SkillFacts is a "Nutrition Facts" label for agent skills - the sibling standard to
[AppFacts](https://appfacts.dev), [ModelFacts](https://modelfacts.dev),
[ToolFacts](https://toolfacts.dev), and [AgentFacts](https://agentfacts.dev).
AppFacts labels the **body**; ModelFacts the **brain**; ToolFacts the **toolbelt**;
AgentFacts the **hands**; SkillFacts the **playbook**: what installable instructions
will teach an agent to do, and what reach those instructions imply.

## Boundary

| Label | Labels | Not |
|---|---|---|
| **ToolFacts** | An executable *instrument* (side effects when invoked) | Instructions or actor policy |
| **SkillFacts** | *Instructions* an agent follows (teaching surface + implied reach) | The tool binary or the agent's leash |
| **AgentFacts** | An *actor* configuration (permissions, model, autonomy) | Per-tool side effects or skill prose |

A skill (`SKILL.md` and kin) can tell an agent to run scripts, fetch URLs, or move
data. SkillFacts labels that teaching surface. Facts about what a named tool *does
when run* belong in ToolFacts; facts about what the host agent is *permitted* to do
belong in AgentFacts. `SKILL_FACTS.md` MAY point at `TOOL_FACTS.md` files via
`tools_referenced`.

## File

A file named `SKILL_FACTS.md`, placed at the root of a skill package (beside
`SKILL.md` / `AGENTS.md` / equivalent), or linked from a marketplace listing.

## The Golden Rule

If a piece of information is **subjective** (*"great productivity skill"*), it does
**not** belong in SkillFacts. If it is **objective** (*"instructs the agent to run
`curl` against an external host"*), it does. When an objective fact is not publicly
disclosed, say so explicitly (`undisclosed`) rather than guessing.

## Structure

1. **YAML frontmatter** - the **sole source of truth**.
2. **Markdown body** - rendered nutrition label for humans. Body **MAY drift**;
   tooling does **not** verify body-vs-frontmatter consistency.

## Required frontmatter fields

| Field | Type | Description |
|---|---|---|
| `skill_facts_version` | string | File-format version, e.g. `"0.1.0"` |
| `name` | string | Skill name |
| `developer` | string | Publisher / author org or person |
| `version` | string | Skill package version as distributed |
| `status` | enum | `active` \| `deprecated` \| `preview` \| `archived` |
| `license` | string | SPDX or official name, or `"UNKNOWN"` |
| `kind` | enum | `cursor-skill` \| `claude-skill` \| `agents-skill` \| `other` |
| `purpose` | string | One-line objective description of what the skill teaches |
| `provenance` | object | Origin - see below |
| `instructions_reach` | object | Implied blast radius - see below |
| `tools_referenced` | string list | Tool / MCP / API names, or paths/URLs to `TOOL_FACTS.md` |
| `bundled_artifacts` | array | Packaged extras - see below (may be empty) |
| `egress` | object | Outbound label - see below |
| `generated` | object | `date`, `generator` |

### `provenance`

| Key | Type | Required | Description |
|---|---|---|---|
| `source` | string | ✅ | Repo URL, marketplace id, local path label, or `"undisclosed"` |
| `publisher` | string | ✅ | Publisher name, or `"undisclosed"` |

### `instructions_reach`

What the skill text and bundled scripts **teach or imply**, not what the host agent
is ultimately permitted to do (that is AgentFacts).

| Key | Type | Required | Values |
|---|---|---|---|
| `shell` | enum | ✅ | `none`, `implied`, `explicit`, `undisclosed` |
| `network` | enum | ✅ | `none`, `implied`, `explicit`, `undisclosed` |
| `filesystem` | enum | ✅ | `none`, `read`, `read-write`, `implied`, `undisclosed` |

Guidance:

| Value | Means |
|---|---|
| `none` | No instruction or script evidence of that capability |
| `implied` | Soft guidance ("you may need to…") without a concrete command/URL |
| `explicit` | Concrete shell fragments, URLs, or API calls in the skill or scripts |
| `read` / `read-write` | Filesystem: clear read-only vs mutate intent |
| `undisclosed` | Publisher withholds or packaging obscures the answer |

Prefer the harsher label when unsure.

### `bundled_artifacts[]`

| Key | Type | Required | Description |
|---|---|---|---|
| `path` | string | ✅ | Path relative to the skill package root |
| `kind` | enum | ✅ | `script`, `template`, `binary`, `other` |

Empty array when the skill is instructions-only.

### `egress`

| Key | Type | Required | Description |
|---|---|---|---|
| `telemetry` | enum | ✅ | `none`, `anonymous`, `identified`, `undisclosed` |
| `destinations` | string list | ✅ | Hosts the skill instructs the agent to contact. Empty when none. Use `["undisclosed"]` when network reach is non-none but hosts are not named. |

## Optional fields

| Field | Type | Description |
|---|---|---|
| `homepage` | string (URL) | |
| `repository` | string (URL) | |
| `credits.generated_with` | string (URL) | e.g. `"https://skillfacts.dev"` |
| `credits.built_by` | string | Author name + link |

## Conventions

- Objective facts only (Golden Rule).
- `undisclosed` over omission - especially provenance and egress destinations.
- Closed enums for judgment fields so skills compare.
- One `SKILL_FACTS.md` per skill *version*. Material instruction or artifact changes
  mean a new file.
- Keep the body skimable in under a minute: what it teaches, implied reach, tools,
  artifacts, what leaves the machine.
- `tools_referenced` **SHOULD** use `https://` URLs to `TOOL_FACTS.md` across package
  boundaries (local paths OK inside one package tree).
- **Canonical schema URL:**
  [`https://skillfacts.dev/schema/skill-facts.schema.json`](https://skillfacts.dev/schema/skill-facts.schema.json)

## Publication & discovery

Suite contract: [x-facts `DISCOVERY-AND-PUBLICATION.md`](../x-facts/specs/DISCOVERY-AND-PUBLICATION.md).

| | |
|---|---|
| **Canonical file** | Skill package root `SKILL_FACTS.md` (beside `SKILL.md` / equivalent) |
| **Primary pointer** | Marketplace listing or publish manifest; install-time: fetch before enable |
| **Viewer** | Optional marketplace nutrition card via `/v#sf1.…` |
| **Fallback** | `/.well-known/x-facts/skill.md` when web-hosted without a package root |
| **Several skills in one product** | Each skill package keeps its own file and pointer. Do not collapse a multi-skill repo into one product SkillFacts. |

## Versioning

- **This document:** v0.1.2 (publication & discovery; see revision history).
- **Files** declare `skill_facts_version` (currently `"0.1.0"`).
- Required-field list may still change before v1.0.

## Revision history

| Spec doc | Notes |
|---|---|
| **0.1.2** | Multi-skill products: one file and pointer per skill package; do not collapse. |
| **0.1.1** | Publication & discovery: marketplace/install pointers; URL-preferred tool refs; link to suite discovery contract. |
| **0.1.0** | Initial specification, formalizing [`GENESIS.md`](./GENESIS.md). |

## License

CC0 - public domain. No attribution required.
