import { motion } from 'framer-motion';
import { ArrowLeft, ArrowUpRight, Moon, Sun } from 'lucide-react';
import { ThemeProvider, useTheme } from '../../context/ThemeContext';
import { coursePortfolio } from '../../data/coursePortfolio';
import CourseProjects from './CourseProjects';

const homeUrl = `${import.meta.env.BASE_URL}`;

function CourseNav() {
  const { isDark, toggle } = useTheme();

  return (
    <nav className="fixed inset-x-0 top-0 z-50 border-b border-white/5 course-nav">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-6">
        <a
          href={homeUrl}
          className="group flex items-center gap-2 text-sm text-gray-400 transition-colors hover:text-white"
        >
          <ArrowLeft
            size={16}
            className="transition-transform group-hover:-translate-x-1"
          />
          Portfolio
        </a>
        <span className="hidden font-mono text-[11px] uppercase tracking-[0.24em] text-gray-500 sm:block">
          Course study · SDA 01—04
        </span>
        <button
          type="button"
          onClick={toggle}
          aria-label="Toggle color theme"
          className="rounded-full border border-white/10 p-2 text-gray-400 transition-colors hover:border-white/25 hover:text-white"
        >
          {isDark ? <Sun size={16} /> : <Moon size={16} />}
        </button>
      </div>
    </nav>
  );
}

function NeuralReadout() {
  const waveform = [18, 23, 21, 30, 26, 38, 29, 22, 48, 75, 34, 20, 26, 18, 15, 22, 19, 16];
  const spikes = [
    [1, 5, 9, 13, 16],
    [2, 6, 10, 13, 17],
    [0, 4, 9, 12, 16],
    [3, 7, 10, 14],
    [1, 5, 8, 11, 15],
  ];

  return (
    <div className="course-readout" aria-label="Stylized neural signal and spike raster">
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-gray-500">
          neural readout
        </span>
        <span className="flex items-center gap-2 font-mono text-[10px] text-gray-500">
          <span className="course-live-dot" />
          recording
        </span>
      </div>
      <div className="px-4 py-5 sm:px-6">
        <div className="course-waveform" aria-hidden="true">
          {waveform.map((height, index) => (
            <span key={index} style={{ '--bar-height': `${height}%` }} />
          ))}
        </div>
        <div className="mt-7 space-y-2.5" aria-hidden="true">
          {spikes.map((row, rowIndex) => (
            <div key={rowIndex} className="course-raster-row">
              {Array.from({ length: 18 }).map((_, columnIndex) => (
                <span
                  key={columnIndex}
                  className={row.includes(columnIndex) ? 'is-spike' : ''}
                />
              ))}
            </div>
          ))}
        </div>
        <div className="mt-5 flex justify-between font-mono text-[9px] uppercase tracking-[0.16em] text-gray-600">
          <span>−200 ms</span>
          <span className="course-accent">stimulus 0</span>
          <span>+800 ms</span>
        </div>
      </div>
    </div>
  );
}

function CourseHero() {
  const { meta, stats } = coursePortfolio;

  return (
    <header className="course-hero grid-bg">
      <div className="mx-auto grid min-h-[92vh] max-w-6xl items-center gap-14 px-5 pb-16 pt-28 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 font-mono text-xs uppercase tracking-[0.26em] course-accent"
          >
            Computational neuroscience · Course portfolio
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08, duration: 0.65 }}
            className="max-w-3xl text-4xl font-semibold leading-[1.05] tracking-[-0.04em] text-white sm:text-6xl lg:text-7xl"
          >
            Making neural signals
            <span className="block text-gray-500">speak in data.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.18, duration: 0.55 }}
            className="mt-7 max-w-2xl text-base leading-relaxed text-gray-400 sm:text-lg"
          >
            {meta.summary}
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.55 }}
            className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm"
          >
            <span className="text-gray-200">{meta.student}</span>
            <span className="hidden h-1 w-1 rounded-full bg-gray-600 sm:block" />
            <span className="text-gray-500">{meta.instructor}</span>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.22, duration: 0.7 }}
        >
          <NeuralReadout />
        </motion.div>

        <div className="grid grid-cols-3 gap-px overflow-hidden border border-white/10 bg-white/10 lg:col-span-2">
          {stats.map((stat) => (
            <div key={stat.label} className="course-stat px-4 py-5 sm:px-6">
              <p className="font-mono text-2xl text-white sm:text-3xl">{stat.value}</p>
              <p className="mt-1 text-xs text-gray-500 sm:text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </header>
  );
}

function CourseFooter() {
  return (
    <footer className="border-t border-white/5 px-5 py-10 sm:px-6">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-300">Signal and Data Analysis for Neuroscience</p>
          <p className="mt-1 text-xs text-gray-600">A course study by Kidus Abebe Mekonen</p>
        </div>
        <a
          href={homeUrl}
          className="group inline-flex items-center gap-2 text-sm text-gray-400 transition-colors hover:text-white"
        >
          Explore the full portfolio
          <ArrowUpRight size={15} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </a>
      </div>
    </footer>
  );
}

export default function CoursePage() {
  return (
    <ThemeProvider>
      <div className="noise-overlay course-page">
        <CourseNav />
        <main>
          <CourseHero />
          <CourseProjects />
        </main>
        <CourseFooter />
      </div>
    </ThemeProvider>
  );
}
