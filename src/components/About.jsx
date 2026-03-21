import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { portfolioData } from '../data/portfolio';

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  const { personal } = portfolioData;

  return (
    <section className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="glass-card rounded-3xl p-8 md:p-12 relative overflow-hidden"
        >
          {/* Background accent */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/[0.02] rounded-full blur-[80px] pointer-events-none" />

          <div className="relative">
            <p className="text-gray-500 text-sm font-medium mb-2">
              Get to know me
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              About Me
            </h2>
            <p className="text-gray-300 text-lg leading-relaxed mb-8">
              {personal.about}
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href={personal.cvUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-full border border-white/20 text-gray-300 hover:text-white hover:border-white/40 transition-all duration-200"
              >
                Check My CV
              </a>
              <a
                href="#contact"
                className="px-6 py-3 rounded-full bg-white hover:bg-gray-100 text-black font-medium transition-all duration-200"
              >
                Let&apos;s Connect
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
