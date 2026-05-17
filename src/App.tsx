import { featuredSkill, labAreas, stats } from "./content";

const navItems = [
  { label: "首页", href: "#home" },
  { label: "技能", href: "#skills" },
  { label: "笔记", href: "#notes" },
  { label: "文章", href: "#blog" },
  { label: "工具", href: "#tools" },
];

function GitHubIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" focusable="false">
      <path
        fill="currentColor"
        d="M12 2C6.48 2 2 6.58 2 12.22c0 4.51 2.87 8.34 6.84 9.69.5.1.68-.22.68-.49v-1.9c-2.78.62-3.37-1.21-3.37-1.21-.46-1.19-1.11-1.51-1.11-1.51-.91-.63.07-.62.07-.62 1 .07 1.53 1.05 1.53 1.05.9 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.56-1.13-4.56-5.03 0-1.11.39-2.02 1.03-2.73-.1-.26-.45-1.3.1-2.7 0 0 .84-.27 2.75 1.04A9.35 9.35 0 0 1 12 7c.85 0 1.7.12 2.5.35 1.91-1.31 2.75-1.04 2.75-1.04.55 1.4.2 2.44.1 2.7.64.71 1.03 1.62 1.03 2.73 0 3.91-2.34 4.77-4.57 5.03.36.32.68.94.68 1.9v2.75c0 .27.18.59.69.49A10.08 10.08 0 0 0 22 12.22C22 6.58 17.52 2 12 2Z"
      />
    </svg>
  );
}

function App() {
  return (
    <main className="site-shell">
      <header className="topbar" aria-label="主导航">
        <a className="brand" href="#home" aria-label="ZGL Home 首页">
          <span className="brand-mark">Z</span>
          <span>ZGL Home</span>
        </a>
        <nav className="nav-links" aria-label="页面栏目">
          {navItems.map((item) => (
            <a href={item.href} key={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
      </header>

      <section className="hero" id="home">
        <div className="hero-copy">
          <p className="section-label">公开 skill 小站</p>
          <h1>ZGL Home 收纳可复用、可检查、已脱敏的 agent skill。</h1>
          <p className="hero-text">
            这里把适合公开分享的 workflow 整理成清晰的卡片和源码入口。当前先展示
            135 编辑器相关 skill，后续可以继续放笔记、文章和小工具。
          </p>
          <div className="hero-actions">
            <a className="button primary" href="#skills">
              查看技能
            </a>
            <a
              className="button secondary"
              href={featuredSkill.githubUrl}
              target="_blank"
              rel="noreferrer"
            >
              打开 GitHub
            </a>
          </div>
        </div>

        <aside className="hero-panel" aria-label="站点概览">
          <div className="panel-header">
            <span>站点索引</span>
            <span className="status-dot">在线</span>
          </div>
          <div className="stat-grid">
            {stats.map((stat) => (
              <div className="stat-card" key={stat.label}>
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </div>
            ))}
          </div>
          <div className="command-card">
            <span className="command-prompt">源码位置</span>
            <code>{featuredSkill.sourcePath}</code>
          </div>
        </aside>
      </section>

      <section className="section skills-section" id="skills">
        <div className="section-heading">
          <p className="section-label">公开技能</p>
          <h2>真正的 skill 保留在源码目录里。</h2>
          <p>
            页面只展示公开元信息和说明摘要，标准版本仍然放在 <code>skills/</code>
            目录下。私有配置、登录状态和本机路径不会被放进页面。
          </p>
        </div>

        <article className="skill-showcase">
          <div className="skill-main">
            <div className="skill-title-row">
              <h3>{featuredSkill.name}</h3>
              <span>{featuredSkill.status}</span>
            </div>
            <p>{featuredSkill.summary}</p>
            <div className="tag-row">
              {featuredSkill.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
            <div className="source-strip">
              <span>标准源码</span>
              <code>{featuredSkill.sourcePath}</code>
              <a
                className="github-link"
                href={featuredSkill.githubUrl}
                target="_blank"
                rel="noreferrer"
                aria-label="在 GitHub 查看 wechat-135-direct skill"
              >
                <GitHubIcon />
                <span>GitHub 查看 skill 目录</span>
              </a>
            </div>
          </div>

          <div className="skill-details">
            <div>
              <h4>它保留什么</h4>
              <ul>
                {featuredSkill.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4>安全检查</h4>
              <ul>
                {featuredSkill.checks.map((check) => (
                  <li key={check}>{check}</li>
                ))}
              </ul>
            </div>
          </div>
        </article>
      </section>

      <section className="section area-section" aria-labelledby="areas-heading">
        <div className="section-heading compact">
          <p className="section-label">后续空间</p>
          <h2 id="areas-heading">先把架子留好，内容慢慢补。</h2>
        </div>
        <div className="area-grid">
          {labAreas.map((area) => (
            <article className="area-card" id={area.id} key={area.id}>
              <div className="area-card-top">
                <h3>{area.title}</h3>
                <span className={area.status === "当前" ? "now" : ""}>{area.status}</span>
              </div>
              <p>{area.description}</p>
              <ul>
                {area.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="section publish-note" aria-label="发布边界">
        <div>
          <p className="section-label">发布边界</p>
          <h2>能公开的是方法，默认保护的是私有状态。</h2>
        </div>
        <p>
          ZGL Home 的规则很简单：分享可复用的结构和检查方法，不分享个人账号、登录状态、
          本机配置和私有素材。公开页面要方便别人看懂，也要经得起脱敏检查。
        </p>
      </section>
    </main>
  );
}

export default App;
