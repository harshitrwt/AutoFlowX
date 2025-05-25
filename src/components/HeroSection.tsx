
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
            <span className="text-gradient">CI/CD Pipelines</span>
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
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg font-semibold shadow-professional-lg hover-lift"
            >
              Start Building Pipeline
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button 
              variant="outline"
              size="lg"
              className="border-2 border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-4 text-lg font-semibold hover-lift"
            >
              View Examples
            </Button>
          </div>

          {/* Feature Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <div className="flex items-center justify-center space-x-3 text-gray-700">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span className="font-medium">Multi-tech stack support</span>
            </div>
            <div className="flex items-center justify-center space-x-3 text-gray-700">
              <Code className="w-5 h-5 text-blue-500" />
              <span className="font-medium">Intelligent configuration</span>
            </div>
            <div className="flex items-center justify-center space-x-3 text-gray-700">
              <Shield className="w-5 h-5 text-purple-500" />
              <span className="font-medium">Production-ready security</span>
            </div>
          </div>
        </div>

        {/* Professional Tech Stack Visualization */}
        <div className="relative mx-auto max-w-5xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
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
                className={`${tech.color} text-white rounded-lg p-6 shadow-professional hover-lift transform transition-all duration-300 hover:scale-105`}
                style={{ 
                  animationDelay: `${index * 100}ms`,
                  animation: `fadeInUp 0.6s ease-out forwards`
                }}
              >
                <div className="text-center">
                  <div className="text-2xl mb-2">{tech.icon}</div>
                  <div className="font-semibold text-sm">{tech.name}</div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Connecting Lines */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <svg className="w-full h-full">
              <defs>
                <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#1d4ed8" stopOpacity="0.1" />
                </linearGradient>
              </defs>
              <path 
                d="M50,50 Q150,25 250,50 T450,50" 
                stroke="url(#lineGradient)" 
                strokeWidth="2" 
                fill="none"
                strokeDasharray="5,5"
              />
              <path 
                d="M50,150 Q150,125 250,150 T450,150" 
                stroke="url(#lineGradient)" 
                strokeWidth="2" 
                fill="none"
                strokeDasharray="5,5"
              />
            </svg>
          </div>
        </div>
      </div>

      <style jsx>{`
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
