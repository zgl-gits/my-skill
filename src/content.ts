export type Skill = {
  name: string;
  summary: string;
  sourcePath: string;
  githubUrl: string;
  status: "公开";
  tags: string[];
  highlights: string[];
  checks: string[];
};

export type LabArea = {
  id: string;
  title: string;
  status: "当前" | "预留";
  description: string;
  items: string[];
};

export const featuredSkill: Skill = {
  name: "wechat-135-direct",
  summary:
    "面向 135 编辑器的公众号排版与保存工作流，重点是把本地预览、安全检查和最终写入平台的边界讲清楚。",
  sourcePath: "skills/wechat-135-direct/SKILL.md",
  githubUrl: "https://github.com/zgl-gits/my-skill/tree/main/skills/wechat-135-direct",
  status: "公开",
  tags: ["公众号", "135 编辑器", "排版 QA", "公开 Skill"],
  highlights: [
    "本地 HTML 只作为预览，不当作最终交付。",
    "浏览器配置、登录状态、稿件编号和私有素材路径不进入公开仓库。",
    "围绕移动端公众号排版、保存确认和图片来源检查来组织流程。",
  ],
  checks: [
    "最终稿图片不能使用 localhost、file:// 或 data:image 临时来源。",
    "不提交真实账号、配置、登录凭据、稿件 ID 或私有路径。",
    "交付前在 135 编辑器上下文里确认保存状态和版式效果。",
  ],
};

export const labAreas: LabArea[] = [
  {
    id: "skills",
    title: "技能",
    status: "当前",
    description:
      "公开、脱敏后的 agent 工作流，统一放在现有的 skills/ 目录下。",
    items: ["wechat-135-direct 是当前第一个可见条目。", "后续增加公开 skill 时，不需要重做站点骨架。"],
  },
  {
    id: "notes",
    title: "笔记",
    status: "预留",
    description:
      "记录工作流取舍、安全检查和可复用做法的短笔记。",
    items: ["决策记录", "发布检查清单", "小型经验复盘"],
  },
  {
    id: "blog",
    title: "文章",
    status: "预留",
    description:
      "用于放更完整的公开实验记录、skill 设计思路和构建说明。",
    items: ["版本说明", "设计笔记", "实验总结"],
  },
  {
    id: "tools",
    title: "工具",
    status: "预留",
    description:
      "一些辅助查看和复用公开 skill 的小工具或预览入口。",
    items: ["Skill 卡片预览", "基础检查助手", "发布辅助工具"],
  },
];

export const stats = [
  { label: "公开 skill", value: "01" },
  { label: "源码目录", value: "skills/" },
  { label: "发布方式", value: "公开" },
];
