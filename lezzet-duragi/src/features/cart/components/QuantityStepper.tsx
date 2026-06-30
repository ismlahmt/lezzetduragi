'use client';

import { Button } from '@/components/ui/button';
import { Minus, Plus } from 'lucide-react';

interface QuantityStepperProps {
  quantity: number;
  onChange: (newQuantity: number) => void;
}

export function QuantityStepper({ quantity, onChange }: QuantityStepperProps) {
  return (
    <div className="flex items-center gap-3 bg-slate-50 p-1.5 rounded-xl border border-slate-200 w-fit">
      <Button 
        variant="ghost" 
        size="icon" 
        className="h-9 w-9 rounded-lg hover:bg-white hover:shadow-sm text-slate-700 transition-all"
        onClick={() => onChange(Math.max(0, quantity - 1))}
      >
        <Minus className="h-4 w-4" />
      </Button>
      <span className="font-bold text-slate-900 w-6 text-center text-lg">{quantity}</span>
      <Button 
        variant="ghost" 
        size="icon" 
        className="h-9 w-9 rounded-lg hover:bg-white hover:shadow-sm text-slate-700 transition-all"
        onClick={() => onChange(quantity + 1)}
      >
        <Plus className="h-4 w-4" />
      </Button>
    </div>
  );
}
