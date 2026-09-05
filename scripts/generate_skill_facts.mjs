#!/usr/bin/env node
/**
 * Fill missing SKILL_FACTS.md next to SKILL.md packs.
 * Code owns the template. Pack frontmatter + package.json supply values.
 * Does not overwrite an existing SkillFacts file. No LLM.
 *
 *   node generate_skill_facts.mjs /path/to/repo
 *   node generate_skill_facts.mjs /path/to/repo --plan
 */
import { existsSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const SKIP_DIRS = new Set([
	'node_modules',
	'.git',
	'dist',
	'.cursor',
	'site',
	'fixtures',
	'coverage',
	'__ARCHIVE',
]);

export function parseSkillFrontmatter(md) {
	const m = /^---\r?\n([\s\S]*?)\r?\n---/.exec(md);
	if (!m) return {};
	const fm = {};
	const lines = m[1].split(/\r?\n/);
	let key = null;
	let folded = [];
	let folding = false;
	const flush = () => {
		if (key && folding) fm[key] = folded.join(' ').replace(/\s+/g, ' ').trim();
		folding = false;
		folded = [];
		key = null;
	};
	for (const line of lines) {
		if (folding) {
			if (/^\s+\S/.test(line)) {
				folded.push(line.trim());
				continue;
			}
			flush();
		}
		const kv = /^([A-Za-z0-9_]+):\s*(.*)$/.exec(line);
		if (!kv) continue;
		const k = kv[1];
		const v = kv[2].trim();
		if (v === '>-' || v === '>' || v === '|' || v === '|-') {
			key = k;
			folding = true;
			folded = [];
			continue;
		}
		fm[k] = v.replace(/^["']|["']$/g, '');
	}
	flush();
	return fm;
}

export function listSkillPacks(root) {
	const hits = [];
	function walk(dir, depth) {
		if (depth > 5 || !existsSync(dir)) return;
		for (const ent of readdirSync(dir, { withFileTypes: true })) {
			if (SKIP_DIRS.has(ent.name) || ent.name.startsWith('.')) continue;
			const p = join(dir, ent.name);
			if (ent.isFile() && ent.name === 'SKILL.md') hits.push(p);
			else if (ent.isDirectory()) walk(p, depth + 1);
		}
	}
	walk(root, 0);
	return hits;
}

export function missingSkillFacts(root) {
	return listSkillPacks(root)
		.map((skillMd) => join(dirname(skillMd), 'SKILL_FACTS.md'))
		.filter((facts) => !existsSync(facts));
}

function readJson(file) {
	try {
		return JSON.parse(readFileSync(file, 'utf8'));
	} catch {
		return null;
	}
}

function yamlScalar(value) {
	const s = String(value ?? '').trim();
	if (!s) return '""';
	if (/[:#{}[\],&*?|<>=!%@`]/.test(s) || /["'\n]/.test(s) || /^\s|\s$/.test(s)) {
		return JSON.stringify(s);
	}
	return s;
}

function repoUrl(raw) {
	if (!raw) return '';
	const url = typeof raw === 'string' ? raw : raw.url;
	if (!url) return '';
	return String(url)
		.replace(/^git\+/, '')
		.replace(/\.git$/, '');
}

function developerFrom(pkg) {
	const author = pkg?.author;
	const raw = typeof author === 'string' ? author : author?.name;
	if (!raw) return 'undisclosed';
	return raw.replace(/\s+LLC\b/i, '').trim() || raw;
}

function inferKind(skillMd, root) {
	const rel = skillMd.replace(/\\/g, '/').toLowerCase();
	if (rel.includes('/.claude/') || rel.includes('/claude/')) return 'claude-skill';
	if (existsSync(join(dirname(skillMd), 'AGENTS.md')) || existsSync(join(root, 'AGENTS.md'))) {
		if (rel.includes('/agents/') || rel.includes('agents-skill')) return 'agents-skill';
	}
	return 'cursor-skill';
}

function inferReach(md) {
	const text = md.toLowerCase();
	const shell =
		/\b(bash|powershell|cmd\.exe|spawn|execfile|npm pack|pnpm pack|git |shell)\b/.test(text)
			? 'explicit'
			: /\b(terminal|command line)\b/.test(text)
				? 'implied'
				: 'none';
	const network = /\b(https?:\/\/|curl |fetch\(|wget )\b/.test(text) ? 'implied' : 'none';
	let filesystem = 'none';
	if (
		/\b(read-write|write the|saves? to)\b/.test(text) ||
		/\bwrite to:/.test(text) ||
		/\.\w+-eye\.md\b/.test(text)
	) {
		filesystem = 'read-write';
	} else if (/\b(open the|read the|read by|filesystem)\b/.test(text)) {
		filesystem = 'read';
	}
	return { shell, network, filesystem };
}

function bundledArtifacts(skillMd) {
	const dir = dirname(skillMd);
	const out = [{ path: 'SKILL.md', kind: 'other' }];
	function walk(rel, depth) {
		if (depth > 2) return;
		const abs = join(dir, rel);
		if (!existsSync(abs)) return;
		for (const ent of readdirSync(abs, { withFileTypes: true })) {
			if (ent.name.startsWith('.') || ent.name === 'SKILL_FACTS.md' || ent.name === 'SKILL.md') continue;
			const child = rel ? `${rel}/${ent.name}` : ent.name;
			if (ent.isDirectory()) walk(child, depth + 1);
			else out.push({ path: child.replace(/\\/g, '/'), kind: 'other' });
		}
	}
	walk('', 0);
	return out.slice(0, 24);
}

function purposeFrom(fm, md) {
	const raw = (fm.purpose || fm.description || '').replace(/\s+/g, ' ').trim();
	if (raw) return raw.split(/(?<=\.)\s/)[0].slice(0, 200);
	const heading = /^#\s+(.+)$/m.exec(md);
	return (heading?.[1] || 'Skill pack').trim().slice(0, 200);
}

export function renderSkillFacts({ skillMd, root, pkg }) {
	const md = readFileSync(skillMd, 'utf8');
	const fm = parseSkillFrontmatter(md);
	const parent = dirname(skillMd).replace(/\\/g, '/').split('/').pop();
	const name = (fm.name || parent || 'skill').trim();
	const developer = developerFrom(pkg);
	const version = String(pkg?.version || fm.version || '0.0.0');
	const license = String(pkg?.license || fm.license || 'undisclosed');
	const homepage = String(pkg?.homepage || '').trim();
	const repository = repoUrl(pkg?.repository);
	const kind = inferKind(skillMd, root);
	const purpose = purposeFrom(fm, md);
	const reach = inferReach(md);
	const artifacts = bundledArtifacts(skillMd);
	const today = new Date().toISOString().slice(0, 10);
	const optionalUrls = [
		homepage ? `homepage: ${yamlScalar(homepage)}` : null,
		repository ? `repository: ${yamlScalar(repository)}` : null,
	]
		.filter(Boolean)
		.join('\n');
	const artifactYaml = artifacts
		.map((item) => `  - path: ${yamlScalar(item.path)}\n    kind: ${item.kind}`)
		.join('\n');
	return `---
skill_facts_version: "0.1.0"
name: ${yamlScalar(name)}
developer: ${yamlScalar(developer)}
version: ${yamlScalar(version)}
status: active
license: ${yamlScalar(license)}
kind: ${kind}
purpose: ${yamlScalar(purpose)}
${optionalUrls ? `${optionalUrls}\n` : ''}provenance:
  source: ${yamlScalar(repository || 'undisclosed')}
  publisher: ${yamlScalar(developer)}
instructions_reach:
  shell: ${reach.shell}
  network: ${reach.network}
  filesystem: ${reach.filesystem}
tools_referenced: []
bundled_artifacts:
${artifactYaml || '  []'}
egress:
  telemetry: none
  destinations: []
generated:
  date: ${today}
  generator: skillfacts-from-pack
credits:
  generated_with: https://skillfacts.dev
  built_by: "${developer} - https://www.catalystforge.com/"
---

# Skill Facts - ${name}

| | |
|---|---|
| **Developer** | ${developer} |
| **Version** | ${version} |
| **Status** | active |
| **License** | ${license} |
| **Kind** | ${kind} |

## Purpose

${purpose}

## Provenance

| | |
|---|---|
| Source | ${repository || 'undisclosed'} |
| Publisher | ${developer} |

## Instructions reach

| | |
|---|---|
| Shell | ${reach.shell} |
| Network | ${reach.network} |
| Filesystem | ${reach.filesystem} |

## Tools referenced

(none)

## Bundled artifacts

${artifacts.map((item) => `- \`${item.path}\``).join('\n')}

## Egress

| | |
|---|---|
| Telemetry | none |
| Destinations | (none) |

---
*Generated with [SkillFacts](https://skillfacts.dev)*
`;
}

export function writeMissingSkillFacts(root) {
	const abs = resolve(root);
	const pkg = readJson(join(abs, 'package.json')) ?? {};
	const wrote = [];
	const skipped = [];
	for (const skillMd of listSkillPacks(abs)) {
		const dest = join(dirname(skillMd), 'SKILL_FACTS.md');
		if (existsSync(dest)) {
			skipped.push(dest);
			continue;
		}
		writeFileSync(dest, renderSkillFacts({ skillMd, root: abs, pkg }), 'utf8');
		wrote.push(dest);
	}
	return { ok: true, wrote, skipped };
}

function main(argv) {
	const plan = argv.includes('--plan');
	const root = resolve(argv.find((a) => a !== '--plan' && !a.startsWith('-')) || process.cwd());
	if (plan) {
		const missing = missingSkillFacts(root);
		process.stdout.write(
			`${JSON.stringify({
				root,
				writes: missing.map((p) => relative(root, p).replace(/\\/g, '/')),
			})}\n`,
		);
		return;
	}
	const result = writeMissingSkillFacts(root);
	process.stdout.write(
		`${JSON.stringify({
			ok: result.ok,
			wrote: result.wrote.map((p) => relative(root, p).replace(/\\/g, '/')),
			skipped: result.skipped.length,
		})}\n`,
	);
}

const self = fileURLToPath(import.meta.url);
if (process.argv[1] && resolve(process.argv[1]) === self) {
	main(process.argv.slice(2));
}
