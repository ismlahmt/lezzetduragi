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
    <div className="container mx-auto px-4 py-20 max-w-md">
      <div className="bg-white rounded-3xl p-8 shadow-lg border border-slate-100">
        <h1 className="text-3xl font-bold text-slate-800 text-center mb-2">Giriş Yap</h1>
        <p className="text-slate-500 text-center mb-8">Lezzet Durağı'na hoş geldin!</p>
        
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">E-posta</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/50"
              placeholder="E-posta adresiniz"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Şifre</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/50"
              placeholder="Şifreniz"
              required
            />
          </div>
          
          <Button type="submit" className="w-full h-12 text-lg rounded-xl mt-4">
            Giriş Yap
          </Button>
        </form>

        <div className="mt-6 text-center text-sm text-slate-500">
          <p>Test Hesabı:</p>
          <p className="font-semibold text-slate-700">test@lezzetduragi.com / 123456</p>
        </div>
      </div>
    </div>
  );
}
