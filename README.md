# ZGL Lab

ZGL Lab is a small public skills library and personal workflow lab. It collects public, sanitized Codex skills that can be reused as workflow references or installed into compatible agent environments.

The repository currently includes a React + TypeScript + Vite site and the real public skill source under `skills/`.

- [`wechat-135-direct`](skills/wechat-135-direct/) - build, revise, save, and QA WeChat public-account drafts in 135 Editor using durable platform-hosted images.

More public skills will be added over time. Each skill should live under `skills/<skill-name>/` and include its own `SKILL.md`.

## Local Site

```powershell
npm install
npm run dev
npm run build
```

## Repository Layout

```text
src/
index.html
package.json
skills/
  wechat-135-direct/
    SKILL.md
    README.md
docs/
  publishing-checklist.md
LICENSE
```

## Publishing Rule

Only publish content that has been reviewed for public release. Do not commit machine-specific paths, tokens, cookies, browser profiles, private endpoints, private drafts, or private source materials.

Before adding or updating a public skill, run through the [publishing checklist](docs/publishing-checklist.md).

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE).
