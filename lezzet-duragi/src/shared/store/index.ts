import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '@/features/cart/store/cartSlice';
import authReducer from '@/features/auth/store/authSlice';
import favoritesReducer from '@/features/favorites/store/favoritesSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    auth: authReducer,
    favorites: favoritesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
