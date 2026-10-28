import React from 'react';
import { X, Trash2, ShoppingBag, Heart } from 'lucide-react';
import { Product } from '../types/skincare';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlist: Product[];
  onRemoveWishlist: (product: Product) => void;
  onMoveToCart: (product: Product) => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  wishlist,
  onRemoveWishlist,
  onMoveToCart,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
      <div
        className="w-full max-w-md bg-[#FAF8F5] h-full shadow-2xl flex flex-col justify-between border-l border-[#E7E2DA]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-5 border-b border-[#E7E2DA] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart className="w-4 h-4 text-[#1C1917]" />
            <h2 className="font-serif text-xl font-medium text-[#1C1917]">Saved Formulations</h2>
            <span className="text-xs font-mono text-[#78716C] bg-[#EFEAE2] px-2 py-0.5 rounded">
              {wishlist.length}
            </span>
          </div>
          <button
            onClick={onClose}
            aria-label="Close wishlist drawer"
            className="p-1.5 text-[#78716C] hover:text-[#1C1917] rounded-md hover:bg-[#EFEAE2] cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {wishlist.length === 0 ? (
            <div className="text-center py-16 space-y-3 text-[#78716C]">
              <p className="font-serif text-lg text-[#1C1917]">No saved items yet.</p>
              <p className="text-xs">Tap the heart on any formulation to save it to your ritual wishlist.</p>
            </div>
          ) : (
            wishlist.map((prod) => (
              <div
                key={prod.id}
                className="flex gap-4 p-3 bg-white rounded-lg border border-[#E7E2DA]"
              >
                <img
                  src={prod.image}
                  alt={prod.name}
                  width={64}
                  height={64}
                  className="w-16 h-16 object-cover rounded bg-[#F2EDE4] shrink-0"
                  referrerPolicy="no-referrer"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="text-xs sm:text-sm font-medium text-[#1C1917] truncate">
                      {prod.name}
                    </h4>
                    <button
                      onClick={() => onRemoveWishlist(prod)}
                      aria-label="Remove from wishlist"
                      className="text-[#A8A29E] hover:text-[#DC2626] cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div className="text-[11px] text-[#78716C] mt-0.5">{prod.ritualStep} · {prod.volume}</div>

                  <div className="flex items-center justify-between mt-3">
                    <span className="font-mono tabular-nums text-xs font-semibold text-[#1C1917]">
                      ${prod.price}
                    </span>

                    <button
                      onClick={() => {
                        onMoveToCart(prod);
                        onRemoveWishlist(prod);
                      }}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#1C1917] text-white text-[11px] font-semibold uppercase tracking-wider rounded hover:bg-[#292524] cursor-pointer"
                    >
                      <ShoppingBag className="w-3 h-3" />
                      <span>Move to Bag</span>
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="p-4 bg-white border-t border-[#E7E2DA] text-center">
          <button
            onClick={onClose}
            className="w-full py-2.5 bg-[#FAF8F5] border border-[#D6D0C7] hover:border-[#1C1917] text-xs font-semibold uppercase tracking-wider rounded text-[#1C1917] cursor-pointer"
          >
            Continue Browsing
          </button>
        </div>
      </div>
    </div>
  );
};
