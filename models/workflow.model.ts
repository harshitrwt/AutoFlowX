export interface WorkflowStep {
  name: string;
  description: string;
  script: string;
}

export interface WorkflowFeatures {
  linting: boolean;
  testing: boolean;
  security: boolean;
  formatting: boolean;
  coverage: boolean;
  environmentVars: boolean;
  dockerization: boolean;
}

export interface WorkflowsBranchConfig {
  main: boolean;
  staging: boolean;
  development: boolean;
  testing: boolean;
  release: boolean;
}

export type WorkflowType = 'single' | 'multiple' | 'main' | 'staging' | 'development' | 'testing' | 'release';

export interface TechStackConfig {
  frontend: string[];
  backend: string[];
  database: string[];
  deployment: string;
  ciProvider: string;
  workflowType: WorkflowType;
  workflows?: WorkflowsBranchConfig;
  workflowSteps?: WorkflowStep[];
  features: WorkflowFeatures;
}

export interface WorkflowResult {
  yaml: string;
  filename: string;
  instructions: string[];
  explanation: string;
}
