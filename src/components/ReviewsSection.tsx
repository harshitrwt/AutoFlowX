
import React from 'react';
import { Star, Quote } from 'lucide-react';

export const ReviewsSection = () => {
  const reviews = [
    {
      name: "Sarah Chen",
      role: "Senior DevOps Engineer",
      company: "TechCorp",
      rating: 5,
      content: "This tool saved us weeks of work. The generated pipelines are production-ready and follow all the best practices we'd manually implement.",
      avatar: "SC"
    },
    {
      name: "Marcus Rodriguez",
      role: "Lead Developer",
      company: "StartupXYZ",
      rating: 5,
      content: "Perfect for our multi-service architecture. The auto-detection feature correctly identified all our technologies and created optimized workflows.",
      avatar: "MR"
    },
    {
      name: "Emily Johnson",
      role: "Platform Engineer",
      company: "Enterprise Solutions",
      rating: 5,
      content: "The security features are outstanding. Built-in scanning and compliance checks that would take us months to implement manually.",
      avatar: "EJ"
    },
    {
      name: "David Kim",
      role: "CTO",
      company: "InnovateLab",
      rating: 5,
      content: "Reduced our deployment setup time from days to minutes. The quality of generated YAML is exceptional - clean, well-documented, and maintainable.",
      avatar: "DK"
    }
  ];

  return (
    <section id="reviews" className="py-12 sm:py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">Trusted by Developers Worldwide</h2>
          <p className="text-gray-600 dark:text-gray-300 text-base sm:text-lg max-w-2xl mx-auto">
            See what engineering teams are saying about our CI/CD pipeline generator
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {reviews.map((review, index) => (
            <div key={index} className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 sm:p-6 relative border border-gray-200 dark:border-gray-700">
              <Quote className="w-6 sm:w-8 h-6 sm:h-8 text-blue-600 dark:text-blue-400 mb-4 opacity-50" />
              <div className="flex items-center mb-4">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 dark:text-gray-300 mb-6 text-sm leading-relaxed">"{review.content}"</p>
              <div className="flex items-center">
                <div className="w-8 sm:w-10 h-8 sm:h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-xs sm:text-sm">
                  {review.avatar}
                </div>
                <div className="ml-3">
                  <div className="font-semibold text-gray-900 dark:text-white text-sm">{review.name}</div>
                  <div className="text-gray-500 dark:text-gray-400 text-xs">{review.role}</div>
                  <div className="text-blue-600 dark:text-blue-400 text-xs font-medium">{review.company}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
