import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface OrderItem {
  productId: string;
  quantity: number;
  product: {
    id: string;
    name: string;
    price: number;
  };
}

export interface Order {
  id: string;
  items: OrderItem[];
  totalPrice: number;
  status: 'bekliyor' | 'tamamlandı';
  createdAt: string;
  orderType: 'masada' | 'gel-al' | 'paket';
}

interface OrdersState {
  orders: Order[];
}

const initialState: OrdersState = {
  orders: [],
};

export const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    addOrder: (state, action: PayloadAction<Order>) => {
      state.orders.unshift(action.payload);
    },
    clearOrders: (state) => {
      state.orders = [];
    },
  },
});

export const { addOrder, clearOrders } = ordersSlice.actions;

export default ordersSlice.reducer;
