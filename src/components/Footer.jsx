export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <p>© {new Date().getFullYear()} Michael Tanner · Friendly Ventures</p>
        <p>
          Built with React 19 + Vite ·{' '}
          <a
            href="https://github.com/m-tanner/FriendlyVentures"
            target="_blank"
            rel="noreferrer"
          >
            Source<span aria-hidden="true"> ↗</span>
            <span className="visually-hidden">(opens in new tab)</span>
          </a>
        </p>
      </div>
    </footer>
  );
}
