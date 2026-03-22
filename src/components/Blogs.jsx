import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { SectionHeader } from './Projects';
import { portfolioData } from '../data/portfolio';

export default function Blogs() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <section id="blogs" className="py-16 px-6">
      <div className="max-w-4xl mx-auto">
        <SectionHeader title="Blogs & Updates" subtitle="Where I share" />
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex flex-col gap-5"
        >
          {portfolioData.blogs.map((blog, i) => (
            <a
              key={i}
              href={blog.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between py-4 border-b border-white/8 hover:border-white/20 transition-all duration-200"
            >
              <div>
                <p className="text-white font-medium group-hover:text-gray-200 transition-colors">
                  {blog.title}
                </p>
                <p className="text-sm text-gray-500 mt-0.5">{blog.description}</p>
              </div>
              <span className="flex items-center gap-1.5 text-sm text-gray-500 group-hover:text-white transition-colors shrink-0 ml-6">
                {blog.cta}
                <ArrowUpRight size={15} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </span>
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
