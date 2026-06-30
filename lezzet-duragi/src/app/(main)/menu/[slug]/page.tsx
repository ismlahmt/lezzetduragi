import { mockMenu } from '@/shared/data/menu';
import { notFound } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Flame, Star, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface PageProps {
  params: Promise<{ slug: string }>;
}

// SSG için generateStaticParams (Fotoğraf 4 ve 9 kuralı)
export function generateStaticParams() {
  return mockMenu.map((product) => ({
    slug: product.slug,
  }));
}

// Dinamik SEO ve Metadata (Sprint 5 kuralı)
export async function generateMetadata({ params }: PageProps): Promise<import('next').Metadata> {
  const resolvedParams = await params;
  const product = mockMenu.find((p) => p.slug === resolvedParams.slug);
  if (!product) return { title: 'Ürün Bulunamadı' };
  
  return {
    title: `${product.name} | Lezzet Durağı`,
    description: product.description,
  };
}

export default async function ProductDetailPage({ params }: PageProps) {
  const resolvedParams = await params;
  const product = mockMenu.find((p) => p.slug === resolvedParams.slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <Link href="/menu" className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-slate-900 mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4 mr-2" /> Menüye Dön
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        {/* Sol Taraf: Büyük Görsel */}
        <div className="relative aspect-square md:aspect-[4/3] rounded-3xl overflow-hidden bg-slate-100 shadow-lg border border-slate-100">
           <img 
             src={product.image} 
             alt={product.name} 
             className="absolute inset-0 w-full h-full object-cover"
           />
        </div>

        {/* Sağ Taraf: Detaylar */}
        <div className="flex flex-col justify-center">
          <div className="flex flex-wrap gap-2 mb-4">
            {product.isPopular && (
              <Badge className="bg-amber-500 hover:bg-amber-600 text-white border-none px-3 py-1 text-sm flex items-center gap-1.5">
                <Star className="w-4 h-4 fill-current" /> Popüler
              </Badge>
            )}
            {product.spicyLevel && product.spicyLevel > 0 && (
              <Badge variant="destructive" className="px-3 py-1 text-sm flex items-center gap-1.5">
                <Flame className="w-4 h-4 fill-current" /> Acı Seviyesi: {product.spicyLevel}
              </Badge>
            )}
          </div>

          <h1 className="text-4xl font-extrabold text-slate-900 mb-2">{product.name}</h1>
          <div className="flex items-center gap-2 mb-4">
            {product.rating && (
              <div className="flex items-center text-amber-500">
                <Star className="w-5 h-5 fill-current" suppressHydrationWarning />
                <span className="ml-1 font-bold text-lg">{product.rating.toFixed(1)}</span>
                <span className="text-slate-400 ml-1 font-medium">({product.reviewCount || 0} değerlendirme)</span>
              </div>
            )}
          </div>
          <p className="text-3xl font-bold text-slate-900 mb-6">{product.price} ₺</p>

          <div className="prose prose-slate mb-8">
            <p className="text-lg text-slate-600 leading-relaxed">{product.description}</p>
          </div>

          {/* Alerjen Bilgisi */}
          {product.allergens && product.allergens.length > 0 && (
            <div className="mb-8 p-4 bg-orange-50 rounded-2xl border border-orange-100">
              <h3 className="text-sm font-bold text-orange-800 uppercase tracking-wider mb-2">Alerjen Bilgisi</h3>
              <div className="flex flex-wrap gap-2">
                {product.allergens.map(allergen => (
                  <Badge key={allergen} variant="outline" className="bg-white text-orange-700 border-orange-200">
                    {allergen}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Sepete Ekle CTA */}
          <div className="mt-auto pt-8 border-t border-slate-100">
             <Button 
                size="lg" 
                className="w-full text-lg h-14 rounded-2xl shadow-xl hover:shadow-2xl hover:-translate-y-0.5 transition-all duration-300"
                disabled={!product.isAvailable}
                variant={product.isAvailable ? "default" : "secondary"}
             >
                {product.isAvailable ? 'Sepete Ekle' : 'Tükendi'}
             </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
