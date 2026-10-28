import React, { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => {
        setEmail('');
      }, 2000);
    }
  };

  return (
    <footer className="bg-[#1C1917] text-[#FAF8F5] pt-16 pb-12 border-t border-[#292524]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-[#292524]">
          {/* Brand Manifesto */}
          <div className="md:col-span-5 space-y-4">
            <h3 className="font-serif text-2xl tracking-widest uppercase font-medium">
              Aura Botanicals
            </h3>
            <p className="text-xs sm:text-sm text-[#A8A29E] max-w-sm leading-relaxed">
              Clinical dermatological precision meets clean botanical alchemy. Formulated to fortify your lipid barrier, balance biological pH, and bring enduring clarity to your everyday ritual.
            </p>
            <div className="pt-2 text-xs text-[#78716C] space-y-1">
              <div>Cruelty-Free International Leaping Bunny Certified</div>
              <div>Manufactured in small sustainable micro-batches</div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-2 space-y-3">
            <div className="text-xs uppercase tracking-wider font-semibold text-white">
              Formulas
            </div>
            <ul className="space-y-2 text-xs text-[#A8A29E]">
              <li><a href="#catalog" className="hover:text-white transition-colors">Active Serums</a></li>
              <li><a href="#catalog" className="hover:text-white transition-colors">Barrier Creams</a></li>
              <li><a href="#catalog" className="hover:text-white transition-colors">Hydrating Cleansers</a></li>
              <li><a href="#catalog" className="hover:text-white transition-colors">Mineral SPF 50+</a></li>
              <li><a href="#catalog" className="hover:text-white transition-colors">Exfoliating Elixirs</a></li>
            </ul>
          </div>

          {/* Clinical & Care */}
          <div className="md:col-span-2 space-y-3">
            <div className="text-xs uppercase tracking-wider font-semibold text-white">
              Science & Care
            </div>
            <ul className="space-y-2 text-xs text-[#A8A29E]">
              <li><a href="#diagnostic" className="hover:text-white transition-colors">Skin Diagnostic</a></li>
              <li><a href="#routines" className="hover:text-white transition-colors">AM/PM Layering Guide</a></li>
              <li><a href="#ingredients" className="hover:text-white transition-colors">Ingredient Index</a></li>
              <li><a href="#reviews" className="hover:text-white transition-colors">Clinical Evaluations</a></li>
              <li><span className="text-[#78716C]">Sustainable Refill Program</span></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="md:col-span-3 space-y-3">
            <div className="text-xs uppercase tracking-wider font-semibold text-white">
              The Skincare Journal
            </div>
            <p className="text-xs text-[#A8A29E]">
              Receive dermatological research summaries, ritual guides, and exclusive small-batch release invitations.
            </p>
            {!subscribed ? (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    required
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 bg-[#292524] border border-[#44403C] rounded text-xs text-white placeholder:text-[#78716C] focus:outline-none focus:border-white"
                  />
                  <button
                    type="submit"
                    aria-label="Subscribe"
                    className="absolute right-1 top-1 bottom-1 px-3 bg-white text-[#1C1917] rounded text-xs hover:bg-[#FAF8F5] cursor-pointer"
                  >
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>
            ) : (
              <div className="flex items-center gap-1.5 text-xs text-[#86EFAC] p-2 bg-[#14532D]/30 border border-[#166534] rounded">
                <Check className="w-3.5 h-3.5" />
                <span>Subscribed! Check your inbox for 15% off code.</span>
              </div>
            )}
          </div>
        </div>

        {/* Bottom row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#78716C] gap-4">
          <div>
            © {new Date().getFullYear()} Aura Botanicals Skincare Inc. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span className="hover:text-white cursor-pointer transition-colors">Terms of Service</span>
            <span>·</span>
            <span className="hover:text-white cursor-pointer transition-colors">Privacy Policy</span>
            <span>·</span>
            <span className="hover:text-white cursor-pointer transition-colors">Ethical Sourcing Pledge</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
