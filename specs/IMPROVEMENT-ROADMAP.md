# SkillFacts — improvement roadmap (from suite value assessment)

> Derived from x-facts
> [`SUITE-VALUE-AND-NETWORK-EFFECTS.md`](../../x-facts/specs/SUITE-VALUE-AND-NETWORK-EFFECTS.md).
> SkillFacts labels the **plain-English supply chain**: installable instructions
> that can imply shell, network, and bundled scripts.

**Status:** planned.  
**Role in the flywheel:** Catch the skills marketplace wave *after* ToolFacts
scanner heuristics exist to reuse; prevent “install skill = silent privilege.”

---

## Where SkillFacts stands

v0.1 formalized: SPEC, schema, validator, 4 exemplars, site, `llms.txt`,
`/v#sf1` (often with embedded `raw`). Generator still plan-only. Deploy pending.
GENESIS deferral overridden for scaffold; generator still waits on ToolFacts reuse.

## Gaps vs the value thesis

| Gap | Why it matters |
|---|---|
| **No parse/scan generator** | Skills are highly machine-derivable — unused advantage. |
| Marketplace moment | Directories matter when install volume is high; seed before empty feels dead. |
| Implied vs explicit reach | Easy to under-label “you may want to run…” soft guidance. |
| Provenance silence | `publisher: undisclosed` must stay socially expensive. |
| Format diversity | Cursor / Claude / AGENTS skill shapes may diverge. |

## Improvements (ordered)

### Near-term

1. Deploy skillfacts.dev; hub status when live.
2. Keep exemplars as the teaching set; add one marketplace-shaped exemplar when a
   real public skill is labeled (prefer real over illustrative).
3. Document install-time checklist for agents: fetch SKILL_FACTS → read
   `instructions_reach` → follow `tools_referenced`.

### Mid-term

4. **Generator:** parse `SKILL.md` (+ kin) for URLs/shell; scan bundled scripts
   with ToolFacts-style heuristics; LLM last for judgment; sanitize enums.
5. Prefer harsher reach when unsure; CI example that fails on schema-invalid skills.
6. Lightweight directory when ≥15 real labels exist (ModelFacts pattern lite —
   do not build heavy UI early).
7. Composition: skills that name MCP tools link ToolFacts URLs.

### Later

8. Marketplace partnerships: emit SkillFacts at publish time (adoption > endorsement).
9. Drift: re-scan skill package vs label on install in CF tooling.
10. Expand `kind` only with evidence of distinct package shapes.

## Roadmap phases

| Phase | Outcome | Exit |
|---|---|---|
| A | Live | Deploy + agent entry works |
| B | Emitter | Generator from skill text + scripts; exemplars regenerate |
| C | Habit | ≥1 skill marketplace or template emits SKILL_FACTS |
| D | Directory | Small curated catalog; filters on shell/network/FS |
| E | Load-bearing | Agent bootstrap refuses or warns on high-reach unlabeled skills |

## Non-goals

- Relabeling tools or agents as skills.
- Rating “skill quality” or productivity claims.
- Building a skill marketplace owned by CF.

## Success signals

- Installing a skill without SkillFacts feels as weird as a dependency without license.
- Agents cite `instructions_reach` before running bundled scripts.
- ToolFacts links from skills are common, not exceptional.

## Related

- [`REVIEW-AND-PLAN.md`](./REVIEW-AND-PLAN.md), [`PORTABLE-VIEWER.md`](./PORTABLE-VIEWER.md), [`../GENESIS.md`](../GENESIS.md)
- Suite index: [`x-facts/specs/ROADMAPS.md`](../../x-facts/specs/ROADMAPS.md)
