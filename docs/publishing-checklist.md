# Publishing Checklist

Use this checklist before publishing or updating any public skill in this repository.

## Scope Check

- Confirm the skill is intended for public release.
- Confirm the content was written or sanitized for this public repository.
- Do not copy a complete private skill, private workspace policy, or private automation setup into this repository.
- Keep public skills general enough to be reused without exposing a specific machine, account, organization, draft, or workflow secret.

## Sensitive Data Check

Do not publish:

- API keys, access tokens, refresh tokens, GitHub tokens, OpenAI keys, bearer tokens, cookies, session IDs, or login state.
- Passwords, private certificates, SSH keys, `.env` files, or credential helper output.
- Real Chrome, Edge, browser, or app profile directories.
- Personal machine paths such as `C:\Users\...`, `E:\...`, `/Users/...`, or `/home/...`.
- Private repository URLs, internal service URLs, VPN addresses, intranet domains, or non-public endpoints.
- Localhost or debugging endpoints such as `localhost:<port>`, `127.0.0.1:<port>`, DevTools WebSocket URLs, or remote debugging ports.
- Real article IDs, draft IDs, file IDs, material-library IDs, account IDs, tracking IDs, or private image-hosting URLs.
- Private source files, private photos, unpublished drafts, organization-only documents, or user-specific examples.

## Public Placeholder Rule

Use placeholders instead of real local values:

```text
<PATH_TO_SCRIPT>
<YOUR_BROWSER_PROFILE>
<DEVTOOLS_ENDPOINT>
<PUBLIC_EXAMPLE_URL>
<PLATFORM_IMAGE_URL>
```

Placeholders must clearly show what the user should configure without revealing a real value from this machine.

## Scan Before Commit

Run at least one text scan before committing:

```powershell
rg -n -i "token|secret|password|cookie|bearer|api[_-]?key|github_pat|ghp_|gho_|sk-|localhost|127\.0\.0\.1|file://|C:\\\\Users|E:\\\\|/Users/|/home/" .
```

Review every match. Policy text that names forbidden items is acceptable; real values are not.

If available, also run a dedicated secret scanner such as `gitleaks` or `trufflehog`.

## Final Review

- `LICENSE` remains present.
- Top-level `README.md` describes the repository as a public skills collection.
- Each skill is stored under `skills/<skill-name>/`.
- Each skill has a clear `SKILL.md` with public-safe placeholders.
- Any skill-specific README avoids private setup details.
- `git status` contains only intended files.
