
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
    <section id="features" className="py-12 sm:py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div ref={titleAnimation.ref} className="text-center mb-12 sm:mb-16">
          <h2 className={`text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4 ${titleAnimation.isVisible ? 'animate-fade-up' : 'opacity-0'}`}>Everything You Need</h2>
          <p className={`text-gray-600 dark:text-gray-300 text-base sm:text-lg max-w-3xl mx-auto ${titleAnimation.isVisible ? 'animate-fade-up animate-delay-200' : 'opacity-0'}`}>
            A complete feature set for production environments, built with 
            a worldwide community of developers and enterprises.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center mb-12 sm:mb-16">
          <div ref={mainFeatureAnimation.ref}>
            <div className={`bg-white dark:bg-gray-900 rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-200 dark:border-gray-700 ${mainFeatureAnimation.isVisible ? 'animate-fade-left' : 'opacity-0'}`}>
              <div className="flex items-center mb-6">
                {features[0].icon}
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white ml-4">{features[0].title}</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-6">{features[0].description}</p>
              <img 
                src="/lovable-uploads/46abd016-524e-45c4-8038-66f29332392a.png" 
                alt="Technology stack visualization"
                className="w-full rounded-lg"
              />
            </div>
          </div>
          <div className="space-y-6">
            <div ref={sideFeatures1Animation.ref}>
              <div className={`bg-white dark:bg-gray-900 rounded-xl p-4 sm:p-6 shadow-lg border border-gray-200 dark:border-gray-700 ${sideFeatures1Animation.isVisible ? 'animate-fade-right' : 'opacity-0'}`}>
                <div className="flex items-center mb-4">
                  {features[1].icon}
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white ml-4">{features[1].title}</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-4">{features[1].description}</p>
                <div className="space-y-2">
                  {features[1].features?.map((item, itemIndex) => (
                    <div key={itemIndex} className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                      <span className="text-gray-700 dark:text-gray-300 text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div ref={sideFeatures2Animation.ref}>
              <div className={`bg-white dark:bg-gray-900 rounded-xl p-4 sm:p-6 shadow-lg border border-gray-200 dark:border-gray-700 ${sideFeatures2Animation.isVisible ? 'animate-fade-right animate-delay-200' : 'opacity-0'}`}>
                <div className="flex items-center mb-4">
                  {features[2].icon}
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white ml-4">{features[2].title}</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-4">{features[2].description}</p>
                <div className="space-y-2">
                  {features[2].features?.map((item, itemIndex) => (
                    <div key={itemIndex} className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                      <span className="text-gray-700 dark:text-gray-300 text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
          <div ref={bottomFeatures1Animation.ref}>
            <div className={`bg-white dark:bg-gray-900 rounded-xl p-6 sm:p-8 shadow-lg border border-gray-200 dark:border-gray-700 ${bottomFeatures1Animation.isVisible ? 'animate-fade-left' : 'opacity-0'}`}>
              <div className="flex items-center mb-6">
                {features[3].icon}
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white ml-4">{features[3].title}</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-6">{features[3].description}</p>
              <div className="space-y-3">
                {features[3].features?.map((item, itemIndex) => (
                  <div key={itemIndex} className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300 text-sm sm:text-base">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div ref={bottomFeatures2Animation.ref}>
            <div className={`bg-white dark:bg-gray-900 rounded-xl p-6 sm:p-8 shadow-lg border border-gray-200 dark:border-gray-700 ${bottomFeatures2Animation.isVisible ? 'animate-fade-right' : 'opacity-0'}`}>
              <div className="flex items-center mb-6">
                {features[4].icon}
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white ml-4">{features[4].title}</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-6">{features[4].description}</p>
              <div className="space-y-3">
                {features[4].features?.map((item, itemIndex) => (
                  <div key={itemIndex} className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300 text-sm sm:text-base">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
