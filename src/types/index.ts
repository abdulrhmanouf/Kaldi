export interface MenuItem {
  id: string;
  name: { ar: string; en: string };
  description: { ar: string; en: string };
  price: { small?: number; medium: number; large?: number };
  category: MenuCategory;
  image: string;
  popular?: boolean;
  new?: boolean;
  calories?: number;
  caffeine?: string;
  allergens?: string[];
  ingredients?: { ar: string; en: string };
}

export type MenuCategory = 'espresso' | 'hot' | 'iced' | 'signature' | 'tea' | 'desserts' | 'bakery';

export interface Review {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  text: { ar: string; en: string };
  date: string;
  verified: boolean;
}

export interface GalleryImage {
  id: string;
  src: string;
  alt: { ar: string; en: string };
  category: GalleryCategory;
}

export type GalleryCategory = 'atmosphere' | 'drinks' | 'food' | 'events' | 'team';

export interface TeamMember {
  id: string;
  name: string;
  role: { ar: string; en: string };
  image: string;
  bio: { ar: string; en: string };
}

export interface BlogPost {
  id: string;
  title: { ar: string; en: string };
  excerpt: { ar: string; en: string };
  content: { ar: string; en: string };
  image: string;
  category: BlogCategory;
  author: string;
  date: string;
  readTime: number;
}

export type BlogCategory = 'brewing' | 'beans' | 'lifestyle' | 'recipes' | 'events';

export interface LoyaltyMember {
  id: string;
  name: string;
  points: number;
  level: LoyaltyLevel;
  joinedDate: string;
}

export type LoyaltyLevel = 'bronze' | 'silver' | 'gold' | 'platinum';

export interface Reservation {
  id: string;
  name: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  occasion: string;
  specialRequests?: string;
  status: 'pending' | 'confirmed' | 'cancelled';
}
