import React, { useState } from 'react';
import { X, Heart, ShieldCheck, Check, Sparkles, ArrowRight, Euro, UserCheck } from 'lucide-react';

interface DonationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DonationModal: React.FC<DonationModalProps> = ({ isOpen, onClose }) => {
  const [activeType, setActiveType] = useState<'don' | 'adhesion'>('don');
  const [selectedAmount, setSelectedAmount] = useState<number>(50);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [frequency, setFrequency] = useState<'once' | 'monthly'>('once');
  const [adhesionTier, setAdhesionTier] = useState<'adherent' | 'bienfaiteur' | 'jeune'>('adherent');

  const [donorName, setDonorName] = useState('');
  const [donorEmail, setDonorEmail] = useState('');
  const [donorAddress, setDonorAddress] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const currentAmount = customAmount ? parseFloat(customAmount) || 0 : selectedAmount;
  // Déduction fiscale loi 1901 (66%)
  const fiscalCost = Math.round(currentAmount * 0.34);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="bg-[#FDFCFB] max-w-xl w-full border border-[#1A1A1A] p-6 sm:p-8 shadow-2xl animate-scaleUp space-y-6 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#E5E2DE] pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 bg-[#002395] text-white flex items-center justify-center font-bold">
              <Heart className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="text-[10px] font-mono text-[#002395] uppercase font-bold tracking-[0.2em] block">
                Association Loi 1901 • RNA W931013265
              </span>
              <h3 className="font-serif text-lg font-bold text-[#1A1A1A]">
                Soutenir AFAC AHEAD
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 bg-[#1A1A1A] text-white flex items-center justify-center hover:bg-[#002395] transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {isSubmitted ? (
          <div className="py-10 text-center space-y-4 animate-fadeIn">
            <div className="w-16 h-16 bg-[#002395] text-white flex items-center justify-center mx-auto shadow-lg animate-bounce">
              <Check className="w-8 h-8" />
            </div>
            <h4 className="font-serif text-2xl font-bold text-[#1A1A1A]">
              Merci infiniment pour votre engagement !
            </h4>
            <p className="text-xs sm:text-sm text-[#4A443F] leading-relaxed max-w-sm mx-auto">
              Votre soutien à l'association <strong>AFAC AHEAD</strong> (Aubervilliers) permet d'accompagner concrètement les enfants et adolescents en situation de handicap, de financer les ateliers culturels et de préserver notre patrimoine textile.
            </p>
            <div className="bg-[#F2F0ED] p-4 border border-[#E5E2DE] text-xs text-[#4A443F] max-w-xs mx-auto">
              <span>Un reçu fiscal Cerfa vous sera envoyé par e-mail sous 48h (déduction de 66% de vos impôts).</span>
            </div>
            <div className="pt-2">
              <button
                onClick={onClose}
                className="px-6 py-2.5 bg-[#1A1A1A] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#002395] transition-colors cursor-pointer"
              >
                Fermer
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Type selector: Don vs Adhésion */}
            <div className="grid grid-cols-2 gap-2 bg-[#F2F0ED] p-1 border border-[#E5E2DE]">
              <button
                type="button"
                onClick={() => setActiveType('don')}
                className={`py-2 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  activeType === 'don' 
                    ? 'bg-[#002395] text-white shadow-xs' 
                    : 'text-[#7C746C] hover:text-[#1A1A1A]'
                }`}
              >
                Faire un Don
              </button>
              <button
                type="button"
                onClick={() => setActiveType('adhesion')}
                className={`py-2 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  activeType === 'adhesion' 
                    ? 'bg-[#002395] text-white shadow-xs' 
                    : 'text-[#7C746C] hover:text-[#1A1A1A]'
                }`}
              >
                Adhérer à l'Association
              </button>
            </div>

