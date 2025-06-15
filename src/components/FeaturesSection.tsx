
import React from 'react';
import { CheckCircle, Code, Shield, Zap, GitBranch, Settings } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

// Helper for feature icon backgrounds
const iconBgColors = [
  "bg-gradient-to-tr from-orange-500 via-yellow-400 to-orange-300",
  "bg-gradient-to-tr from-yellow-500 via-pink-400 to-red-300",
  "bg-gradient-to-tr from-green-500 via-emerald-400 to-lime-300",
  "bg-gradient-to-tr from-purple-600 via-indigo-500 to-blue-400",
  "bg-gradient-to-tr from-gray-600 via-gray-400 to-slate-300"
];

export const FeaturesSection = () => {
  const titleAnimation = useScrollAnimation({ threshold: 0.2, triggerOnce: true });

  const features = [
    {
      icon: <Code className="w-8 h-8 text-white drop-shadow-lg" />,
      title: "Multi-Technology Support",
      description: "Support for 20+ technologies including React, Node.js, Python, Docker, and more.",
      image: "/lovable-uploads/46abd016-524e-45c4-8038-66f29332392a.png"
    },
    {
      icon: <Zap className="w-8 h-8 text-white drop-shadow-lg" />,
      title: "Lightning Fast Setup",
      description: "Generate production-ready pipelines in under 60 seconds with zero configuration.",
      features: ["One-click generation", "Auto-optimization", "Best practices built-in"]
    },
    {
      icon: <Shield className="w-8 h-8 text-white drop-shadow-lg" />,
      title: "Enterprise Security",
      description: "Built-in security scanning, vulnerability detection, and compliance checks.",
      features: ["SAST/DAST scanning", "Dependency analysis", "Container security"]
    },
    {
      icon: <GitBranch className="w-8 h-8 text-white drop-shadow-lg" />,
      title: "Advanced Workflows",
      description: "Support for complex deployment strategies and multi-environment setups.",
      features: ["Blue-green deployment", "Canary releases", "Rollback strategies"]
    },
    {
      icon: <Settings className="w-8 h-8 text-white drop-shadow-lg" />,
      title: "Customizable Pipelines",
      description: "Fine-tune every aspect of your CI/CD pipeline with advanced configuration.",
      features: ["Custom steps", "Environment variables", "Conditional logic"]
    }
  ];

  return (
    <section
      id="features"
      className="relative bg-gradient-to-br from-orange-50 via-white to-gray-100 dark:from-gray-950 dark:to-gray-800 py-24 overflow-x-clip"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div ref={titleAnimation.ref} className="mb-16 text-center">
          <h2 className={`inline-block px-5 py-2 rounded-full font-black text-3xl sm:text-4xl tracking-tight 
            bg-gradient-to-tr from-orange-600/80 to-orange-400/90 text-white shadow shadow-orange-300 mb-4
            ${titleAnimation.isVisible ? 'animate-fade-up' : 'opacity-0'}`}>
            Everything You Need
          </h2>
          <p className={`mx-auto max-w-2xl text-lg text-slate-700 dark:text-gray-200 leading-relaxed mt-3 
            ${titleAnimation.isVisible ? 'animate-fade-up animate-delay-200' : 'opacity-0'}`}>
            Production-grade CI/CD—<span className="text-orange-600 dark:text-orange-400 font-semibold">in minutes</span>, not days.
            <br />
            No vendor lock-in. Infinite extensibility.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 transition-all">
          {/* Main feature card, centered and larger on desktop */}
          <div className="relative col-span-1 sm:col-span-2 lg:col-span-1 flex flex-col justify-between">
            <div className="group relative bg-white/80 dark:bg-gray-900/90 border-2 border-orange-500 rounded-3xl overflow-hidden p-8 shadow-2xl flex flex-col items-center hover:scale-[1.03] hover:shadow-[0_8px_60px_-8px_orange] transition-all duration-300">
              <div className="absolute -top-8 right-6 bg-orange-600 text-white py-1 px-5 rounded-full rotate-6 shadow-md font-black text-sm tracking-wide z-10">
                Popular
              </div>
              <div className="mb-4 flex items-center justify-center">
                <div className={`${iconBgColors[0]} rounded-full p-4 flex items-center shadow-2xl`}>
                  {features[0].icon}
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 text-center">{features[0].title}</h3>
              <p className="text-gray-600 dark:text-gray-300 text-center mb-6">{features[0].description}</p>
              <img 
                src={features[0].image}
                alt="Tech stack"
                className="max-w-full max-h-36 rounded-xl border-2 border-orange-200 shadow-xl object-contain"
              />
            </div>
          </div>
          {/* Secondary feature cards */}
          {[1,2,3,4].map((i) => (
            <div 
              key={features[i].title}
              className="relative flex flex-col bg-white/90 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-lg rounded-2xl p-8 hover:scale-[1.02] hover:shadow-2xl transition-transform group"
            >
              <div className="absolute -top-7 left-7 opacity-20 pointer-events-none blur-lg"
                aria-hidden="true"
                style={{ zIndex: 0 }}
              >
                <div className={`w-16 h-16 ${iconBgColors[i]} rounded-full`} />
              </div>
              <div className="mb-4 flex items-center justify-center relative z-10">
                <div className={`${iconBgColors[i]} rounded-xl p-3 shadow-lg`}>
                  {features[i].icon}
                </div>
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 text-center relative z-10">{features[i].title}</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4 text-center relative z-10">{features[i].description}</p>
              <ul className="space-y-2 mt-auto">
                {(features[i].features || []).map(item => (
                  <li key={item} className="flex items-center justify-center group-hover:translate-x-1 transition-transform">
                    <CheckCircle className="text-green-500 mr-2 w-4 h-4" /> 
                    <span className="text-gray-700 dark:text-gray-300 text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      {/* Fancy floating gradient decor (optional) */}
      <div className="pointer-events-none absolute -z-10 left-0 right-0 bottom-0 top-0 overflow-hidden">
        <div className="absolute left-[8%] top-[60%] w-56 h-56 bg-gradient-to-bl from-orange-300 to-transparent opacity-30 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute right-[6%] top-[18%] w-32 h-32 bg-gradient-to-br from-orange-400 to-pink-300 opacity-25 rounded-full blur-2xl animate-pulse-slower"></div>
      </div>
    </section>
  );
};

