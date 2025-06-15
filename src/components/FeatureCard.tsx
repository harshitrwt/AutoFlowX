
import React from 'react';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  bullets: { icon?: React.ReactNode; text: string }[];
  colorClass: string;
}
export const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description,
  bullets,
  colorClass,
}) => {
  return (
    <div className={`relative flex flex-col rounded-2xl shadow-xl border ${colorClass} p-7 bg-gradient-to-b from-black/30 to-black/0 bg-clip-padding`}>
      <div className="mb-4">
        <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-white/10 mb-2">{icon}</div>
      </div>
      <h3 className="font-extrabold text-lg text-white mb-2">{title}</h3>
      <p className="text-gray-200 text-[15px] mb-5 flex-1">{description}</p>
      <ul className="space-y-2">
        {bullets.map((bullet, idx) => (
          <li key={idx} className="flex items-center gap-2 text-gray-100 text-sm font-medium">
            {bullet.icon && <span>{bullet.icon}</span>}
            <span>{bullet.text}</span>
          </li>
        ))}
      </ul>
    </div>
  )
};
