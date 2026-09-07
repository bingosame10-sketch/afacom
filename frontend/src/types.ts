export type TabType = 'mode' | 'articles' | 'produits';

export interface Article {
  id: string;
  title: string;
  subtitle: string;
  category: 'Histoire Royale' | 'Peuples & Civilisations' | 'Diaspora & Identité' | 'Art & Artisanat' | 'Figures Historiques';
  readTime: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  publishDate: string;
  coverImage: string;
  leadParagraph: string;
  content: string[];
  historicalHighlights: string[];
  historicalEra: string;
  region: string;
  relatedFabric?: string;
  tags: string[];
}

export interface FashionFabric {
  id: string;
  name: string;
  origin: string;
  meaning: string;
  symbolism: string;
  traditionalUse: string;
  modernStylingDiaspora: string;
  image: string;
  colors: string[];
  rarity: 'Patrimoine Royal' | 'Célébration Sacrée' | 'Cérémonie Côtière' | 'Prestige Sahélien' | 'Héritage Caribéen' | 'Prestige Panafricain';
}

export interface FashionLook {
  id: string;
  title: string;
  styleCategory: 'Gala & Cérémonie' | 'Mariage Diasporique' | 'Business Chic' | 'Casual Élégant' | 'Haute Couture';
  description: string;
  fabricsUsed: string[];
  image: string;
  stylingTips: string[];
  suitableOccasions: string[];
  designerCredit?: string;
}

export interface ForumComment {
  id: string;
  author: string;
  authorLocation: string;
  authorRole?: string;
  avatar: string;
  date: string;
  content: string;
  likes: number;
}

export interface ForumThread {
  id: string;
  title: string;
  category: 'Mode & Couturiers en France' | 'Histoire & Racines' | 'Mariages & Cérémonies' | 'Transmission & Famille' | 'Événements Culturels';
  author: {
    name: string;
    location: string;
    avatar: string;
    badge?: string;
  };
  createdAt: string;
  content: string;
  tags: string[];
  likes: number;
  commentsCount: number;
  comments: ForumComment[];
  pinned?: boolean;
}

export interface Product {
  id: string;
  title: string;
  category: 'Vêtements Homme' | 'Vêtements Femme' | 'Accessoires & Bijoux' | 'Tissus au Mètre' | 'Livres & Objets d\'Art';
  fabricType: 'Ndop Véritable' | 'Toghu Impérial' | 'Soie Wax' | 'Kaba Sawa' | 'Bronze & Perles' | 'Coton Tissé';
  priceEUR: number;
  description: string;
  craftDetails: string;
  originRegion: string;
  images: string[];
  inStock: boolean;
  isCustomTailorable?: boolean;
  sizes?: string[];
  rating: number;
  reviewsCount: number;
  featured?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize?: string;
}
