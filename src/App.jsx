import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Education from './components/Education';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Publications from './components/Publications';
import Blogs from './components/Blogs';
import Extracurricular from './components/Extracurricular';
import Books from './components/Books';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Constellation from './components/backgrounds/Constellation';

export default function App() {
  return (
    <ThemeProvider>
      <div className="noise-overlay">
        <Constellation />
        <Navbar />
        <main className="relative z-10">
          <Hero />
          <About />
          <Education />
          <Experience />
          <Skills />
          <Projects />
          <Publications />
          <Blogs />
          <Extracurricular />
          <Books />
          <Contact />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}
