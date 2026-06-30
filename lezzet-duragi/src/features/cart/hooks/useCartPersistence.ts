'use client';

import { useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '@/shared/store/hooks';
import { setCartState } from '../store/cartSlice';
import { Cart } from '@/types';

const CART_STORAGE_KEY = 'lezzet_duragi_cart';

export function useCartPersistence() {
  const dispatch = useAppDispatch();
  const cartState = useAppSelector(state => state.cart);
  const isInitialized = useRef(false);

  // Uygulama açıldığında localStorage'dan sepeti yükle
  useEffect(() => {
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      if (stored) {
        const parsedCart = JSON.parse(stored) as Cart;
        dispatch(setCartState(parsedCart));
      }
    } catch (error) {
      console.error('Failed to parse cart from localStorage', error);
    } finally {
      isInitialized.current = true;
    }
  }, [dispatch]);

  // Sepet her değiştiğinde localStorage'a kaydet
  useEffect(() => {
    if (isInitialized.current) {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartState));
    }
  }, [cartState]);

  return isInitialized.current;
}
