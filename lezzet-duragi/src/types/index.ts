
export type MenuCategory = string;

export interface Category {
  id: string;
  name: string;
  slug: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  category?: MenuCategory;
  categoryId: string;
  price: number;
  image: string;
  isAvailable: boolean;
  isPopular?: boolean;
  allergens?: string[];
  spicyLevel?: 0 | 1 | 2 | 3;
  rating?: number;
  reviewCount?: number;
}

export interface CartItem {
  productId: string;
  product: Product;
  quantity: number;
  note?: string;
}

export type OrderType = 'masada' | 'paket' | 'gel-al';

export interface Cart {
  items: CartItem[];
  orderType: OrderType;
  tableNumber?: string;
  customerName?: string;
  customerPhone?: string;
  totalPrice: number;
}

export interface OrderSummary {
  cart: Cart;
  createdAt: string;
  whatsappMessage: string;
}

export interface DaySchedule {
  open: string;
  close: string;
  isClosed?: boolean;
}

export interface WorkingHours {
  mon: DaySchedule; tue: DaySchedule; wed: DaySchedule; thu: DaySchedule;
  fri: DaySchedule; sat: DaySchedule; sun: DaySchedule;
}

export interface BusinessInfo {
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  phone: string;
  whatsappNumber: string;
  workingHours: WorkingHours;
}
