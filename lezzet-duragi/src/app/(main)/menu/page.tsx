import { mockMenu } from '@/shared/data/menu';
import { MenuClient } from '@/features/menu/components/MenuClient';
import { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Menü | Lezzet Durağı',
  description: 'Taze malzemelerle hazırlanan nefis lezzetlerimizi inceleyin. Çorbalar, kebaplar, burgerler ve daha fazlası.',
};

export const revalidate = 3600; 

export default function MenuPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-3">Menümüz</h1>
        <p className="text-lg text-slate-500">En taze malzemelerle hazırlanan eşsiz lezzetlerimizi keşfedin.</p>
      </div>
      
      <Suspense fallback={<div className="text-center py-20">Yükleniyor...</div>}>
        <MenuClient initialProducts={mockMenu} />
      </Suspense>
    </div>
  );
}
