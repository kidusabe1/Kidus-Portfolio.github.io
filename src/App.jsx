import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Projects from './components/Projects';
import About from './components/About';
import Publications from './components/Publications';
import Experience from './components/Experience';
import Blogs from './components/Blogs';
import Extracurricular from './components/Extracurricular';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="noise-overlay">
      <Navbar />
      <main>
        <Hero />
        <Projects />
        <About />
        <Publications />
        <Experience />
        <Blogs />
        <Extracurricular />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
