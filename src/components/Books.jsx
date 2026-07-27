import { useState, useRef, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { BookOpen, ChevronDown, X, MessageSquareQuote } from 'lucide-react';
import { SectionHeader } from './Projects';
import { booksData } from '../data/books';

const BOOK_PREVIEW_LIMIT = 4;

/* ── Extract dominant color from cover image ───────────── */
const colorCache = {};

function useImageColor(src) {
  const [color, setColor] = useState(colorCache[src] || '160,160,160');

  useEffect(() => {
    if (!src) return;
    if (colorCache[src]) return;

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        // Scale down for fast sampling
        canvas.width = 12;
        canvas.height = 18;
        ctx.drawImage(img, 0, 0, 12, 18);
        const data = ctx.getImageData(0, 0, 12, 18).data;

        // Find the most saturated color (skip very dark / very light pixels)
        let bestR = 160, bestG = 160, bestB = 160, bestSat = 0;
        for (let i = 0; i < data.length; i += 4) {
          const r = data[i], g = data[i + 1], b = data[i + 2];
          const max = Math.max(r, g, b), min = Math.min(r, g, b);
          const lum = (max + min) / 2;
          // Skip very dark or very bright pixels
          if (lum < 30 || lum > 230) continue;
          const sat = max === 0 ? 0 : (max - min) / max;
          if (sat > bestSat) {
            bestSat = sat;
            bestR = r; bestG = g; bestB = b;
          }
        }

        // If image is very desaturated, use the average color instead
        if (bestSat < 0.08) {
          let rSum = 0, gSum = 0, bSum = 0, count = 0;
          for (let i = 0; i < data.length; i += 4) {
            const lum = (data[i] + data[i + 1] + data[i + 2]) / 3;
            if (lum < 20 || lum > 240) continue;
            rSum += data[i]; gSum += data[i + 1]; bSum += data[i + 2];
            count++;
          }
          if (count > 0) {
            bestR = Math.round(rSum / count);
            bestG = Math.round(gSum / count);
            bestB = Math.round(bSum / count);
          }
        }

        const result = `${bestR},${bestG},${bestB}`;
        colorCache[src] = result;
        setColor(result);
      } catch {
        // CORS or canvas error — keep default
      }
    };
    img.src = src;
  }, [src]);

  return color;
}

/* ── Status badge (In Progress / Re-read) ──────────────── */
function StatusBadge({ status }) {
  if (status === 'read') return null;
  const label = status === 'in-progress' ? 'In Progress' : 'Re-read';
  return (
    <span className="absolute top-3 right-3 px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-white/10 border border-white/15 text-gray-300 backdrop-blur-sm">
      {label}
    </span>
  );
}

