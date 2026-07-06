"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { login } from '@/features/auth/store/authSlice';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // Frontend Mock Auth Simulation
    // In a real app, this goes to the backend: axios.post('/api/auth/login', { email, password })
    if (email === 'test@lezzetduragi.com' && password === '123456') {
      dispatch(login({ id: 'user_1', name: 'Test Kullanıcısı' }));
      toast.success('Giriş başarılı!');
      router.push('/'); // Go to homepage
    } else {
      toast.error('E-posta veya şifre hatalı! (Test için: test@lezzetduragi.com / 123456)');
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 relative flex items-center justify-center py-20 px-4 overflow-hidden">
      {/* Premium Dark Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/20 via-slate-900 to-slate-900 z-0"></div>
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl z-0 pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl z-0 pointer-events-none"></div>

      <div className="w-full max-w-md relative z-10 animate-in fade-in zoom-in-95 duration-500">
        <div className="bg-white/95 backdrop-blur-2xl rounded-[2.5rem] p-8 md:p-10 shadow-2xl shadow-primary/10 border border-white">
          
          <div className="text-center mb-8">
            <h1 className="text-4xl font-black text-slate-800 tracking-tight mb-2">Giriş Yap</h1>
            <p className="text-slate-500 font-medium">Lezzet Durağı'na tekrar hoş geldin!</p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-1.5">
              <label className="block text-sm font-bold text-slate-700 ml-1">E-posta</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-4 rounded-2xl border-2 border-slate-100 bg-slate-50 focus:bg-white focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all font-medium text-slate-700"
                placeholder="E-posta adresiniz"
                required
              />
            </div>
            <div className="space-y-1.5">
              <label className="block text-sm font-bold text-slate-700 ml-1">Şifre</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-4 rounded-2xl border-2 border-slate-100 bg-slate-50 focus:bg-white focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all font-medium text-slate-700"
                placeholder="••••••••"
                required
              />
            </div>
            
            <Button type="submit" className="w-full h-14 text-lg font-extrabold rounded-2xl mt-6 shadow-[0_8px_30px_rgb(234,88,12,0.3)] hover:shadow-[0_8px_40px_rgb(234,88,12,0.5)] transition-all hover:-translate-y-1">
              Giriş Yap
            </Button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-slate-500 font-medium text-sm">
              Hesabın yok mu?{' '}
              <Link href="/register" className="text-primary font-bold hover:underline underline-offset-4">
                Hemen Üye Ol
              </Link>
            </p>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-100 text-center text-sm text-slate-500">
            <p className="mb-1">Test Hesabı ile Giriş:</p>
            <p className="font-bold text-slate-700 bg-slate-50 py-2 px-4 rounded-xl inline-block border border-slate-200">test@lezzetduragi.com / 123456</p>
          </div>
        </div>
      </div>
    </div>
  );
}
