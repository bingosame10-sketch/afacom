import React, { useState } from 'react';
import { TabType } from '../types';
import { ShoppingBag, Search, Menu, X, BookOpen, Shirt, Sparkles } from 'lucide-react';
import { Banner } from './Banner';

interface HeaderProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  bannerImages?: string[];
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  searchQuery,
  setSearchQuery,
  bannerImages = [],
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // 3 onglets (suppression définitive de l'onglet Agora & Entraide)
  const tabs: { id: TabType; label: string; number: string; icon: React.ReactNode; subtitle: string }[] = [
    { 
      id: 'mode', 
      label: 'MODE',
      number: '01', 
      icon: <Shirt className="w-4 h-4" />, 
      subtitle: 'Création, transmission et savoir-faire'
    },
    { 
      id: 'articles', 
      label: 'HISTOIRE ET MÉMOIRE',
      number: '02', 
      icon: <BookOpen className="w-4 h-4" />, 
      subtitle: 'Récits, patrimoine et héritages'
    },
    { 
      id: 'produits', 
      label: 'BOUTIQUE',
      number: '03', 
      icon: <ShoppingBag className="w-4 h-4" />, 
      subtitle: 'Artisanat et créations solidaires'
    },
  ];

  return (
    <header className="relative z-40 bg-[#FDFCFB] border-b border-[#E5E2DE] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between gap-4">
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-[#1A1A1A] hover:bg-[#F2F0ED] rounded-none transition-colors border border-[#E5E2DE]"
          aria-label="Menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>

        <div 
          onClick={() => setActiveTab('mode')} 
          className="cursor-pointer flex items-center gap-2.5 text-center lg:text-left group"
        >
          <div className="w-9 h-9 bg-[#002395] rounded-none flex items-center justify-center text-white font-bold text-xs shadow-xs font-cinzel tracking-wider border border-[#002395]">
            AA
          </div>
          <div>
            <span className="text-xl sm:text-2xl font-black tracking-tight uppercase text-[#1A1A1A] group-hover:text-[#002395] transition-colors font-cinzel">
              AFAC AHEAD
            </span>
          </div>
        </div>

        <div className="flex-1">
          <div className="relative w-full">
            <div className="flex items-center bg-[#F2F0ED] px-4 py-3 border border-[#E5E2DE] focus-within:border-[#1A1A1A] focus-within:bg-white transition-all">
              <Search className="w-5 h-5 text-[#7C746C] mr-3" />
              <input
                type="text"
                placeholder="Rechercher..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent text-sm sm:text-base w-full outline-none text-[#1A1A1A] placeholder-[#9E9080]"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="text-xs text-[#7C746C] hover:text-[#1A1A1A] ml-2"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Bannière de 3 images sous la barre de recherche */}
      <Banner images={bannerImages} />

      {/* 3 Nav Tabs */}
      <nav className="border-t border-[#E5E2DE] bg-[#FDFCFB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-3 gap-1 sm:gap-4">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`relative py-3.5 sm:py-4 px-2 sm:px-4 text-center transition-all group flex flex-col items-center justify-center cursor-pointer ${
                    isActive 
                      ? 'text-[#1A1A1A]' 
                      : 'text-[#7C746C] hover:text-[#1A1A1A] hover:bg-[#F2F0ED]/50'
                  }`}
                >
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <span className={`text-[10px] sm:text-xs font-mono font-bold tracking-wider transition-colors ${
                      isActive ? 'text-[#002395]' : 'text-[#A89F95]'
                    }`}>
                      {tab.number}
                    </span>
                    <span className={`text-[11px] sm:text-xs md:text-sm font-bold uppercase tracking-widest transition-colors line-clamp-1 ${
                      isActive ? 'text-[#1A1A1A]' : 'text-[#7C746C] group-hover:text-[#1A1A1A]'
                    }`}>
                      {tab.label}
                    </span>
                  </div>
                  <span className="hidden md:block text-[10px] text-[#7C746C] uppercase tracking-wider mt-0.5 font-medium line-clamp-1">
                    {tab.subtitle}
                  </span>

                  {/* Active indicator bar - Blue underline */}
                  {isActive ? (
                    <div className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#002395]" />
                  ) : (
                    <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-transparent group-hover:bg-[#E5E2DE] transition-colors" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FDFCFB] border-b border-[#E5E2DE] px-4 py-4 space-y-3 animate-fadeIn">
          <div className="flex items-center bg-[#F2F0ED] px-3 py-2 border border-[#E5E2DE]">
            <Search className="w-4 h-4 text-[#7C746C] mr-2" />
            <input
              type="text"
              placeholder="Rechercher..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent text-sm w-full outline-none text-[#1A1A1A]"
            />
          </div>

          <div className="pt-2 border-t border-[#E5E2DE] flex flex-col gap-2">
            <button
              onClick={() => {
                setActiveTab('mode');
                setMobileMenuOpen(false);
              }}
              className="w-full text-left py-2.5 px-3 bg-[#F2F0ED] text-[#1A1A1A] text-xs font-bold uppercase tracking-wider flex items-center gap-2 border border-[#E5E2DE]"
            >
              <Sparkles className="w-4 h-4 text-[#002395]" />
              <span>Mode & Étoffes</span>
                <span>Mode</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};