
import React from 'react';
import {
  Code, CheckCircle, Shield, Zap, GitBranch, Settings, Github, FileText, ListChecks, Users, MessageCircle, Server, Wrench, Hammer
} from 'lucide-react';
import { FeatureCard } from './FeatureCard';

const featureData = [
  {
    icon: <Code className="w-8 h-8 text-orange-400" />,
    title: "Multi-Technology Support",
    description: "Easily build CI/CD workflows for modern frontend, backend, and database stacks. No YAML expertise needed—just choose your stack and the pipeline is ready for you.",
    bullets: [
      { icon: <Code className="w-4 h-4 text-orange-400" />, text: "Web, backend, and mobile frameworks" },
      { icon: <Server className="w-4 h-4 text-orange-400" />, text: "All popular databases" },
      { icon: <Github className="w-4 h-4 text-orange-400" />, text: "Integrates with GitHub, GitLab, Bitbucket, Jenkins" },
      { icon: <FileText className="w-4 h-4 text-orange-400" />, text: "PR workflows, microservices & monorepos" }
    ],
    colorClass: "border border-orange-500 bg-[#191c1f] hover:bg-[#23262a] transition-colors",
  },
  {
    icon: <Zap className="w-8 h-8 text-orange-400" />,
    title: "1-Minute Setup",
    description: "Go from idea to deployable CI/CD in 60 seconds or less. Generate workflows instantly and copy, download, or tweak them with a click.",
    bullets: [
      { icon: <CheckCircle className="w-4 h-4 text-orange-400" />, text: "Zero manual YAML" },
      { icon: <CheckCircle className="w-4 h-4 text-orange-400" />, text: "Best practices auto-included" }
    ],
    colorClass: "border border-orange-500 bg-[#191c1f] hover:bg-[#23262a] transition-colors",
  },
  {
    icon: <Shield className="w-8 h-8 text-orange-400" />,
    title: "Security & Checks",
    description: "Out-of-the-box security scans, automated code linting, formatting, and test support for a worry-free pipeline.",
    bullets: [
      { icon: <CheckCircle className="w-4 h-4 text-orange-400" />, text: "Lint, tests, coverage—built-in" },
      { icon: <CheckCircle className="w-4 h-4 text-orange-400" />, text: "Security scanning for dependencies" }
    ],
    colorClass: "border border-orange-500 bg-[#191c1f] hover:bg-[#23262a] transition-colors",
  },
  {
    icon: <GitBranch className="w-8 h-8 text-orange-400" />,
    title: "Advanced Workflow Modes",
    description: "Supports multiple environments, branches, blue-green/canary deploys, and custom triggers—ready for any scenario.",
    bullets: [
      { icon: <CheckCircle className="w-4 h-4 text-orange-400" />, text: "Multi-environment (staging/prod)" },
      { icon: <CheckCircle className="w-4 h-4 text-orange-400" />, text: "Branch/tag triggers" }
    ],
    colorClass: "border border-orange-500 bg-[#191c1f] hover:bg-[#23262a] transition-colors",
  },
  {
    icon: <Settings className="w-8 h-8 text-orange-400" />,
    title: "Full Customization",
    description: "Drag in your custom steps, secrets, or Docker flows—get as simple or advanced as you like.",
    bullets: [
      { icon: <Wrench className="w-4 h-4 text-orange-400" />, text: "Custom script steps" },
      { icon: <Hammer className="w-4 h-4 text-orange-400" />, text: "Secrets & env support" }
    ],
    colorClass: "border border-orange-500 bg-[#191c1f] hover:bg-[#23262a] transition-colors",
  },
  {
    icon: <Server className="w-8 h-8 text-orange-400" />,
    title: "Jenkins & More",
    description: "Instantly generate Jenkins, GitHub Actions, GitLab, Bitbucket, or CircleCI pipelines—no plugins or setup needed.",
    bullets: [
      { icon: <CheckCircle className="w-4 h-4 text-orange-400" />, text: "Jenkinsfile in seconds" },
      { icon: <CheckCircle className="w-4 h-4 text-orange-400" />, text: "Easy-to-follow & robust" }
    ],
    colorClass: "border border-orange-500 bg-[#191c1f] hover:bg-[#23262a] transition-colors",
  }
];

export const FeaturesSection = () => {
  return (
    <section id="features" className="relative w-full bg-[#16181c] text-white py-20 sm:py-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-8">
        {/* Title */}
        <div className="mb-12 text-center">
          <h2 className="inline-block px-6 py-2 rounded-full font-black text-3xl sm:text-5xl tracking-tight bg-[#181c21] text-orange-400 shadow-xl mb-4 border-4 border-orange-500/50">
            Everything You Need
          </h2>
          <p className="mx-auto max-w-xl text-lg text-slate-200 leading-relaxed mt-4">
            Production-grade CI/CD—<span className="text-orange-400 font-semibold">in minutes</span>, not days.<br />
            No vendor lock-in. Infinite extensibility. Beginners welcome!
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
              bullets={f.bullets}
              colorClass={f.colorClass}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
