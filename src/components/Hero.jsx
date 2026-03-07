import { motion } from 'framer-motion';
import { ArrowDown, FileText } from 'lucide-react';
import { portfolioData } from '../data/portfolio';

export default function Hero() {
  const { personal } = portfolioData;

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden grid-bg">
      {/* Gradient orbs */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-indigo-600/20 rounded-full blur-[128px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-cyan-500/15 rounded-full blur-[128px] pointer-events-none" />

      <div className="relative max-w-4xl mx-auto px-6 text-center pt-24 pb-20">
        {/* Tag */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-sm font-medium mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          {personal.tagline}
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.7 }}
          className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-tight mb-6"
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
          className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-8 leading-relaxed"
        >
          {personal.description}
        </motion.p>

        {/* Highlights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="flex flex-wrap justify-center gap-4 mb-10"
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
          transition={{ delay: 1, duration: 0.6 }}
          className="flex flex-wrap justify-center gap-4"
        >
          <a
            href="#projects"
            className="px-8 py-3 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white font-medium transition-all duration-200 shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40"
          >
            View Projects
          </a>
          <a
            href={personal.cvUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3 rounded-full border border-white/20 text-gray-300 hover:text-white hover:border-white/40 font-medium transition-all duration-200 flex items-center gap-2"
          >
            <FileText size={18} />
            Download CV
          </a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          >
            <ArrowDown className="text-gray-500" size={20} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
