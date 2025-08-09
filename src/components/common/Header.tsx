import React, { useState, useEffect, useRef } from 'react';
import { Moon, Sun, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage, languages } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';

const Path = (props: any) => (
  <motion.path
    fill="transparent"
    strokeWidth="3"
    stroke="currentColor"
    strokeLinecap="round"
    {...props}
  />
);

const AnimatedHamburger = ({ toggled, toggle }: { toggled: boolean; toggle: () => void }) => {
  return (
    <button
      onClick={toggle}
      aria-label={toggled ? 'Close menu' : 'Open menu'}
      className="w-10 h-10 flex flex-col justify-center items-center"
    >
      <svg width="24" height="24" viewBox="0 0 24 24">
        <Path
          variants={{
            closed: { d: "M 3 7 L 21 7" },
            open: { d: "M 6 18 L 18 6" }
          }}
          initial="closed"
          animate={toggled ? "open" : "closed"}
          transition={{ duration: 0.3 }}
        />
        <Path
          d="M 3 12 L 21 12"
          variants={{
            closed: { opacity: 1 },
            open: { opacity: 0 }
          }}
          initial="closed"
          animate={toggled ? "open" : "closed"}
          transition={{ duration: 0.3 }}
        />
        <Path
          variants={{
            closed: { d: "M 3 17 L 21 17" },
            open: { d: "M 6 6 L 18 18" }
          }}
          initial="closed"
          animate={toggled ? "open" : "closed"}
          transition={{ duration: 0.3 }}
        />
      </svg>
    </button>
  );
};

const Header = () => {
  const { language, setLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);

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

  // إغلاق القائمة لما تضغط خارجها
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (isMenuOpen && menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border/50 shadow-soft">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">

          {/* Logo */}
          <div className="flex items-center space-x-3 rtl:space-x-reverse">
            <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-xl overflow-hidden shadow-medium bg-white dark:bg-zinc-900">
              <img
                src="/logo.png"
                alt="Karwa Logo Light"
                className="w-full h-full object-contain block dark:hidden"
              />
              <img
                src="/logo_dark2.png"
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
              className="lang-switcher flex items-center space-x-2 rtl:space-x-reverse text-sm font-medium hover:text-primary transition-colors duration-300 px-3 py-2 rounded-lg hover:bg-muted/50"
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

            {/* Mobile Menu Toggle with Animated Hamburger */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden w-10 h-10 rounded-full bg-muted/50 hover:bg-muted transition-colors"
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            >
              <AnimatedHamburger toggled={isMenuOpen} toggle={() => setIsMenuOpen(!isMenuOpen)} />
            </Button>
          </div>
        </div>

        {/* Animated Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <>
              {/* خلفية ضبابية تغطي الشاشة */}
              <motion.div
                className="fixed inset-0 bg-black/30 backdrop-blur-sm z-30"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsMenuOpen(false)}
              />

              {/* القائمة تظهر تحت الهيدر مع محاذاة النص حسب اللغة */}
              <motion.div
                ref={menuRef}
                initial={{ y: "-100%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: "-100%", opacity: 0 }}
                transition={{ type: 'spring', damping: 25, stiffness: 200, duration: 0.6 }}
                className={`fixed top-[65px] left-0 w-full bg-background z-40 shadow-lg border-b border-border/50 ${
                  language.code === 'ar' ? 'rtl text-right' : 'ltr text-left'
                }`}
              >
                <nav className="p-6 space-y-3">
                  {navigationItems.map((item, index) => (
                    <motion.button
                      key={item.key}
                      onClick={() => scrollToSection(item.href)}
                      className="block w-full px-4 py-3 text-foreground hover:text-primary hover:bg-muted/50 rounded-xl transition-all duration-300 font-medium"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.1 + index * 0.05, ease: "easeOut" }}
                      whileHover={{ x: 8, scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {t(item.key)}
                    </motion.button>
                  ))}

                  {/* Language Switcher في القائمة الجوال */}
                  <motion.div
                    className="pt-4 border-t border-border/50"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.4 }}
                  >
                    <button
                      onClick={toggleLanguage}
                      className="flex items-center space-x-3 rtl:space-x-reverse w-full px-4 py-3 text-muted-foreground hover:text-primary hover:bg-muted/50 rounded-xl transition-all duration-300"
                    >
                      <Globe className="w-5 h-5" />
                      <span>{language.code === 'en' ? 'Switch to العربية' : 'Switch to English'}</span>
                    </button>
                  </motion.div>
                </nav>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Header;
