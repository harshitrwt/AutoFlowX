
import React from 'react';
import { Loader2, Zap, GitBranch, Settings, CheckCircle } from 'lucide-react';

interface PipelineLoaderProps {
  isVisible: boolean;
}

export const PipelineLoader: React.FC<PipelineLoaderProps> = ({ isVisible }) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl border border-gray-200 dark:border-gray-700">
        <div className="text-center">
          {/* Main Icon */}
          <div className="relative mb-6">
            <div className="w-20 h-20 mx-auto bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg">
              <Zap className="w-10 h-10 text-white" />
            </div>
            <div className="absolute -top-1 -right-1 w-6 h-6 bg-blue-400 rounded-full animate-ping"></div>
          </div>

          {/* Title */}
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Generating Pipeline
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Creating your custom CI/CD configuration...
          </p>

          {/* Loading Steps */}
          <div className="space-y-3 mb-6">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span className="text-gray-700 dark:text-gray-300">Analyzing tech stack</span>
              </div>
              <span className="text-green-500 font-medium">✓</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-2">
                <Loader2 className="w-4 h-4 text-blue-500 animate-spin" />
                <span className="text-gray-700 dark:text-gray-300">Building workflow</span>
              </div>
              <div className="w-4 h-1 bg-blue-200 dark:bg-blue-800 rounded-full overflow-hidden">
                <div className="w-full h-full bg-blue-500 animate-pulse"></div>
              </div>
            </div>
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-2">
                <Settings className="w-4 h-4 text-gray-400" />
                <span className="text-gray-500 dark:text-gray-500">Optimizing configuration</span>
              </div>
              <span className="text-gray-400">⏳</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-2">
                <GitBranch className="w-4 h-4 text-gray-400" />
                <span className="text-gray-500 dark:text-gray-500">Finalizing YAML</span>
              </div>
              <span className="text-gray-400">⏳</span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-4">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full animate-pulse" style={{ width: '60%' }}></div>
          </div>

          {/* Loading Text */}
          <p className="text-sm text-blue-600 dark:text-blue-400 font-medium">
            This will take just a moment...
          </p>
        </div>
      </div>
    </div>
  );
};
