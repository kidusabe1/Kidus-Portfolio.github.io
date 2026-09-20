import { useEffect } from 'react';
import { ArrowLeft, ArrowDown, ArrowUpRight, Moon, Sun } from 'lucide-react';
import { ThemeProvider, useTheme } from '../../context/ThemeContext';
import { coursePortfolio } from '../../data/coursePortfolio';
import CourseProjects from './CourseProjects';

const homeUrl = import.meta.env.BASE_URL;

function CourseNav() {
  const { isDark, toggle } = useTheme();
  return (
    <nav aria-label="Portfolio navigation" className="course-nav fixed inset-x-0 top-0 z-50 border-b border-white/10">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3 sm:px-6">
        <a href={homeUrl} className="flex items-center gap-2 text-sm text-gray-300">
          <ArrowLeft size={16} aria-hidden="true" /> Portfolio
        </a>
        <a href="#projects" className="text-sm text-gray-300">Explore the studies</a>
        <button type="button" onClick={toggle} aria-label={isDark ? 'Use light theme' : 'Use dark theme'}
          className="rounded-full border border-white/10 p-3 text-gray-300">
          {isDark ? <Sun size={16} /> : <Moon size={16} />}
        </button>
      </div>
    </nav>
  );
}

function CourseHero() {
  const { meta, projects } = coursePortfolio;
  const { isDark } = useTheme();
  return (
    <header className="course-hero grid-bg">
      <div className="mx-auto max-w-6xl px-5 pb-10 pt-28 sm:px-6 sm:pt-32">
        <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="course-label course-accent">Computational neuroscience · Course portfolio</p>
            <h1 className="mt-5 text-4xl font-semibold leading-[1.08] tracking-tight text-white sm:text-5xl">
              Signal and data analysis<br /><span className="text-gray-400">for neuroscience.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-gray-300">{meta.summary}</p>
            <p className="mt-5 text-sm text-gray-400">{meta.student} · {meta.instructor}</p>
            <a href="#projects" className="course-link mt-7 inline-flex items-center gap-2">
              Explore the analyses <ArrowDown size={16} aria-hidden="true" />
            </a>
          </div>
          <figure className="course-chart-frame">
            <p className="course-label course-accent">One result, two ways of seeing</p>
            <p className="mt-3 text-xl font-medium text-white">A mean can hide a brief response.</p>
            <img src={`${homeUrl}images/course/response-timing-${isDark ? 'dark' : 'light'}.png`}
              width="1120" height="720" className="mt-3 block h-auto w-full"
              alt="PSTH showing an early 113.2 Hz peak that is hidden by the 24.89 Hz post-stimulus mean." />
            <figcaption className="mt-3 text-sm leading-relaxed text-gray-300">
              24.89 Hz across the response window; 113.2 Hz in the peak bin.
              <a href="#neural-response" className="course-link ml-1">See why timing matters →</a>
            </figcaption>
          </figure>
        </div>
        <nav aria-label="Study questions" className="mt-10 grid grid-cols-1 gap-px border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
          {projects.map(project => (
            <a key={project.id} href={`#${project.id}`} className="course-study-link flex items-center gap-3 px-5 py-5 text-sm text-gray-200">
              <span className="font-mono course-accent">{project.index}</span>{project.nav}<ArrowDown className="ml-auto shrink-0" size={14} aria-hidden="true" />
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}

export default function CoursePage() {
  useEffect(() => {
    // The HTML entry is empty until React mounts; restore incoming study links.
    const target = document.getElementById(window.location.hash.slice(1));
    target?.scrollIntoView({ block: 'start' });
  }, []);

  return (
    <ThemeProvider>
      <div className="course-page">
        <a className="course-skip" href="#projects">Skip to analyses</a>
        <CourseNav />
        <main><CourseHero /><CourseProjects /></main>
        <footer className="border-t border-white/10 px-5 py-10 sm:px-6">
          <div className="mx-auto flex max-w-6xl flex-col gap-5 sm:flex-row sm:justify-between">
            <p className="text-sm text-gray-400">A course portfolio by {coursePortfolio.meta.student}</p>
            <a href={homeUrl} className="course-link inline-flex items-center gap-2">Explore the full portfolio <ArrowUpRight size={15} aria-hidden="true" /></a>
          </div>
        </footer>
      </div>
    </ThemeProvider>
  );
}
