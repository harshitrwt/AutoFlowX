
import React from 'react';
import { CheckCircle } from 'lucide-react';

export const FeaturesSection = () => {
  const features = [
    {
      title: "STACK CONFIGURATION",
      items: [
        "Frontend Framework Selection",
        "Backend Technology Choice", 
        "Database Integration",
        "Deployment Target Setup",
        "Node Version Matrix",
        "Custom Add-on Options"
      ]
    },
    {
      title: "WORKFLOW GENERATION",
      items: [
        "Auto Linting & Formatting",
        "Test Suite Integration",
        "Security Scanning",
        "Code Coverage Reports",
        "Docker Build Support",
        "Multi-environment Deploy"
      ]
    }
  ];

  return (
    <section id="features" className="px-6 py-20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">FEATURES</h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            A complete feature set for production environments, built with 
            a worldwide community of developers and enterprises.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {features.map((section, index) => (
            <div key={index} className="bg-gray-800/30 backdrop-blur-sm border border-gray-700 rounded-xl p-8">
              <h3 className="text-xl font-bold text-white mb-6">{section.title}</h3>
              <div className="grid grid-cols-1 gap-3">
                {section.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                    <span className="text-gray-300">{item}</span>
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
