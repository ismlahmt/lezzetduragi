"use client";

import { useCart } from '@/features/cart/hooks/useCart';
import { Product } from '@/types';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';
import { toast } from 'sonner';

interface ProductActionsProps {
  product: Product;
}

export function ProductActions({ product }: ProductActionsProps) {
  const { addToCart } = useCart();
  const [isFavorite, setIsFavorite] = useState(false);

  const handleAddToCart = () => {
    addToCart(product, 1);
    toast.success(`${product.name} sepete eklendi!`);
  };

  const handleToggleFavorite = () => {
    // TODO: Backend API
    setIsFavorite(!isFavorite);
    toast.success(!isFavorite ? 'Favorilere eklendi!' : 'Favorilerden çıkarıldı');
  };

  return (
    <div className="flex gap-4">
      <Button 
        size="lg" 
        className="flex-1 text-lg h-14 rounded-2xl shadow-xl hover:shadow-2xl hover:-translate-y-0.5 transition-all duration-300"
        disabled={!product.isAvailable}
        variant={product.isAvailable ? "default" : "secondary"}
        onClick={handleAddToCart}
      >
        {product.isAvailable ? 'Sepete Ekle' : 'Tükendi'}
      </Button>
      
      <Button
        size="lg"
        variant="outline"
        className={`h-14 w-14 rounded-2xl border-slate-200 transition-colors ${isFavorite ? 'bg-red-50 border-red-100' : 'hover:bg-slate-50'}`}
        onClick={handleToggleFavorite}
      >
        <Heart className={`w-6 h-6 transition-colors ${isFavorite ? 'fill-red-500 text-red-500' : 'text-slate-400'}`} />
      </Button>
    </div>
  );
}
