# SkillFacts generator (planned)

Not shipped in v0.1.

Planned pipeline (deterministic first, LLM last):

1. Parse `SKILL.md` / kin for tool names, URL patterns, shell fragments.
2. Scan bundled scripts for shell / network / filesystem side effects (reuse
   ToolFacts heuristics when that core lands).
3. Package / marketplace metadata for identity and provenance.
4. Optional LLM curation only for judgment fields, sanitized against schema enums.

Until then, copy [`../examples/SKILL_FACTS.template.md`](../examples/SKILL_FACTS.template.md).
