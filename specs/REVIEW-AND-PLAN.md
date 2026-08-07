# SkillFacts — review and plan (2026-08 flesh-out)

> Companion to `x-facts/specs/SUITE-FLESH-OUT-2026-08.md`.  
> GENESIS deferred full build until ToolFacts + AgentFacts “ship.” Owner override
> for this session: formalize v0.1 now so the suite’s playbook layer is not a
> hollow reserved domain. Generator still waits on ToolFacts scanner reuse.

**Status:** executed (2026-08-07).

---

## Review (current state)

### Present

- Domain reserved; rose accent stub landing.
- [`GENESIS.md`](../GENESIS.md): taxonomy sketch, boundaries, open decisions.
- README accurately says “reserved.”

### Missing (everything for a first label)

SPEC, schema, examples, template, validator, deploy kit (`_headers`, wrangler,
favicon), agent surfaces, real marketing sections (why / format / validate).

### Boundary (do not blur)

| Label | Labels |
|---|---|
| ToolFacts | Executable instrument when invoked |
| SkillFacts | Instructions / playbook + **implied** reach |
| AgentFacts | Actor configuration / leash |

---

## Plan

### P1 — Formal SPEC v0.1.0 (root `SPEC.md`)

Formalize GENESIS groups with closed enums:

| Group | Purpose |
|---|---|
| identity | name, developer, version, status, license, `kind` |
| `purpose` | one-line what the skill teaches (objective) |
| `provenance` | source, publisher |
| `instructions_reach` | shell / network / filesystem (`none \| implied \| explicit \| undisclosed`; FS also `read \| read-write`) |
| `tools_referenced` | names or ToolFacts paths |
| `bundled_artifacts` | path + kind (`script \| template \| binary \| other`) |
| `egress` | telemetry + destinations |
| `generated` | date, generator |

**Tagline (locked for v0.1):** “Know what it will teach before you install it.”  
**Kinds (v0.1):** `cursor-skill | claude-skill | agents-skill | other`  
(`agents-skill` covers AGENTS.md / generic skill packages.)

### P2 — Schema + validator

- `site/schema/skill-facts.schema.json` (`$id` skillfacts.dev).
- `validator/` twin of ToolFacts (pnpm, TS ESM, ajv).

### P3 — Exemplars (4)

| Slug | Signal |
|---|---|
| `docs-writer` | Safe prose skill; reach none; no artifacts. |
| `repo-setup` | Explicit shell + scripts; FS write implied. |
| `web-research` | Network implied/explicit; fetch-oriented. |
| `secure-review` | Read-only FS implied; references audit tools. |

Plus template.

### P4 — Site + agent surfaces

Upgrade stub → ToolFacts-shaped landing (rose accent): why, format, examples,
validate, sponsor, family footer. Ship `llms.txt`, `site/examples/*`, `_headers`,
`wrangler.jsonc`, `favicon.svg`.

### P5 — README / NOTES / GENESIS

README becomes a real label README (status: v0.1 scaffold). NOTES updated.
GENESIS: add a note that v0.1 formalization landed; generator still deferred.

### Out of scope

- Skill parse + script-scan generator.
- Marketplace directory UI.
- Claiming ToolFacts/AgentFacts are “live on the public internet” (local scaffold ≠ DNS).

---

## Acceptance

- [x] SPEC + schema + template + ≥4 exemplars.
- [x] Validator green.
- [x] Site is not a “reserved only” stub.
- [x] Agent can start at `/llms.txt` → `/examples/index.json`.

---

## Completions

| Item | Status |
|---|---|
| SPEC.md | done |
| Schema + validator | done |
| Exemplars + template | done |
| Site upgrade + llms.txt | done |
| README/NOTES | done |
