
interface TechStackConfig {
  frontend: string[];
  backend: string[];
  database: string[];
  deployment: string;
  ciProvider: string;
  features: {
    linting: boolean;
    testing: boolean;
    security: boolean;
    formatting: boolean;
    coverage: boolean;
    environmentVars: boolean;
    dockerization: boolean;
  };
}

interface GeneratedWorkflow {
  yaml: string;
  filename: string;
  instructions: string[];
}

export const generateAdvancedYaml = (config: TechStackConfig): GeneratedWorkflow => {
  const { frontend, backend, database, deployment, ciProvider, features } = config;
  
  // Detect project type and requirements
  const hasReact = frontend.includes('react') || frontend.includes('nextjs');
  const hasNextJS = frontend.includes('nextjs');
  const hasNode = backend.includes('nodejs') || backend.includes('express') || backend.includes('nestjs');
  const hasPython = backend.includes('django') || backend.includes('fastapi');
  const hasTypeScript = frontend.includes('typescript') || backend.includes('nestjs');
  const hasPrisma = backend.includes('prisma');
  const needsDatabase = database.length > 0;

  let yaml = '';
  const instructions: string[] = [];

  // Generate workflow based on CI provider
  switch (ciProvider) {
    case 'github':
      yaml = generateGitHubWorkflow(config, { hasReact, hasNextJS, hasNode, hasPython, hasTypeScript, hasPrisma, needsDatabase });
      break;
    case 'gitlab':
      yaml = generateGitLabWorkflow(config, { hasReact, hasNextJS, hasNode, hasPython, hasTypeScript, hasPrisma, needsDatabase });
      break;
    default:
      yaml = generateGitHubWorkflow(config, { hasReact, hasNextJS, hasNode, hasPython, hasTypeScript, hasPrisma, needsDatabase });
  }

  // Add setup instructions
  if (features.environmentVars) {
    instructions.push('Set up environment variables in your repository secrets');
  }
  if (deployment === 'vercel') {
    instructions.push('Configure Vercel token in repository secrets as VERCEL_TOKEN');
  }
  if (deployment === 'netlify') {
    instructions.push('Add NETLIFY_AUTH_TOKEN and NETLIFY_SITE_ID to repository secrets');
  }
  if (features.coverage) {
    instructions.push('Sign up for Codecov and add CODECOV_TOKEN to repository secrets');
  }

  return {
    yaml,
    filename: ciProvider === 'gitlab' ? '.gitlab-ci.yml' : '.github/workflows/ci-cd.yml',
    instructions
  };
};

