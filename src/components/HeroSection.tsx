
import React from 'react';
import { Button } from '@/components/ui/button';

export const HeroSection = () => {
  const scrollToGenerator = () => {
    document.getElementById('generator')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative px-6 py-20 text-center">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
          ADVANCED, PRODUCTION
          <br />
          <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            CI/CD PIPELINE
          </span>
          <br />
          GENERATOR
        </h1>
        
        <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
          Generate custom GitHub Actions workflows tailored to your exact tech stack. 
          Multi-technology support, intelligent configuration, and production-ready pipelines for modern development teams.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg px-6 py-3">
            <div className="text-green-400 font-mono text-sm">
              ✨ Multi-tech stack support
            </div>
          </div>
          <Button 
            onClick={scrollToGenerator}
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 px-8 py-3"
          >
            Start Building Pipeline
          </Button>
        </div>

        {/* Enhanced 3D Isometric Illustration */}
        <div className="relative mx-auto w-full max-w-4xl h-96 flex items-center justify-center">
          <div className="grid grid-cols-4 gap-6 transform rotate-12 scale-75">
            {/* Tech Stack Blocks */}
            <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg shadow-2xl transform -rotate-12 hover:rotate-0 transition-transform duration-300 flex items-center justify-center">
              <span className="text-white font-bold text-xs">React</span>
            </div>
            <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-lg shadow-2xl transform rotate-12 hover:rotate-0 transition-transform duration-300 flex items-center justify-center">
              <span className="text-white font-bold text-xs">Node</span>
            </div>
            <div className="w-20 h-20 bg-gradient-to-br from-purple-400 to-purple-600 rounded-lg shadow-2xl transform -rotate-12 hover:rotate-0 transition-transform duration-300 flex items-center justify-center">
              <span className="text-white font-bold text-xs">Docker</span>
            </div>
            <div className="w-20 h-20 bg-gradient-to-br from-pink-400 to-pink-600 rounded-lg shadow-2xl transform rotate-12 hover:rotate-0 transition-transform duration-300 flex items-center justify-center">
              <span className="text-white font-bold text-xs">AWS</span>
            </div>
            <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg shadow-2xl transform rotate-12 hover:rotate-0 transition-transform duration-300 flex items-center justify-center">
              <span className="text-white font-bold text-xs">Next.js</span>
            </div>
            <div className="w-20 h-20 bg-gradient-to-br from-indigo-400 to-indigo-600 rounded-lg shadow-2xl transform -rotate-12 hover:rotate-0 transition-transform duration-300 flex items-center justify-center">
              <span className="text-white font-bold text-xs">Python</span>
            </div>
            <div className="w-20 h-20 bg-gradient-to-br from-red-400 to-red-600 rounded-lg shadow-2xl transform rotate-12 hover:rotate-0 transition-transform duration-300 flex items-center justify-center">
              <span className="text-white font-bold text-xs">GraphQL</span>
            </div>
            <div className="w-20 h-20 bg-gradient-to-br from-teal-400 to-teal-600 rounded-lg shadow-2xl transform -rotate-12 hover:rotate-0 transition-transform duration-300 flex items-center justify-center">
              <span className="text-white font-bold text-xs">Postgres</span>
            </div>
          </div>
          
          {/* Connecting Lines */}
          <div className="absolute inset-0 pointer-events-none">
            <svg className="w-full h-full opacity-30">
              <defs>
                <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#8b5cf6" />
                  <stop offset="100%" stopColor="#ec4899" />
                </linearGradient>
              </defs>
              <path d="M100,100 Q200,50 300,100 T500,100" stroke="url(#lineGradient)" strokeWidth="2" fill="none" />
              <path d="M150,200 Q250,150 350,200 T550,200" stroke="url(#lineGradient)" strokeWidth="2" fill="none" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
};
