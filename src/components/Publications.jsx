import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ExternalLink } from 'lucide-react';
import { SectionHeader } from './Projects';
import { portfolioData } from '../data/portfolio';

function PublicationCard({ pub, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -30 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      className="flex gap-6 group"
    >
      {/* Timeline */}
      <div className="flex flex-col items-center">
        <div className="w-3 h-3 rounded-full bg-white/60 ring-4 ring-white/10 shrink-0 mt-1.5" />
        {index < portfolioData.publications.length - 1 && (
          <div className="w-px flex-1 bg-gradient-to-b from-white/20 to-transparent mt-2" />
        )}
      </div>

      {/* Content */}
      <div className="glass-card rounded-2xl p-6 mb-6 flex-1 group-hover:border-white/12 transition-all duration-300">
        <div className="flex items-start gap-4">
          {pub.image && (
            <img
              src={pub.image}
              alt={pub.venue || pub.title}
              className="w-12 h-12 rounded-lg object-contain bg-white/10 p-1.5 shrink-0"
              loading="lazy"
            />
          )}
          <div className="flex-1">
            <span className="text-xs text-gray-500 font-mono">{pub.year}</span>
            {pub.venue && (
              <p className="text-xs uppercase tracking-wider text-gray-500 mt-1">
                {pub.venue}
              </p>
            )}
            <h3 className="text-lg font-semibold text-white mt-1">
              {pub.title}
            </h3>
            {pub.description && (
              <p className="text-sm text-gray-400 mt-2 leading-relaxed">
                {pub.description}
              </p>
            )}
            {pub.link && (
              <a
                href={pub.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-white mt-3 transition-colors"
              >
                Read Paper <ExternalLink size={14} />
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Publications() {
  return (
    <section id="publications" className="py-16 px-6">
      <div className="max-w-3xl mx-auto">
        <SectionHeader title="Publications" subtitle="Research & Papers" />
        <div>
          {portfolioData.publications.map((pub, i) => (
            <PublicationCard key={i} pub={pub} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
