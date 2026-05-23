# codex-session-repair

[中文](README.zh-CN.md)

`codex-session-repair` is a repair skill for local Codex Desktop / Codex CLI session JSONL files. It is useful when a long thread can no longer resume or compact because the local history has become too large or contains invalid historical image payloads.

## Problem

Affected threads may fail with errors like:

- `context_length_exceeded`
- `Error running remote compact task`
- `Invalid 'input[...].content[...].image_url'`
- repeated compaction failures after screenshots, generated images, browser outputs, or very large tool results

The visible symptom is often that an old thread cannot continue normally, auto-compaction fails, or the model says the input exceeds the context window.

## Why It Happens

Codex stores local thread history as JSONL files under the user's `.codex/sessions` directory. In some long-running threads, very large records can be kept in model-visible history:

- inline `data:image/...;base64` payloads
- `input_image` objects with large image data
- image generation results stored as base64 strings
- huge `function_call_output` records
- `compacted` records that accidentally retain heavy image/tool output history

When the thread resumes or asks the remote compaction service to summarize old history, these records may be sent again. The request can exceed the model context window, or an already-sanitized image placeholder may be interpreted as an invalid image URL.

## Repair Method

The bundled repair script is conservative:

1. It only accepts files under the current user's `.codex/sessions` directory.
2. It creates a full backup before writing any candidate.
3. In default mode, it generates a sanitized candidate only and does not replace the source file.
4. It replaces historical image objects and inline image/base64 strings with short text placeholders.
5. It preserves normal text history, event order, timestamps, and JSONL structure.
6. With `-Apply`, it replaces the source only if the source still matches the backup hash.

Candidate-only mode:

```powershell
& "$env:USERPROFILE\.codex\skills\codex-session-repair\scripts\repair-codex-session.ps1" `
  -SessionFile "<SESSION_FILE>"
```

Apply after manual review:

```powershell
& "$env:USERPROFILE\.codex\skills\codex-session-repair\scripts\repair-codex-session.ps1" `
  -SessionFile "<SESSION_FILE>" `
  -Apply
```

After applying, verify with a light resume test when possible:

```powershell
codex exec resume --ephemeral --skip-git-repo-check <SESSION_ID> "Repair verification. Do not call tools. Reply OK only."
```

## Safety Notes

- Do not delete session files to fix this problem.
- Do not publish or paste full session JSONL content; it may contain private conversation history.
- Keep backups until the repaired thread has been verified.
- This repair removes historical embedded image payloads from model-visible history. Original full history remains in the backup.
- The problem can recur if the same thread keeps accumulating screenshots, generated images, huge logs, or massive tool outputs.

## License

MIT. See the repository root [LICENSE](../../LICENSE).
