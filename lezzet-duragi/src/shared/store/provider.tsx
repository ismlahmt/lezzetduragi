'use client';

import { Provider } from 'react-redux';
import { store } from './index';
import { useCartPersistence } from '@/features/cart/hooks/useCartPersistence';

// localStorage senkronizasyon hook'unu çağıran sarmalayıcı
function CartPersister({ children }: { children: React.ReactNode }) {
  useCartPersistence();
  return <>{children}</>;
}

export function ReduxProvider({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <CartPersister>
        {children}
      </CartPersister>
    </Provider>
  );
}
