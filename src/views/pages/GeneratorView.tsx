import React from 'react';
import { GeneratorSection } from '@/views/generator/GeneratorSection';

export const GeneratorView = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-gray-900 dark:to-slate-900">
      <GeneratorSection />
    </div>
  );
};

export default GeneratorView;
