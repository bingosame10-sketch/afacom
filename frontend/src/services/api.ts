import { Article, FashionFabric, Product } from '../types';

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:5000/api';

const adminHeaders = (): Record<string, string> => {
  const token = window.localStorage.getItem('afacom_admin_token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const loginAdmin = async (email: string, password: string) => {
  const response = await fetch(`${API_URL}/admin/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  const result = await response.json();
  if (!response.ok) throw new Error(result.error ?? 'Connexion impossible');
  return result as { accessToken: string; email: string };
};

// --- Bannières ---
export const fetchBannerImages = async () => {
  const response = await fetch(`${API_URL}/settings/banner`);
  if (!response.ok) {
    throw new Error('Erreur lors de la récupération de la bannière');
  }
  return response.json();
};

export const updateBannerImages = async (bannerImages: string[]) => {
  const response = await fetch(`${API_URL}/settings/banner`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', ...adminHeaders() },
    body: JSON.stringify({ bannerImages }),
  });
  if (!response.ok) {
    throw new Error('Erreur lors de la mise à jour de la bannière');
  }
  return response.json();
};

// --- Articles ---
export const fetchArticles = async (): Promise<Article[]> => {
  const response = await fetch(`${API_URL}/articles`);
  if (!response.ok) {
    throw new Error('Erreur lors de la récupération des articles');
  }
  const records = await response.json();
  return records.map((record: any) => ({
    id: record.id,
    title: record.title,
    subtitle: record.subtitle ?? record.excerpt ?? '',
    category: record.category ?? 'Histoire Royale',
    readTime: record.read_time ?? '',
    author: record.author ?? { name: 'AFAC AHEAD', role: 'Rédaction', avatar: '' },
    publishDate: record.publish_date ?? record.created_at ?? '',
    coverImage: record.coverImage ?? record.cover_image_url ?? record.cover_image ?? '',
    leadParagraph: record.leadParagraph ?? record.lead_paragraph ?? record.excerpt ?? '',
    content: Array.isArray(record.content) ? record.content : [record.content ?? ''],
    historicalHighlights: record.historical_highlights ?? [],
    historicalEra: record.historical_era ?? '',
    region: record.region ?? '',
    relatedFabric: record.related_fabric,
    tags: record.tags ?? [],
  }));
};

export const createArticle = async (articleData: any) => {
  const response = await fetch(`${API_URL}/articles`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...adminHeaders() },
    body: JSON.stringify(articleData),
  });
  if (!response.ok) {
    throw new Error('Erreur lors de la création de l\'article');
  }
  return response.json();
};

export const updateArticle = async (id: string, articleData: any) => {
  const response = await fetch(`${API_URL}/articles/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', ...adminHeaders() },
    body: JSON.stringify(articleData),
  });
  if (!response.ok) {
    throw new Error('Erreur lors de la mise à jour de l\'article');
  }
  return response.json();
};

export const deleteArticle = async (id: string) => {
  const response = await fetch(`${API_URL}/articles/${id}`, {
    method: 'DELETE',
    headers: adminHeaders(),
  });
  if (!response.ok) {
    throw new Error('Erreur lors de la suppression de l\'article');
  }
  return response.json();
};

// --- Produits & Forum ---
export const fetchProducts = async (): Promise<Product[]> => {
  const response = await fetch(`${API_URL}/products`);
  if (!response.ok) {
    throw new Error('Erreur lors de la récupération des produits');
  }
  const records = await response.json();
  return records.map((record: any) => ({
    id: record.id,
    title: record.title ?? record.name,
    category: record.category ?? 'Accessoires & Bijoux',
    fabricType: record.fabric_type ?? 'Coton Tissé',
    priceEUR: Number(record.price ?? record.price_eur ?? 0),
    description: record.description ?? '',
    craftDetails: record.craft_details ?? '',
    originRegion: record.origin_region ?? '',
    images: record.images ?? (record.image_url ? [record.image_url] : []),
    inStock: record.in_stock ?? Number(record.stock ?? 0) > 0,
    isCustomTailorable: record.is_custom_tailorable ?? false,
    sizes: record.sizes ?? [],
    rating: Number(record.rating ?? 0),
    reviewsCount: Number(record.reviews_count ?? 0),
    featured: record.featured ?? false,
  }));
};

export const fetchFashionItems = async (): Promise<FashionFabric[]> => {
  const response = await fetch(`${API_URL}/fashion`);
  if (!response.ok) {
    throw new Error('Erreur lors de la récupération des contenus mode');
  }
  const records = await response.json();
  return records.map((record: any) => ({
    id: record.id,
    name: record.title,
    origin: record.category ?? '',
    meaning: record.description ?? '',
    symbolism: record.description ?? '',
    traditionalUse: '',
    modernStylingDiaspora: '',
    image: record.image_url ?? '',
    colors: [],
    rarity: 'Prestige Panafricain',
  }));
};

export const fetchForumThreads = async () => {
  const response = await fetch(`${API_URL}/forum`);
  if (!response.ok) {
    throw new Error('Erreur lors de la récupération du forum');
  }
  return response.json();
};