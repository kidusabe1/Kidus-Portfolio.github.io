import { motion } from 'framer-motion';
import { ArrowDown, FileText } from 'lucide-react';
import { portfolioData } from '../data/portfolio';

export default function Hero() {
  const { personal } = portfolioData;

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden grid-bg">
      {/* Subtle monochrome gradient orbs — hidden on mobile for perf */}
      <div className="hidden sm:block absolute top-1/4 -left-32 w-96 h-96 bg-white/[0.03] rounded-full blur-[128px] pointer-events-none" />
      <div className="hidden sm:block absolute bottom-1/4 -right-32 w-96 h-96 bg-white/[0.025] rounded-full blur-[128px] pointer-events-none" />

      <div className="relative max-w-4xl mx-auto px-5 sm:px-6 text-center pt-12 pb-8 sm:pt-20 sm:pb-16 md:pt-24 md:pb-20">
        {/* Tag */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="inline-flex items-center gap-2 px-3 py-1 sm:px-4 sm:py-1.5 rounded-full bg-white/5 border border-white/10 text-gray-300 text-xs sm:text-sm font-medium mb-6 sm:mb-8"
        >
          <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-white animate-pulse" />
          {personal.tagline}
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.7 }}
          className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight mb-4 sm:mb-6"
        >
          Hi, I&apos;m{' '}
          <span className="gradient-text">{personal.name}</span>.
          <br />
          <span className="text-gray-300">{personal.headline}</span>
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="text-base sm:text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-6 sm:mb-8 leading-relaxed"
        >
          {personal.description}
        </motion.p>

        {/* Highlights — hidden on mobile to reduce density */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="hidden sm:flex flex-wrap justify-center gap-3 sm:gap-4 mb-10"
        >
          {personal.highlights.map((h, i) => (
            <span
              key={i}
              className="px-3 py-1 text-sm rounded-full bg-white/5 border border-white/10 text-gray-300"
            >
              {h}
            </span>
          ))}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="flex flex-wrap justify-center gap-3 sm:gap-4"
        >
          <a
            href="#projects"
            className="px-6 py-2.5 sm:px-8 sm:py-3 rounded-full cta-btn font-medium transition-all duration-200 text-sm sm:text-base"
          >
            View Projects
          </a>
          <a
            href={personal.cvUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2.5 sm:px-8 sm:py-3 rounded-full border border-white/20 text-gray-300 hover:text-white hover:border-white/40 font-medium transition-all duration-200 flex items-center gap-2 text-sm sm:text-base"
          >
            <FileText size={16} className="sm:w-[18px] sm:h-[18px]" />
            Download CV
          </a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          >
            <ArrowDown className="text-gray-600" size={18} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