const generateGitHubWorkflow = (config: TechStackConfig, context: any): string => {
  const { frontend, backend, database, deployment, features } = config;
  const { hasReact, hasNextJS, hasNode, hasPython, hasTypeScript, hasPrisma, needsDatabase } = context;

  let yaml = `name: CI/CD Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

env:`;

  // Add environment variables based on tech stack
  if (hasNode) {
    yaml += `
  NODE_VERSION: '18.x'`;
  }
  if (hasPython) {
    yaml += `
  PYTHON_VERSION: '3.11'`;
  }
  if (features.environmentVars) {
    yaml += `
  # Add your environment variables here
  # DATABASE_URL: \${{ secrets.DATABASE_URL }}`;
  }

  yaml += `

jobs:
  test:
    runs-on: ubuntu-latest
    
    strategy:
      matrix:`;

  if (hasNode) {
    yaml += `
        node-version: [16.x, 18.x, 20.x]`;
  }
  if (hasPython) {
    yaml += `
        python-version: ['3.9', '3.10', '3.11']`;
  }

  yaml += `
    
    services:`;

  // Add database services
  if (database.includes('postgresql')) {
    yaml += `
      postgres:
        image: postgres:15
        env:
          POSTGRES_PASSWORD: postgres
          POSTGRES_DB: test_db
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
        ports:
          - 5432:5432`;
  }

  if (database.includes('mongodb')) {
    yaml += `
      mongodb:
        image: mongo:6.0
        ports:
          - 27017:27017`;
  }

  if (database.includes('redis')) {
    yaml += `
      redis:
        image: redis:7
        ports:
          - 6379:6379`;
  }

  yaml += `

    steps:
    - name: Checkout code
      uses: actions/checkout@v4`;

  // Setup runtime environments
  if (hasNode) {
    yaml += `
    
    - name: Setup Node.js
      uses: actions/setup-node@v4
      with:
        node-version: \${{ matrix.node-version }}
        cache: 'npm'`;
  }

  if (hasPython) {
    yaml += `
    
    - name: Setup Python
      uses: actions/setup-python@v4
      with:
        python-version: \${{ matrix.python-version }}`;
  }

  // Install dependencies
  if (hasNode) {
    yaml += `
    
    - name: Install Node.js dependencies
      run: npm ci`;
  }

  if (hasPython) {
    yaml += `
    
    - name: Install Python dependencies
      run: |
        python -m pip install --upgrade pip
        pip install -r requirements.txt`;
  }

  // Database setup
  if (hasPrisma) {
    yaml += `
    
    - name: Setup Prisma
      run: |
        npx prisma generate
        npx prisma db push`;
  }

  // Linting
  if (features.linting) {
    if (hasNode) {
      yaml += `
    
    - name: Lint JavaScript/TypeScript
      run: npm run lint`;
    }
    if (hasPython) {
      yaml += `
    
    - name: Lint Python code
      run: |
        pip install flake8 black
        flake8 .
        black --check .`;
    }
  }

  // Formatting
  if (features.formatting) {
    if (hasNode) {
      yaml += `
    
    - name: Check code formatting
      run: npm run format:check`;
    }
    if (hasPython) {
      yaml += `
    
    - name: Check Python formatting
      run: black --diff --check .`;
    }
  }

  // Type checking
  if (hasTypeScript) {
    yaml += `
    
    - name: Type check
      run: npm run type-check`;
  }

  // Testing
  if (features.testing) {
    if (hasNode) {
      yaml += `
    
    - name: Run tests
      run: npm test`;
    }
    if (hasPython) {
      yaml += `
    
    - name: Run Python tests
      run: pytest`;
    }
  }

  // Security scanning
  if (features.security) {
    yaml += `
    
    - name: Security scan
      uses: securecodewarrior/github-action-add-sarif@v1
      with:
        sarif-file: 'security-scan-results.sarif'`;
  }

  // Code coverage
  if (features.coverage) {
    yaml += `
    
    - name: Upload coverage reports
      uses: codecov/codecov-action@v3
      with:
        token: \${{ secrets.CODECOV_TOKEN }}`;
  }

  // Build step
  if (hasReact || hasNextJS) {
    yaml += `
    
    - name: Build application
      run: npm run build`;
  }

  // Docker build
  if (features.dockerization) {
    yaml += `
    
    - name: Build Docker image
      run: docker build -t app:latest .`;
  }

  // Deployment job
  if (deployment && deployment !== 'none') {
    yaml += `

  deploy:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main' && github.event_name == 'push'
    
    steps:
    - name: Checkout code
      uses: actions/checkout@v4`;

    switch (deployment) {
      case 'vercel':
        yaml += `
    
    - name: Deploy to Vercel
      uses: amondnet/vercel-action@v25
      with:
        vercel-token: \${{ secrets.VERCEL_TOKEN }}
        vercel-project-id: \${{ secrets.VERCEL_PROJECT_ID }}
        vercel-org-id: \${{ secrets.VERCEL_ORG_ID }}
        working-directory: ./`;
        break;

      case 'netlify':
        yaml += `
    
    - name: Setup Node.js
      uses: actions/setup-node@v4
      with:
        node-version: '18.x'
        cache: 'npm'
    
    - name: Install and build
      run: |
        npm ci
        npm run build
    
    - name: Deploy to Netlify
      uses: nwtgck/actions-netlify@v2.0
      with:
        publish-dir: './dist'
        production-branch: main
        github-token: \${{ secrets.GITHUB_TOKEN }}
        deploy-message: "Deploy from GitHub Actions"
      env:
        NETLIFY_AUTH_TOKEN: \${{ secrets.NETLIFY_AUTH_TOKEN }}
        NETLIFY_SITE_ID: \${{ secrets.NETLIFY_SITE_ID }}`;
        break;

      case 'docker':
        yaml += `
    
    - name: Login to Docker Hub
      uses: docker/login-action@v3
      with:
        username: \${{ secrets.DOCKER_USERNAME }}
        password: \${{ secrets.DOCKER_PASSWORD }}
    
    - name: Build and push
      uses: docker/build-push-action@v5
      with:
        context: .
        push: true
        tags: \${{ secrets.DOCKER_USERNAME }}/\${{ github.event.repository.name }}:latest`;
        break;

      case 'aws':
        yaml += `
    
    - name: Configure AWS credentials
      uses: aws-actions/configure-aws-credentials@v4
      with:
        aws-access-key-id: \${{ secrets.AWS_ACCESS_KEY_ID }}
        aws-secret-access-key: \${{ secrets.AWS_SECRET_ACCESS_KEY }}
        aws-region: us-east-1
    
    - name: Deploy to AWS
      run: |
        npm ci
        npm run build
        aws s3 sync ./dist s3://\${{ secrets.S3_BUCKET_NAME }} --delete
        aws cloudfront create-invalidation --distribution-id \${{ secrets.CLOUDFRONT_DISTRIBUTION_ID }} --paths "/*"`;
        break;
    }
  }

  return yaml;
};

const generateGitLabWorkflow = (config: TechStackConfig, context: any): string => {
  // Simplified GitLab CI implementation
  return `stages:
  - test
  - build
  - deploy

variables:
  NODE_VERSION: "18"

test:
  stage: test
  image: node:\${NODE_VERSION}
  script:
    - npm ci
    - npm run test
  only:
    - merge_requests
    - main

build:
  stage: build
  image: node:\${NODE_VERSION}
  script:
    - npm ci
    - npm run build
  artifacts:
    paths:
      - dist/
  only:
    - main

deploy:
  stage: deploy
  image: alpine:latest
  script:
    - echo "Deploying application..."
  only:
    - main
`;
};
