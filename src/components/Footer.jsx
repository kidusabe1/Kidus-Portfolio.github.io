import { portfolioData } from '../data/portfolio';

export default function Footer() {
  const { personal } = portfolioData;

  return (
    <footer className="border-t border-white/5 py-8 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-gray-500">
          &copy; {new Date().getFullYear()} {personal.fullName}. Built with React &amp; Tailwind CSS.
        </p>
        <div className="flex items-center gap-6">
          {Object.entries(personal.social).map(([platform, url]) => (
            <a
              key={platform}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-white transition-colors text-sm capitalize"
            >
              {platform}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
