"use client";

import { useState } from 'react';
import { Product } from '@/types';
import { Button } from '@/components/ui/button';
import { Star, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

interface ProductReviewsProps {
  product: Product;
}

export function ProductReviews({ product }: ProductReviewsProps) {
  // TODO: Backend entegrasyonu (Mock state)
  const isAuthenticated = true;
  const user = { id: 'user_1', name: 'Kullanıcı' };
  
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');

  // Placeholder reviews
  const productReviews = [
    {
      id: 'rev_1',
      userId: 'user_2',
      userName: 'Ayşe Yılmaz',
      rating: 5,
      comment: 'Tek kelimeyle harika! Her zaman buradan sipariş veriyorum, hiç pişman etmediler. Porsiyonlar çok doyurucu.',
      createdAt: new Date().toISOString()
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated) {
      toast.error('Yorum yapmak için giriş yapmalısınız!');
      return;
    }
    if (comment.trim().length < 5) {
      toast.error('Yorumunuz çok kısa!');
      return;
    }

    // TODO: Backend API
    toast.success('Yorumunuz başarıyla gönderildi (UI Modu)');
    setComment('');
    setRating(5);
  };

  const handleDelete = (reviewId: string) => {
    // TODO: Backend API
    toast.success('Yorum silme isteği gönderildi (UI Modu)');
  };

  return (
    <div className="mt-16 pt-12 border-t border-slate-100">
      <h3 className="text-2xl font-bold text-slate-800 mb-8">Değerlendirmeler ({productReviews.length})</h3>

      {/* Write Review Form */}
      <div className="bg-slate-50 rounded-3xl p-6 md:p-8 mb-10">
        <h4 className="text-lg font-bold text-slate-700 mb-4">Yorum Yap</h4>
        {!isAuthenticated ? (
          <p className="text-slate-500 font-medium">Yorum yapabilmek için lütfen giriş yapın.</p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-slate-600 mb-2">Puanınız</label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className="focus:outline-none hover:scale-110 transition-transform"
                  >
                    <Star className={`w-8 h-8 ${rating >= star ? 'fill-amber-500 text-amber-500' : 'fill-slate-200 text-slate-200'}`} />
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-600 mb-2">Yorumunuz</label>
              <textarea
                rows={3}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Bu lezzet hakkında ne düşünüyorsunuz?"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors outline-none resize-none"
              />
            </div>
            <Button type="submit" className="px-8 rounded-xl font-bold">Gönder</Button>
          </form>
        )}
      </div>

      {/* Review List */}
      <div className="space-y-6">
        {productReviews.length === 0 ? (
          <p className="text-slate-500 italic">Bu ürün için henüz yorum yapılmamış. İlk yorum yapan sen ol!</p>
        ) : (
          productReviews.map(review => (
            <div key={review.id} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col gap-3">
              <div className="flex justify-between items-start">
                <div>
                  <h5 className="font-bold text-slate-800">{review.userName}</h5>
                  <p className="text-xs text-slate-400 mt-1">{new Date(review.createdAt).toLocaleDateString('tr-TR')} {new Date(review.createdAt).toLocaleTimeString('tr-TR', {hour: '2-digit', minute:'2-digit'})}</p>
                </div>
                <div className="flex gap-2 items-center">
                  <div className="flex text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-4 h-4 ${i < review.rating ? 'fill-current' : 'fill-slate-200 text-slate-200'}`} />
                    ))}
                  </div>
                  {isAuthenticated && user?.id === review.userId && (
                    <button onClick={() => handleDelete(review.id)} className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors ml-2">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
              <p className="text-slate-600 leading-relaxed">{review.comment}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
