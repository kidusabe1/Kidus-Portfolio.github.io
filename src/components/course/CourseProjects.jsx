import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { coursePortfolio } from '../../data/coursePortfolio';

function SectionIntro({ index, eyebrow, title, description }) {
  return (
    <div className="grid gap-5 border-b border-white/10 pb-8 md:grid-cols-[0.35fr_1fr]">
      <div className="flex items-start gap-4 font-mono text-[11px] uppercase tracking-[0.2em] text-gray-600">
        <span className="course-accent">{index}</span>
        <span>{eyebrow}</span>
      </div>
      <div>
        <h2 className="max-w-2xl text-3xl font-semibold tracking-tight text-white sm:text-5xl">
          {title}
        </h2>
        <p className="mt-4 max-w-2xl leading-relaxed text-gray-400">
          {description}
        </p>
      </div>
    </div>
  );
}

function Toolkit() {
  return (
    <div className="mt-12 grid gap-5 border border-white/10 p-6 sm:grid-cols-[0.35fr_1fr] sm:p-8">
      <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-gray-600">
        Computational toolkit
      </p>
      <div className="flex flex-wrap gap-2">
        {coursePortfolio.toolkit.map((tool) => (
          <span
            key={tool}
            className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-gray-400"
          >
            {tool}
          </span>
        ))}
      </div>
    </div>
  );
}

function ProjectStory({ project }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const { isDark } = useTheme();
  const chartUrl = `${import.meta.env.BASE_URL}images/course/${project.chart}-${isDark ? 'dark' : 'light'}.png`;

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55 }}
      className="border-b border-white/10 py-14 md:py-20"
    >
      <div className="flex items-center justify-between">
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-gray-600">
          {project.index}
        </p>
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] course-accent">
          {project.eyebrow}
        </p>
      </div>
      <h3
        id={project.id}
        className="mt-5 max-w-3xl text-2xl font-semibold tracking-tight text-white sm:text-4xl"
      >
        {project.title}
      </h3>

      <figure className="course-chart-frame mt-8">
        <img
          src={chartUrl}
          alt={project.chartAlt}
          loading="lazy"
          className="block h-auto w-full"
        />
      </figure>

      <div className="mt-8 grid gap-8 md:grid-cols-[0.9fr_1.1fr] md:gap-14">
        <div className="course-question">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] course-accent">
            Original assignment prompt
          </p>
          <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.14em] text-gray-600">
            {project.assignment}
          </p>
          <blockquote className="mt-5 text-sm leading-relaxed text-gray-300">
            {project.question}
          </blockquote>
        </div>

        <dl className="space-y-6">
          <div className="grid gap-2 sm:grid-cols-[6rem_1fr]">
            <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-gray-600">
              Method
            </dt>
            <dd className="text-sm leading-relaxed text-gray-500">{project.approach}</dd>
          </div>
          <div className="grid gap-2 sm:grid-cols-[6rem_1fr]">
            <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-gray-600">
              Result
            </dt>
            <dd className="text-sm leading-relaxed text-gray-300">{project.result}</dd>
          </div>
          <div className="grid gap-2 sm:grid-cols-[6rem_1fr]">
            <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-gray-600">
              Meaning
            </dt>
            <dd className="text-sm leading-relaxed text-gray-400">{project.takeaway}</dd>
          </div>
        </dl>
      </div>

      <div className="mt-8 flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-white/10 px-3 py-1 text-[11px] text-gray-500"
          >
            {tag}
          </span>
        ))}
      </div>
    </motion.article>
  );
}

function Findings() {
  return (
    <section className="course-findings px-5 py-24 sm:px-6 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionIntro
          index="02"
          eyebrow="Selected findings"
          title="Numbers with context."
          description="Three memorable checkpoints from the analyses—not benchmark claims, but concrete observations that shaped the reasoning."
        />
        <div className="mt-12 grid gap-px overflow-hidden border border-white/10 bg-white/10 md:grid-cols-3">
          {coursePortfolio.findings.map((finding) => (
            <article key={finding.value} className="course-finding p-6 sm:p-8">
              <p className="font-mono text-3xl tracking-tight text-white">{finding.value}</p>
              <p className="mt-4 text-sm leading-relaxed text-gray-500">{finding.label}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Reflection() {
  return (
    <section className="px-5 py-24 sm:px-6 sm:py-32">
      <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-[0.35fr_1fr]">
        <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-gray-600">
          <span className="mr-4 course-accent">03</span>
          Reflection
        </div>
        <blockquote className="max-w-3xl">
          <p className="text-2xl font-medium leading-snug tracking-tight text-gray-200 sm:text-4xl sm:leading-snug">
            The central lesson was not finding one “correct” method. It was learning
            to ask what information each representation preserves—and what it hides.
          </p>
          <footer className="mt-7 text-sm text-gray-600">
            Kidus Abebe Mekonen · Signal and Data Analysis for Neuroscience
          </footer>
        </blockquote>
      </div>
    </section>
  );
}

export default function CourseProjects() {
  return (
    <>
      <section className="px-5 py-24 sm:px-6 sm:py-32" id="projects">
        <div className="mx-auto max-w-6xl">
          <SectionIntro
            index="01"
            eyebrow="Questions + results"
            title="Four results worth seeing."
            description="Each study starts with the original assignment question, then shows the actual result produced from the submitted data and analysis."
          />
          <div className="mt-2">
            {coursePortfolio.projects.map((project) => (
              <ProjectStory key={project.id} project={project} />
            ))}
          </div>
          <Toolkit />
        </div>
      </section>
      <Findings />
      <Reflection />
    </>
  );
}
