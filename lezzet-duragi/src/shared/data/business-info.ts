import { BusinessInfo } from '@/types';

export const mockBusinessInfo: BusinessInfo = {
  name: 'Lezzet Durağı',
  address: 'Örnek Mahallesi, Lezzet Sokak No: 1, İstanbul',
  latitude: 41.0082,
  longitude: 28.9784,
  phone: '+905551234567',
  whatsappNumber: '+905551234567',
  workingHours: {
    mon: { open: '10:00', close: '23:00' },
    tue: { open: '10:00', close: '23:00' },
    wed: { open: '10:00', close: '23:00' },
    thu: { open: '10:00', close: '23:00' },
    fri: { open: '10:00', close: '23:30' },
    sat: { open: '10:00', close: '23:30' },
    sun: { open: '11:00', close: '22:00' },
  }
};
