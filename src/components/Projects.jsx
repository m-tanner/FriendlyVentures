export default function Projects({ projects }) {
  return (
    <section id="projects" className="section">
      <h2 className="section-title">Side projects</h2>
      <div className="cards">
        {projects.map((project) => (
          <article className="card" key={project.name}>
            <div className="card-head">
              <h3>
                <a href={project.url} target="_blank" rel="noreferrer">
                  {project.name}
                  <span className="visually-hidden">(opens in new tab)</span>
                </a>
              </h3>
              <span className="card-years">{project.years}</span>
            </div>
            <p className="card-role">{project.role}</p>
            <p className="card-description">{project.description}</p>
            <span className="card-link">
              {new URL(project.url).hostname.replace(/^www\./, '')}
              <span aria-hidden="true"> ↗</span>
            </span>
          </article>
        ))}
      </div>
    </section>
  );
}
