import React, { useState } from 'react';
import { ArrowLeft, Search, Sparkles, Compass, BookOpen, HeartHandshake, Home } from 'lucide-react';

interface NotFoundPageProps {
  onNavigateHome: () => void;
  onNavigateSection: (sectionId: string) => void;
  onSearch: (query: string) => void;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({
  onNavigateHome,
  onNavigateSection,
  onSearch,
}) => {
  const [query, setQuery] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
      onNavigateSection('catalog');
    }
  };

  const mainPages = [
    {
      title: 'Formulas & Catalog',
      desc: 'Browse our full apothecary of active serums, barrier creams, and mineral SPF.',
      icon: Sparkles,
      id: 'catalog',
    },
    {
      title: 'Daily Skincare Rituals',
      desc: 'Discover calibrated AM antioxidant defense and PM cellular barrier repair steps.',
      icon: Compass,
      id: 'routines',
    },
    {
      title: 'Skin Diagnostic Quiz',
      desc: 'Take our 1-minute diagnostic to receive your tailored botanical prescription.',
      icon: HeartHandshake,
      id: 'diagnostic',
    },
    {
      title: 'Active Science & Ingredients',
      desc: 'Learn about our stabilized Vitamin C, bio-identical ceramides, and Cica hydrosol.',
      icon: BookOpen,
      id: 'ingredients',
    },
  ];

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-16 bg-[#FAF8F5]">
      <div className="max-w-2xl w-full text-center space-y-8 animate-in fade-in duration-300">
        {/* Editorial Subtitle */}
        <div className="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#78716C]">
          <span>404</span>
          <span aria-hidden="true">·</span>
          <span>Ritual Not Found</span>
        </div>

        {/* Headline */}
        <div className="space-y-3">
          <h1 className="text-4xl sm:text-5xl font-serif font-medium text-[#1C1917] tracking-tight [text-wrap:balance]">
            Lost in the Botanicals?
          </h1>
          <p className="text-sm sm:text-base text-[#57534E] leading-relaxed max-w-lg mx-auto">
            The page or formulation you are seeking has wandered off path, been renamed, or gently archived. Let us guide you back to balanced skin.
          </p>
        </div>

        {/* In-page Quick Search Bar */}
        <form onSubmit={handleSearchSubmit} className="max-w-md mx-auto">
          <div className="relative flex items-center bg-white border border-[#D6D0C7] rounded-lg shadow-xs overflow-hidden focus-within:border-[#1C1917] transition-colors">
            <Search className="w-4 h-4 text-[#78716C] ml-3.5 shrink-0" />
            <input
              type="text"
              placeholder="Search active formulas, ceramides, or concerns..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full px-3 py-3 text-xs text-[#1C1917] placeholder:text-[#A8A29E] bg-transparent focus:outline-none"
            />
            <button
              type="submit"
              className="m-1.5 px-4 py-2 bg-[#1C1917] hover:bg-[#292524] text-white text-xs font-semibold uppercase tracking-wider rounded cursor-pointer transition-colors"
            >
              Search
            </button>
          </div>
        </form>

        {/* Curated Main Destinations Grid */}
        <div className="pt-4">
          <div className="text-xs uppercase tracking-wider font-semibold text-[#78716C] mb-4">
            Popular Destinations
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
            {mainPages.map((page) => {
              const Icon = page.icon;
              return (
                <button
                  key={page.id}
                  onClick={() => onNavigateSection(page.id)}
                  className="p-4 bg-white border border-[#E7E2DA] rounded-lg hover:border-[#1C1917] hover:shadow-xs transition-all cursor-pointer group flex items-start gap-3.5"
                >
                  <div className="p-2 rounded bg-[#FAF8F5] text-[#1C1917] group-hover:bg-[#1C1917] group-hover:text-white transition-colors shrink-0">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-serif font-medium text-sm text-[#1C1917] group-hover:text-[#57534E] transition-colors">
                      {page.title}
                    </div>
                    <div className="text-xs text-[#78716C] mt-0.5 leading-snug">
                      {page.desc}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Primary Action Button */}
        <div className="pt-4 flex items-center justify-center gap-3">
          <button
            onClick={onNavigateHome}
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#1C1917] hover:bg-[#292524] text-white text-xs font-semibold uppercase tracking-wider rounded-md shadow-xs transition-all cursor-pointer"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Return to Home Storefront</span>
          </button>
        </div>
      </div>
    </div>
  );
};
