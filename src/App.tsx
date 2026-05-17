import { featuredSkill } from "./content";

const navItems = [
  { label: "首页", href: "#home" },
  { label: "Skill", href: "#skill" },
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
          <a
            className="nav-github"
            href={featuredSkill.githubUrl}
            target="_blank"
            rel="noreferrer"
            aria-label="在 GitHub 查看公开 skill"
          >
            <GitHubIcon />
            <span>GitHub</span>
          </a>
        </nav>
      </header>

      <section className="hero" id="home">
        <div className="hero-copy" aria-labelledby="hero-title">
          <p className="section-label">Codex Skill Index</p>
          <h1 id="hero-title">公开、脱敏的 Codex skill 示例库。</h1>
          <p className="hero-text">
            这里收录适合公开阅读的 skill 结构、适用边界和检查要点。页面用于快速定位源码，
            不承载内部配置、账号状态或未发布材料。
          </p>
          <div className="hero-actions">
            <a className="button primary" href="#skill">
              查看 Skill
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
      </section>

      <section className="section skills-section" id="skill">
        <div className="section-heading">
          <p className="section-label">Public Skill</p>
          <h2>索引只做导览，真实内容来自 <code>skills/</code>。</h2>
          <p>
            每个条目只展示公开元信息、用途摘要和发布前检查点。完整 skill 文件保留在仓库目录中，
            方便直接审阅、复制或继续维护。
          </p>
        </div>

        <article className="skill-record" aria-label={`${featuredSkill.name} skill 条目`}>
          <div className="skill-main">
            <div className="skill-title">
              <h3>{featuredSkill.name}</h3>
              <p>{featuredSkill.summary}</p>
            </div>

            <dl className="meta-list" aria-label="skill 元信息">
              <div>
                <dt>适合对象</dt>
                <dd>{featuredSkill.audience}</dd>
              </div>
              <div>
                <dt>仓库目录</dt>
                <dd><code>{featuredSkill.repository}</code></dd>
              </div>
              <div>
                <dt>标准源码</dt>
                <dd><code>{featuredSkill.sourcePath}</code></dd>
              </div>
            </dl>

            <div className="link-row">
              <a
                className="github-link"
                href={featuredSkill.githubUrl}
                target="_blank"
                rel="noreferrer"
                aria-label="在 GitHub 查看 wechat-135-direct skill"
              >
                <GitHubIcon />
                <span>GitHub 查看目录</span>
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
    </main>
  );
}

export default App;
