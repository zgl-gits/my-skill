# ZGL 公开 Skill 小仓库

这里放一些我整理后可以公开的 Codex skills 和小 helper。它们不是很“学院派”的工具说明，更像是我自己用着顺手、以后也可能继续改的小工具箱。仓库里只保留通用工作流、使用边界和检查清单，不包含本机配置、账号状态、私有素材路径或未公开资料。

## 当前公开内容

- [wechat-135-direct](skills/wechat-135-direct/)：用于 135 编辑器公众号排版、图片平台化、草稿保存和发布前 QA。重点是避免把 `localhost`、`file://`、`data:image` 等临时资源当成最终交付，并把图片、标题、表格、流程、SVG 模块等排版环节做成可检查的流程。个人评价：做公众号你会用到它的。
- [voiced-caption-video](skills/voiced-caption-video/)：用于制作带配音和字幕的短视频、动画视频、图片视频或宣传/教育类视频。重点是先做分镜，再完成画面、配音、字幕烧录、渲染和 MP4 验收。个人评价：可能不是你想要的“动画”，但是做动态展示效果不错。
- [iconfont-helper](skills/iconfont-helper/)：用于从 Iconfont 搜索并保存多个 SVG 候选，方便给公众号、网页、PPT、视频和 demo UI 找好看的图标。个人评价：iconfont好东西啊。

## 安装和使用

如果只是参考，可以直接阅读每个 skill 目录下的 `SKILL.md` 和 `README.md`。

如果要安装到自己的 Codex 环境，可以把需要的目录复制到本机 skills 目录，例如：

```powershell
Copy-Item -Recurse .\skills\wechat-135-direct "$env:USERPROFILE\.codex\skills\wechat-135-direct"
Copy-Item -Recurse .\skills\voiced-caption-video "$env:USERPROFILE\.codex\skills\voiced-caption-video"
Copy-Item -Recurse .\skills\iconfont-helper "$env:USERPROFILE\.codex\skills\iconfont-helper"
```

安装后，根据自己的环境补齐浏览器、视频工具、TTS、素材目录等本地配置。不要把个人 profile、cookie、token、真实素材路径或私有草稿信息写进公开 skill。

## 目录结构

```text
skills/
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
```

## 贡献和发布原则

公开前先按 [publishing checklist](docs/publishing-checklist.md) 检查一遍。

- 只提交可复用、可公开、已脱敏的 workflow、脚本、模板和说明。
- 不提交 `.system` skills、插件缓存、认证文件、浏览器 profile、日志、sessions、私有配置、真实素材路径、账号信息、cookie、token 或 API key。
- 从本机 skill 同步内容时，先判断哪些是通用规则，哪些只是本机经验或私有环境配置；后者必须改成占位符或不发布。
- 如果某个 skill 依赖外部平台登录态或本地工具链，只说明配置方式，不公开个人配置值。
- 有意义的阶段性更新再提交，不为了“同步”机械提交。

## License

本仓库使用 MIT License，详见 [LICENSE](LICENSE)。
