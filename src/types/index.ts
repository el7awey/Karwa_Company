export interface Language {
  code: 'en' | 'ar';
  name: string;
  direction: 'ltr' | 'rtl';
}

export interface NavigationItem {
  key: string;
  href: string;
}

export interface Testimonial {
  id: number;
  name: string;
  nameAr: string;
  review: string;
  reviewAr: string;
  rating: number;
  location: string;
  locationAr: string;
}

export interface Service {
  id: number;
  title: string;
  titleAr: string;
  description: string;
  descriptionAr: string;
  icon: string;
  features: string[];
  featuresAr: string[];
}

export interface HeroSlide {
  id: number;
  image: string;
  title: string;
  titleAr: string;
  subtitle: string;
  subtitleAr: string;
}