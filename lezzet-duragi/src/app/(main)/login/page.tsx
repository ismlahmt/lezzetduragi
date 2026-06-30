"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { UtensilsCrossed } from 'lucide-react';
import { toast } from 'sonner';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.])[A-Za-z\d@$!%*?&.]{8,}$/;
    
    if (!passwordRegex.test(password)) {
      toast.error('Lütfen geçerli formatta (En az 8 hane, 1 büyük, 1 küçük, 1 rakam, 1 özel karakter) bir şifre giriniz.');
      return;
    }

    if (email && password) {
      // TODO: Backend API çağrısı
      toast.success('Giriş isteği gönderildi (UI Modu)');
      router.push('/menu');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-100">
        
        <div className="text-center">
          <div className="mx-auto w-16 h-16 bg-primary rounded-2xl flex items-center justify-center text-white shadow-lg shadow-primary/25 mb-6">
            <UtensilsCrossed className="w-8 h-8" />
          </div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">Tekrar Hoş Geldin</h2>
          <p className="mt-2 text-sm text-slate-500 font-medium">
            Hesabına giriş yap ve lezzetleri keşfetmeye devam et
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">E-posta Adresi</label>
              <input
                type="email"
                required
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors outline-none"
                placeholder="ornek@mail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Şifre</label>
              <input
                type="password"
                required
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors outline-none"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <Button type="submit" className="w-full h-12 text-lg rounded-xl font-bold shadow-lg shadow-primary/30 hover:scale-[1.02] transition-transform">
            Giriş Yap
          </Button>
        </form>

        <p className="text-center text-sm font-medium text-slate-600 mt-8">
          Hesabın yok mu?{' '}
          <Link href="/register" className="text-primary hover:text-primary/80 hover:underline">
            Hemen Kayıt Ol
          </Link>
        </p>
      </div>
    </div>
  );
}
