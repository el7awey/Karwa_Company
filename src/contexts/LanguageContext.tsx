import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language } from '@/types';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const languages: Language[] = [
  { code: 'en', name: 'English', direction: 'ltr' },
  { code: 'ar', name: 'العربية', direction: 'rtl' }
];

const translations = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.services': 'Services',
    'nav.about': 'About Us',
    'nav.testimonials': 'Testimonials', 
    'nav.contact': 'Contact',
    
    // Hero Section
    'hero.title': 'Fast & Reliable Delivery in Kuwait',
    'hero.subtitle': 'Your trusted delivery partner in Kuwait. Quick, secure, and professional service.',
    'hero.cta.primary': 'Order Now',
    'hero.cta.secondary': 'Learn More',
    
    // Services
    'services.title': 'Our Services',
    'services.subtitle': 'Comprehensive delivery solutions tailored for Kuwait',
    
    'service.express.title': 'Express Delivery',
    'service.express.description': 'Same-day delivery within Khaitan and surrounding areas',
    
    'service.scheduled.title': 'Scheduled Delivery',
    'service.scheduled.description': 'Plan your deliveries with our flexible scheduling options',
    
    'service.bulk.title': 'Bulk Orders',
    'service.bulk.description': 'Special rates for large quantity deliveries and business needs',
    
    'service.tracking.title': 'Real-time Tracking',
    'service.tracking.description': 'Track your orders live with our advanced GPS system',
    
    // About
    'about.title': 'About Karwa Delivery Services',
    'about.subtitle': 'Leading delivery service in Khaitan since 2019',
    'about.description': 'We are a locally-owned delivery company serving Khaitan and the greater Kuwait area. Our mission is to provide fast, reliable, and professional delivery services to both individuals and businesses.',
    
    // Testimonials
    'testimonials.title': 'What Our Customers Say',
    'testimonials.subtitle': 'Real feedback from satisfied customers',
    
    // Contact
    'contact.title': 'Get in Touch',
    'contact.subtitle': 'Ready to start delivering with us?',
    'contact.whatsapp': 'WhatsApp Us',
    'contact.address': 'Khaitan, Kuwait',
    'contact.email': 'Karwacompany@gmail.com',
    'contact.phone': '+965 6046 4711',
    
    // Footer
    'footer.description': 'Your trusted delivery partner in Kuwait',
    'footer.rights': 'All rights reserved.',
    'footer.social': 'Follow us on social media',
  },
  ar: {
    // Navigation
    'nav.home': 'الرئيسية',
    'nav.services': 'خدماتنا',
    'nav.about': 'من نحن',
    'nav.testimonials': 'آراء العملاء',
    'nav.contact': 'تواصل معنا',
    
    // Hero Section
    'hero.title': 'توصيل سريع وموثوق في الكويت',
    'hero.subtitle': 'شريكك الموثوق للتوصيل في الكويت. خدمة سريعة وآمنة ومهنية.',
    'hero.cta.primary': 'اطلب الآن',
    'hero.cta.secondary': 'اعرف المزيد',
    
    // Services
    'services.title': 'خدماتنا',
    'services.subtitle': 'حلول توصيل شاملة مصممة للكويت',
    
    'service.express.title': 'التوصيل السريع',
    'service.express.description': 'توصيل في نفس اليوم داخل خيطان والمناطق المحيطة',
    
    'service.scheduled.title': 'التوصيل المجدول',
    'service.scheduled.description': 'خطط لتوصيلاتك مع خيارات الجدولة المرنة',
    
    'service.bulk.title': 'الطلبات الكبيرة',
    'service.bulk.description': 'أسعار خاصة للكميات الكبيرة واحتياجات الأعمال',
    
    'service.tracking.title': 'التتبع المباشر',
    'service.tracking.description': 'تتبع طلباتك مباشرة مع نظام GPS المتقدم',
    
    // About
    'about.title': 'عن شركة كروة لتوصيل الطلبات',
    'about.subtitle': 'خدمة التوصيل الرائدة في الكويت منذ 2019',
    'about.description': 'نحن شركة توصيل محلية تخدم خيطان ومنطقة الكويت الكبرى. مهمتنا هي تقديم خدمات توصيل سريعة وموثوقة ومهنية للأفراد والشركات.',
    
    // Testimonials
    'testimonials.title': 'ماذا يقول عملاؤنا',
    'testimonials.subtitle': 'تقييمات حقيقية من العملاء الراضين',
    
    // Contact
    'contact.title': 'تواصل معنا',
    'contact.subtitle': 'جاهز للبدء في التوصيل معنا؟',
    'contact.whatsapp': 'واتساب',
    'contact.address': 'خيطان، الكويت',
    'contact.email': 'Karwacompany@gmail.com',
    'contact.phone': '+965 6046 4711',
    
    // Footer
    'footer.description': 'شريكك الموثوق للتوصيل في الكويت',
    'footer.rights': 'جميع الحقوق محفوظة.',
    'footer.social': 'تابعنا على وسائل التواصل الاجتماعي',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(languages[0]);

  const t = (key: string): string => {
    return translations[language.code][key] || key;
  };

  useEffect(() => {
    document.documentElement.dir = language.direction;
    document.documentElement.lang = language.code;
    
    if (language.direction === 'rtl') {
      document.body.classList.add('font-arabic');
      document.body.classList.remove('font-primary');
    } else {
      document.body.classList.add('font-primary');
      document.body.classList.remove('font-arabic');
    }
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage: (lang) => setLanguage(lang), t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export { languages };
