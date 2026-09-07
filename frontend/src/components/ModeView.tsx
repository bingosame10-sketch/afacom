import React, { useState } from 'react';
import { FashionFabric, FashionLook, TabType } from '../types';
import { ContentDetail } from './ContentDetailModal';

interface ModeViewProps {
  fabrics: FashionFabric[];
  looks: FashionLook[];
  setActiveTab: (tab: TabType) => void;
  onOpenQuiz: () => void;
  onOpenBespoke: () => void;
  onOpenDetail: (content: ContentDetail) => void;
  searchQuery: string;
}

export const ModeView: React.FC<ModeViewProps> = ({ fabrics, looks, onOpenDetail, searchQuery }) => {
  const [selectedCategory, setSelectedCategory] = useState('Toutes');
  const categories = ['Toutes', ...Array.from(new Set(fabrics.map((fabric) => fabric.rarity)))];
  const query = searchQuery.toLowerCase();
  const contents = fabrics.map((fabric) => ({
    id: fabric.id,
    title: fabric.name,
    category: fabric.rarity,
    image: fabric.image,
    search: `${fabric.name} ${fabric.origin} ${fabric.meaning} ${fabric.symbolism}`,
    detail: {
      title: fabric.name,
      category: fabric.rarity,
      image: fabric.image,
      metadata: [fabric.origin].filter(Boolean),
      paragraphs: [fabric.meaning, fabric.symbolism, fabric.traditionalUse, fabric.modernStylingDiaspora],
    } as ContentDetail,
  }));
  const filtered = contents.filter((content) => (selectedCategory === 'Toutes' || content.category === selectedCategory) && (!query || content.search.toLowerCase().includes(query)));

  if (fabrics.length === 0 && looks.length === 0) return null;

  return (
    <section className="space-y-8">
      <div className="flex flex-col gap-4 border-b border-[#E5E2DE] pb-6 sm:flex-row sm:items-end sm:justify-between">
        <h1 className="font-serif text-3xl font-bold text-[#1A1A1A]">Mode</h1>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => <button key={category} onClick={() => setSelectedCategory(category)} className={`rounded-md border px-3 py-2 text-xs font-bold uppercase tracking-wider ${selectedCategory === category ? 'border-[#1A1A1A] bg-[#1A1A1A] text-white' : 'border-[#E5E2DE] bg-white text-[#7C746C]'}`}>{category}</button>)}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {filtered.map((content) => <button key={content.id} onClick={() => onOpenDetail(content.detail)} className="overflow-hidden rounded-lg border border-[#E5E2DE] bg-white text-left shadow-sm transition hover:-translate-y-1 hover:border-[#002395] hover:shadow-md">{content.detail.image && <img src={content.detail.image} alt={content.title} className="h-56 w-full object-cover" />}<span className="block p-5 font-serif text-xl font-bold leading-tight text-[#1A1A1A]">{content.title}</span><span className="block px-5 pb-5 text-sm leading-relaxed text-[#4A443F]">{content.detail.paragraphs[0]}</span></button>)}
      </div>
      {filtered.length === 0 && <p className="py-10 text-center text-sm text-[#7C746C]">Aucun contenu ne correspond à cette recherche.</p>}
    </section>
  );
};
