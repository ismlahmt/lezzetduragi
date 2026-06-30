"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { User, Heart, ShoppingBag, LogOut, Package, Clock, MapPin, ChevronRight, CheckCircle2 } from 'lucide-react';
import { mockMenu } from '@/shared/data/menu';

export default function ProfilePage() {
  const router = useRouter();
  
  // TODO: Backend entegrasyonu (Mock UI durumu)
  const isAuthenticated = true;
  const user = { name: 'Kullanıcı', email: 'kullanici@mail.com', phone: '0555 555 5555' };
  
  const [activeTab, setActiveTab] = useState<'favorites' | 'orders'>('favorites');

  if (!isAuthenticated) return null;

  // Placeholder data
  const favoriteProducts = mockMenu.slice(0, 2);
  const userOrders: any[] = [];

  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Sidebar */}
        <div className="md:col-span-1 space-y-6">
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 text-center">
            <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 text-primary">
              <User className="w-12 h-12" />
            </div>
            <h2 className="text-xl font-bold text-slate-800">{user.name}</h2>
            <p className="text-sm text-slate-500 mb-6">{user.email}</p>
            
            <Button 
              variant="outline" 
              className="w-full text-red-500 hover:text-red-600 hover:bg-red-50 border-red-100 font-semibold"
              onClick={() => router.push('/')}
            >
              <LogOut className="w-4 h-4 mr-2" />
              Çıkış Yap
            </Button>
          </div>
          
          <div className="bg-white rounded-3xl p-4 shadow-sm border border-slate-100 flex flex-col gap-2">
            <button 
              onClick={() => setActiveTab('favorites')}
              className={`flex items-center gap-3 p-3 rounded-xl font-semibold transition-colors ${activeTab === 'favorites' ? 'bg-primary text-white' : 'text-slate-600 hover:bg-slate-50'}`}
            >
              <Heart className="w-5 h-5" />
              Favorilerim ({favoriteProducts.length})
            </button>
            <button 
              onClick={() => setActiveTab('orders')}
              className={`flex items-center gap-3 p-3 rounded-xl font-semibold transition-colors ${activeTab === 'orders' ? 'bg-primary text-white' : 'text-slate-600 hover:bg-slate-50'}`}
            >
              <ShoppingBag className="w-5 h-5" />
              Siparişlerim ({userOrders.length})
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="md:col-span-3">
          <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-100 min-h-[500px]">
            
            {activeTab === 'favorites' && (
              <div>
                <h3 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                  <Heart className="w-6 h-6 text-red-500 fill-red-500" /> 
                  Favori Lezzetlerim
                </h3>
                
                {favoriteProducts.length === 0 ? (
                  <div className="text-center py-12 text-slate-500">
                    <Heart className="w-16 h-16 mx-auto mb-4 text-slate-200" />
                    <p className="text-lg font-medium">Henüz favorilere eklediğin bir ürün yok.</p>
                    <Link href="/menu">
                      <Button className="mt-6">Menüyü İncele</Button>
                    </Link>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {favoriteProducts.map(product => (
                      <div key={product.id} className="flex gap-4 p-4 border border-slate-100 rounded-2xl items-center hover:shadow-md transition-shadow">
                        <img src={product.image} alt={product.name} className="w-20 h-20 rounded-xl object-cover" />
                        <div className="flex-1">
                          <h4 className="font-bold text-slate-800">{product.name}</h4>
                          <p className="text-primary font-black mt-1">{product.price} ₺</p>
                        </div>
                        <Link href="/menu">
                          <Button variant="outline" size="sm">İncele</Button>
                        </Link>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'orders' && (
              <div>
                <h3 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                  <ShoppingBag className="w-6 h-6 text-primary" /> 
                  Sipariş Geçmişim
                </h3>
                
                {userOrders.length === 0 ? (
                  <div className="text-center py-12 text-slate-500">
                    <ShoppingBag className="w-16 h-16 mx-auto mb-4 text-slate-200" />
                    <p className="text-lg font-medium">Henüz bir siparişin bulunmuyor.</p>
                    <Link href="/menu">
                      <Button className="mt-6">Sipariş Ver</Button>
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {userOrders.map(order => (
                      <div key={order.id} className="p-5 border border-slate-100 rounded-2xl">
                        <div className="flex justify-between items-center mb-4 pb-4 border-b border-slate-100">
                          <div>
                            <p className="text-sm font-semibold text-slate-500">Sipariş No</p>
                            <p className="font-bold text-slate-800">#{order.id}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-semibold text-slate-500">Tarih</p>
                            <p className="font-medium text-slate-700">{new Date(order.createdAt).toLocaleDateString('tr-TR')} {new Date(order.createdAt).toLocaleTimeString('tr-TR', {hour: '2-digit', minute:'2-digit'})}</p>
                          </div>
                        </div>
                        
                        <div className="space-y-2 mb-4">
                          {order.items.map((item: any, idx: number) => (
                            <div key={idx} className="flex justify-between text-sm">
                              <span><span className="font-semibold">{item.quantity}x</span> {item.product.name}</span>
                              <span className="font-medium">{item.product.price * item.quantity} ₺</span>
                            </div>
                          ))}
                        </div>
                        
                        <div className="flex justify-between items-center pt-4 border-t border-slate-100">
                          <span className={`px-3 py-1 rounded-full text-xs font-bold ${order.status === 'bekliyor' ? 'bg-amber-100 text-amber-700' : 'bg-green-100 text-green-700'}`}>
                            {order.status.toUpperCase()}
                          </span>
                          <p className="font-black text-lg text-primary">Toplam: {order.totalPrice} ₺</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

          </div>
        </div>

      </div>
    </div>
  );
}
