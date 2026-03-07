import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { SectionHeader } from './Projects';
import { portfolioData } from '../data/portfolio';

function InterestCard({ interest, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="glass-card glow-border rounded-2xl p-6"
    >
      <h3 className="text-lg font-semibold text-white mb-2">
        {interest.title}
      </h3>
      <p className="text-sm text-gray-400 leading-relaxed">
        {interest.description}
      </p>
    </motion.div>
  );
}

export default function Interests() {
  return (
    <section id="interests" className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <SectionHeader
          title="Research Interests"
          subtitle="What drives my work"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {portfolioData.interests.map((interest, i) => (
            <InterestCard key={i} interest={interest} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
