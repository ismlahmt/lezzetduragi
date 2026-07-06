'use client';

import { Product } from '@/types';
import { useCategoryFilter } from '../hooks/useCategoryFilter';
import { CategoryTabs } from './CategoryTabs';
import { ProductGrid } from './ProductGrid';

export function MenuClient({ initialProducts }: { initialProducts: Product[] }) {
  const { activeCategory, setActiveCategory, filteredProducts } = useCategoryFilter(initialProducts);

  return (
    <>
      <CategoryTabs activeCategory={activeCategory} onCategoryChange={setActiveCategory} />
      <div className="container mx-auto px-4 mt-12 pb-16">
        <ProductGrid products={filteredProducts} />
      </div>
    </>
  );
}
