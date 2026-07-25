export default function Hero({ data }) {
  return (
    <section className="hero" id="top">
      <p className="kicker">{data.location}</p>
      <h1>{data.name}</h1>
      <p className="role">
        {data.role} at <span className="role-company">{data.company}</span>
      </p>
      <p className="tagline">{data.tagline}</p>
      <ul className="actions" aria-label="Links">
        {data.social.map((s) => (
          <li key={s.name}>
            <a className="pill" href={s.url} target="_blank" rel="noreferrer">
              {s.name}
              <span aria-hidden="true"> ↗</span>
              <span className="visually-hidden">(opens in new tab)</span>
            </a>
          </li>
        ))}
        <li>
          <a className="pill" href={`mailto:${data.email}`}>
            Email
          </a>
        </li>
        <li>
          <a className="pill" href={data.resumeDownload} download="MichaelTanner_Resume.pdf">
            Résumé (PDF)
          </a>
        </li>
        <li>
          <a className="pill pill-accent" href={data.calendly} target="_blank" rel="noreferrer">
            Book a chat
            <span aria-hidden="true"> ↗</span>
            <span className="visually-hidden">(opens in new tab)</span>
          </a>
        </li>
      </ul>
    </section>
  );
}
