import React, { useState } from 'react';
import { X, Trash2, ArrowRight, ShieldCheck, Tag } from 'lucide-react';
import { CartItem } from '../types/skincare';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, size: string, delta: number) => void;
  onRemoveItem: (productId: string, size: string) => void;
  onCheckout: (discountAmount: number, promoCode: string) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
}) => {
  if (!isOpen) return null;

  const [promoInput, setPromoInput] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  const [promoError, setPromoError] = useState('');

  const rawSubtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const discountRate = appliedPromo === 'GLOW15' ? 0.15 : 0;
  const discountAmount = Math.round(rawSubtotal * discountRate);
  const freeShippingThreshold = 50;
  const shippingAmount = rawSubtotal >= freeShippingThreshold || rawSubtotal === 0 ? 0 : 8;
  const finalTotal = rawSubtotal - discountAmount + shippingAmount;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoInput.trim().toUpperCase() === 'GLOW15') {
      setAppliedPromo('GLOW15');
      setPromoError('');
    } else {
      setPromoError('Invalid code. Try GLOW15 for 15% off.');
    }
  };

  const handleRemovePromo = () => {
    setAppliedPromo(null);
    setPromoInput('');
  };

  const amountToFreeShipping = Math.max(0, freeShippingThreshold - rawSubtotal);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
      <div
        className="w-full max-w-md bg-[#FAF8F5] h-full shadow-2xl flex flex-col justify-between border-l border-[#E7E2DA]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-[#E7E2DA] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="font-serif text-xl font-medium text-[#1C1917]">Your Skincare Bag</h2>
            <span className="text-xs font-mono text-[#78716C] bg-[#EFEAE2] px-2 py-0.5 rounded">
              {items.reduce((sum, item) => sum + item.quantity, 0)} items
            </span>
          </div>
          <button
            onClick={onClose}
            aria-label="Close cart drawer"
            className="p-1.5 text-[#78716C] hover:text-[#1C1917] rounded-md hover:bg-[#EFEAE2] cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress Indicator */}
        <div className="bg-[#F5F1EB] px-5 py-3 border-b border-[#E7E2DA] text-xs">
          {rawSubtotal >= freeShippingThreshold ? (
            <span className="text-[#15803D] font-medium flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5" />
              You qualify for Free Carbon-Neutral Shipping!
            </span>
          ) : (
            <div className="space-y-1.5">
              <div className="text-[#57534E]">
                Add <strong className="text-[#1C1917] font-mono">${amountToFreeShipping}</strong> more for Complimentary Delivery
              </div>
              <div className="w-full h-1.5 bg-[#E7E2DA] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#1C1917] transition-all duration-300"
                  style={{
                    width: `${Math.min(100, (rawSubtotal / freeShippingThreshold) * 100)}%`,
                  }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Itemized List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {items.length === 0 ? (
            <div className="text-center py-16 space-y-3 text-[#78716C]">
              <p className="font-serif text-lg text-[#1C1917]">Your bag is currently empty.</p>
              <p className="text-xs">Explore our clinical botanical formulas to build your daily ritual.</p>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={`${item.product.id}-${item.selectedSize}`}
                className="flex gap-4 p-3 bg-white rounded-lg border border-[#E7E2DA]"
              >
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  width={64}
                  height={64}
                  className="w-16 h-16 object-cover rounded bg-[#F2EDE4] shrink-0"
                  referrerPolicy="no-referrer"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="text-xs sm:text-sm font-medium text-[#1C1917] truncate">
                      {item.product.name}
                    </h4>
                    <button
                      onClick={() => onRemoveItem(item.product.id, item.selectedSize)}
                      aria-label="Remove item"
                      className="text-[#A8A29E] hover:text-[#DC2626] cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div className="text-[11px] text-[#78716C] mt-0.5">{item.selectedSize}</div>
                  
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center border border-[#D6D0C7] rounded bg-[#FAF8F5]">
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, item.selectedSize, -1)}
                        className="px-2 py-0.5 text-xs text-[#57534E] hover:text-[#1C1917] cursor-pointer"
                      >
                        -
                      </button>
                      <span className="px-2 py-0.5 text-xs font-mono tabular-nums text-[#1C1917]">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, item.selectedSize, 1)}
                        className="px-2 py-0.5 text-xs text-[#57534E] hover:text-[#1C1917] cursor-pointer"
                      >
                        +
                      </button>
                    </div>

                    <span className="font-mono tabular-nums text-xs font-semibold text-[#1C1917]">
                      ${item.product.price * item.quantity}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer & Checkout Summary */}
        {items.length > 0 && (
          <div className="p-5 bg-white border-t border-[#E7E2DA] space-y-4">
            {/* Promo Code Form */}
            {!appliedPromo ? (
              <form onSubmit={handleApplyPromo} className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="w-3.5 h-3.5 text-[#78716C] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Promo code (e.g. GLOW15)"
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value)}
                    className="w-full pl-8 pr-3 py-1.5 text-xs border border-[#D6D0C7] rounded text-[#1C1917] uppercase focus:outline-none focus:border-[#1C1917]"
                  />
                </div>
                <button
                  type="submit"
                  className="px-3 py-1.5 bg-[#FAF8F5] border border-[#D6D0C7] hover:border-[#1C1917] text-xs font-semibold uppercase tracking-wider rounded cursor-pointer"
                >
                  Apply
                </button>
              </form>
            ) : (
              <div className="flex items-center justify-between p-2 bg-[#F0FDF4] border border-[#BBF7D0] rounded text-xs text-[#15803D]">
                <span>Code <strong>{appliedPromo}</strong> applied (-15%)</span>
                <button
                  onClick={handleRemovePromo}
                  className="text-xs text-[#15803D] hover:underline cursor-pointer"
                >
                  Remove
                </button>
              </div>
            )}
            {promoError && <p className="text-[11px] text-[#DC2626]">{promoError}</p>}

            {/* Calculations Breakdown */}
            <div className="space-y-1.5 text-xs text-[#57534E]">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-mono tabular-nums text-[#1C1917]">${rawSubtotal}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-[#15803D]">
                  <span>Discount (15%)</span>
                  <span className="font-mono tabular-nums">-${discountAmount}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Carbon-Neutral Shipping</span>
                <span className="font-mono tabular-nums">
                  {shippingAmount === 0 ? 'FREE' : `$${shippingAmount}`}
                </span>
              </div>
              <div className="pt-2 border-t border-[#E7E2DA] flex justify-between font-semibold text-sm text-[#1C1917]">
                <span>Estimated Total</span>
                <span className="font-mono tabular-nums">${finalTotal}</span>
              </div>
            </div>

            {/* Checkout Action Button */}
            <button
              onClick={() => onCheckout(discountAmount, appliedPromo || '')}
              className="w-full py-3.5 bg-[#1C1917] hover:bg-[#292524] text-white rounded-md text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-xs"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
