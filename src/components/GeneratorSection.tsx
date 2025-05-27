
import React, { useState } from 'react';
import { MultiStepForm } from './MultiStepForm';
import { EnhancedYamlPreview } from './EnhancedYamlPreview';
import { PipelineLoader } from './PipelineLoader';
import { generateAdvancedYaml } from '@/utils/advancedYamlGenerator';

interface TechStackConfig {
  frontend: string[];
  backend: string[];
  database: string[];
  deployment: string;
  ciProvider: string;
  workflowType: 'single' | 'multiple';
  workflows: {
    main: boolean;
    staging: boolean;
    development: boolean;
    testing: boolean;
    release: boolean;
  };
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
    workflowType: 'single',
    workflows: {
      main: false,
      staging: false,
      development: false,
      testing: false,
      release: false
    },
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

  const [generatedWorkflows, setGeneratedWorkflows] = useState<Array<{
    yaml: string;
    filename: string;
    instructions: string[];
    workflowType?: string;
  }>>([]);

  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = async () => {
    setIsLoading(true);
    
    // Show loader for 1 second
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    try {
      if (config.workflowType === 'single') {
        // Generate single workflow
        const workflow = generateAdvancedYaml(config);
        setGeneratedWorkflows([workflow]);
      } else {
        // Generate multiple workflows based on selected options
        const workflows = [];
        
        if (config.workflows.main) {
          const mainWorkflow = generateAdvancedYaml({ ...config, workflowType: 'main' });
          workflows.push({ ...mainWorkflow, workflowType: 'Production' });
        }
        
        if (config.workflows.staging) {
          const stagingWorkflow = generateAdvancedYaml({ ...config, workflowType: 'staging' });
          workflows.push({ ...stagingWorkflow, workflowType: 'Staging' });
        }
        
        if (config.workflows.development) {
          const devWorkflow = generateAdvancedYaml({ ...config, workflowType: 'development' });
          workflows.push({ ...devWorkflow, workflowType: 'Development' });
        }
        
        if (config.workflows.testing) {
          const testWorkflow = generateAdvancedYaml({ ...config, workflowType: 'testing' });
          workflows.push({ ...testWorkflow, workflowType: 'Testing' });
        }
        
        if (config.workflows.release) {
          const releaseWorkflow = generateAdvancedYaml({ ...config, workflowType: 'release' });
          workflows.push({ ...releaseWorkflow, workflowType: 'Release' });
        }
        
        setGeneratedWorkflows(workflows);
      }
    } catch (error) {
      console.error('Error generating workflows:', error);
      // Handle error appropriately
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <PipelineLoader isVisible={isLoading} />
      
      <section id="generator" className="px-4 sm:px-6 py-6 sm:py-8 lg:py-12 bg-gradient-to-br from-orange-50 to-white dark:from-gray-900 dark:to-gray-800 min-h-screen">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-6 sm:mb-8 lg:mb-10">
            <div className="inline-flex items-center px-4 py-2 bg-orange-100 dark:bg-orange-900/30 border border-orange-200 dark:border-orange-700 rounded-full text-orange-700 dark:text-orange-300 text-sm font-medium mb-4">
              🚀 Advanced Pipeline Generator
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
              Build Your Perfect CI/CD Pipeline
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base lg:text-lg max-w-3xl mx-auto px-2">
              Create production-ready CI/CD pipelines tailored to your exact tech stack. 
              Choose between single or multiple workflows based on your project needs.
            </p>
          </div>

          {/* Responsive Layout */}
          <div className="space-y-6 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-8">
            {/* Configuration Section */}
            <div className="order-1 lg:order-1">
              <div className="bg-white dark:bg-gray-900 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-4 sm:p-6">
                  <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">
                    Configure Your Pipeline
                  </h2>
                  <p className="text-orange-100 text-sm sm:text-base">
                    Choose your workflow strategy and technologies
                  </p>
                </div>
                <div className="p-4 sm:p-6">
                  <MultiStepForm 
                    config={config} 
                    setConfig={setConfig}
                    onGenerate={handleGenerate}
                  />
                </div>
              </div>
            </div>
            
            {/* Preview Section */}
            <div className="order-2 lg:order-2">
              <div className="bg-white dark:bg-gray-900 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden lg:sticky lg:top-24">
                <div className="bg-gradient-to-r from-gray-800 to-gray-900 p-4 sm:p-6">
                  <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">
                    Generated Pipelines
                  </h2>
                  <p className="text-gray-300 text-sm sm:text-base">
                    Your custom CI/CD configurations
                  </p>
                </div>
                <div className="p-4 sm:p-6 space-y-6">
                  {generatedWorkflows.length > 0 ? (
                    generatedWorkflows.map((workflow, index) => (
                      <div key={index}>
                        {workflow.workflowType && (
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                            {workflow.workflowType} Workflow
                          </h3>
                        )}
                        <EnhancedYamlPreview workflow={workflow} />
                      </div>
                    ))
                  ) : (
                    <EnhancedYamlPreview workflow={{ yaml: '', filename: '', instructions: [] }} />
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-gray-900 rounded-lg p-6 text-center border border-gray-200 dark:border-gray-700 shadow-lg">
              <div className="text-2xl sm:text-3xl font-bold text-orange-600 dark:text-orange-400 mb-2">500+</div>
              <div className="text-gray-600 dark:text-gray-400 text-sm">Pipelines Generated</div>
            </div>
            <div className="bg-white dark:bg-gray-900 rounded-lg p-6 text-center border border-gray-200 dark:border-gray-700 shadow-lg">
              <div className="text-2xl sm:text-3xl font-bold text-orange-600 dark:text-orange-400 mb-2">20+</div>
              <div className="text-gray-600 dark:text-gray-400 text-sm">Supported Technologies</div>
            </div>
            <div className="bg-white dark:bg-gray-900 rounded-lg p-6 text-center border border-gray-200 dark:border-gray-700 shadow-lg">
              <div className="text-2xl sm:text-3xl font-bold text-orange-600 dark:text-orange-400 mb-2">99%</div>
              <div className="text-gray-600 dark:text-gray-400 text-sm">Success Rate</div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
