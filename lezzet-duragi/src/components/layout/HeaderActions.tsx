"use client";

import Link from 'next/link';
import { ShoppingBag, User } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/shared/store';

export function HeaderActions() {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  return (
    <div className="flex items-center gap-3">
      {isAuthenticated ? (
        <Link href="/profil" className="flex items-center gap-2 p-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-2xl transition-all shadow-sm font-semibold">
          <User className="w-5 h-5 text-primary" suppressHydrationWarning />
          <span className="hidden sm:inline">Profilim</span>
        </Link>
      ) : (
        <Link href="/login" className="flex items-center gap-2 p-3 bg-primary hover:bg-primary/90 text-white rounded-2xl transition-all shadow-sm shadow-primary/30 font-semibold cursor-pointer">
          <User className="w-5 h-5" suppressHydrationWarning />
          <span className="hidden sm:inline">Giriş Yap</span>
        </Link>
      )}

      <Link href="/sepet" className="relative p-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-2xl transition-all hover:scale-105 hover:rotate-3 shadow-sm">
        <ShoppingBag className="w-6 h-6" suppressHydrationWarning />
      </Link>
    </div>
  );
}
