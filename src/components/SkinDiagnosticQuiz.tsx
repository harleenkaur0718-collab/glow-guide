import React, { useState } from 'react';
import { Sparkles, Check, ArrowRight, RotateCcw, ShieldCheck, ShoppingBag } from 'lucide-react';
import { PRODUCTS } from '../data/skincareData';
import { Product } from '../types/skincare';

interface SkinDiagnosticQuizProps {
  onAddPrescriptionToCart: (products: Product[]) => void;
  onSelectProduct: (product: Product) => void;
}

export const SkinDiagnosticQuiz: React.FC<SkinDiagnosticQuizProps> = ({
  onAddPrescriptionToCart,
  onSelectProduct,
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [skinType, setSkinType] = useState<string>('dry');
  const [primaryGoal, setPrimaryGoal] = useState<string>('barrier');
  const [climate, setClimate] = useState<string>('dry-indoor');
  const [sensitivity, setSensitivity] = useState<string>('moderate');
  const [isCompleted, setIsCompleted] = useState(false);
  const [bundleAdded, setBundleAdded] = useState(false);

  // Recommendations logic
  const getPrescription = () => {
    let prescribed: Product[] = [];

    // Always include Gentle Cleanser & Mineral SPF
    prescribed.push(PRODUCTS[2]); // Cleanser

    if (primaryGoal === 'barrier' || skinType === 'dry' || skinType === 'sensitive') {
      prescribed.push(PRODUCTS[1]); // Barrier Cream
      prescribed.push(PRODUCTS[5]); // Centella Mist
      prescribed.push(PRODUCTS[3]); // Mineral SPF 50
    } else if (primaryGoal === 'radiance') {
      prescribed.push(PRODUCTS[0]); // Glow Serum
      prescribed.push(PRODUCTS[1]); // Barrier Cream
      prescribed.push(PRODUCTS[3]); // Mineral SPF 50
    } else if (primaryGoal === 'blemishes' || skinType === 'oily') {
      prescribed.push(PRODUCTS[4]); // AHA/BHA Elixir
      prescribed.push(PRODUCTS[1]); // Barrier Cream
      prescribed.push(PRODUCTS[3]); // SPF
    } else {
      prescribed.push(PRODUCTS[0]); // Glow Serum
      prescribed.push(PRODUCTS[1]); // Barrier Cream
      prescribed.push(PRODUCTS[3]); // SPF
    }

    // Deduplicate
    const unique = Array.from(new Set(prescribed.map((p) => p.id))).map((id) =>
      prescribed.find((p) => p.id === id)!
    );
    return unique;
  };

  const handleFinish = () => {
    setIsCompleted(true);
  };

  const handleReset = () => {
    setCurrentStep(1);
    setIsCompleted(false);
    setBundleAdded(false);
  };

  const prescribedProducts = getPrescription();
  const rawTotal = prescribedProducts.reduce((acc, p) => acc + p.price, 0);
  const bundleDiscounted = Math.round(rawTotal * 0.85); // 15% ritual discount

  const handleAddBundle = () => {
    onAddPrescriptionToCart(prescribedProducts);
    setBundleAdded(true);
    setTimeout(() => setBundleAdded(false), 2000);
  };

  return (
    <section id="diagnostic" className="py-16 bg-[#F5F1EB] border-b border-[#E7E2DA]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#78716C]">
            <Sparkles className="w-3.5 h-3.5 text-[#854D0E]" />
            <span>Barrier Diagnostic Engine</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-medium text-[#1C1917]">
            Find Your Exact Botanical Prescription
          </h2>
          <p className="text-sm text-[#57534E]">
            Answer 4 clinical questions to discover which cold-pressed actives and lipid ratios will restore your skin barrier balance.
          </p>
        </div>

        {/* Diagnostic Container */}
        <div className="bg-[#FAF8F5] border border-[#E7E2DA] rounded-xl p-6 sm:p-10 shadow-xs">
          {!isCompleted ? (
            <div>
              {/* Stepper Indicator */}
              <div className="flex items-center justify-between pb-6 mb-8 border-b border-[#E7E2DA] text-xs">
                <span className="font-semibold text-[#1C1917] uppercase tracking-wider">
                  Diagnostic Step {currentStep} of 4
                </span>
                <span className="text-[#78716C] font-mono">
                  {Math.round((currentStep / 4) * 100)}% Complete
                </span>
              </div>

              {/* Step 1: Skin Type */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <h3 className="text-xl font-serif text-[#1C1917]">
                    1. How does your skin typically feel 2 hours after cleansing?
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      { id: 'dry', label: 'Tight, flaky, or visibly dehydrated', sub: 'Low natural sebum production' },
                      { id: 'oily', label: 'Shiny all over, enlarged pores', sub: 'Active sebaceous glands' },
                      { id: 'combination', label: 'Oily T-zone (forehead, nose), dry cheeks', sub: 'Mixed lipid distribution' },
                      { id: 'sensitive', label: 'Prone to redness, stinging, or heat', sub: 'Reactive stratum corneum' },
                      { id: 'normal', label: 'Comfortable, balanced, neither dry nor oily', sub: 'Optimal lipid harmony' },
                    ].map((item) => (
                      <button
                        key={item.id}
                        onClick={() => setSkinType(item.id)}
                        className={`p-4 rounded-lg text-left border transition-all cursor-pointer ${
                          skinType === item.id
                            ? 'bg-[#1C1917] text-[#FAF8F5] border-[#1C1917]'
                            : 'bg-white text-[#1C1917] border-[#D6D0C7] hover:border-[#1C1917]'
                        }`}
                      >
                        <div className="font-medium text-sm">{item.label}</div>
                        <div className={`text-xs mt-1 ${skinType === item.id ? 'text-[#D6D0C7]' : 'text-[#78716C]'}`}>
                          {item.sub}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 2: Primary Goal */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <h3 className="text-xl font-serif text-[#1C1917]">
                    2. What is your paramount skin priority right now?
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      { id: 'barrier', label: 'Strengthen Lipid Barrier & Calm Redness', sub: 'Soothe sensitivity and stop moisture loss' },
                      { id: 'radiance', label: 'Brighten Dark Spots & Radiance Glow', sub: 'Target hyperpigmentation & oxidative dullness' },
                      { id: 'blemishes', label: 'Clear Pores & Refine Skin Texture', sub: 'Gentle chemical exfoliation & decongestion' },
                      { id: 'hydration', label: 'Plump Deep Dehydration & Fine Lines', sub: 'Multi-depth molecular water retention' },
                    ].map((item) => (
                      <button
                        key={item.id}
                        onClick={() => setPrimaryGoal(item.id)}
                        className={`p-4 rounded-lg text-left border transition-all cursor-pointer ${
                          primaryGoal === item.id
                            ? 'bg-[#1C1917] text-[#FAF8F5] border-[#1C1917]'
                            : 'bg-white text-[#1C1917] border-[#D6D0C7] hover:border-[#1C1917]'
                        }`}
                      >
                        <div className="font-medium text-sm">{item.label}</div>
                        <div className={`text-xs mt-1 ${primaryGoal === item.id ? 'text-[#D6D0C7]' : 'text-[#78716C]'}`}>
                          {item.sub}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 3: Climate & Environment */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <h3 className="text-xl font-serif text-[#1C1917]">
                    3. What environmental conditions does your skin encounter daily?
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      { id: 'dry-indoor', label: 'Air-Conditioned or Heated Indoor Spaces', sub: 'High transepidermal evaporation' },
                      { id: 'high-uv', label: 'Intense Sun Exposure & Outdoor Activity', sub: 'Requires robust non-nano photoprotection' },
                      { id: 'humid', label: 'Warm, Humid, or Tropical Climate', sub: 'Needs non-greasy breathable formulas' },
                      { id: 'urban-pollution', label: 'Urban City Center with Smog & Dust', sub: 'Requires high antioxidant neutralizing defense' },
                    ].map((item) => (
                      <button
                        key={item.id}
                        onClick={() => setClimate(item.id)}
                        className={`p-4 rounded-lg text-left border transition-all cursor-pointer ${
                          climate === item.id
                            ? 'bg-[#1C1917] text-[#FAF8F5] border-[#1C1917]'
                            : 'bg-white text-[#1C1917] border-[#D6D0C7] hover:border-[#1C1917]'
                        }`}
                      >
                        <div className="font-medium text-sm">{item.label}</div>
                        <div className={`text-xs mt-1 ${climate === item.id ? 'text-[#D6D0C7]' : 'text-[#78716C]'}`}>
                          {item.sub}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 4: Sensitivity Level */}
              {currentStep === 4 && (
                <div className="space-y-6">
                  <h3 className="text-xl font-serif text-[#1C1917]">
                    4. How easily does your skin react to active skincare ingredients?
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      { id: 'tolerant', label: 'Resilient / Rarely Irritated', sub: 'Can handle potent concentrations with ease' },
                      { id: 'moderate', label: 'Occasional Flushes or Mild Tingles', sub: 'Prefers buffered, stabilized actives' },
                      { id: 'extreme', label: 'Extremely Sensitive / Prone to Eczema', sub: 'Requires hypoallergenic, fragrance-free Cica & ceramides' },
                    ].map((item) => (
                      <button
                        key={item.id}
                        onClick={() => setSensitivity(item.id)}
                        className={`p-4 rounded-lg text-left border transition-all cursor-pointer ${
                          sensitivity === item.id
                            ? 'bg-[#1C1917] text-[#FAF8F5] border-[#1C1917]'
                            : 'bg-white text-[#1C1917] border-[#D6D0C7] hover:border-[#1C1917]'
                        }`}
                      >
                        <div className="font-medium text-sm">{item.label}</div>
                        <div className={`text-xs mt-1 ${sensitivity === item.id ? 'text-[#D6D0C7]' : 'text-[#78716C]'}`}>
                          {item.sub}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Stepper Actions */}
              <div className="mt-8 pt-6 border-t border-[#E7E2DA] flex items-center justify-between">
                {currentStep > 1 ? (
                  <button
                    onClick={() => setCurrentStep(currentStep - 1)}
                    className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#57534E] hover:text-[#1C1917] cursor-pointer"
                  >
                    Back
                  </button>
                ) : (
                  <div />
                )}

                {currentStep < 4 ? (
                  <button
                    onClick={() => setCurrentStep(currentStep + 1)}
                    className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#1C1917] text-white text-xs font-semibold uppercase tracking-wider rounded-md hover:bg-[#292524] cursor-pointer"
                  >
                    <span>Next Question</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    onClick={handleFinish}
                    className="inline-flex items-center gap-2 px-7 py-2.5 bg-[#1C1917] text-white text-xs font-semibold uppercase tracking-wider rounded-md hover:bg-[#292524] cursor-pointer shadow-xs"
                  >
                    <span>Generate Prescription</span>
                    <Sparkles className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          ) : (
            /* Result Screen */
            <div className="space-y-8 animate-in fade-in duration-300">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E7E2DA]">
                <div>
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#15803D]">
                    <ShieldCheck className="w-4 h-4" />
                    <span>Prescription Formulated</span>
                  </div>
                  <h3 className="text-2xl font-serif text-[#1C1917] mt-1">
                    Your Tailored 3-Step Barrier Ritual
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-[#78716C] mt-1">
                    <span className="capitalize">{skinType} Skin</span>
                    <span aria-hidden="true">·</span>
                    <span className="capitalize">Focus: {primaryGoal}</span>
                    <span aria-hidden="true">·</span>
                    <span className="capitalize">Sensitivity: {sensitivity}</span>
                  </div>
                </div>

                <button
                  onClick={handleReset}
                  className="inline-flex items-center gap-1.5 text-xs text-[#78716C] hover:text-[#1C1917] cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Retake Quiz</span>
                </button>
              </div>

              {/* Recommended Product Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {prescribedProducts.map((prod, idx) => (
                  <div
                    key={prod.id}
                    onClick={() => onSelectProduct(prod)}
                    className="p-4 bg-white rounded-lg border border-[#E7E2DA] flex flex-col justify-between hover:border-[#1C1917] cursor-pointer transition-colors"
                  >
                    <div>
                      <div className="aspect-square rounded overflow-hidden bg-[#F2EDE4] mb-3">
                        <img
                          src={prod.image}
                          alt={prod.name}
                          width={1200}
                          height={896}
                          loading="lazy"
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div className="text-[11px] uppercase tracking-wider text-[#78716C]">
                        Step 0{idx + 1}: {prod.ritualStep}
                      </div>
                      <div className="text-sm font-serif font-medium text-[#1C1917] mt-0.5 line-clamp-1">
                        {prod.name}
                      </div>
                      <p className="text-xs text-[#57534E] line-clamp-2 mt-1">
                        {prod.subtitle}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-[#E7E2DA] flex items-center justify-between">
                      <span className="font-mono tabular-nums text-sm font-semibold text-[#1C1917]">
                        ${prod.price}
                      </span>
                      <span className="text-xs text-[#78716C] hover:text-[#1C1917] underline">
                        View Formula
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Bundle Purchase Module with 15% discount */}
              <div className="p-6 rounded-xl bg-[#EFEAE2] border border-[#E7E2DA] flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-[#854D0E]">
                    Bundle Prescription & Save 15%
                  </div>
                  <div className="text-lg font-serif font-medium text-[#1C1917] mt-1">
                    Complete Daily Barrier Regimen ({prescribedProducts.length} Full Sizes)
                  </div>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="font-mono tabular-nums text-xl font-bold text-[#1C1917]">
                      ${bundleDiscounted}
                    </span>
                    <span className="font-mono tabular-nums text-xs text-[#78716C] line-through">
                      ${rawTotal}
                    </span>
                    <span className="text-xs text-[#15803D] font-medium ml-1">
                      Save ${(rawTotal - bundleDiscounted)} · Free Carbon-Neutral Shipping
                    </span>
                  </div>
                </div>

                <button
                  onClick={handleAddBundle}
                  className={`px-6 py-3 rounded-md text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-2 shadow-xs shrink-0 ${
                    bundleAdded
                      ? 'bg-[#15803D] text-white'
                      : 'bg-[#1C1917] text-white hover:bg-[#292524]'
                  }`}
                >
                  {bundleAdded ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Ritual Added to Bag</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>Add Complete Ritual</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
