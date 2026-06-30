import { useState, useMemo } from 'react';
import { Product, MenuCategory } from '@/types';
import { categories } from '@/shared/data/categories';

export function useCategoryFilter(initialProducts: Product[]) {
  const [activeCategory, setActiveCategory] = useState<MenuCategory>(categories[0].id);

  const filteredProducts = useMemo(() => {
    return initialProducts.filter(p => p.category === activeCategory);
  }, [initialProducts, activeCategory]);

  return { activeCategory, setActiveCategory, filteredProducts };
}
