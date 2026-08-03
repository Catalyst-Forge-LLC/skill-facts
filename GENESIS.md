# GENESIS - SkillFacts

> Bootstrap spec for a later build session. Read this whole file before writing any
> code. Sibling repos to study first: `app-facts` (design origin),
> `tool-facts/GENESIS.md` and `agent-facts/GENESIS.md`
> (the two labels that must ship before this one is built), and the suite vision:
> `catalyst-forge/docs/xfacts-suite-vision.md`.

## What this is

SkillFacts (skillfacts.dev - domain owned, registered 2026-07-31) is the fifth label
in the xFacts family. This repo is a **reserved stub**: genesis + landing page only.
Do **not** build a full validator, generator, or directory until ToolFacts and
AgentFacts have shipped. The suite should not carry three unbuilt specs at once.

| Label | Labels the… | Answers |
|---|---|---|
| [AppFacts](https://appfacts.dev) | **Body** | What is this app built from? |
| [ModelFacts](https://modelfacts.dev) | **Brain** | What went into this model? |
| ToolFacts (toolfacts.dev) | **Toolbelt** | What does this instrument touch when invoked? |
| AgentFacts (agentfacts.dev) | **Hands** | What may this actor do, and on what leash? |
| **SkillFacts** | **Playbook** | What will this teach my agent to do? |

Suite-level strategy lives in the standing vision doc:
`catalyst-forge/docs/xfacts-suite-vision.md`.

A skill (`SKILL.md` and kin) is an installable set of instructions that steers an
agent: the plain-English supply-chain surface. A skill can tell an agent to run
scripts, fetch URLs, or move data, and nothing today labels that. Facts are highly
derivable by parsing the skill text and its bundled scripts (shell invocations,
network fetches, tool references, provenance).

Working tagline (see Open Decisions): *"Know what it will teach before you install
it."*

## The boundary (do not blur this)

Three layers, three files:

| Label | Labels | Not |
|---|---|---|
| **ToolFacts** | An executable *instrument* (what a tool touches when invoked) | Instructions or actor policy |
| **SkillFacts** | *Instructions* an agent follows (what a playbook teaches it to do) | The tool binary or the agent's leash |
| **AgentFacts** | An *actor* configuration (permissions, model binding, autonomy) | Per-tool side effects or skill prose |

- If a fact is about what a bundled script or implied call *does when run*, that
  detail may later compose with ToolFacts; SkillFacts surfaces the teaching surface
  and the reach the skill *implies*.
- If a fact is about what the host agent is *permitted* to do, it belongs in
  AgentFacts.
- `SKILL_FACTS.md` may later point at `TOOL_FACTS.md` / `AGENT_FACTS.md` the same
  way other labels compose. Formalize that in `SPEC.md` when this label is built.

## Why this label was admitted (and why later)

Admission rule (all three hold, from the vision doc):

1. Someone **adopts or installs** a skill and needs to trust it at that moment.
2. Essential facts are **objective and partly machine-derivable** (parse `SKILL.md`
   + bundled scripts).
3. **No incumbent format** answers the question well.

Build **after** ToolFacts and AgentFacts: the ToolFacts scanner extends naturally to
what a skill invokes, and the marketplace adoption moment is still maturing.

## Family conventions (inherited, non-negotiable)

- One small `SKILL_FACTS.md`. **YAML frontmatter is the sole source of truth**; the
  Markdown body is a rendered nutrition label for humans. Tooling never verifies
  body-vs-frontmatter.
- **The Golden Rule:** objective facts only. "Great productivity skill" is README
  talk. "Instructs the agent to run `curl` against an external host" is a fact.
- **`undisclosed` over omission** for knowingly withheld facts.
- **Closed enums for judgment fields** so files are comparable across skills.
- **Licensing:** spec & schema CC0, tooling MIT.
- **Design:** AppFacts design system with a distinct accent. Suggested rose/pink
  `#f472b6` (playbook / teach). Must sit well on the shared family footer.
- **File format version `"0.1.0"`** when formalized; required fields may shift
  before v1.0.
- Workspace conventions: **pnpm + TypeScript + ESM only** when tooling appears.
  Commit after substantive work. **Never push without the owner's explicit ask.**

## Draft fact taxonomy

Formalize in `SPEC.md` only when the build session opens. Starting groups:

| Group | The label's… | Answers |
|---|---|---|
| `identity` | Product name | What skill, who ships it, what version? |
| `provenance` | Origin | Source repo/marketplace, license, publisher trust signals. |
| `instructions_reach` | Implied blast radius | Shell, network, filesystem implied by skill text and scripts. |
| `tools_referenced` | Named instruments | Which tools/MCP servers/APIs the skill tells the agent to use. |
| `bundled_artifacts` | Packaged extras | Scripts, templates, binaries shipped with the skill. |
| `egress` | Outbound label | Telemetry, fetches, destinations data may leave toward. |

Frontmatter sketch (starting point - the future build session owns the enums):

```yaml
---
skill_facts_version: "0.1.0"
name: Example Skill
developer: Catalyst Forge
status: active
license: Apache-2.0
provenance:
  source: undisclosed          # repo URL, marketplace id, or undisclosed
  publisher: undisclosed
instructions_reach:
  shell: implied               # none | implied | explicit | undisclosed
  network: implied             # none | implied | explicit | undisclosed
  filesystem: implied          # none | read | read-write | implied | undisclosed
tools_referenced: []           # names or URLs/paths to TOOL_FACTS.md
bundled_artifacts:
  - path: scripts/setup.sh
    kind: script               # script | template | binary | other
egress:
  telemetry: undisclosed       # none | anonymous | identified | undisclosed
  destinations: []
generated:
  date: 2026-08-03
  generator: hand-authored
---
```

## Generator strategy (when built - not now)

Deterministic first, LLM second (family pattern):

1. Parse `SKILL.md` (and kin) structure and instruction text for tool names,
   path/URL patterns, and shell fragments.
2. Scan bundled scripts for shell, network, and filesystem side effects
   (extend ToolFacts-style heuristics where possible).
3. Package / marketplace metadata for identity and provenance.
4. LLM curation last, only for judgment fields, sanitized against enums.

**Do not implement this in this bootstrap.** Wait until ToolFacts (+ AgentFacts)
ship so the scanner core can be reused.

## Repo layout (bootstrap now; expand later)

```
skill-facts/
  GENESIS.md            (this file)
  README.md             short family-style stub
  NOTES.md              maintainer/agent state snapshot
  site/                 static stub, Cloudflare Pages root=site later
    index.html          reserved landing page
  # Later (not until ToolFacts + AgentFacts ship):
  # SPEC.md, examples/, validator/, generator/, schema/
```

GitHub org: `Catalyst-Forge-LLC`, repo `skill-facts` (owner creates and pushes).

## Milestones

1. **Now:** reserved domain, this genesis, stub site, NOTES. Stop here.
2. After ToolFacts + AgentFacts ship: `SPEC.md` v0.1.0 + schema + template +
   worked example.
3. Validator CLI.
4. Generator: skill parse + bundled script scan (+ ToolFacts reuse).
5. Site + directory when skill marketplaces make the comparison surface useful.
6. Family footer update across siblings.

## Acceptance criteria (for the eventual build)

- A stranger reading a `SKILL_FACTS.md` can answer in under a minute: what will this
  teach my agent to do, what reach do the instructions imply, what tools and
  artifacts come with it, and what leaves the machine.
- Worked example and template pass the validator.
- Deterministic fields from parse/scan are correct with no LLM involved.
- No em dashes, no AI-smell vocabulary on the site or README. Match the family
  register.

## Open decisions

1. **Tagline.** Candidates: "Know what it will teach before you install it." /
   "Read the playbook before you hand it over." / "Skills steer agents. Labels
   show where."
2. **Accent color.** Rose/pink `#f472b6` suggested; confirm against the five-site
   family footer.
3. Exact skill formats admitted in v0.1 (`SKILL.md` only vs Cursor/Claude/other
   skill package shapes).
4. How tightly `instructions_reach` couples to ToolFacts enums vs stays skill-
   specific (`implied` vs measured).
