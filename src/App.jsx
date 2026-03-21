import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Education from './components/Education';
import Skills from './components/Skills';
import Interests from './components/Interests';
import Projects from './components/Projects';
import Publications from './components/Publications';
import Experience from './components/Experience';
import Blogs from './components/Blogs';
import Extracurricular from './components/Extracurricular';
import Books from './components/Books';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="noise-overlay">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Education />
        <Skills />
        <Interests />
        <Projects />
        <Publications />
        <Experience />
        <Blogs />
        <Extracurricular />
        <Books />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
