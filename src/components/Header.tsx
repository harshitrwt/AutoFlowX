
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
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 py-4">
        <Link to="/" className="flex items-center space-x-3">
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-orange-600 rounded-lg flex items-center justify-center">
            <Code2 className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
          </div>
          <div className="hidden sm:block">
            <h1 className="text-gray-900 dark:text-white text-lg sm:text-xl font-bold">Pipeline Builder</h1>
            <p className="text-gray-500 dark:text-gray-400 text-xs">Professional CI/CD Generator</p>
          </div>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-8">
          <a href="#features" className="text-gray-600 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400 font-medium transition-colors">
            Features
          </a>
          <Link to="/generator" className="text-gray-600 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400 font-medium transition-colors">
            Generator
          </Link>
          <a href="#reviews" className="text-gray-600 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400 font-medium transition-colors">
            Reviews
          </a>
          <a href="#faq" className="text-gray-600 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400 font-medium transition-colors">
            FAQ
          </a>
        </nav>

        <div className="flex items-center space-x-2 sm:space-x-4">
          {/* Theme Toggle */}
          <Button 
            variant="outline" 
            size="sm"
            onClick={toggleTheme}
            className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 p-2"
          >
            {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
          </Button>
          
          {/* Mobile Menu Button */}
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
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
          <div className="px-4 py-4 space-y-4">
            <a href="#features" className="block text-gray-600 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400 font-medium">
              Features
            </a>
            <Link to="/generator" className="block text-gray-600 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400 font-medium">
              Generator
            </Link>
            <a href="#reviews" className="block text-gray-600 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400 font-medium">
              Reviews
            </a>
            <a href="#faq" className="block text-gray-600 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400 font-medium">
              FAQ
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
