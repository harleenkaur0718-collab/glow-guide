import React, { useState } from 'react';
import { X, Star, Heart, Check, Shield, Droplets, Leaf, Sparkles, ChevronRight } from 'lucide-react';
import { Product } from '../types/skincare';
import { REVIEWS } from '../data/skincareData';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, size: string, quantity: number) => void;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
  isWishlisted,
  onToggleWishlist,
}) => {
  if (!product) return null;

  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'benefits' | 'ingredients' | 'usage' | 'reviews'>('benefits');
  const [addedAnimation, setAddedAnimation] = useState(false);

  const handleAdd = () => {
    onAddToCart(product, selectedSize, quantity);
    setAddedAnimation(true);
    setTimeout(() => {
      setAddedAnimation(false);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-4xl bg-[#FAF8F5] border border-[#E7E2DA] rounded-xl shadow-2xl overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close product view"
          className="absolute top-4 right-4 z-20 p-2 text-[#78716C] hover:text-[#1C1917] bg-white/80 rounded-full backdrop-blur-xs transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 max-h-[85vh] overflow-y-auto">
          {/* Left Column: Product Photography & Ritual Visual */}
          <div className="md:col-span-5 bg-[#F2EDE4] p-6 flex flex-col justify-between border-b md:border-b-0 md:border-r border-[#E7E2DA]">
            <div className="relative aspect-square w-full rounded-lg overflow-hidden bg-white shadow-xs">
              <img
                src={product.image}
                alt={product.name}
                width={1200}
                height={896}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-3 left-3 bg-[#FAF8F5]/90 text-[11px] font-mono tracking-wide px-2.5 py-1 rounded text-[#1C1917] border border-[#E7E2DA]">
                Step: {product.ritualStep}
              </div>
            </div>

            {/* Clinical Evidence Box */}
            {product.clinicalResult && (
              <div className="mt-6 p-4 rounded-lg bg-[#FAF8F5] border border-[#E7E2DA] space-y-1.5">
                <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#1C1917]">
                  <Sparkles className="w-3.5 h-3.5 text-[#854D0E]" />
                  <span>Clinical Trial Result</span>
                </div>
                <p className="text-xs text-[#57534E] leading-relaxed">
                  {product.clinicalResult}
                </p>
              </div>
            )}

            {/* Formulation Safety Badges */}
            <div className="mt-6 grid grid-cols-3 gap-2 text-center text-[11px] text-[#78716C]">
              <div className="p-2 rounded bg-[#FAF8F5] border border-[#E7E2DA] flex flex-col items-center gap-1">
                <Shield className="w-3.5 h-3.5 text-[#1C1917]" />
                <span>Barrier Safe</span>
              </div>
              <div className="p-2 rounded bg-[#FAF8F5] border border-[#E7E2DA] flex flex-col items-center gap-1">
                <Leaf className="w-3.5 h-3.5 text-[#1C1917]" />
                <span>100% Vegan</span>
              </div>
              <div className="p-2 rounded bg-[#FAF8F5] border border-[#E7E2DA] flex flex-col items-center gap-1">
                <Droplets className="w-3.5 h-3.5 text-[#1C1917]" />
                <span>pH Balanced</span>
              </div>
            </div>
          </div>

          {/* Right Column: Contiguous Purchase Module & Details */}
          <div className="md:col-span-7 p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div>
              {/* Category & Status */}
              <div className="flex items-center justify-between text-xs text-[#78716C] tracking-wide uppercase">
                <div className="flex items-center gap-2">
                  <span>{product.category}</span>
                  <span aria-hidden="true">·</span>
                  <span>{product.volume}</span>
                </div>
                <span className="text-[#15803D] font-medium flex items-center gap-1">
                  <Check className="w-3 h-3" /> In Stock & Freshly Bottled
                </span>
              </div>

              {/* Title & Subtitle */}
              <h2 className="text-2xl sm:text-3xl font-serif font-medium text-[#1C1917] mt-2">
                {product.name}
              </h2>
              <p className="text-xs sm:text-sm text-[#57534E] mt-1 font-normal">
                {product.subtitle}
              </p>

              {/* Rating */}
              <div className="flex items-center gap-3 mt-3">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3.5 h-3.5 ${
                        i < Math.floor(product.rating)
                          ? 'fill-[#854D0E] text-[#854D0E]'
                          : 'text-[#D6D0C7]'
                      }`}
                    />
                  ))}
                  <span className="font-mono tabular-nums text-xs font-semibold ml-1 text-[#1C1917]">
                    {product.rating}
                  </span>
                </div>
                <span className="text-xs text-[#78716C]">
                  ({product.reviewCount} verified clinical reviews)
                </span>
              </div>

              {/* Price */}
              <div className="mt-4 flex items-baseline gap-3">
                <span className="font-mono tabular-nums text-2xl font-bold text-[#1C1917]">
                  ${product.price}
                </span>
                {product.originalPrice && (
                  <span className="font-mono tabular-nums text-sm text-[#A8A29E] line-through">
                    ${product.originalPrice}
                  </span>
                )}
                <span className="text-xs text-[#78716C]">
                  Taxes calculated at checkout · Free delivery over $50
                </span>
              </div>

              {/* Size Selector */}
              <div className="mt-6">
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#44403C] mb-2">
                  Select Size / Format
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-3 py-2 text-xs font-medium rounded-md border transition-all cursor-pointer ${
                        selectedSize === size
                          ? 'bg-[#1C1917] text-white border-[#1C1917] shadow-xs'
                          : 'bg-white text-[#44403C] border-[#D6D0C7] hover:border-[#1C1917]'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity Stepper & Add to Bag Contiguous Module */}
              <div className="mt-6 pt-6 border-t border-[#E7E2DA] flex items-center gap-3">
                <div className="flex items-center border border-[#D6D0C7] rounded-md bg-white">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    aria-label="Decrease quantity"
                    className="px-3 py-2.5 text-sm text-[#57534E] hover:text-[#1C1917] hover:bg-[#FAF8F5] rounded-l-md cursor-pointer transition-colors"
                  >
                    -
                  </button>
                  <span className="px-3 py-2.5 font-mono tabular-nums text-xs font-semibold text-[#1C1917] min-w-8 text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    aria-label="Increase quantity"
                    className="px-3 py-2.5 text-sm text-[#57534E] hover:text-[#1C1917] hover:bg-[#FAF8F5] rounded-r-md cursor-pointer transition-colors"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={handleAdd}
                  className={`flex-1 py-3 px-6 rounded-md text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-2 shadow-xs ${
                    addedAnimation
                      ? 'bg-[#15803D] text-white'
                      : 'bg-[#1C1917] text-white hover:bg-[#292524]'
                  }`}
                >
                  {addedAnimation ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Added to Your Bag</span>
                    </>
                  ) : (
                    <>
                      <span>Add to Bag</span>
                      <span aria-hidden="true">·</span>
                      <span className="font-mono tabular-nums">${product.price * quantity}</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => onToggleWishlist(product)}
                  aria-label="Toggle wishlist"
                  className={`p-3 rounded-md border transition-all cursor-pointer ${
                    isWishlisted
                      ? 'bg-[#1C1917] text-white border-[#1C1917]'
                      : 'bg-white text-[#57534E] border-[#D6D0C7] hover:border-[#1C1917]'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
                </button>
              </div>

              {/* Tabs for Details */}
              <div className="mt-8">
                <div className="flex border-b border-[#E7E2DA] gap-6 text-xs font-medium uppercase tracking-wider text-[#78716C]">
                  <button
                    onClick={() => setActiveTab('benefits')}
                    className={`pb-2.5 transition-colors cursor-pointer border-b-2 -mb-px ${
                      activeTab === 'benefits'
                        ? 'border-[#1C1917] text-[#1C1917] font-semibold'
                        : 'border-transparent hover:text-[#1C1917]'
                    }`}
                  >
                    Benefits & Actives
                  </button>
                  <button
                    onClick={() => setActiveTab('usage')}
                    className={`pb-2.5 transition-colors cursor-pointer border-b-2 -mb-px ${
                      activeTab === 'usage'
                        ? 'border-[#1C1917] text-[#1C1917] font-semibold'
                        : 'border-transparent hover:text-[#1C1917]'
                    }`}
                  >
                    How To Ritual
                  </button>
                  <button
                    onClick={() => setActiveTab('ingredients')}
                    className={`pb-2.5 transition-colors cursor-pointer border-b-2 -mb-px ${
                      activeTab === 'ingredients'
                        ? 'border-[#1C1917] text-[#1C1917] font-semibold'
                        : 'border-transparent hover:text-[#1C1917]'
                    }`}
                  >
                    Full Ingredients
                  </button>
                  <button
                    onClick={() => setActiveTab('reviews')}
                    className={`pb-2.5 transition-colors cursor-pointer border-b-2 -mb-px ${
                      activeTab === 'reviews'
                        ? 'border-[#1C1917] text-[#1C1917] font-semibold'
                        : 'border-transparent hover:text-[#1C1917]'
                    }`}
                  >
                    Reviews ({product.reviewCount})
                  </button>
                </div>

                <div className="pt-4 text-xs text-[#57534E] leading-relaxed">
                  {activeTab === 'benefits' && (
                    <div className="space-y-3">
                      <p>{product.description}</p>
                      <div className="pt-2">
                        <span className="font-semibold text-[#1C1917] block mb-1 uppercase tracking-wide text-[11px]">
                          Key Active Ingredients:
                        </span>
                        <ul className="space-y-1.5 list-disc list-inside">
                          {product.keyActives.map((active, i) => (
                            <li key={i} className="text-[#44403C]">
                              <strong className="text-[#1C1917]">{active}</strong>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}

                  {activeTab === 'usage' && (
                    <div className="space-y-3">
                      <p>{product.howToUse}</p>
                      <div className="p-3 bg-white rounded border border-[#E7E2DA] text-[11px] space-y-1">
                        <span className="font-semibold text-[#1C1917] uppercase tracking-wide">
                          Recommended Application Order:
                        </span>
                        <p className="text-[#78716C]">
                          Cleanse → Tone / Mist → <strong>{product.name} ({product.ritualStep})</strong> → Moisturize → Mineral SPF 50+
                        </p>
                      </div>
                    </div>
                  )}

                  {activeTab === 'ingredients' && (
                    <div className="space-y-2">
                      <p className="font-mono text-[11px] leading-relaxed bg-white p-3 rounded border border-[#E7E2DA]">
                        {product.fullIngredients}
                      </p>
                      <p className="text-[11px] text-[#78716C] italic">
                        Formulated without parabens, sulfates, synthetic dyes, artificial fragrances, silicones, drying alcohols, or petroleum derivatives.
                      </p>
                    </div>
                  )}

                  {activeTab === 'reviews' && (
                    <div className="space-y-3 max-h-48 overflow-y-auto pr-1">
                      {REVIEWS.map((rev) => (
                        <div key={rev.id} className="p-3 bg-white rounded border border-[#E7E2DA] space-y-1">
                          <div className="flex items-center justify-between text-[11px]">
                            <span className="font-semibold text-[#1C1917]">{rev.author}</span>
                            <span className="text-[#78716C]">{rev.date}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            {[...Array(rev.rating)].map((_, i) => (
                              <Star key={i} className="w-3 h-3 fill-[#854D0E] text-[#854D0E]" />
                            ))}
                            <span className="text-[10px] text-[#78716C] ml-1">· {rev.skinType}</span>
                          </div>
                          <p className="text-[11px] font-medium text-[#1C1917]">{rev.title}</p>
                          <p className="text-[11px] text-[#57534E]">{rev.comment}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
