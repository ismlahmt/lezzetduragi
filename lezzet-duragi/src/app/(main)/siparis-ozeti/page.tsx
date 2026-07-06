'use client';

import { useCart } from '@/features/cart/hooks/useCart';
import { mockBusinessInfo } from '@/shared/data/business-info';
import { buttonVariants, Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { MessageCircle, Phone, ArrowLeft, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useDispatch } from 'react-redux';
import { addOrder, Order } from '@/features/orders/store/ordersSlice';

export default function OrderSummaryPage() {
  const { cart, clearCart } = useCart();
  const router = useRouter();
  const dispatch = useDispatch();
  
  // TODO: Backend entegrasyonu
  const isAuthenticated = true;
  const user = { name: 'Kullanıcı' };

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null; 

  if (cart.items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-32 text-center">
        <h2 className="text-3xl font-extrabold text-slate-800 mb-6">Sipariş bulunamadı.</h2>
        <Link href="/menu" className={cn(buttonVariants({ size: "lg" }), "h-14 px-8 text-lg font-bold rounded-2xl shadow-lg")}>Menüye Dön</Link>
      </div>
    );
  }

  const generateWhatsAppMessage = () => {
    let msg = `*YENİ SİPARİŞ*\n\n`;
    msg += `*Sipariş Tipi:* ${cart.orderType.toUpperCase()}\n`;
    if (cart.orderType === 'masada') {
      msg += `*Masa No:* ${cart.tableNumber}\n`;
    }
    if (user?.name || cart.customerName) msg += `*İsim:* ${user?.name || cart.customerName}\n`;
    if (cart.customerPhone) msg += `*Telefon:* ${cart.customerPhone}\n`;
    
    msg += `\n*Sipariş Detayı:*\n`;
    cart.items.forEach(item => {
      msg += `- ${item.quantity}x ${item.product.name} (${item.product.price * item.quantity} TL)\n`;
      if (item.note) msg += `  Not: ${item.note}\n`;
    });
    
    msg += `\n*Toplam Tutar:* ${cart.totalPrice} TL`;
    return encodeURIComponent(msg);
  };

  const whatsappUrl = `https://wa.me/${mockBusinessInfo.whatsappNumber.replace(/[^0-9]/g, '')}?text=${generateWhatsAppMessage()}`;

  const handleCheckout = (isWhatsapp: boolean = false) => {
    
    const newOrder: Order = {
      id: Math.random().toString(36).substring(2, 9).toUpperCase(),
      items: cart.items,
      totalPrice: cart.totalPrice,
      status: 'bekliyor',
      createdAt: new Date().toISOString(),
      orderType: cart.orderType
    };

    dispatch(addOrder(newOrder));

    if (isWhatsapp) {
      window.open(whatsappUrl, '_blank');
    }
    
    clearCart();
    toast.success('Sipariş başarıyla alındı!');
    router.push('/profil?tab=orders');
  };

  return (
    <div className="min-h-screen bg-slate-50/30 pb-32 relative">
      
      {/* Decorative Dark Header Background */}
      <div className="absolute top-0 left-0 w-full h-80 bg-slate-900 z-0 overflow-hidden rounded-b-[3rem]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/20 via-slate-900 to-slate-900"></div>
      </div>

      <div className="container mx-auto px-4 pt-16 relative z-10 max-w-3xl">
        <div className="text-center mb-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-white/10 backdrop-blur-md rounded-3xl mb-6 shadow-2xl border border-white/20 transform -rotate-3 hover:rotate-0 transition-transform duration-500">
            <CheckCircle2 className="w-12 h-12 text-primary" suppressHydrationWarning />
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-4 drop-shadow-lg">Sipariş Özeti</h1>
          <p className="text-lg text-slate-300 font-medium">Lütfen bilgilerinizi kontrol edip siparişinizi onaylayın.</p>
        </div>

        {!isAuthenticated && (
          <div className="bg-white p-6 rounded-2xl shadow-xl shadow-amber-500/10 border-2 border-amber-400 text-center mb-8 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="text-left">
              <h3 className="text-amber-600 font-black text-xl mb-1">Giriş Yapmanız Gerekiyor</h3>
              <p className="text-slate-500 font-medium">Siparişi onaylayabilmek için lütfen giriş yapın.</p>
            </div>
            <Link href="/login" className={cn(buttonVariants({ variant: "default" }), "font-bold rounded-xl bg-amber-500 hover:bg-amber-600 text-white shadow-lg shrink-0 h-12 px-8")}>
              Giriş Yap
            </Link>
          </div>
        )}

        {/* Receipt Card */}
        <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-2xl shadow-slate-200/50 border border-slate-100 mb-8 animate-in fade-in slide-in-from-bottom-8 duration-700 relative overflow-hidden">
          
          <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none"></div>

          <div className="mb-10">
            <h3 className="text-lg font-bold text-slate-400 uppercase tracking-wider mb-6">Sipariş Detayları</h3>
            <div className="space-y-4 bg-slate-50 rounded-2xl p-6 border border-slate-100">
              <div className="flex justify-between items-center py-1">
                <span className="text-slate-500 font-medium">Sipariş Tipi</span>
                <span className="font-bold text-slate-900 capitalize px-3 py-1 bg-white rounded-lg shadow-sm">{cart.orderType}</span>
              </div>
              {cart.orderType === 'masada' && (
                <div className="flex justify-between items-center py-1">
                  <span className="text-slate-500 font-medium">Masa Numarası</span>
                  <span className="font-bold text-slate-900 text-xl px-3 py-1 bg-white rounded-lg shadow-sm">{cart.tableNumber}</span>
                </div>
              )}
              {(user?.name || cart.customerName) && (
                <div className="flex justify-between items-center py-1">
                  <span className="text-slate-500 font-medium">Müşteri</span>
                  <span className="font-bold text-slate-900">{user?.name || cart.customerName}</span>
                </div>
              )}
            </div>
          </div>

          <div className="mb-10">
            <h3 className="text-lg font-bold text-slate-400 uppercase tracking-wider mb-6">Seçilen Lezzetler</h3>
            <div className="space-y-5">
              {cart.items.map(item => (
                <div key={item.productId} className="flex justify-between items-center group">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-orange-50 text-primary font-black text-sm group-hover:bg-primary group-hover:text-white transition-colors">
                      {item.quantity}
                    </span> 
                    <span className="font-bold text-slate-800 text-lg">{item.product.name}</span>
                  </div>
                  <span className="font-black text-slate-900 text-lg">{item.quantity * item.product.price} ₺</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex justify-between items-end pt-8 border-t-2 border-dashed border-slate-200">
            <span className="text-xl font-bold text-slate-500 uppercase tracking-wider">Genel Toplam</span>
            <span className="text-5xl font-black text-primary drop-shadow-sm">{cart.totalPrice} ₺</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-5 animate-in fade-in slide-in-from-bottom-10 duration-700 delay-150">
          <Button 
            onClick={() => handleCheckout(false)}
            className="flex-1 h-16 text-xl font-extrabold rounded-2xl shadow-[0_8px_30px_rgb(234,88,12,0.3)] hover:shadow-[0_8px_40px_rgb(234,88,12,0.5)] bg-primary hover:bg-primary/90 text-white transition-all hover:-translate-y-1"
            disabled={!isAuthenticated}
          >
            <CheckCircle2 className="w-6 h-6 mr-3" /> Siparişi Onayla
          </Button>
          <Button 
            onClick={() => handleCheckout(true)}
            variant="outline"
            className="flex-1 h-16 text-xl font-extrabold border-2 border-[#25D366] text-[#25D366] hover:bg-[#25D366] hover:text-white rounded-2xl shadow-lg transition-all hover:-translate-y-1"
            disabled={!isAuthenticated}
          >
            <MessageCircle className="w-6 h-6 mr-3" /> WhatsApp'tan Onayla
          </Button>
        </div>
        
        <div className="mt-10 text-center">
          <Link href="/sepet" className="inline-flex items-center text-slate-500 hover:text-slate-900 font-bold transition-colors">
            <ArrowLeft className="w-5 h-5 mr-2" /> Sepete Dön ve Değiştir
          </Link>
        </div>
      </div>
    </div>
  );
}
