
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

export const FeaturesSection = () => {
  const titleAnimation = useScrollAnimation({ threshold: 0.2, triggerOnce: true });

  return (
    <section
      id="features"
      className="relative bg-gradient-to-br from-orange-50 via-white to-gray-100 dark:from-gray-950 dark:to-gray-800 py-24 overflow-x-clip"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div ref={titleAnimation.ref} className="mb-20 text-center">
          <h2 className={`inline-block px-6 py-2 rounded-full font-black text-3xl sm:text-5xl tracking-tight
            bg-gradient-to-tr from-orange-600/90 to-orange-400/90 text-white shadow-xl mb-4
            ${titleAnimation.isVisible ? 'animate-fade-up' : 'opacity-0'}`}>
            Everything You Need
          </h2>
          <p className={`mx-auto max-w-2xl text-lg text-slate-700 dark:text-gray-200 leading-relaxed mt-4
            ${titleAnimation.isVisible ? 'animate-fade-up animate-delay-200' : 'opacity-0'}`}>
            Production-grade CI/CD—<span className="text-orange-600 dark:text-orange-400 font-semibold">in minutes</span>, not days.<br />
            No vendor lock-in. Infinite extensibility.
          </p>
        </div>
        {/* Bento Grid */}
        <div
          className={`
            grid gap-6
            grid-cols-1
            sm:grid-cols-6
            auto-rows-[minmax(180px,1fr)]
            md:auto-rows-[minmax(230px,1fr)]
            lg:grid-cols-8
          `}
          style={{ display: 'grid' }}
        >
          {/* Main feature - large card */}
          <div className="relative col-span-1 sm:col-span-3 lg:col-span-4 row-span-2 rounded-3xl overflow-hidden flex flex-col shadow-xl group bg-white/70 dark:bg-gray-900/90 border-2 border-orange-400 hover:scale-[1.02] hover:shadow-[0_12px_80px_-8px_orange] transition-all duration-300">
            <div className="absolute -top-8 right-8 bg-orange-600 text-white py-1 px-5 rounded-full rotate-6 shadow-md font-black text-sm tracking-wide z-10">
              Popular
            </div>
            {/* Subtle Overlay */}
            <span className="absolute inset-0 bg-gradient-to-tr from-orange-100/40 via-orange-50 to-transparent dark:from-orange-800/40 dark:via-gray-900/50 pointer-events-none z-0" />
            {/* Content */}
            <div className="flex flex-col md:flex-row items-center justify-between h-full px-8 pt-8 pb-6 relative z-10">
              <div className="flex-1 flex flex-col gap-4 items-center md:items-start">
                <div className={`${iconBgColors[0]} rounded-full p-5 shadow-2xl mb-3`}>
                  {features[0].icon}
                </div>
                <h3 className="text-3xl font-bold text-gray-900 dark:text-white text-center md:text-left">{features[0].title}</h3>
                <p className="text-gray-700 dark:text-orange-200 text-lg">{features[0].description}</p>
              </div>
              <img 
                src={features[0].image}
                alt="Tech stack"
                className="w-full md:w-52 lg:w-64 max-h-32 md:max-h-36 mt-7 md:mt-0 mx-auto rounded-xl border-2 border-orange-200 shadow-xl object-contain bg-white dark:bg-gray-900"
              />
            </div>
          </div>
          {/* Feature 2 */}
          <div className="relative col-span-1 sm:col-span-3 lg:col-span-2 rounded-3xl bg-gradient-to-br from-pink-50 via-yellow-100 to-red-50 dark:from-orange-900/80 dark:via-gray-900/60 dark:to-pink-900/60 border border-pink-200 dark:border-pink-900 overflow-hidden hover:scale-[1.03] hover:shadow-2xl transition-all group flex flex-col shadow-lg">
            <span className="absolute right-5 -top-7 w-14 h-14 blur-xl opacity-30 pointer-events-none z-0 bg-gradient-to-br from-yellow-500 via-pink-400 to-red-300 rounded-full"></span>
            <div className="flex flex-col gap-2 p-8 h-full z-10 relative">
              <div className={`${iconBgColors[1]} rounded-xl p-3 shadow-lg w-fit mb-2`}>
                {features[1].icon}
              </div>
              <h3 className="text-xl font-extrabold text-gray-900 dark:text-white mb-1">{features[1].title}</h3>
              <p className="text-gray-700 dark:text-gray-200 mb-2">{features[1].description}</p>
              <ul className="flex flex-col gap-1 mt-auto">
                {features[1].features!.map(item => (
                  <li key={item} className="flex items-center text-sm text-gray-700 dark:text-gray-300">
                    <CheckCircle className="text-green-500 mr-2 w-4 h-4" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          {/* Feature 3 */}
          <div className="relative col-span-1 sm:col-span-3 lg:col-span-2 rounded-3xl bg-gradient-to-br from-green-50 via-lime-100 to-emerald-50 dark:from-emerald-900/70 dark:via-gray-900/70 dark:to-lime-900/70 border border-emerald-200 dark:border-emerald-900 overflow-hidden hover:scale-[1.03] hover:shadow-2xl transition-all group flex flex-col shadow-lg">
            <span className="absolute left-5 -top-7 w-14 h-14 blur-xl opacity-30 pointer-events-none z-0 bg-gradient-to-br from-green-400 via-emerald-400 to-lime-300 rounded-full"></span>
            <div className="flex flex-col gap-2 p-8 h-full z-10 relative">
              <div className={`${iconBgColors[2]} rounded-xl p-3 shadow-lg w-fit mb-2`}>
                {features[2].icon}
              </div>
              <h3 className="text-xl font-extrabold text-gray-900 dark:text-white mb-1">{features[2].title}</h3>
              <p className="text-gray-700 dark:text-gray-200 mb-2">{features[2].description}</p>
              <ul className="flex flex-col gap-1 mt-auto">
                {features[2].features!.map(item => (
                  <li key={item} className="flex items-center text-sm text-gray-700 dark:text-gray-300">
                    <CheckCircle className="text-green-500 mr-2 w-4 h-4" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          {/* Feature 4 */}
          <div className="relative col-span-1 sm:col-span-3 lg:col-span-2 rounded-3xl bg-gradient-to-br from-indigo-50 via-purple-100 to-blue-50 dark:from-purple-900/60 dark:via-gray-900/70 dark:to-blue-900/60 border border-indigo-200 dark:border-indigo-900 overflow-hidden hover:scale-[1.03] hover:shadow-2xl transition-all group flex flex-col shadow-lg">
            <span className="absolute right-5 -top-7 w-14 h-14 blur-xl opacity-30 pointer-events-none z-0 bg-gradient-to-br from-purple-600 via-indigo-500 to-blue-400 rounded-full"></span>
            <div className="flex flex-col gap-2 p-8 h-full z-10 relative">
              <div className={`${iconBgColors[3]} rounded-xl p-3 shadow-lg w-fit mb-2`}>
                {features[3].icon}
              </div>
              <h3 className="text-xl font-extrabold text-gray-900 dark:text-white mb-1">{features[3].title}</h3>
              <p className="text-gray-700 dark:text-gray-200 mb-2">{features[3].description}</p>
              <ul className="flex flex-col gap-1 mt-auto">
                {features[3].features!.map(item => (
                  <li key={item} className="flex items-center text-sm text-gray-700 dark:text-gray-300">
                    <CheckCircle className="text-green-500 mr-2 w-4 h-4" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          {/* Feature 5 */}
          <div className="relative col-span-1 sm:col-span-3 lg:col-span-2 rounded-3xl bg-gradient-to-br from-gray-50 via-slate-100 to-gray-200 dark:from-gray-900/75 dark:via-gray-800/80 dark:to-slate-900/60 border border-gray-200 dark:border-gray-700 overflow-hidden hover:scale-[1.03] hover:shadow-2xl transition-all group flex flex-col shadow-lg">
            <span className="absolute left-5 -top-7 w-14 h-14 blur-xl opacity-30 pointer-events-none z-0 bg-gradient-to-br from-gray-600 via-gray-400 to-slate-300 rounded-full"></span>
            <div className="flex flex-col gap-2 p-8 h-full z-10 relative">
              <div className={`${iconBgColors[4]} rounded-xl p-3 shadow-lg w-fit mb-2`}>
                {features[4].icon}
              </div>
              <h3 className="text-xl font-extrabold text-gray-900 dark:text-white mb-1">{features[4].title}</h3>
              <p className="text-gray-700 dark:text-gray-200 mb-2">{features[4].description}</p>
              <ul className="flex flex-col gap-1 mt-auto">
                {features[4].features!.map(item => (
                  <li key={item} className="flex items-center text-sm text-gray-700 dark:text-gray-300">
                    <CheckCircle className="text-green-500 mr-2 w-4 h-4" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      {/* Fancy floating gradient decor */}
      <div className="pointer-events-none absolute -z-10 left-0 right-0 bottom-0 top-0 overflow-hidden">
        <div className="absolute left-[8%] top-[60%] w-56 h-56 bg-gradient-to-bl from-orange-300 to-transparent opacity-30 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute right-[6%] top-[18%] w-32 h-32 bg-gradient-to-br from-orange-400 to-pink-300 opacity-25 rounded-full blur-2xl animate-pulse-slower"></div>
      </div>
    </section>
  );
};
