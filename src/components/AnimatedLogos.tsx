
import React from 'react';

export const AnimatedLogos = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-5 dark:opacity-10">
      {/* Docker Logo */}
      <div className="absolute top-20 left-10 animate-bounce" style={{ animationDelay: '0s', animationDuration: '3s' }}>
        <svg width="60" height="60" viewBox="0 0 24 24" fill="currentColor" className="text-blue-600">
          <path d="M13.2 7.4h-2.4v-2.4h2.4v2.4zm-2.7-2.4h-2.4v2.4h2.4v-2.4zm-2.7 0h-2.4v2.4h2.4v-2.4zm-2.7 0h-2.4v2.4h2.4v-2.4zm8.1 2.7h-2.4v2.4h2.4v-2.4zm-2.7 0h-2.4v2.4h2.4v-2.4zm-2.7 0h-2.4v2.4h2.4v-2.4zm-2.7 0h-2.4v2.4h2.4v-2.4zm-2.7 0h-2.4v2.4h2.4v-2.4zm8.1 2.7h-2.4v2.4h2.4v-2.4zm-2.7 0h-2.4v2.4h2.4v-2.4zm-2.7 0h-2.4v2.4h2.4v-2.4zm10.5-1.8c-.5-.3-1.1-.4-1.7-.4-.3 0-.6 0-.9.1-.1-.7-.4-1.3-.8-1.8l-.3-.2-.2.3c-.4.6-.5 1.4-.3 2.1.1.4.3.7.6.9-.3.2-.7.3-1.1.3h-13.2c-.6 0-1.1.5-1.1 1.1 0 1.2.2 2.4.7 3.5.5 1.1 1.3 2 2.3 2.6 1.8 1.1 4.1 1.1 6.4 1.1 1.2 0 2.4-.1 3.5-.4 1-.3 1.9-.7 2.7-1.3 1.6-1.2 2.6-3 2.6-4.9h.2c.8 0 1.5-.3 2.1-.8.3-.3.6-.7.7-1.1l.1-.3-.3-.2z"/>
        </svg>
      </div>

      {/* Kubernetes Logo */}
      <div className="absolute top-32 right-20 animate-pulse" style={{ animationDelay: '1s', animationDuration: '4s' }}>
        <svg width="70" height="70" viewBox="0 0 24 24" fill="currentColor" className="text-blue-500">
          <path d="M10.2 2.4c.8-.5 1.8-.5 2.6 0l7.5 4.3c.8.5 1.3 1.3 1.3 2.2v8.6c0 .9-.5 1.7-1.3 2.2l-7.5 4.3c-.8.5-1.8.5-2.6 0l-7.5-4.3c-.8-.5-1.3-1.3-1.3-2.2v-8.6c0-.9.5-1.7 1.3-2.2l7.5-4.3z"/>
        </svg>
      </div>

      {/* Jenkins Logo */}
      <div className="absolute bottom-32 left-20 animate-spin" style={{ animationDelay: '2s', animationDuration: '8s' }}>
        <svg width="65" height="65" viewBox="0 0 24 24" fill="currentColor" className="text-blue-700">
          <circle cx="12" cy="12" r="10"/>
          <circle cx="12" cy="8" r="2" fill="white"/>
          <rect x="10" y="10" width="4" height="8" rx="2" fill="white"/>
        </svg>
      </div>

      {/* GitHub Logo */}
      <div className="absolute top-40 left-1/2 animate-bounce" style={{ animationDelay: '0.5s', animationDuration: '3.5s' }}>
        <svg width="55" height="55" viewBox="0 0 24 24" fill="currentColor" className="text-gray-600">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
        </svg>
      </div>

      {/* AWS Logo */}
      <div className="absolute bottom-20 right-10 animate-pulse" style={{ animationDelay: '1.5s', animationDuration: '5s' }}>
        <svg width="80" height="80" viewBox="0 0 24 24" fill="currentColor" className="text-orange-500">
          <path d="M6.8 14.7c0 .3.1.6.4.8l5.2 4.4c.3.2.6.2.9 0l5.2-4.4c.3-.2.4-.5.4-.8V9.3c0-.3-.1-.6-.4-.8L12.3 4.1c-.3-.2-.6-.2-.9 0L6.2 8.5c-.3.2-.4.5-.4.8v5.4zm5.2-8.6L16.8 9v6L12 17.9 7.2 15V9L12 6.1z"/>
        </svg>
      </div>

      {/* React Logo */}
      <div className="absolute top-60 right-32 animate-spin" style={{ animationDelay: '3s', animationDuration: '6s' }}>
        <svg width="50" height="50" viewBox="0 0 24 24" fill="currentColor" className="text-cyan-500">
          <circle cx="12" cy="12" r="2"/>
          <path d="M12 1a11 11 0 0 0 0 22c-5 0-9-4-9-9s4-9 9-9z" fill="none" stroke="currentColor" strokeWidth="1"/>
          <path d="M12 1a11 11 0 0 1 0 22c5 0 9-4 9-9s-4-9-9-9z" fill="none" stroke="currentColor" strokeWidth="1"/>
          <path d="M1 12h22" fill="none" stroke="currentColor" strokeWidth="1"/>
        </svg>
      </div>
    </div>
  );
};
