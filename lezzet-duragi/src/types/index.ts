// --- Menü Kategorileri ----------------------------------------------------
export type MenuCategory = string;

export interface Category {
  id: string;
  name: string;
  slug: string;
}

// --- Ürün -----------------------------------------------------------------
export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  category?: MenuCategory;
  categoryId: string;
  price: number;              // TL cinsinden
  image: string;
  isAvailable: boolean;
  isPopular?: boolean;
  allergens?: string[];
  spicyLevel?: 0 | 1 | 2 | 3;
  rating?: number;
  reviewCount?: number;
}

// --- Sepet ----------------------------------------------------------------
export interface CartItem {
  productId: string;
  product: Product;
  quantity: number;
  note?: string;              // Örn: 'Acısız olsun'
}

export type OrderType = 'masada' | 'paket' | 'gel-al';

export interface Cart {
  items: CartItem[];
  orderType: OrderType;
  tableNumber?: string;       // orderType === 'masada' ise zorunlu
  customerName?: string;
  customerPhone?: string;
  totalPrice: number;
}

// --- Sipariş Özeti / Yönlendirme ------------------------------------------
export interface OrderSummary {
  cart: Cart;
  createdAt: string;          // ISO 8601
  whatsappMessage: string;    // Otomatik oluşturulan mesaj metni
}

// --- İşletme Bilgisi ------------------------------------------------------
export interface DaySchedule {
  open: string;    // "10:00"
  close: string;   // "23:00"
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
  phone: string;              // tel: yönlendirmesi için
  whatsappNumber: string;     // wa.me yönlendirmesi için (E.164 formatı)
  workingHours: WorkingHours;
}
