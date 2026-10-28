import React, { useState } from 'react';
import { Heart, Star, Plus, Check } from 'lucide-react';
import { Product } from '../types/skincare';

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
  onAddToCart: (product: Product, size: string) => void;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onSelect,
  onAddToCart,
  isWishlisted,
  onToggleWishlist,
}) => {
  const [imageError, setImageError] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product, product.sizes[0]);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1400);
  };

  const handleHeartClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleWishlist(product);
  };

  return (
    <article
      onClick={() => onSelect(product)}
      className="group relative flex flex-col bg-[#FAF8F5] border border-[#E7E2DA] rounded-lg overflow-hidden transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 cursor-pointer"
    >
      {/* Product Image Container (65-75% card height) */}
      <div className="relative aspect-4/3 sm:aspect-square w-full bg-[#F2EDE4] overflow-hidden">
        {!imageError ? (
          <img
            src={product.image}
            alt={product.name}
            width={1200}
            height={896}
            onError={() => setImageError(true)}
            loading="lazy"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-[#EAE4D9]">
            <span className="font-serif italic text-lg text-[#57534E]">{product.name}</span>
            <span className="text-xs text-[#78716C] mt-1">{product.ritualStep}</span>
          </div>
        )}

        {/* Wishlist Button */}
        <button
          onClick={handleHeartClick}
          aria-label={isWishlisted ? "Remove from wishlist" : "Save to wishlist"}
          className={`absolute top-3 right-3 p-2 rounded-full transition-all cursor-pointer backdrop-blur-xs ${
            isWishlisted
              ? 'bg-[#1C1917] text-white'
              : 'bg-white/80 text-[#57534E] hover:text-[#1C1917] hover:bg-white'
          }`}
        >
          <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-current' : ''}`} />
        </button>

        {/* Quiet Editorial Tag (Bestseller or Ritual Step) */}
        {product.isBestSeller && (
          <div className="absolute top-3 left-3 bg-[#FAF8F5]/90 backdrop-blur-xs text-[#1C1917] text-[11px] font-medium tracking-wider uppercase px-2.5 py-1 rounded-sm border border-[#E7E2DA]">
            Bestseller
          </div>
        )}

        {/* Quick Add overlay button */}
        <div className="absolute bottom-3 inset-x-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            onClick={handleQuickAdd}
            className={`w-full py-2.5 px-3 rounded text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer flex items-center justify-center gap-1.5 shadow-sm ${
              justAdded
                ? 'bg-[#15803D] text-white'
                : 'bg-[#1C1917] text-white hover:bg-[#292524]'
            }`}
          >
            {justAdded ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Added to Bag</span>
              </>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5" />
                <span>Quick Add · ${product.price}</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Product Content Details */}
      <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between gap-3">
        <div>
          {/* Zero-Pill Metadata */}
          <div className="flex items-center gap-2 text-xs text-[#78716C] tracking-wide uppercase">
            <span>{product.ritualStep}</span>
            <span aria-hidden="true">·</span>
            <span>{product.volume}</span>
            <span aria-hidden="true">·</span>
            <span className="capitalize">{product.category}</span>
          </div>

          <h3 className="text-base sm:text-lg font-serif font-medium text-[#1C1917] mt-1.5 group-hover:text-[#57534E] transition-colors leading-snug">
            {product.name}
          </h3>

          <p className="text-xs text-[#57534E] line-clamp-2 mt-1 leading-relaxed">
            {product.subtitle}
          </p>
        </div>

        <div className="pt-2 border-t border-[#E7E2DA] flex items-center justify-between">
          {/* Price with tabular numerals */}
          <div className="flex items-baseline gap-2">
            <span className="font-mono tabular-nums text-base font-semibold text-[#1C1917]">
              ${product.price}
            </span>
            {product.originalPrice && (
              <span className="font-mono tabular-nums text-xs text-[#A8A29E] line-through">
                ${product.originalPrice}
              </span>
            )}
          </div>

          {/* Rating */}
          <div className="flex items-center gap-1 text-xs text-[#57534E]">
            <Star className="w-3.5 h-3.5 fill-[#854D0E] text-[#854D0E]" />
            <span className="font-mono tabular-nums font-medium">{product.rating}</span>
            <span className="text-[#A8A29E]">({product.reviewCount})</span>
          </div>
        </div>
      </div>
    </article>
  );
};
