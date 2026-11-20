import React from 'react';
import { Header } from '@/views/layout/Header';
import { HeroSection } from '@/views/landing/HeroSection';
import { FeaturesSection } from '@/views/landing/FeaturesSection';
import { ReviewsSection } from '@/views/landing/ReviewsSection';
import { FAQSection } from '@/views/landing/FAQSection';
import { Footer } from '@/views/layout/Footer';
import { AnimatedLogos } from '@/views/landing/AnimatedLogos';
import { SuggestionBox } from '@/views/landing/SuggestionBox';

export const HomeView = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200">
      <Header />
      <HeroSection />
      <AnimatedLogos />
      <FeaturesSection />
      <ReviewsSection />
      <FAQSection />
      <SuggestionBox />
      <Footer />
    </div>
  );
};

export default HomeView;
