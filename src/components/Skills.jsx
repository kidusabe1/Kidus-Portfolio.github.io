import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { SectionHeader } from './Projects';
import { portfolioData } from '../data/portfolio';

function SkillCategory({ category, skills, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="glass-card rounded-2xl p-6"
    >
      <h3 className="text-base font-semibold text-white mb-4">{category}</h3>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill, i) => (
          <span
            key={i}
            className="px-3 py-1.5 text-sm rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20"
          >
            {skill}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <SectionHeader
          title="Technical Competencies"
          subtitle="Tools & technologies"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Object.entries(portfolioData.skills).map(
            ([category, skills], i) => (
              <SkillCategory
                key={category}
                category={category}
                skills={skills}
                index={i}
              />
            )
          )}
        </div>
      </div>
    </section>
  );
}
