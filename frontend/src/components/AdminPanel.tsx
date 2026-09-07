import React, { useState } from 'react';
import { Article } from '../types';
import { updateBannerImages, createArticle, deleteArticle } from '../services/api';

interface AdminPanelProps {
  articles: Article[];
  bannerImages: string[];
  onRefresh: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ articles, bannerImages, onRefresh }) => {
  const [activeAdminTab, setActiveAdminTab] = useState<'mode' | 'histoire' | 'boutique' | 'banner'>('mode');
  const [images, setImages] = useState<string[]>(bannerImages);

  // Champs du formulaire Article
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<any>('Histoire Royale');
  const [coverImage, setCoverImage] = useState('');
  const [leadParagraph, setLeadParagraph] = useState('');

  // Champ image pour la boutique
  const [productImage, setProductImage] = useState('');

  // Fonction pour convertir le fichier image importé de la galerie en Base64
  const handleImageUpload = (file: File, callback: (base64: string) => void) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === 'string') {
        callback(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSaveBanner = async () => {
    try {
      await updateBannerImages(images);
      alert('Bannière mise à jour avec succès !');
      onRefresh();
    } catch (error) {
      alert('Erreur lors de la mise à jour de la bannière');
    }
  };

  const handleCreateArticle = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createArticle({
        title: newTitle,
        category: newCategory,
        cover_image: coverImage,
        lead_paragraph: leadParagraph,
        author: { name: 'Admin', role: 'Éditeur', avatar: '' },
        content: [leadParagraph],
        tags: ['Admin'],
      });
      setNewTitle('');
      setCoverImage('');
      setLeadParagraph('');
      alert('Article créé avec succès !');
      onRefresh();
    } catch (error) {
      alert('Erreur lors de la création de l\'article');
    }
  };

  const handleDeleteArticle = async (id: string) => {
    if (confirm('Voulez-vous vraiment supprimer cet article ?')) {
      try {
        await deleteArticle(id);
        onRefresh();
      } catch (error) {
        alert('Erreur lors de la suppression');
      }
    }
  };

  return (
    <div className="bg-white border border-[#E5E2DE] p-6 shadow-sm rounded-sm">
      {/* Navigation par Onglets Admin */}
      <div className="flex border-b border-[#E5E2DE] mb-6 space-x-2 overflow-x-auto">
        <button
          onClick={() => setActiveAdminTab('mode')}
          className={`pb-3 px-4 text-xs font-mono uppercase tracking-wider font-bold border-b-2 transition-colors whitespace-nowrap ${
            activeAdminTab === 'mode' ? 'border-[#002395] text-[#002395]' : 'border-transparent text-gray-500 hover:text-black'
          }`}
        >
          Section Mode
        </button>
        <button
          onClick={() => setActiveAdminTab('histoire')}
          className={`pb-3 px-4 text-xs font-mono uppercase tracking-wider font-bold border-b-2 transition-colors whitespace-nowrap ${
            activeAdminTab === 'histoire' ? 'border-[#002395] text-[#002395]' : 'border-transparent text-gray-500 hover:text-black'
          }`}
        >
          Section Histoire
        </button>
        <button
          onClick={() => setActiveAdminTab('boutique')}
          className={`pb-3 px-4 text-xs font-mono uppercase tracking-wider font-bold border-b-2 transition-colors whitespace-nowrap ${
            activeAdminTab === 'boutique' ? 'border-[#002395] text-[#002395]' : 'border-transparent text-gray-500 hover:text-black'
          }`}
        >
          Section Boutique
        </button>
        <button
          onClick={() => setActiveAdminTab('banner')}
          className={`pb-3 px-4 text-xs font-mono uppercase tracking-wider font-bold border-b-2 transition-colors whitespace-nowrap ${
            activeAdminTab === 'banner' ? 'border-[#002395] text-[#002395]' : 'border-transparent text-gray-500 hover:text-black'
          }`}
        >
          Bannière (3 Images)
        </button>
      </div>

      {/* Mode & Histoire : Création d'Articles avec importation depuis la galerie */}
      {(activeAdminTab === 'mode' || activeAdminTab === 'histoire') && (
        <div className="space-y-6">
          <div className="p-4 border border-[#E5E2DE] bg-[#FDFCFB]">
            <h3 className="font-serif font-bold text-lg text-[#1A1A1A] mb-4">
              Ajouter un article ({activeAdminTab.toUpperCase()})
            </h3>
            <form onSubmit={handleCreateArticle} className="space-y-4">
              <div>
                <label className="block text-xs font-mono uppercase text-gray-600 mb-1">Titre de l'article</label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full border border-[#E5E2DE] p-2 text-sm bg-white focus:outline-none focus:border-[#002395]"
                  placeholder="Entrez le titre..."
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-gray-600 mb-1">Catégorie</label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value as any)}
                  className="w-full border border-[#E5E2DE] p-2 text-sm bg-white focus:outline-none focus:border-[#002395]"
                >
                  <option value="Histoire Royale">Histoire Royale</option>
                  <option value="Peuples & Civilisations">Peuples & Civilisations</option>
                  <option value="Diaspora & Identité">Diaspora & Identité</option>
                  <option value="Art & Artisanat">Art & Artisanat</option>
                  <option value="Figures Historiques">Figures Historiques</option>
                </select>
              </div>

              {/* Importation d'image depuis la galerie */}
              <div>
                <label className="block text-xs font-mono uppercase text-gray-600 mb-1">
                  Image d'illustration (Galerie)
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleImageUpload(file, setCoverImage);
                  }}
                  className="w-full text-xs text-gray-600 file:mr-4 file:py-2 file:px-4 file:border-0 file:text-xs file:font-mono file:bg-[#1A1A1A] file:text-white hover:file:bg-[#002395] cursor-pointer"
                />
                {coverImage && (
                  <div className="mt-3 h-32 w-48 border border-[#E5E2DE] overflow-hidden rounded-sm relative">
                    <img src={coverImage} alt="Aperçu article" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => setCoverImage('')}
                      className="absolute top-1 right-1 bg-red-600 text-white text-[10px] px-1.5 py-0.5 rounded"
                    >
                      ✕
                    </button>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-gray-600 mb-1">Résumé / Extrait</label>
                <textarea
                  value={leadParagraph}
                  onChange={(e) => setLeadParagraph(e.target.value)}
                  className="w-full border border-[#E5E2DE] p-2 text-sm bg-white h-24 focus:outline-none focus:border-[#002395]"
                  placeholder="Texte d'introduction..."
                />
              </div>

              <button type="submit" className="bg-[#002395] text-white px-5 py-2 text-xs font-mono uppercase tracking-wider font-bold hover:bg-[#1A1A1A] transition-colors">
                Enregistrer l'article
              </button>
            </form>
          </div>

          {/* Liste des articles enregistrés */}
          <div className="p-4 border border-[#E5E2DE] bg-[#FDFCFB]">
            <h3 className="font-serif font-bold text-lg text-[#1A1A1A] mb-3">
              Articles Enregistrés ({articles.length})
            </h3>
            <div className="divide-y divide-[#E5E2DE] max-h-96 overflow-y-auto">
              {articles.length === 0 ? (
                <p className="text-sm text-gray-500 py-2">Aucun article enregistré.</p>
              ) : (
                articles.map((item) => (
                  <div key={item.id} className="py-3 flex items-center justify-between gap-4 text-sm">
                    <div className="flex items-center gap-3">
                      {item.coverImage ? (
                        <img src={item.coverImage} alt={item.title} className="w-12 h-12 object-cover border rounded-sm" />
                      ) : (
                        <div className="w-12 h-12 bg-gray-200 border rounded-sm flex items-center justify-center text-[10px] text-gray-500 font-mono">Sans img</div>
                      )}
                      <div>
                        <p className="font-bold text-[#1A1A1A]">{item.title}</p>
                        <span className="text-xs font-mono text-gray-500">{item.category}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => handleDeleteArticle(item.id)}
                      className="text-red-600 hover:text-red-800 text-xs font-mono uppercase font-bold"
                    >
                      Supprimer
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* Onglet Boutique avec Importation d'Image */}
      {activeAdminTab === 'boutique' && (
        <div className="p-4 border border-[#E5E2DE] bg-[#FDFCFB] space-y-4">
          <h3 className="font-serif font-bold text-lg text-[#1A1A1A]">Gestion des Produits (Boutique)</h3>
          <div>
            <label className="block text-xs font-mono uppercase text-gray-600 mb-1">
              Image du Produit (Galerie)
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleImageUpload(file, setProductImage);
              }}
              className="w-full text-xs text-gray-600 file:mr-4 file:py-2 file:px-4 file:border-0 file:text-xs file:font-mono file:bg-[#1A1A1A] file:text-white hover:file:bg-[#002395] cursor-pointer"
            />
            {productImage && (
              <div className="mt-3 h-32 w-48 border border-[#E5E2DE] overflow-hidden rounded-sm relative">
                <img src={productImage} alt="Aperçu produit" className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => setProductImage('')}
                  className="absolute top-1 right-1 bg-red-600 text-white text-[10px] px-1.5 py-0.5 rounded"
                >
                  ✕
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Onglet Bannière : 3 Images depuis la galerie */}
      {activeAdminTab === 'banner' && (
        <div className="p-4 border border-[#E5E2DE] bg-[#FDFCFB] space-y-4">
          <h3 className="font-serif font-bold text-lg text-[#1A1A1A]">
            Gestion des 3 images de la bannière
          </h3>
          <p className="text-xs text-gray-600">
            Sélectionne une image depuis ton appareil pour chacune des trois cases.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[0, 1, 2].map((idx) => (
              <div key={idx} className="space-y-2 border border-[#E5E2DE] p-3 bg-white">
                <label className="block text-xs font-mono uppercase text-gray-600 font-bold">
                  Image {idx + 1}
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      handleImageUpload(file, (base64) => {
                        const updated = [...images];
                        updated[idx] = base64;
                        setImages(updated);
                      });
                    }
                  }}
                  className="w-full text-xs text-gray-600 file:mr-2 file:py-1 file:px-2 file:border-0 file:text-xs file:font-mono file:bg-[#1A1A1A] file:text-white hover:file:bg-[#002395] cursor-pointer"
                />

                {images[idx] ? (
                  <div className="h-32 border border-[#E5E2DE] overflow-hidden rounded-sm relative mt-2">
                    <img
                      src={images[idx]}
                      alt={`Bannière ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const updated = [...images];
                        updated[idx] = '';
                        setImages(updated);
                      }}
                      className="absolute top-1 right-1 bg-red-600 text-white text-[10px] px-1.5 py-0.5 rounded"
                    >
                      ✕
                    </button>
                  </div>
                ) : (
                  <div className="h-32 border border-dashed border-[#E5E2DE] flex items-center justify-center text-[10px] text-gray-400 font-mono">
                    Aucune image sélectionnée
                  </div>
                )}
              </div>
            ))}
          </div>

          <button
            onClick={handleSaveBanner}
            className="bg-[#002395] text-white px-5 py-2 text-xs font-mono uppercase tracking-wider font-bold hover:bg-[#1A1A1A] transition-colors"
          >
            Enregistrer la bannière
          </button>
        </div>
      )}
    </div>
  );
};