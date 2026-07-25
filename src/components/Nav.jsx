import ThemeToggle from './ThemeToggle.jsx';

const LINKS = [
  ['#about', 'About'],
  ['#experience', 'Experience'],
  ['#projects', 'Projects'],
  ['#education', 'Education'],
  ['#contact', 'Contact'],
];

export default function Nav() {
  return (
    <header className="nav">
      <div className="nav-inner">
        <a className="brand" href="#top">
          Friendly Ventures
        </a>
        <nav aria-label="Sections">
          <ul>
            {LINKS.map(([href, label]) => (
              <li key={href}>
                <a href={href}>{label}</a>
              </li>
            ))}
          </ul>
        </nav>
        <ThemeToggle />
      </div>
    </header>
  );
}
