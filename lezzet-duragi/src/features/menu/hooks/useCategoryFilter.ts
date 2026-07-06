import { useState, useMemo, useEffect } from 'react';
import { Product, MenuCategory } from '@/types';
import { mockCategories } from '@/shared/data/menu';
import { useSearchParams } from 'next/navigation';

export function useCategoryFilter(initialProducts: Product[]) {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('category') as MenuCategory;
  
  const [activeCategory, setActiveCategory] = useState<MenuCategory>(
    categoryParam || mockCategories[0].id
  );

  useEffect(() => {
    if (categoryParam && categoryParam !== activeCategory) {
      setActiveCategory(categoryParam);
    }
  }, [categoryParam]);

  const filteredProducts = useMemo(() => {
    return initialProducts.filter(p => p.categoryId === activeCategory);
  }, [initialProducts, activeCategory]);

  return { activeCategory, setActiveCategory, filteredProducts };
}
