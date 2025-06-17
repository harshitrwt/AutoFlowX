
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
      <div className="w-full flex flex-col items-center">
        {/* Header remains full-width */}
        <Header />
        {/* Hero full width */}
        <HeroSection />
        {/* All below this: max-w-5xl and centered */}
        <main className="w-full max-w-5xl mx-auto px-4 sm:px-8">
          <FeaturesSection />
          <ReviewsSection />
          <FAQSection />
          {/* Minimal suggestion box, before the footer */}
          <SuggestionBox />
        </main>
        <Footer />
      </div>
    </div>
  );
};
export default Index;
