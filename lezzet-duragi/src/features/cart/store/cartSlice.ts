import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Cart, CartItem, OrderType, Product } from '@/types';

const initialState: Cart = {
  items: [],
  orderType: 'masada',
  tableNumber: '',
  customerName: '',
  customerPhone: '',
  totalPrice: 0,
};

const calculateTotal = (items: CartItem[]) => 
  items.reduce((total, item) => total + (item.product.price * item.quantity), 0);

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCartState: (state, action: PayloadAction<Cart>) => {
      return action.payload;
    },
    addToCart: (state, action: PayloadAction<{ product: Product, quantity?: number, note?: string }>) => {
      if (!action.payload.product.isAvailable) return;
      
      const existingItem = state.items.find(item => item.productId === action.payload.product.id);
      if (existingItem) {
        existingItem.quantity += (action.payload.quantity || 1);
        if (action.payload.note) existingItem.note = action.payload.note;
      } else {
        state.items.push({
          productId: action.payload.product.id,
          product: action.payload.product,
          quantity: action.payload.quantity || 1,
          note: action.payload.note
        });
      }
      state.totalPrice = calculateTotal(state.items);
    },
    updateQuantity: (state, action: PayloadAction<{ productId: string, quantity: number }>) => {
      const item = state.items.find(i => i.productId === action.payload.productId);
      if (item) {
        if (action.payload.quantity <= 0) {
          state.items = state.items.filter(i => i.productId !== action.payload.productId);
        } else {
          item.quantity = action.payload.quantity;
        }
        state.totalPrice = calculateTotal(state.items);
      }
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(i => i.productId !== action.payload);
      state.totalPrice = calculateTotal(state.items);
    },
    setOrderType: (state, action: PayloadAction<OrderType>) => {
      state.orderType = action.payload;
      if (action.payload !== 'masada') {
        state.tableNumber = '';
      }
    },
    setTableNumber: (state, action: PayloadAction<string>) => {
      state.tableNumber = action.payload;
    },
    setCustomerInfo: (state, action: PayloadAction<{ name?: string, phone?: string }>) => {
      if (action.payload.name !== undefined) state.customerName = action.payload.name;
      if (action.payload.phone !== undefined) state.customerPhone = action.payload.phone;
    },
    clearCart: () => initialState,
  }
});

export const { 
  setCartState, addToCart, updateQuantity, removeFromCart, 
  setOrderType, setTableNumber, setCustomerInfo, clearCart 
} = cartSlice.actions;

export default cartSlice.reducer;
