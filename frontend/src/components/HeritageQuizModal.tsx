import React, { useState } from 'react';
import { FashionFabric, TabType } from '../types';
import { Sparkles, Crown, Check, ArrowRight, RotateCcw, X, ShoppingBag } from 'lucide-react';

interface HeritageQuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  setActiveTab: (tab: TabType) => void;
  fabrics: FashionFabric[];
  questions: Array<{
    question: string;
    options: Array<{ label: string; fabric: string }>;
  }>;
}

export const HeritageQuizModal: React.FC<HeritageQuizModalProps> = ({
  isOpen,
  onClose,
  setActiveTab,
  fabrics,
  questions,
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
  const [resultFabric, setResultFabric] = useState<FashionFabric | null>(null);

  if (!isOpen) return null;

  if (questions.length === 0) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
        <div className="w-full max-w-md bg-[#FDFCFB] border border-[#1A1A1A] p-8 text-center">
          <h3 className="font-serif text-xl font-bold text-[#1A1A1A]">Quiz en préparation</h3>
          <p className="mt-3 text-sm text-[#4A443F]">Les questions seront disponibles lorsque le contenu aura été ajouté.</p>
          <button onClick={onClose} className="mt-6 bg-[#1A1A1A] px-5 py-2 text-xs font-bold uppercase tracking-wider text-white">Fermer</button>
        </div>
      </div>
    );
  }

  const handleSelectOption = (fabricName: string) => {
    const updated = [...selectedAnswers, fabricName];
    setSelectedAnswers(updated);

    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Calculate top fabric
      const counts: Record<string, number> = {};
      updated.forEach((f) => {
        counts[f] = (counts[f] || 0) + 1;
      });
      const topName = Object.keys(counts).reduce((a, b) => (counts[a] > counts[b] ? a : b));
      
      const found = fabrics.find((fab) => 
        fab.name.toLowerCase().includes(topName.toLowerCase().split(' ')[0])
      ) || fabrics[0] || null;

      setResultFabric(found);
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setSelectedAnswers([]);
    setResultFabric(null);
  };

  const handleExploreBoutique = () => {
    onClose();
    setActiveTab('produits');
  };

  const handleExploreMode = () => {
    onClose();
    setActiveTab('mode');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-[#FDFCFB] max-w-xl w-full border border-[#1A1A1A] p-6 sm:p-8 shadow-2xl animate-scaleUp space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#E5E2DE] pb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#002395]/10 text-[#002395] flex items-center justify-center font-bold">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] font-mono text-[#002395] uppercase font-bold tracking-[0.2em] block">
                Diagnostic Textile & Culture
              </span>
              <h3 className="font-serif text-lg font-bold text-[#1A1A1A]">
                Quel Tissu Royal Incarne Votre Histoire ?
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

        {/* Quiz Steps or Result */}
        {!resultFabric ? (
          <div className="space-y-6">
            {/* Progress bar */}
            <div className="flex items-center justify-between text-xs text-[#7C746C] font-mono">
              <span>Question {currentStep + 1} sur {questions.length}</span>
              <div className="flex gap-1.5">
                {questions.map((_, i) => (
                  <div
                    key={i}
                    className={`w-6 h-1 transition-colors ${
                      i <= currentStep ? 'bg-[#002395]' : 'bg-[#E5E2DE]'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Question title */}
            <h4 className="font-serif text-xl font-bold text-[#1A1A1A] leading-snug">
              {questions[currentStep].question}
            </h4>

            {/* Options */}
            <div className="space-y-3">
              {questions[currentStep].options.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(option.fabric)}
                  className="w-full p-4 bg-white hover:bg-[#F2F0ED] border border-[#E5E2DE] hover:border-[#1A1A1A] text-left transition-all flex items-center justify-between group cursor-pointer shadow-xs"
                >
                  <div className="pr-4">
                    <div className="text-xs sm:text-sm font-bold text-[#1A1A1A] group-hover:text-[#002395] transition-colors">
                      {option.label}
                    </div>
                    <span className="text-[11px] text-[#7C746C] font-mono mt-0.5 block">
                      Région : {option.region}
                    </span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#7C746C] group-hover:text-[#002395] group-hover:translate-x-1 transition-all shrink-0" />
                </button>
              ))}
            </div>
          </div>
        ) : (
          /* Result Card */
          <div className="space-y-6 text-center animate-fadeIn">
            <div className="relative overflow-hidden shadow-lg h-52 border border-[#1A1A1A]">
              <img
                src={resultFabric.image}
                alt={resultFabric.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] via-black/30 to-transparent" />
              <div className="absolute bottom-3 left-4 right-4 text-left">
                <span className="text-[10px] text-white font-mono uppercase tracking-widest">
                  Votre Affinité Royale Révélée
                </span>
                <h4 className="text-xl font-serif font-bold text-white">
                  {resultFabric.name}
                </h4>
              </div>
            </div>

            <div className="bg-white p-5 border border-[#E5E2DE] text-left space-y-2">
              <span className="text-[11px] font-mono text-[#002395] font-bold uppercase">
                {resultFabric.origin}
              </span>
              <p className="text-xs sm:text-sm text-[#4A443F] leading-relaxed">
                {resultFabric.symbolism}
              </p>
              <div className="pt-2 border-t border-[#E5E2DE] text-xs text-[#7C746C]">
                <strong className="text-[#1A1A1A]">Conseil Diaspora : </strong>
                {resultFabric.modernStylingDiaspora}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={handleExploreBoutique}
                className="flex-1 py-3 bg-[#1A1A1A] hover:bg-[#002395] text-white text-xs font-bold uppercase tracking-wider shadow-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4 text-[#002395]" />
                <span>Voir les créations en boutique</span>
              </button>

              <button
                onClick={handleReset}
                className="px-4 py-3 bg-white text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white border border-[#1A1A1A] text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Recommencer</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
