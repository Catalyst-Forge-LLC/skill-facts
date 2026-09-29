# SkillFacts validator

Validates `SKILL_FACTS.md` YAML frontmatter against
[`../site/schema/skill-facts.schema.json`](../site/schema/skill-facts.schema.json).

The command is `skillfacts validate <file>` from `@xfacts/skillfacts` (Node 22.18 or newer). The published command is compiled JavaScript. In this repository, `pnpm validate` runs the same program.

```bash
pnpm install
pnpm validate ../examples/docs-writer/SKILL_FACTS.md
pnpm validate ../examples/*/SKILL_FACTS.md ../examples/SKILL_FACTS.template.md
```

Exit code `1` on any failure (CI-friendly).
