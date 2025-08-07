import React, { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const Testimonials = () => {
  const { language, t } = useLanguage();
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: 'Ahmed Al-Rashid',
      nameAr: 'أحمد الراشد',
      review: 'Excellent service! They delivered my order within 30 minutes. Very professional and reliable.',
      reviewAr: 'خدمة ممتازة! وصل طلبي خلال ٣٠ دقيقة. خدمة مهنية وموثوقة جداً.',
      rating: 5,
      location: 'Khaitan',
      locationAr: 'خيطان',
      avatar: '👨'
    },
    {
      id: 2,
      name: 'Fatima Al-Zahra',
      nameAr: 'فاطمة الزهراء',
      review: 'Kuwait Express Hub has been my go-to delivery service for months. Always on time and careful with packages.',
      reviewAr: 'مركز الكويت السريع هو خياري المفضل للتوصيل منذ شهور. دائماً في الوقت المحدد ويتعاملون مع الطرود بحذر.',
      rating: 5,
      location: 'Ardiya',
      locationAr: 'أرضية',
      avatar: '👩'
    },
    {
      id: 3,
      name: 'Mohammad Al-Salem',
      nameAr: 'محمد السالم',
      review: 'Great customer service and competitive prices. The tracking system is very helpful.',
      reviewAr: 'خدمة عملاء رائعة وأسعار تنافسية. نظام التتبع مفيد جداً.',
      rating: 5,
      location: 'Farwaniya',
      locationAr: 'الفروانية',
      avatar: '👨‍💼'
    },
    {
      id: 4,
      name: 'Sarah Al-Mutairi',
      nameAr: 'سارة المطيري',
      review: 'Professional team and fast delivery. I especially appreciate their WhatsApp support.',
      reviewAr: 'فريق مهني وتوصيل سريع. أقدر خاصة دعمهم عبر الواتساب.',
      rating: 5,
      location: 'Jleeb Al-Shuyoukh',
      locationAr: 'جليب الشيوخ',
      avatar: '👩‍💻'
    },
    {
      id: 5,
      name: 'Abdullah Al-Hajri',
      nameAr: 'عبدالله الهاجري',
      review: 'Been using their service for my business. Bulk delivery rates are excellent and service is consistent.',
      reviewAr: 'أستخدم خدمتهم لأعمالي. أسعار التوصيل بالجملة ممتازة والخدمة ثابتة.',
      rating: 5,
      location: 'Khaitan',
      locationAr: 'خيطان',
      avatar: '👨‍🔧'
    }
  ];

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    const timer = setInterval(nextTestimonial, 5000);
    return () => clearInterval(timer);
  }, []);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-5 h-5 ${
          i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  const currentData = testimonials[currentTestimonial];

  return (
    <section id="testimonials" className="py-20 lg:py-32 bg-muted/30">
      <div className="container mx-auto px-4 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-16 lg:mb-20">
          <h2 className="text-3xl lg:text-5xl font-bold mb-6 text-gradient">
            {t('testimonials.title')}
          </h2>
          <p className="text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto">
            {t('testimonials.subtitle')}
          </p>
        </div>

        {/* Main Testimonial */}
        <div className="max-w-4xl mx-auto">
          <div className="card-elevated relative overflow-hidden">
            {/* Quote Icon */}
            <div className="absolute top-6 left-6 lg:top-8 lg:left-8">
              <Quote className="w-12 h-12 lg:w-16 lg:h-16 text-primary/20 transform rotate-180" />
            </div>
            
            {/* Content */}
            <div className="relative z-10 p-8 lg:p-12 text-center">
              
              {/* Stars */}
              <div className="flex justify-center mb-6">
                {renderStars(currentData.rating)}
              </div>

              {/* Review Text */}
              <blockquote className="text-lg lg:text-2xl text-foreground mb-8 leading-relaxed font-medium">
                "{language.code === 'ar' ? currentData.reviewAr : currentData.review}"
              </blockquote>

              {/* Author Info */}
              <div className="flex items-center justify-center space-x-4 rtl:space-x-reverse">
                <div className="w-16 h-16 lg:w-20 lg:h-20 bg-gradient-primary rounded-full flex items-center justify-center text-2xl lg:text-3xl shadow-medium">
                  {currentData.avatar}
                </div>
                <div className="text-left rtl:text-right">
                  <h4 className="text-lg lg:text-xl font-bold text-foreground">
                    {language.code === 'ar' ? currentData.nameAr : currentData.name}
                  </h4>
                  <p className="text-muted-foreground">
                    {language.code === 'ar' ? currentData.locationAr : currentData.location}
                  </p>
                </div>
              </div>
            </div>

            {/* Background Decoration */}
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-secondary opacity-5 rounded-tl-full"></div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8 lg:mt-12">
            
            {/* Previous Button */}
            <button
              onClick={prevTestimonial}
              className="bg-muted hover:bg-muted/80 rounded-full p-3 lg:p-4 transition-all duration-300 hover:scale-110 shadow-soft hover:shadow-medium"
            >
              <ChevronLeft className="w-6 h-6 lg:w-8 lg:h-8 text-foreground rtl-flip" />
            </button>

            {/* Dots Indicator */}
            <div className="flex space-x-3 rtl:space-x-reverse">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentTestimonial
                      ? 'bg-primary scale-125'
                      : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                  }`}
                />
              ))}
            </div>

            {/* Next Button */}
            <button
              onClick={nextTestimonial}
              className="bg-muted hover:bg-muted/80 rounded-full p-3 lg:p-4 transition-all duration-300 hover:scale-110 shadow-soft hover:shadow-medium"
            >
              <ChevronRight className="w-6 h-6 lg:w-8 lg:h-8 text-foreground rtl-flip" />
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mt-16 lg:mt-20">
          {[
            {
              number: '98%',
              label: language.code === 'ar' ? 'رضا العملاء' : 'Customer Satisfaction',
              color: 'text-primary'
            },
            {
              number: '4.9/5',
              label: language.code === 'ar' ? 'متوسط التقييم' : 'Average Rating',
              color: 'text-yellow-500'
            },
            {
              number: '5000+',
              label: language.code === 'ar' ? 'تقييم إيجابي' : 'Positive Reviews',
              color: 'text-success'
            },
            {
              number: '99.5%',
              label: language.code === 'ar' ? 'التوصيل في الوقت' : 'On-Time Delivery',
              color: 'text-secondary'
            }
          ].map((stat, index) => (
            <div
              key={index}
              className={`text-center p-6 rounded-2xl bg-background/50 backdrop-blur-sm shadow-soft animate-fade-in delay-${index * 100}`}
            >
              <div className={`text-2xl lg:text-3xl font-bold mb-2 ${stat.color}`}>
                {stat.number}
              </div>
              <div className="text-sm lg:text-base text-muted-foreground font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;