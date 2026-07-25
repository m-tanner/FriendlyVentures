import { render, screen } from '@testing-library/react';
import App from '../App.jsx';
import resume from '../data/resume.json';

describe('App', () => {
  it('renders the hero with name, role, and tagline', () => {
    render(<App />);
    expect(
      screen.getByRole('heading', { level: 1, name: resume.main.name }),
    ).toBeInTheDocument();
    expect(screen.getByText(resume.main.tagline)).toBeInTheDocument();
  });

  it('renders every experience entry with its date range', () => {
    render(<App />);
    for (const entry of resume.experience) {
      expect(screen.getByText(`${entry.start} — ${entry.end}`)).toBeInTheDocument();
    }
    for (const item of resume.earlier) {
      expect(screen.getByText(item.note)).toBeInTheDocument();
    }
  });

  it('renders side projects and education', () => {
    render(<App />);
    for (const project of resume.sideProjects) {
      // the heading wraps the project link, hence the new-tab hint
      expect(
        screen.getByRole('heading', { name: `${project.name} (opens in new tab)` }),
      ).toBeInTheDocument();
    }
    for (const school of resume.education) {
      expect(screen.getByRole('heading', { name: school.school })).toBeInTheDocument();
    }
  });

  it('links to the downloadable resume PDF', () => {
    const { container } = render(<App />);
    const links = container.querySelectorAll(`a[href="${resume.main.resumeDownload}"]`);
    expect(links.length).toBeGreaterThanOrEqual(2);
  });

  it('opens external links safely and announces the new tab', () => {
    const { container } = render(<App />);
    const external = container.querySelectorAll('a[target="_blank"]');
    // 2 hero social pills + "Book a chat" + calendly + footer source + one per project
    expect(external.length).toBe(
      resume.main.social.length + 3 + resume.sideProjects.length,
    );
    for (const link of external) {
      expect(link.getAttribute('rel')).toMatch(/noreferrer/);
      expect(link.querySelector('.visually-hidden')).toHaveTextContent(
        '(opens in new tab)',
      );
    }
  });

  it('names each project link with just the project name', () => {
    render(<App />);
    for (const project of resume.sideProjects) {
      const link = screen.getByRole('link', {
        name: `${project.name} (opens in new tab)`,
      });
      expect(link).toHaveAttribute('href', project.url);
      // the long description must not be part of the link's accessible name
      expect(link.textContent).not.toContain(project.description);
    }
  });

  it('skip link targets the main landmark', () => {
    const { container } = render(<App />);
    const skip = container.querySelector('.skip-link');
    expect(skip).toHaveAttribute('href', '#main');
    const main = container.querySelector('#main');
    expect(main).toBeInTheDocument();
    expect(main.tagName).toBe('MAIN');
  });
});
