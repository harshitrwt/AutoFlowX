
import React from 'react';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  bullets: { icon?: React.ReactNode; text: string }[];
  colorClass?: string;
}
export const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description,
  bullets,
  colorClass = "",
}) => {
  return (
    <div
      className={`relative flex flex-col rounded-2xl shadow-xl border border-blue-400 bg-white dark:bg-gray-900 p-7 transition-colors ${colorClass}`}
    >
      <div className="mb-4">
        <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-blue-50 dark:bg-blue-900/20 mb-2">
          {icon}
        </div>
      </div>
      <h3 className="font-extrabold text-lg text-blue-700 dark:text-blue-300 mb-2">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300 text-[15px] mb-5 flex-1">{description}</p>
      <ul className="space-y-2">
        {bullets.map((bullet, idx) => (
          <li key={idx} className="flex items-center gap-2 text-gray-700 dark:text-gray-200 text-sm font-medium">
            {bullet.icon && <span>{bullet.icon}</span>}
            <span>{bullet.text}</span>
          </li>
        ))}
      </ul>
    </div>
  )
};
