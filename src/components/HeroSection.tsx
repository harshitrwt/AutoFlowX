
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle, Code, Zap, Shield, Star, Rocket } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { AnimatedLogos } from './AnimatedLogos';

export const HeroSection = () => {
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const scrollToGenerator = () => {
    navigate('/generator');
  };

  const viewExamples = () => {
    navigate('/examples');
  };

  return (
    <section className="relative bg-white dark:bg-gray-900 pt-20 sm:pt-32 pb-12 sm:pb-20 px-4 sm:px-6 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-white dark:from-gray-800 dark:to-gray-900"></div>
      
      {/* Animated Logos Background */}
      <AnimatedLogos />

      <div className="relative max-w-7xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <div className={`inline-flex items-center px-3 sm:px-4 py-2 bg-gradient-to-r from-blue-50 to-blue-100 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-700 rounded-full text-blue-700 dark:text-blue-300 text-sm font-medium mb-6 shadow-lg ${isLoaded ? 'animate-fade-up' : 'opacity-0'}`}>
            <Rocket className="w-4 h-4 mr-2 text-blue-600" />
            <span className="font-semibold">Production-Ready CI/CD Pipelines</span>
            <Star className="w-4 h-4 ml-2 text-blue-600" />
          </div>
          
          <h1 className={`text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-6 leading-tight px-4 ${isLoaded ? 'animate-fade-up animate-delay-200' : 'opacity-0'}`}>
            Build <span className="relative">
              <span className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 bg-clip-text text-transparent font-black">
                Production-Ready
              </span>
              <div className="absolute -top-2 -right-8 rotate-12">
                <div className="bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-1 rounded-full shadow-lg">
                  RELIABLE
                </div>
              </div>
            </span>
            <br />
            <span className="bg-gradient-to-r from-green-600 to-emerald-700 bg-clip-text text-transparent font-black">
              CI/CD Pipelines
            </span>
            <br />
            in <span className="relative">
              <span className="bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent font-black">
                Minutes
              </span>
              <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-orange-400 to-red-500 rounded-full transform scale-110"></div>
            </span>
          </h1>
          
          <p className={`text-lg sm:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed px-4 ${isLoaded ? 'animate-fade-up animate-delay-400' : 'opacity-0'}`}>
            Generate <span className="font-semibold text-blue-600 dark:text-blue-400">enterprise-grade</span> GitHub Actions workflows 
            tailored to your exact tech stack. Multi-technology support, intelligent configuration, 
            and <span className="font-semibold text-green-600 dark:text-green-400">battle-tested</span> pipelines 
            for modern development teams across all major platforms.
          </p>

          <div className={`flex flex-col sm:flex-row gap-4 justify-center mb-12 px-4 ${isLoaded ? 'animate-fade-up animate-delay-600' : 'opacity-0'}`}>
            <Button 
              onClick={scrollToGenerator}
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border-2 border-blue-500 hover:border-blue-600"
            >
              <Zap className="w-5 h-5 mr-2" />
              Start Building Pipeline
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button 
              onClick={viewExamples}
              variant="outline"
              size="lg"
              className="border-2 border-blue-300 dark:border-blue-600 text-blue-700 dark:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold transition-all duration-300 hover:-translate-y-1 hover:border-blue-400 hover:shadow-lg"
            >
              View Examples
            </Button>
          </div>

          {/* Enhanced Value Proposition - Horizontally Balanced */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-16 px-4">
            <div className={`bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-850 rounded-xl p-4 sm:p-6 shadow-xl border border-green-200 dark:border-green-700 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 ${isLoaded ? 'animate-fade-up animate-delay-700' : 'opacity-0'}`}>
              <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-green-200 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-4 mx-auto shadow-lg">
                <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="font-bold text-gray-900 dark:text-white mb-2 text-base sm:text-lg text-center">
                <span className="text-green-600 dark:text-green-400">20+</span> Tech Stacks
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm text-center">React, Node.js, Python, Docker and more with intelligent auto-detection</p>
            </div>
            <div className={`bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-850 rounded-xl p-4 sm:p-6 shadow-xl border border-blue-200 dark:border-blue-700 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 ${isLoaded ? 'animate-fade-up animate-delay-800' : 'opacity-0'}`}>
              <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-4 mx-auto shadow-lg">
                <Code className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="font-bold text-gray-900 dark:text-white mb-2 text-base sm:text-lg text-center">
                <span className="text-blue-600 dark:text-blue-400">Zero</span> YAML Knowledge
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm text-center">One-click setup with best practices built-in. No configuration required</p>
            </div>
            <div className={`bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-850 rounded-xl p-4 sm:p-6 shadow-xl border border-purple-200 dark:border-purple-700 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 ${isLoaded ? 'animate-fade-up animate-delay-900' : 'opacity-0'}`}>
              <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-purple-200 dark:bg-purple-900/30 rounded-full flex items-center justify-center mb-4 mx-auto shadow-lg">
                <Shield className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="font-bold text-gray-900 dark:text-white mb-2 text-base sm:text-lg text-center">
                <span className="text-purple-600 dark:text-purple-400">Enterprise</span> Security
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm text-center">Built-in security scanning, dependency checks, and compliance features</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
