import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { BookOpen } from 'lucide-react';
import { SectionHeader } from './Projects';
import { booksData } from '../data/books';

function StarRating({ rating }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          width="13"
          height="13"
          viewBox="0 0 24 24"
          fill={star <= rating ? 'currentColor' : 'none'}
          stroke="currentColor"
          strokeWidth="2"
          className={star <= rating ? 'text-white' : 'text-gray-700'}
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </div>
  );
}

function BookCard({ book, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: index * 0.07 }}
      className="glass-card glow-border rounded-2xl p-5 flex gap-4"
    >
      {/* Cover or placeholder */}
      {book.cover ? (
        <img
          src={book.cover}
          alt={book.title}
          className="w-16 h-24 object-cover rounded-lg shrink-0"
          loading="lazy"
        />
      ) : (
        <div className="w-16 h-24 rounded-lg bg-white/5 border border-white/8 flex items-center justify-center shrink-0">
          <BookOpen size={20} className="text-gray-600" />
        </div>
      )}

      {/* Info */}
      <div className="flex-1 min-w-0">
        <StarRating rating={book.rating} />
        <h3 className="text-base font-semibold text-white mt-1.5 leading-snug">
          {book.title}
        </h3>
        <p className="text-sm text-gray-500 mt-0.5">{book.author}</p>
        {book.note && (
          <p className="text-xs text-gray-400 leading-relaxed mt-2 italic">
            {book.note}
          </p>
        )}
      </div>
    </motion.div>
  );
}

function EmptyState({ year }) {
  return (
    <div className="col-span-2 flex flex-col items-center justify-center py-16 text-center">
      <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/8 flex items-center justify-center mb-4">
        <BookOpen size={28} className="text-gray-600" />
      </div>
      <p className="text-gray-500 text-sm">No books added for {year} yet.</p>
      <p className="text-gray-700 text-xs mt-1">
        Add entries to <code className="font-mono">src/data/books.js</code> to populate this list.
      </p>
    </div>
  );
}

export default function Books() {
  const years = Object.keys(booksData)
    .map(Number)
    .sort((a, b) => b - a);

  const [activeYear, setActiveYear] = useState(years[0] ?? 2026);

  const books = booksData[activeYear] ?? [];

  return (
    <section id="books" className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <SectionHeader title="Books I Loved" subtitle="Reading list" />

        {/* Year tabs */}
        <div className="flex flex-wrap gap-2 mb-10">
          {years.map((year) => (
            <button
              key={year}
              onClick={() => setActiveYear(year)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                activeYear === year
                  ? 'bg-white text-black'
                  : 'border border-white/15 text-gray-400 hover:text-white hover:border-white/30'
              }`}
            >
              {year}
            </button>
          ))}
        </div>

        {/* Book grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {books.length > 0 ? (
            books.map((book, i) => (
              <BookCard key={i} book={book} index={i} />
            ))
          ) : (
            <EmptyState year={activeYear} />
          )}
        </div>
      </div>
    </section>
  );
}
