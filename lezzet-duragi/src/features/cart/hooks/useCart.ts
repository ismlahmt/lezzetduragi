import { useAppDispatch, useAppSelector } from '@/shared/store/hooks';
import { addToCart, updateQuantity, removeFromCart, setOrderType, setTableNumber, setCustomerInfo, clearCart } from '../store/cartSlice';
import { Product, OrderType } from '@/types';

export function useCart() {
  const dispatch = useAppDispatch();
  const cart = useAppSelector(state => state.cart);

  return {
    cart,
    addToCart: (product: Product, quantity?: number, note?: string) => dispatch(addToCart({ product, quantity, note })),
    updateQuantity: (productId: string, quantity: number) => dispatch(updateQuantity({ productId, quantity })),
    removeFromCart: (productId: string) => dispatch(removeFromCart(productId)),
    setOrderType: (type: OrderType) => dispatch(setOrderType(type)),
    setTableNumber: (num: string) => dispatch(setTableNumber(num)),
    setCustomerInfo: (info: { name?: string, phone?: string }) => dispatch(setCustomerInfo(info)),
    clearCart: () => dispatch(clearCart()),
  };
}
