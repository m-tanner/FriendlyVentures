function Fact({ label, items, chips = false }) {
  return (
    <div className="fact">
      <h3 className="fact-label">{label}</h3>
      <ul className={chips ? 'fact-chips' : 'fact-list'}>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export default function About({ data }) {
  return (
    <section id="about" className="section">
      <h2 className="section-title">About</h2>
      <div className="about-grid">
        <div className="about-bio">
          {data.bio.map((paragraph) => (
            <p key={paragraph.slice(0, 32)}>{paragraph}</p>
          ))}
        </div>
        <aside className="about-facts">
          <img
            className="portrait"
            src={data.image}
            alt="Portrait of Michael Tanner"
            width="800"
            height="696"
            loading="lazy"
          />
          <Fact label="Top skills" items={data.topSkills} />
          <Fact label="Toolbox" items={data.toolbox} chips />
          <Fact
            label="Languages"
            items={data.languages.map((l) => `${l.name} · ${l.level}`)}
          />
          <Fact label="Honors" items={data.honors} />
        </aside>
      </div>
    </section>
  );
}
