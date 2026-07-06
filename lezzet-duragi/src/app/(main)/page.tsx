import { mockMenu, mockCategories } from '@/shared/data/menu';
import { ProductCard } from '@/features/menu/components/ProductCard';
import { CategoryCarousel } from '@/components/home/CategoryCarousel';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import Image from 'next/image';
import { Truck, ChefHat, Leaf, ArrowRight } from 'lucide-react';

export default function HomePage() {
  const popularProducts = mockMenu.filter(p => p.isPopular).slice(0, 3);

  return (
    <div className="pb-32">
      
      {/* 1. Hero Section (2 Columns) */}
      <section className="bg-orange-50/50 dark:bg-slate-900 py-16 md:py-24 px-4 relative overflow-hidden transition-colors duration-300">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-orange-100/80 via-orange-50/20 to-transparent dark:from-orange-900/20 dark:via-slate-900 dark:to-slate-900"></div>
        <div className="container mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-8">
            
            {/* Left Content */}
            <div className="flex-1 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-100 dark:bg-orange-950/30 text-orange-600 dark:text-orange-400 font-bold mb-6 text-sm md:text-base shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-500">
                🔥 Sıcacık Lezzetler Kapınızda
              </div>
              <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6 animate-in fade-in slide-in-from-bottom-8 duration-700 text-slate-800 dark:text-slate-100 leading-tight">
                Gerçek Lezzet<br/>
                <span className="text-primary drop-shadow-sm">Kapına Gelsin</span>
              </h1>
              <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 mb-8 font-medium leading-relaxed max-w-xl mx-auto lg:mx-0">
                En taze malzemelerle hazırlanan benzersiz tatlarımızı keşfet. Sipariş ver, dakikalar içinde sıcacık kapında olsun!
              </p>
              <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
                <Link href="/menu" className={cn(buttonVariants({ size: "lg" }), "w-full sm:w-auto h-14 px-8 text-lg font-extrabold rounded-full bg-primary hover:bg-primary/90 text-white shadow-[0_8px_30px_rgb(234,88,12,0.3)] hover:shadow-[0_8px_40px_rgb(234,88,12,0.5)] transition-all hover:-translate-y-1")}>
                  Hemen Sipariş Ver
                </Link>
                <Link href="#categories" className="w-full sm:w-auto h-14 px-8 flex items-center justify-center gap-2 text-slate-600 dark:text-slate-300 font-bold hover:text-primary transition-colors">
                  Kategorileri Gör <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>

            {/* Right Image */}
            <div className="flex-1 w-full max-w-lg lg:max-w-none relative animate-in fade-in zoom-in-95 duration-1000 delay-200">
              <div className="relative aspect-square w-full max-w-md mx-auto">
                {/* Decorative background blob */}
                <div className="absolute inset-0 bg-primary/20 dark:bg-primary/10 rounded-full blur-3xl transform scale-90"></div>
                
                {/* Main Hero Image - we use a juicy burger image we already have */}
                <img 
                  src="/images/burgers/doublesmash.jpg" 
                  alt="Delicious Burger" 
                  className="relative z-10 w-full h-full object-cover rounded-full shadow-2xl border-8 border-white dark:border-slate-800 transform rotate-3 hover:rotate-0 transition-transform duration-700"
                />
                
                {/* Floating Badges */}
                <div className="absolute top-10 -left-6 z-20 bg-white dark:bg-slate-800 p-3 rounded-2xl shadow-xl flex items-center gap-3 animate-bounce" style={{animationDuration: '3s'}}>
                  <span className="text-3xl">🍔</span>
                  <div className="text-sm">
                    <p className="font-bold text-slate-800 dark:text-white">Gerçek Et</p>
                    <p className="text-slate-500 font-medium">100% Doğal</p>
                  </div>
                </div>
                
                <div className="absolute bottom-10 -right-6 z-20 bg-white dark:bg-slate-800 p-3 rounded-2xl shadow-xl flex items-center gap-3 animate-bounce" style={{animationDuration: '4s', animationDelay: '1s'}}>
                  <span className="text-3xl">⭐</span>
                  <div className="text-sm">
                    <p className="font-bold text-slate-800 dark:text-white">4.9/5</p>
                    <p className="text-slate-500 font-medium">Müşteri Puanı</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. Categories Section */}
      <section id="categories" className="container mx-auto px-4 mt-20 scroll-mt-32">
        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight text-center mb-10">Ne Yemeli?</h2>
        
        {/* Render Carousel with all categories */}
        <CategoryCarousel categories={mockCategories} />
      </section>

      {/* 3. Why Us Section */}
      <section className="bg-slate-900 text-white mt-24 py-20 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4">Neden Lezzet Durağı?</h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">Sadece doyurmak için değil, mutlu etmek için çalışıyoruz. İşimizin sırrı taptaze malzemeler ve ustalıkta gizli.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="text-center p-6 bg-slate-800/50 rounded-3xl border border-slate-700 hover:bg-slate-800 transition-colors">
              <div className="w-16 h-16 mx-auto bg-primary/20 text-primary rounded-2xl flex items-center justify-center mb-6">
                <Truck className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-3">Süper Hızlı Teslimat</h3>
              <p className="text-slate-400 font-medium">Siparişin fırından çıktığı gibi, en fazla 30 dakikada sıcacık kapında.</p>
            </div>
            
            <div className="text-center p-6 bg-slate-800/50 rounded-3xl border border-slate-700 hover:bg-slate-800 transition-colors">
              <div className="w-16 h-16 mx-auto bg-green-500/20 text-green-400 rounded-2xl flex items-center justify-center mb-6">
                <Leaf className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-3">Günlük & Taze Malzemeler</h3>
              <p className="text-slate-400 font-medium">Asla dondurulmuş ürün kullanmıyor, tüm yeşillik ve sebzeleri günlük alıyoruz.</p>
            </div>
            
            <div className="text-center p-6 bg-slate-800/50 rounded-3xl border border-slate-700 hover:bg-slate-800 transition-colors">
              <div className="w-16 h-16 mx-auto bg-amber-500/20 text-amber-400 rounded-2xl flex items-center justify-center mb-6">
                <ChefHat className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-3">Ödüllü Şefler</h3>
              <p className="text-slate-400 font-medium">Her bir tarifimiz, alanında uzman ve ödüllü şeflerimizin elinden çıkıyor.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Popular Products Section */}
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
