import React from 'react';
import { Users, MapPin, Award, Clock } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useNavigate } from 'react-router-dom';

const About = () => {
  const { language, t } = useLanguage();
  const navigate = useNavigate();

  const stats = [
    {
      icon: Users,
      number: '1000+',
      label: language.code === 'ar' ? 'عميل راضي' : 'Happy Customers',
      color: 'text-primary'
    },
    {
      icon: MapPin,
      number: '15+',
      label: language.code === 'ar' ? 'منطقة تغطية' : 'Coverage Areas',
      color: 'text-secondary'
    },
    {
      icon: Award,
      number: '99%',
      label: language.code === 'ar' ? 'معدل النجاح' : 'Success Rate',
      color: 'text-success'
    },
    {
      icon: Clock,
      number: '24/7',
      label: language.code === 'ar' ? 'خدمة مستمرة' : 'Continuous Service',
      color: 'text-warning'
    }
  ];

  return (
    <section id="about" className="py-20 lg:py-32 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-16 lg:mb-20">
          <h2 className="text-3xl lg:text-5xl font-bold mb-6 text-gradient leading-relaxed pb-3">
            {t('about.title')}
          </h2>
          <p className="text-lg lg:text-xl text-secondary font-medium mb-8">
            {t('about.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          
          {/* Content */}
          <div className="space-y-8 animate-fade-in">
            <div>
              <h3 className="text-2xl lg:text-3xl font-bold mb-6 text-foreground">
                {language.code === 'ar' 
                  ? 'شركة رائدة في خدمات التوصيل بالكويت'
                  : 'Leading Delivery Company in Kuwait'
                }
              </h3>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                {t('about.description')}
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                {language.code === 'ar'
                  ? 'نفخر بفريق عمل مدرب ومتخصص، وأسطول حديث من المركبات، ونظام تتبع متطور يضمن وصول طلباتكم في الوقت المحدد.'
                  : 'We pride ourselves on our trained specialized team, modern vehicle fleet, and advanced tracking system that ensures your orders arrive on time.'
                }
              </p>
                  <div className="pt-6">
  <a
    href="https://nlhjuscebquwslzqtsva.supabase.co/storage/v1/object/public/about/about.pdf"
    target="_blank"
    rel="noopener noreferrer"
    className="inline-block px-8 py-4 rounded-2xl bg-gradient-to-r from-primary to-secondary text-white font-semibold shadow-lg hover:opacity-90 transition"
  >
    {language.code === 'ar' ? 'اعرف المزيد عنا' : 'Learn More About Us'}
  </a>
</div>
</div>

            {/* Key Features */}
            <div className="space-y-4">
              <h4 className="text-xl font-semibold text-foreground mb-6">
                {language.code === 'ar' ? 'ما يميزنا:' : 'What Sets Us Apart:'}
              </h4>
              
              {[
                {
                  title: language.code === 'ar' ? 'خبرة محلية' : 'Local Expertise',
                  desc: language.code === 'ar' ? 'معرفة عميقة بشوارع ومناطق الكويت' : 'Deep knowledge of Kuwait streets and areas'
                },
                {
                  title: language.code === 'ar' ? 'تقنية متطورة' : 'Advanced Technology',
                  desc: language.code === 'ar' ? 'أنظمة تتبع وإدارة حديثة' : 'Modern tracking and management systems'
                },
                {
                  title: language.code === 'ar' ? 'خدمة عملاء ممتازة' : 'Excellent Customer Service',
                  desc: language.code === 'ar' ? 'دعم مستمر باللغتين العربية والإنجليزية' : 'Continuous support in Arabic and English'
                }
              ].map((feature, index) => (
                <div key={index} className="flex items-start space-x-4 rtl:space-x-reverse">
                  <div className="w-2 h-2 bg-gradient-primary rounded-full mt-3 flex-shrink-0"></div>
                  <div>
                    <h5 className="font-semibold text-foreground mb-1">{feature.title}</h5>
                    <p className="text-muted-foreground">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-6 lg:gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className={`card-elevated text-center group animate-fade-in delay-${index * 100}`}
              >
                <div className="mb-6">
                  <stat.icon className={`w-12 h-12 lg:w-16 lg:h-16 mx-auto ${stat.color} group-hover:scale-110 transition-transform duration-300`} />
                </div>
                <div className={`text-3xl lg:text-4xl font-bold mb-2 ${stat.color}`}>
                  {stat.number}
                </div>
                <div className="text-muted-foreground font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mission Statement */}
        <div className="mt-20 lg:mt-32">
          <div className="bg-gradient-to-r from-primary/10 via-transparent to-secondary/10 rounded-3xl p-8 lg:p-16 text-center">
            <h3 className="text-2xl lg:text-4xl font-bold mb-6 text-gradient pb-3">
              {language.code === 'ar' ? 'رؤيتنا ورسالتنا' : 'Our Vision & Mission'}
            </h3>
            <p className="text-lg lg:text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              {language.code === 'ar'
                ? 'نسعى لأن نكون الخيار الأول لخدمات التوصيل في الكويت من خلال تقديم خدمة متميزة وموثوقة تلبي احتياجات عملائنا وتتجاوز توقعاتهم.'
                : 'We strive to be the first choice for delivery services in Kuwait by providing exceptional and reliable service that meets our customers\' needs and exceeds their expectations.'}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
