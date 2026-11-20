import React, { useState, useMemo } from 'react';
import { ExamplePipeline } from '@/models/example.model';
import { toast } from '@/hooks/use-toast';
import { Code, Database, Globe, Shield } from 'lucide-react';

export const pipelineExamples: ExamplePipeline[] = [
  {
    id: "react-node-fullstack",
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
          echo "Deploying to production..."`,
  },
  {
    id: "django-postgresql",
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
          heroku_email: "your-email@example.com"`,
  },
  {
    id: "nextjs-vercel",
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
          vercel-project-id: \${{ secrets.PROJECT_ID }}`,
  },
  {
    id: "docker-kubernetes",
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
            --set image.tag=\${{ github.sha }}`,
  },
];

export function useExamplesController() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTech, setSelectedTech] = useState<string | null>(null);

  const filteredExamples = useMemo(() => {
    return pipelineExamples.filter((example) => {
      const matchesSearch =
        searchQuery === '' ||
        example.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        example.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        example.technologies.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesTech =
        selectedTech === null ||
        example.technologies.some((t) => t.toLowerCase() === selectedTech.toLowerCase());

      return matchesSearch && matchesTech;
    });
  }, [searchQuery, selectedTech]);

  const copyToClipboard = async (yaml: string, title: string) => {
    try {
      await navigator.clipboard.writeText(yaml);
      toast({
        title: "Copied!",
        description: `${title} pipeline copied to clipboard`,
      });
    } catch {
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
      case 'Beginner':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Intermediate':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Advanced':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'Expert':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return {
    examples: filteredExamples,
    allExamples: pipelineExamples,
    searchQuery,
    setSearchQuery,
    selectedTech,
    setSelectedTech,
    copyToClipboard,
    downloadYaml,
    getComplexityColor,
  };
}
