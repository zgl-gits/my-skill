# ZGL Public Skills

[中文](README.zh-CN.md)

This repository collects public Codex skills and small helpers that I have cleaned up for reuse. They are not meant to be overly academic tool manuals; they are practical workflows and scripts that have been useful in real tasks.

The repository only keeps reusable workflows, boundaries, scripts, templates, and checklists. It must not contain private machine configuration, account state, private materials, browser profiles, tokens, cookies, local sessions, or unpublished work.

## Published Skills

- [codex-session-repair](skills/codex-session-repair/): Diagnoses and repairs local Codex Desktop / CLI session JSONL files when old threads fail to resume or compact because of `context_length_exceeded`, invalid historical `image_url` entries, huge `compacted` records, inline image/base64 payloads, or oversized tool outputs. It backs up first, generates a sanitized candidate by default, and only applies changes with explicit `-Apply`.
- [wechat-135-direct](skills/wechat-135-direct/): Builds and checks 135 Editor / WeChat public-account drafts. It focuses on durable platform-hosted images, safe draft switching, article saving, and QA that prevents `localhost`, `file://`, or `data:image` resources from becoming final delivery.
- [voiced-caption-video](skills/voiced-caption-video/): Creates voiced and captioned videos, animated explainers, image videos, and training/promo clips. It emphasizes storyboard-first production, voice, burned subtitles, rendering, frame checks, and MP4 validation.
- [iconfont-helper](skills/iconfont-helper/): Searches Iconfont for multiple SVG candidates and saves them for visual selection, so design work does not depend on the first search result.

## Install

You can read each skill directly under `skills/<skill-name>/`.

To install a skill into a local Codex environment, copy the desired directory into your local Codex skills folder:

```powershell
Copy-Item -Recurse .\skills\codex-session-repair "$env:USERPROFILE\.codex\skills\codex-session-repair"
Copy-Item -Recurse .\skills\wechat-135-direct "$env:USERPROFILE\.codex\skills\wechat-135-direct"
Copy-Item -Recurse .\skills\voiced-caption-video "$env:USERPROFILE\.codex\skills\voiced-caption-video"
Copy-Item -Recurse .\skills\iconfont-helper "$env:USERPROFILE\.codex\skills\iconfont-helper"
```

After installation, configure any required local tools yourself. Do not publish personal profiles, cookies, tokens, real material paths, local session files, or private draft information.

## Repository Layout

```text
skills/
  codex-session-repair/
    SKILL.md
    README.md
    README.zh-CN.md
    agents/
    scripts/
  iconfont-helper/
    SKILL.md
    README.md
    agents/
    scripts/
  wechat-135-direct/
    SKILL.md
    README.md
    agents/
  voiced-caption-video/
    SKILL.md
    README.md
    agents/
    assets/
    references/
    scripts/
docs/
  publishing-checklist.md
LICENSE
README.md
README.zh-CN.md
```

## Publishing Rules

Run the [publishing checklist](docs/publishing-checklist.md) before publishing updates.

- Publish only reusable and sanitized workflows, scripts, templates, and notes.
- Do not publish `.system` skills, plugin caches, credentials, browser profiles, logs, Codex sessions, private configs, account data, cookies, tokens, or API keys.
- Replace machine-specific paths and private values with placeholders.
- If a skill depends on an external platform or local toolchain, document the configuration pattern instead of publishing personal settings.
- Commit meaningful updates only.

## License

This repository uses the MIT License. See [LICENSE](LICENSE).
