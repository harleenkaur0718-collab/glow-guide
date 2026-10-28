import React, { useState } from 'react';
import { Sun, Moon, Clock, Check, ArrowRight } from 'lucide-react';
import { ROUTINE_GUIDES } from '../data/skincareData';
import { Product } from '../types/skincare';

interface RoutineBuilderProps {
  onSelectProduct: (product: Product) => void;
  onAddRoutineToCart: (products: Product[]) => void;
}

export const RoutineBuilder: React.FC<RoutineBuilderProps> = ({
  onSelectProduct,
  onAddRoutineToCart,
}) => {
  const [activeTiming, setActiveTiming] = useState<'am' | 'pm'>('am');
  const [added, setAdded] = useState(false);

  const currentRoutine =
    activeTiming === 'am' ? ROUTINE_GUIDES[0] : ROUTINE_GUIDES[1];

  const allProductsInRoutine = currentRoutine.steps.map((s) => s.product);

  const handleAddAll = () => {
    onAddRoutineToCart(allProductsInRoutine);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <section id="routines" className="py-16 bg-[#FAF8F5] border-b border-[#E7E2DA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#78716C]">
              <span>Application Choreography</span>
              <span aria-hidden="true">·</span>
              <span>Layering Science</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-medium text-[#1C1917] mt-1.5">
              The Daily Skincare Rituals
            </h2>
            <p className="text-sm text-[#57534E] mt-1 max-w-xl">
              Skincare layering obeys molecular weight: thin watery essences first, followed by concentrated actives, dense lipid creams, and daytime mineral defense.
            </p>
          </div>

          {/* Interactive Timing Selector */}
          <div className="flex items-center p-1 bg-[#EFEAE2] rounded-lg border border-[#E7E2DA] shrink-0 self-start md:self-end">
            <button
              onClick={() => setActiveTiming('am')}
              className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-md transition-all cursor-pointer ${
                activeTiming === 'am'
                  ? 'bg-white text-[#1C1917] shadow-xs'
                  : 'text-[#78716C] hover:text-[#1C1917]'
              }`}
            >
              <Sun className="w-3.5 h-3.5 text-amber-600" />
              <span>Morning Ritual (Defense)</span>
            </button>
            <button
              onClick={() => setActiveTiming('pm')}
              className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-md transition-all cursor-pointer ${
                activeTiming === 'pm'
                  ? 'bg-white text-[#1C1917] shadow-xs'
                  : 'text-[#78716C] hover:text-[#1C1917]'
              }`}
            >
              <Moon className="w-3.5 h-3.5 text-indigo-600" />
              <span>Evening Ritual (Repair)</span>
            </button>
          </div>
        </div>

        {/* Routine Story Description */}
        <div className="p-4 rounded-lg bg-[#F5F1EB] border border-[#E7E2DA] mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-[#57534E]">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#78716C] shrink-0" />
            <span>
              <strong>{currentRoutine.name}:</strong> {currentRoutine.description}
            </span>
          </div>

          <button
            onClick={handleAddAll}
            className={`px-4 py-2 rounded text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer shrink-0 shadow-xs ${
              added
                ? 'bg-[#15803D] text-white'
                : 'bg-[#1C1917] text-white hover:bg-[#292524]'
            }`}
          >
            {added ? (
              <span className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5" /> Ritual Added to Bag
              </span>
            ) : (
              <span>Add Complete 4-Step Routine</span>
            )}
          </button>
        </div>

        {/* Step-by-Step Card Flow */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {currentRoutine.steps.map((s) => (
            <div
              key={s.step}
              onClick={() => onSelectProduct(s.product)}
              className="group bg-white rounded-lg border border-[#E7E2DA] p-5 flex flex-col justify-between hover:border-[#1C1917] transition-all duration-200 cursor-pointer shadow-xs hover:-translate-y-0.5"
            >
              <div>
                {/* Step Number Badge */}
                <div className="flex items-center justify-between text-xs text-[#78716C] pb-3 border-b border-[#E7E2DA]">
                  <span className="font-mono font-semibold text-[#1C1917]">
                    0{s.step}. {s.product.ritualStep}
                  </span>
                  <span className="text-[11px] uppercase tracking-wide">
                    {s.timing === 'am' ? 'Morning' : 'Evening'}
                  </span>
                </div>

                {/* Product Thumbnail */}
                <div className="my-4 aspect-square rounded bg-[#FAF8F5] overflow-hidden border border-[#E7E2DA]">
                  <img
                    src={s.product.image}
                    alt={s.product.name}
                    width={1200}
                    height={896}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                </div>

                <h3 className="font-serif font-medium text-base text-[#1C1917] group-hover:text-[#57534E] transition-colors">
                  {s.product.name}
                </h3>
                <p className="text-xs text-[#78716C] mt-1">{s.product.subtitle}</p>

                {/* Actionable Note */}
                <div className="mt-3 p-2.5 rounded bg-[#FAF8F5] text-[11px] text-[#57534E] leading-relaxed border border-[#E7E2DA]">
                  {s.note}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-[#E7E2DA] flex items-center justify-between text-xs">
                <span className="font-mono tabular-nums font-semibold text-[#1C1917]">
                  ${s.product.price}
                </span>
                <span className="inline-flex items-center gap-1 text-[#78716C] group-hover:text-[#1C1917] font-medium transition-colors">
                  <span>View Details</span>
                  <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
