import resume from './data/resume.json';
import Nav from './components/Nav.jsx';
import Hero from './components/Hero.jsx';
import About from './components/About.jsx';
import Experience from './components/Experience.jsx';
import Projects from './components/Projects.jsx';
import Education from './components/Education.jsx';
import Contact from './components/Contact.jsx';
import Footer from './components/Footer.jsx';

export default function App() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Nav />
      <main id="main" tabIndex="-1">
        <Hero data={resume.main} />
        <About data={resume.main} />
        <Experience entries={resume.experience} earlier={resume.earlier} />
        <Projects projects={resume.sideProjects} />
        <Education schools={resume.education} />
        <Contact data={resume.main} />
      </main>
      <Footer />
    </>
  );
}
