# SkillFacts generator

Two different things share this name.

A limited helper is shipped at [`../scripts/generate_skill_facts.mjs`](../scripts/generate_skill_facts.mjs). It drafts a missing `SKILL_FACTS.md` from `SKILL.md` frontmatter and `package.json`. It does not overwrite an existing file, does not call a model, and does not analyze bundled scripts. Inferred reach is a keyword guess. Review every field before publishing.

```bash
node ../scripts/generate_skill_facts.mjs /path/to/repo
```

The full instruction-and-script analysis generator is planned, not shipped.

Planned pipeline (deterministic first, LLM last):

1. Parse `SKILL.md` / kin for tool names, URL patterns, shell fragments.
2. Scan bundled scripts for shell / network / filesystem side effects (reuse
   ToolFacts heuristics when that core lands).
3. Package / marketplace metadata for identity and provenance.
4. Optional LLM curation only for judgment fields, sanitized against schema enums.

Until the deeper pipeline lands, you can still copy [`../examples/SKILL_FACTS.template.md`](../examples/SKILL_FACTS.template.md).
