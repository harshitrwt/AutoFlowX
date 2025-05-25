
import React from 'react';
import { Button } from '@/components/ui/button';

export const Header = () => {
  return (
    <header className="relative z-50 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-purple-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">CI</span>
          </div>
          <h1 className="text-white text-xl font-bold">Pipeline Builder</h1>
        </div>
        
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#features" className="text-gray-300 hover:text-white transition-colors">Features</a>
          <a href="#generator" className="text-gray-300 hover:text-white transition-colors">Generator</a>
          <a href="#examples" className="text-gray-300 hover:text-white transition-colors">Examples</a>
        </nav>

        <div className="flex items-center space-x-4">
          <Button variant="outline" className="border-purple-400 text-purple-300 hover:bg-purple-400 hover:text-white">
            Documentation
          </Button>
          <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
            Get Started
          </Button>
        </div>
      </div>
    </header>
  );
};
