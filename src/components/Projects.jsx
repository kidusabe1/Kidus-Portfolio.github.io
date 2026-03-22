import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ExternalLink } from 'lucide-react';
import { portfolioData } from '../data/portfolio';

function ProjectCard({ project, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.a
      ref={ref}
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group glass-card glow-border rounded-2xl overflow-hidden block"
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
        <div className="absolute top-3 right-3 p-2 rounded-full bg-white/10 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <ExternalLink size={14} className="text-white" />
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-gray-300 transition-colors duration-200">
          {project.title}
        </h3>
        <p className="text-sm text-gray-400 leading-relaxed mb-4">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag, i) => (
            <span
              key={i}
              className="px-2.5 py-0.5 text-xs rounded-full bg-white/8 text-gray-400 border border-white/10"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.a>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionHeader title="Featured Projects" subtitle="Things I've built" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {portfolioData.projects.map((project, i) => (
            <ProjectCard key={i} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function SectionHeader({ title, subtitle }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      className="mb-12"
    >
      <p className="text-gray-500 text-sm font-medium mb-2">{subtitle}</p>
      <h2 className="text-3xl md:text-4xl font-bold text-white">{title}</h2>
      <div className="w-16 h-px bg-white/20 mt-4" />
    </motion.div>
  );
}

export { SectionHeader };
