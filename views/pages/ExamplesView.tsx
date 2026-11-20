import React from 'react';
import { Header, Footer } from '@/views/layout';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Copy, Download, ArrowLeft, Zap, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useExamplesController } from '@/controllers/useExamplesController';

export const ExamplesView = () => {
  const navigate = useNavigate();
  const { examples, copyToClipboard, downloadYaml, getComplexityColor } = useExamplesController();

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header />
      <div className="pt-16 sm:pt-20">
        <section className="px-4 sm:px-6 py-8 lg:py-12 bg-gradient-to-br from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="text-center mb-8 lg:mb-12">
              <Button
                onClick={() => navigate('/')}
                variant="outline"
                className="mb-6"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
              
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                Pipeline Examples
              </h1>
              <p className="text-gray-600 dark:text-gray-400 text-lg max-w-3xl mx-auto">
                Explore production-ready CI/CD pipeline examples for different tech stacks and use cases. 
                Copy, customize, and deploy these battle-tested configurations.
              </p>
            </div>

            {/* Examples Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {examples.map((example, index) => (
                <Card key={example.id || index} className="p-6 hover:shadow-xl transition-all duration-300 border-2 hover:border-blue-200">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                        {example.icon}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                          {example.title}
                        </h3>
                        <Badge className={`${getComplexityColor(example.complexity)} text-xs`}>
                          {example.complexity}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm leading-relaxed">
                    {example.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {example.technologies.map((tech, techIndex) => (
                      <Badge key={techIndex} variant="outline" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>

                  <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 mb-4">
                    <pre className="text-xs font-mono text-gray-700 dark:text-gray-300 overflow-x-auto max-h-64">
                      {example.yaml}
                    </pre>
                  </div>

                  <div className="flex space-x-2">
                    <Button
                      onClick={() => copyToClipboard(example.yaml, example.title)}
                      variant="outline"
                      size="sm"
                      className="flex-1"
                    >
                      <Copy className="w-4 h-4 mr-2" />
                      Copy
                    </Button>
                    <Button
                      onClick={() => downloadYaml(example.yaml, example.title)}
                      variant="outline"
                      size="sm"
                      className="flex-1"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </Card>
              ))}
            </div>

            {/* Call to Action */}
            <div className="text-center mt-12 p-8 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-xl">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Need a Custom Pipeline?
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Use our intelligent generator to create pipelines tailored to your exact requirements.
              </p>
              <Button
                onClick={() => navigate('/generator')}
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-3 font-semibold shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                <Zap className="w-5 h-5 mr-2" />
                Generate Your Pipeline
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default ExamplesView;
