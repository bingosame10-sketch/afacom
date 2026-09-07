import React, { useState } from 'react';
import { Scissors, Check, X, Send, Sparkles, Ruler, Calendar, MapPin, User, Mail, Phone } from 'lucide-react';

interface BespokeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BespokeModal: React.FC<BespokeModalProps> = ({ isOpen, onClose }) => {
  const [submitted, setSubmitted] = useState(false);
  const [eventType, setEventType] = useState('Mariage Traditionnel / Coutumier');
  const [fabricPreference, setFabricPreference] = useState('Toghu Impérial (Grassfields)');
  const [targetDate, setTargetDate] = useState('');
  const [city, setCity] = useState('Paris, France');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 4000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-[#FDFCFB] max-w-xl w-full border border-[#1A1A1A] p-6 sm:p-8 shadow-2xl animate-scaleUp space-y-6 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#E5E2DE] pb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#002395]/10 text-[#002395] flex items-center justify-center font-bold">
              <Scissors className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] font-mono text-[#002395] uppercase font-bold tracking-[0.2em] block">
                Atelier Haute Couture Diaspora
              </span>
              <h3 className="font-serif text-lg font-bold text-[#1A1A1A]">
                Confection Sur-Mesure & Cérémonie
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 bg-[#1A1A1A] text-white flex items-center justify-center hover:bg-[#002395] transition-colors"
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
              Demande de Devis Transmise !
            </h4>
            <p className="text-xs sm:text-sm text-[#4A443F] leading-relaxed max-w-sm mx-auto">
              Notre maître tailleur vous contactera sous 24 à 48 heures pour organiser la prise de mesures (en visio ou à l'atelier parisien) et vous présenter le nuancier d'étoffes.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-[#1A1A1A] uppercase tracking-wider mb-1">
                  Type d'Événement *
                </label>
                <select
                  value={eventType}
                  onChange={(e) => setEventType(e.target.value)}
                  className="w-full bg-white border border-[#E5E2DE] px-3 py-2 text-xs text-[#1A1A1A] outline-none focus:border-[#1A1A1A]"
                >
                  <option value="Mariage Traditionnel / Coutumier">Mariage Coutumier / Traditionnel</option>
                  <option value="Mariage Civil en Mairie">Mariage Civil en Mairie</option>
                  <option value="Gala & Soirée de Prestige">Gala & Soirée de Prestige</option>
                  <option value="Baptême & Cérémonie Familiale">Baptême & Cérémonie Familiale</option>
                  <option value="Autre tenue sur-mesure">Autre tenue personnalisée</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[#1A1A1A] uppercase tracking-wider mb-1">
                  Étoffe Royale Souhaitée *
                </label>
                <select
                  value={fabricPreference}
                  onChange={(e) => setFabricPreference(e.target.value)}
                  className="w-full bg-white border border-[#E5E2DE] px-3 py-2 text-xs text-[#1A1A1A] outline-none focus:border-[#1A1A1A]"
                >
                  <option value="Toghu Impérial (Grassfields)">Toghu Impérial (Grassfields)</option>
                  <option value="Ndop Royal Indigo (Bamiléké/Bamoun)">Ndop Royal Indigo (Bamiléké/Bamoun)</option>
                  <option value="Kaba Ngondo Soie (Sawa)">Kaba Ngondo Soie (Sawa)</option>
                  <option value="Boubou Brodé Or (Grand Nord)">Boubou Brodé Or (Grand Nord)</option>
                  <option value="Mélange Costard & Étoffe Traditionnelle">Mélange Smoking & Étoffe</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-[#1A1A1A] uppercase tracking-wider mb-1">
                  Date approximative de l'événement
                </label>
                <input
                  type="date"
                  value={targetDate}
                  onChange={(e) => setTargetDate(e.target.value)}
                  className="w-full bg-white border border-[#E5E2DE] px-3 py-2 text-xs text-[#1A1A1A] outline-none focus:border-[#1A1A1A]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[#1A1A1A] uppercase tracking-wider mb-1">
                  Votre Ville & Pays de résidence *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex : Paris, Lyon, Bruxelles, Genève"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full bg-white border border-[#E5E2DE] px-3 py-2 text-xs text-[#1A1A1A] outline-none focus:border-[#1A1A1A]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-[#1A1A1A] uppercase tracking-wider mb-1">
                  Nom Complet *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Votre nom"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-white border border-[#E5E2DE] px-3 py-2 text-xs text-[#1A1A1A] outline-none focus:border-[#1A1A1A]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[#1A1A1A] uppercase tracking-wider mb-1">
                  Email *
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
                  Téléphone / WhatsApp *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+33 6 12 34 56 78"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-white border border-[#E5E2DE] px-3 py-2 text-xs text-[#1A1A1A] outline-none focus:border-[#1A1A1A]"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-[#1A1A1A] uppercase tracking-wider mb-1">
                Détails de votre projet (couleurs, coupe, nombre de pièces)
              </label>
              <textarea
                rows={3}
                placeholder="Ex : Veste de smoking pour le marié avec broderie Toghu dorée + robe assortie pour la mariée..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full bg-white border border-[#E5E2DE] p-3 text-xs text-[#1A1A1A] outline-none focus:border-[#1A1A1A]"
              />
            </div>

            <div className="bg-[#F2F0ED] p-3.5 border border-[#E5E2DE] text-[11px] text-[#4A443F] space-y-1">
              <div className="font-bold text-[#002395] uppercase tracking-wider flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-[#002395]" />
                <span>Engagement d'Excellence & Respect du Protocole</span>
              </div>
              <p>
                Toutes nos étoffes proviennent directement des coopératives d'artisans au Cameroun, garantissant une authenticité irréprochable pour votre célébration.
              </p>
            </div>

            <div className="pt-2 flex justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#7C746C] hover:text-[#1A1A1A] transition-colors"
              >
                Fermer
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 bg-[#1A1A1A] hover:bg-[#002395] text-white text-xs font-bold uppercase tracking-wider shadow-xs transition-colors flex items-center gap-2 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5 text-[#002395]" />
                <span>Envoyer ma demande de devis</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
