
import React, { useState } from 'react';
import { MultiStepForm } from './MultiStepForm';
import { EnhancedYamlPreview } from './EnhancedYamlPreview';
import { generateAdvancedYaml } from '@/utils/advancedYamlGenerator';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

interface TechStackConfig {
  frontend: string[];
  backend: string[];
  database: string[];
  deployment: string;
  ciProvider: string;
  features: {
    linting: boolean;
    testing: boolean;
    security: boolean;
    formatting: boolean;
    coverage: boolean;
    environmentVars: boolean;
    dockerization: boolean;
  };
}

export const GeneratorSection = () => {
  const [config, setConfig] = useState<TechStackConfig>({
    frontend: [],
    backend: [],
    database: [],
    deployment: '',
    ciProvider: 'github',
    features: {
      linting: false,
      testing: false,
      security: false,
      formatting: false,
      coverage: false,
      environmentVars: false,
      dockerization: false
    }
  });

  const [generatedWorkflow, setGeneratedWorkflow] = useState<{
    yaml: string;
    filename: string;
    instructions: string[];
  }>({
    yaml: '',
    filename: '',
    instructions: []
  });

  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation({ threshold: 0.3 });
  const { ref: formRef, isVisible: formVisible } = useScrollAnimation({ threshold: 0.2 });

  const handleGenerate = () => {
    const workflow = generateAdvancedYaml(config);
    setGeneratedWorkflow(workflow);
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-orange-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-8 sm:py-12 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div 
          ref={headerRef}
          className={`text-center mb-8 sm:mb-12 lg:mb-16 transition-all duration-1000 ease-out ${
            headerVisible ? 'animate-fade-up opacity-100' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="inline-flex items-center justify-center px-4 py-2 bg-orange-100 dark:bg-orange-900/30 rounded-full mb-4">
            <span className="text-orange-600 dark:text-orange-400 text-sm font-medium">
              🚀 Advanced Pipeline Generator
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6">
            Build Production-Ready 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-600">
              {" "}CI/CD Pipelines
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Create optimized workflows tailored to your tech stack with best practices built-in. 
            Generate production-ready configurations in minutes, not hours.
          </p>
        </div>

        {/* Main Content */}
        <div 
          ref={formRef}
          className={`transition-all duration-1000 ease-out delay-200 ${
            formVisible ? 'animate-fade-up opacity-100' : 'opacity-0 translate-y-8'
          }`}
        >
          {/* Desktop Layout */}
          <div className="hidden lg:grid lg:grid-cols-5 gap-8">
            {/* Form Section */}
            <div className="lg:col-span-3">
              <MultiStepForm 
                config={config} 
                setConfig={setConfig}
                onGenerate={handleGenerate}
              />
            </div>
            
            {/* Preview Section */}
            <div className="lg:col-span-2">
              <div className="sticky top-24">
                <EnhancedYamlPreview workflow={generatedWorkflow} />
              </div>
            </div>
          </div>

          {/* Mobile/Tablet Layout */}
          <div className="lg:hidden space-y-6">
            {/* Form Section */}
            <div className="w-full">
              <MultiStepForm 
                config={config} 
                setConfig={setConfig}
                onGenerate={handleGenerate}
              />
            </div>
            
            {/* Preview Section */}
            <div className="w-full">
              <EnhancedYamlPreview workflow={generatedWorkflow} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
