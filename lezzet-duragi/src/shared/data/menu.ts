import { Product } from '@/types';

export const mockMenu: Product[] = [
  // --- Başlangıçlar ---
  {
    id: '1', slug: 'mercimek-corbasi', name: 'Mercimek Çorbası', description: 'Sıcacık, ev yapımı süzme mercimek çorbası.', category: 'baslangic', price: 60, image: '/placeholder.svg', isAvailable: true, isPopular: true,
  },
  {
    id: '2', slug: 'ezogelin-corbasi', name: 'Ezogelin Çorbası', description: 'Nane ve pul biber soslu geleneksel lezzet.', category: 'baslangic', price: 60, image: '/placeholder.svg', isAvailable: true,
  },
  {
    id: '3', slug: 'gavurdagi-salata', name: 'Gavurdağı Salatası', description: 'Bol cevizli, nar ekşili ince kıyım salata.', category: 'baslangic', price: 120, image: '/placeholder.svg', isAvailable: true, allergens: ['ceviz'],
  },
  {
    id: '4', slug: 'haydari', name: 'Süzme Yoğurtlu Haydari', description: 'Dereotu ve sarımsaklı süzme yoğurt.', category: 'baslangic', price: 85, image: '/placeholder.svg', isAvailable: true, allergens: ['süt ürünleri'],
  },
  {
    id: '5', slug: 'icli-kofte', name: 'Kızarmış İçli Köfte', description: 'Cevizli ve kıymalı iç harcıyla (Adet).', category: 'baslangic', price: 75, image: '/placeholder.svg', isAvailable: false, allergens: ['ceviz', 'glüten'],
  },

  // --- Ana Yemekler ---
  {
    id: '6', slug: 'acili-kebap', name: 'Adana Kebap', description: 'Özel baharatlarla harmanlanmış zırh kebabı, köz sebzelerle.', category: 'ana-yemek', price: 280, image: '/placeholder.svg', isAvailable: true, isPopular: true, spicyLevel: 3,
  },
  {
    id: '7', slug: 'urfa-kebap', name: 'Urfa Kebap', description: 'Acısız, tam kıvamında zırh kebabı.', category: 'ana-yemek', price: 280, image: '/placeholder.svg', isAvailable: true,
  },
  {
    id: '8', slug: 'iskender', name: 'İskender Döner', description: 'Odun ateşinde pişmiş döner, özel tereyağı ve domates sosuyla.', category: 'ana-yemek', price: 320, image: '/placeholder.svg', isAvailable: true, isPopular: true, allergens: ['süt ürünleri', 'glüten'],
  },
  {
    id: '9', slug: 'lahmacun', name: 'Çıtır Lahmacun', description: 'İnce hamurlu, bol malzemeli lahmacun (Adet).', category: 'ana-yemek', price: 80, image: '/placeholder.svg', isAvailable: true, isPopular: true, allergens: ['glüten'], spicyLevel: 1,
  },
  {
    id: '10', slug: 'kasarli-pide', name: 'Kaşarlı Pide', description: 'Eritilmiş taze kaşar peynirli fırın pide.', category: 'ana-yemek', price: 180, image: '/placeholder.svg', isAvailable: true, allergens: ['süt ürünleri', 'glüten'],
  },
  {
    id: '11', slug: 'tavuk-sis', name: 'Tavuk Şiş', description: 'Özel sosla terbiye edilmiş tavuk göğsü, pilav ile.', category: 'ana-yemek', price: 220, image: '/placeholder.svg', isAvailable: true,
  },

  // --- Tatlılar ---
  {
    id: '12', slug: 'kunefe', name: 'Hatay Künefesi', description: 'Özel peynirli, şerbetli ve fıstıklı sıcak tatlı.', category: 'tatli', price: 150, image: '/placeholder.svg', isAvailable: true, isPopular: true, allergens: ['süt ürünleri', 'glüten', 'fıstık'],
  },
  {
    id: '13', slug: 'fistikli-baklava', name: 'Fıstıklı Baklava', description: 'İncecik açılmış hamuruyla Antep fıstıklı baklava (Porsiyon).', category: 'tatli', price: 180, image: '/placeholder.svg', isAvailable: true, allergens: ['glüten', 'fıstık'],
  },
  {
    id: '14', slug: 'sutlac', name: 'Fırın Sütlaç', description: 'Kavrulmuş fındık serpmeli fırınlanmış sütlaç.', category: 'tatli', price: 90, image: '/placeholder.svg', isAvailable: true, allergens: ['süt ürünleri', 'fındık'],
  },
  {
    id: '15', slug: 'katmer', name: 'Çıtır Katmer', description: 'Bol fıstıklı ve kaymaklı çıtır katmer tatlısı.', category: 'tatli', price: 200, image: '/placeholder.svg', isAvailable: false, allergens: ['süt ürünleri', 'glüten', 'fıstık'],
  },

  // --- İçecekler ---
  {
    id: '16', slug: 'yayik-ayrani', name: 'Yayık Ayranı', description: 'Bol köpüklü, buz gibi ev yapımı ayran.', category: 'icecek', price: 40, image: '/placeholder.svg', isAvailable: true, isPopular: true, allergens: ['süt ürünleri'],
  },
  {
    id: '17', slug: 'kutu-kola', name: 'Kutu Kola', description: '330ml kutu kola.', category: 'icecek', price: 45, image: '/placeholder.svg', isAvailable: true,
  },
  {
    id: '18', slug: 'acili-salgam', name: 'Acılı Şalgam Suyu', description: 'Adana yöresi, bardak şalgam.', category: 'icecek', price: 35, image: '/placeholder.svg', isAvailable: true, spicyLevel: 2,
  },
  {
    id: '19', slug: 'su', name: 'Su', description: '500ml pet şişe su.', category: 'icecek', price: 15, image: '/placeholder.svg', isAvailable: true,
  },
  {
    id: '20', slug: 'cay', name: 'İnce Belli Çay', description: 'Taze demlenmiş Rize çayı.', category: 'icecek', price: 20, image: '/placeholder.svg', isAvailable: true,
  }
];
