import React from 'react';
import { Star, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { REVIEWS } from '../data/skincareData';

export const ReviewsSection: React.FC = () => {
  return (
    <section id="reviews" className="py-16 bg-[#FAF8F5] border-b border-[#E7E2DA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#78716C]">
              <span>Independent Trials & Community Proof</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-medium text-[#1C1917] mt-1.5">
              Clinical Results You Can Feel
            </h2>
            <p className="text-sm text-[#57534E] mt-1 max-w-xl">
              Evaluated across diverse skin barrier states and phototypes. Real feedback from dermatologists and long-term ritual practitioners.
            </p>
          </div>

          {/* Quick Aggregate Score */}
          <div className="flex items-center gap-4 p-4 bg-white rounded-lg border border-[#E7E2DA] shadow-xs self-start md:self-end">
            <div className="text-3xl font-serif font-medium text-[#1C1917]">4.9</div>
            <div className="text-xs text-[#57534E]">
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-[#854D0E] text-[#854D0E]" />
                ))}
              </div>
              <div className="mt-1 text-[#78716C]">Based on 1,240+ verified trials</div>
            </div>
          </div>
        </div>

        {/* 3 Clinical Trial Proof Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="p-6 rounded-xl bg-[#F5F1EB] border border-[#E7E2DA] space-y-2">
            <div className="font-mono text-3xl font-bold text-[#1C1917]">96.4%</div>
            <div className="text-xs uppercase tracking-wider font-semibold text-[#1C1917]">
              Barrier Integrity in 14 Days
            </div>
            <p className="text-xs text-[#57534E] leading-relaxed">
              Subject corneometer assessments showed significant reduction in transepidermal water loss after twice-daily application of Whipped Barrier Cream.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-[#F5F1EB] border border-[#E7E2DA] space-y-2">
            <div className="font-mono text-3xl font-bold text-[#1C1917]">92.1%</div>
            <div className="text-xs uppercase tracking-wider font-semibold text-[#1C1917]">
              Visible Radiance & Glow
            </div>
            <p className="text-xs text-[#57534E] leading-relaxed">
              Colorimetric imaging confirmed visible lightening of post-acne erythema and sun spots using 15% stabilized ethyl ascorbic acid.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-[#F5F1EB] border border-[#E7E2DA] space-y-2">
            <div className="font-mono text-3xl font-bold text-[#1C1917]">100%</div>
            <div className="text-xs uppercase tracking-wider font-semibold text-[#1C1917]">
              Zero Irritation / Breakouts
            </div>
            <p className="text-xs text-[#57534E] leading-relaxed">
              Repeat insult patch testing (HRIPT) conducted on 60 volunteers with self-declared hyper-reactive skin yielded zero allergic reactions.
            </p>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {REVIEWS.map((rev) => (
            <div
              key={rev.id}
              className="p-6 bg-white rounded-xl border border-[#E7E2DA] flex flex-col justify-between space-y-4 shadow-xs"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-[#854D0E] text-[#854D0E]" />
                    ))}
                  </div>
                  <span className="text-[#78716C]">{rev.date}</span>
                </div>

                <h3 className="font-serif font-medium text-lg text-[#1C1917]">
                  "{rev.title}"
                </h3>

                <p className="text-xs sm:text-sm text-[#57534E] leading-relaxed">
                  {rev.comment}
                </p>
              </div>

              <div className="pt-3 border-t border-[#E7E2DA] flex items-center justify-between text-xs text-[#78716C]">
                <div>
                  <span className="font-semibold text-[#1C1917]">{rev.author}</span>
                  <span className="text-[11px] block text-[#78716C]">{rev.skinType}</span>
                </div>

                {rev.verified && (
                  <span className="flex items-center gap-1 text-[#15803D] text-[11px] font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Verified Ritualist</span>
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
