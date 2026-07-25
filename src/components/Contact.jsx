export default function Contact({ data }) {
  const telHref = `tel:${data.phone.replace(/[^+\d]/g, '')}`;
  return (
    <section id="contact" className="section">
      <h2 className="section-title">Contact</h2>
      <p className="contact-lede">
        The fastest way to reach me is email — or grab time directly on my calendar.
      </p>
      <ul className="contact-list">
        <li>
          <span className="contact-label">Email</span>
          <a href={`mailto:${data.email}`}>{data.email}</a>
        </li>
        <li>
          <span className="contact-label">Phone</span>
          <a href={telHref}>{data.phone}</a>
        </li>
        <li>
          <span className="contact-label">Calendar</span>
          <a href={data.calendly} target="_blank" rel="noreferrer">
            calendly.com/m-tanner2<span aria-hidden="true"> ↗</span>
            <span className="visually-hidden">(opens in new tab)</span>
          </a>
        </li>
        <li>
          <span className="contact-label">Résumé</span>
          <a href={data.resumeDownload} download="MichaelTanner_Resume.pdf">
            Download PDF
          </a>
        </li>
      </ul>
    </section>
  );
}
