# SkillFacts compact viewer payload — `sf1`

Companion to [`SPEC.md`](./SPEC.md). Portable `/v` fragment. Codec matches
AppFacts `af1` (zlib + base64url).

## URL shape

```
https://skillfacts.dev/v#sf1.<payload>
https://skillfacts.dev/v?face=raw#sf1.<payload>
```

## Compact JSON (`sf1`)

| Key | Source | Required |
|---|---|---|
| `v` | payload version | yes (`1`) |
| `name`, `developer`, `version`, `status`, `license`, `kind` | identity | yes |
| `purpose` | purpose | yes |
| `provenance`, `instructions_reach`, `egress` | groups | yes |
| `tools_referenced`, `bundled_artifacts` | arrays | yes (may be `[]`) |
| `homepage`, `repository` | URLs | no |
| `raw`, `truncated` | viewer UX | no |

## Shrinkage

1. Drop URLs.
2. Drop `raw` if over budget (SkillFacts usually fits with `raw`).
3. Set `truncated: true` when needed.

## License

CC0 — public domain. No attribution required.
