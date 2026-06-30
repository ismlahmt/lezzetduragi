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
      <ProductGrid products={filteredProducts} />
    </>
  );
}
