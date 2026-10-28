/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { PRODUCTS } from './data/skincareData';
import { Product, CartItem } from './types/skincare';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProductCatalog } from './components/ProductCatalog';
import { RoutineBuilder } from './components/RoutineBuilder';
import { SkinDiagnosticQuiz } from './components/SkinDiagnosticQuiz';
import { IngredientsGlossary } from './components/IngredientsGlossary';
import { ReviewsSection } from './components/ReviewsSection';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { WishlistDrawer } from './components/WishlistDrawer';
import { Footer } from './components/Footer';
import { NotFoundPage } from './components/NotFoundPage';

export default function App() {
  // Cart state persisted to localStorage
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('aura_skincare_cart');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    // Default initial cart item for immediate exploration
    return [
      {
        product: PRODUCTS[0],
        quantity: 1,
        selectedSize: PRODUCTS[0].sizes[0],
      },
    ];
  });

  // Wishlist state persisted to localStorage
  const [wishlist, setWishlist] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('aura_skincare_wishlist');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return [PRODUCTS[1]]; // initial saved favorite
  });

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [promoCode, setPromoCode] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // 404 & redirect routing detection
  const [isNotFound, setIsNotFound] = useState(() => {
    const path = window.location.pathname;
    if (path === '/pld-home' || path === '/old-home' || path === '/pld-home/' || path === '/old-home/') {
      window.history.replaceState({}, '', '/');
      return false;
    }
    return path !== '/' && path !== '' && path !== '/index.html';
  });

  useEffect(() => {
    const handleLocationCheck = () => {
      const path = window.location.pathname;
      if (path === '/pld-home' || path === '/old-home' || path === '/pld-home/' || path === '/old-home/') {
        window.history.replaceState({}, '', '/');
        setIsNotFound(false);
        return;
      }
      setIsNotFound(path !== '/' && path !== '' && path !== '/index.html');
    };
    window.addEventListener('popstate', handleLocationCheck);
    return () => window.removeEventListener('popstate', handleLocationCheck);
  }, []);

  // Sync cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('aura_skincare_cart', JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  // Sync wishlist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('aura_skincare_wishlist', JSON.stringify(wishlist));
    } catch (e) {
      console.error(e);
    }
  }, [wishlist]);

  // Self-referencing canonical tag manager
  useEffect(() => {
    const updateCanonicalTag = () => {
      let canonicalLink = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
      if (!canonicalLink) {
        canonicalLink = document.createElement('link');
        canonicalLink.setAttribute('rel', 'canonical');
        document.head.appendChild(canonicalLink);
      }

      // Self-referencing URL resolution
      const currentUrl = window.location.origin + window.location.pathname + (window.location.search || '');
      canonicalLink.setAttribute('href', currentUrl);

      // Keep og:url synchronized with the canonical URL
      let ogUrl = document.querySelector<HTMLMetaElement>('meta[property="og:url"]');
      if (!ogUrl) {
        ogUrl = document.createElement('meta');
        ogUrl.setAttribute('property', 'og:url');
        document.head.appendChild(ogUrl);
      }
      ogUrl.setAttribute('content', currentUrl);
    };

    updateCanonicalTag();
    window.addEventListener('popstate', updateCanonicalTag);
    window.addEventListener('hashchange', updateCanonicalTag);

    return () => {
      window.removeEventListener('popstate', updateCanonicalTag);
      window.removeEventListener('hashchange', updateCanonicalTag);
    };
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  // Add single item to cart
  const handleAddToCart = (product: Product, size: string, quantity: number = 1) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.product.id === product.id && item.selectedSize === size
      );
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [...prev, { product, quantity, selectedSize: size }];
      }
    });
    showToast(`Added ${product.name} to your bag`);
  };

  // Add full multi-product bundle (from diagnostic or routine builder)
  const handleAddMultipleToCart = (productsToAdd: Product[]) => {
    setCart((prev) => {
      let updated = [...prev];
      productsToAdd.forEach((prod) => {
        const defaultSize = prod.sizes[0];
        const existingIndex = updated.findIndex(
          (item) => item.product.id === prod.id && item.selectedSize === defaultSize
        );
        if (existingIndex > -1) {
          updated[existingIndex].quantity += 1;
        } else {
          updated.push({ product: prod, quantity: 1, selectedSize: defaultSize });
        }
      });
      return updated;
    });
    showToast(`Added ${productsToAdd.length} ritual formulas to your bag`);
    setIsCartOpen(true);
  };

  // Update item quantity
  const handleUpdateQuantity = (productId: string, size: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId && item.selectedSize === size) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  // Remove item from cart
  const handleRemoveFromCart = (productId: string, size: string) => {
    setCart((prev) =>
      prev.filter(
        (item) => !(item.product.id === productId && item.selectedSize === size)
      )
    );
  };

  // Wishlist toggle
  const handleToggleWishlist = (product: Product) => {
    setWishlist((prev) => {
      const exists = prev.some((p) => p.id === product.id);
      if (exists) {
        showToast(`Removed from saved favorites`);
        return prev.filter((p) => p.id !== product.id);
      } else {
        showToast(`Saved ${product.name} to wishlist`);
        return [...prev, product];
      }
    });
  };

  // Smooth navigation helper
  const handleNavigate = (sectionId: string) => {
    if (isNotFound) {
      window.history.pushState({}, '', sectionId === 'hero' ? '/' : `/#${sectionId}`);
      setIsNotFound(false);
      setTimeout(() => {
        if (sectionId === 'hero') {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
          const elem = document.getElementById(sectionId);
          if (elem) elem.scrollIntoView({ behavior: 'smooth' });
        }
      }, 50);
      return;
    }

    if (sectionId === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const elem = document.getElementById(sectionId);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleReturnHomeFrom404 = () => {
    window.history.pushState({}, '', '/');
    setIsNotFound(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1C1917] flex flex-col font-sans selection:bg-[#E7E2DA] selection:text-[#1C1917]">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#1C1917] text-white text-xs px-4 py-2.5 rounded-lg shadow-lg flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Navbar */}
      <Navbar
        cartCount={totalCartCount}
        wishlistCount={wishlist.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onNavigate={handleNavigate}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <main className="flex-1">
        {isNotFound ? (
          <NotFoundPage
            onNavigateHome={handleReturnHomeFrom404}
            onNavigateSection={handleNavigate}
            onSearch={(query) => {
              setSearchQuery(query);
              handleNavigate('catalog');
            }}
          />
        ) : (
          <>
            {/* Hero Section */}
            <Hero
              onExploreClick={() => handleNavigate('catalog')}
              onDiagnosticClick={() => handleNavigate('diagnostic')}
            />

            {/* Product Catalog & Targeted Formulations */}
            <ProductCatalog
              products={PRODUCTS}
              onSelectProduct={(prod) => setSelectedProduct(prod)}
              onAddToCart={handleAddToCart}
              wishlistIds={wishlist.map((w) => w.id)}
              onToggleWishlist={handleToggleWishlist}
              searchQuery={searchQuery}
            />

            {/* Skin Diagnostic Quiz Engine */}
            <SkinDiagnosticQuiz
              onAddPrescriptionToCart={handleAddMultipleToCart}
              onSelectProduct={(prod) => setSelectedProduct(prod)}
            />

            {/* Rituals & AM/PM Layering Guide */}
            <RoutineBuilder
              onSelectProduct={(prod) => setSelectedProduct(prod)}
              onAddRoutineToCart={handleAddMultipleToCart}
            />

            {/* Active Science & Ingredients Transparency */}
            <IngredientsGlossary />

            {/* Clinical Proof & Verified Reviews */}
            <ReviewsSection />
          </>
        )}
      </main>

      {/* Clean Footer */}
      <Footer />

      {/* Product Detail Modal */}
      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={handleAddToCart}
          isWishlisted={wishlist.some((w) => w.id === selectedProduct.id)}
          onToggleWishlist={handleToggleWishlist}
        />
      )}

      {/* Slide-over Shopping Bag Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onCheckout={(discount, code) => {
          setDiscountAmount(discount);
          setPromoCode(code);
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      {/* Multi-step Checkout & Receipt Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cart}
        discountAmount={discountAmount}
        promoCode={promoCode}
        onOrderSuccess={() => {
          setCart([]);
        }}
      />

      {/* Saved Favorites Wishlist Drawer */}
      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlist={wishlist}
        onRemoveWishlist={handleToggleWishlist}
        onMoveToCart={(prod) => {
          handleAddToCart(prod, prod.sizes[0]);
        }}
      />
    </div>
  );
}
