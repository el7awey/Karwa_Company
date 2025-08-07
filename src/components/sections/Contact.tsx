import React from 'react';
import { MapPin, Phone, Mail, Clock, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

const Contact = () => {
  const { language, t } = useLanguage();

  const contactInfo = [
    {
      icon: MapPin,
      title: language.code === 'ar' ? 'موقعنا' : 'Our Location',
      info: t('contact.address'),
      description: language.code === 'ar' ? 'نخدم خيطان والمناطق المحيطة' : 'Serving Khaitan and surrounding areas',
      color: 'from-primary to-primary-light'
    },
    {
      icon: Phone,
      title: language.code === 'ar' ? 'اتصل بنا' : 'Call Us',
      info: t('contact.phone'),
      description: language.code === 'ar' ? 'خدمة عملاء ٢٤/٧' : '24/7 Customer Service',
      color: 'from-secondary to-secondary-light'
    },
    {
      icon: Mail,
      title: language.code === 'ar' ? 'راسلنا' : 'Email Us',
      info: t('contact.email'),
      description: language.code === 'ar' ? 'نرد خلال ساعة' : 'We reply within 1 hour',
      color: 'from-success to-green-400'
    },
    {
      icon: Clock,
      title: language.code === 'ar' ? 'ساعات العمل' : 'Working Hours',
      info: language.code === 'ar' ? '٢٤ ساعة / ٧ أيام' : '24 Hours / 7 Days',
      description: language.code === 'ar' ? 'خدمة مستمرة' : 'Continuous Service',
      color: 'from-warning to-yellow-400'
    }
  ];

  const handleWhatsApp = () => {
    const message = language.code === 'ar' 
      ? 'مرحباً، أود الاستفسار عن خدمات التوصيل'
      : 'Hello, I would like to inquire about delivery services';
    window.open(`https://wa.me/96560464711?text=${encodeURIComponent(message)}`, '_blank');
  };

  const handleCall = () => {
    window.open('tel:+96560464711', '_self');
  };

  const handleEmail = () => {
    window.open('mailto:info@kuwaitexpresshub.com', '_self');
  };

  return (
    <section id="contact" className="py-20 lg:py-32 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-16 lg:mb-20">
          <h2 className="text-3xl lg:text-5xl font-bold mb-6 text-gradient">
            {t('contact.title')}
          </h2>
          <p className="text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto">
            {t('contact.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
          
          {/* Contact Information */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              {contactInfo.map((contact, index) => (
                <div
                  key={index}
                  className={`card-elevated group hover-float animate-fade-in delay-${index * 100}`}
                >
                  {/* Icon */}
                  <div className={`w-16 h-16 lg:w-20 lg:h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-r ${contact.color} flex items-center justify-center shadow-medium group-hover:shadow-glow transition-all duration-500 group-hover:scale-110`}>
                    <contact.icon className="w-8 h-8 lg:w-10 lg:h-10 text-white" />
                  </div>

                  {/* Content */}
                  <div className="text-center">
                    <h3 className="text-lg lg:text-xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors duration-300">
                      {contact.title}
                    </h3>
                    <p className="text-base lg:text-lg font-semibold text-primary mb-2">
                      {contact.info}
                    </p>
                    <p className="text-sm lg:text-base text-muted-foreground">
                      {contact.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="space-y-6">
            <div className="card-elevated">
              <div className="text-center mb-8">
                <MessageCircle className="w-16 h-16 lg:w-20 lg:h-20 mx-auto mb-4 text-green-500" />
                <h3 className="text-xl lg:text-2xl font-bold mb-2 text-foreground">
                  {language.code === 'ar' ? 'تواصل سريع' : 'Quick Contact'}
                </h3>
                <p className="text-muted-foreground">
                  {language.code === 'ar' 
                    ? 'اختر الطريقة المناسبة للتواصل معنا'
                    : 'Choose your preferred way to contact us'
                  }
                </p>
              </div>

              <div className="space-y-4">
                <Button
                  onClick={handleWhatsApp}
                  className="w-full bg-green-500 hover:bg-green-600 text-white py-4 text-lg rounded-xl shadow-medium hover:shadow-strong transition-all duration-300 hover:scale-105"
                >
                  <MessageCircle className="w-5 h-5 mr-3 rtl:ml-3 rtl:mr-0" />
                  {t('contact.whatsapp')}
                </Button>

                <Button
                  onClick={handleCall}
                  variant="outline"
                  className="w-full py-4 text-lg rounded-xl border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-105"
                >
                  <Phone className="w-5 h-5 mr-3 rtl:ml-3 rtl:mr-0" />
                  {language.code === 'ar' ? 'اتصل الآن' : 'Call Now'}
                </Button>

                <Button
                  onClick={handleEmail}
                  variant="outline"
                  className="w-full py-4 text-lg rounded-xl border-2 border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground transition-all duration-300 hover:scale-105"
                >
                  <Mail className="w-5 h-5 mr-3 rtl:ml-3 rtl:mr-0" />
                  {language.code === 'ar' ? 'أرسل إيميل' : 'Send Email'}
                </Button>
              </div>
            </div>

            {/* Service Hours */}
            <div className="bg-gradient-to-r from-primary/10 via-transparent to-secondary/10 rounded-2xl p-6 lg:p-8">
              <h4 className="text-lg lg:text-xl font-bold mb-4 text-center text-gradient">
                {language.code === 'ar' ? 'خدمة مستمرة' : 'Always Available'}
              </h4>
              <div className="space-y-3 text-center">
                <div className="flex items-center justify-center space-x-2 rtl:space-x-reverse">
                  <Clock className="w-5 h-5 text-primary" />
                  <span className="text-muted-foreground">
                    {language.code === 'ar' ? 'خدمة ٢٤ ساعة' : '24 Hour Service'}
                  </span>
                </div>
                <div className="flex items-center justify-center space-x-2 rtl:space-x-reverse">
                  <Phone className="w-5 h-5 text-secondary" />
                  <span className="text-muted-foreground">
                    {language.code === 'ar' ? 'دعم فوري' : 'Instant Support'}
                  </span>
                </div>
                <div className="flex items-center justify-center space-x-2 rtl:space-x-reverse">
                  <MessageCircle className="w-5 h-5 text-success" />
                  <span className="text-muted-foreground">
                    {language.code === 'ar' ? 'رد سريع' : 'Quick Response'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 lg:mt-20 text-center">
          <div className="bg-gradient-hero rounded-3xl p-8 lg:p-12 text-white shadow-strong max-w-4xl mx-auto">
            <h3 className="text-2xl lg:text-4xl font-bold mb-4">
              {language.code === 'ar' ? 'جاهز للبدء؟' : 'Ready to Get Started?'}
            </h3>
            <p className="text-lg lg:text-xl mb-8 text-white/90 max-w-2xl mx-auto">
              {language.code === 'ar'
                ? 'انضم إلى آلاف العملاء الراضين واختبر أفضل خدمة توصيل في الكويت'
                : 'Join thousands of satisfied customers and experience the best delivery service in Kuwait'
              }
            </p>
            <Button
              onClick={handleWhatsApp}
              className="bg-white text-primary hover:bg-white/90 px-8 py-4 text-lg font-semibold rounded-xl shadow-medium hover:shadow-strong transition-all duration-300 hover:scale-105"
            >
              {language.code === 'ar' ? 'ابدأ التوصيل الآن' : 'Start Delivery Now'}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;