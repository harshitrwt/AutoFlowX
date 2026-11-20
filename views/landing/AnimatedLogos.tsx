import React from 'react';

const ecosystemTools = [
  { name: 'Docker', icon: '/docker-svgrepo-com.svg' },
  { name: 'Kubernetes', icon: '/kubernetes-svgrepo-com.svg' },
  { name: 'Jenkins', icon: '/jenkins-svgrepo-com.svg' },
  { name: 'Terraform', icon: '/terraform-svgrepo-com.svg' },
  { name: 'Linux', icon: '/linux-svgrepo-com.svg' },
  { name: 'Prometheus', icon: '/prometheus-svgrepo-com.svg' },
  { name: 'Grafana', icon: '/grafana-svgrepo-com.svg' },
  { name: 'Ansible', icon: '/ansible-svgrepo-com.svg' },
];

export const AnimatedLogos = () => {
  return (
    <section className="py-8 bg-gray-50/80 dark:bg-gray-950/60 border-y border-gray-200/70 dark:border-gray-800/80 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <p className="text-center text-xs font-semibold tracking-wider text-gray-500 dark:text-gray-400 uppercase mb-5">
          Seamless integration across modern devops & cloud ecosystems
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 md:gap-10">
          {ecosystemTools.map((tool) => (
            <div
              key={tool.name}
              className="flex items-center space-x-2.5 px-3 py-1.5 rounded-lg border border-transparent hover:border-gray-200/80 dark:hover:border-gray-700/60 hover:bg-white dark:hover:bg-gray-800/70 shadow-none hover:shadow-sm opacity-80 hover:opacity-100 transition-all duration-200 cursor-default"
            >
              <img
                src={tool.icon}
                alt={tool.name}
                className="w-6 h-6 object-contain"
                loading="lazy"
              />
              <span className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-200">
                {tool.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
