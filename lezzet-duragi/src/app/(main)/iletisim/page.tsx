import { mockBusinessInfo } from '@/shared/data/business-info';
import { MapPin, Phone, Clock } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'İletişim | Lezzet Durağı',
  description: 'Sipariş ve sorularınız için bize ulaşın. Adres, telefon ve çalışma saatlerimiz.',
};

export default function ContactPage() {
  const { address, phone, workingHours } = mockBusinessInfo;

  return (
    <div className="pb-32 bg-slate-50/30">
      
      {/* Hero Banner */}
      <div className="relative pt-16 pb-36 px-4 bg-slate-900 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/20 via-slate-900 to-slate-900"></div>
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent"></div>
        
        <div className="container mx-auto relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-800/80 border border-slate-700 text-slate-300 font-semibold mb-6 text-sm backdrop-blur-sm">
            📞 Size bir telefon kadar yakınız
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight mb-6 drop-shadow-lg">
            İletişime <span className="text-primary">Geçin</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto font-medium leading-relaxed">
            Siparişleriniz, önerileriniz veya herhangi bir sorunuz için bize her zaman ulaşabilirsiniz.
          </p>
        </div>
      </div>

      {/* Main Content Area overlapping banner */}
      <div className="container mx-auto px-4 -mt-20 relative z-20 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
          
          {/* Info Cards - 2 Columns wide */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-start gap-5 p-8 bg-white rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group">
              <div className="p-4 bg-orange-50 rounded-2xl shrink-0 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                <MapPin className="w-8 h-8 text-primary group-hover:text-white transition-colors" />
              </div>
              <div>
                <h3 className="font-extrabold text-2xl text-slate-900 mb-3">Adres</h3>
                <p className="text-slate-500 text-lg leading-relaxed font-medium">{address}</p>
              </div>
            </div>

            <div className="flex items-start gap-5 p-8 bg-white rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group">
              <div className="p-4 bg-orange-50 rounded-2xl shrink-0 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                <Phone className="w-8 h-8 text-primary group-hover:text-white transition-colors" />
              </div>
              <div>
                <h3 className="font-extrabold text-2xl text-slate-900 mb-3">Telefon</h3>
                <a href={`tel:${phone.replace(/[^0-9+]/g, '')}`} className="text-slate-500 hover:text-primary transition-colors text-xl font-bold">
                  {phone}
                </a>
                <p className="text-sm text-slate-400 font-medium mt-2">Hemen arayın, siparişiniz yola çıksın!</p>
              </div>
            </div>

            <div className="flex items-start gap-5 p-8 bg-white rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group">
              <div className="p-4 bg-orange-50 rounded-2xl shrink-0 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                <Clock className="w-8 h-8 text-primary group-hover:text-white transition-colors" />
              </div>
              <div className="w-full">
                <h3 className="font-extrabold text-2xl text-slate-900 mb-5">Çalışma Saatleri</h3>
                <div className="space-y-3 text-lg font-medium text-slate-500">
                  <div className="flex justify-between border-b border-slate-50 pb-3">
                    <span>Hafta İçi:</span> 
                    <span className="text-slate-800 font-bold">{workingHours.mon.open} - {workingHours.mon.close}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-50 pb-3">
                    <span>Cumartesi:</span> 
                    <span className="text-slate-800 font-bold">{workingHours.sat.open} - {workingHours.sat.close}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Pazar:</span> 
                    <span className="text-slate-800 font-bold">{workingHours.sun.open} - {workingHours.sun.close}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Map - 3 Columns wide */}
          <div className="lg:col-span-3 relative h-[500px] lg:h-auto min-h-[500px] rounded-[2.5rem] overflow-hidden bg-slate-100 shadow-2xl border-4 border-white transform hover:scale-[1.02] transition-transform duration-500">
            {/* Map Overlay Gradient */}
            <div className="absolute inset-0 border-[6px] border-transparent rounded-[2.5rem] pointer-events-none z-10 bg-gradient-to-tr from-primary/10 via-transparent to-transparent"></div>
            
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3010.59837583713!2d28.9783589!3d41.0082376!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDHCsDAwJzI5LjYiTiAyOMKwNTgnNDIuMSJF!5e0!3m2!1str!2str!4v1631234567890!5m2!1str!2str" 
              width="100%" 
              height="100%" 
              style={{ border: 0, position: 'absolute', top: 0, left: 0 }} 
              allowFullScreen 
              loading="lazy"
              className="z-0"
            ></iframe>
            
            {/* Floating Location Tag on Map */}
            <div className="absolute bottom-6 left-6 z-20 bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-3">
              <div className="relative flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-4 w-4 bg-primary"></span>
              </div>
              <span className="font-bold text-slate-800">Lezzet Durağı Merkez</span>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
