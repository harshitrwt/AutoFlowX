
import React from 'react';
import { Star, Quote } from 'lucide-react';
import { useScrollAnimation } from '@/controllers/useScrollController';

export const ReviewsSection = () => {
  const titleAnimation = useScrollAnimation({ threshold: 0.2, triggerOnce: true });
  const reviewsAnimation = useScrollAnimation({ threshold: 0.1, triggerOnce: true });

  const reviews = [
    {
      rating: 5,
      content: "This tool saved us weeks of work. The generated pipelines are production-ready and follow all the best practices we'd manually implement.",
    },
    {
      rating: 5,
      content: "Perfect for our multi-service architecture. The auto-detection feature correctly identified all our technologies and created optimized workflows.",
    },
    {
      rating: 5,
      content: "The security features are outstanding. Built-in scanning and compliance checks that would take us months to implement manually.",
    },
    {
      rating: 5,
      content: "Reduced our deployment setup time from days to minutes. The quality of generated YAML is exceptional - clean, well-documented, and maintainable.",
    }
  ];

  return (
    <section id="reviews" className="py-12 sm:py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div ref={titleAnimation.ref} className="text-center mb-12 sm:mb-16">
          <h2 className={`text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4 ${titleAnimation.isVisible ? 'animate-fade-up' : 'opacity-0'}`}>Trusted by Developers Worldwide</h2>
          <p className={`text-gray-600 dark:text-gray-300 text-base sm:text-lg hidden max-w-2xl mx-auto ${titleAnimation.isVisible ? 'animate-fade-up animate-delay-200' : 'opacity-0'}`}>
            See what engineering teams are saying about our CI/CD pipeline generator
          </p>
        </div>

        <div ref={reviewsAnimation.ref} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {reviews.map((review, index) => (
            <div key={index} className={`bg-gray-50 dark:bg-gray-800 rounded-xl p-4 sm:p-6 relative border border-gray-200 dark:border-gray-700 ${reviewsAnimation.isVisible ? `animate-fade-up animate-delay-${(index + 1) * 100}` : 'opacity-0'}`}>
              
              <div className="flex items-center mb-4">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">"{review.content}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
