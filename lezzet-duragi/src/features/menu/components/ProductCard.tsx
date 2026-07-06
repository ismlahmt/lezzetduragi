'use client';

import Image from 'next/image';
import { useCart } from '@/features/cart/hooks/useCart';
import { Product } from '@/types';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Flame, Star, Heart } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/shared/store';
import { toggleFavorite } from '@/features/favorites/store/favoritesSlice';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const dispatch = useDispatch();
  const { addToCart } = useCart();
  
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const favoriteIds = useSelector((state: RootState) => state.favorites.productIds);
  const isFavorite = favoriteIds.includes(product.id);
  
  const isAvailable = product.isAvailable;

  const handleAddToCart = () => {
    addToCart(product, 1);
    toast.success(`${product.name} sepete eklendi!`);
  };

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!isAuthenticated) {
      toast.error('Favorilere eklemek için giriş yapmalısınız.');
      return;
    }
    
    dispatch(toggleFavorite(product.id));
    toast.success(!isFavorite ? 'Favorilere eklendi!' : 'Favorilerden çıkarıldı');
  };

  return (
    <div className={cn(
      "group relative flex flex-col rounded-[2rem] bg-white shadow-sm border border-slate-100 overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 hover:border-primary/20",
      !isAvailable && "opacity-60 grayscale-[0.5]"
    )}>
      
      {/* Image Section */}
      <div className="relative h-56 md:h-64 w-full bg-slate-50 overflow-hidden">
        <Link href={`/menu/${product.slug}`}>
          <div className="relative w-full h-full">
            <img 
              src={product.image} 
              alt={product.name} 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
              loading="lazy"
            />
            {/* Dark Gradient Overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />
          </div>
        </Link>

        {/* Floating Price Badge */}
        <div className="absolute bottom-4 left-5 z-10 transform transition-transform duration-500 group-hover:translate-y-[-4px]">
          <span className="inline-flex items-baseline px-4 py-1.5 rounded-2xl bg-white/95 backdrop-blur-md text-slate-900 shadow-xl border border-white/20">
            <span className="font-black text-xl">{product.price}</span>
            <span className="text-primary font-bold text-sm ml-1">₺</span>
          </span>
        </div>

        {/* Favorite Button */}
        <button 
          onClick={handleToggleFavorite}
          className="absolute top-4 right-4 p-3 bg-white/90 backdrop-blur-md rounded-full shadow-lg hover:scale-110 active:scale-95 transition-all z-10 border border-white/20"
        >
          <Heart className={cn("w-5 h-5 transition-colors duration-300", isFavorite ? "fill-red-500 text-red-500" : "text-slate-400 hover:text-red-500")} suppressHydrationWarning />
        </button>

        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
          {product.isPopular && (
            <Badge className="bg-amber-500/90 hover:bg-amber-500 backdrop-blur-md text-white shadow-lg border-none flex items-center gap-1.5 px-3 py-1 text-[11px] font-black uppercase tracking-wider rounded-full">
              <Star className="w-3.5 h-3.5 fill-current" suppressHydrationWarning /> Popüler
            </Badge>
          )}
          {product.spicyLevel && product.spicyLevel > 0 && (
            <Badge variant="destructive" className="bg-red-500/90 hover:bg-red-500 backdrop-blur-md shadow-lg flex items-center gap-1.5 px-3 py-1 text-[11px] font-black uppercase tracking-wider rounded-full">
              <Flame className="w-3.5 h-3.5 fill-current" suppressHydrationWarning /> Acılı
            </Badge>
          )}
        </div>
      </div>

      {/* Content Section */}
      <div className="flex flex-col flex-grow p-5 md:p-7 bg-white relative z-20">
        <div className="flex justify-between items-start mb-3 gap-3">
          <Link href={`/menu/${product.slug}`} className="hover:text-primary transition-colors flex-1">
            <h3 className="font-extrabold text-xl text-slate-800 line-clamp-2 leading-tight">{product.name}</h3>
          </Link>
          {product.rating && (
            <div className="flex items-center bg-orange-50 px-2.5 py-1 rounded-xl shrink-0">
              <Star className="w-4 h-4 fill-amber-500 text-amber-500" suppressHydrationWarning />
              <span className="text-sm font-bold text-orange-950 ml-1.5">{product.rating.toFixed(1)}</span>
            </div>
          )}
        </div>
        
        <p className="text-sm text-slate-500 line-clamp-2 mb-6 flex-grow font-medium leading-relaxed">
          {product.description}
        </p>

        <Button 
          onClick={handleAddToCart}
          className="w-full h-12 md:h-14 font-extrabold text-base rounded-2xl transition-all duration-300 shadow-lg hover:shadow-[0_8px_25px_rgb(234,88,12,0.3)] bg-primary hover:bg-primary/90 text-white"
          disabled={!isAvailable}
          variant={isAvailable ? "default" : "secondary"}
        >
          {isAvailable ? 'Sepete Ekle' : 'Geçici Olarak Tükendi'}
        </Button>
      </div>
    </div>
  );
}
