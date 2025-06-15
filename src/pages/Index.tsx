
import React from 'react';
import { Header } from '@/components/Header';
import { HeroSection } from '@/components/HeroSection';
import { FeaturesSection } from '@/components/FeaturesSection';
import { ReviewsSection } from '@/components/ReviewsSection';
import { FAQSection } from '@/components/FAQSection';
import { Footer } from '@/components/Footer';
import { SuggestionBox } from "@/components/SuggestionBox";

const Index = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header />
      <HeroSection />
      <FeaturesSection />
      <ReviewsSection />
      <FAQSection />
      {/* Minimal suggestion box, before the footer */}
      <SuggestionBox />
      <Footer />
    </div>
  );
};

export default Index;
