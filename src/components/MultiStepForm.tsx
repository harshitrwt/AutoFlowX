import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { ChevronLeft, ChevronRight, ArrowRight, Zap, GitBranch, Workflow, HelpCircle } from 'lucide-react';

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

interface MultiStepFormProps {
  config: TechStackConfig;
  setConfig: (config: TechStackConfig) => void;
  onGenerate: () => void;
}

export const MultiStepForm: React.FC<MultiStepFormProps> = ({ config, setConfig, onGenerate }) => {
  const [currentStep, setCurrentStep] = useState(1);

  const techOptions = {
    frontend: [
      { id: 'react', label: 'React', description: 'JavaScript library for UI' },
      { id: 'nextjs', label: 'Next.js', description: 'React framework' },
      { id: 'vue', label: 'Vue.js', description: 'Progressive framework' },
      { id: 'angular', label: 'Angular', description: 'TypeScript framework' },
      { id: 'svelte', label: 'Svelte', description: 'Compile-time framework' },
      { id: 'tailwind', label: 'Tailwind CSS', description: 'Utility-first CSS' },
      { id: 'typescript', label: 'TypeScript', description: 'Typed JavaScript' }
    ],
    backend: [
      { id: 'nodejs', label: 'Node.js', description: 'JavaScript runtime' },
      { id: 'express', label: 'Express', description: 'Node.js framework' },
      { id: 'nestjs', label: 'NestJS', description: 'Node.js framework' },
      { id: 'django', label: 'Django', description: 'Python framework' },
      { id: 'fastapi', label: 'FastAPI', description: 'Modern Python API' },
      { id: 'prisma', label: 'Prisma', description: 'Database toolkit' },
      { id: 'graphql', label: 'GraphQL', description: 'Query language' }
    ],
    database: [
      { id: 'postgresql', label: 'PostgreSQL', description: 'Relational database' },
      { id: 'mongodb', label: 'MongoDB', description: 'Document database' },
      { id: 'mysql', label: 'MySQL', description: 'Relational database' },
      { id: 'redis', label: 'Redis', description: 'In-memory store' },
      { id: 'sqlite', label: 'SQLite', description: 'File-based database' }
    ]
  };

  const toggleTechSelection = (category: keyof typeof techOptions, techId: string) => {
    const currentSelection = config[category] as string[];
    const newSelection = currentSelection.includes(techId)
      ? currentSelection.filter(id => id !== techId)
      : [...currentSelection, techId];
    
    setConfig({ ...config, [category]: newSelection });
  };

  const updateFeature = (feature: keyof typeof config.features, value: boolean) => {
    setConfig({
      ...config,
      features: { ...config.features, [feature]: value }
    });
  };

  const updateWorkflow = (workflow: keyof typeof config.workflows, value: boolean) => {
    setConfig({
      ...config,
      workflows: { ...config.workflows, [workflow]: value }
    });
  };

  const renderTechSelection = (category: keyof typeof techOptions, title: string) => (
    <div className="space-y-4">
      <h4 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
        <span className="w-2 h-2 bg-orange-500 rounded-full mr-3"></span>
        {title}
      </h4>
      <div className="grid grid-cols-1 gap-3">
        {techOptions[category].map((tech) => {
          const isSelected = (config[category] as string[]).includes(tech.id);
          return (
            <div
              key={tech.id}
              onClick={() => toggleTechSelection(category, tech.id)}
              className={`p-3 sm:p-4 rounded-lg border cursor-pointer transition-all duration-200 ${
                isSelected
                  ? 'bg-orange-50 dark:bg-orange-900/20 border-orange-300 dark:border-orange-700 text-orange-900 dark:text-orange-100 shadow-md'
                  : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-orange-300 dark:hover:border-orange-700 hover:bg-orange-50 dark:hover:bg-orange-900/10'
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-sm sm:text-base">{tech.label}</div>
                  <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">{tech.description}</div>
                </div>
                {isSelected && (
                  <Badge className="bg-orange-600 text-white text-xs">
                    ✓
                  </Badge>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  const steps = [
    {
      title: 'Workflow Strategy',
      description: 'Choose your workflow approach',
      content: (
        <div className="space-y-6">
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <HelpCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5" />
              <div>
                <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
                  Understanding Workflows
                </h4>
                <p className="text-sm text-blue-800 dark:text-blue-200 mb-2">
                  A workflow defines when and how your code gets built, tested, and deployed. You can have:
                </p>
                <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1 ml-4">
                  <li>• <strong>Single workflow:</strong> One pipeline that handles everything</li>
                  <li>• <strong>Multiple workflows:</strong> Separate pipelines for different environments</li>
                </ul>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <Workflow className="w-5 h-5 mr-2 text-orange-500" />
              Workflow Strategy
            </h4>
            <RadioGroup 
              value={config.workflowType} 
              onValueChange={(value: 'single' | 'multiple') => setConfig({ ...config, workflowType: value })}
              className="space-y-4"
            >
              <div className="flex items-start space-x-3 p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800">
                <RadioGroupItem value="single" id="single" className="mt-1" />
                <div className="flex-1">
                  <Label htmlFor="single" className="text-base font-medium text-gray-900 dark:text-white cursor-pointer">
                    Single Workflow (Recommended for beginners)
                  </Label>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    One comprehensive pipeline that handles build, test, and deployment. Perfect for small to medium projects.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800">
                <RadioGroupItem value="multiple" id="multiple" className="mt-1" />
                <div className="flex-1">
                  <Label htmlFor="multiple" className="text-base font-medium text-gray-900 dark:text-white cursor-pointer">
                    Multiple Workflows (Advanced)
                  </Label>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    Separate workflows for different purposes. Ideal for complex projects with multiple environments.
                  </p>
                </div>
              </div>
            </RadioGroup>
          </div>

          {config.workflowType === 'multiple' && (
            <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
              <h4 className="font-semibold text-yellow-900 dark:text-yellow-100 mb-3 flex items-center">
                <GitBranch className="w-4 h-4 mr-2" />
                Select Workflows to Generate
              </h4>
              <div className="space-y-3">
                {[
                  { key: 'main', label: 'Production Deployment', description: 'Deploys to production from main branch' },
                  { key: 'staging', label: 'Staging Environment', description: 'Deploys to staging for testing' },
                  { key: 'development', label: 'Development Build', description: 'Runs tests and builds on feature branches' },
                  { key: 'testing', label: 'Testing Pipeline', description: 'Comprehensive testing workflow' },
                  { key: 'release', label: 'Release Workflow', description: 'Handles versioning and releases' }
                ].map((workflow) => (
                  <div key={workflow.key} className="flex items-start space-x-3">
                    <Checkbox
                      id={workflow.key}
                      checked={config.workflows[workflow.key as keyof typeof config.workflows]}
                      onCheckedChange={(checked) => updateWorkflow(workflow.key as keyof typeof config.workflows, checked as boolean)}
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <label htmlFor={workflow.key} className="text-sm font-medium text-yellow-900 dark:text-yellow-100 cursor-pointer">
                        {workflow.label}
                      </label>
                      <p className="text-xs text-yellow-700 dark:text-yellow-300">{workflow.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )
    },
    {
      title: 'Tech Stack Selection',
      description: 'Choose your technologies',
      content: (
        <div className="space-y-6 sm:space-y-8">
          {renderTechSelection('frontend', 'Frontend Technologies')}
          {renderTechSelection('backend', 'Backend Technologies')}
          {renderTechSelection('database', 'Database & Storage')}
        </div>
      )
    },
    {
      title: 'Features & Configuration',
      description: 'Configure pipeline features',
      content: (
        <div className="space-y-6">
          <div>
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <span className="w-2 h-2 bg-orange-500 rounded-full mr-3"></span>
              CI/CD Provider
            </h4>
            <Select value={config.ciProvider} onValueChange={(value) => setConfig({ ...config, ciProvider: value })}>
              <SelectTrigger className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white h-12">
                <SelectValue placeholder="Select CI/CD provider" />
              </SelectTrigger>
              <SelectContent className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600">
                <SelectItem value="github">GitHub Actions</SelectItem>
                <SelectItem value="gitlab">GitLab CI</SelectItem>
                <SelectItem value="jenkins">Jenkins</SelectItem>
                <SelectItem value="circleci">CircleCI</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <span className="w-2 h-2 bg-orange-500 rounded-full mr-3"></span>
              Deployment Target
            </h4>
            <Select value={config.deployment} onValueChange={(value) => setConfig({ ...config, deployment: value })}>
              <SelectTrigger className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white h-12">
                <SelectValue placeholder="Select deployment target" />
              </SelectTrigger>
              <SelectContent className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600">
                <SelectItem value="vercel">Vercel</SelectItem>
                <SelectItem value="netlify">Netlify</SelectItem>
                <SelectItem value="docker">Docker Hub</SelectItem>
                <SelectItem value="aws">AWS</SelectItem>
                <SelectItem value="gcp">Google Cloud</SelectItem>
                <SelectItem value="heroku">Heroku</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <span className="w-2 h-2 bg-orange-500 rounded-full mr-3"></span>
              Pipeline Features
            </h4>
            <div className="grid grid-cols-1 gap-3 sm:gap-4">
              {[
                { key: 'linting', label: 'Code Linting', description: 'ESLint, Prettier, etc.' },
                { key: 'testing', label: 'Automated Testing', description: 'Jest, Pytest, etc.' },
                { key: 'security', label: 'Security Scanning', description: 'Snyk, Trivy, etc.' },
                { key: 'formatting', label: 'Code Formatting', description: 'Prettier, Black, etc.' },
                { key: 'coverage', label: 'Code Coverage', description: 'Codecov integration' },
                { key: 'environmentVars', label: 'Environment Variables', description: 'Secure env management' },
                { key: 'dockerization', label: 'Dockerization', description: 'Container support' }
              ].map((feature) => (
                <div key={feature.key} className="flex items-start space-x-3 p-3 sm:p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-orange-50 dark:hover:bg-orange-900/10 transition-colors">
                  <Checkbox
                    id={feature.key}
                    checked={config.features[feature.key as keyof typeof config.features]}
                    onCheckedChange={(checked) => updateFeature(feature.key as keyof typeof config.features, checked as boolean)}
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <label htmlFor={feature.key} className="text-sm font-medium text-gray-900 dark:text-white cursor-pointer">
                      {feature.label}
                    </label>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )
    },
    {
      title: 'Review & Generate',
      description: 'Review your configuration',
      content: (
        <div className="space-y-6">
          <div>
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
              <span className="w-2 h-2 bg-orange-500 rounded-full mr-3"></span>
              Workflow Configuration
            </h4>
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-blue-900 dark:text-blue-100 font-medium">Strategy:</span>
                <Badge className="bg-blue-600 text-white">
                  {config.workflowType === 'single' ? 'Single Workflow' : 'Multiple Workflows'}
                </Badge>
              </div>
              {config.workflowType === 'multiple' && (
                <div className="mt-3">
                  <span className="text-blue-800 dark:text-blue-200 text-sm font-medium">Selected workflows:</span>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {Object.entries(config.workflows)
                      .filter(([_, enabled]) => enabled)
                      .map(([workflow]) => (
                        <Badge key={workflow} className="bg-blue-500 text-white text-xs">
                          {workflow.charAt(0).toUpperCase() + workflow.slice(1)}
                        </Badge>
                      ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
              <span className="w-2 h-2 bg-orange-500 rounded-full mr-3"></span>
              Selected Technologies
            </h4>
            <div className="space-y-3">
              {['frontend', 'backend', 'database'].map((category) => {
                const selected = config[category as keyof TechStackConfig] as string[];
                if (selected.length === 0) return null;
                
                return (
                  <div key={category} className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-3">
                    <span className="text-gray-600 dark:text-gray-400 capitalize min-w-[80px] font-medium text-sm">
                      {category}:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {selected.map((tech) => (
                        <Badge key={tech} className="bg-orange-600 hover:bg-orange-700 text-white text-xs">
                          {techOptions[category as keyof typeof techOptions].find(t => t.id === tech)?.label || tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
              <span className="w-2 h-2 bg-orange-500 rounded-full mr-3"></span>
              Configuration
            </h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between py-2 border-b border-gray-100 dark:border-gray-700">
                <span className="text-gray-600 dark:text-gray-400">CI/CD Provider:</span>
                <span className="text-gray-900 dark:text-white font-medium">{config.ciProvider || 'None selected'}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100 dark:border-gray-700">
                <span className="text-gray-600 dark:text-gray-400">Deployment:</span>
                <span className="text-gray-900 dark:text-white font-medium">{config.deployment || 'None selected'}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-gray-600 dark:text-gray-400">Features:</span>
                <span className="text-gray-900 dark:text-white font-medium">
                  {Object.values(config.features).filter(Boolean).length} enabled
                </span>
              </div>
            </div>
          </div>

          <Button 
            onClick={onGenerate}
            disabled={config.frontend.length === 0 && config.backend.length === 0}
            className="w-full bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white h-12 text-base font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
          >
            <Zap className="w-5 h-5 mr-2" />
            Generate Pipeline Configuration
          </Button>
        </div>
      )
    }
  ];

  const currentStepData = steps[currentStep - 1];

  return (
    <div className="space-y-6">
      {/* Step Indicator */}
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={index} className="flex items-center flex-1">
            <div
              className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                index + 1 <= currentStep
                  ? 'bg-gradient-to-r from-orange-600 to-orange-700 text-white shadow-lg'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
              }`}
            >
              {index + 1}
            </div>
            {index < steps.length - 1 && (
              <div className="flex-1 mx-2 sm:mx-4">
                <div className={`h-1 rounded-full transition-all duration-300 ${
                  index + 1 < currentStep 
                    ? 'bg-gradient-to-r from-orange-600 to-orange-700' 
                    : 'bg-gray-200 dark:bg-gray-700'
                }`} />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Step Content */}
      <div>
        <div className="mb-6">
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-2">
            {currentStepData.title}
          </h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
            {currentStepData.description}
          </p>
        </div>
        {currentStepData.content}
      </div>

      {/* Navigation */}
      <div className="flex justify-between pt-4">
        <Button
          variant="outline"
          onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
          disabled={currentStep === 1}
          className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 h-10 sm:h-12"
        >
          <ChevronLeft className="w-4 h-4 mr-2" />
          Previous
        </Button>
        
        {currentStep < steps.length ? (
          <Button
            onClick={() => setCurrentStep(Math.min(steps.length, currentStep + 1))}
            className="bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white h-10 sm:h-12"
          >
            Next
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        ) : null}
      </div>
    </div>
  );
};
