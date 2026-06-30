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
    <div className="container mx-auto px-4 py-8 max-w-5xl pb-32">
      <div className="flex items-center mb-8 gap-4">
        <Link href="/menu" className="p-3 bg-slate-100 rounded-2xl hover:bg-slate-200 transition-colors">
          <ArrowLeft className="w-6 h-6 text-slate-700" />
        </Link>
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Sepetim</h1>
      </div>

      {isCartEmpty ? (
        <div className="flex flex-col items-center justify-center py-24 bg-white rounded-[2rem] border border-slate-100 shadow-sm">
          <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mb-6">
            <ShoppingBag className="w-12 h-12 text-slate-300" />
          </div>
          <p className="text-2xl font-bold text-slate-800 mb-2">Sepetiniz Boş</p>
          <p className="text-lg text-slate-500 mb-8">Henüz sepetinize hiçbir lezzet eklemediniz.</p>
          <Link href="/menu" className={cn(buttonVariants({ size: "lg" }), "rounded-2xl h-14 px-8 text-lg font-bold shadow-lg")}>
            Menüyü İncele
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7 space-y-8">
            {/* Ürün Listesi */}
            <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden divide-y divide-slate-50">
              {cart.items.map((item) => (
                <div key={item.productId} className="p-5 sm:p-6 flex flex-col sm:flex-row gap-5 items-start sm:items-center hover:bg-slate-50/50 transition-colors">
                  <div className="relative w-28 h-28 rounded-2xl overflow-hidden bg-slate-100 shrink-0 border border-slate-200/50">
                    <div className="absolute inset-0 flex items-center justify-center">
                       <span className="text-xs text-slate-400 font-medium">Görsel</span>
                    </div>
                  </div>
                  
                  <div className="flex-1 w-full">
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="font-extrabold text-xl text-slate-900">{item.product.name}</h3>
                      <button 
                        onClick={() => removeFromCart(item.productId)}
                        className="text-slate-400 hover:text-red-500 hover:bg-red-50 p-2 rounded-xl transition-all"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                    
                    <p className="font-bold text-lg text-primary mb-5">{item.product.price} ₺</p>
                    
                    <div className="flex justify-between items-center w-full">
                      <QuantityStepper 
                        quantity={item.quantity} 
                        onChange={(q) => updateQuantity(item.productId, q)} 
                      />
                      <span className="font-bold text-slate-900 bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-sm">
                        Satır: {item.product.price * item.quantity} ₺
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <OrderTypeSelector />
          </div>

          <div className="lg:col-span-5">
            {/* Sipariş Özeti */}
            <div className="bg-slate-900 text-white rounded-[2rem] p-8 shadow-2xl sticky top-8">
              <h3 className="text-2xl font-extrabold mb-8 border-b border-slate-700/50 pb-6">Sipariş Özeti</h3>
              <div className="space-y-4 mb-8 text-lg">
                <div className="flex justify-between text-slate-300 font-medium">
                  <span>Ara Toplam</span>
                  <span className="text-white">{cart.totalPrice} ₺</span>
                </div>
                {cart.orderType === 'paket' && (
                  <div className="flex justify-between text-slate-400 text-sm">
                    <span>Paket Servis Ücreti</span>
                    <span className="text-white">0 ₺</span>
                  </div>
                )}
              </div>
              <div className="flex justify-between items-center border-t border-slate-700/50 pt-8 mb-10">
                <span className="text-xl font-bold">Genel Toplam</span>
                <span className="text-4xl font-black text-primary">{cart.totalPrice} ₺</span>
              </div>

              <Button 
                size="lg" 
                className="w-full h-16 rounded-2xl text-xl font-extrabold shadow-xl hover:shadow-primary/30 transition-all duration-300"
                disabled={isSubmitDisabled}
                onClick={handleSubmit}
              >
                Siparişi Tamamla
              </Button>
              {isMasadaEmpty && (
                <div className="mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-center animate-in fade-in slide-in-from-top-2">
                  <p className="text-red-400 font-medium text-sm">Masada sipariş için masa numarası zorunludur.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
