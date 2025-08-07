import React from 'react';
import { MessageCircle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const WhatsAppButton = () => {
  const { language } = useLanguage();

  const handleWhatsApp = () => {
    const message = language.code === 'ar' 
      ? 'مرحباً، أود الاستفسار عن خدمات التوصيل'
      : 'Hello, I would like to inquire about delivery services';
    window.open(`https://wa.me/96560464711?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <button
      onClick={handleWhatsApp}
      className="whatsapp-float group"
      aria-label={language.code === 'ar' ? 'تواصل عبر الواتساب' : 'Contact via WhatsApp'}
    >
      <MessageCircle className="w-8 h-8 group-hover:scale-110 transition-transform duration-300" />
      
      {/* Tooltip */}
      <div className="absolute bottom-full right-0 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <div className="bg-gray-800 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap shadow-lg">
          {language.code === 'ar' ? 'تواصل معنا' : 'Contact Us'}
          <div className="absolute top-full right-4 border-4 border-transparent border-t-gray-800"></div>
        </div>
      </div>
    </button>
  );
};

export default WhatsAppButton;