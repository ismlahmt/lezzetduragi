'use client';

import { useCart } from '@/features/cart/hooks/useCart';
import { QuantityStepper } from '@/features/cart/components/QuantityStepper';
import { OrderTypeSelector } from '@/features/cart/components/OrderTypeSelector';
import { Button, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Trash2, ArrowLeft, ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart } = useCart();
  const router = useRouter();

  const isCartEmpty = cart.items.length === 0;
  const isMasadaEmpty = cart.orderType === 'masada' && !cart.tableNumber?.trim();
  const isSubmitDisabled = isCartEmpty || isMasadaEmpty;

  const handleSubmit = () => {
    if (isSubmitDisabled) return;
    toast.success('Sipariş özeti sayfasına yönlendiriliyorsunuz...');
    router.push('/siparis-ozeti');
  };

  return (
    <div className="pb-32 bg-slate-50/30">
      
      {/* Hero Banner */}
      <div className="relative pt-12 pb-28 px-4 bg-slate-900 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/20 via-slate-900 to-slate-900"></div>
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent"></div>
        
        <div className="container mx-auto max-w-6xl relative z-10 flex items-center gap-5">
          <Link href="/menu" className="p-3.5 bg-white/10 hover:bg-white/20 text-white rounded-2xl backdrop-blur-md transition-colors border border-white/10 shadow-lg">
            <ArrowLeft className="w-6 h-6" suppressHydrationWarning />
          </Link>
          <div>
            <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight drop-shadow-md">Sepetim</h1>
            <p className="text-slate-400 mt-2 font-medium">Seçtiğiniz lezzetler burada.</p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-12 relative z-20 max-w-6xl">
        {isCartEmpty ? (
          <div className="flex flex-col items-center justify-center py-24 bg-white/80 backdrop-blur-xl rounded-[2.5rem] border border-white shadow-2xl">
            <div className="w-28 h-28 bg-orange-50 rounded-[2rem] flex items-center justify-center mb-8 shadow-inner border border-orange-100/50">
              <ShoppingBag className="w-14 h-14 text-primary" suppressHydrationWarning />
            </div>
            <p className="text-3xl font-black text-slate-800 mb-3 tracking-tight">Sepetiniz Boş</p>
            <p className="text-lg text-slate-500 mb-10 font-medium">Henüz sepetinize hiçbir lezzet eklemediniz.</p>
            <Link href="/menu" className={cn(buttonVariants({ size: "lg" }), "rounded-2xl h-14 px-10 text-lg font-bold shadow-[0_8px_25px_rgb(234,88,12,0.3)] bg-primary hover:bg-primary/90 text-white hover:-translate-y-1 transition-all duration-300")}>
              Menüyü İncele
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            <div className="lg:col-span-7 space-y-6">
              
              <div className="space-y-4">
                {cart.items.map((item) => (
                  <div key={item.productId} className="p-5 md:p-6 flex flex-col sm:flex-row gap-5 items-start sm:items-center bg-white rounded-3xl border border-slate-100 shadow-md shadow-slate-200/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                    <div className="relative w-28 h-28 rounded-2xl overflow-hidden bg-slate-50 shrink-0 border border-slate-100 shadow-inner">
                      <div className="absolute inset-0 flex items-center justify-center">
                         <img src={item.product.image} className="w-full h-full object-cover" alt={item.product.name} />
                      </div>
                    </div>
                    
                    <div className="flex-1 w-full">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-extrabold text-xl text-slate-900 line-clamp-1">{item.product.name}</h3>
                        <button 
                          onClick={() => removeFromCart(item.productId)}
                          className="text-slate-400 hover:text-red-500 hover:bg-red-50 p-2.5 rounded-xl transition-colors shrink-0"
                        >
                          <Trash2 className="w-5 h-5" suppressHydrationWarning />
                        </button>
                      </div>
                      
                      <p className="font-black text-lg text-primary mb-4">{item.product.price} ₺</p>
                      
                      <div className="flex justify-between items-center w-full">
                        <QuantityStepper 
                          quantity={item.quantity} 
                          onChange={(q) => updateQuantity(item.productId, q)} 
                        />
                        <span className="font-bold text-slate-800 bg-slate-50 px-4 py-2 rounded-xl border border-slate-100 shadow-sm text-sm md:text-base">
                          Toplam: {item.product.price * item.quantity} ₺
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <OrderTypeSelector />
            </div>

            <div className="lg:col-span-5">
              <div className="bg-slate-900 text-white rounded-[2.5rem] p-8 md:p-10 shadow-2xl sticky top-8 border-4 border-slate-800 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
                
                <h3 className="text-2xl font-black mb-8 border-b border-slate-700/50 pb-6 relative z-10 flex items-center gap-3">
                  <ShoppingBag className="w-6 h-6 text-primary" /> Özeti
                </h3>
                
                <div className="space-y-5 mb-8 text-lg relative z-10">
                  <div className="flex justify-between text-slate-300 font-medium">
                    <span>Ara Toplam</span>
                    <span className="text-white font-bold">{cart.totalPrice} ₺</span>
                  </div>
                  {cart.orderType === 'paket' && (
                    <div className="flex justify-between text-slate-400 text-sm">
                      <span>Paket Servis Ücreti</span>
                      <span className="text-white font-bold">0 ₺</span>
                    </div>
                  )}
                </div>
                
                <div className="flex justify-between items-center border-t border-slate-700/50 pt-8 mb-10 relative z-10">
                  <span className="text-xl font-bold">Genel Toplam</span>
                  <span className="text-4xl font-black text-primary">{cart.totalPrice} ₺</span>
                </div>

                <Button 
                  size="lg" 
                  className="w-full h-16 rounded-2xl text-xl font-extrabold shadow-[0_8px_30px_rgb(234,88,12,0.4)] hover:shadow-[0_8px_40px_rgb(234,88,12,0.6)] transition-all duration-300 hover:-translate-y-1 relative z-10"
                  disabled={isSubmitDisabled}
                  onClick={handleSubmit}
                >
                  Siparişi Tamamla
                </Button>
                
                {isMasadaEmpty && (
                  <div className="mt-5 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-center animate-in fade-in slide-in-from-top-2 relative z-10">
                    <p className="text-red-400 font-bold text-sm">Masada sipariş için masa numarası zorunludur.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
