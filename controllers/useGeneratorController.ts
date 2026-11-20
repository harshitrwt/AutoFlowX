import { useState } from 'react';
import { TechStackConfig, WorkflowResult } from '@/models/workflow.model';
import { generateAdvancedYaml } from '@/services/advancedYamlGenerator.service';
import { toast } from '@/hooks/use-toast';

export const initialTechStackConfig: TechStackConfig = {
  frontend: [],
  backend: [],
  database: [],
  deployment: '',
  ciProvider: 'github',
  workflowType: 'single',
  features: {
    linting: false,
    testing: false,
    security: false,
    formatting: false,
    coverage: false,
    environmentVars: false,
    dockerization: false,
  },
};

export const initialWorkflowResult: WorkflowResult = {
  yaml: '',
  filename: '',
  instructions: [],
  explanation: '',
};

export function useGeneratorController() {
  const [config, setConfig] = useState<TechStackConfig>(initialTechStackConfig);
  const [generatedWorkflow, setGeneratedWorkflow] = useState<WorkflowResult>(initialWorkflowResult);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [headerLoading, setHeaderLoading] = useState<boolean>(false);

  const handleGenerate = () => {
    setIsGenerating(true);
    setHeaderLoading(true);

    // Random delay between 5–10s to simulate optimization & generation
    const delay = 5000 + Math.floor(Math.random() * 5000);
    setTimeout(() => {
      const workflow = generateAdvancedYaml(config);
      setGeneratedWorkflow(workflow);
      setIsGenerating(false);
      setHeaderLoading(false);
    }, delay);
  };

  const copyYaml = async (yamlToCopy?: string) => {
    const text = yamlToCopy || generatedWorkflow.yaml;
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: "Copied!",
        description: "Pipeline YAML copied to clipboard",
      });
    } catch {
      toast({
        title: "Error",
        description: "Failed to copy to clipboard",
        variant: "destructive",
      });
    }
  };

  const downloadYaml = (yamlToDownload?: string, filename?: string) => {
    const text = yamlToDownload || generatedWorkflow.yaml;
    const name = filename || generatedWorkflow.filename || 'pipeline.yml';
    if (!text) return;

    const blob = new Blob([text], { type: 'text/yaml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: "Downloaded!",
      description: `${name} downloaded successfully`,
    });
  };

  return {
    config,
    setConfig,
    generatedWorkflow,
    setGeneratedWorkflow,
    isGenerating,
    headerLoading,
    handleGenerate,
    copyYaml,
    downloadYaml,
  };
}
