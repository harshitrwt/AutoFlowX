
import React, { useState } from 'react';
import { MultiStepForm } from './MultiStepForm';
import { EnhancedYamlPreview } from './EnhancedYamlPreview';
import { generateAdvancedYaml } from '@/utils/advancedYamlGenerator';

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

  const handleGenerate = () => {
    const workflow = generateAdvancedYaml(config);
    setGeneratedWorkflow(workflow);
  };

  return (
    <section id="generator" className="px-4 sm:px-6 py-12 sm:py-20 bg-white dark:bg-gray-900 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">ADVANCED PIPELINE GENERATOR</h2>
          <p className="text-gray-600 dark:text-gray-400 text-base sm:text-lg max-w-3xl mx-auto">
            Create production-ready CI/CD pipelines tailored to your exact tech stack. 
            Select multiple technologies and get optimized workflows with best practices built-in.
          </p>
        </div>

        {/* Mobile-first responsive layout */}
        <div className="flex flex-col lg:grid lg:grid-cols-5 lg:gap-8 space-y-8 lg:space-y-0">
          <div className="lg:col-span-3 order-1 lg:order-1">
            <MultiStepForm 
              config={config} 
              setConfig={setConfig}
              onGenerate={handleGenerate}
            />
          </div>
          <div className="lg:col-span-2 order-2 lg:order-2">
            <div className="lg:sticky lg:top-24">
              <EnhancedYamlPreview workflow={generatedWorkflow} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
