
import React from 'react';
import {
  Code, Database, GitBranch, Check, ShieldCheck, FileText, Server,
} from 'lucide-react';
import { FeatureCard } from './FeatureCard';

const featureData = [
  {
    icon: <Code className="w-8 h-8 text-blue-500" />,
    title: "Multi-Technology Support",
    description: "Build CI/CD for frontend, backend, and database stacks. Just pick your stack and generate ready-to-use pipelines—no YAML needed.",
  },
  {
    icon: <Check className="w-8 h-8 text-blue-500" />,
    title: "1-Minute Setup",
    description: "Get deployable CI/CD in seconds. Generate workflows instantly and easily copy, download, or tweak.",
  },
  {
    icon: <ShieldCheck className="w-8 h-8 text-blue-500" />,
    title: "Security & Checks",
    description: "Automatic code linting, formatting, testing, and security scans for safe and worry-free pipelines.",
    bullets: [
      { icon: <Check className="w-4 h-4 text-blue-500" />, text: "Lint, tests, coverage—built-in" },
      { icon: <Check className="w-4 h-4 text-blue-500" />, text: "Security scanning for dependencies" }
    ],
  },
  {
    icon: <GitBranch className="w-8 h-8 text-blue-500" />,
    title: "Workflow Modes",
    description: "Support for multiple environments, branches, blue-green/canary deploy, and custom triggers.",
    
  },
  {
    icon: <FileText className="w-8 h-8 text-blue-500" />,
    title: "Customization",
    description: "Add custom steps, secrets, or Docker flows for as simple or advanced pipelines as you want.",
  },
  {
    icon: <Server className="w-8 h-8 text-blue-500" />,
    title: "Jenkins & More",
    description: "Generate Jenkins, GitHub Actions, GitLab, Bitbucket, or CircleCI pipelines—no plugins or setup needed.",
  }
];

export const FeaturesSection = () => {
  return (
    <section id="features" className="relative w-full py-16 sm:py-20 bg-transparent">
      <div className="max-w-5xl mx-auto px-4 sm:px-8">
        {/* Title */}
        <div className="mb-12 text-center">
          <div className="inline-block px-6 py-2 rounded-full font-black text-lg sm:text-2xl tracking-tight bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 shadow-xl mb-4 border-2 border-blue-200 dark:border-blue-800">
            Everything You Need
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-blue-800 dark:text-blue-100 mb-2">Production-Grade CI/CD—Fast</h2>
          <p className="mx-auto max-w-xl text-lg text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
            Start building pipelines in minutes.<br />
            No vendor lock-in. Infinite extensibility. Simplicity for everyone!
          </p>
        </div>
        {/* Bento Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {featureData.map((f, i) => (
            <FeatureCard
              key={f.title}
              icon={f.icon}
              title={f.title}
              description={f.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
