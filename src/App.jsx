import { Routes, Route } from 'react-router-dom';
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

import GameOfLife  from './components/GameOfLife';
import NoiseField  from './components/backgrounds/NoiseField';
import Constellation from './components/backgrounds/Constellation';
import Topographic from './components/backgrounds/Topographic';
import GradientMesh from './components/backgrounds/GradientMesh';

function Portfolio({ Background }) {
  return (
    <div className="noise-overlay">
      {Background && <Background />}
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
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/"             element={<Portfolio Background={GameOfLife} />} />
      <Route path="/noise"        element={<Portfolio Background={NoiseField} />} />
      <Route path="/constellation" element={<Portfolio Background={Constellation} />} />
      <Route path="/topo"         element={<Portfolio Background={Topographic} />} />
      <Route path="/gradient"     element={<Portfolio Background={GradientMesh} />} />
    </Routes>
  );
}
