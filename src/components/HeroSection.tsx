
import React from 'react';
import { Button } from '@/components/ui/button';

export const HeroSection = () => {
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
          FOR GITHUB ACTIONS
        </h1>
        
        <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
          Generate custom GitHub Actions workflows tailored to your tech stack. 
          Built for developers who demand production-ready CI/CD pipelines.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg px-6 py-3">
            <code className="text-green-400 font-mono">npm install pipeline-generator -g</code>
          </div>
          <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 px-8 py-3">
            Generate Pipeline
          </Button>
        </div>

        {/* 3D Isometric Illustration Placeholder */}
        <div className="relative mx-auto w-full max-w-4xl h-96 flex items-center justify-center">
          <div className="grid grid-cols-3 gap-8 transform rotate-12 scale-75">
            {/* Server Blocks */}
            <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg shadow-2xl transform -rotate-12 hover:rotate-0 transition-transform duration-300"></div>
            <div className="w-24 h-24 bg-gradient-to-br from-purple-400 to-purple-600 rounded-lg shadow-2xl transform rotate-12 hover:rotate-0 transition-transform duration-300"></div>
            <div className="w-24 h-24 bg-gradient-to-br from-pink-400 to-pink-600 rounded-lg shadow-2xl transform -rotate-12 hover:rotate-0 transition-transform duration-300"></div>
            <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-green-600 rounded-lg shadow-2xl transform rotate-12 hover:rotate-0 transition-transform duration-300"></div>
            <div className="w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg shadow-2xl transform -rotate-12 hover:rotate-0 transition-transform duration-300"></div>
            <div className="w-24 h-24 bg-gradient-to-br from-indigo-400 to-indigo-600 rounded-lg shadow-2xl transform rotate-12 hover:rotate-0 transition-transform duration-300"></div>
          </div>
        </div>
      </div>
    </section>
  );
};
