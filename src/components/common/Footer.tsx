import React from 'react';
import { Facebook, Instagram, Twitter, MapPin, Phone, Mail } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const Footer = () => {
  const { language, t } = useLanguage();

  const socialLinks = [
    { icon: Facebook, href: '#', color: 'hover:text-blue-500' },
    { icon: Instagram, href: '#', color: 'hover:text-pink-500' },
    { icon: Twitter, href: '#', color: 'hover:text-blue-400' },
  ];

  const quickLinks = [
    { key: 'nav.home', href: '#home' },
    { key: 'nav.services', href: '#services' },
    { key: 'nav.about', href: '#about' },
    { key: 'nav.testimonials', href: '#testimonials' },
    { key: 'nav.contact', href: '#contact' },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-foreground text-background py-16 lg:py-20">
      <div className="container mx-auto px-4 lg:px-8">
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12 lg:mb-16">
          
    {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 rtl:space-x-reverse mb-6">
              <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center shadow-medium">
                <span className="text-primary-foreground font-bold text-xl">K</span>
              </div>
              <div>
                <h3 className="text-xl lg:text-2xl font-bold text-white">
                  {language.code === 'ar' ? 'شركة كروة لتوصيل الطلبات' : 'Karwa Delivery Services'}
                </h3>
                <p className="text-sm text-white/70">
                  {language.code === 'ar' ? 'خدمة التوصيل الموثوقة' : 'Reliable Delivery Service'}
                </p>
              </div>
            </div>
            
            <p className="text-white/80 mb-6 leading-relaxed max-w-md">
              {t('footer.description')}
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3 rtl:space-x-reverse text-white/80">
                <MapPin className="w-5 h-5 text-secondary flex-shrink-0" />
                <span>{t('contact.address')}</span>
              </div>
              <div className="flex items-center space-x-3 rtl:space-x-reverse text-white/80">
                <Phone className="w-5 h-5 text-secondary flex-shrink-0" />
                <span>{t('contact.phone')}</span>
              </div>
              <div className="flex items-center space-x-3 rtl:space-x-reverse text-white/80">
                <Mail className="w-5 h-5 text-secondary flex-shrink-0" />
                <span>{t('contact.email')}</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg lg:text-xl font-bold text-white mb-6">
              {language.code === 'ar' ? 'روابط سريعة' : 'Quick Links'}
            </h4>
            <nav className="space-y-3">
              {quickLinks.map((link) => (
                <button
                  key={link.key}
                  onClick={() => scrollToSection(link.href)}
                  className="block text-white/80 hover:text-secondary transition-colors duration-300 text-left"
                >
                  {t(link.key)}
                </button>
              ))}
            </nav>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg lg:text-xl font-bold text-white mb-6">
              {language.code === 'ar' ? 'خدماتنا' : 'Our Services'}
            </h4>
            <div className="space-y-3 text-white/80">
              <div>{language.code === 'ar' ? 'التوصيل السريع' : 'Express Delivery'}</div>
              <div>{language.code === 'ar' ? 'التوصيل المجدول' : 'Scheduled Delivery'}</div>
              <div>{language.code === 'ar' ? 'الطلبات الكبيرة' : 'Bulk Orders'}</div>
              <div>{language.code === 'ar' ? 'التتبع المباشر' : 'Live Tracking'}</div>
            </div>
          </div>
        </div>

        {/* Social Media & Copyright */}
        <div className="border-t border-white/20 pt-8 lg:pt-12">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            
            {/* Social Media */}
            <div className="flex items-center space-x-4 rtl:space-x-reverse">
              <span className="text-white/80 text-sm lg:text-base">
                {t('footer.social')}:
              </span>
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className={`w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 ${social.color}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>

            {/* Copyright */}
            <div className="text-white/60 text-sm lg:text-base text-center md:text-right rtl:md:text-left">
              <p>
                © 2024 {language.code === 'ar' ? 'شركة كروة لتوصيل الطلبات' : 'Karwa Delivery Services'}. {t('footer.rights')}
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Decoration */}
        <div className="mt-8 lg:mt-12 text-center">
          <div className="w-20 h-1 bg-gradient-primary mx-auto rounded-full"></div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
