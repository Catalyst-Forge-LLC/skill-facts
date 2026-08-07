<h1 align="center">SkillFacts</h1>

<p align="center">
  <strong>A "Nutrition Facts" label for agent skills.</strong>
</p>

<p align="center">
  A tiny, standardized <code>SKILL_FACTS.md</code> that answers one question in under a
  minute: <em>what will this teach my agent to do?</em>
</p>

<p align="center">
  <a href="https://skillfacts.dev">skillfacts.dev</a> ·
  <a href="./SPEC.md">Spec</a> ·
  <a href="https://skillfacts.dev/schema/skill-facts.schema.json">Schema</a> ·
  <a href="./examples/">Examples</a> ·
  <a href="https://skillfacts.dev/llms.txt">llms.txt</a>
</p>

---

## What is this?

[AppFacts](https://appfacts.dev) labels the **body**. [ModelFacts](https://modelfacts.dev)
labels the **brain**. [ToolFacts](https://toolfacts.dev) labels the **toolbelt**.
[AgentFacts](https://agentfacts.dev) labels the **hands**. **SkillFacts** labels the
**playbook**: installable instructions (`SKILL.md` and kin) that steer an agent.

**Boundary:** SkillFacts is about what instructions *teach* (and imply). ToolFacts is
about what an instrument *does when invoked*. AgentFacts is about what an actor
*configuration permits*.

**The Golden Rule:** objective facts only. "Great productivity skill" is README talk.
"Instructs the agent to run `curl` against an external host" is a fact. Prefer
`undisclosed` over omission.

## Exemplars

| Slug | Kind | Shell | Network | FS |
|---|---|---|---|---|
| [docs-writer](./examples/docs-writer/SKILL_FACTS.md) | cursor-skill | none | none | read |
| [repo-setup](./examples/repo-setup/SKILL_FACTS.md) | claude-skill | explicit | explicit | read-write |
| [web-research](./examples/web-research/SKILL_FACTS.md) | agents-skill | none | explicit | read-write |
| [secure-review](./examples/secure-review/SKILL_FACTS.md) | cursor-skill | implied | none | read |

Catalog: [`examples/index.json`](./examples/index.json). Template:
[`examples/SKILL_FACTS.template.md`](./examples/SKILL_FACTS.template.md).

## Fact groups

| Group | Answers |
|---|---|
| identity / `purpose` | What skill, who ships it, what does it teach? |
| `provenance` | Source and publisher (or `undisclosed`). |
| `instructions_reach` | Shell / network / filesystem implied or explicit. |
| `tools_referenced` | Named tools or ToolFacts links. |
| `bundled_artifacts` | Scripts, templates, binaries shipped with the skill. |
| `egress` | Telemetry and destinations. |

## Validating a file

```bash
cd validator
pnpm install
pnpm validate ../examples/docs-writer/SKILL_FACTS.md
pnpm validate ../examples/*/SKILL_FACTS.md ../examples/SKILL_FACTS.template.md
```

## Generating a label

Planned: parse skill text + scan bundled scripts (reuse ToolFacts heuristics). Not
shipped yet. See [`generator/README.md`](./generator/README.md).

## Roadmap

- [x] Spec v0.1.0, schema, template, validator, multi-type exemplars, site, `llms.txt`
- [x] Portable `/v#sf1.…` viewer with flip-to-raw + copy; exemplars deep-link in
- [ ] Generator (skill parse + script scan)
- [ ] Marketplace directory when comparison pressure appears
- [ ] QR / badge emission from generator

Bootstrap intent preserved in [`GENESIS.md`](./GENESIS.md). Session plan:
[`specs/REVIEW-AND-PLAN.md`](./specs/REVIEW-AND-PLAN.md).

## Website

Cloudflare Pages root = `site`, no build.

| Path | Purpose |
|---|---|
| [`site/index.html`](./site/index.html) | Landing |
| [`site/schema/skill-facts.schema.json`](./site/schema/skill-facts.schema.json) | Schema |
| [`site/examples/`](./site/examples/) | Fetchable exemplars |
| [`site/llms.txt`](./site/llms.txt) | Agent entrypoint |

## License

- **Spec & schema:** CC0
- **Tooling (validator):** MIT

---

<p align="center">
  <em>"Know what it will teach before you install it."</em>
</p>
