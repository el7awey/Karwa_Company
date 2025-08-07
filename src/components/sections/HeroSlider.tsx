import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Truck, Clock, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import heroTeam from '@/assets/hero-team.jpg';
import heroVehicles from '@/assets/hero-vehicles.jpg';
import heroOperations from '@/assets/hero-operations.jpg';

const HeroSlider = () => {
  const { language, t } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      image: heroTeam,
      title: t('hero.title'),
      subtitle: t('hero.subtitle'),
      features: [
        { icon: Truck, text: language.code === 'ar' ? 'توصيل سريع' : 'Fast Delivery' },
        { icon: Clock, text: language.code === 'ar' ? 'خدمة ٢٤/٧' : '24/7 Service' },
        { icon: Shield, text: language.code === 'ar' ? 'آمن وموثوق' : 'Safe & Secure' }
      ]
    },
    {
      id: 2,
      image: heroVehicles,
      title: language.code === 'ar' ? 'أسطول حديث للتوصيل' : 'Modern Delivery Fleet',
      subtitle: language.code === 'ar' ? 'مركبات متطورة لضمان وصول طلباتك بأمان' : 'Advanced vehicles ensuring safe delivery of your orders',
      features: [
        { icon: Truck, text: language.code === 'ar' ? 'أسطول متنوع' : 'Diverse Fleet' },
        { icon: Clock, text: language.code === 'ar' ? 'تتبع مباشر' : 'Live Tracking' },
        { icon: Shield, text: language.code === 'ar' ? 'تأمين شامل' : 'Full Insurance' }
      ]
    },
    {
      id: 3,
      image: heroOperations,
      title: language.code === 'ar' ? 'عمليات لوجستية متقدمة' : 'Advanced Logistics Operations',
      subtitle: language.code === 'ar' ? 'مركز توزيع حديث لمعالجة طلباتك بكفاءة عالية' : 'Modern distribution center for efficient order processing',
      features: [
        { icon: Truck, text: language.code === 'ar' ? 'معالجة سريعة' : 'Quick Processing' },
        { icon: Clock, text: language.code === 'ar' ? 'إدارة ذكية' : 'Smart Management' },
        { icon: Shield, text: language.code === 'ar' ? 'جودة مضمونة' : 'Quality Assured' }
      ]
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 6000);
    return () => clearInterval(timer);
  }, []);

  const handleWhatsApp = () => {
    window.open('https://wa.me/96560464711?text=السلام عليكم، أود طلب خدمة توصيل', '_blank');
  };

  const scrollToServices = () => {
    document.querySelector('#services')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Slides */}
      <div className="absolute inset-0">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
           <img
             src={slide.image}
             alt={slide.title}
             className="w-full h-full object-contain md:object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-r from-primary/80 via-primary/60 to-secondary/40"></div>
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 lg:px-8 text-center text-white">
        <div className="max-w-4xl mx-auto">
          
          {/* Main Content */}
          <div className="animate-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold mb-6 leading-tight">
              {slides[currentSlide].title}
            </h1>
            
            <p className="text-lg md:text-xl lg:text-2xl mb-8 text-white/90 max-w-3xl mx-auto leading-relaxed">
              {slides[currentSlide].subtitle}
            </p>

            {/* Features */}
            <div className="flex flex-wrap justify-center gap-6 md:gap-8 mb-12">
              {slides[currentSlide].features.map((feature, index) => (
                <div
                  key={index}
                  className={`flex items-center space-x-3 rtl:space-x-reverse bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 animate-fade-in delay-${(index + 1) * 100}`}
                >
                  <feature.icon className="w-5 h-5 md:w-6 md:h-6 text-secondary" />
                  <span className="text-sm md:text-base font-medium">{feature.text}</span>
                </div>
              ))}
            </div>

            {/* Call to Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                onClick={handleWhatsApp}
                className="btn-hero text-lg px-8 py-4 animate-fade-in delay-300"
              >
                {t('hero.cta.primary')}
              </Button>
              
              <Button
                onClick={scrollToServices}
                variant="outline"
                className="btn-outline-hero text-lg px-8 py-4 animate-fade-in delay-400"
              >
                {t('hero.cta.secondary')}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex space-x-3 rtl:space-x-reverse">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide 
                  ? 'bg-white scale-125' 
                  : 'bg-white/50 hover:bg-white/75'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Arrow Navigation */}
      <button
        onClick={prevSlide}
        className="absolute left-4 lg:left-8 top-1/2 transform -translate-y-1/2 z-20 bg-white/10 backdrop-blur-sm hover:bg-white/20 rounded-full p-3 lg:p-4 transition-all duration-300 hover:scale-110"
      >
        <ChevronLeft className="w-6 h-6 lg:w-8 lg:h-8 text-white rtl-flip" />
      </button>
      
      <button
        onClick={nextSlide}
        className="absolute right-4 lg:right-8 top-1/2 transform -translate-y-1/2 z-20 bg-white/10 backdrop-blur-sm hover:bg-white/20 rounded-full p-3 lg:p-4 transition-all duration-300 hover:scale-110"
      >
        <ChevronRight className="w-6 h-6 lg:w-8 lg:h-8 text-white rtl-flip" />
      </button>
    </section>
  );
};

export default HeroSlider;
