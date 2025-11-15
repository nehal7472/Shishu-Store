export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  images?: string[];
  features?: string[];
  category: string;
  slug: string;
  inStock: boolean;
  description: string;
  sizes?: string[];
  colors?: string[];
  rating?: number;
  reviews?: number;
  sku?: string;
}

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  size?: string;
  color?: string;
  slug: string;
  category: string;
}

export interface CartState {
  items: CartItem[];
  totalQuantity: number;
  totalAmount: number;
  isOpen: boolean;
}
