
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ChevronLeft, ChevronRight, ArrowRight, Zap, Shield, Code } from 'lucide-react';

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

  const renderTechSelection = (category: keyof typeof techOptions, title: string, icon: React.ReactNode) => (
    <div className="space-y-4">
      <div className="flex items-center space-x-3">
        <div className="flex items-center justify-center w-8 h-8 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
          {icon}
        </div>
        <h4 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h4>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {techOptions[category].map((tech) => {
          const isSelected = (config[category] as string[]).includes(tech.id);
          return (
            <div
              key={tech.id}
              onClick={() => toggleTechSelection(category, tech.id)}
              className={`p-4 rounded-xl border cursor-pointer transition-all duration-200 hover:shadow-md ${
                isSelected
                  ? 'bg-orange-50 dark:bg-orange-900/20 border-orange-300 dark:border-orange-600 text-orange-900 dark:text-orange-100 shadow-sm'
                  : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="min-w-0 flex-1">
                  <div className="font-medium truncate">{tech.label}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400 truncate">{tech.description}</div>
                </div>
                {isSelected && (
                  <Badge className="bg-orange-600 text-white ml-2 shrink-0">
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
      title: 'Tech Stack Selection',
      description: 'Choose your technologies',
      content: (
        <div className="space-y-8">
          {renderTechSelection('frontend', 'Frontend Technologies', <Code className="w-4 h-4 text-orange-600" />)}
          {renderTechSelection('backend', 'Backend Technologies', <Zap className="w-4 h-4 text-orange-600" />)}
          {renderTechSelection('database', 'Database & Storage', <Shield className="w-4 h-4 text-orange-600" />)}
        </div>
      )
    },
    {
      title: 'Features & Configuration',
      description: 'Configure pipeline features',
      content: (
        <div className="space-y-6">
          <div>
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">CI/CD Provider</h4>
            <Select value={config.ciProvider} onValueChange={(value) => setConfig({ ...config, ciProvider: value })}>
              <SelectTrigger className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white">
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
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Deployment Target</h4>
            <Select value={config.deployment} onValueChange={(value) => setConfig({ ...config, deployment: value })}>
              <SelectTrigger className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white">
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
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Pipeline Features</h4>
            <div className="grid grid-cols-1 gap-4">
              {[
                { key: 'linting', label: 'Code Linting', description: 'ESLint, Prettier, etc.' },
                { key: 'testing', label: 'Automated Testing', description: 'Jest, Pytest, etc.' },
                { key: 'security', label: 'Security Scanning', description: 'Snyk, Trivy, etc.' },
                { key: 'formatting', label: 'Code Formatting', description: 'Prettier, Black, etc.' },
                { key: 'coverage', label: 'Code Coverage', description: 'Codecov integration' },
                { key: 'environmentVars', label: 'Environment Variables', description: 'Secure env management' },
                { key: 'dockerization', label: 'Dockerization', description: 'Container support' }
              ].map((feature) => (
                <div key={feature.key} className="flex items-start space-x-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                  <Checkbox
                    id={feature.key}
                    checked={config.features[feature.key as keyof typeof config.features]}
                    onCheckedChange={(checked) => updateFeature(feature.key as keyof typeof config.features, checked as boolean)}
                    className="mt-1"
                  />
                  <div className="flex-1 min-w-0">
                    <label htmlFor={feature.key} className="text-sm font-medium text-gray-900 dark:text-white cursor-pointer block">
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
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Selected Technologies</h4>
            <div className="space-y-3">
              {['frontend', 'backend', 'database'].map((category) => {
                const selected = config[category as keyof TechStackConfig] as string[];
                if (selected.length === 0) return null;
                
                return (
                  <div key={category} className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-3">
                    <span className="text-gray-600 dark:text-gray-400 capitalize font-medium min-w-[80px]">{category}:</span>
                    <div className="flex flex-wrap gap-2">
                      {selected.map((tech) => (
                        <Badge key={tech} className="bg-orange-600 text-white">
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
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Configuration</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">CI/CD Provider:</span>
                <span className="text-gray-900 dark:text-white font-medium">{config.ciProvider || 'None selected'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Deployment:</span>
                <span className="text-gray-900 dark:text-white font-medium">{config.deployment || 'None selected'}</span>
              </div>
              <div className="flex justify-between">
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
            className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3 text-lg font-medium"
          >
            Generate Pipeline Configuration 🚀
          </Button>
        </div>
      )
    }
  ];

  const currentStepData = steps[currentStep - 1];

  return (
    <Card className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 p-4 sm:p-6 shadow-xl">
      {/* Step Indicator */}
      <div className="flex items-center justify-between mb-6 sm:mb-8 overflow-x-auto pb-2">
        {steps.map((step, index) => (
          <div key={index} className="flex items-center shrink-0">
            <div
              className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300 ${
                index + 1 <= currentStep
                  ? 'bg-orange-600 text-white shadow-lg'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
              }`}
            >
              {index + 1}
            </div>
            {index < steps.length - 1 && (
              <div className="flex items-center mx-2 sm:mx-4">
                <div className={`w-8 sm:w-12 h-0.5 transition-all duration-300 ${index + 1 < currentStep ? 'bg-orange-600' : 'bg-gray-200 dark:bg-gray-700'}`} />
                <ArrowRight className={`w-4 h-4 ml-1 transition-all duration-300 ${index + 1 < currentStep ? 'text-orange-600' : 'text-gray-300 dark:text-gray-600'}`} />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Step Content */}
      <div className="mb-6 sm:mb-8">
        <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-2">{currentStepData.title}</h3>
        <p className="text-gray-600 dark:text-gray-400 mb-6">{currentStepData.description}</p>
        <div className="overflow-hidden">
          {currentStepData.content}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex flex-col sm:flex-row justify-between space-y-3 sm:space-y-0">
        <Button
          variant="outline"
          onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
          disabled={currentStep === 1}
          className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 w-full sm:w-auto"
        >
          <ChevronLeft className="w-4 h-4 mr-2" />
          Previous
        </Button>
        
        {currentStep < steps.length ? (
          <Button
            onClick={() => setCurrentStep(Math.min(steps.length, currentStep + 1))}
            className="bg-orange-600 hover:bg-orange-700 w-full sm:w-auto"
          >
            Next
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        ) : null}
      </div>
    </Card>
  );
};
