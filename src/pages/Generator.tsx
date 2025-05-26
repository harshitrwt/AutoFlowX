
import React from 'react';
import { Header } from '@/components/Header';
import { GeneratorSection } from '@/components/GeneratorSection';
import { Footer } from '@/components/Footer';

const Generator = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="pt-20">
        <GeneratorSection />
      </div>
      <Footer />
    </div>
  );
};

export default Generator;
