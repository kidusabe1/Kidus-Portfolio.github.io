import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const navLinks = [
  { label: 'Education',    href: '#education' },
  { label: 'Experience',   href: '#experience' },
  { label: 'Projects',     href: '#projects' },
  { label: 'Publications', href: '#publications' },
  { label: 'Books',        href: '#books' },
  { label: 'Contact',      href: '#contact' },
];

const backgrounds = [
  { label: 'Game of Life',  path: '/' },
  { label: 'Noise Field',   path: '/noise' },
  { label: 'Constellation', path: '/constellation' },
  { label: 'Topographic',   path: '/topo' },
  { label: 'Gradient Mesh', path: '/gradient' },
];

export default function Navbar() {
  const [scrolled,    setScrolled]    = useState(false);
  const [mobileOpen,  setMobileOpen]  = useState(false);
  const [bgDropdown,  setBgDropdown]  = useState(false);
  const dropdownRef = useRef(null);
  const navigate  = useNavigate();
  const location  = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target))
        setBgDropdown(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const currentBg = backgrounds.find(b => b.path === location.pathname) ?? backgrounds[0];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-[#0a0a0a]/85 backdrop-blur-xl border-b border-white/5' : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="#" className="text-xl font-bold gradient-text">K.</a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-7">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-gray-400 hover:text-white transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}

          {/* Background switcher dropdown */}
          <div ref={dropdownRef} className="relative">
            <button
              onClick={() => setBgDropdown(o => !o)}
              className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-white transition-colors duration-200"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-white/60" />
              {currentBg.label}
              <ChevronDown
                size={13}
                className={`transition-transform duration-200 ${bgDropdown ? 'rotate-180' : ''}`}
              />
            </button>

            <AnimatePresence>
              {bgDropdown && (
                <motion.div
                  initial={{ opacity: 0, y: 6, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 6, scale: 0.97 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 top-full mt-2 w-44 rounded-xl bg-[#111]/95 backdrop-blur-xl border border-white/8 overflow-hidden shadow-xl"
                >
                  {backgrounds.map((bg) => {
                    const active = location.pathname === bg.path;
                    return (
                      <button
                        key={bg.path}
                        onClick={() => { navigate(bg.path); setBgDropdown(false); }}
                        className={`w-full text-left px-4 py-2.5 text-sm flex items-center gap-2.5 transition-colors duration-150 ${
                          active
                            ? 'text-white bg-white/8'
                            : 'text-gray-400 hover:text-white hover:bg-white/5'
                        }`}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${active ? 'bg-white' : 'bg-white/20'}`} />
                        {bg.label}
                      </button>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <a
            href="myCV.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm px-4 py-2 rounded-full border border-white/20 text-gray-300 hover:bg-white/5 hover:border-white/35 transition-all duration-200"
          >
            Resume
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-gray-300 hover:text-white"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#0a0a0a]/95 backdrop-blur-xl border-b border-white/5"
          >
            <div className="px-6 py-4 flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-gray-400 hover:text-white transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </a>
              ))}

              {/* Mobile bg switcher */}
              <div className="border-t border-white/8 pt-3">
                <p className="text-xs text-gray-600 mb-2 uppercase tracking-wider">Background</p>
                {backgrounds.map((bg) => {
                  const active = location.pathname === bg.path;
                  return (
                    <button
                      key={bg.path}
                      onClick={() => { navigate(bg.path); setMobileOpen(false); }}
                      className={`w-full text-left py-2 text-sm flex items-center gap-2 transition-colors ${
                        active ? 'text-white' : 'text-gray-500 hover:text-gray-300'
                      }`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${active ? 'bg-white' : 'bg-white/20'}`} />
                      {bg.label}
                    </button>
                  );
                })}
              </div>

              <a
                href="myCV.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm px-4 py-2 rounded-full border border-white/20 text-gray-300 text-center"
              >
                Resume
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
