
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
    <section id="generator" className="px-6 py-20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">ADVANCED PIPELINE GENERATOR</h2>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto">
            Create production-ready CI/CD pipelines tailored to your exact tech stack. 
            Select multiple technologies and get optimized workflows with best practices built-in.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <MultiStepForm 
            config={config} 
            setConfig={setConfig}
            onGenerate={handleGenerate}
          />
          <EnhancedYamlPreview workflow={generatedWorkflow} />
        </div>
      </div>
    </section>
  );
};
