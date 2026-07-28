import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Award, BadgeCheck } from 'lucide-react';
import { SectionHeader } from './Projects';
import { portfolioData } from '../data/portfolio';

export default function Credentials() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <section id="credentials" className="py-16 px-6">
      <div className="max-w-4xl mx-auto">
        <SectionHeader
          title="Honours & Certifications"
          subtitle="Recognition & continued learning"
        />

        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-6"
        >
          <div className="glass-card rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-white/8 flex items-center justify-center">
                <Award size={19} className="text-gray-400" />
              </div>
              <h3 className="text-base font-semibold text-white">
                Selected Scholarships
              </h3>
            </div>
            <div className="space-y-5">
              {portfolioData.awards.map((award) => (
                <article key={award.title}>
                  <h4 className="text-sm font-semibold text-white">
                    {award.title}
                  </h4>
                  <p className="text-sm text-gray-400 leading-relaxed mt-1">
                    {award.description}
                  </p>
                </article>
              ))}
            </div>
          </div>

          <div className="glass-card rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-white/8 flex items-center justify-center">
                <BadgeCheck size={19} className="text-gray-400" />
              </div>
              <h3 className="text-base font-semibold text-white">
                Certifications
              </h3>
            </div>
            <ul className="space-y-3">
              {portfolioData.certifications.map((certification) => (
                <li
                  key={certification}
                  className="flex items-start gap-2.5 text-sm text-gray-300 leading-relaxed"
                >
                  <BadgeCheck
                    size={15}
                    aria-hidden="true"
                    className="text-gray-500 shrink-0 mt-0.5"
                  />
                  <span>{certification}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
