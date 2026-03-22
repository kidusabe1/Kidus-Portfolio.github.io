import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { GraduationCap } from 'lucide-react';
import { SectionHeader } from './Projects';
import { portfolioData } from '../data/portfolio';

function EducationCard({ edu, index }) {
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
        <div className="w-12 h-12 rounded-lg bg-white/8 flex items-center justify-center shrink-0">
          <GraduationCap size={22} className="text-gray-400" />
        </div>
        <div className="flex-1">
          {edu.period && (
            <span className="text-xs text-gray-500 font-mono">
              {edu.period}
            </span>
          )}
          <h3 className="text-lg font-semibold text-white mt-1">
            {edu.degree}
          </h3>
          {edu.program && (
            <p className="text-sm text-gray-400">{edu.program}</p>
          )}
          <p className="text-sm text-gray-500">
            {edu.institution} — {edu.location}
          </p>
        </div>
      </div>
      <p className="text-gray-300 text-sm leading-relaxed">
        {edu.description}
      </p>
    </motion.div>
  );
}

export default function Education() {
  return (
    <section id="education" className="py-16 px-6">
      <div className="max-w-4xl mx-auto">
        <SectionHeader
          title="Education"
          subtitle="Academic background"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {portfolioData.education.map((edu, i) => (
            <EducationCard key={i} edu={edu} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
