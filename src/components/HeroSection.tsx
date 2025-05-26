
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle, Code, Zap, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { AnimatedLogos } from './AnimatedLogos';

export const HeroSection = () => {
  const navigate = useNavigate();

  const scrollToGenerator = () => {
    navigate('/generator');
  };

  return (
    <section className="relative bg-white dark:bg-gray-900 pt-20 sm:pt-32 pb-12 sm:pb-20 px-4 sm:px-6 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-white dark:from-gray-800 dark:to-gray-900"></div>
      
      {/* Animated Logos Background */}
      <AnimatedLogos />

      <div className="relative max-w-7xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center px-3 sm:px-4 py-2 bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-700 rounded-full text-blue-700 dark:text-blue-300 text-sm font-medium mb-6">
            <Zap className="w-4 h-4 mr-2" />
            Professional CI/CD Pipeline Generator
          </div>
          
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-6 leading-tight px-4">
            Build Production-Ready
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
              CI/CD Pipelines
            </span>
            <br />
            in Minutes
          </h1>
          
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed px-4">
            Generate custom GitHub Actions workflows tailored to your exact tech stack. 
            Multi-technology support, intelligent configuration, and enterprise-grade pipelines 
            for modern development teams.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 px-4">
            <Button 
              onClick={scrollToGenerator}
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200 hover:-translate-y-1"
            >
              Start Building Pipeline
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button 
              variant="outline"
              size="lg"
              className="border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold transition-all duration-200 hover:-translate-y-1"
            >
              View Examples
            </Button>
          </div>

          {/* Enhanced Value Proposition */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-16 px-4">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 sm:p-6 shadow-lg border border-gray-100 dark:border-gray-700">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-4 mx-auto">
                <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="font-bold text-gray-900 dark:text-white mb-2 text-base sm:text-lg">Multi-Stack Support</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">Support for React, Node.js, Python, Docker and 20+ technologies with intelligent auto-detection</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 sm:p-6 shadow-lg border border-gray-100 dark:border-gray-700">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-4 mx-auto">
                <Code className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="font-bold text-gray-900 dark:text-white mb-2 text-base sm:text-lg">Zero Configuration</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">One-click setup with best practices built-in. No YAML knowledge required</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 sm:p-6 shadow-lg border border-gray-100 dark:border-gray-700">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mb-4 mx-auto">
                <Shield className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="font-bold text-gray-900 dark:text-white mb-2 text-base sm:text-lg">Enterprise Security</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">Built-in security scanning, dependency checks, and compliance features</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
