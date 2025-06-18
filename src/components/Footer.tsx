
import React from 'react';
import { Code2, Github, Twitter, Linkedin, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="w-full bg-gray-900 dark:bg-black text-white py-12 sm:py-16">
      <div className="w-full px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8 sm:mb-12 max-w-7xl mx-auto">
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <Code2 className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-bold">Pipeline Builder</h3>
                <p className="text-gray-400 text-xs sm:text-sm">Professional CI/CD Generator</p>
              </div>
            </div>
            <p className="text-gray-400 mb-6 max-w-md text-sm sm:text-base">
              Generate production-ready CI/CD pipelines for your tech stack in minutes. 
              Built by developers, for developers.
            </p>
            
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 text-sm sm:text-base">Product</h4>
            <ul className="space-y-2 text-gray-400 text-sm sm:text-base">
              <li><Link to="/generator" className="hover:text-white transition-colors">Generator</Link></li>
              <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
              
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 text-sm sm:text-base">Support</h4>
            <ul className="space-y-2 text-gray-400 text-sm sm:text-base">
              <li><a href="#faq" className="hover:text-white transition-colors">FAQ</a></li>
              
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 dark:border-gray-900 pt-6 sm:pt-8 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 max-w-7xl mx-auto">
          <p className="text-gray-400 text-xs sm:text-sm">
            © 2025 Pipeline Builder. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center sm:justify-end space-x-4 sm:space-x-6">
            <a href="#" className="text-gray-400 hover:text-white text-xs sm:text-sm transition-colors">Privacy Policy</a>
            <a href="#" className="text-gray-400 hover:text-white text-xs sm:text-sm transition-colors">Terms of Service</a>
            <a href="#" className="text-gray-400 hover:text-white text-xs sm:text-sm transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
