'use client';

import { mockCategories } from '@/shared/data/menu';
import { MenuCategory } from '@/types';
import { cn } from '@/lib/utils';

interface CategoryTabsProps {
  activeCategory: MenuCategory;
  onCategoryChange: (id: MenuCategory) => void;
}

export function CategoryTabs({ activeCategory, onCategoryChange }: CategoryTabsProps) {
  const getCategoryEmoji = (name: string) => {
    switch (name) {
      case 'Ana Yemekler': return '🍛';
      case 'Kebaplar': return '🍢';
      case 'Burgerler': return '🍔';
      case 'Pizzalar': return '🍕';
      case 'Salatalar': return '🥗';
      case 'Tatlılar': return '🍰';
      case 'İçecekler': return '🥤';
      case 'Çorbalar': return '🥣';
      default: return '🍽️';
    }
  };

  return (
    <div className="sticky top-[72px] z-30 bg-slate-50/85 backdrop-blur-xl border-b border-slate-200/50 py-4 mb-4 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex overflow-x-auto hide-scrollbar gap-3 pb-2 -mx-4 px-4 snap-x">
          {mockCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => onCategoryChange(category.id)}
              className={cn(
                "whitespace-nowrap px-5 py-3 rounded-2xl text-sm md:text-base font-extrabold transition-all duration-300 flex items-center gap-2.5 border-2 snap-center shrink-0",
                activeCategory === category.id
                  ? "bg-primary text-white border-primary shadow-[0_4px_20px_rgb(234,88,12,0.3)] transform scale-105"
                  : "bg-white text-slate-600 border-transparent hover:bg-orange-50 hover:text-primary hover:border-orange-100 shadow-sm hover:shadow-md"
              )}
            >
              <span className="text-xl drop-shadow-sm">{getCategoryEmoji(category.name)}</span>
              {category.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
