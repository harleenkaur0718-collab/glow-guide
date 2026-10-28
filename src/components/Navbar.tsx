import React, { useState } from 'react';
import { ShoppingBag, Heart, Search, X, Menu } from 'lucide-react';

interface NavbarProps {
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onNavigate: (sectionId: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  onNavigate,
  searchQuery,
  onSearchChange,
}) => {
  const [showBanner, setShowBanner] = useState(true);
  const [showSearchInput, setShowSearchInput] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <div className="sticky top-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#E7E2DA] transition-all">
      {/* Promotional Surface Governance: At most one slim dismissible banner <= 40px */}
      {showBanner && (
        <div className="h-9 bg-[#292524] text-[#FAF8F5] px-4 flex items-center justify-between text-xs font-normal tracking-wide">
          <div className="mx-auto flex items-center gap-3">
            <span>Complimentary carbon-neutral shipping on orders over $50</span>
            <span aria-hidden="true" className="text-[#A8A29E]">·</span>
            <span className="hidden sm:inline">Use code <strong className="font-semibold text-amber-200">GLOW15</strong> for 15% off your first ritual</span>
          </div>
          <button
            onClick={() => setShowBanner(false)}
            aria-label="Dismiss banner"
            className="text-[#A8A29E] hover:text-white transition-colors cursor-pointer shrink-0"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Top Bar Contract: 3 zones separated by gap-8 */}
      <header className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-8">
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={() => handleNavClick('hero')}
          className="text-xl sm:text-2xl font-serif tracking-widest uppercase font-medium text-[#1C1917] hover:opacity-80 transition-opacity whitespace-nowrap shrink-0 text-left cursor-pointer"
        >
          Aura Botanicals
        </button>

        {/* Zone 2: 4-5 clean single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-[#44403C]">
          <button
            onClick={() => handleNavClick('catalog')}
            className="hover:text-[#1C1917] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Formulas
          </button>
          <button
            onClick={() => handleNavClick('routines')}
            className="hover:text-[#1C1917] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Rituals & Routines
          </button>
          <button
            onClick={() => handleNavClick('diagnostic')}
            className="hover:text-[#1C1917] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Skin Diagnostic
          </button>
          <button
            onClick={() => handleNavClick('ingredients')}
            className="hover:text-[#1C1917] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Active Science
          </button>
          <button
            onClick={() => handleNavClick('reviews')}
            className="hover:text-[#1C1917] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Clinical Proof
          </button>
        </nav>

        {/* Zone 3: 1 primary action cluster */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Search Toggle / Input */}
          <div className="relative flex items-center">
            {showSearchInput ? (
              <div className="flex items-center bg-white border border-[#D6D0C7] rounded-md px-2.5 py-1.5 shadow-xs">
                <Search className="w-3.5 h-3.5 text-[#78716C] mr-2 shrink-0" />
                <input
                  type="text"
                  placeholder="Search formulas or actives..."
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  autoFocus
                  className="w-36 sm:w-52 text-xs text-[#1C1917] bg-transparent focus:outline-none placeholder:text-[#A8A29E]"
                />
                <button
                  onClick={() => {
                    setShowSearchInput(false);
                    onSearchChange('');
                  }}
                  className="text-[#78716C] hover:text-[#1C1917] ml-1.5 cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowSearchInput(true)}
                aria-label="Search products"
                className="p-2 text-[#44403C] hover:text-[#1C1917] transition-colors cursor-pointer rounded-md hover:bg-[#EFEAE2]"
              >
                <Search className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Wishlist Button */}
          <button
            onClick={onOpenWishlist}
            aria-label="View saved items"
            className="relative p-2 text-[#44403C] hover:text-[#1C1917] transition-colors cursor-pointer rounded-md hover:bg-[#EFEAE2]"
          >
            <Heart className="w-4 h-4" />
            {wishlistCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-[#78716C] text-white text-[10px] font-mono rounded-full flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </button>

          {/* Primary Action: Shopping Bag */}
          <button
            onClick={onOpenCart}
            aria-label="Open Shopping Bag"
            className="flex items-center gap-2 px-3.5 py-2 text-xs font-medium text-white bg-[#1C1917] rounded-md hover:bg-[#292524] transition-colors whitespace-nowrap shrink-0 cursor-pointer shadow-xs"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Bag</span>
            <span className="font-mono tabular-nums text-[11px] bg-[#44403C] px-1.5 py-0.2 rounded text-[#FAF8F5]">
              {cartCount}
            </span>
          </button>

          {/* Mobile hamburger button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#44403C] hover:text-[#1C1917] cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Nav Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#E7E2DA] bg-[#FAF8F5] px-6 py-4 space-y-3">
          <button
            onClick={() => handleNavClick('catalog')}
            className="block w-full text-left py-2 text-sm font-medium text-[#292524]"
          >
            Formulas & Products
          </button>
          <button
            onClick={() => handleNavClick('routines')}
            className="block w-full text-left py-2 text-sm font-medium text-[#292524]"
          >
            Rituals & Routines
          </button>
          <button
            onClick={() => handleNavClick('diagnostic')}
            className="block w-full text-left py-2 text-sm font-medium text-[#292524]"
          >
            Skin Diagnostic Quiz
          </button>
          <button
            onClick={() => handleNavClick('ingredients')}
            className="block w-full text-left py-2 text-sm font-medium text-[#292524]"
          >
            Active Science & Ingredients
          </button>
          <button
            onClick={() => handleNavClick('reviews')}
            className="block w-full text-left py-2 text-sm font-medium text-[#292524]"
          >
            Clinical Studies & Proof
          </button>
        </div>
      )}
    </div>
  );
};
