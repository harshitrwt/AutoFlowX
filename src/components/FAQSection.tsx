
import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

export const FAQSection = () => {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const faqs = [
    {
      question: "What technologies are supported?",
      answer: "We support 20+ technologies including React, Vue, Angular, Node.js, Python, Django, FastAPI, Docker, PostgreSQL, MongoDB, and many more. Our system automatically detects your tech stack and generates optimized pipelines."
    },
    {
      question: "Are the generated pipelines production-ready?",
      answer: "Yes! All generated pipelines follow industry best practices, include security scanning, testing, linting, and deployment strategies. They're designed to be production-ready out of the box with enterprise-grade features."
    },
    {
      question: "Can I customize the generated workflows?",
      answer: "Absolutely! While our tool generates optimized workflows automatically, you can customize every aspect including adding custom steps, environment variables, deployment strategies, and conditional logic to match your specific needs."
    },
    {
      question: "Do I need YAML knowledge to use this tool?",
      answer: "Not at all! Our intuitive interface allows you to configure your pipeline through a user-friendly form. The tool handles all the complex YAML generation and best practices implementation automatically."
    },
    {
      question: "What CI/CD providers are supported?",
      answer: "Currently we support GitHub Actions with plans to add GitLab CI, Jenkins, CircleCI, and Azure DevOps. GitHub Actions covers the majority of modern development workflows and integrates seamlessly with GitHub repositories."
    },
    {
      question: "Is there support for multi-environment deployments?",
      answer: "Yes! Our generator supports complex deployment strategies including staging, production, blue-green deployments, canary releases, and rollback mechanisms. You can configure multiple environments with different deployment rules."
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <section id="faq" className="py-12 sm:py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">Frequently Asked Questions</h2>
          <p className="text-gray-600 dark:text-gray-300 text-base sm:text-lg">
            Everything you need to know about our CI/CD pipeline generator
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden transition-all duration-300 hover:shadow-md"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-4 sm:px-6 py-4 sm:py-5 text-left flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200"
              >
                <span className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white pr-4">{faq.question}</span>
                <div className="flex-shrink-0">
                  {openFAQ === index ? (
                    <ChevronUp className="w-5 h-5 text-blue-600 dark:text-blue-400 transition-transform duration-300" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-500 dark:text-gray-400 transition-transform duration-300" />
                  )}
                </div>
              </button>
              <div 
                className={`transition-all duration-500 ease-out overflow-hidden ${
                  openFAQ === index 
                    ? 'max-h-96 opacity-100' 
                    : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-4 sm:px-6 pb-4 sm:pb-5">
                  <div className="pt-2 border-t border-gray-100 dark:border-gray-700">
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm sm:text-base">{faq.answer}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
