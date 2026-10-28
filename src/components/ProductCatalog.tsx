import React, { useState, useMemo } from 'react';
import { SlidersHorizontal, Sparkles } from 'lucide-react';
import { Product, ProductCategory, SkinConcern, SkinType } from '../types/skincare';
import { ProductCard } from './ProductCard';

interface ProductCatalogProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product, size: string) => void;
  wishlistIds: string[];
  onToggleWishlist: (product: Product) => void;
  searchQuery: string;
}

export const ProductCatalog: React.FC<ProductCatalogProps> = ({
  products,
  onSelectProduct,
  onAddToCart,
  wishlistIds,
  onToggleWishlist,
  searchQuery,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('all');
  const [selectedConcern, setSelectedConcern] = useState<SkinConcern | 'all'>('all');
  const [selectedSkinType, setSelectedSkinType] = useState<SkinType>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  const [showFilters, setShowFilters] = useState(false);

  // Filter & sort logic
  const filteredProducts = useMemo(() => {
    return products.filter((prod) => {
      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = prod.name.toLowerCase().includes(query);
        const matchesSubtitle = prod.subtitle.toLowerCase().includes(query);
        const matchesActive = prod.keyActives.some((a) => a.toLowerCase().includes(query));
        const matchesCategory = prod.category.toLowerCase().includes(query);
        if (!matchesName && !matchesSubtitle && !matchesActive && !matchesCategory) {
          return false;
        }
      }

      // Category
      if (selectedCategory !== 'all' && prod.category !== selectedCategory) {
        return false;
      }

      // Concern
      if (selectedConcern !== 'all' && !prod.concerns.includes(selectedConcern)) {
        return false;
      }

      // Skin Type
      if (selectedSkinType !== 'all' && !prod.skinTypes.includes(selectedSkinType) && !prod.skinTypes.includes('all')) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      // Default: featured (bestseller first)
      return (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0);
    });
  }, [products, searchQuery, selectedCategory, selectedConcern, selectedSkinType, sortBy]);

  const categories: { id: ProductCategory; label: string }[] = [
    { id: 'all', label: 'All Formulas' },
    { id: 'serums', label: 'Active Serums' },
    { id: 'moisturizers', label: 'Barrier Creams' },
    { id: 'cleansers', label: 'Cleansers' },
    { id: 'sunscreen', label: 'Mineral SPF 50+' },
    { id: 'treatments', label: 'Targeted Treatments' },
  ];

  return (
    <section id="catalog" className="py-16 bg-[#FAF8F5] border-b border-[#E7E2DA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#78716C]">
              <span>Curated Apothecary</span>
              <span aria-hidden="true">·</span>
              <span>Clinical Potency</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-medium text-[#1C1917] mt-1.5">
              Targeted Botanical Formulas
            </h2>
            <p className="text-sm text-[#57534E] mt-1 max-w-xl">
              Engineered with clean lipid carriers and clinically validated bio-actives to soothe, defend, and rejuvenate without disruption.
            </p>
          </div>

          <div className="flex items-center gap-3 self-start md:self-end">
            {/* Filter Toggle Mobile/Desktop */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-3.5 py-2 text-xs font-medium rounded-md border transition-all cursor-pointer ${
                showFilters || selectedConcern !== 'all' || selectedSkinType !== 'all'
                  ? 'bg-[#1C1917] text-white border-[#1C1917]'
                  : 'bg-white text-[#44403C] border-[#D6D0C7] hover:border-[#1C1917]'
              }`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Filter Concerns</span>
            </button>

            {/* Sort Dropdown */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3 py-2 text-xs font-medium bg-white border border-[#D6D0C7] rounded-md text-[#44403C] focus:outline-none focus:border-[#1C1917] cursor-pointer"
            >
              <option value="featured">Sort by: Curated Bestsellers</option>
              <option value="rating">Sort by: Highest Rated</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Category Filter Tabs (Interactive Segmented Control Buttons) */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-4 no-scrollbar border-b border-[#E7E2DA]">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 text-xs font-medium rounded-md transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-[#1C1917] text-white shadow-xs'
                  : 'bg-[#F5F1EB] text-[#57534E] hover:text-[#1C1917] hover:bg-[#EAE4D9]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Secondary Filter Drawer / Panel */}
        {showFilters && (
          <div className="mt-4 p-5 bg-[#F5F1EB] border border-[#E7E2DA] rounded-lg grid grid-cols-1 sm:grid-cols-2 gap-6 animate-in fade-in duration-200">
            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-[#1C1917] mb-2">
                Primary Skin Concern
              </label>
              <div className="flex flex-wrap gap-1.5">
                {[
                  { id: 'all', label: 'All Concerns' },
                  { id: 'barrier', label: 'Barrier Repair' },
                  { id: 'radiance', label: 'Radiance & Dark Spots' },
                  { id: 'hydration', label: 'Hydration Plumping' },
                  { id: 'texture', label: 'Texture Smoothing' },
                  { id: 'blemishes', label: 'Blemish Control' },
                ].map((concern) => (
                  <button
                    key={concern.id}
                    onClick={() => setSelectedConcern(concern.id as any)}
                    className={`px-3 py-1.5 text-xs rounded transition-colors cursor-pointer ${
                      selectedConcern === concern.id
                        ? 'bg-[#1C1917] text-white'
                        : 'bg-white text-[#57534E] hover:bg-[#E7E2DA]'
                    }`}
                  >
                    {concern.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-[#1C1917] mb-2">
                Target Skin Type
              </label>
              <div className="flex flex-wrap gap-1.5">
                {[
                  { id: 'all', label: 'All Types' },
                  { id: 'sensitive', label: 'Sensitive' },
                  { id: 'dry', label: 'Dry' },
                  { id: 'oily', label: 'Oily' },
                  { id: 'combination', label: 'Combination' },
                ].map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setSelectedSkinType(type.id as any)}
                    className={`px-3 py-1.5 text-xs rounded transition-colors cursor-pointer ${
                      selectedSkinType === type.id
                        ? 'bg-[#1C1917] text-white'
                        : 'bg-white text-[#57534E] hover:bg-[#E7E2DA]'
                    }`}
                  >
                    {type.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Results metadata & active query count */}
        <div className="mt-6 flex items-center justify-between text-xs text-[#78716C]">
          <div>
            Showing <strong className="text-[#1C1917] font-mono">{filteredProducts.length}</strong> formulas
            {searchQuery && (
              <span> matching "<strong className="text-[#1C1917]">{searchQuery}</strong>"</span>
            )}
          </div>
          {(selectedCategory !== 'all' || selectedConcern !== 'all' || selectedSkinType !== 'all' || searchQuery) && (
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSelectedConcern('all');
                setSelectedSkinType('all');
              }}
              className="text-xs text-[#78716C] hover:text-[#1C1917] underline cursor-pointer"
            >
              Reset all filters
            </button>
          )}
        </div>

        {/* 3-Column Product Grid with generous whitespace (gap-6 to gap-8) */}
        {filteredProducts.length > 0 ? (
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onSelect={onSelectProduct}
                onAddToCart={(prod, size) => onAddToCart(prod, size)}
                isWishlisted={wishlistIds.includes(product.id)}
                onToggleWishlist={onToggleWishlist}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-xl border border-[#E7E2DA] mt-8 p-8 space-y-3">
            <Sparkles className="w-6 h-6 text-[#78716C] mx-auto" />
            <h3 className="font-serif text-xl text-[#1C1917]">No matching formulas found</h3>
            <p className="text-xs text-[#57534E] max-w-sm mx-auto">
              Try adjusting your skin concern filters or search query to view our complete clean apothecary catalog.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSelectedConcern('all');
                setSelectedSkinType('all');
              }}
              className="px-4 py-2 bg-[#1C1917] text-white text-xs font-semibold uppercase tracking-wider rounded-md cursor-pointer"
            >
              View All Formulas
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
