
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle, Code, Zap, Shield } from 'lucide-react';

export const HeroSection = () => {
  const scrollToGenerator = () => {
    document.getElementById('generator')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative bg-white py-20 px-6 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-white"></div>
      <div className="absolute top-0 left-0 w-full h-full opacity-5">
        <div className="grid grid-cols-12 gap-4 h-full">
          {Array.from({ length: 48 }).map((_, i) => (
            <div key={i} className="bg-blue-500 rounded-full w-2 h-2"></div>
          ))}
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-blue-50 border border-blue-200 rounded-full text-blue-700 text-sm font-medium mb-6">
            <Zap className="w-4 h-4 mr-2" />
            Professional CI/CD Pipeline Generator
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            Build Production-Ready
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
              CI/CD Pipelines
            </span>
            <br />
            in Minutes
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Generate custom GitHub Actions workflows tailored to your exact tech stack. 
            Multi-technology support, intelligent configuration, and enterprise-grade pipelines 
            for modern development teams.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button 
              onClick={scrollToGenerator}
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200 hover:-translate-y-1"
            >
              Start Building Pipeline
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button 
              variant="outline"
              size="lg"
              className="border-2 border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-4 text-lg font-semibold transition-all duration-200 hover:-translate-y-1"
            >
              View Examples
            </Button>
          </div>

          {/* Feature Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="flex flex-col items-center space-y-3 text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <span className="font-semibold text-gray-800">Multi-tech stack support</span>
              <span className="text-sm text-gray-600">Support for React, Node.js, Python and more</span>
            </div>
            <div className="flex flex-col items-center space-y-3 text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Code className="w-6 h-6 text-blue-600" />
              </div>
              <span className="font-semibold text-gray-800">Intelligent configuration</span>
              <span className="text-sm text-gray-600">Auto-detects your project structure</span>
            </div>
            <div className="flex flex-col items-center space-y-3 text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <Shield className="w-6 h-6 text-purple-600" />
              </div>
              <span className="font-semibold text-gray-800">Production-ready security</span>
              <span className="text-sm text-gray-600">Built-in security scanning and best practices</span>
            </div>
          </div>
        </div>

        {/* Professional Tech Stack Visualization */}
        <div className="relative mx-auto max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: 'React', color: 'bg-blue-500', icon: '⚛️' },
              { name: 'Node.js', color: 'bg-green-500', icon: '🟢' },
              { name: 'Docker', color: 'bg-blue-600', icon: '🐳' },
              { name: 'AWS', color: 'bg-orange-500', icon: '☁️' },
              { name: 'Next.js', color: 'bg-black', icon: '▲' },
              { name: 'Python', color: 'bg-yellow-500', icon: '🐍' },
              { name: 'PostgreSQL', color: 'bg-blue-700', icon: '🐘' },
              { name: 'TypeScript', color: 'bg-blue-600', icon: 'TS' }
            ].map((tech, index) => (
              <div 
                key={tech.name}
                className={`${tech.color} text-white rounded-xl p-4 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl`}
                style={{ 
                  animationDelay: `${index * 100}ms`,
                  animation: `fadeInUp 0.6s ease-out forwards`
                }}
              >
                <div className="text-center">
                  <div className="text-xl mb-2">{tech.icon}</div>
                  <div className="font-semibold text-sm">{tech.name}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
};
