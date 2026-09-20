import { useTheme } from '../../context/ThemeContext';
import { coursePortfolio } from '../../data/coursePortfolio';

const base = import.meta.env.BASE_URL;

function StudyFigure({ chart }) {
  const { isDark } = useTheme();
  const url = `${base}images/course/${chart.name}-${isDark ? 'dark' : 'light'}.png`;
  return (
    <figure className="course-chart-frame min-w-0">
      <p className="text-base font-medium text-gray-200">{chart.title}</p>
      <img src={url} alt={chart.alt} loading="lazy" width="1120" height="720" className="mt-3 block h-auto w-full" />
      <figcaption className="mt-4 text-sm leading-relaxed text-gray-300">
        {chart.caption}
        <a href={url} target="_blank" rel="noreferrer" className="course-link mt-3 block" aria-label={`Open full-size figure: ${chart.title} (new tab)`}>
          Open full-size figure ↗
        </a>
      </figcaption>
    </figure>
  );
}

function ProjectStory({ project }) {
  return (
    <article id={project.id} aria-labelledby={`${project.id}-title`} className="course-study border-b border-white/10 py-12 sm:py-16">
      <p className="course-label course-accent">{project.index} / {project.eyebrow}</p>
      <h3 id={`${project.id}-title`} className="mt-4 max-w-3xl text-3xl font-semibold tracking-tight text-white sm:text-4xl">{project.title}</h3>
      <p className="mt-3 text-sm text-gray-400">{project.context}</p>
      <div className="mt-6 grid gap-3 md:grid-cols-[11rem_1fr]">
        <p className="course-label text-gray-400">My choice and why</p>
        <p className="max-w-3xl leading-relaxed text-gray-300">{project.decision}</p>
      </div>
      <div className="course-result mt-7 border-l-2 pl-5">
        <p className="course-label course-accent">What the evidence shows</p>
        <p className="mt-2 max-w-4xl text-lg font-medium leading-relaxed text-gray-200">{project.result}</p>
      </div>
      <div className="mt-7 grid gap-5 md:grid-cols-2">
        {project.charts.map(chart => <StudyFigure key={chart.name} chart={chart} />)}
      </div>
      <div className="mt-8 grid gap-7 md:grid-cols-2">
        <div><h4 className="course-label course-accent">What I learned</h4><p className="mt-3 leading-relaxed text-gray-200">{project.takeaway}</p></div>
        <div><h4 className="course-label text-gray-400">Limits and next check</h4><p className="mt-3 leading-relaxed text-gray-300">{project.limitation}</p></div>
      </div>
      <details className="course-evidence mt-7 border-y border-white/10 py-4">
        <summary className="cursor-pointer text-sm font-medium text-gray-200">Assignment brief & verification notes</summary>
        <div className="mt-5 grid gap-6 md:grid-cols-2">
          <div><p className="course-label text-gray-400">{project.assignment} · Summarized</p><p className="mt-3 text-sm leading-relaxed text-gray-300">{project.question}</p></div>
          <div><p className="course-label course-accent">Verified for this portfolio</p><p className="mt-3 text-sm leading-relaxed text-gray-300">{project.verification}</p></div>
        </div>
      </details>
      <div className="mt-5 flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <a className="course-link" aria-label={`Read notebook: ${project.nav}`} href={`${base}evidence/course/${project.id}.html#cell-${project.notebookCell}`}>Read notebook →</a>
          <p className="mt-1 text-xs text-gray-400">{project.notebookSection} · original text and saved outputs</p>
        </div>
        <ul aria-label="Methods used" className="flex flex-wrap gap-2">
          {project.tags.map(tag => <li key={tag} className="rounded-full border border-white/10 px-3 py-1 text-xs text-gray-300">{tag}</li>)}
        </ul>
      </div>
    </article>
  );
}

export default function CourseProjects() {
  return (
    <>
      <section id="projects" aria-labelledby="studies-title" className="px-5 py-12 sm:px-6 sm:py-16">
        <div className="mx-auto max-w-6xl">
          <p className="course-label course-accent">Four questions · Four studies</p>
          <h2 id="studies-title" className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">Learning to choose an analysis.</h2>
          <p className="mt-4 max-w-3xl leading-relaxed text-gray-300">These are separate datasets and a simulation, connected by one question: what does each representation preserve, and what can I reasonably conclude from it?</p>
          {coursePortfolio.projects.map(project => <ProjectStory key={project.id} project={project} />)}
          <p className="mt-8 text-sm leading-relaxed text-gray-400">Built with {coursePortfolio.toolkit.join(', ')}. Figures were regenerated from the course data; notebook exports preserve the original work, with verification notes for corrections. <a className="course-link" href={`${base}evidence/course/verified-results.json`}>View recomputed values →</a></p>
        </div>
      </section>
      <section aria-labelledby="learnings-title" className="course-findings px-5 py-14 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <p className="course-label course-accent">What connects the work</p>
          <h2 id="learnings-title" className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">What I take into the next analysis.</h2>
          <div className="mt-8 grid gap-8 md:grid-cols-3">
            {coursePortfolio.learnings.map(learning => (
              <article key={learning.title}>
                <h3 className="text-xl font-medium text-gray-200">{learning.title}</h3>
                <p className="mt-4 leading-relaxed text-gray-300">{learning.description}</p>
                <a className="course-link mt-4 inline-block" href={`#${learning.study}`}>{learning.label} →</a>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
