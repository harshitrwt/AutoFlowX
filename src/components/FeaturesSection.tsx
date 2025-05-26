
import React from 'react';
import { CheckCircle, Code, Shield, Zap, GitBranch, Settings } from 'lucide-react';

export const FeaturesSection = () => {
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
    <section id="features" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Everything You Need</h2>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            A complete feature set for production environments, built with 
            a worldwide community of developers and enterprises.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="flex items-center mb-6">
                {features[0].icon}
                <h3 className="text-2xl font-bold text-gray-900 ml-4">{features[0].title}</h3>
              </div>
              <p className="text-gray-600 mb-6">{features[0].description}</p>
              <img 
                src="/lovable-uploads/46abd016-524e-45c4-8038-66f29332392a.png" 
                alt="Technology stack visualization"
                className="w-full rounded-lg"
              />
            </div>
          </div>
          <div className="space-y-6">
            {features.slice(1, 3).map((feature, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-lg">
                <div className="flex items-center mb-4">
                  {feature.icon}
                  <h3 className="text-xl font-bold text-gray-900 ml-4">{feature.title}</h3>
                </div>
                <p className="text-gray-600 mb-4">{feature.description}</p>
                <div className="space-y-2">
                  {feature.features?.map((item, itemIndex) => (
                    <div key={itemIndex} className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      <span className="text-gray-700 text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {features.slice(3).map((feature, index) => (
            <div key={index} className="bg-white rounded-xl p-8 shadow-lg">
              <div className="flex items-center mb-6">
                {feature.icon}
                <h3 className="text-xl font-bold text-gray-900 ml-4">{feature.title}</h3>
              </div>
              <p className="text-gray-600 mb-6">{feature.description}</p>
              <div className="space-y-3">
                {feature.features?.map((item, itemIndex) => (
                  <div key={itemIndex} className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
