import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ExternalLink, Briefcase } from 'lucide-react';
import { SectionHeader } from './Projects';
import { portfolioData } from '../data/portfolio';

function ExperienceCard({ exp, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      className="glass-card glow-border rounded-2xl p-6 md:p-8"
    >
      <div className="flex items-start gap-4 mb-4">
        {exp.image ? (
          <img
            src={exp.image}
            alt={exp.company}
            className="w-12 h-12 rounded-lg object-contain bg-white/10 p-1.5 shrink-0"
            loading="lazy"
          />
        ) : (
          <div className="w-12 h-12 rounded-lg bg-white/8 flex items-center justify-center shrink-0">
            <Briefcase size={20} className="text-gray-400" />
          </div>
        )}
        <div className="flex-1">
          <span className="text-xs text-gray-500 font-mono">
            {exp.period}
          </span>
          <h3 className="text-lg font-semibold text-white mt-1">
            {exp.company}
          </h3>
          {exp.organization && (
            <p className="text-sm text-gray-400">{exp.organization}</p>
          )}
          <p className="text-sm text-gray-400">{exp.role}</p>
          {exp.location && (
            <p className="text-xs text-gray-500 mt-1">{exp.location}</p>
          )}
        </div>
      </div>
      {Array.isArray(exp.description) ? (
        <ul className="space-y-2 mb-4">
          {exp.description.map((item) => (
            <li
              key={item}
              className="text-gray-300 text-sm leading-relaxed flex gap-2"
            >
              <span aria-hidden="true" className="text-gray-600">•</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-300 text-sm leading-relaxed mb-4">
          {exp.description}
        </p>
      )}
      {exp.link && (
        <a
          href={exp.link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-white transition-colors"
        >
          Visit Company <ExternalLink size={14} />
        </a>
      )}
    </motion.div>
  );
}

export default function Experience() {
  return (
    <section id="experience" className="py-16 px-6">
      <div className="max-w-4xl mx-auto">
        <SectionHeader
          title="Work Experience"
          subtitle="Where I've worked"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {portfolioData.workExperience.map((exp, i) => (
            <ExperienceCard key={i} exp={exp} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
