
import React from 'react';
import {
  Code, CheckCircle, Shield, Zap, GitBranch, Settings, Github, FileText, ListChecks, Users, MessageCircle, Jenkins
} from 'lucide-react';
import { FeatureCard } from './FeatureCard';

const featureData = [
  {
    icon: <Code className="w-7 h-7 text-orange-300" />,
    title: "Multi-Technology Support",
    description: "Work seamlessly across React, Next.js, Angular, Vue, Svelte, Node.js, Python, Java, Go, PHP and more. Connect to CI/CD with GitHub, GitLab, Bitbucket, Jenkins. Build, test, and deploy for any stack.",
    bullets: [
      { icon: <Code className="w-4 h-4 text-orange-400" />, text: "Web, backend, and mobile frameworks" },
      { icon: <Shield className="w-4 h-4 text-yellow-400" />, text: "Node.js, Python, Java, Go, PHP" },
      { icon: <Github className="w-4 h-4 text-purple-400" />, text: "GitHub, GitLab, Bitbucket, Jenkins" },
      { icon: <FileText className="w-4 h-4 text-green-300" />, text: "Monorepo, microservices, PR workflows" },
    ],
    colorClass: "border-orange-500 bg-gradient-to-br from-[#251e10] via-[#141210] to-[#181829]",
  },
  {
    icon: <Zap className="w-7 h-7 text-yellow-200" />,
    title: "Lightning Fast Setup",
    description: "Generate production-ready pipelines in under 60 seconds, no manual YAML required.",
    bullets: [
      { icon: <CheckCircle className="w-4 h-4 text-green-400" />, text: "One-click generation" },
      { icon: <CheckCircle className="w-4 h-4 text-green-400" />, text: "Auto-optimization" },
      { icon: <CheckCircle className="w-4 h-4 text-green-400" />, text: "Best practices built-in" }
    ],
    colorClass: "border-pink-400 bg-gradient-to-br from-[#24121c] via-[#2e181c] to-[#181829]",
  },
  {
    icon: <Shield className="w-7 h-7 text-green-200" />,
    title: "Enterprise Security",
    description: "Security scanning, vulnerability checks, and compliance out of the box for peace of mind.",
    bullets: [
      { icon: <CheckCircle className="w-4 h-4 text-green-400" />, text: "SAST/DAST scanning" },
      { icon: <CheckCircle className="w-4 h-4 text-green-400" />, text: "Dependency analysis" },
      { icon: <CheckCircle className="w-4 h-4 text-green-400" />, text: "Container security" }
    ],
    colorClass: "border-emerald-400 bg-gradient-to-br from-[#192417] via-[#121f15] to-[#181829]",
  },
  {
    icon: <GitBranch className="w-7 h-7 text-purple-200" />,
    title: "Advanced Workflows",
    description: "Support for blue-green and canary deployments, multi-env setups, and custom triggers.",
    bullets: [
      { icon: <CheckCircle className="w-4 h-4 text-green-400" />, text: "Blue-green deployment" },
      { icon: <CheckCircle className="w-4 h-4 text-green-400" />, text: "Canary releases" },
      { icon: <CheckCircle className="w-4 h-4 text-green-400" />, text: "Rollback strategies" }
    ],
    colorClass: "border-purple-400 bg-gradient-to-br from-[#211824] via-[#1c1522] to-[#181829]",
  },
  {
    icon: <Settings className="w-7 h-7 text-gray-300" />,
    title: "Customizable Pipelines",
    description: "Finetune every step of your workflow: custom, conditional, or environment-aware logic.",
    bullets: [
      { icon: <CheckCircle className="w-4 h-4 text-green-400" />, text: "Custom steps" },
      { icon: <CheckCircle className="w-4 h-4 text-green-400" />, text: "Env variables & secrets" },
      { icon: <CheckCircle className="w-4 h-4 text-green-400" />, text: "Conditional logic" }
    ],
    colorClass: "border-gray-500 bg-gradient-to-br from-[#191b20] via-[#181a1e] to-[#181829]",
  }
];

export const FeaturesSection = () => {
  return (
    <section id="features" className="relative bg-gradient-to-br from-orange-50 via-white to-gray-100 dark:from-[#1B1B1F] dark:to-[#181829] py-20 sm:py-24 overflow-x-clip">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Title */}
        <div className="mb-16 text-center">
          <h2 className="inline-block px-6 py-2 rounded-full font-black text-3xl sm:text-5xl tracking-tight bg-gradient-to-tr from-orange-600/90 to-orange-400/90 text-white shadow-xl mb-4">
            Everything You Need
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-slate-700 dark:text-gray-200 leading-relaxed mt-4">
            Production-grade CI/CD—<span className="text-orange-600 dark:text-orange-400 font-semibold">in minutes</span>, not days.<br />
            No vendor lock-in. Infinite extensibility.
          </p>
        </div>
        {/* Bento Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
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
        {/* Gradient decor */}
        <div className="pointer-events-none absolute -z-10 left-0 right-0 bottom-0 top-0 overflow-hidden">
          <div className="absolute left-[8%] top-[60%] w-56 h-56 bg-gradient-to-bl from-orange-300 to-transparent opacity-30 rounded-full blur-3xl animate-pulse-slow"></div>
          <div className="absolute right-[6%] top-[18%] w-32 h-32 bg-gradient-to-br from-orange-400 to-pink-300 opacity-25 rounded-full blur-2xl animate-pulse-slower"></div>
        </div>
      </div>
    </section>
  );
};
