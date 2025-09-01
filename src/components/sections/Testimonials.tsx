import React, { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import CustomSelect from "@/components/CustomSelect";
import { supabase } from '@/supabaseClient.js';

const Testimonials = () => {
  const { language, t } = useLanguage();
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [testimonials, setTestimonials] = useState([]);

  // الأماكن
  const kuwaitLocations = [
    { nameAr: "مدينة الكويت", nameEn: "Kuwait City" },
    { nameAr: "حولي", nameEn: "Hawalli" },
    { nameAr: "السالمية", nameEn: "Salmiya" },
    { nameAr: "الفروانية", nameEn: "Farwaniya" },
    { nameAr: "خيطان", nameEn: "Khaitan" },
    { nameAr: "المهبولة", nameEn: "Mahboula" },
    { nameAr: "الفحيحيل", nameEn: "Fahaheel" },
    { nameAr: "المنقف", nameEn: "Mangaf" },
    { nameAr: "الجهراء", nameEn: "Jahra" },
    { nameAr: "أبو حليفة", nameEn: "Abu Halifa" },
    { nameAr: "صباح السالم", nameEn: "Sabah Al Salem" },
    { nameAr: "العدان", nameEn: "Adan" },
    { nameAr: "سلوى", nameEn: "Salwa" },
    { nameAr: "مشرف", nameEn: "Mishref" },
    { nameAr: "الشويخ", nameEn: "Shuwaikh" },
    { nameAr: "الدوحة", nameEn: "Doha" },
    { nameAr: "كيفان", nameEn: "Kaifan" },
    { nameAr: "قرطبة", nameEn: "Qurtuba" },
  ];

  // form states
  const [newName, setNewName] = useState('');
  const [newLocation, setNewLocation] = useState('');
  const [newReview, setNewReview] = useState('');
  const [newRating, setNewRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  // التنقل بين التعليقات
  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  // 👇 تحميل التعليقات من Supabase
  useEffect(() => {
    const fetchTestimonials = async () => {
      const { data, error } = await supabase
        .from('comments')
        .select('*')
        .order('id', { ascending: false });

      if (!error && data) {
        setTestimonials(data);
      }
    };
    fetchTestimonials();
  }, []);

  // auto rotate
  useEffect(() => {
    if (testimonials.length === 0) return;
    const timer = setInterval(nextTestimonial, 5000);
    return () => clearInterval(timer);
  }, [testimonials]);

  // stars render
  const renderStars = (rating, interactive = false) => {
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

  // 👇 الحفظ في Supabase
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newName || !newLocation || !newReview || newRating === 0) return;

    const { data, error } = await supabase
      .from('comments')
      .insert([
        {
          name: newName,
          location: newLocation,
          rating: newRating,
          comment: newReview,
        },
      ])
      .select();

    if (!error && data) {
      setTestimonials([data[0], ...testimonials]);
      setNewName('');
      setNewLocation('');
      setNewReview('');
      setNewRating(0);
    }
  };

  const currentData = testimonials[currentTestimonial] || {};

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
        {testimonials.length > 0 && (
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
                  "{currentData.comment}"
                </blockquote>
                <div className="flex items-center justify-center space-x-4 rtl:space-x-reverse">
                  <div className="w-16 h-16 lg:w-20 lg:h-20 bg-gradient-primary rounded-full flex items-center justify-center text-2xl lg:text-3xl shadow-medium">
                    🧑
                  </div>
                  <div className="text-left rtl:text-right">
                    <h4 className="text-lg lg:text-xl font-bold text-foreground">
                      {currentData.name}
                    </h4>
                    <p className="text-muted-foreground">{currentData.location}</p>
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
        )}

        {/* Add Review Form */}
        <div className="max-w-3xl mx-auto">
          <div className="card-elevated bg-background/60 backdrop-blur-md rounded-2xl shadow-soft p-8 lg:p-10">
            <h3 className="text-2xl lg:text-3xl font-bold mb-6 text-center text-gradient">
              {language.code === 'ar' ? 'شاركنا تجربتك' : 'Share Your Experience'}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name + Location */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder={language.code === 'ar' ? 'الاسم' : 'Name'}
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-muted-foreground/20 bg-muted/30 focus:ring-2 focus:ring-primary focus:outline-none"
                />
                <CustomSelect
                  locations={kuwaitLocations}
                  language={language}
                  value={newLocation}
                  onChange={(val) => setNewLocation(val)}
                />
              </div>

              {/* Review */}
              <textarea
                placeholder={language.code === 'ar' ? 'اكتب رأيك' : 'Write your review'}
                value={newReview}
                onChange={(e) => setNewReview(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-muted-foreground/20 bg-muted/30 focus:ring-2 focus:ring-primary focus:outline-none"
                rows={4}
              />

              {/* Rating */}
              <div className="flex items-center justify-center space-x-2 rtl:space-x-reverse">
                {renderStars(newRating, true)}
              </div>

              {/* Submit */}
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
