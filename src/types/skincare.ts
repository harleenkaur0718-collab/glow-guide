export type ProductCategory = 'all' | 'cleansers' | 'serums' | 'moisturizers' | 'sunscreen' | 'treatments';

export type SkinType = 'all' | 'dry' | 'oily' | 'combination' | 'sensitive' | 'normal';

export type SkinConcern = 'hydration' | 'radiance' | 'barrier' | 'anti-aging' | 'texture' | 'blemishes';

export interface Product {
  id: string;
  name: string;
  subtitle: string;
  category: ProductCategory;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  image: string;
  sizes: string[];
  skinTypes: SkinType[];
  concerns: SkinConcern[];
  description: string;
  keyActives: string[];
  fullIngredients: string;
  howToUse: string;
  ritualStep: 'Cleanse' | 'Tone' | 'Treat' | 'Moisturize' | 'Protect';
  volume: string;
  inStock: boolean;
  isBestSeller?: boolean;
  clinicalResult?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize: string;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  title: string;
  comment: string;
  skinType: string;
  date: string;
  verified: boolean;
}

export interface Ingredient {
  name: string;
  scientificName: string;
  purpose: string;
  benefit: string;
  idealFor: string;
  phRange?: string;
  source: string;
}

export interface RoutineStep {
  step: number;
  stepName: string;
  timing: 'am' | 'pm' | 'both';
  product: Product;
  whyItWorks: string;
}
