import React, { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const Testimonials = () => {
  const { language, t } = useLanguage();
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [testimonials, setTestimonials] = useState([
    {
      id: 1,
      name: 'Ahmed Al-Rashid',
      nameAr: 'أحمد الراشد',
      review: 'Excellent service! They delivered my order within 30 minutes. Very professional and reliable.',
      reviewAr: 'خدمة ممتازة! وصل طلبي خلال ٣٠ دقيقة. خدمة مهنية وموثوقة جداً.',
      rating: 5,
      location: 'Khaitan',
      locationAr: 'خيطان',
      avatar: '👨',
    },
    {
      id: 2,
      name: 'Fatima Al-Zahra',
      nameAr: 'فاطمة الزهراء',
      review: 'Kuwait Express Hub has been my go-to delivery service for months. Always on time and careful with packages.',
      reviewAr: 'ِشركة كروة هي خياري المفضل للتوصيل منذ شهور. دائماً في الوقت المحدد ويتعاملون مع الطرود بحذر.',
      rating: 5,
      location: 'Ardiya',
      locationAr: 'أرضية',
      avatar: '👩',
    },
  ]);

  // form states
  const [newName, setNewName] = useState('');
  const [newLocation, setNewLocation] = useState('');
  const [newReview, setNewReview] = useState('');
  const [newRating, setNewRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    const timer = setInterval(nextTestimonial, 5000);
    return () => clearInterval(timer);
  }, [testimonials]);

  const renderStars = (rating: number, interactive = false) => {
    return Array.from({ length: 5 }, (_, i) => {
      const starValue = i + 1;
      return (
        <Star
          key={i}
          className={`w-6 h-6 cursor-pointer transition-colors ${
            starValue <= (interactive ? (hoverRating || newRating) : rating)
              ? 'text-yellow-400 fill-current'
              : 'text-gray-300'
          }`}
          onMouseEnter={interactive ? () => setHoverRating(starValue) : undefined}
          onMouseLeave={interactive ? () => setHoverRating(0) : undefined}
          onClick={interactive ? () => setNewRating(starValue) : undefined}
        />
      );
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName || !newLocation || !newReview || newRating === 0) return;

    const newTestimonial = {
      id: testimonials.length + 1,
      name: newName,
      nameAr: newName,
      review: newReview,
      reviewAr: newReview,
      rating: newRating,
      location: newLocation,
      locationAr: newLocation,
      avatar: '🧑',
    };

    setTestimonials([newTestimonial, ...testimonials]);
    setNewName('');
    setNewLocation('');
    setNewReview('');
    setNewRating(0);
  };

  const currentData = testimonials[currentTestimonial];

  return (
    <section id="testimonials" className="py-20 lg:py-32 bg-muted/30">
      <div className="container mx-auto px-4 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-16 lg:mb-20">
          <h2 className="text-3xl lg:text-5xl font-bold mb-6 text-gradient pb-3">
            {t('testimonials.title')}
          </h2>
          <p className="text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto">
            {t('testimonials.subtitle')}
          </p>
        </div>

{/* Main Testimonial */}
<div className="max-w-4xl mx-auto mb-16">
  <div className="card-elevated relative overflow-hidden">
    <div className="absolute top-6 left-6 lg:top-8 lg:left-8">
      <Quote className="w-12 h-12 lg:w-16 lg:h-16 text-primary/20 transform rotate-180" />
    </div>

    <div className="relative z-10 p-8 lg:p-12 text-center">
      <div className="flex justify-center mb-6">
        {renderStars(currentData.rating)}
      </div>
      <blockquote className="text-lg lg:text-2xl text-foreground mb-8 leading-relaxed font-medium">
        "{language.code === 'ar' ? currentData.reviewAr : currentData.review}"
      </blockquote>
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

    <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-secondary opacity-5 rounded-tl-full"></div>
  </div>

  {/* Navigation */}
  <div className="flex items-center justify-between mt-8 lg:mt-12">
    <button
      onClick={prevTestimonial}
      className="bg-muted hover:bg-muted/80 rounded-full p-3 lg:p-4 transition-all duration-300 hover:scale-110 shadow-soft hover:shadow-medium"
    >
      <ChevronLeft className="w-6 h-6 lg:w-8 lg:h-8 text-foreground rtl-flip" />
    </button>
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
    <button
      onClick={nextTestimonial}
      className="bg-muted hover:bg-muted/80 rounded-full p-3 lg:p-4 transition-all duration-300 hover:scale-110 shadow-soft hover:shadow-medium"
    >
      <ChevronRight className="w-6 h-6 lg:w-8 lg:h-8 text-foreground rtl-flip" />
    </button>
  </div>
</div>

{/* Add Review Form */}
<div className="max-w-3xl mx-auto">
  <div className="card-elevated bg-background/60 backdrop-blur-md rounded-2xl shadow-soft p-8 lg:p-10">
    <h3 className="text-2xl lg:text-3xl font-bold mb-6 text-center text-gradient">
      {language.code === 'ar' ? 'شاركنا تجربتك' : 'Share Your Experience'}
    </h3>
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          placeholder={language.code === 'ar' ? 'الاسم' : 'Name'}
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          className="w-full px-4 py-3 rounded-xl border border-muted-foreground/20 bg-muted/30 focus:ring-2 focus:ring-primary focus:outline-none"
        />
        <input
          type="text"
          placeholder={language.code === 'ar' ? 'المكان' : 'Location'}
          value={newLocation}
          onChange={(e) => setNewLocation(e.target.value)}
          className="w-full px-4 py-3 rounded-xl border border-muted-foreground/20 bg-muted/30 focus:ring-2 focus:ring-primary focus:outline-none"
        />
      </div>
      <textarea
        placeholder={language.code === 'ar' ? 'اكتب رأيك' : 'Write your review'}
        value={newReview}
        onChange={(e) => setNewReview(e.target.value)}
        className="w-full px-4 py-3 rounded-xl border border-muted-foreground/20 bg-muted/30 focus:ring-2 focus:ring-primary focus:outline-none"
        rows={4}
      />
      <div className="flex items-center justify-center space-x-2 rtl:space-x-reverse">
        {renderStars(newRating, true)}
      </div>
      <div className="flex justify-center">
        <button
          type="submit"
          className="bg-gradient-primary text-white px-8 py-3 rounded-2xl font-semibold shadow-soft hover:shadow-medium transition-all"
        >
          {language.code === 'ar' ? 'إرسال التقييم' : 'Submit Review'}
        </button>
      </div>
    </form>
        </div>
</div>
</div>
    </section>
    
  );
};

export default Testimonials;
