# wechat-135-direct-skill

面向 135 编辑器的公众号排版与保存工作流 skill。它强调：本地 HTML 只作为设计和预览，最终稿必须写入 135 编辑器，并使用 135/微信平台托管后的图片地址，避免文章在本地工具关闭后出现图片失效。

## 用途

这个 skill 适合用于：

- 在 135 编辑器中直接制作、修改、保存公众号草稿。
- 将本地图片通过 135 上传或粘贴流程转成平台托管图片。
- 避免 `localhost`、`file://`、`data:image` 等临时图片源进入最终稿。
- 在切换文章、保存草稿、插入图片、做移动端排版 QA 时保持安全流程。

## 核心能力

- 135 编辑器直接写稿，而不是只生成本地预览页。
- 固定浏览器配置与 DevTools endpoint 可配置化。
- 图片上传、占位图清理、图片卡片样式和底部白边处理。
- 中文公众号排版基线，包括段首全角空格、标题区可读性、模块节奏和移动端视觉检查。
- 文章切换保护，避免把旧草稿、缓存稿或错误文章覆盖。
- SVG 模块与轻量效果的兼容性检查建议。
- 保存后 QA 清单，包括图片、缩进、保存响应和同步发布边界。

## 安装与使用

把本仓库作为 Codex skill 或其他 agent 的工作流参考使用：

```text
skills/
  wechat-135-direct/
    SKILL.md
```

使用前请根据自己的环境配置：

```text
START_SCRIPT=<PATH_TO_135_CHROME_START_SCRIPT>
CHROME_PROFILE=<YOUR_CHROME_PROFILE>
DEVTOOLS_ENDPOINT=<DEVTOOLS_ENDPOINT>
EDITOR_URL=https://www.135editor.com/beautify_editor.html
```

推荐做法是准备一个专用 Chrome profile 保存 135 登录状态，并通过固定 DevTools endpoint 连接。不要把个人 profile、cookie、token、账号信息或真实素材路径写进公开 skill。

## 安全注意事项

- 不要发布或提交任何账号、cookie、token、Chrome profile、稿件 ID、素材路径和私有图片 URL。
- 上传本地图片到 135/微信平台属于文件传输，必须确认用户确实要求上传。
- 不确定当前打开的是哪篇文章时，不要清空、覆盖或保存。
- 不要点击同步公众号或发布相关按钮，除非用户明确要求。
- 不要把本地预览 HTML 当成最终交付。

## 脱敏说明

本公开版由本机私有 skill 提炼而来，已移除本机绝对路径、固定 profile 路径、个人目录名、具体文章 ID、稿件 ID、真实单位/人员/素材上下文、账号相关图片托管 URL、GitHub token、cookie 和登录状态信息。

## 许可证

本项目使用 MIT License，详见 [LICENSE](LICENSE)。
