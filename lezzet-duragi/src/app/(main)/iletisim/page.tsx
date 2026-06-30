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
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-4">İletişim</h1>
        <p className="text-xl text-slate-500">Sipariş ve sorularınız için bize ulaşın.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
        {/* Sol Taraf: İletişim Bilgileri */}
        <div className="space-y-6">
          <div className="flex items-start gap-5 p-8 bg-white rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <div className="p-4 bg-primary/10 rounded-2xl shrink-0">
              <MapPin className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h3 className="font-extrabold text-2xl text-slate-900 mb-3">Adres</h3>
              <p className="text-slate-600 text-lg leading-relaxed font-medium">{address}</p>
            </div>
          </div>

          <div className="flex items-start gap-5 p-8 bg-white rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <div className="p-4 bg-primary/10 rounded-2xl shrink-0">
              <Phone className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h3 className="font-extrabold text-2xl text-slate-900 mb-3">Telefon</h3>
              <a href={`tel:${phone.replace(/[^0-9+]/g, '')}`} className="text-slate-600 hover:text-primary transition-colors text-xl font-bold">
                {phone}
              </a>
            </div>
          </div>

          <div className="flex items-start gap-5 p-8 bg-white rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <div className="p-4 bg-primary/10 rounded-2xl shrink-0">
              <Clock className="w-8 h-8 text-primary" />
            </div>
            <div className="w-full">
              <h3 className="font-extrabold text-2xl text-slate-900 mb-5">Çalışma Saatleri</h3>
              <div className="space-y-3 text-lg font-medium text-slate-600">
                <div className="flex justify-between border-b border-slate-100 pb-3">
                  <span>Pzt - Cuma:</span> 
                  <span className="text-slate-900">{workingHours.mon.open} - {workingHours.mon.close}</span>
                </div>
                <div className="flex justify-between border-b border-slate-100 pb-3">
                  <span>Cumartesi:</span> 
                  <span className="text-slate-900">{workingHours.sat.open} - {workingHours.sat.close}</span>
                </div>
                <div className="flex justify-between">
                  <span>Pazar:</span> 
                  <span className="text-slate-900">{workingHours.sun.open} - {workingHours.sun.close}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sağ Taraf: Harita */}
        <div className="relative h-full min-h-[450px] lg:min-h-0 rounded-[2.5rem] overflow-hidden bg-slate-100 shadow-2xl border border-slate-200">
          {/* Gerçek Google Maps iframe */}
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3010.59837583713!2d28.9783589!3d41.0082376!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDHCsDAwJzI5LjYiTiAyOMKwNTgnNDIuMSJF!5e0!3m2!1str!2str!4v1631234567890!5m2!1str!2str" 
            width="100%" 
            height="100%" 
            style={{ border: 0, position: 'absolute', top: 0, left: 0 }} 
            allowFullScreen 
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </div>
  );
}
