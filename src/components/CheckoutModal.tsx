import React, { useState } from 'react';
import { X, CheckCircle2, ShieldCheck, CreditCard, Banknote, Truck } from 'lucide-react';
import { CartItem } from '../types/skincare';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  discountAmount: number;
  promoCode: string;
  onOrderSuccess: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  discountAmount,
  promoCode,
  onOrderSuccess,
}) => {
  if (!isOpen) return null;

  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'card'>('card');
  const [formData, setFormData] = useState({
    fullName: 'Harleen Kaur',
    email: 'harleenkaur0718@gmail.com',
    phone: '+1 (555) 349-1820',
    address: '742 Evergreen Terrace',
    city: 'San Francisco',
    postalCode: '94107',
    country: 'United States',
    cardNumber: '4242 •••• •••• 4242',
    cardExp: '12/28',
    cardCvc: '888',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');

  const rawSubtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const shippingAmount = rawSubtotal >= 50 || rawSubtotal === 0 ? 0 : 8;
  const finalTotal = Math.max(0, rawSubtotal - discountAmount + shippingAmount);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const randomOrderNum = `AURA-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderNumber(randomOrderNum);
    setIsSubmitted(true);
    onOrderSuccess();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-2xl bg-[#FAF8F5] border border-[#E7E2DA] rounded-xl shadow-2xl overflow-hidden my-auto p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Close checkout"
          className="absolute top-4 right-4 text-[#78716C] hover:text-[#1C1917] p-1 rounded-md cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSubmitted ? (
          <div>
            <div className="border-b border-[#E7E2DA] pb-4 mb-6">
              <span className="text-xs uppercase tracking-widest text-[#78716C] font-semibold">
                Direct-To-Consumer Dispatch
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-medium text-[#1C1917] mt-1">
                Complete Your Botanical Order
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Contact Information */}
              <div className="space-y-3">
                <h3 className="text-xs uppercase tracking-wider font-semibold text-[#1C1917]">
                  1. Contact & Recipient
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] text-[#78716C] mb-1">Full Name</label>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full px-3 py-2 bg-white border border-[#D6D0C7] rounded text-xs text-[#1C1917] focus:outline-none focus:border-[#1C1917]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-[#78716C] mb-1">Email Address</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3 py-2 bg-white border border-[#D6D0C7] rounded text-xs text-[#1C1917] focus:outline-none focus:border-[#1C1917]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] text-[#78716C] mb-1">Mobile Phone (Delivery SMS updates)</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3 py-2 bg-white border border-[#D6D0C7] rounded text-xs text-[#1C1917] focus:outline-none focus:border-[#1C1917]"
                  />
                </div>
              </div>

              {/* Shipping Address */}
              <div className="space-y-3 pt-3 border-t border-[#E7E2DA]">
                <h3 className="text-xs uppercase tracking-wider font-semibold text-[#1C1917]">
                  2. Delivery Destination
                </h3>
                <div>
                  <label className="block text-[11px] text-[#78716C] mb-1">Street Address</label>
                  <input
                    type="text"
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full px-3 py-2 bg-white border border-[#D6D0C7] rounded text-xs text-[#1C1917] focus:outline-none focus:border-[#1C1917]"
                  />
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] text-[#78716C] mb-1">City</label>
                    <input
                      type="text"
                      required
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full px-3 py-2 bg-white border border-[#D6D0C7] rounded text-xs text-[#1C1917] focus:outline-none focus:border-[#1C1917]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-[#78716C] mb-1">Postal Code</label>
                    <input
                      type="text"
                      required
                      value={formData.postalCode}
                      onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                      className="w-full px-3 py-2 bg-white border border-[#D6D0C7] rounded text-xs text-[#1C1917] focus:outline-none focus:border-[#1C1917]"
                    />
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label className="block text-[11px] text-[#78716C] mb-1">Country</label>
                    <input
                      type="text"
                      required
                      value={formData.country}
                      onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                      className="w-full px-3 py-2 bg-white border border-[#D6D0C7] rounded text-xs text-[#1C1917] focus:outline-none focus:border-[#1C1917]"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Methods */}
              <div className="space-y-3 pt-3 border-t border-[#E7E2DA]">
                <h3 className="text-xs uppercase tracking-wider font-semibold text-[#1C1917]">
                  3. Payment Method
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`p-3 rounded-lg border text-left flex items-center gap-3 cursor-pointer transition-all ${
                      paymentMethod === 'card'
                        ? 'border-[#1C1917] bg-white shadow-xs'
                        : 'border-[#D6D0C7] bg-[#FAF8F5]'
                    }`}
                  >
                    <CreditCard className="w-4 h-4 text-[#1C1917]" />
                    <div>
                      <div className="text-xs font-semibold text-[#1C1917]">Credit / Debit Card</div>
                      <div className="text-[10px] text-[#78716C]">Instant encrypted 256-bit checkout</div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('cod')}
                    className={`p-3 rounded-lg border text-left flex items-center gap-3 cursor-pointer transition-all ${
                      paymentMethod === 'cod'
                        ? 'border-[#1C1917] bg-white shadow-xs'
                        : 'border-[#D6D0C7] bg-[#FAF8F5]'
                    }`}
                  >
                    <Banknote className="w-4 h-4 text-[#1C1917]" />
                    <div>
                      <div className="text-xs font-semibold text-[#1C1917]">Cash on Delivery (COD)</div>
                      <div className="text-[10px] text-[#78716C]">Pay courier upon parcel arrival</div>
                    </div>
                  </button>
                </div>

                {paymentMethod === 'card' && (
                  <div className="p-3 bg-white rounded border border-[#E7E2DA] space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-[#78716C]">Card Details</span>
                      <span className="text-[10px] text-[#15803D] font-medium flex items-center gap-1">
                        <ShieldCheck className="w-3 h-3" /> SSL Secured Sandbox
                      </span>
                    </div>
                    <input
                      type="text"
                      disabled
                      value={formData.cardNumber}
                      className="w-full px-3 py-1.5 bg-[#FAF8F5] border border-[#E7E2DA] rounded text-xs font-mono text-[#57534E]"
                    />
                  </div>
                )}
              </div>

              {/* Order Final Summary */}
              <div className="pt-3 border-t border-[#E7E2DA] bg-[#F5F1EB] p-4 rounded-lg space-y-2 text-xs">
                <div className="flex justify-between text-[#57534E]">
                  <span>Items Subtotal ({items.length} lines)</span>
                  <span className="font-mono tabular-nums text-[#1C1917]">${rawSubtotal}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-[#15803D]">
                    <span>Promotional Savings ({promoCode || '15%'})</span>
                    <span className="font-mono tabular-nums">-${discountAmount}</span>
                  </div>
                )}
                <div className="flex justify-between text-[#57534E]">
                  <span>Carbon-Neutral Delivery</span>
                  <span className="font-mono tabular-nums">
                    {shippingAmount === 0 ? 'FREE' : `$${shippingAmount}`}
                  </span>
                </div>
                <div className="pt-2 border-t border-[#E7E2DA] flex justify-between font-semibold text-sm text-[#1C1917]">
                  <span>Total Amount Due</span>
                  <span className="font-mono tabular-nums">${finalTotal}</span>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-[#1C1917] hover:bg-[#292524] text-white rounded-md text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer shadow-xs"
              >
                Place Order · ${finalTotal}
              </button>
            </form>
          </div>
        ) : (
          /* Confirmation Screen */
          <div className="text-center py-8 space-y-5">
            <div className="w-14 h-14 bg-[#F0FDF4] border border-[#BBF7D0] rounded-full flex items-center justify-center mx-auto text-[#15803D]">
              <CheckCircle2 className="w-7 h-7" />
            </div>

            <div>
              <span className="text-xs uppercase tracking-widest text-[#15803D] font-semibold">
                Order Confirmed & Lab Dispatch Scheduled
              </span>
              <h2 className="font-serif text-3xl font-medium text-[#1C1917] mt-1">
                Thank You, {formData.fullName}
              </h2>
              <p className="text-xs font-mono text-[#78716C] mt-1">
                Order ID: {orderNumber}
              </p>
            </div>

            <div className="p-4 bg-white rounded-lg border border-[#E7E2DA] text-xs text-left space-y-2 max-w-md mx-auto">
              <div className="flex items-center gap-2 text-[#1C1917] font-semibold">
                <Truck className="w-4 h-4 text-[#854D0E]" />
                <span>Delivery Estimation: 2–3 Business Days</span>
              </div>
              <p className="text-[#57534E]">
                We have sent an order receipt and live parcel tracking link to <strong>{formData.email}</strong>.
              </p>
              <div className="pt-2 border-t border-[#E7E2DA] flex justify-between text-[#78716C]">
                <span>Payment Mode:</span>
                <span className="font-medium text-[#1C1917] uppercase">
                  {paymentMethod === 'cod' ? 'Cash on Delivery' : 'Encrypted Card'}
                </span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="px-6 py-2.5 bg-[#1C1917] text-white text-xs font-semibold uppercase tracking-wider rounded-md hover:bg-[#292524] cursor-pointer"
            >
              Continue Exploring
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
