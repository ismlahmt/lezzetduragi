import { mockMenu } from '@/shared/data/menu';
import { MenuClient } from '@/features/menu/components/MenuClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Menü | Lezzet Durağı',
  description: 'Taze malzemelerle hazırlanan nefis lezzetlerimizi inceleyin. Çorbalar, kebaplar, burgerler ve daha fazlası.',
};

// SSG yapılandırması (Fotoğraf 4'e uygun)
export const revalidate = 3600; 

export default function MenuPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-3">Menümüz</h1>
        <p className="text-lg text-slate-500">En taze malzemelerle hazırlanan eşsiz lezzetlerimizi keşfedin.</p>
      </div>
      
      <MenuClient initialProducts={mockMenu} />
    </div>
  );
}
