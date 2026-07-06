"use client";

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { User, Heart, ShoppingBag, LogOut, Package, Clock, MapPin, ChevronRight, CheckCircle2 } from 'lucide-react';
import { mockMenu } from '@/shared/data/menu';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/shared/store';
import { logout } from '@/features/auth/store/authSlice';
import { cn } from '@/lib/utils';

export default function ProfilePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useDispatch();
  
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const authUser = useSelector((state: RootState) => state.auth.user);
  const favoriteIds = useSelector((state: RootState) => state.favorites.productIds);
  const userOrders = useSelector((state: RootState) => state.orders.orders);
  
  const user = authUser || { name: 'Misafir', email: '', phone: '' };
  
  const [activeTab, setActiveTab] = useState<'favorites' | 'orders'>('favorites');

  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab === 'orders' || tab === 'favorites') {
      setActiveTab(tab);
    }
  }, [searchParams]);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return null;
  }

  const favoriteProducts = mockMenu.filter(product => favoriteIds.includes(product.id));

  const handleLogout = () => {
    dispatch(logout());
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-slate-50/30 pb-32 relative">
      {/* Premium Banner Background */}
      <div className="absolute top-0 left-0 w-full h-72 bg-slate-900 z-0 overflow-hidden rounded-b-[3rem]">
         <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/20 via-slate-900 to-slate-900"></div>
      </div>

      <div className="container mx-auto px-4 pt-16 relative z-10 max-w-6xl">
        
        <div className="flex items-center justify-between mb-10">
          <h1 className="text-4xl font-black text-white drop-shadow-md">Profilim</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white/95 backdrop-blur-xl rounded-[2.5rem] p-6 shadow-2xl shadow-slate-200/50 border border-white text-center relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-br from-primary to-amber-500"></div>
              
              <div className="w-28 h-28 bg-white rounded-3xl flex items-center justify-center mx-auto mb-4 relative z-10 shadow-xl border-[6px] border-white mt-12 transform -rotate-6 hover:rotate-0 transition-transform duration-500">
                <User className="w-12 h-12 text-primary" />
              </div>
              <h2 className="text-2xl font-black text-slate-800">{user.name}</h2>
              <p className="text-sm text-slate-500 mb-8 font-medium">{user.email}</p>
              
              <Button 
                variant="outline" 
                className="w-full h-12 text-red-500 hover:text-white hover:bg-red-500 border-red-100 font-bold rounded-2xl transition-all duration-300"
                onClick={handleLogout}
              >
                <LogOut className="w-5 h-5 mr-2" />
                Çıkış Yap
              </Button>
            </div>
            
            <div className="bg-white/95 backdrop-blur-xl rounded-[2.5rem] p-4 shadow-2xl shadow-slate-200/50 border border-white flex flex-col gap-2">
              <button 
                onClick={() => setActiveTab('favorites')}
                className={cn("flex items-center gap-4 p-4 rounded-2xl font-bold transition-all duration-300 text-lg", activeTab === 'favorites' ? 'bg-primary text-white shadow-lg shadow-primary/30 translate-x-2' : 'text-slate-600 hover:bg-slate-50 hover:translate-x-1')}
              >
                <Heart className={cn("w-6 h-6", activeTab === 'favorites' ? 'fill-white' : '')} />
                Favorilerim
                <span className={cn("ml-auto text-sm py-1 px-3 rounded-full", activeTab === 'favorites' ? 'bg-white/20' : 'bg-slate-100')}>
                  {favoriteProducts.length}
                </span>
              </button>
              <button 
                onClick={() => setActiveTab('orders')}
                className={cn("flex items-center gap-4 p-4 rounded-2xl font-bold transition-all duration-300 text-lg", activeTab === 'orders' ? 'bg-primary text-white shadow-lg shadow-primary/30 translate-x-2' : 'text-slate-600 hover:bg-slate-50 hover:translate-x-1')}
              >
                <ShoppingBag className="w-6 h-6" />
                Siparişlerim
                <span className={cn("ml-auto text-sm py-1 px-3 rounded-full", activeTab === 'orders' ? 'bg-white/20' : 'bg-slate-100')}>
                  {userOrders.length}
                </span>
              </button>
            </div>
          </div>

          {/* Content Area */}
          <div className="lg:col-span-3">
            <div className="bg-white/95 backdrop-blur-xl rounded-[2.5rem] p-8 md:p-10 shadow-2xl shadow-slate-200/50 border border-white min-h-[600px] relative overflow-hidden">
              
              <div className="absolute top-0 right-0 w-64 h-64 bg-slate-50 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>

              {activeTab === 'favorites' && (
                <div className="animate-in fade-in slide-in-from-right-8 duration-500 relative z-10">
                  <h3 className="text-3xl font-black text-slate-800 mb-8 flex items-center gap-3">
                    <Heart className="w-8 h-8 text-red-500 fill-red-500 drop-shadow-sm" /> 
                    Favori Lezzetlerim
                  </h3>
                  
                  {favoriteProducts.length === 0 ? (
                    <div className="text-center py-20 text-slate-500 bg-slate-50 rounded-[2rem] border border-slate-100">
                      <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
                        <Heart className="w-10 h-10 text-slate-300" />
                      </div>
                      <p className="text-xl font-bold text-slate-700 mb-2">Favoriniz yok</p>
                      <p className="text-lg font-medium text-slate-500 mb-8">Henüz favorilere eklediğin bir ürün yok.</p>
                      <Link href="/menu">
                        <Button size="lg" className="h-14 px-8 text-lg font-bold rounded-2xl shadow-lg hover:shadow-primary/30 transition-all">Menüyü İncele</Button>
                      </Link>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {favoriteProducts.map(product => (
                        <div key={product.id} className="group flex gap-5 p-5 bg-white border border-slate-100 rounded-[2rem] items-center hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden">
                          <div className="w-24 h-24 rounded-2xl overflow-hidden shrink-0 shadow-inner">
                            <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-extrabold text-lg text-slate-800 line-clamp-1 mb-1 group-hover:text-primary transition-colors">{product.name}</h4>
                            <p className="text-primary font-black text-lg mb-3">{product.price} ₺</p>
                            <Link href={`/menu/${product.slug}`}>
                              <Button variant="outline" size="sm" className="rounded-xl font-bold hover:bg-primary hover:text-white border-slate-200">İncele <ChevronRight className="w-4 h-4 ml-1" /></Button>
                            </Link>
                          </div>
                          
                          <button className="absolute top-4 right-4 p-2 bg-slate-50 rounded-full text-red-500 hover:bg-red-50 hover:scale-110 transition-all">
                            <Heart className="w-5 h-5 fill-red-500" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'orders' && (
                <div className="animate-in fade-in slide-in-from-right-8 duration-500 relative z-10">
                  <h3 className="text-3xl font-black text-slate-800 mb-8 flex items-center gap-3">
                    <ShoppingBag className="w-8 h-8 text-primary drop-shadow-sm" /> 
                    Sipariş Geçmişim
                  </h3>
                  
                  {userOrders.length === 0 ? (
                    <div className="text-center py-20 text-slate-500 bg-slate-50 rounded-[2rem] border border-slate-100">
                      <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
                        <ShoppingBag className="w-10 h-10 text-slate-300" />
                      </div>
                      <p className="text-xl font-bold text-slate-700 mb-2">Siparişiniz yok</p>
                      <p className="text-lg font-medium text-slate-500 mb-8">Henüz bir siparişin bulunmuyor.</p>
                      <Link href="/menu">
                        <Button size="lg" className="h-14 px-8 text-lg font-bold rounded-2xl shadow-lg hover:shadow-primary/30 transition-all">Sipariş Ver</Button>
                      </Link>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {userOrders.map(order => (
                        <div key={order.id} className="p-6 md:p-8 bg-white border border-slate-100 rounded-[2rem] shadow-sm hover:shadow-lg transition-all duration-300 group">
                          <div className="flex justify-between items-center mb-6 pb-6 border-b border-slate-50">
                            <div>
                              <p className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-1">Sipariş No</p>
                              <p className="font-black text-xl text-slate-800">#{order.id}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-1">Tarih</p>
                              <p className="font-bold text-slate-700">{new Date(order.createdAt).toLocaleDateString('tr-TR')} <span className="text-slate-400 ml-1">{new Date(order.createdAt).toLocaleTimeString('tr-TR', {hour: '2-digit', minute:'2-digit'})}</span></p>
                            </div>
                          </div>
                          
                          <div className="space-y-3 mb-6 bg-slate-50 p-5 rounded-2xl">
                            {order.items.map((item: any, idx: number) => (
                              <div key={idx} className="flex justify-between items-center">
                                <div className="flex items-center gap-3">
                                  <span className="flex items-center justify-center w-7 h-7 rounded bg-white text-slate-700 font-bold shadow-sm">{item.quantity}</span>
                                  <span className="font-bold text-slate-700">{item.product.name}</span>
                                </div>
                                <span className="font-black text-slate-900">{item.product.price * item.quantity} ₺</span>
                              </div>
                            ))}
                          </div>
                          
                          <div className="flex justify-between items-center pt-2">
                            <span className={cn("px-4 py-2 rounded-xl text-sm font-black tracking-wide uppercase", order.status === 'bekliyor' ? 'bg-amber-100 text-amber-700' : 'bg-green-100 text-green-700')}>
                              {order.status === 'bekliyor' ? 'Hazırlanıyor' : 'Tamamlandı'}
                            </span>
                            <div className="text-right">
                              <span className="text-sm font-bold text-slate-400 uppercase tracking-wider mr-3">Toplam</span>
                              <span className="font-black text-3xl text-primary">{order.totalPrice} ₺</span>
                            </div>
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
    </div>
  );
}
