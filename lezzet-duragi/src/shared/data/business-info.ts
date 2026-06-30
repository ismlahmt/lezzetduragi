import { BusinessInfo } from '@/types';

export const mockBusinessInfo: BusinessInfo = {
  name: "Lezzet Durağı",
  address: "Örnek Mahallesi, Lezzet Sokak No: 1, 34000 Şişli/İstanbul",
  phone: "+90 555 555 55 55",
  whatsappNumber: "+905555555555",
  workingHours: {
    mon: { open: "09:00", close: "23:00" },
    tue: { open: "09:00", close: "23:00" },
    wed: { open: "09:00", close: "23:00" },
    thu: { open: "09:00", close: "23:00" },
    fri: { open: "09:00", close: "00:00" },
    sat: { open: "10:00", close: "00:00" },
    sun: { open: "10:00", close: "22:00" },
  }
};
