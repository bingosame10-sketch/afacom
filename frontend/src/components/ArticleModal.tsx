import React, { useState } from 'react';
import { Article, TabType } from '../types';
import { 
  X, 
  Clock, 
  Calendar, 
  MapPin, 
  Share2, 
  Bookmark, 
  Sparkles, 
  Volume2, 
  VolumeX, 
  Check, 
  Crown, 
  ArrowRight,
  BookOpen
} from 'lucide-react';

interface ArticleModalProps {
  article: Article | null;
  onClose: () => void;
  setActiveTab: (tab: TabType) => void;
}

export const ArticleModal: React.FC<ArticleModalProps> = ({
  article,
  onClose,
  setActiveTab
}) => {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [copied, setCopied] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  if (!article) return null;

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="bg-[#FDFCFB] max-w-4xl w-full border border-[#1A1A1A] shadow-2xl overflow-hidden animate-scaleUp my-8">
        {/* Top Control Bar */}
        <div className="p-4 sm:p-5 border-b border-[#E5E2DE] bg-white flex items-center justify-between sticky top-0 z-20">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold text-[#002395] uppercase tracking-[0.2em] bg-[#002395]/10 px-3 py-1 border border-[#002395]/20 font-mono">
              {article.category}
            </span>
            <span className="hidden sm:inline text-xs text-[#7C746C] font-mono">• {article.readTime}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsPlayingAudio(!isPlayingAudio)}
              className={`p-2 border transition-colors flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider cursor-pointer ${
                isPlayingAudio 
                  ? 'bg-[#002395] text-white border-[#002395]' 
                  : 'bg-[#FDFCFB] text-[#1A1A1A] border-[#E5E2DE] hover:bg-[#1A1A1A] hover:text-white'
              }`}
              title="Lecture audio du récit"
            >
              {isPlayingAudio ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-[#002395]" />}
              <span className="hidden md:inline">{isPlayingAudio ? 'Arrêter' : 'Écouter'}</span>
            </button>

            <button
              onClick={handleShare}
              className="p-2 bg-[#FDFCFB] text-[#1A1A1A] border border-[#E5E2DE] hover:bg-[#1A1A1A] hover:text-white transition-colors cursor-pointer"
              title="Copier le lien de l'article"
            >
              {copied ? <Check className="w-4 h-4 text-[#002395]" /> : <Share2 className="w-4 h-4" />}
            </button>

            <button
              onClick={() => setBookmarked(!bookmarked)}
              className={`p-2 border transition-colors cursor-pointer ${
                bookmarked ? 'bg-[#002395] text-white border-[#002395]' : 'bg-[#FDFCFB] text-[#1A1A1A] border-[#E5E2DE] hover:bg-[#1A1A1A] hover:text-white'
              }`}
              title="Sauvegarder l'article"
            >
              <Bookmark className="w-4 h-4" />
            </button>

            <button
              onClick={onClose}
              className="w-9 h-9 bg-[#1A1A1A] text-white flex items-center justify-center hover:bg-[#002395] transition-colors ml-2 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Audio notification bar if active */}
        {isPlayingAudio && (
          <div className="bg-[#1A1A1A] text-white px-6 py-2.5 flex items-center justify-between text-xs border-b border-[#333333]">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#002395] animate-ping" />
              <span>Lecture audio en cours : « Voix du Patrimoine Afro-Camerounais »</span>
            </div>
            <span className="font-mono text-[#6B8AFF]">02:14 / 07:30</span>
          </div>
        )}

        {/* Article Body */}
        <div className="p-6 sm:p-10 lg:p-14 space-y-8 max-h-[80vh] overflow-y-auto">
          {/* Main Title & Subtitle */}
          <div className="space-y-4">
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#1A1A1A] leading-[1.15]">
              {article.title}
            </h1>
            <p className="text-base sm:text-lg font-serif italic text-[#4A443F] leading-relaxed">
              {article.subtitle}
            </p>

            {/* Meta tags bar */}
            <div className="flex flex-wrap items-center gap-4 text-xs text-[#7C746C] pt-2 border-y border-[#E5E2DE] py-3">
              <div className="flex items-center gap-2">
                <img
                  src={article.author.avatar}
                  alt={article.author.name}
                  className="w-7 h-7 rounded-full object-cover border border-[#E5E2DE]"
                />
                <span className="font-bold text-[#1A1A1A]">{article.author.name}</span>
                <span className="text-[#7C746C]">({article.author.role})</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-[#002395]" />
                <span className="font-mono">{article.publishDate}</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-[#002395]" />
                <span>{article.region}</span>
              </div>
            </div>
          </div>

          {/* Cover Hero Image */}
          <div className="overflow-hidden shadow-lg aspect-16/9 border border-[#1A1A1A]">
            <img
              src={article.coverImage}
              alt={article.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Lead Paragraph with drop-cap feel */}
          <div className="text-base sm:text-lg text-[#1A1A1A] leading-relaxed bg-[#F2F0ED] p-6 border-l-4 border-[#002395] font-serif">
            {article.leadParagraph}
          </div>

          {/* Article Paragraphs */}
          <div className="space-y-5 text-sm sm:text-base text-[#2C2723] leading-relaxed font-normal">
            {article.content.map((p, idx) => (
              <p key={idx} className="leading-relaxed">
                {p}
              </p>
            ))}
          </div>

          {/* Key Historical Milestones Box */}
          <div className="bg-[#1A1A1A] text-[#E5E2DE] p-6 sm:p-8 border border-[#333333] space-y-4">
            <div className="flex items-center gap-2 text-white text-xs font-bold uppercase tracking-[0.2em] font-cinzel">
              <Crown className="w-4 h-4 text-[#002395]" />
              <span>Faits Historiques & Repères Chronologiques</span>
            </div>
            <h3 className="font-serif italic text-xl text-white">
              L'Essentiel à Transmettre
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm text-[#C8C2BA]">
              {article.historicalHighlights.map((highlight, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <span className="text-[#002395] font-bold text-base leading-none mt-0.5">•</span>
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 pt-4 border-t border-[#E5E2DE]">
            {article.tags.map((t, idx) => (
              <span key={idx} className="text-xs bg-[#F2F0ED] text-[#1A1A1A] px-3 py-1 font-mono uppercase border border-[#E5E2DE]">
                #{t}
              </span>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
};
