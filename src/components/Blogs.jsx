import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ExternalLink, Youtube, Github, Linkedin } from 'lucide-react';
import { SectionHeader } from './Projects';
import { portfolioData } from '../data/portfolio';

const iconMap = {
  youtube: Youtube,
  github: Github,
  linkedin: Linkedin,
};

function BlogCard({ blog, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const Icon = iconMap[blog.icon] || ExternalLink;

  return (
    <motion.a
      ref={ref}
      href={blog.link}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group glass-card glow-border rounded-2xl p-6 block hover:bg-white/[0.02] transition-all duration-300"
    >
      <div className="w-12 h-12 rounded-xl bg-white/8 flex items-center justify-center mb-4 group-hover:bg-white/12 transition-colors">
        <Icon size={22} className="text-gray-400" />
      </div>
      <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-gray-200 transition-colors">
        {blog.title}
      </h3>
      <p className="text-sm text-gray-400 leading-relaxed mb-4">
        {blog.description}
      </p>
      <span className="inline-flex items-center gap-1.5 text-sm text-gray-400 font-medium group-hover:text-white group-hover:gap-2.5 transition-all">
        {blog.cta} <ExternalLink size={14} />
      </span>
    </motion.a>
  );
}

export default function Blogs() {
  return (
    <section id="blogs" className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <SectionHeader title="Blogs & Updates" subtitle="Where I share" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {portfolioData.blogs.map((blog, i) => (
            <BlogCard key={i} blog={blog} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
