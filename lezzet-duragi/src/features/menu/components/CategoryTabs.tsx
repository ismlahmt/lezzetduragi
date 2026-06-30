'use client';

import { categories } from '@/shared/data/categories';
import { MenuCategory } from '@/types';
import { cn } from '@/lib/utils';

interface CategoryTabsProps {
  activeCategory: MenuCategory;
  onCategoryChange: (id: MenuCategory) => void;
}

export function CategoryTabs({ activeCategory, onCategoryChange }: CategoryTabsProps) {
  return (
    <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-slate-100 py-4 mb-8">
      <div className="container mx-auto px-4">
        <div className="flex overflow-x-auto hide-scrollbar gap-2 pb-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => onCategoryChange(category.id)}
              className={cn(
                "whitespace-nowrap px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300",
                activeCategory === category.id
                  ? "bg-slate-900 text-white shadow-md transform scale-105"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              )}
            >
              {category.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
