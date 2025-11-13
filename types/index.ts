export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  slug: string;
  inStock: boolean;
  description: string;
  sizes?: string[];
  colors?: string[];
}

export interface Category {
  slug: string;
  name: string;
  image: string;
  description?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
}