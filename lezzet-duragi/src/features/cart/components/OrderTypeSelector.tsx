'use client';

import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Input } from '@/components/ui/input';
import { OrderType } from '@/types';
import { useCart } from '../hooks/useCart';

export function OrderTypeSelector() {
  const { cart, setOrderType, setTableNumber, setCustomerInfo } = useCart();

  return (
    <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex flex-col gap-6 transition-all duration-300">
      <div>
        <h3 className="text-xl font-extrabold text-slate-900 mb-4">Sipariş Tipi</h3>
        <RadioGroup 
          value={cart.orderType} 
          onValueChange={(val) => setOrderType(val as OrderType)}
          className="flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4"
        >
          <div className="flex items-center space-x-2 bg-slate-50 p-4 rounded-xl border border-slate-200 flex-1 cursor-pointer hover:bg-slate-100 hover:border-slate-300 transition-all">
            <RadioGroupItem value="masada" id="masada" className="w-5 h-5" />
            <Label htmlFor="masada" className="cursor-pointer font-bold text-slate-700 flex-1 text-base">Masada</Label>
          </div>
          <div className="flex items-center space-x-2 bg-slate-50 p-4 rounded-xl border border-slate-200 flex-1 cursor-pointer hover:bg-slate-100 hover:border-slate-300 transition-all">
            <RadioGroupItem value="paket" id="paket" className="w-5 h-5" />
            <Label htmlFor="paket" className="cursor-pointer font-bold text-slate-700 flex-1 text-base">Paket Servis</Label>
          </div>
          <div className="flex items-center space-x-2 bg-slate-50 p-4 rounded-xl border border-slate-200 flex-1 cursor-pointer hover:bg-slate-100 hover:border-slate-300 transition-all">
            <RadioGroupItem value="gel-al" id="gel-al" className="w-5 h-5" />
            <Label htmlFor="gel-al" className="cursor-pointer font-bold text-slate-700 flex-1 text-base">Gel-Al</Label>
          </div>
        </RadioGroup>
      </div>

      <div className="space-y-5 pt-6 border-t border-slate-100">
        {cart.orderType === 'masada' && (
          <div className="space-y-3 animate-in fade-in slide-in-from-top-4 duration-300">
            <Label htmlFor="tableNumber" className="font-bold text-slate-800 text-base">
              Masa Numarası <span className="text-red-500">*</span>
            </Label>
            <Input 
              id="tableNumber" 
              placeholder="Örn: 12" 
              value={cart.tableNumber || ''}
              onChange={(e) => setTableNumber(e.target.value)}
              className="h-14 rounded-2xl bg-slate-50 border-slate-200 focus-visible:ring-primary text-lg font-medium"
            />
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="space-y-3">
            <Label htmlFor="customerName" className="font-bold text-slate-800 text-base">İsim Soyisim (Opsiyonel)</Label>
            <Input 
              id="customerName" 
              placeholder="Adınız" 
              value={cart.customerName || ''}
              onChange={(e) => setCustomerInfo({ name: e.target.value })}
              className="h-14 rounded-2xl bg-slate-50 border-slate-200 focus-visible:ring-primary"
            />
          </div>
          <div className="space-y-3">
            <Label htmlFor="customerPhone" className="font-bold text-slate-800 text-base">Telefon (Opsiyonel)</Label>
            <Input 
              id="customerPhone" 
              placeholder="0555..." 
              value={cart.customerPhone || ''}
              onChange={(e) => setCustomerInfo({ phone: e.target.value })}
              className="h-14 rounded-2xl bg-slate-50 border-slate-200 focus-visible:ring-primary"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
