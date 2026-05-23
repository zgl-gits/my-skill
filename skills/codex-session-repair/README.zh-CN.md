# codex-session-repair

[English](README.md)

`codex-session-repair` 是一个用于修复本地 Codex Desktop / Codex CLI 会话 JSONL 文件的 skill。它适合处理长线程无法继续、无法自动压缩，或者因为历史记录过大导致恢复失败的问题。

## 问题表现

出问题的线程可能会报：

- `context_length_exceeded`
- `Error running remote compact task`
- `Invalid 'input[...].content[...].image_url'`
- 发过很多截图、生成图、浏览器输出或超长工具输出后，压缩反复失败

表面现象通常是旧线程无法正常继续、自动压缩失败，或者提示输入超过模型上下文窗口。

## 原因

Codex 会把本地线程历史保存为 `.codex/sessions` 目录下的 JSONL 文件。某些长线程里，模型可见历史中可能留下很大的记录：

- 内联的 `data:image/...;base64` 图片
- 带大图内容的 `input_image` 对象
- 图片生成结果里的 base64 字符串
- 很大的 `function_call_output`
- 把图片或工具输出也卷进去的 `compacted` 记录

线程恢复或远端压缩时，这些大块内容可能又被带进请求里，最后超过模型上下文窗口。另一种情况是图片被替换成普通占位文字后，仍然放在 `image_url` 字段里，API 会把它当成非法图片 URL。

## 修复方法

脚本采用保守修复方式：

1. 只允许处理当前用户 `.codex/sessions` 目录下的文件。
2. 修复前先创建完整备份。
3. 默认只生成候选文件，不替换原文件。
4. 把历史图片对象和内联 image/base64 内容替换成简短文本占位。
5. 保留普通文本历史、事件顺序、时间戳和 JSONL 结构。
6. 只有加 `-Apply` 时才覆盖原文件，并且覆盖前会确认源文件没有在备份后被改动。

只生成候选文件：

```powershell
& "$env:USERPROFILE\.codex\skills\codex-session-repair\scripts\repair-codex-session.ps1" `
  -SessionFile "<SESSION_FILE>"
```

人工确认后应用修复：

```powershell
& "$env:USERPROFILE\.codex\skills\codex-session-repair\scripts\repair-codex-session.ps1" `
  -SessionFile "<SESSION_FILE>" `
  -Apply
```

修复后可以用轻量 resume 测试：

```powershell
codex exec resume --ephemeral --skip-git-repo-check <SESSION_ID> "修复验证。请不要调用工具，只回复 OK。"
```

## 安全注意事项

- 不要靠删除 session 文件来解决这个问题。
- 不要公开或粘贴完整 session JSONL，里面可能有私人对话历史。
- 修复后的线程确认可用前，保留备份。
- 这个修复会从模型可见历史里移除历史内嵌图片载荷；完整原始记录仍在备份里。
- 如果同一个线程继续大量积累截图、生成图、超长日志或工具输出，问题仍可能复发。

## License

MIT，详见仓库根目录 [LICENSE](../../LICENSE)。
