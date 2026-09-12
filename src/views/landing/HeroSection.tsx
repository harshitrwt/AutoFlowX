
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
      
      <div className="absolute inset-0 bg-gradient-to-br from-white to-white dark:from-gray-900 dark:to-gray-900"></div>
      
      
      {/* Floating SVG Tech Icons */}
<div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
  {[
    { src: '/docker-svgrepo-com.svg', style: 'top-36 md:left-28 rotate-45' },
    { src: '/jenkins-svgrepo-com.svg', style: 'top-36 left-[80%] -rotate-12' },
    { src: '/kubernetes-svgrepo-com.svg', style: 'top-[50%] left-[15%] rotate-6' },
    { src: '/terraform-svgrepo-com.svg', style: 'bottom-10 left-32 -rotate-5' },
    { src: '/prometheus-svgrepo-com.svg', style: 'top-[40%] left-[45%] rotate-6' },
    { src: '/linux-svgrepo-com.svg', style: 'top-[50%] right-10 rotate-3' },
    { src: '/grafana-svgrepo-com.svg', style: 'md:top-20 right-[40%] -rotate-6' },
    { src: '/ansible-svgrepo-com.svg', style: 'bottom-[10%] right-[35%] rotate-12' },
  ].map(({ src, style }, i) => (
    <img
      key={i}
      src={src}
      alt="tech-icon"
      className={`absolute w-20 h-20  opacity-80 dark:opacity-1000 blur-[0.2px] ${style} transition-transform duration-1000`}
    />
  ))}
</div>

      <div className="relative max-w-7xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <div className={`inline-flex items-center px-3 sm:px-4 py-2 bg-gradient-to-r from-blue-450 to-blue-500 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-700 rounded-full text-blue-700 dark:text-blue-300 text-sm font-medium mb-6 shadow-lg ${isLoaded ? 'animate-fade-up' : 'opacity-0'}`}>
            <Rocket className="w-4 h-4 mr-2 text-blue-600 " />
            <span className="font-semibold">Production Ready CI/CD Pipelines</span>
            <Star className="w-4 h-4 ml-2 text-blue-600" />
          </div>
          
          <h1 className="text-3xl sm:text-6xl md:text-7xl font-extrabold text-gray-900 dark:text-white leading-tight tracking-tight">
  <span className="block">Build Production Ready</span>
 
  <span className="block">CI/CD Pipelines in  <span className="relative inline-block text-transparent bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text">
    minutes
    <svg
      className="absolute left-0 bottom-[-10px] w-full h-[10px]"
      viewBox="0 0 100 10"
      preserveAspectRatio="none"
    >
      <path d="M0 5 C15 15, 45 -5, 100 5" fill="none" stroke="url(#gradient)" strokeWidth="2" />
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#f97316" />
          <stop offset="100%" stopColor="#dc2626" />
        </linearGradient>
      </defs>
    </svg>
  </span></span>
  
</h1>

          
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed px-4 mt-10">
  Generate production-grade GitHub Actions workflows with zero config. Auto-detect stacks, enforce security, and deploy instantly.
</p>


          <div className={`flex flex-col sm:flex-row gap-4 justify-center mb-12 px-4 ${isLoaded ? 'animate-fade-up animate-delay-600' : 'opacity-0'}`}>
            <Button 
              onClick={scrollToGenerator}
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border-2 border-blue-500 hover:border-blue-600"
            >
              
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
