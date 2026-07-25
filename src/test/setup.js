import '@testing-library/jest-dom/vitest';

// jsdom does not implement matchMedia; ThemeToggle subscribes to it to follow
// OS theme changes when the visitor has made no explicit choice.
if (typeof window !== 'undefined' && typeof window.matchMedia !== 'function') {
  window.matchMedia = (query) => ({
    media: query,
    matches: false,
    onchange: null,
    addEventListener: () => {},
    removeEventListener: () => {},
    addListener: () => {},
    removeListener: () => {},
    dispatchEvent: () => false,
  });
}
