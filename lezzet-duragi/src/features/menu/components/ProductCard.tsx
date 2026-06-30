'use client';

import Image from 'next/image';
import { Product } from '@/types';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Flame, Star } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { useCart } from '@/features/cart/hooks/useCart';
import { toast } from 'sonner';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const isAvailable = product.isAvailable;

  const handleAddToCart = () => {
    addToCart(product, 1);
    toast.success(`${product.name} sepete eklendi!`);
  };

  return (
    <div className={cn(
      "group relative flex flex-col rounded-2xl bg-white shadow-sm border border-slate-100 overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1",
      !isAvailable && "opacity-60 grayscale-[0.5]"
    )}>
      {/* Resim Alanı */}
      <div className="relative h-48 w-full bg-slate-100 overflow-hidden">
        <Link href={`/menu/${product.slug}`}>
          <div className="relative w-full h-full">
            <img 
              src={product.image} 
              alt={product.name} 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
              loading="lazy"
            />
          </div>
        </Link>
        
        {/* Rozetler */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.isPopular && (
            <Badge className="bg-amber-500 hover:bg-amber-600 text-white shadow-md border-none flex items-center gap-1">
              <Star className="w-3 h-3 fill-current" suppressHydrationWarning /> Popüler
            </Badge>
          )}
          {product.spicyLevel && product.spicyLevel > 0 && (
            <Badge variant="destructive" className="shadow-md flex items-center gap-1">
              <Flame className="w-3 h-3 fill-current" suppressHydrationWarning /> Acılı
            </Badge>
          )}
        </div>
      </div>

      {/* İçerik Alanı */}
      <div className="flex flex-col flex-grow p-4">
        <div className="flex justify-between items-start mb-2">
          <Link href={`/menu/${product.slug}`} className="hover:text-slate-900 transition-colors">
            <h3 className="font-bold text-lg text-slate-800 line-clamp-1">{product.name}</h3>
            {product.rating && (
              <div className="flex items-center text-amber-500 mt-1">
                <Star className="w-4 h-4 fill-current" suppressHydrationWarning />
                <span className="text-sm font-semibold ml-1">{product.rating.toFixed(1)}</span>
                <span className="text-xs text-slate-400 ml-1">({product.reviewCount})</span>
              </div>
            )}
          </Link>
          <span className="font-bold text-lg text-slate-900 whitespace-nowrap ml-2">
            {product.price} ₺
          </span>
        </div>
        
        <p className="text-sm text-slate-500 line-clamp-2 mb-4 flex-grow">
          {product.description}
        </p>

        {/* Sepete Ekle Butonu */}
        <Button 
          onClick={handleAddToCart}
          className="w-full font-semibold rounded-xl transition-all duration-300"
          disabled={!isAvailable}
          variant={isAvailable ? "default" : "secondary"}
        >
          {isAvailable ? 'Sepete Ekle' : 'Tükendi'}
        </Button>
      </div>
    </div>
  );
}
