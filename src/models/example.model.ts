import { ReactNode } from 'react';

export type PipelineComplexity = 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';

export interface ExamplePipeline {
  id?: string;
  title: string;
  description: string;
  technologies: string[];
  complexity: PipelineComplexity;
  icon?: ReactNode;
  yaml: string;
}