            {activeType === 'don' ? (
              <div className="space-y-4">
                {/* Frequency */}
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setFrequency('once')}
                    className={`flex-1 py-1.5 px-3 text-xs font-mono uppercase font-bold border transition-colors ${
                      frequency === 'once'
                        ? 'border-[#002395] bg-[#002395]/10 text-[#002395]'
                        : 'border-[#E5E2DE] text-[#7C746C]'
                    }`}
                  >
                    Don ponctuel
                  </button>
                  <button
                    type="button"
                    onClick={() => setFrequency('monthly')}
                    className={`flex-1 py-1.5 px-3 text-xs font-mono uppercase font-bold border transition-colors ${
                      frequency === 'monthly'
                        ? 'border-[#002395] bg-[#002395]/10 text-[#002395]'
                        : 'border-[#E5E2DE] text-[#7C746C]'
                    }`}
                  >
                    Don mensuel régulier
                  </button>
                </div>

                {/* Amounts */}
                <div className="grid grid-cols-4 gap-2">
                  {[30, 50, 100, 250].map((amt) => (
                    <button
                      key={amt}
                      type="button"
                      onClick={() => {
                        setSelectedAmount(amt);
                        setCustomAmount('');
                      }}
                      className={`py-3 text-center border transition-all cursor-pointer ${
                        selectedAmount === amt && !customAmount
                          ? 'border-[#002395] bg-[#002395] text-white font-bold'
                          : 'border-[#E5E2DE] bg-white text-[#1A1A1A] hover:border-[#1A1A1A]'
                      }`}
                    >
                      <span className="text-sm font-bold">{amt} €</span>
                    </button>
                  ))}
                </div>

                <div>
                  <input
                    type="number"
                    placeholder="Autre montant libre en €"
                    value={customAmount}
                    onChange={(e) => setCustomAmount(e.target.value)}
                    className="w-full bg-white border border-[#E5E2DE] px-3 py-2 text-xs text-[#1A1A1A] outline-none focus:border-[#1A1A1A]"
                  />
                </div>

                {/* Fiscal benefit breakdown */}
                <div className="bg-[#F2F0ED] p-3.5 border border-[#E5E2DE] flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#002395]" />
                    <span className="text-[#4A443F]">
                      Coût réel après déduction fiscale (66%) :
                    </span>
                  </div>
                  <span className="font-mono font-bold text-[#002395] text-sm">
                    {fiscalCost} €
                  </span>
                </div>

                {/* Impact details */}
                <div className="bg-white p-3.5 border border-[#E5E2DE] text-xs text-[#4A443F] space-y-1">
                  <span className="font-bold text-[#1A1A1A] uppercase tracking-wider text-[10px] block">
                    Impact de votre don :
                  </span>
                  <p className="text-[11px] leading-relaxed">
                    Financement des kits d'art-thérapie, médiation sociale et soutien des enfants et adolescents handicapés à Aubervilliers et en Île-de-France.
                  </p>
                </div>
              </div>
            ) : (
              /* Adhesion section */
              <div className="space-y-3">
                <div className="space-y-2">
                  <label 
                    onClick={() => setAdhesionTier('adherent')}
                    className={`p-3 border flex items-center justify-between cursor-pointer transition-all ${
                      adhesionTier === 'adherent' ? 'border-[#002395] bg-[#002395]/5' : 'border-[#E5E2DE] bg-white'
                    }`}
                  >
                    <div>
                      <div className="font-bold text-xs text-[#1A1A1A]">Membre Adhérent Annuel</div>
                      <div className="text-[11px] text-[#7C746C]">Participation aux assemblées, accès prioritaire aux ateliers et conférences.</div>
                    </div>
                    <div className="font-mono font-bold text-[#002395] text-sm">20 € / an</div>
                  </label>

                  <label 
                    onClick={() => setAdhesionTier('bienfaiteur')}
                    className={`p-3 border flex items-center justify-between cursor-pointer transition-all ${
                      adhesionTier === 'bienfaiteur' ? 'border-[#002395] bg-[#002395]/5' : 'border-[#E5E2DE] bg-white'
                    }`}
                  >
                    <div>
                      <div className="font-bold text-xs text-[#1A1A1A]">Membre Bienfaiteur</div>
                      <div className="text-[11px] text-[#7C746C]">Soutien renforcé aux projets éducatifs et de protection de la jeunesse.</div>
                    </div>
                    <div className="font-mono font-bold text-[#002395] text-sm">50 € / an</div>
                  </label>

                  <label 
                    onClick={() => setAdhesionTier('jeune')}
                    className={`p-3 border flex items-center justify-between cursor-pointer transition-all ${
                      adhesionTier === 'jeune' ? 'border-[#002395] bg-[#002395]/5' : 'border-[#E5E2DE] bg-white'
                    }`}
                  >
                    <div>
                      <div className="font-bold text-xs text-[#1A1A1A]">Tarif Jeune / Étudiant / Demandeur d'emploi</div>
                      <div className="text-[11px] text-[#7C746C]">Accès solidaire pour tous les jeunes engagés.</div>
                    </div>
                    <div className="font-mono font-bold text-[#002395] text-sm">10 € / an</div>
                  </label>
                </div>
              </div>
            )}

            {/* Donor / Member Info */}
            <div className="space-y-3 pt-2 border-t border-[#E5E2DE]">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-[#1A1A1A] uppercase tracking-wider mb-1">
                    Nom & Prénom *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ex : Aminata Diop"
                    value={donorName}
                    onChange={(e) => setDonorName(e.target.value)}
                    className="w-full bg-white border border-[#E5E2DE] px-3 py-2 text-xs text-[#1A1A1A] outline-none focus:border-[#1A1A1A]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-[#1A1A1A] uppercase tracking-wider mb-1">
                    Adresse Email *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="votre@email.fr"
                    value={donorEmail}
                    onChange={(e) => setDonorEmail(e.target.value)}
                    className="w-full bg-white border border-[#E5E2DE] px-3 py-2 text-xs text-[#1A1A1A] outline-none focus:border-[#1A1A1A]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[#1A1A1A] uppercase tracking-wider mb-1">
                  Adresse postale (pour le reçu fiscal)
                </label>
                <input
                  type="text"
                  placeholder="Ex : 23 Rue de l'Union, 93300 Aubervilliers"
                  value={donorAddress}
                  onChange={(e) => setDonorAddress(e.target.value)}
                  className="w-full bg-white border border-[#E5E2DE] px-3 py-2 text-xs text-[#1A1A1A] outline-none focus:border-[#1A1A1A]"
                />
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex items-center justify-between pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#7C746C] hover:text-[#1A1A1A] transition-colors"
              >
                Annuler
              </button>

              <button
                type="submit"
                className="px-6 py-2.5 bg-[#002395] hover:bg-[#1A1A1A] text-white text-xs font-bold uppercase tracking-wider shadow-xs transition-colors flex items-center gap-2 cursor-pointer"
              >
                <span>Confirmer mon engagement</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
