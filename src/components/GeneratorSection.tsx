
import React, { useState } from 'react';
import { ConfigurationForm } from './ConfigurationForm';
import { YamlPreview } from './YamlPreview';

export const GeneratorSection = () => {
  const [config, setConfig] = useState({
    frontend: '',
    backend: '',
    database: '',
    deployment: '',
    nodeVersions: [],
    addons: {
      linting: false,
      testing: false,
      security: false,
      formatting: false,
      coverage: false
    }
  });

  const [generatedYaml, setGeneratedYaml] = useState('');

  return (
    <section id="generator" className="px-6 py-20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">PIPELINE GENERATOR</h2>
          <p className="text-gray-300 text-lg">
            Configure your stack and generate a production-ready GitHub Actions workflow
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <ConfigurationForm 
            config={config} 
            setConfig={setConfig}
            setGeneratedYaml={setGeneratedYaml}
          />
          <YamlPreview yaml={generatedYaml} />
        </div>
      </div>
    </section>
  );
};
