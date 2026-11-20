import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle, Code, Shield, Star, Rocket } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

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
    <section className="relative bg-white dark:bg-gray-900 pt-24 sm:pt-32 pb-12 sm:pb-20 px-4 sm:px-6 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-blue-50/40 via-transparent to-transparent dark:from-blue-950/20 dark:via-transparent pointer-events-none" />

      {/* Floating DevOps Tech Badges */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {[
          { src: '/docker-svgrepo-com.svg', name: 'Docker', style: 'top-24 left-4 md:left-14 rotate-6' },
          { src: '/linux-svgrepo-com.svg', name: 'Linux', style: 'top-48 left-2 md:left-8 -rotate-12' },
          { src: '/kubernetes-svgrepo-com.svg', name: 'Kubernetes', style: 'top-72 left-4 md:left-20 rotate-6' },
          { src: '/terraform-svgrepo-com.svg', name: 'Terraform', style: 'bottom-24 left-6 md:left-16 -rotate-6' },
          { src: '/jenkins-svgrepo-com.svg', name: 'Jenkins', style: 'top-24 right-4 md:right-14 -rotate-6' },
          { src: '/prometheus-svgrepo-com.svg', name: 'Prometheus', style: 'top-48 right-2 md:right-8 rotate-12' },
          { src: '/ansible-svgrepo-com.svg', name: 'Ansible', style: 'top-72 right-4 md:right-20 rotate-6' },
          { src: '/grafana-svgrepo-com.svg', name: 'Grafana', style: 'bottom-24 right-6 md:right-16 -rotate-12' },
        ].map(({ src, name, style }, i) => (
          <div
            key={i}
            className={`hidden md:flex items-center justify-center absolute p-2.5 sm:p-3 rounded-2xl bg-white/90 dark:bg-gray-800/80 backdrop-blur-md border border-gray-200/70 dark:border-gray-700/70 shadow-lg shadow-black/5 opacity-80 hover:opacity-100 hover:scale-110 transition-all duration-300 pointer-events-auto cursor-pointer ${style}`}
            title={name}
          >
            <img
              src={src}
              alt={name}
              className="w-8 h-8 sm:w-10 sm:h-10 object-contain"
            />
          </div>
        ))}
      </div>

      <div className="relative max-w-7xl mx-auto z-10">
        <div className="text-center mb-12 sm:mb-16">
          <div className={`inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/40 dark:to-indigo-900/30 border border-blue-200 dark:border-blue-700 rounded-full text-blue-700 dark:text-blue-300 text-sm font-medium mb-6 shadow-sm transition-all duration-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
            <Rocket className="w-4 h-4 mr-2 text-blue-600 dark:text-blue-400" />
            <span className="font-semibold">Production-Ready CI/CD Pipelines</span>
            <Star className="w-4 h-4 ml-2 text-amber-500 fill-amber-500" />
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-gray-900 dark:text-white leading-tight tracking-tight">
            <span className="block">Build Production-Ready</span>
            <span className="block mt-1 sm:mt-2">
              CI/CD Pipelines in{' '}
              <span className="relative inline-block text-transparent bg-gradient-to-r from-orange-500 via-amber-500 to-red-600 bg-clip-text">
                minutes
                <svg
                  className="absolute left-0 -bottom-2 sm:-bottom-3 w-full h-[10px]"
                  viewBox="0 0 100 10"
                  preserveAspectRatio="none"
                >
                  <path d="M0 5 C20 12, 60 -2, 100 5" fill="none" stroke="url(#orange-gradient)" strokeWidth="3" />
                  <defs>
                    <linearGradient id="orange-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#f97316" />
                      <stop offset="100%" stopColor="#dc2626" />
                    </linearGradient>
                  </defs>
                </svg>
              </span>
            </span>
          </h1>

          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed px-4 mt-8">
            Generate battle-tested GitHub Actions, GitLab CI, and deployment workflows with zero config. Auto-detect stacks, enforce security, and deploy instantly.
          </p>

          <div className={`flex flex-col sm:flex-row gap-4 justify-center mb-16 px-4 transition-all duration-500 delay-200 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
            <Button
              onClick={scrollToGenerator}
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white px-7 py-3.5 text-base sm:text-lg font-semibold shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300 hover:-translate-y-0.5 rounded-xl"
            >
              Start Building Pipeline
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button
              onClick={viewExamples}
              variant="outline"
              size="lg"
              className="border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 px-7 py-3.5 text-base sm:text-lg font-semibold transition-all duration-300 hover:-translate-y-0.5 rounded-xl"
            >
              View Examples
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-12 px-4">
            <div className={`bg-white dark:bg-gray-800/80 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md hover:border-blue-300 dark:hover:border-blue-700 transition-all duration-300 hover:-translate-y-1 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/40 rounded-xl flex items-center justify-center mb-4 mx-auto text-green-600 dark:text-green-400">
                <CheckCircle className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-gray-900 dark:text-white mb-2 text-lg text-center">
                <span className="text-green-600 dark:text-green-400">20+</span> Tech Stacks
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm text-center">React, Node.js, Python, Docker and more with intelligent stack composition</p>
            </div>

            <div className={`bg-white dark:bg-gray-800/80 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md hover:border-blue-300 dark:hover:border-blue-700 transition-all duration-300 hover:-translate-y-1 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/40 rounded-xl flex items-center justify-center mb-4 mx-auto text-blue-600 dark:text-blue-400">
                <Code className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-gray-900 dark:text-white mb-2 text-lg text-center">
                <span className="text-blue-600 dark:text-blue-400">Zero</span> YAML Guesswork
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm text-center">Validated pipelines following official provider schemas with best practices built-in</p>
            </div>

            <div className={`bg-white dark:bg-gray-800/80 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md hover:border-blue-300 dark:hover:border-blue-700 transition-all duration-300 hover:-translate-y-1 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/40 rounded-xl flex items-center justify-center mb-4 mx-auto text-purple-600 dark:text-purple-400">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-gray-900 dark:text-white mb-2 text-lg text-center">
                <span className="text-purple-600 dark:text-purple-400">Enterprise</span> Security
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm text-center">Semgrep, Trivy, dependency vulnerability audits, and automated SAST scans</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
