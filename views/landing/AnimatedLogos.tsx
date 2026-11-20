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
    <section className="py-8 bg-gray-50/70 dark:bg-gray-850/40 border-y border-gray-200/60 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <p className="text-center text-xs font-semibold tracking-wider text-gray-500 dark:text-gray-400 uppercase mb-6">
          Seamless integration across modern devops & cloud ecosystems
        </p>
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 md:gap-12 opacity-75 dark:opacity-70">
          {ecosystemTools.map((tool) => (
            <div
              key={tool.name}
              className="flex items-center space-x-2.5 px-3 py-1.5 rounded-lg hover:bg-white dark:hover:bg-gray-800 transition-all duration-200 hover:opacity-100"
            >
              <img
                src={tool.icon}
                alt={tool.name}
                className="w-6 h-6 object-contain"
                loading="lazy"
              />
              <span className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">
                {tool.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
