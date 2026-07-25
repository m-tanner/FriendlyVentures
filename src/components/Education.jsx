export default function Education({ schools }) {
  return (
    <section id="education" className="section">
      <h2 className="section-title">Education</h2>
      <ul className="education">
        {schools.map((school) => (
          <li className="education-item" key={school.school}>
            <div className="entry-when">{school.years}</div>
            <div>
              <h3 className="education-school">{school.school}</h3>
              <p className="education-degree">{school.degree}</p>
              <p className="education-description">{school.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