/* ── Blog-style thoughts modal ─────────────────────────── */
function ThoughtsModal({ book, onClose }) {
  // Lock body scroll while open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  // Close on Escape
  useEffect(() => {
    const fn = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', fn);
    return () => window.removeEventListener('keydown', fn);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 flex items-center justify-center px-4 py-8"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      {/* Content */}
      <motion.article
        role="dialog"
        aria-modal="true"
        aria-labelledby="thoughts-title"
        initial={{ opacity: 0, y: 30, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.97 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        className="relative glass-card rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-gray-400 hover:text-white transition-colors"
          aria-label="Close"
        >
          <X size={16} />
        </button>

        {/* Header: stacks on mobile, side-by-side on sm+ */}
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 p-5 sm:p-6 pb-0">
          {book.cover ? (
            <img
              src={book.cover}
              alt={book.title}
              className="w-20 h-30 sm:w-24 sm:h-36 object-cover rounded-lg shadow-lg shrink-0 self-center sm:self-start"
            />
          ) : (
            <div className="w-20 h-30 sm:w-24 sm:h-36 rounded-lg bg-white/5 border border-white/8 flex items-center justify-center shrink-0 self-center sm:self-start">
              <BookOpen size={28} className="text-gray-600" />
            </div>
          )}
          <div className="flex flex-col justify-center min-w-0 text-center sm:text-left">
            <h2 id="thoughts-title" className="text-lg sm:text-xl font-bold text-white leading-snug">{book.title}</h2>
            <p className="text-sm text-gray-400 mt-1">{book.author}</p>
            {book.note && (
              <p className="text-xs text-gray-500 mt-2 italic">{book.note}</p>
            )}
          </div>
        </div>

        {/* Divider */}
        <div className="mx-5 sm:mx-6 my-4 sm:my-5 border-t border-white/8" />

        {/* Thoughts body — blog-style prose */}
        <div className="px-5 sm:px-6 pb-5 sm:pb-6">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-3">
            My Thoughts
          </h3>
          <div className="text-sm text-gray-300 leading-relaxed whitespace-pre-line">
            {book.thoughts}
          </div>
        </div>
      </motion.article>
    </motion.div>
  );
}

/* ── Book card ─────────────────────────────────────────── */
function BookCard({ book, index, onOpenThoughts, className = '' }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const hasThoughts = book.thoughts && book.thoughts !== 'null';
  const glowColor = useImageColor(book.cover);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      className={`glass-card rounded-xl overflow-hidden group transition-shadow duration-500 ${className}`}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = `0 0 25px rgba(${glowColor}, 0.18), 0 0 60px rgba(${glowColor}, 0.07)`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      {/* Cover */}
      <div className="relative aspect-[2/3] overflow-hidden bg-white/5">
        {book.cover ? (
          <img
            src={book.cover}
            alt={book.title}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <BookOpen size={36} className="text-gray-600" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <StatusBadge status={book.status} />
      </div>

      {/* Info — relative to sit above glow-border ::before */}
      <div className="relative z-10 px-3 py-3">
        <h3 className="text-sm font-semibold text-white leading-snug">
          {book.title}
        </h3>
        <p className="text-xs text-gray-500 mt-1">{book.author}</p>
        {book.note && (
          <p className="text-[11px] text-gray-400 mt-1.5 italic">{book.note}</p>
        )}
        {hasThoughts && (
          <button
            onClick={(e) => { e.stopPropagation(); onOpenThoughts(book); }}
            className="mt-3 w-full flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 border border-white/8 hover:border-white/20 transition-all duration-200 cursor-pointer active:scale-95"
          >
            <MessageSquareQuote size={13} />
            My Thoughts
          </button>
        )}
      </div>
    </motion.div>
  );
}

/* ── Empty state ───────────────────────────────────────── */
function EmptyState({ year }) {
  return (
    <div className="col-span-full flex flex-col items-center justify-center py-16 text-center">
      <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/8 flex items-center justify-center mb-4">
        <BookOpen size={28} className="text-gray-600" />
      </div>
      <p className="text-gray-500 text-sm">No books added for {year} yet.</p>
    </div>
  );
}

/* ── Main section ──────────────────────────────────────── */
export default function Books() {
  const years = Object.keys(booksData)
    .map(Number)
    .sort((a, b) => b - a);

  const [activeYear, setActiveYear] = useState(years[0] ?? 2026);
  const [openBook, setOpenBook] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const books = booksData[activeYear] ?? [];
  const visibleBooks = isExpanded ? books : books.slice(0, BOOK_PREVIEW_LIMIT);
  const hasMoreBooks = books.length > BOOK_PREVIEW_LIMIT;

  const selectYear = (year) => {
    setActiveYear(year);
    setIsExpanded(false);
  };

  return (
    <section id="books" className="py-12 px-6">
      <div className="max-w-5xl mx-auto">
        <SectionHeader title="Books I Loved" subtitle="Reading list" />

        {/* Year tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-6">
          {years.map((year) => (
            <button
              key={year}
              onClick={() => selectYear(year)}
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
        <div
          id="books-grid"
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4"
        >
          {books.length > 0 ? (
            visibleBooks.map((book, i) => (
              <BookCard
                key={book.title}
                book={book}
                index={i}
                onOpenThoughts={setOpenBook}
                className={
                  !isExpanded && i === 2
                    ? 'hidden sm:block'
                    : !isExpanded && i === 3
                      ? 'hidden lg:block'
                      : ''
                }
              />
            ))
          ) : (
            <EmptyState year={activeYear} />
          )}
        </div>

        {hasMoreBooks && (
          <div className="flex justify-center mt-5">
            <button
              type="button"
              onClick={() => setIsExpanded((expanded) => !expanded)}
              aria-expanded={isExpanded}
              aria-controls="books-grid"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/15 bg-white/[0.03] text-xs font-medium text-gray-400 hover:text-white hover:border-white/30 hover:bg-white/[0.06] transition-all duration-200"
            >
              {isExpanded ? 'Show fewer books' : `View all ${books.length} books`}
              <ChevronDown
                size={14}
                aria-hidden="true"
                className={`transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
              />
            </button>
          </div>
        )}
      </div>

      {/* Thoughts modal */}
      <AnimatePresence>
        {openBook && (
          <ThoughtsModal book={openBook} onClose={() => setOpenBook(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}
