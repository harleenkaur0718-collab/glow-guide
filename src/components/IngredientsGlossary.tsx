import React, { useState } from 'react';
import { Microscope, Search, ShieldCheck } from 'lucide-react';
import { INGREDIENTS } from '../data/skincareData';

export const IngredientsGlossary: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIngredient, setSelectedIngredient] = useState(INGREDIENTS[0]);

  const filtered = INGREDIENTS.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.purpose.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.benefit.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section id="ingredients" className="py-16 bg-[#F5F1EB] border-b border-[#E7E2DA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mb-10 space-y-2">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#78716C]">
            <Microscope className="w-3.5 h-3.5 text-[#1C1917]" />
            <span>Formulation Transparency</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-medium text-[#1C1917]">
            The Botanical Science Index
          </h2>
          <p className="text-sm text-[#57534E]">
            We disclose every active molecule, biological pH compatibility range, and botanical origin. No proprietary blends, no hidden fillers.
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8 max-w-md relative">
          <Search className="w-4 h-4 text-[#78716C] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search active compound or purpose..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 bg-white border border-[#D6D0C7] rounded-md text-xs text-[#1C1917] placeholder:text-[#A8A29E] focus:outline-none focus:border-[#1C1917]"
          />
        </div>

        {/* 2-Column Split: Active Selector Left, In-Depth Scientific Dossier Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* List of Ingredients */}
          <div className="lg:col-span-5 space-y-2.5 max-h-[460px] overflow-y-auto pr-2">
            {filtered.map((item) => {
              const isSelected = selectedIngredient.name === item.name;
              return (
                <button
                  key={item.name}
                  onClick={() => setSelectedIngredient(item)}
                  className={`w-full text-left p-4 rounded-lg border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#1C1917] text-white border-[#1C1917] shadow-xs'
                      : 'bg-[#FAF8F5] text-[#1C1917] border-[#E7E2DA] hover:border-[#1C1917]'
                  }`}
                >
                  <div className="font-serif font-medium text-base">{item.name}</div>
                  <div className={`text-xs mt-0.5 ${isSelected ? 'text-[#D6D0C7]' : 'text-[#78716C]'}`}>
                    {item.purpose}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Detailed Scientific Dossier */}
          <div className="lg:col-span-7 bg-[#FAF8F5] border border-[#E7E2DA] rounded-xl p-6 sm:p-8 space-y-6">
            <div className="border-b border-[#E7E2DA] pb-4">
              <span className="text-xs uppercase tracking-widest text-[#78716C] font-semibold">
                Clinical Molecule Profile
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif text-[#1C1917] mt-1">
                {selectedIngredient.name}
              </h3>
              <p className="font-mono text-xs text-[#78716C] mt-0.5">
                INCI: {selectedIngredient.scientificName}
              </p>
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-[#44403C] leading-relaxed">
              <div>
                <strong className="block text-xs uppercase tracking-wider text-[#1C1917] mb-1">
                  Biological Mechanism & Action:
                </strong>
                <p>{selectedIngredient.benefit}</p>
              </div>

              <div>
                <strong className="block text-xs uppercase tracking-wider text-[#1C1917] mb-1">
                  Target Epidermal Profile:
                </strong>
                <p>{selectedIngredient.idealFor}</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-[#E7E2DA]">
                <div className="p-3 bg-white rounded border border-[#E7E2DA] text-xs">
                  <span className="text-[#78716C] block">Optimal Physiological pH:</span>
                  <span className="font-mono font-semibold text-[#1C1917]">
                    {selectedIngredient.phRange || 'Neutral / Unbuffered'}
                  </span>
                </div>
                <div className="p-3 bg-white rounded border border-[#E7E2DA] text-xs">
                  <span className="text-[#78716C] block">Botanical Origin & Sourcing:</span>
                  <span className="font-medium text-[#1C1917]">{selectedIngredient.source}</span>
                </div>
              </div>
            </div>

            <div className="pt-2 flex items-center gap-2 text-xs text-[#15803D] font-medium">
              <ShieldCheck className="w-4 h-4" />
              <span>Certified Non-Toxic, Non-Comedogenic & Clean Beauty Verified</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
