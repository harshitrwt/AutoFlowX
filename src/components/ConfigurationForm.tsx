
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { generateYaml } from '@/utils/yamlGenerator';

interface ConfigurationFormProps {
  config: any;
  setConfig: (config: any) => void;
  setGeneratedYaml: (yaml: string) => void;
}

export const ConfigurationForm: React.FC<ConfigurationFormProps> = ({ 
  config, 
  setConfig, 
  setGeneratedYaml 
}) => {
  const handleGenerate = () => {
    const yaml = generateYaml(config);
    setGeneratedYaml(yaml);
  };

  const updateConfig = (key: string, value: any) => {
    setConfig({ ...config, [key]: value });
  };

  const updateAddons = (addon: string, checked: boolean) => {
    setConfig({
      ...config,
      addons: { ...config.addons, [addon]: checked }
    });
  };

  return (
    <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700 p-6">
      <h3 className="text-xl font-bold text-white mb-6">Stack Configuration</h3>
      
      <div className="space-y-6">
        {/* Frontend */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Frontend Framework</label>
          <Select value={config.frontend} onValueChange={(value) => updateConfig('frontend', value)}>
            <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
              <SelectValue placeholder="Select frontend framework" />
            </SelectTrigger>
            <SelectContent className="bg-gray-700 border-gray-600">
              <SelectItem value="none">None</SelectItem>
              <SelectItem value="react">React</SelectItem>
              <SelectItem value="nextjs">Next.js</SelectItem>
              <SelectItem value="vue">Vue.js</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Backend */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Backend Technology</label>
          <Select value={config.backend} onValueChange={(value) => updateConfig('backend', value)}>
            <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
              <SelectValue placeholder="Select backend technology" />
            </SelectTrigger>
            <SelectContent className="bg-gray-700 border-gray-600">
              <SelectItem value="none">None</SelectItem>
              <SelectItem value="nodejs">Node.js</SelectItem>
              <SelectItem value="express">Express</SelectItem>
              <SelectItem value="django">Django</SelectItem>
              <SelectItem value="fastapi">FastAPI</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Database */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Database</label>
          <Select value={config.database} onValueChange={(value) => updateConfig('database', value)}>
            <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
              <SelectValue placeholder="Select database" />
            </SelectTrigger>
            <SelectContent className="bg-gray-700 border-gray-600">
              <SelectItem value="none">None</SelectItem>
              <SelectItem value="postgresql">PostgreSQL</SelectItem>
              <SelectItem value="mongodb">MongoDB</SelectItem>
              <SelectItem value="mysql">MySQL</SelectItem>
              <SelectItem value="sqlite">SQLite</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Deployment */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Deployment Target</label>
          <Select value={config.deployment} onValueChange={(value) => updateConfig('deployment', value)}>
            <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
              <SelectValue placeholder="Select deployment target" />
            </SelectTrigger>
            <SelectContent className="bg-gray-700 border-gray-600">
              <SelectItem value="vercel">Vercel</SelectItem>
              <SelectItem value="netlify">Netlify</SelectItem>
              <SelectItem value="dockerhub">DockerHub</SelectItem>
              <SelectItem value="aws">AWS</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Add-ons */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-3">Add-on Options</label>
          <div className="space-y-3">
            {[
              { key: 'linting', label: 'Linting (ESLint/Black)' },
              { key: 'testing', label: 'Testing (Jest/Pytest)' },
              { key: 'security', label: 'Security Scan (Semgrep/Trivy)' },
              { key: 'formatting', label: 'Formatters (Prettier/Black)' },
              { key: 'coverage', label: 'Code Coverage (Codecov)' }
            ].map(({ key, label }) => (
              <div key={key} className="flex items-center space-x-2">
                <Checkbox
                  id={key}
                  checked={config.addons[key]}
                  onCheckedChange={(checked) => updateAddons(key, checked as boolean)}
                  className="border-gray-500"
                />
                <label htmlFor={key} className="text-sm text-gray-300">{label}</label>
              </div>
            ))}
          </div>
        </div>

        <Button 
          onClick={handleGenerate}
          className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
        >
          Generate Pipeline
        </Button>
      </div>
    </Card>
  );
};
