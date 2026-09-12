
import React from 'react';
import { Header, Footer } from '@/views/layout';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Copy, Download, ArrowLeft, Code, Zap, Shield, Database, Globe, Smartphone, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/controllers/useToastController';

export const ExamplesView = () => {
  const navigate = useNavigate();

  const examples = [
    {
      title: "React + Node.js Full Stack",
      description: "Complete CI/CD pipeline for a React frontend with Node.js backend, including testing, building, and deployment to AWS.",
      technologies: ["React", "Node.js", "Jest", "AWS", "Docker"],
      complexity: "Advanced",
      icon: <Code className="w-6 h-6" />,
      yaml: `name: React Node.js Full Stack Pipeline

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

jobs:
  test-frontend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: cd frontend && npm ci
      - run: cd frontend && npm test
      - run: cd frontend && npm run build

  test-backend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: cd backend && npm ci
      - run: cd backend && npm test

  deploy:
    needs: [test-frontend, test-backend]
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v3
      - name: Deploy to AWS
        run: |
          # AWS deployment commands
          echo "Deploying to production..."`
    },
    {
      title: "Python Django with PostgreSQL",
      description: "Production-ready pipeline for Django applications with PostgreSQL database, including migrations, testing, and security scanning.",
      technologies: ["Python", "Django", "PostgreSQL", "Docker", "Heroku"],
      complexity: "Intermediate",
      icon: <Database className="w-6 h-6" />,
      yaml: `name: Django PostgreSQL Pipeline

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    services:
      postgres:
        image: postgres:13
        env:
          POSTGRES_PASSWORD: postgres
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5

    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-python@v4
        with:
          python-version: '3.9'
      - run: |
          pip install -r requirements.txt
          python manage.py test
          python manage.py check --deploy

  deploy:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v3
      - name: Deploy to Heroku
        uses: akhileshns/heroku-deploy@v3.12.12
        with:
          heroku_api_key: \${{secrets.HEROKU_API_KEY}}
          heroku_app_name: "your-app-name"
          heroku_email: "your-email@example.com"`
    },
    {
      title: "Next.js with Vercel Deployment",
      description: "Optimized pipeline for Next.js applications with automatic deployment to Vercel, including ESLint, TypeScript checking, and performance testing.",
      technologies: ["Next.js", "TypeScript", "Vercel", "ESLint", "Jest"],
      complexity: "Beginner",
      icon: <Globe className="w-6 h-6" />,
      yaml: `name: Next.js Vercel Pipeline

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build-and-test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      
      - run: npm ci
      - run: npm run lint
      - run: npm run type-check
      - run: npm run test
      - run: npm run build

  deploy:
    needs: build-and-test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v3
      - name: Deploy to Vercel
        uses: vercel/action@v1
        with:
          vercel-token: \${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: \${{ secrets.ORG_ID }}
          vercel-project-id: \${{ secrets.PROJECT_ID }}`
    },
    {
      title: "Docker Multi-Stage with Security",
      description: "Enterprise-grade pipeline with Docker multi-stage builds, security scanning, and deployment to Kubernetes cluster.",
      technologies: ["Docker", "Kubernetes", "Trivy", "Helm", "Security"],
      complexity: "Expert",
      icon: <Shield className="w-6 h-6" />,
      yaml: `name: Docker Security Pipeline

on: [push, pull_request]

jobs:
  security-scan:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Run Trivy vulnerability scanner
        uses: aquasecurity/trivy-action@master
        with:
          scan-type: 'fs'
          scan-ref: '.'

  build-and-push:
    needs: security-scan
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Build Docker image
        run: |
          docker build -t myapp:latest .
          docker tag myapp:latest myapp:\${{ github.sha }}
      
      - name: Scan Docker image
        uses: aquasecurity/trivy-action@master
        with:
          image-ref: 'myapp:latest'
          format: 'sarif'
          output: 'trivy-results.sarif'

      - name: Push to registry
        run: |
          echo "\${{ secrets.DOCKER_PASSWORD }}" | docker login -u "\${{ secrets.DOCKER_USERNAME }}" --password-stdin
          docker push myapp:latest
          docker push myapp:\${{ github.sha }}

  deploy:
    needs: build-and-push
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - name: Deploy to Kubernetes
        run: |
          helm upgrade --install myapp ./helm-chart \\
            --set image.tag=\${{ github.sha }}`
    }
  ];

  const copyToClipboard = async (yaml: string, title: string) => {
    try {
      await navigator.clipboard.writeText(yaml);
      toast({
        title: "Copied!",
        description: `${title} pipeline copied to clipboard`,
      });
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to copy to clipboard",
        variant: "destructive",
      });
    }
  };

  const downloadYaml = (yaml: string, title: string) => {
    const blob = new Blob([yaml], { type: 'text/yaml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${title.toLowerCase().replace(/\s+/g, '-')}-pipeline.yml`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Downloaded!",
      description: `${title} pipeline downloaded`,
    });
  };

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case 'Beginner': return 'bg-green-100 text-green-800 border-green-200';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Advanced': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'Expert': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

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
                <Card key={index} className="p-6 hover:shadow-xl transition-all duration-300 border-2 hover:border-blue-200">
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
