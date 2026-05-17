# iconfont-helper

Iconfont SVG 候选搜索 helper。它适合在做公众号、网页、PPT、视频或小工具界面时，快速找一组可挑选的 SVG 图标，而不是随便用第一个搜索结果。

## 用途

这个 helper 适合用于：

- 根据场景需要去 Iconfont 搜索图标、符号或轻量插画。
- 一次保存多个 SVG 候选，后面按视觉效果挑选。
- 给 HTML、公众号排版、视频画面、PPT 页面或 demo UI 补充干净的图形资产。
- 保留 `search-response.json`，方便回看候选来源和名称。

## 核心能力

- 直接调用 Iconfont 搜索 API。
- 读取搜索结果里的 `show_svg`。
- 支持保存多个候选 SVG。
- 支持 `line`、`fill`、`flat`、`hand`、`simple`、`complex` 等样式过滤。
- 使用 Python 标准库实现，不强制安装第三方包。

## 使用示例

```powershell
python "skills/iconfont-helper/scripts/search_iconfont_svg.py" "火车" --out ".\assets\iconfont" --limit 12 --all
```

按线性风格搜索：

```powershell
python "skills/iconfont-helper/scripts/search_iconfont_svg.py" "安全" --type line --out ".\assets\iconfont" --all
```

如果本地环境需要 Iconfont `ctoken`，只在运行时传入，不要写进文件：

```powershell
$env:ICONFONT_CTOKEN = "<LOCAL_TOKEN>"
python "skills/iconfont-helper/scripts/search_iconfont_svg.py" "流程" --out ".\assets\iconfont" --all
```

## 安全注意事项

- 不要提交 `ctoken`、cookie、账号信息、浏览器 profile、缓存、日志或 sessions。
- 不要把私有 Iconfont 项目、私有素材路径或账号专属数据同步到公开仓库。
- 公开使用图标前，按目标项目要求确认授权、署名和使用边界。

## 许可证

本项目使用 MIT License，详见仓库根目录的 [LICENSE](../../LICENSE)。
