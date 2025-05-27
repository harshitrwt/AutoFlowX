
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Zap, Shield, Code2, Rocket } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { LiveStats } from './LiveStats';

export const HeroSection = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.3 });

  return (
    <section 
      ref={ref}
      className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-orange-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-orange-200 dark:bg-orange-900/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-200 dark:bg-blue-900/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-purple-200 dark:bg-purple-900/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Animated Icons */}
        <div className={`flex justify-center space-x-6 mb-8 transition-all duration-1000 ease-out ${
          isVisible ? 'animate-fade-up opacity-100' : 'opacity-0 translate-y-8'
        }`}>
          <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-xl flex items-center justify-center animate-bounce">
            <Code2 className="w-6 h-6 text-orange-600 dark:text-orange-400" />
          </div>
          <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center animate-bounce animation-delay-100">
            <Zap className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          </div>
          <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center animate-bounce animation-delay-200">
            <Shield className="w-6 h-6 text-green-600 dark:text-green-400" />
          </div>
          <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center animate-bounce animation-delay-300">
            <Rocket className="w-6 h-6 text-purple-600 dark:text-purple-400" />
          </div>
        </div>

        {/* Main Heading */}
        <div className={`transition-all duration-1000 ease-out delay-200 ${
          isVisible ? 'animate-fade-up opacity-100' : 'opacity-0 translate-y-8'
        }`}>
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
            Pipeline{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-600">
              Architect
            </span>
            <br className="hidden sm:block" />
            Craft
          </h1>
        </div>

        {/* Subtitle */}
        <div className={`transition-all duration-1000 ease-out delay-400 ${
          isVisible ? 'animate-fade-up opacity-100' : 'opacity-0 translate-y-8'
        }`}>
          <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            Generate production-ready CI/CD pipelines instantly. 
            <br className="hidden sm:block" />
            Built for developers, optimized for performance.
          </p>
        </div>

        {/* Action Buttons */}
        <div className={`flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6 mb-16 transition-all duration-1000 ease-out delay-600 ${
          isVisible ? 'animate-fade-up opacity-100' : 'opacity-0 translate-y-8'
        }`}>
          <Link to="/generator">
            <Button className="bg-orange-600 hover:bg-orange-700 text-white text-lg px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 w-full sm:w-auto">
              Start Building
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
          
          <Button 
            variant="outline" 
            className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 text-lg px-8 py-4 rounded-full w-full sm:w-auto"
            onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Learn More
          </Button>
        </div>

        {/* Live Stats */}
        <div className={`transition-all duration-1000 ease-out delay-800 ${
          isVisible ? 'animate-fade-up opacity-100' : 'opacity-0 translate-y-8'
        }`}>
          <LiveStats />
        </div>
      </div>
    </section>
  );
};
