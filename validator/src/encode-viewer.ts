/**
 * Encode exemplar SKILL_FACTS.md files into /v#sf1.… URLs.
 *   pnpm encode-viewer
 */
import { deflateSync } from "node:zlib";
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { parse as parseYaml } from "yaml";

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, "../..");
const PREFIX = "sf1.";
const ORIGIN = "https://skillfacts.dev";
const MAX = 1600;

function extractFrontmatter(md: string) {
  const match = /^---\r?\n([\s\S]*?)\r?\n---(\r?\n|$)/.exec(md);
  if (!match) throw new Error("missing frontmatter");
  return { fm: parseYaml(match[1]) as Record<string, unknown>, raw: md };
}

function encode(payload: unknown): string {
  const compressed = deflateSync(Buffer.from(JSON.stringify(payload), "utf8"), { level: 9 });
  return PREFIX + compressed.toString("base64url");
}

function buildPayload(fm: Record<string, unknown>, opts: { urls: boolean; raw?: string }) {
  const payload: Record<string, unknown> = {
    v: 1,
    name: fm.name,
    developer: fm.developer,
    version: fm.version,
    status: fm.status,
    license: fm.license,
    kind: fm.kind,
    purpose: fm.purpose,
    provenance: fm.provenance,
    instructions_reach: fm.instructions_reach,
    tools_referenced: fm.tools_referenced || [],
    bundled_artifacts: fm.bundled_artifacts || [],
    egress: fm.egress,
  };
  if (opts.urls) {
    if (fm.homepage) payload.homepage = fm.homepage;
    if (fm.repository) payload.repository = fm.repository;
  }
  if (opts.raw) payload.raw = opts.raw;
  if (!opts.urls || !opts.raw) payload.truncated = true;
  return payload;
}

function viewerUrlFor(fm: Record<string, unknown>, raw: string): string {
  const attempts = [
    { urls: true, raw },
    { urls: true },
    { urls: false },
  ] as const;
  let url = "";
  for (const opts of attempts) {
    url = `/v#${encode(buildPayload(fm, { ...opts }))}`;
    if ((ORIGIN + url).length <= MAX) return url;
  }
  return url;
}

const examplesDir = join(root, "examples");
const indexPath = join(examplesDir, "index.json");
const index = JSON.parse(readFileSync(indexPath, "utf8")) as {
  exemplars: Array<Record<string, unknown>>;
};

for (const ex of index.exemplars) {
  const slug = String(ex.slug);
  const md = readFileSync(join(examplesDir, slug, "SKILL_FACTS.md"), "utf8");
  const { fm, raw } = extractFrontmatter(md);
  const viewer = viewerUrlFor(fm, raw);
  ex.viewer = viewer;
  console.log(`${slug}: ${viewer.length} chars`);
}

const json = JSON.stringify(index, null, 2) + "\n";
writeFileSync(indexPath, json);
writeFileSync(join(root, "site/examples/index.json"), json);
console.log("Updated index.json files");
