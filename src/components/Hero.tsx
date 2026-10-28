import React from 'react';
import { ArrowRight, Sparkles, ShieldCheck } from 'lucide-react';

interface HeroProps {
  onExploreClick: () => void;
  onDiagnosticClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreClick, onDiagnosticClick }) => {
  return (
    <section className="relative bg-[#FAF8F5] border-b border-[#E7E2DA] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Editorial Brand & Narrative */}
          <div className="lg:col-span-6 space-y-6 lg:pr-4">
            <div className="flex items-center gap-2 text-xs font-medium tracking-widest uppercase text-[#78716C]">
              <span>Clinical Formulation</span>
              <span aria-hidden="true">·</span>
              <span>Organic Botanical Extracts</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-normal text-[#1C1917] tracking-tight leading-[1.12] [text-wrap:balance]">
              Pure Botanical Science for Resilient, Glowing Skin.
            </h1>

            <p className="text-base sm:text-lg text-[#57534E] leading-relaxed max-w-xl font-normal">
              Formulated with dermatologist-calibrated concentrations of bio-identical ceramides, stabilized Vitamin C, and cold-pressed botanical extracts to repair the lipid barrier and sustain natural luminance.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                onClick={onExploreClick}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#1C1917] text-[#FAF8F5] text-xs font-semibold tracking-wider uppercase rounded-md hover:bg-[#292524] transition-all cursor-pointer shadow-xs"
              >
                <span>Shop Formulations</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onDiagnosticClick}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-transparent border border-[#78716C] text-[#1C1917] text-xs font-semibold tracking-wider uppercase rounded-md hover:bg-[#EFEAE2] transition-all cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#78716C]" />
                <span>Skin Diagnostic Quiz</span>
              </button>
            </div>

            {/* Proof claim with quantitative precision */}
            <div className="pt-4 flex items-center gap-4 text-xs text-[#78716C] border-t border-[#E7E2DA]">
              <ShieldCheck className="w-4 h-4 text-[#44403C] shrink-0" />
              <span>
                <strong>96.4% Clinical Barrier Retention</strong> measured over 28-day dermatological evaluation
              </span>
            </div>
          </div>

          {/* Right Column: Hero Visual Showcase */}
          <div className="lg:col-span-6">
            <div className="relative rounded-xl overflow-hidden bg-[#EFEAE2] border border-[#E7E2DA] shadow-sm aspect-16/10 sm:aspect-16/9 lg:aspect-4/3">
              <img
                src="/src/assets/images/hero_skincare_bottles_1791971712055.jpg"
                alt="Aura Botanicals Luxury Minimalist Skincare Bottles"
                width={1376}
                height={768}
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-102"
                loading="eager"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4 text-white flex items-center justify-between text-xs tracking-wide">
                <span className="font-serif italic text-sm">The Essential Daily Ritual</span>
                <span className="bg-black/40 backdrop-blur-xs px-2.5 py-1 rounded text-[11px] font-mono">
                  Ph 5.5 Balanced
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 4-Column Full-Width Trust Marker Strip */}
        <div className="mt-14 pt-8 border-t border-[#E7E2DA] grid grid-cols-2 md:grid-cols-4 gap-6 text-[#44403C]">
          <div className="space-y-1">
            <div className="text-xs uppercase tracking-wider font-semibold text-[#1C1917]">Dermatologist Verified</div>
            <div className="text-xs text-[#78716C]">Hypoallergenic & non-comedogenic testing on sensitive skin</div>
          </div>
          <div className="space-y-1">
            <div className="text-xs uppercase tracking-wider font-semibold text-[#1C1917]">Clean & Sustainable</div>
            <div className="text-xs text-[#78716C]">100% Leaping Bunny certified cruelty-free and vegan</div>
          </div>
          <div className="space-y-1">
            <div className="text-xs uppercase tracking-wider font-semibold text-[#1C1917]">Full Transparency</div>
            <div className="text-xs text-[#78716C]">Zero synthetic fragrance, parabens, sulfates, or phthalates</div>
          </div>
          <div className="space-y-1">
            <div className="text-xs uppercase tracking-wider font-semibold text-[#1C1917]">Eco-Conscious Packaging</div>
            <div className="text-xs text-[#78716C]">Recyclable amber glass and post-consumer recycled aluminum</div>
          </div>
        </div>
      </div>
    </section>
  );
};
