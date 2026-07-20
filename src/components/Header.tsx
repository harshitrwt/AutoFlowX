
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Code2, Moon, Sun, Menu, X } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from './ThemeProvider';

export const Header = ({ showLoading=false }: { showLoading?: boolean }) => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-3 sm:top-4 left-0 right-0 z-50 px-3 sm:px-6">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 sm:px-6 py-3 rounded-full bg-white/80 dark:bg-gray-900/70 backdrop-blur-xl border border-gray-200/70 dark:border-gray-700/60 shadow-lg shadow-blue-500/5">
        <Link to="/" className="flex items-center space-x-3">
          <div className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center">
            <img src='/logo.png' className='rounded-md'/>
          </div>
          <div className="hidden sm:block">
            <h1 className="text-gray-900 dark:text-white text-lg sm:text-xl font-bold">AutoFlowX</h1>
            <p className="text-gray-500 dark:text-gray-400 text-xs">Professional CI/CD Pipelines</p>
          </div>
        </Link>
        
       
        <nav className="hidden lg:flex items-center space-x-8">
          <a href="/" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors">
            Features
          </a>
          <Link to="/generator" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors">
            Generator
          </Link>
          <a href="/#reviews" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors">
            Reviews
          </a>
          <a href="/#faq" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors">
            FAQ
          </a>
        </nav>

        <div className="flex items-center space-x-2 sm:space-x-4">
         
          <Button 
            variant="outline" 
            size="sm"
            onClick={toggleTheme}
            className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 p-2"
          >
            {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
          </Button>
          
         
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 p-2"
          >
            {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </Button>
        </div>
      </div>
     
      {isMobileMenuOpen && (
        <div className="lg:hidden mt-2 max-w-6xl mx-auto bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl rounded-2xl border border-gray-200 dark:border-gray-700 shadow-lg">
          <div className="px-4 py-4 space-y-4">
            <a href="#features" className="block text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium">
              Features
            </a>
            <Link to="/generator" className="block text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium">
              Generator
            </Link>
            <a href="#reviews" className="block text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium">
              Reviews
            </a>
            <a href="#faq" className="block text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium">
              FAQ
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
