export type Skill = {
  name: string;
  summary: string;
  sourcePath: string;
  githubUrl: string;
  audience: string;
  repository: string;
  highlights: string[];
  checks: string[];
};

export const featuredSkill: Skill = {
  name: "wechat-135-direct",
  summary:
    "一个公开、脱敏的 Codex skill 示例，展示如何把公众号排版、平台保存和交付前检查整理成可复用的操作边界。",
  sourcePath: "skills/wechat-135-direct/SKILL.md",
  githubUrl: "https://github.com/zgl-gits/my-skill/tree/main/skills/wechat-135-direct",
  audience: "需要编写或维护 Codex skill 的使用者",
  repository: "skills/wechat-135-direct",
  highlights: [
    "用公开说明保留工作流结构，不暴露个人账号、浏览器状态或本机配置。",
    "把本地预览、平台写入、图片来源和保存确认区分为不同检查点。",
    "源码继续以 `skills/` 目录为准，页面只提供索引和阅读入口。",
  ],
  checks: [
    "不发布真实凭据、cookie、token、私有草稿编号或个人素材路径。",
    "不把 localhost、file://、data:image 等临时地址当作正式交付来源。",
    "对外页面只描述可复用方法，具体平台登录和私有执行环境由使用者自行配置。",
  ],
};
