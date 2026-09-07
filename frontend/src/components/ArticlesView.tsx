import React, { useState } from 'react';
import { Article, TabType } from '../types';
import { ContentDetail } from './ContentDetailModal';

interface ArticlesViewProps {
  articles: Article[];
  setActiveTab: (tab: TabType) => void;
  onOpenArticle: (article: Article) => void;
  onOpenDetail: (content: ContentDetail) => void;
  searchQuery: string;
}

export const ArticlesView: React.FC<ArticlesViewProps> = ({ articles, onOpenDetail, searchQuery }) => {
  const [selectedCategory, setSelectedCategory] = useState('Toutes');
  const categories = ['Toutes', ...Array.from(new Set(articles.map((article) => article.category)))];
  const query = searchQuery.toLowerCase();
  const filteredArticles = articles.filter((article) => {
    const matchesCategory = selectedCategory === 'Toutes' || article.category === selectedCategory;
    const matchesSearch = !query || `${article.title} ${article.subtitle} ${article.region}`.toLowerCase().includes(query);
    return matchesCategory && matchesSearch;
  });

  if (articles.length === 0) return null;

  return (
    <section className="space-y-8">
      <div className="flex flex-col gap-4 border-b border-[#E5E2DE] pb-6 sm:flex-row sm:items-end sm:justify-between">
        <h1 className="font-serif text-3xl font-bold text-[#1A1A1A]">Histoire et Mémoire</h1>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button key={category} onClick={() => setSelectedCategory(category)} className={`rounded-md border px-3 py-2 text-xs font-bold uppercase tracking-wider ${selectedCategory === category ? 'border-[#1A1A1A] bg-[#1A1A1A] text-white' : 'border-[#E5E2DE] bg-white text-[#7C746C]'}`}>
              {category}
            </button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredArticles.map((article) => (
          <article key={article.id} className="overflow-hidden rounded-lg border border-[#E5E2DE] bg-white shadow-sm transition hover:-translate-y-1 hover:border-[#002395] hover:shadow-md">
            {article.coverImage && <img src={article.coverImage} alt={article.title} className="h-52 w-full object-cover" />}
            <button onClick={() => onOpenDetail({ title: article.title, category: article.category, image: article.coverImage, metadata: [article.publishDate, article.author.name].filter(Boolean), paragraphs: [article.leadParagraph, ...article.content] })} className="block p-5 text-left">
              <span className="text-xs font-bold uppercase tracking-wider text-[#002395]">{article.category}</span>
              <h2 className="mt-2 font-serif text-xl font-bold leading-tight text-[#1A1A1A]">{article.title}</h2>
              <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-[#4A443F]">{article.subtitle}</p>
            </button>
          </article>
        ))}
      </div>
      {filteredArticles.length === 0 && <p className="py-10 text-center text-sm text-[#7C746C]">Aucun contenu ne correspond à cette recherche.</p>}
    </section>
  );
};
