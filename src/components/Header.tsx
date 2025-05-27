
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Code2, Github, Moon, Sun, Menu, X, Users, Star } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from './ThemeProvider';

export const Header = () => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [visitorCount, setVisitorCount] = useState(0);
  const [githubStars, setGithubStars] = useState(0);

  // Simulate visitor count (in real app, this would come from your analytics)
  useEffect(() => {
    const baseCount = 1247;
    const randomIncrement = Math.floor(Math.random() * 50);
    setVisitorCount(baseCount + randomIncrement);
    
    // Update visitor count every 30 seconds
    const interval = setInterval(() => {
      setVisitorCount(prev => prev + Math.floor(Math.random() * 3));
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  // Simulate GitHub stars (in real app, this would come from GitHub API)
  useEffect(() => {
    setGithubStars(342);
  }, []);

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

          {/* Desktop Stats and GitHub */}
          <div className="hidden sm:flex items-center space-x-3">
            {/* Visitor Count */}
            <div className="flex items-center space-x-2 px-3 py-2 bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg">
              <Users className="w-4 h-4 text-orange-600 dark:text-orange-400" />
              <span className="text-sm font-medium text-orange-700 dark:text-orange-300">
                {visitorCount.toLocaleString()}
              </span>
            </div>

            {/* GitHub Stars */}
            <Button 
              variant="outline" 
              size="sm"
              className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 flex items-center space-x-2"
            >
              <Github className="w-4 h-4" />
              <Star className="w-4 h-4" />
              <span className="hidden md:inline font-medium">{githubStars}</span>
            </Button>
          </div>

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
            
            {/* Mobile Stats */}
            <div className="flex justify-between items-center pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-2 px-3 py-2 bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg">
                <Users className="w-4 h-4 text-orange-600 dark:text-orange-400" />
                <span className="text-sm font-medium text-orange-700 dark:text-orange-300">
                  {visitorCount.toLocaleString()}
                </span>
              </div>
              
              <Button variant="outline" size="sm" className="flex items-center space-x-2">
                <Github className="w-4 h-4" />
                <Star className="w-4 h-4" />
                <span className="font-medium">{githubStars}</span>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
