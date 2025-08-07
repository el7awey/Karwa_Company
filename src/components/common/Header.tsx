import React, { useState } from 'react';
import { Moon, Sun, Globe, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage, languages } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';

const Header = () => {
  const { language, setLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigationItems = [
    { key: 'nav.home', href: '#home' },
    { key: 'nav.services', href: '#services' },
    { key: 'nav.about', href: '#about' },
    { key: 'nav.testimonials', href: '#testimonials' },
    { key: 'nav.contact', href: '#contact' },
  ];

  const toggleLanguage = () => {
    const newLang = language.code === 'en' ? languages[1] : languages[0];
    setLanguage(newLang);
    setIsMenuOpen(false);
  };

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border/50 shadow-soft">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          
     {/* Logo */}
<div className="flex items-center space-x-3 rtl:space-x-reverse">
  <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-xl overflow-hidden shadow-medium bg-white dark:bg-zinc-900">
    {/* Light Mode Logo */}
    <img
      src="/logo.png" // ← الصورة المناسبة للوضع الفاتح
      alt="Karwa Logo Light"
      className="w-full h-full object-contain block dark:hidden"
    />
    {/* Dark Mode Logo */}
    <img
      src="/logo_dark2.png" // ← الصورة المناسبة للوضع الداكن
      alt="Karwa Logo Dark"
      className="w-full h-full object-contain hidden dark:block"
    />
  </div>
  <div className="hidden sm:block">
    <h1 className="text-xl lg:text-2xl font-bold text-gradient">
      {language.code === 'ar' ? 'شركة كروة لتوصيل الطلبات' : 'Karwa Delivery Services'}
    </h1>
    <p className="text-xs lg:text-sm text-muted-foreground">
      {language.code === 'ar' ? 'خدمة التوصيل الموثوقة' : 'Reliable Delivery Service'}
    </p>
  </div>
</div>



          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8 rtl:space-x-reverse">
            {navigationItems.map((item) => (
              <button
                key={item.key}
                onClick={() => scrollToSection(item.href)}
                className="text-foreground hover:text-primary transition-colors duration-300 font-medium relative group"
              >
                {t(item.key)}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-primary transition-all duration-300 group-hover:w-full"></span>
              </button>
            ))}
          </nav>

          {/* Controls */}
          <div className="flex items-center space-x-3 rtl:space-x-reverse">
            
            {/* Language Switcher */}
            <button
              onClick={toggleLanguage}
              className="lang-switcher flex items-center space-x-2 rtl:space-x-reverse text-sm font-medium"
            >
              <Globe className="w-4 h-4" />
              <span>{language.code === 'en' ? 'العربية' : 'English'}</span>
            </button>

            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              className="w-10 h-10 rounded-full bg-muted/50 hover:bg-muted transition-colors"
            >
              {theme === 'light' ? (
                <Moon className="w-5 h-5" />
              ) : (
                <Sun className="w-5 h-5" />
              )}
            </Button>

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden w-10 h-10 rounded-full bg-muted/50 hover:bg-muted transition-colors"
            >
              {isMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-border/50 bg-background/95 backdrop-blur-sm">
            <nav className="py-4 space-y-3">
              {navigationItems.map((item) => (
                <button
                  key={item.key}
                  onClick={() => scrollToSection(item.href)}
                  className="block w-full text-left px-4 py-2 text-foreground hover:text-primary hover:bg-muted/50 rounded-lg transition-all duration-300 font-medium"
                >
                  {t(item.key)}
                </button>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;