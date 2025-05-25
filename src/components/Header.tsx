
import React from 'react';
import { Button } from '@/components/ui/button';
import { Code2, Github } from 'lucide-react';

export const Header = () => {
  return (
    <header className="relative z-50 bg-white border-b border-gray-200 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center shadow-professional">
            <Code2 className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-gray-900 text-xl font-bold">Pipeline Builder</h1>
            <p className="text-gray-500 text-xs">Professional CI/CD Generator</p>
          </div>
        </div>
        
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#features" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">
            Features
          </a>
          <a href="#generator" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">
            Generator
          </a>
          <a href="#examples" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">
            Examples
          </a>
        </nav>

        <div className="flex items-center space-x-4">
          <Button 
            variant="outline" 
            className="border-gray-300 text-gray-700 hover:bg-gray-50 hover-lift"
          >
            <Github className="w-4 h-4 mr-2" />
            Documentation
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white hover-lift">
            Get Started
          </Button>
        </div>
      </div>
    </header>
  );
};
