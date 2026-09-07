import React from 'react';
import { ArrowUpRight, Mail, MapPin } from 'lucide-react';
import { TabType } from '../types';

interface FooterProps {
  setActiveTab: (tab: TabType) => void;
  onOpenQuiz: () => void;
  onOpenBespoke: () => void;
  onOpenDonation?: () => void;
  onOpenSolidarity?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab }) => (
  <footer className="mt-20 border-t border-[#333333] bg-[#171717] text-[#E5E2DE]">
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
        <div className="max-w-md">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center bg-[#002395] font-cinzel text-xs font-bold text-white">AA</div>
            <span className="font-cinzel text-lg font-bold tracking-[0.2em] text-white">AFAC AHEAD</span>
          </div>
          <p className="mt-5 text-sm leading-7 text-[#B8B0A8]">
            Association engagee pour la transmission des cultures, la valorisation des savoir-faire et la solidarite entre les diasporas africaines, caribeennes et leurs territoires.
          </p>
        </div>

        <div>
          <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-white">Decouvrir</h2>
          <nav className="mt-4 flex flex-col items-start gap-3 text-sm text-[#B8B0A8]">
            <button onClick={() => setActiveTab('mode')} className="transition-colors hover:text-white">Mode</button>
            <button onClick={() => setActiveTab('articles')} className="transition-colors hover:text-white">Histoire et Memoire</button>
            <button onClick={() => setActiveTab('produits')} className="transition-colors hover:text-white">Boutique</button>
          </nav>
        </div>

        <div>
          <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-white">Nous contacter</h2>
          <div className="mt-4 space-y-3 text-sm text-[#B8B0A8]">
            <a href="mailto:afac-ahead@gmail.com" className="flex items-center gap-2 hover:text-white"><Mail className="h-4 w-4" />afac-ahead@gmail.com<ArrowUpRight className="h-3.5 w-3.5" /></a>
            <span className="flex items-center gap-2"><MapPin className="h-4 w-4" />Aubervilliers, France</span>
          </div>
        </div>
      </div>

      <div className="mt-10 flex flex-col gap-3 border-t border-[#333333] pt-5 text-[11px] text-[#817970] sm:flex-row sm:items-center sm:justify-between">
        <span>© {new Date().getFullYear()} AFAC AHEAD. Tous droits reserves.</span>
        <span>Culture · Transmission · Solidarite</span>
      </div>
    </div>
  </footer>
);
