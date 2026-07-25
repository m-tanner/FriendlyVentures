export default function Experience({ entries, earlier }) {
  return (
    <section id="experience" className="section">
      <h2 className="section-title">Experience</h2>
      <ol className="timeline">
        {entries.map((entry) => (
          <li className="entry" key={`${entry.company}-${entry.start}`}>
            <div className="entry-when">
              {entry.start} — {entry.end}
            </div>
            <div className="entry-body">
              <h3 className="entry-heading">
                {entry.title} · <span className="entry-company">{entry.company}</span>
              </h3>
              <p className="entry-meta">{entry.location}</p>
              <ul className="entry-bullets">
                {entry.bullets.map((bullet) => (
                  <li key={bullet.slice(0, 40)}>{bullet}</li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ol>

      <h3 className="subsection-title">Earlier</h3>
      <ul className="earlier">
        {earlier.map((item) => (
          <li className="earlier-item" key={`${item.org}-${item.years}-${item.role}`}>
            <div className="entry-when">{item.years}</div>
            <div>
              <p className="earlier-heading">
                {item.role} · <span className="entry-company">{item.org}</span>
              </p>
              <p className="earlier-note">{item.note}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
