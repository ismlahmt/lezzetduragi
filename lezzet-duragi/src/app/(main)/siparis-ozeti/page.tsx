'use client';

import { useCart } from '@/features/cart/hooks/useCart';
import { mockBusinessInfo } from '@/shared/data/business-info';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { MessageCircle, Phone, ArrowLeft, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function OrderSummaryPage() {
  const { cart, clearCart } = useCart();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null; // Hydration önlemi

  if (cart.items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-32 text-center">
        <h2 className="text-3xl font-extrabold text-slate-800 mb-6">Sipariş bulunamadı.</h2>
        <Link href="/menu" className={cn(buttonVariants({ size: "lg" }), "h-14 px-8 text-lg font-bold rounded-2xl shadow-lg")}>Menüye Dön</Link>
      </div>
    );
  }

  // Sipariş Mesajı Oluşturucu (Fotoğraf 9 / 10 Kuralları)
  const generateWhatsAppMessage = () => {
    let msg = `*YENİ SİPARİŞ*\n\n`;
    msg += `*Sipariş Tipi:* ${cart.orderType.toUpperCase()}\n`;
    if (cart.orderType === 'masada') {
      msg += `*Masa No:* ${cart.tableNumber}\n`;
    }
    if (cart.customerName) msg += `*İsim:* ${cart.customerName}\n`;
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
  const phoneUrl = `tel:${mockBusinessInfo.phone.replace(/[^0-9+]/g, '')}`;

  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl pb-32">
      <div className="text-center mb-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="inline-flex items-center justify-center w-24 h-24 bg-green-100 rounded-full mb-6 shadow-sm">
          <CheckCircle2 className="w-12 h-12 text-green-600" suppressHydrationWarning />
        </div>
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-4">Sipariş Özeti</h1>
        <p className="text-lg text-slate-500">Siparişinizi işletmeye iletmek için aşağıdaki butonları kullanabilirsiniz.</p>
      </div>

      <div className="bg-white rounded-[2rem] p-8 md:p-10 shadow-xl border border-slate-100 mb-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
        <h3 className="text-2xl font-bold mb-6 border-b border-slate-100 pb-4">Detaylar</h3>
        
        <div className="space-y-4 mb-10 text-lg">
          <div className="flex justify-between items-center py-2">
            <span className="text-slate-500 font-medium">Sipariş Tipi</span>
            <span className="font-bold text-slate-900 capitalize">{cart.orderType}</span>
          </div>
          {cart.orderType === 'masada' && (
            <div className="flex justify-between items-center py-2">
              <span className="text-slate-500 font-medium">Masa Numarası</span>
              <span className="font-bold text-slate-900">{cart.tableNumber}</span>
            </div>
          )}
          {cart.customerName && (
            <div className="flex justify-between items-center py-2">
              <span className="text-slate-500 font-medium">Müşteri</span>
              <span className="font-bold text-slate-900">{cart.customerName}</span>
            </div>
          )}
        </div>

        <h3 className="text-2xl font-bold mb-6 border-b border-slate-100 pb-4">Ürünler</h3>
        <div className="space-y-5 mb-10 text-lg">
          {cart.items.map(item => (
            <div key={item.productId} className="flex justify-between items-start border-b border-slate-50 last:border-0 pb-3 last:pb-0">
              <div className="flex gap-3">
                <span className="font-bold text-primary">{item.quantity}x</span> 
                <span className="font-medium text-slate-800">{item.product.name}</span>
              </div>
              <span className="font-bold text-slate-900">{item.quantity * item.product.price} ₺</span>
            </div>
          ))}
        </div>
        
        <div className="flex justify-between items-center pt-8 border-t-2 border-slate-100">
          <span className="text-2xl font-bold text-slate-900">Genel Toplam</span>
          <span className="text-4xl font-black text-primary">{cart.totalPrice} ₺</span>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-5 animate-in fade-in slide-in-from-bottom-10 duration-700 delay-150">
        <a 
          href={whatsappUrl} 
          target="_blank" 
          rel="noopener noreferrer" 
          onClick={() => clearCart()}
          className={cn(buttonVariants({ size: "lg" }), "flex-1 h-16 text-xl font-bold bg-[#25D366] hover:bg-[#20b858] text-white rounded-2xl shadow-lg shadow-green-200 transition-all")}
        >
          <MessageCircle className="w-6 h-6 mr-3" suppressHydrationWarning /> WhatsApp'tan Gönder
        </a>
        <a 
          href={phoneUrl} 
          onClick={() => clearCart()}
          className={cn(buttonVariants({ size: "lg", variant: "outline" }), "flex-1 h-16 text-xl font-bold border-2 border-slate-200 text-slate-700 hover:bg-slate-50 rounded-2xl transition-all")}
        >
          <Phone className="w-6 h-6 mr-3" suppressHydrationWarning /> Telefonla Ara
        </a>
      </div>
      
      <div className="mt-10 text-center">
        <Link href="/menu" className="inline-flex items-center text-slate-500 hover:text-slate-900 font-semibold transition-colors">
          <ArrowLeft className="w-5 h-5 mr-2" suppressHydrationWarning /> Menüye Dön
        </Link>
      </div>
    </div>
  );
}
