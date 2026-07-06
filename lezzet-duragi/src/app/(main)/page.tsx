import { mockMenu } from '@/shared/data/menu';
import { ProductCard } from '@/features/menu/components/ProductCard';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export default function HomePage() {
  const popularProducts = mockMenu.filter(p => p.isPopular).slice(0, 3);

  return (
    <div className="pb-32">
      
      <section className="bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white py-24 px-4 text-center relative overflow-hidden transition-colors duration-300">
        <div className="absolute inset-0 opacity-[0.04] dark:opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-900 via-slate-50 to-slate-50 dark:from-white dark:via-slate-900 dark:to-slate-900"></div>
        <div className="relative z-10 max-w-4xl mx-auto">
          <h1 className="text-6xl md:text-8xl font-black tracking-tight mb-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
            Lezzetin Durağına<br/>
            <span className="text-primary">Hoş Geldiniz</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 mb-12 font-medium leading-relaxed">
            En taze malzemelerle hazırlanan benzersiz tatlarımızı hemen keşfedin, kapınıza kadar gelsin.
          </p>
          <Link href="/menu" className={cn(buttonVariants({ size: "lg" }), "h-16 px-12 text-xl font-extrabold rounded-full shadow-2xl shadow-primary/20 hover:shadow-primary/40 dark:shadow-primary/30 dark:hover:shadow-primary/50 transition-all hover:scale-105")}>
            Hemen Sipariş Ver
          </Link>
        </div>
      </section>

<section className="container mx-auto px-4 mt-24">
        <div className="flex justify-between items-end mb-12 border-b border-slate-200 pb-4">
          <div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">Öne Çıkanlar</h2>
            <p className="text-slate-500 mt-3 text-xl font-medium">Müşterilerimizin vazgeçilmez favorileri</p>
          </div>
          <Link href="/menu" className="hidden sm:inline-flex text-primary font-bold hover:underline underline-offset-4 text-lg">
            Tüm Menüyü Gör &rarr;
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {popularProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}
