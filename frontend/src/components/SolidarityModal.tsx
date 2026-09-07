import React, { useState } from 'react';
import { X, ShieldAlert, Heart, MapPin, Phone, Mail, Check, Sparkles, Send, Users, HandHeart, Calendar } from 'lucide-react';

interface SolidarityModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenDonation: () => void;
}

export const SolidarityModal: React.FC<SolidarityModalProps> = ({ isOpen, onClose, onOpenDonation }) => {
  const [formType, setFormType] = useState<'famille' | 'benevole' | 'partenaire'>('famille');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [situation, setSituation] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="bg-[#FDFCFB] max-w-2xl w-full border border-[#1A1A1A] p-6 sm:p-8 shadow-2xl animate-scaleUp space-y-6 max-h-[90vh] overflow-y-auto">
        {/* Top Header */}
        <div className="flex items-center justify-between border-b border-[#E5E2DE] pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 bg-[#002395] text-white flex items-center justify-center font-bold">
              <HandHeart className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="text-[10px] font-mono text-[#002395] uppercase font-bold tracking-[0.2em] block">
                Pôle Solidarité & Inclusion • Aubervilliers
              </span>
              <h3 className="font-serif text-lg font-bold text-[#1A1A1A]">
                Amis des Handicapés, Enfants & Adolescents en Danger
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

        {submitted ? (
          <div className="py-10 text-center space-y-4 animate-fadeIn">
            <div className="w-16 h-16 bg-[#002395] text-white flex items-center justify-center mx-auto shadow-lg animate-bounce">
              <Check className="w-8 h-8" />
            </div>
            <h4 className="font-serif text-2xl font-bold text-[#1A1A1A]">
              Votre message a été transmis à notre équipe !
            </h4>
            <p className="text-xs sm:text-sm text-[#4A443F] leading-relaxed max-w-md mx-auto">
              Les bénévoles et référents de l'association <strong>AFAC AHEAD</strong> prendront contact avec vous sous 24 à 48 heures ouvrées pour organiser un accompagnement personnalisé.
            </p>
            <div className="bg-[#F2F0ED] p-4 border border-[#E5E2DE] text-xs text-[#4A443F] max-w-md mx-auto text-left space-y-1">
              <div className="font-bold text-[#1A1A1A] uppercase tracking-wider text-[10px]">Permanence d'accueil :</div>
              <div>📍 23 Rue de l'Union, 93300 Aubervilliers</div>
              <div>📧 afac-ahead@gmail.com</div>
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
          <div className="space-y-6">
            {/* Missions Pillars of AFAC AHEAD */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="bg-[#F2F0ED] p-3.5 border border-[#E5E2DE] space-y-1.5">
                <div className="flex items-center gap-1.5 text-[#002395] font-bold text-xs">
                  <ShieldAlert className="w-4 h-4 text-[#002395]" />
                  <span>Soutien Handicap</span>
                </div>
                <p className="text-[11px] text-[#4A443F] leading-relaxed">
                  Aide aux démarches MDPH, médiation familiale et aménagement du quotidien pour les enfants en situation de handicap.
                </p>
              </div>

              <div className="bg-[#F2F0ED] p-3.5 border border-[#E5E2DE] space-y-1.5">
                <div className="flex items-center gap-1.5 text-[#002395] font-bold text-xs">
                  <Users className="w-4 h-4 text-[#002395]" />
                  <span>Jeunesse en Danger</span>
                </div>
                <p className="text-[11px] text-[#4A443F] leading-relaxed">
                  Prévention du décrochage, soutien scolaire, écoute active et ateliers artistiques de transmission culturelle.
                </p>
              </div>

              <div className="bg-[#F2F0ED] p-3.5 border border-[#E5E2DE] space-y-1.5">
                <div className="flex items-center gap-1.5 text-[#002395] font-bold text-xs">
                  <Sparkles className="w-4 h-4 text-[#002395]" />
                  <span>Insertion Textile</span>
                </div>
                <p className="text-[11px] text-[#4A443F] leading-relaxed">
                  Apprentissage de la couture traditionnelle et moderne pour autonomiser les jeunes et valoriser les étoffes.
                </p>
              </div>
            </div>

            {/* Permanent Location & Hours Box */}
            <div className="bg-white p-4 border border-[#E5E2DE] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs font-bold text-[#1A1A1A] uppercase tracking-wider">
                  <MapPin className="w-4 h-4 text-[#002395]" />
                  <span>Siège Social & Permanence AFAC AHEAD</span>
                </div>
                <div className="text-xs text-[#7C746C]">
                  23 Rue de l'Union, 93300 Aubervilliers (Seine-Saint-Denis)
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenDonation();
                }}
                className="px-4 py-2 bg-[#002395] hover:bg-[#1A1A1A] text-white text-xs font-bold uppercase tracking-wider transition-colors shrink-0 cursor-pointer shadow-xs"
              >
                Faire un Don
              </button>
            </div>

            {/* Direct Contact / Support Form */}
            <form onSubmit={handleSubmit} className="space-y-4 pt-2 border-t border-[#E5E2DE]">
              <h4 className="font-serif text-base font-bold text-[#1A1A1A]">
                Formulaire d'Écoute, d'Aide & de Bénévolat
              </h4>

              {/* Selector */}
              <div className="grid grid-cols-3 gap-2 bg-[#F2F0ED] p-1 border border-[#E5E2DE]">
                <button
                  type="button"
                  onClick={() => setFormType('famille')}
                  className={`py-1.5 text-[11px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
                    formType === 'famille' ? 'bg-[#002395] text-white' : 'text-[#7C746C]'
                  }`}
                >
                  Famille / Demande d'Aide
                </button>
                <button
                  type="button"
                  onClick={() => setFormType('benevole')}
                  className={`py-1.5 text-[11px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
                    formType === 'benevole' ? 'bg-[#002395] text-white' : 'text-[#7C746C]'
                  }`}
                >
                  Devenir Bénévole
                </button>
                <button
                  type="button"
                  onClick={() => setFormType('partenaire')}
                  className={`py-1.5 text-[11px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
                    formType === 'partenaire' ? 'bg-[#002395] text-white' : 'text-[#7C746C]'
                  }`}
                >
                  Partenariat / Mairie
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-[#1A1A1A] uppercase tracking-wider mb-1">
                    Nom & Prénom *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Votre nom complet"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-white border border-[#E5E2DE] px-3 py-2 text-xs text-[#1A1A1A] outline-none focus:border-[#1A1A1A]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-[#1A1A1A] uppercase tracking-wider mb-1">
                    Téléphone / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+33 6 00 00 00 00"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-white border border-[#E5E2DE] px-3 py-2 text-xs text-[#1A1A1A] outline-none focus:border-[#1A1A1A]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[#1A1A1A] uppercase tracking-wider mb-1">
                  Adresse Email *
                </label>
                <input
                  type="email"
                  required
                  placeholder="votre@email.fr"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white border border-[#E5E2DE] px-3 py-2 text-xs text-[#1A1A1A] outline-none focus:border-[#1A1A1A]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[#1A1A1A] uppercase tracking-wider mb-1">
                  Description de votre situation ou projet *
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Précisez les besoins (âge de l'enfant, situation de handicap, type de soutien souhaité, ou disponibilités pour le bénévolat)..."
                  value={situation}
                  onChange={(e) => setSituation(e.target.value)}
                  className="w-full bg-white border border-[#E5E2DE] p-3 text-xs text-[#1A1A1A] outline-none focus:border-[#1A1A1A]"
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#7C746C] hover:text-[#1A1A1A] transition-colors"
                >
                  Fermer
                </button>

                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#002395] hover:bg-[#1A1A1A] text-white text-xs font-bold uppercase tracking-wider shadow-xs transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Envoyer la demande</span>
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
