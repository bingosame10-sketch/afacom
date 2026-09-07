import React, { useState } from 'react';
import { Product, TabType } from '../types';
import { ContentDetail } from './ContentDetailModal';

interface ProduitsViewProps {
  products: Product[];
  setActiveTab: (tab: TabType) => void;
  onAddToCart: (product: Product, selectedSize?: string) => void;
  onToggleWishlist: (product: Product) => void;
  wishlistIds: string[];
  onOpenBespoke: () => void;
  onOpenDetail: (content: ContentDetail) => void;
  currency: 'EUR' | 'XAF' | 'CAD';
  searchQuery: string;
}

export const ProduitsView: React.FC<ProduitsViewProps> = ({ products, onOpenDetail, searchQuery }) => {
  const [selectedCategory, setSelectedCategory] = useState('Tous');
  const categories = ['Tous', ...Array.from(new Set(products.map((product) => product.category)))];
  const query = searchQuery.toLowerCase();
  const filteredProducts = products.filter((product) => (selectedCategory === 'Tous' || product.category === selectedCategory) && (!query || `${product.title} ${product.description} ${product.originRegion}`.toLowerCase().includes(query)));

  if (products.length === 0) return null;

  return (
    <section className="space-y-8">
      <div className="flex flex-col gap-4 border-b border-[#E5E2DE] pb-6 sm:flex-row sm:items-end sm:justify-between">
        <h1 className="font-serif text-3xl font-bold text-[#1A1A1A]">Boutique</h1>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => <button key={category} onClick={() => setSelectedCategory(category)} className={`rounded-md border px-3 py-2 text-xs font-bold uppercase tracking-wider ${selectedCategory === category ? 'border-[#1A1A1A] bg-[#1A1A1A] text-white' : 'border-[#E5E2DE] bg-white text-[#7C746C]'}`}>{category}</button>)}
        </div>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredProducts.map((product) => <button key={product.id} onClick={() => onOpenDetail({ title: product.title, category: product.category, image: product.images[0], metadata: [product.originRegion, `${product.priceEUR} €`].filter(Boolean), paragraphs: [product.description, product.craftDetails] })} className="overflow-hidden rounded-lg border border-[#E5E2DE] bg-white text-left shadow-sm transition hover:-translate-y-1 hover:border-[#002395] hover:shadow-md">{product.images[0] && <img src={product.images[0]} alt={product.title} className="h-64 w-full object-cover" />}<span className="block p-5 font-serif text-xl font-bold leading-tight text-[#1A1A1A]">{product.title}</span><span className="block px-5 pb-5 text-sm leading-relaxed text-[#4A443F]">{product.description}</span></button>)}
      </div>
      {filteredProducts.length === 0 && <p className="py-10 text-center text-sm text-[#7C746C]">Aucun contenu ne correspond à cette recherche.</p>}
    </section>
  );
};
