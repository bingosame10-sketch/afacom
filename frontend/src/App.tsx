import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { TabType, Article, CartItem, FashionFabric, Product } from './types';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { AdminPanel } from './components/AdminPanel';
import { ArticlesView } from './components/ArticlesView';
import { ModeView } from './components/ModeView';
import { ProduitsView } from './components/ProduitsView';
import { ArticleModal } from './components/ArticleModal';
import { CartDrawer } from './components/CartDrawer';
import { HeritageQuizModal } from './components/HeritageQuizModal';
import { BespokeModal } from './components/BespokeModal';
import { AdminLogin } from './components/AdminLogin';
import { ContentDetail, ContentDetailModal } from './components/ContentDetailModal';
import { fetchArticles, fetchBannerImages, fetchFashionItems, fetchProducts } from './services/api';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('mode');
  const [isLanding, setIsLanding] = useState(true);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [articles, setArticles] = useState<Article[]>([]);
  const [bannerImages, setBannerImages] = useState<string[]>([]);
  const [fashionItems, setFashionItems] = useState<FashionFabric[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeReadingArticle, setActiveReadingArticle] = useState<Article | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [wishlistIds, setWishlistIds] = useState<string[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [isBespokeOpen, setIsBespokeOpen] = useState(false);
  const [activeContentDetail, setActiveContentDetail] = useState<ContentDetail | null>(null);
  const [adminSession, setAdminSession] = useState(() => window.localStorage.getItem('afacom_admin_token'));
  const [adminEmail, setAdminEmail] = useState(() => window.localStorage.getItem('afacom_admin_email') ?? '');

  const navigate = useNavigate();

  const loadData = async () => {
    try {
      setLoading(true);
      const results = await Promise.allSettled([
        fetchArticles(),
        fetchBannerImages(),
        fetchFashionItems(),
        fetchProducts(),
      ]);
      if (results[0].status === 'fulfilled') setArticles(results[0].value);
      if (results[1].status === 'fulfilled') setBannerImages(results[1].value);
      if (results[2].status === 'fulfilled') setFashionItems(results[2].value);
      if (results[3].status === 'fulfilled') setProducts(results[3].value);
    } catch (error) {
      console.error('Erreur :', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const changeTab = (tab: TabType) => {
    setActiveTab(tab);
    setIsLanding(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const addToCart = (product: Product, selectedSize?: string) => {
    setCartItems((items) => {
      const existing = items.find((item) => item.product.id === product.id && item.selectedSize === selectedSize);
      if (existing) {
        return items.map((item) => item === existing ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...items, { product, quantity: 1, selectedSize }];
    });
    setIsCartOpen(true);
  };

  const updateCartQuantity = (productId: string, delta: number, selectedSize?: string) => {
    setCartItems((items) => items
      .map((item) => item.product.id === productId && item.selectedSize === selectedSize
        ? { ...item, quantity: item.quantity + delta } : item)
      .filter((item) => item.quantity > 0));
  };

  const renderPublicContent = () => {
    const modeView = (
      <ModeView
        fabrics={fashionItems}
        looks={[]}
        setActiveTab={changeTab}
        onOpenQuiz={() => setIsQuizOpen(true)}
        onOpenBespoke={() => setIsBespokeOpen(true)}
        onOpenDetail={setActiveContentDetail}
        searchQuery={searchQuery}
      />
    );
    const articlesView = (
      <ArticlesView
        articles={articles}
        setActiveTab={changeTab}
        onOpenArticle={setActiveReadingArticle}
        onOpenDetail={setActiveContentDetail}
        searchQuery={searchQuery}
      />
    );
    const productsView = (
      <ProduitsView
        setActiveTab={changeTab}
        products={products}
        onAddToCart={addToCart}
        onToggleWishlist={(product) => setWishlistIds((ids) => ids.includes(product.id) ? ids.filter((id) => id !== product.id) : [...ids, product.id])}
        wishlistIds={wishlistIds}
        onOpenBespoke={() => setIsBespokeOpen(true)}
        onOpenDetail={setActiveContentDetail}
        currency="EUR"
        searchQuery={searchQuery}
      />
    );

    if (isLanding) {
      return (
        <div className="space-y-20">
          <section>{modeView}</section>
          <section>{articlesView}</section>
          <section>{productsView}</section>
        </div>
      );
    }

    if (activeTab === 'articles') {
      return articlesView;
    }
    if (activeTab === 'produits') {
      return productsView;
    }
    return modeView;
  };

  return (
    <div className="min-h-screen bg-[#FDFCFB] text-[#1A1A1A] flex flex-col justify-between font-sans">
      <Routes>
        {/* Route Publique : En-tête suivi IMMÉDIATEMENT de la bannière 3 images */}
        <Route
          path="/"
          element={
            <>
              {/* 1. En-tête du site */}
              <Header
                activeTab={activeTab}
                setActiveTab={changeTab}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                bannerImages={bannerImages}
              />

              <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-8">
                {loading ? (
                  <div className="min-h-[240px] flex items-center justify-center text-sm text-[#7C746C]">Chargement...</div>
                ) : renderPublicContent()}
              </main>

              <Footer setActiveTab={changeTab} onOpenQuiz={() => setIsQuizOpen(true)} onOpenBespoke={() => setIsBespokeOpen(true)} />

              <ArticleModal article={activeReadingArticle} onClose={() => setActiveReadingArticle(null)} setActiveTab={changeTab} />
              <ContentDetailModal content={activeContentDetail} onClose={() => setActiveContentDetail(null)} />
              <CartDrawer
                isOpen={isCartOpen}
                onClose={() => setIsCartOpen(false)}
                items={cartItems}
                onUpdateQuantity={updateCartQuantity}
                onRemoveItem={(productId, selectedSize) => setCartItems((items) => items.filter((item) => item.product.id !== productId || item.selectedSize !== selectedSize))}
                onClearCart={() => setCartItems([])}
                currency="EUR"
                onOpenBespoke={() => setIsBespokeOpen(true)}
              />
              <HeritageQuizModal isOpen={isQuizOpen} onClose={() => setIsQuizOpen(false)} setActiveTab={changeTab} fabrics={fashionItems} questions={[]} />
              <BespokeModal isOpen={isBespokeOpen} onClose={() => setIsBespokeOpen(false)} />
            </>
          }
        />

        {/* Route Administration : /admin */}
        <Route
          path="/admin"
          element={
            !adminSession ? (
              <AdminLogin
                onAuthenticated={(accessToken, email) => {
                  window.localStorage.setItem('afacom_admin_token', accessToken);
                  window.localStorage.setItem('afacom_admin_email', email);
                  setAdminSession(accessToken);
                  setAdminEmail(email);
                }}
              />
            ) : (
            <div className="min-h-screen bg-[#F7F6F5] flex flex-col justify-between">
              <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-8">
                <div className="flex justify-between items-center mb-6 pb-4 border-b border-[#E5E2DE]">
                  <h1 className="text-2xl font-serif font-bold text-[#002395]">
                    Administration AFACOM · {adminEmail}
                  </h1>
                  <div className="flex gap-2">
                    <button onClick={() => { window.localStorage.removeItem('afacom_admin_token'); window.localStorage.removeItem('afacom_admin_email'); setAdminSession(null); }} className="text-xs bg-[#7A1F1F] text-white px-4 py-2 font-mono uppercase tracking-wider">Se déconnecter</button>
                    <button onClick={() => navigate('/')} className="text-xs bg-[#1A1A1A] hover:bg-[#002395] text-white px-4 py-2 font-mono uppercase tracking-wider transition-colors">← Voir le site public</button>
                  </div>
                </div>

                <AdminPanel
                  articles={articles}
                  bannerImages={bannerImages}
                  onRefresh={loadData}
                />
              </main>
              <footer className="bg-white border-t border-[#E5E2DE] py-4 text-center text-xs text-gray-500 font-mono">
                Espace d'Administration • AFACOM
              </footer>
            </div>
            )
          }
        />
      </Routes>
    </div>
  );
}