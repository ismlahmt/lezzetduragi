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
    <div className="pb-32 bg-slate-50/30">
      
      {/* Menu Hero Banner */}
      <div className="relative pt-16 pb-24 px-4 bg-slate-900 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/20 via-slate-900 to-slate-900"></div>
        {/* Decorative blobs */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent"></div>
        
        <div className="container mx-auto relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-800/80 border border-slate-700 text-slate-300 font-semibold mb-6 text-sm backdrop-blur-sm">
            ✨ Her lokmada ayrı bir serüven
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight mb-6 drop-shadow-lg">
            Lezzet <span className="text-primary">Menüsü</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto font-medium leading-relaxed">
            Ödüllü şeflerimizin ellerinden çıkan, taptaze malzemelerle hazırlanan benzersiz tatlarımızı keşfetmeye hazır mısınız?
          </p>
        </div>
      </div>

      <div className="-mt-8 relative z-20">
        <Suspense fallback={<div className="text-center py-20 text-slate-500 font-medium">Lezzetler Yükleniyor...</div>}>
          <MenuClient initialProducts={mockMenu} />
        </Suspense>
      </div>
    </div>
  );
}
