import Link from 'next/link';
import { ShoppingBag, UtensilsCrossed } from 'lucide-react';
import { mockBusinessInfo } from '@/shared/data/business-info';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50/50">
      
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-slate-100 shadow-sm">
        <div className="container mx-auto px-4 h-24 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-4 hover:opacity-80 transition-opacity">
            <div className="w-12 h-12 bg-primary rounded-[1rem] flex items-center justify-center text-white shadow-lg shadow-primary/25">
              <UtensilsCrossed className="w-7 h-7" suppressHydrationWarning />
            </div>
            <span className="font-black text-2xl tracking-tight text-slate-900">{mockBusinessInfo.name}</span>
          </Link>

          <nav className="hidden md:flex items-center gap-10 font-bold text-slate-500 text-lg">
            <Link href="/" className="hover:text-primary transition-colors">Ana Sayfa</Link>
            <Link href="/menu" className="hover:text-primary transition-colors">Menü</Link>
            <Link href="/iletisim" className="hover:text-primary transition-colors">İletişim</Link>
          </nav>

          <Link href="/sepet" className="relative p-4 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-2xl transition-all hover:scale-105 hover:rotate-3 shadow-sm">
            <ShoppingBag className="w-6 h-6" suppressHydrationWarning />
            
          </Link>
        </div>
      </header>

<main className="flex-1">
        {children}
      </main>

<footer className="bg-slate-950 text-slate-400 py-16 mt-auto">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-10 text-center md:text-left">
          <div className="space-y-4">
            <h3 className="text-white font-extrabold text-2xl flex items-center gap-3 justify-center md:justify-start">
               <UtensilsCrossed className="w-6 h-6 text-primary" suppressHydrationWarning />
               {mockBusinessInfo.name}
            </h3>
            <p className="max-w-xs mx-auto md:mx-0 text-lg font-medium leading-relaxed">{mockBusinessInfo.address}</p>
          </div>
          <div className="space-y-4">
            <h3 className="text-white font-extrabold text-xl">Hızlı Menü</h3>
            <div className="flex flex-col gap-3 font-medium text-lg">
              <Link href="/menu" className="hover:text-primary transition-colors inline-block w-max mx-auto md:mx-0">Tüm Menü</Link>
              <Link href="/sepet" className="hover:text-primary transition-colors inline-block w-max mx-auto md:mx-0">Sepetim</Link>
              <Link href="/iletisim" className="hover:text-primary transition-colors inline-block w-max mx-auto md:mx-0">Bize Ulaşın</Link>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-white font-extrabold text-xl">İletişim</h3>
            <div className="flex flex-col gap-3 font-medium text-lg">
               <p>Tel: <a href={`tel:${mockBusinessInfo.phone.replace(/[^0-9+]/g, '')}`} className="hover:text-white transition-colors">{mockBusinessInfo.phone}</a></p>
               <p>WhatsApp: <a href={`https://wa.me/${mockBusinessInfo.whatsappNumber.replace(/[^0-9+]/g, '')}`} className="hover:text-white transition-colors">{mockBusinessInfo.whatsappNumber}</a></p>
            </div>
          </div>
        </div>
        <div className="text-center mt-16 pt-8 border-t border-slate-800 text-sm font-medium">
          &copy; {new Date().getFullYear()} {mockBusinessInfo.name}. Tüm hakları saklıdır.
        </div>
      </footer>
    </div>
  );
}
