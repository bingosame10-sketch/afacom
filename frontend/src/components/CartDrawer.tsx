import React, { useState } from 'react';
import { CartItem } from '../types';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  ArrowRight, 
  ShieldCheck, 
  Truck, 
  Check, 
  Sparkles,
  Scissors
} from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, delta: number, size?: string) => void;
  onRemoveItem: (productId: string, size?: string) => void;
  onClearCart: () => void;
  currency: 'EUR' | 'XAF' | 'CAD';
  onOpenBespoke: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  currency,
  onOpenBespoke
}) => {
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  // Form info
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('Paris');
  const [country, setCountry] = useState('France');

  if (!isOpen) return null;

  const rawSubtotalEUR = items.reduce((acc, item) => acc + item.product.priceEUR * item.quantity, 0);
  const discountRate = promoApplied ? 0.15 : 0;
  const discountEUR = rawSubtotalEUR * discountRate;
  const finalSubtotalEUR = rawSubtotalEUR - discountEUR;
  const shippingEUR = finalSubtotalEUR > 150 || finalSubtotalEUR === 0 ? 0 : 9.90;
  const totalEUR = finalSubtotalEUR + shippingEUR;

  const formatPrice = (priceEUR: number) => {
    if (currency === 'XAF') {
      const xaf = Math.round(priceEUR * 655.957);
      return `${xaf.toLocaleString('fr-FR')} FCFA`;
    }
    if (currency === 'CAD') {
      const cad = Math.round(priceEUR * 1.48);
      return `${cad} CAD $`;
    }
    return `${priceEUR.toFixed(2)} €`;
  };

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === 'DIASPORA' || promoCode.trim().toUpperCase() === 'NDOP2026') {
      setPromoApplied(true);
    }
  };

  const handleConfirmOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setOrderComplete(true);
    setTimeout(() => {
      onClearCart();
    }, 4000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/70 backdrop-blur-xs flex justify-end animate-fadeIn">
      <div className="bg-[#FDFCFB] w-full max-w-md h-full shadow-2xl flex flex-col justify-between border-l border-[#1A1A1A] animate-slideLeft">
        {/* Drawer Header */}
        <div className="p-5 border-b border-[#E5E2DE] flex items-center justify-between bg-white">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#002395]" />
            <h3 className="font-serif text-lg font-bold text-[#1A1A1A]">
              Votre Panier d'Artisanat
            </h3>
            <span className="text-xs text-[#7C746C] font-mono">({items.reduce((s, i) => s + i.quantity, 0)})</span>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 bg-[#1A1A1A] text-white flex items-center justify-center hover:bg-[#002395] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {orderComplete ? (
            <div className="py-12 text-center space-y-4">
              <div className="w-16 h-16 bg-[#002395] text-white flex items-center justify-center mx-auto shadow-lg animate-bounce">
                <Check className="w-8 h-8" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-[#1A1A1A]">
                Merci pour votre commande !
              </h3>
              <p className="text-xs text-[#4A443F] leading-relaxed max-w-xs mx-auto">
                Votre commande a été transmise à nos maîtres artisans et préparateurs. Un e-mail de confirmation avec suivi Colissimo vous sera envoyé sous 24h.
              </p>
              <div className="pt-4">
                <button
                  onClick={() => {
                    setOrderComplete(false);
                    setIsCheckingOut(false);
                    onClose();
                  }}
                  className="px-6 py-2.5 bg-[#1A1A1A] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#002395] transition-colors"
                >
                  Continuer la visite
                </button>
              </div>
            </div>
          ) : isCheckingOut ? (
            /* Checkout Form */
            <form onSubmit={handleConfirmOrder} className="space-y-4">
              <div className="flex items-center justify-between border-b border-[#E5E2DE] pb-2">
                <h4 className="font-serif text-base font-bold text-[#1A1A1A]">
                  Adresse de Livraison (Diaspora)
                </h4>
                <button
                  type="button"
                  onClick={() => setIsCheckingOut(false)}
                  className="text-xs text-[#002395] font-bold uppercase tracking-wider"
                >
                  ← Retour au panier
                </button>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[#1A1A1A] uppercase tracking-wider mb-1">
                  Nom et Prénom *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex : Samuel Eto'o ou Julie Dupont"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-white border border-[#E5E2DE] px-3 py-2 text-xs text-[#1A1A1A] outline-none focus:border-[#1A1A1A]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[#1A1A1A] uppercase tracking-wider mb-1">
                  Adresse postale *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex : 24 Rue de la Paix"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full bg-white border border-[#E5E2DE] px-3 py-2 text-xs text-[#1A1A1A] outline-none focus:border-[#1A1A1A]"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] font-bold text-[#1A1A1A] uppercase tracking-wider mb-1">
                    Ville *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Paris, Bruxelles, etc."
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full bg-white border border-[#E5E2DE] px-3 py-2 text-xs text-[#1A1A1A] outline-none focus:border-[#1A1A1A]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-[#1A1A1A] uppercase tracking-wider mb-1">
                    Pays *
                  </label>
                  <select
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="w-full bg-white border border-[#E5E2DE] px-2 py-2 text-xs text-[#1A1A1A] outline-none focus:border-[#1A1A1A]"
                  >
                    <option value="France">France</option>
                    <option value="Belgique">Belgique</option>
                    <option value="Suisse">Suisse</option>
                    <option value="Canada">Canada</option>
                    <option value="Royaume-Uni">Royaume-Uni</option>
                    <option value="Cameroun">Cameroun</option>
                    <option value="Autre">Autre International</option>
                  </select>
                </div>
              </div>

              <div className="bg-[#F2F0ED] p-3 border border-[#E5E2DE] text-xs text-[#4A443F] space-y-1">
                <div className="font-bold text-[#002395] uppercase tracking-wider text-[10px]">Expédition Certifiée :</div>
                <div>Colissimo International sécurisé avec remise contre signature.</div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-[#1A1A1A] hover:bg-[#002395] text-white text-xs font-bold uppercase tracking-widest shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
              >
                <span>Confirmer et Régler ({formatPrice(totalEUR)})</span>
                <ArrowRight className="w-4 h-4 text-[#002395]" />
              </button>
            </form>
          ) : items.length === 0 ? (
            <div className="py-16 text-center space-y-3">
              <ShoppingBag className="w-12 h-12 text-[#C8C2BA] mx-auto" />
              <h4 className="font-serif text-lg font-bold text-[#1A1A1A]">
                Votre panier est vide
              </h4>
              <p className="text-xs text-[#7C746C] max-w-xs mx-auto">
                Explorez notre boutique pour découvrir les vestes Toghu, chemises Ndop et parures royales.
              </p>
            </div>
          ) : (
            /* Items List */
            items.map((item) => (
              <div
                key={`${item.product.id}-${item.selectedSize || 'nosize'}`}
                className="bg-white p-3.5 border border-[#E5E2DE] flex gap-3 shadow-xs"
              >
                <img
                  src={item.product.images[0]}
                  alt={item.product.title}
                  className="w-16 h-20 object-cover border border-[#E5E2DE] shrink-0"
                />

                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h5 className="font-serif text-xs font-bold text-[#1A1A1A] line-clamp-1">
                      {item.product.title}
                    </h5>
                    <div className="text-[10px] text-[#7C746C] flex items-center gap-2 mt-0.5 font-mono">
                      <span>{item.product.fabricType}</span>
                      {item.selectedSize && (
                        <>
                          <span>•</span>
                          <span className="bg-[#F2F0ED] px-1.5 py-0.2 border border-[#E5E2DE]">
                            Taille: {item.selectedSize}
                          </span>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center gap-1.5 bg-[#FDFCFB] border border-[#E5E2DE] px-2 py-0.5">
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, -1, item.selectedSize)}
                        className="text-xs text-[#7C746C] hover:text-[#1A1A1A] cursor-pointer"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-bold text-[#1A1A1A] px-1 font-mono">{item.quantity}</span>
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, 1, item.selectedSize)}
                        className="text-xs text-[#7C746C] hover:text-[#1A1A1A] cursor-pointer"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <div className="text-right">
                      <span className="font-serif text-xs font-bold text-[#1A1A1A]">
                        {formatPrice(item.product.priceEUR * item.quantity)}
                      </span>
                    </div>

                    <button
                      onClick={() => onRemoveItem(item.product.id, item.selectedSize)}
                      className="text-[#7C746C] hover:text-[#002395] p-1 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Summary & Checkout Button */}
        {!orderComplete && !isCheckingOut && items.length > 0 && (
          <div className="p-5 border-t border-[#E5E2DE] bg-white space-y-3">
            {/* Promo Code input */}
            <form onSubmit={handleApplyPromo} className="flex gap-2">
              <input
                type="text"
                placeholder="Code privilège (ex: DIASPORA)"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                className="flex-1 bg-[#FDFCFB] border border-[#E5E2DE] px-3 py-1.5 text-xs text-[#1A1A1A] uppercase placeholder:normal-case outline-none focus:border-[#1A1A1A]"
              />
              <button
                type="submit"
                className="px-4 py-1.5 bg-[#1A1A1A] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#002395] transition-colors cursor-pointer"
              >
                Appliquer
              </button>
            </form>
            {promoApplied && (
              <div className="text-[11px] text-[#002395] font-bold uppercase tracking-wider flex items-center gap-1">
                <Check className="w-3 h-3" /> Remise privilège diaspora de -15% appliquée !
              </div>
            )}

            {/* Calculations */}
            <div className="space-y-1.5 text-xs text-[#4A443F] pt-2 border-t border-[#E5E2DE]">
              <div className="flex justify-between">
                <span>Sous-total</span>
                <span className="font-mono">{formatPrice(rawSubtotalEUR)}</span>
              </div>
              {promoApplied && (
                <div className="flex justify-between text-[#002395] font-bold">
                  <span>Remise Diaspora (-15%)</span>
                  <span>-{formatPrice(discountEUR)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Frais de livraison (Europe)</span>
                <span>{shippingEUR === 0 ? <span className="text-[#002395] font-bold uppercase text-[10px]">Offerts (&gt;150€)</span> : formatPrice(shippingEUR)}</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-[#1A1A1A] pt-2 border-t border-[#E5E2DE]">
                <span className="uppercase font-mono tracking-wider">Total TTC</span>
                <span className="font-serif text-lg text-[#002395]">{formatPrice(totalEUR)}</span>
              </div>
            </div>

            <button
              onClick={() => setIsCheckingOut(true)}
              className="w-full py-3.5 bg-[#1A1A1A] hover:bg-[#002395] text-white text-xs font-bold uppercase tracking-widest shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Commander ({formatPrice(totalEUR)})</span>
              <ArrowRight className="w-4 h-4 text-[#002395]" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
