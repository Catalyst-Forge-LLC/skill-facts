import assert from 'node:assert/strict';
import { mkdirSync, mkdtempSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, relative } from 'node:path';
import { describe, it } from 'node:test';
import {
	listSkillPacks,
	missingSkillFacts,
	parseSkillFrontmatter,
	renderSkillFacts,
	writeMissingSkillFacts,
} from './generate_skill_facts.mjs';

describe('generate_skill_facts', () => {
	it('reads folded SKILL.md descriptions', () => {
		const fm = parseSkillFrontmatter(`---
name: cold-eye
description: >-
  Hostile read of anything shipped.
  Second line.
---

# Cold-eye
`);
		assert.equal(fm.name, 'cold-eye');
		assert.match(fm.description, /Hostile read/);
		assert.match(fm.description, /Second line/);
	});

	it('writes SKILL_FACTS.md next to a pack and skips fixtures', () => {
		const root = mkdtempSync(join(tmpdir(), 'skillfacts-'));
		mkdirSync(join(root, 'skills', 'cold-eye'), { recursive: true });
		mkdirSync(join(root, 'fixtures', 'clean'), { recursive: true });
		writeFileSync(
			join(root, 'package.json'),
			JSON.stringify({
				name: 'coldeye',
				version: '0.1.4',
				license: 'MIT',
				author: 'Catalyst Forge LLC',
				homepage: 'https://coldeye.dev',
				repository: { url: 'git+https://github.com/Catalyst-Forge-LLC/coldeye.git' },
			}),
		);
		writeFileSync(
			join(root, 'skills', 'cold-eye', 'SKILL.md'),
			`---
name: cold-eye
description: >-
  Hostile read of anything shipped, deemed done, or ready to ship.
---

# Cold-eye

Write to: one file. Run \`npm pack --dry-run\`.
`,
		);
		writeFileSync(join(root, 'fixtures', 'clean', 'SKILL.md'), '---\nname: fixture\n---\n');
		assert.deepEqual(
			listSkillPacks(root).map((p) => relative(root, p).replace(/\\/g, '/')),
			['skills/cold-eye/SKILL.md'],
		);
		assert.equal(missingSkillFacts(root).length, 1);
		const rendered = renderSkillFacts({
			skillMd: join(root, 'skills', 'cold-eye', 'SKILL.md'),
			root,
			pkg: JSON.parse('{"version":"0.1.4","license":"MIT","author":"Catalyst Forge LLC","homepage":"https://coldeye.dev","repository":{"url":"git+https://github.com/Catalyst-Forge-LLC/coldeye.git"}}'),
		});
		assert.match(rendered, /name: cold-eye/);
		assert.match(rendered, /kind: cursor-skill/);
		assert.match(rendered, /filesystem: read-write/);
		assert.match(rendered, /shell: explicit/);
		const once = writeMissingSkillFacts(root);
		assert.equal(once.wrote.length, 1);
		const twice = writeMissingSkillFacts(root);
		assert.equal(twice.wrote.length, 0);
		assert.equal(twice.skipped.length, 1);
	});
});
