import { featuredSkill, labAreas, stats } from "./content";

const navItems = ["Home", "Skills", "Notes", "Blog", "Tools"];

function App() {
  return (
    <main className="site-shell">
      <header className="topbar" aria-label="Primary navigation">
        <a className="brand" href="#home" aria-label="ZGL Lab home">
          <span className="brand-mark">Z</span>
          <span>ZGL Lab</span>
        </a>
        <nav className="nav-links" aria-label="Sections">
          {navItems.map((item) => (
            <a href={`#${item.toLowerCase()}`} key={item}>
              {item}
            </a>
          ))}
        </nav>
      </header>

      <section className="hero" id="home">
        <div className="hero-copy">
          <p className="section-label">Public skills library</p>
          <h1>ZGL Lab keeps reusable agent skills public, tidy, and safe to inspect.</h1>
          <p className="hero-text">
            A clean personal lab for skill cards, workflow notes, and small tools. The
            first version highlights the current public 135 Editor skill while leaving
            room for Notes, Blog, and Tools.
          </p>
          <div className="hero-actions">
            <a className="button primary" href="#skills">
              Explore skills
            </a>
            <a className="button secondary" href={featuredSkill.sourcePath}>
              View source
            </a>
          </div>
        </div>

        <aside className="hero-panel" aria-label="Lab snapshot">
          <div className="panel-header">
            <span>Lab index</span>
            <span className="status-dot">Live</span>
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
            <span className="command-prompt">source</span>
            <code>{featuredSkill.sourcePath}</code>
          </div>
        </aside>
      </section>

      <section className="section skills-section" id="skills">
        <div className="section-heading">
          <p className="section-label">Skills</p>
          <h2>Real skills stay in the existing source folder.</h2>
          <p>
            The site presents public metadata and summaries, while the canonical skill
            remains under <code>skills/</code>. No private skill copy is pulled into the
            app.
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
              <span>Canonical source</span>
              <a href={featuredSkill.sourcePath}>{featuredSkill.sourcePath}</a>
            </div>
          </div>

          <div className="skill-details">
            <div>
              <h4>What it keeps</h4>
              <ul>
                {featuredSkill.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4>Safety checks</h4>
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
          <p className="section-label">Roadmap</p>
          <h2 id="areas-heading">Reserved shelves for the lab.</h2>
        </div>
        <div className="area-grid">
          {labAreas.map((area) => (
            <article className="area-card" id={area.title.toLowerCase()} key={area.title}>
              <div className="area-card-top">
                <h3>{area.title}</h3>
                <span className={area.status === "Now" ? "now" : ""}>{area.status}</span>
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

      <section className="section publish-note" aria-label="Publishing guardrails">
        <div>
          <p className="section-label">Guardrails</p>
          <h2>Public by design, private by default.</h2>
        </div>
        <p>
          ZGL Lab is built around a simple rule: publish reusable structure, not private
          operating state. Tokens, cookies, local profiles, account identifiers, and
          machine paths stay out of the site and out of the repository.
        </p>
      </section>
    </main>
  );
}

export default App;
