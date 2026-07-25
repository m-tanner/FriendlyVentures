import { useEffect, useState } from 'react';

const THEME_COLORS = { dark: '#101418', light: '#fbfaf8' };

function initialTheme() {
  return document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
}

function storedTheme() {
  try {
    const stored = localStorage.getItem('theme');
    return stored === 'dark' || stored === 'light' ? stored : null;
  } catch {
    // storage unavailable (private browsing) — treat as "no explicit choice"
    return null;
  }
}

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2m0 16v2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M2 12h2m16 0h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" />
    </svg>
  );
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState(initialTheme);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    // Point every theme-color meta at the chosen theme so mobile browser chrome
    // follows the in-app toggle rather than the OS (their media attributes only
    // matter for the pre-JS first paint).
    for (const meta of document.querySelectorAll('meta[name="theme-color"]')) {
      meta.setAttribute('content', THEME_COLORS[theme]);
    }
  }, [theme]);

  // With no explicit stored choice, follow live OS changes (without persisting).
  useEffect(() => {
    if (storedTheme() || typeof window.matchMedia !== 'function') return undefined;
    const query = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = (event) => {
      if (storedTheme()) return;
      setTheme(event.matches ? 'dark' : 'light');
    };
    query.addEventListener('change', onChange);
    return () => query.removeEventListener('change', onChange);
  }, []);

  const next = theme === 'dark' ? 'light' : 'dark';

  function choose(value) {
    setTheme(value);
    try {
      localStorage.setItem('theme', value);
    } catch {
      // storage unavailable (private browsing) — theme still applies for this visit
    }
  }

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={() => choose(next)}
      aria-label={`Switch to ${next} mode`}
      title={`Switch to ${next} mode`}
    >
      {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
    </button>
  );
}
