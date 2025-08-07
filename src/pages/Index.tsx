import React, { useEffect } from 'react';
import Header from '@/components/common/Header';
import HeroSlider from '@/components/sections/HeroSlider';
import Services from '@/components/sections/Services';
import About from '@/components/sections/About';
import Testimonials from '@/components/sections/Testimonials';
import Contact from '@/components/sections/Contact';
import Footer from '@/components/common/Footer';
import WhatsAppButton from '@/components/common/WhatsAppButton';

const Index = () => {
  useEffect(() => {
    // Add smooth scroll behavior to document
    document.documentElement.classList.add('smooth-scroll');
    
    return () => {
      document.documentElement.classList.remove('smooth-scroll');
    };
  }, []);

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      {/* Header */}
      <Header />
      
      {/* Main Content */}
      <main>
        <HeroSlider />
        <Services />
        <About />
        <Testimonials />
        <Contact />
      </main>
      
      {/* Footer */}
      <Footer />
      
      {/* WhatsApp Button */}
      <WhatsAppButton />
    </div>
  );
};

export default Index;
