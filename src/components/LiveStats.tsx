
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Star, Users, Eye, GitBranch } from 'lucide-react';

export const LiveStats = () => {
  const [visitorCount, setVisitorCount] = useState(42);
  const [githubStars, setGithubStars] = useState(128);

  // Simulate live visitor count updates
  useEffect(() => {
    const interval = setInterval(() => {
      setVisitorCount(prev => prev + Math.floor(Math.random() * 3));
    }, 5000 + Math.random() * 10000); // Random interval between 5-15 seconds

    return () => clearInterval(interval);
  }, []);

  const handleGitHubStar = () => {
    // Replace with your actual GitHub repo URL
    window.open('https://github.com/yourusername/pipeline-architect-craft', '_blank');
    setGithubStars(prev => prev + 1);
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
      {/* Live Visitors */}
      <div className="flex items-center space-x-3 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-200 dark:border-gray-700 shadow-lg">
        <div className="relative">
          <Users className="w-5 h-5 text-orange-600" />
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
        </div>
        <div className="text-center">
          <div className="text-xl font-bold text-gray-900 dark:text-white">{visitorCount}</div>
          <div className="text-xs text-gray-500 dark:text-gray-400">Live Visitors</div>
        </div>
      </div>

      {/* GitHub Stars */}
      <Button
        onClick={handleGitHubStar}
        className="flex items-center space-x-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-100 px-6 py-3 rounded-full shadow-lg transition-all duration-200 hover:scale-105"
      >
        <Star className="w-5 h-5" />
        <span className="font-medium">Star on GitHub</span>
        <div className="bg-white/20 dark:bg-gray-900/20 px-2 py-1 rounded-full text-sm font-bold">
          {githubStars}
        </div>
      </Button>

      {/* Additional Stats */}
      <div className="flex items-center space-x-3 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-200 dark:border-gray-700 shadow-lg">
        <GitBranch className="w-5 h-5 text-orange-600" />
        <div className="text-center">
          <div className="text-xl font-bold text-gray-900 dark:text-white">1.2k</div>
          <div className="text-xs text-gray-500 dark:text-gray-400">Pipelines Generated</div>
        </div>
      </div>
    </div>
  );
};
