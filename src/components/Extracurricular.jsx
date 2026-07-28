import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { SectionHeader } from './Projects';
import { portfolioData } from '../data/portfolio';

function ActivityCard({ activity, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="glass-card rounded-2xl p-6 flex gap-4"
    >
      {activity.image && (
        <img
          src={activity.image}
          alt={activity.title}
          className="w-14 h-14 rounded-xl object-cover shrink-0"
          loading="lazy"
        />
      )}
      <div>
        <span className="text-xs text-gray-500 font-mono">
          {activity.period}
        </span>
        <h3 className="text-base font-semibold text-white mt-1">
          {activity.title}
        </h3>
        {activity.organization && (
          <p className="text-sm text-gray-500 mt-0.5">
            {activity.organization}
          </p>
        )}
        {Array.isArray(activity.description) ? (
          <ul className="space-y-1.5 mt-2">
            {activity.description.map((item) => (
              <li
                key={item}
                className="text-sm text-gray-400 leading-relaxed flex gap-2"
              >
                <span aria-hidden="true" className="text-gray-600">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-gray-400 leading-relaxed mt-2">
            {activity.description}
          </p>
        )}
      </div>
    </motion.div>
  );
}

export default function Extracurricular() {
  return (
    <section className="py-16 px-6">
      <div className="max-w-4xl mx-auto">
        <SectionHeader
          title="Extracurricular"
          subtitle="Beyond the code"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {portfolioData.extraCurricular.map((activity, i) => (
            <ActivityCard key={i} activity={activity} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
