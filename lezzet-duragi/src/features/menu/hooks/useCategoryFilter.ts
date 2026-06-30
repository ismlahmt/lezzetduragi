import { useState, useMemo } from 'react';
import { Product, MenuCategory } from '@/types';
import { mockCategories } from '@/shared/data/menu';

export function useCategoryFilter(initialProducts: Product[]) {
  const [activeCategory, setActiveCategory] = useState<MenuCategory>(mockCategories[0].id);

  const filteredProducts = useMemo(() => {
    return initialProducts.filter(p => p.categoryId === activeCategory);
  }, [initialProducts, activeCategory]);

  return { activeCategory, setActiveCategory, filteredProducts };
}
