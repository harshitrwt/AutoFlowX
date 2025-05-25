
import React from 'react';
import { Header } from '@/components/Header';
import { HeroSection } from '@/components/HeroSection';
import { FeaturesSection } from '@/components/FeaturesSection';
import { GeneratorSection } from '@/components/GeneratorSection';

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <HeroSection />
      <div className="bg-gray-50">
        <FeaturesSection />
      </div>
      <GeneratorSection />
    </div>
  );
};

export default Index;
