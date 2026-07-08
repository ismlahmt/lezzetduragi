"use client";

import React, { useCallback } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';
import { Category } from '@/types';

interface CategoryCarouselProps {
  categories: Category[];
}

export function CategoryCarousel({ categories }: CategoryCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: true, 
    align: 'start',
    slidesToScroll: 1
  });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

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
    <div className="flex items-center gap-2 md:gap-4 group">
      
      {/* Left Arrow */}
      <button 
        onClick={scrollPrev}
        className="shrink-0 z-10 w-10 h-10 md:w-12 md:h-12 bg-white rounded-full shadow-md border border-slate-100 flex items-center justify-center text-slate-600 hover:text-primary hover:bg-orange-50 hover:scale-110 transition-all opacity-0 group-hover:opacity-100 hidden md:flex"
        aria-label="Sola Kaydır"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      {/* Scrollable Container (Embla Viewport) */}
      <div 
        ref={emblaRef}
        className="overflow-hidden flex-1 w-full"
      >
        <div className="flex -ml-4 md:-ml-6 py-6">
          {categories.map(category => (
            <div 
              key={category.id} 
              className="flex-[0_0_50%] sm:flex-[0_0_33.3333%] md:flex-[0_0_25%] lg:flex-[0_0_20%] xl:flex-[0_0_16.6666%] min-w-0 pl-4 md:pl-6"
            >
              <Link 
                href={`/menu?category=${category.id}`} 
                className="group/item flex flex-col items-center justify-center gap-3 h-40 md:h-48 rounded-3xl bg-white shadow-sm border border-slate-100 transition-all duration-300 hover:shadow-2xl hover:border-primary/50 hover:-translate-y-2 relative overflow-hidden w-full"
              >
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-50/50 group-hover/item:to-primary/5 transition-colors"></div>
                
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-slate-50 flex items-center justify-center shadow-inner group-hover/item:bg-white group-hover/item:scale-110 transition-all duration-500 z-10">
                  <span className="text-4xl md:text-5xl drop-shadow-sm">{getCategoryEmoji(category.name)}</span>
                </div>
                
                <span className="font-extrabold text-slate-700 group-hover/item:text-primary transition-colors whitespace-nowrap z-10 text-sm md:text-base">
                  {category.name}
                </span>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Right Arrow */}
      <button 
        onClick={scrollNext}
        className="shrink-0 z-10 w-10 h-10 md:w-12 md:h-12 bg-white rounded-full shadow-md border border-slate-100 flex items-center justify-center text-slate-600 hover:text-primary hover:bg-orange-50 hover:scale-110 transition-all opacity-0 group-hover:opacity-100 hidden md:flex"
        aria-label="Sağa Kaydır"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

    </div>
  );
}
