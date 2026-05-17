export type Skill = {
  name: string;
  summary: string;
  sourcePath: string;
  status: "public";
  tags: string[];
  highlights: string[];
  checks: string[];
};

export type LabArea = {
  title: string;
  status: "Now" | "Reserved";
  description: string;
  items: string[];
};

export const featuredSkill: Skill = {
  name: "wechat-135-direct",
  summary:
    "A public-safe workflow for building and checking WeChat public-account drafts directly in 135 Editor.",
  sourcePath: "skills/wechat-135-direct/SKILL.md",
  status: "public",
  tags: ["WeChat", "135 Editor", "Layout QA", "Public Skill"],
  highlights: [
    "Treats local HTML as preview only, not final delivery.",
    "Keeps browser profile, cookies, tokens, article IDs, and private material paths out of the public repo.",
    "Focuses on mobile-first public-account layouts with save and image-source checks.",
  ],
  checks: [
    "No localhost, file://, or data:image sources in final article images.",
    "No real account, profile, token, cookie, draft ID, or private source path.",
    "Final draft is verified inside the 135 editor context before handoff.",
  ],
};

export const labAreas: LabArea[] = [
  {
    title: "Skills",
    status: "Now",
    description:
      "Public, sanitized agent workflows kept under the existing skills/ directory.",
    items: ["wechat-135-direct is the first visible entry.", "More public skills can be added without changing the site shell."],
  },
  {
    title: "Notes",
    status: "Reserved",
    description:
      "Short field notes about workflow decisions, safety checks, and repeatable patterns.",
    items: ["Decision logs", "Publishing checklists", "Small lessons learned"],
  },
  {
    title: "Blog",
    status: "Reserved",
    description:
      "Longer writeups for public-facing experiments, skill design ideas, and build notes.",
    items: ["Release notes", "Design notes", "Experiment summaries"],
  },
  {
    title: "Tools",
    status: "Reserved",
    description:
      "Small utilities and previews that make public skills easier to inspect and reuse.",
    items: ["Skill card previews", "Sanity check helpers", "Publishing tools"],
  },
];

export const stats = [
  { label: "Public skill", value: "01" },
  { label: "Source folder", value: "skills/" },
  { label: "Release mode", value: "Public" },
];
