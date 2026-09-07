import React from 'react';
import { ArrowLeft, X } from 'lucide-react';

export interface ContentDetail {
  title: string;
  category?: string;
  image?: string;
  paragraphs: string[];
  metadata?: string[];
}

interface ContentDetailModalProps {
  content: ContentDetail | null;
  onClose: () => void;
}

export const ContentDetailModal: React.FC<ContentDetailModalProps> = ({ content, onClose }) => {
  if (!content) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 p-4 sm:p-8">
      <article className="mx-auto min-h-full max-w-3xl border border-[#1A1A1A] bg-[#FDFCFB] shadow-2xl">
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-[#E5E2DE] bg-white p-4">
          <button onClick={onClose} className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#1A1A1A] hover:text-[#002395]">
            <ArrowLeft className="h-4 w-4" /> Retour
          </button>
          <button onClick={onClose} aria-label="Fermer" className="flex h-8 w-8 items-center justify-center bg-[#1A1A1A] text-white hover:bg-[#002395]">
            <X className="h-4 w-4" />
          </button>
        </div>

        {content.image && <img src={content.image} alt={content.title} className="max-h-[420px] w-full object-cover" />}
        <div className="space-y-6 p-6 sm:p-10">
          {content.category && <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#002395]">{content.category}</p>}
          <h1 className="font-serif text-3xl font-bold text-[#1A1A1A] sm:text-4xl">{content.title}</h1>
          {content.metadata && content.metadata.length > 0 && (
            <div className="flex flex-wrap gap-2 border-y border-[#E5E2DE] py-3 text-xs text-[#7C746C]">
              {content.metadata.map((item) => <span key={item}>{item}</span>)}
            </div>
          )}
          <div className="space-y-5 text-sm leading-8 text-[#4A443F]">
            {content.paragraphs.filter(Boolean).map((paragraph, index) => <p key={`${content.title}-${index}`}>{paragraph}</p>)}
          </div>
        </div>
      </article>
    </div>
  );
};
