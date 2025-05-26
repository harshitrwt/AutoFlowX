
import React from 'react';
import { Header } from '@/components/Header';
import { HeroSection } from '@/components/HeroSection';
import { FeaturesSection } from '@/components/FeaturesSection';
import { ReviewsSection } from '@/components/ReviewsSection';
import { FAQSection } from '@/components/FAQSection';
import { Footer } from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header />
      <HeroSection />
      <FeaturesSection />
      <ReviewsSection />
      <FAQSection />
      <Footer />
    </div>
  );
};

export default Index;
