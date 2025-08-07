import React from 'react';
import { Truck, Clock, Package, MapPin, Shield, Zap } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const Services = () => {
  const { language, t } = useLanguage();

  const services = [
    {
      id: 1,
      icon: Zap,
      title: t('service.express.title'),
      description: t('service.express.description'),
      features: language.code === 'ar' 
        ? ['توصيل خلال ساعة', 'تغطية الكويت', 'خدمة طوارئ']
        : ['Delivery within 1 hour', 'Khaitan coverage', 'Emergency service'],
      color: 'from-secondary to-secondary-light'
    },
    {
      id: 2,
      icon: Clock,
      title: t('service.scheduled.title'),
      description: t('service.scheduled.description'),
      features: language.code === 'ar'
        ? ['جدولة مرنة', 'تذكير مسبق', 'توصيل دقيق']
        : ['Flexible scheduling', 'Advance reminder', 'Precise delivery'],
      color: 'from-primary to-primary-light'
    },
    {
      id: 3,
      icon: Package,
      title: t('service.bulk.title'),
      description: t('service.bulk.description'),
      features: language.code === 'ar'
        ? ['أسعار مخفضة', 'للشركات', 'كميات كبيرة']
        : ['Discounted rates', 'For businesses', 'Large quantities'],
      color: 'from-success to-green-400'
    },
    {
      id: 4,
      icon: MapPin,
      title: t('service.tracking.title'),
      description: t('service.tracking.description'),
      features: language.code === 'ar'
        ? ['تتبع مباشر', 'إشعارات فورية', 'موقع دقيق']
        : ['Live tracking', 'Instant notifications', 'Precise location'],
      color: 'from-warning to-yellow-400'
    }
  ];

  return (
    <section id="services" className="py-20 lg:py-32 bg-muted/30">
      <div className="container mx-auto px-4 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-16 lg:mb-20">
          <h2 className="text-3xl lg:text-5xl font-bold mb-6 text-gradient">
            {t('services.title')}
          </h2>
          <p className="text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {t('services.subtitle')}
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div
              key={service.id}
              className={`card-service group animate-fade-in delay-${index * 100}`}
            >
              {/* Icon */}
              <div className={`w-16 h-16 lg:w-20 lg:h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-r ${service.color} flex items-center justify-center shadow-medium group-hover:shadow-glow transition-all duration-500 group-hover:scale-110`}>
                <service.icon className="w-8 h-8 lg:w-10 lg:h-10 text-white" />
              </div>

              {/* Content */}
              <h3 className="text-xl lg:text-2xl font-bold mb-4 text-foreground group-hover:text-primary transition-colors duration-300">
                {service.title}
              </h3>
              
              <p className="text-muted-foreground mb-6 leading-relaxed">
                {service.description}
              </p>

              {/* Features */}
              <ul className="space-y-2">
                {service.features.map((feature, featureIndex) => (
                  <li
                    key={featureIndex}
                    className="flex items-center space-x-3 rtl:space-x-reverse text-sm lg:text-base"
                  >
                    <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${service.color} flex-shrink-0`}></div>
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* Hover Effect */}
              <div className={`absolute inset-0 bg-gradient-to-r ${service.color} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-500 pointer-events-none`}></div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16 lg:mt-20">
          <div className="bg-gradient-card rounded-3xl p-8 lg:p-12 shadow-strong max-w-4xl mx-auto">
            <div className="flex items-center justify-center mb-6">
              <Shield className="w-12 h-12 lg:w-16 lg:h-16 text-primary" />
            </div>
            <h3 className="text-2xl lg:text-3xl font-bold mb-4 text-gradient">
              {language.code === 'ar' ? 'ضمان الجودة والأمان' : 'Quality & Safety Guarantee'}
            </h3>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              {language.code === 'ar' 
                ? 'نضمن وصول طلباتك بأمان مع تأمين شامل على جميع الشحنات'
                : 'We guarantee safe delivery of your orders with comprehensive insurance on all shipments'
              }
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm lg:text-base">
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <div className="w-3 h-3 bg-gradient-primary rounded-full"></div>
                <span>{language.code === 'ar' ? 'تأمين شامل' : 'Full Insurance'}</span>
              </div>
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <div className="w-3 h-3 bg-gradient-secondary rounded-full"></div>
                <span>{language.code === 'ar' ? 'تعويض فوري' : 'Instant Compensation'}</span>
              </div>
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <div className="w-3 h-3 bg-gradient-primary rounded-full"></div>
                <span>{language.code === 'ar' ? 'دعم ٢٤/٧' : '24/7 Support'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;