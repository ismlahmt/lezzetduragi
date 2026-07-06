"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { UtensilsCrossed } from 'lucide-react';
import { toast } from 'sonner';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Şifre güç kontrolü (En az 8 karakter, 1 büyük, 1 küçük, 1 rakam, 1 özel karakter)
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.])[A-Za-z\d@$!%*?&.]{8,}$/;
    
    if (!passwordRegex.test(password)) {
      toast.error('Şifreniz en az 8 karakter olmalı; büyük harf, küçük harf, rakam ve özel karakter (@$!%*?&.) içermelidir.');
      return;
    }

    if (name && email && password) {
      // TODO: Backend API çağrısı eklenecek
      toast.success('Kayıt isteği gönderildi (UI Modu)');
      router.push('/menu');
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
            <div className="mx-auto w-16 h-16 bg-primary rounded-[1.5rem] flex items-center justify-center text-white shadow-lg shadow-primary/30 mb-6 transform -rotate-6 hover:rotate-0 transition-transform duration-300">
              <UtensilsCrossed className="w-8 h-8" />
            </div>
            <h2 className="text-4xl font-black text-slate-800 tracking-tight mb-2">Aramıza Katıl</h2>
            <p className="text-slate-500 font-medium">
              Hemen üye ol ve favori lezzetlerini sipariş et.
            </p>
          </div>

          <form className="space-y-5" onSubmit={handleRegister}>
            <div className="space-y-1.5">
              <label className="block text-sm font-bold text-slate-700 ml-1">Ad Soyad</label>
              <input
                type="text"
                required
                className="w-full p-4 rounded-2xl border-2 border-slate-100 bg-slate-50 focus:bg-white focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all font-medium text-slate-700"
                placeholder="İsim Soyisim"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <label className="block text-sm font-bold text-slate-700 ml-1">E-posta Adresi</label>
              <input
                type="email"
                required
                className="w-full p-4 rounded-2xl border-2 border-slate-100 bg-slate-50 focus:bg-white focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all font-medium text-slate-700"
                placeholder="ornek@mail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <label className="block text-sm font-bold text-slate-700 ml-1">Şifre</label>
              <input
                type="password"
                required
                className="w-full p-4 rounded-2xl border-2 border-slate-100 bg-slate-50 focus:bg-white focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all font-medium text-slate-700"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <Button type="submit" className="w-full h-14 text-lg font-extrabold rounded-2xl mt-6 shadow-[0_8px_30px_rgb(234,88,12,0.3)] hover:shadow-[0_8px_40px_rgb(234,88,12,0.5)] transition-all hover:-translate-y-1">
              Kayıt Ol
            </Button>
          </form>

          <div className="mt-8 text-center pt-6 border-t border-slate-100">
            <p className="text-sm font-medium text-slate-500">
              Zaten hesabın var mı?{' '}
              <Link href="/login" className="text-primary font-bold hover:underline underline-offset-4">
                Giriş Yap
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
