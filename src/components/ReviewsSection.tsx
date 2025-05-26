
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
    <section id="reviews" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Trusted by Developers Worldwide</h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            See what engineering teams are saying about our CI/CD pipeline generator
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {reviews.map((review, index) => (
            <div key={index} className="bg-gray-50 rounded-xl p-6 relative">
              <Quote className="w-8 h-8 text-blue-600 mb-4 opacity-50" />
              <div className="flex items-center mb-4">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 mb-6 text-sm leading-relaxed">"{review.content}"</p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                  {review.avatar}
                </div>
                <div className="ml-3">
                  <div className="font-semibold text-gray-900 text-sm">{review.name}</div>
                  <div className="text-gray-500 text-xs">{review.role}</div>
                  <div className="text-blue-600 text-xs font-medium">{review.company}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
