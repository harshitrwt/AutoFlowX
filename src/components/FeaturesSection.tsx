import React from 'react';
import { CheckCircle, Code, Shield, Zap, GitBranch, Settings } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export const FeaturesSection = () => {
  const titleAnimation = useScrollAnimation({ threshold: 0.2, triggerOnce: true });
  const mainFeatureAnimation = useScrollAnimation({ threshold: 0.2, triggerOnce: true });
  const sideFeatures1Animation = useScrollAnimation({ threshold: 0.2, triggerOnce: true });
  const sideFeatures2Animation = useScrollAnimation({ threshold: 0.2, triggerOnce: true });
  const bottomFeatures1Animation = useScrollAnimation({ threshold: 0.2, triggerOnce: true });
  const bottomFeatures2Animation = useScrollAnimation({ threshold: 0.2, triggerOnce: true });

  const features = [
    {
      icon: <Code className="w-8 h-8 text-blue-600" />,
      title: "Multi-Technology Support",
      description: "Support for 20+ technologies including React, Node.js, Python, Docker, and more",
      image: "/lovable-uploads/46abd016-524e-45c4-8038-66f29332392a.png"
    },
    {
      icon: <Zap className="w-8 h-8 text-yellow-600" />,
      title: "Lightning Fast Setup",
      description: "Generate production-ready pipelines in under 60 seconds with zero configuration",
      features: ["One-click generation", "Auto-optimization", "Best practices built-in"]
    },
    {
      icon: <Shield className="w-8 h-8 text-green-600" />,
      title: "Enterprise Security",
      description: "Built-in security scanning, vulnerability detection, and compliance checks",
      features: ["SAST/DAST scanning", "Dependency analysis", "Container security"]
    },
    {
      icon: <GitBranch className="w-8 h-8 text-purple-600" />,
      title: "Advanced Workflows",
      description: "Support for complex deployment strategies and multi-environment setups",
      features: ["Blue-green deployment", "Canary releases", "Rollback strategies"]
    },
    {
      icon: <Settings className="w-8 h-8 text-gray-600" />,
      title: "Customizable Pipelines",
      description: "Fine-tune every aspect of your CI/CD pipeline with advanced configuration",
      features: ["Custom steps", "Environment variables", "Conditional logic"]
    }
  ];

  return (
    <section id="features" className="py-16 bg-gradient-to-br from-orange-100/60 via-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div ref={titleAnimation.ref} className="mb-12 text-center">
          <h2 className={`text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-4 ${titleAnimation.isVisible ? 'animate-fade-up' : 'opacity-0'}`}>
            <span className="bg-orange-600 text-white px-2 rounded">Everything You Need</span>
          </h2>
          <p className={`mx-auto max-w-2xl text-lg text-gray-700 dark:text-gray-200 leading-relaxed ${titleAnimation.isVisible ? 'animate-fade-up animate-delay-200' : 'opacity-0'}`}>
            Production-grade CI/CD—<span className="text-orange-600 dark:text-orange-400 font-semibold">in minutes</span>, not days.
            No vendor lock-in. Infinite extensibility. 
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {/* Main feature card */}
          <div className="relative group md:row-span-2 bg-white dark:bg-gray-900 border-2 border-orange-500 shadow-2xl rounded-3xl overflow-hidden hover:scale-105 transition-transform duration-300 animate-fade-in">
            <div className="absolute -top-10 -right-8 bg-orange-500 text-white px-4 py-2 rounded-xl rotate-12 shadow-lg border-2 border-orange-600 font-black text-xl">Popular</div>
            <div className="p-8 flex flex-col items-center justify-between h-full">
              <div className="mb-4">{features[0].icon}</div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2 text-center">{features[0].title}</h3>
              <p className="text-gray-600 dark:text-gray-300 text-center mb-6">{features[0].description}</p>
              <img 
                src={features[0].image}
                alt="Tech stack"
                className="max-w-full rounded-xl border-2 border-orange-200 shadow-xl"
              />
            </div>
          </div>
          {/* Other feature cards */}
          {features.slice(1).map((feature, i) => (
            <div 
              key={feature.title}
              className={`bg-white/90 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-lg rounded-2xl p-7 flex flex-col animate-fade-in hover:shadow-2xl transition group ${i === 0 ? 'md:col-span-1' : ''}`}
            >
              <div className="mb-4 flex items-center justify-center">{feature.icon}</div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 text-center">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4 text-center">{feature.description}</p>
              <ul className="space-y-2 mt-auto">
                {(feature.features || []).map(item => (
                  <li key={item} className="flex items-center justify-center">
                    <CheckCircle className="text-green-500 mr-2 w-4 h-4" /> 
                    <span className="text-gray-700 dark:text-gray-300 text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
