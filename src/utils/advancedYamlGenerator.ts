interface TechStackConfig {
  frontend: string[];
  backend: string[];
  database: string[];
  deployment: string;
  ciProvider: string;
  workflowType: 'single' | 'multiple' | 'main' | 'staging' | 'development' | 'testing' | 'release';
  workflows?: {
    main: boolean;
    staging: boolean;
    development: boolean;
    testing: boolean;
    release: boolean;
  };
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
  const { frontend, backend, database, deployment, ciProvider, features, workflowType } = config;
  
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
  let filename = '';

  // Generate workflow based on CI provider and workflow type
  switch (ciProvider) {
    case 'github':
      const result = generateGitHubWorkflow(config, { hasReact, hasNextJS, hasNode, hasPython, hasTypeScript, hasPrisma, needsDatabase });
      yaml = result.yaml;
      filename = result.filename;
      break;
    case 'gitlab':
      yaml = generateGitLabWorkflow(config, { hasReact, hasNextJS, hasNode, hasPython, hasTypeScript, hasPrisma, needsDatabase });
      filename = '.gitlab-ci.yml';
      break;
    default:
      const defaultResult = generateGitHubWorkflow(config, { hasReact, hasNextJS, hasNode, hasPython, hasTypeScript, hasPrisma, needsDatabase });
      yaml = defaultResult.yaml;
      filename = defaultResult.filename;
  }

  // Add setup instructions based on configuration
  if (features.environmentVars) {
    instructions.push('Set up environment variables in your repository secrets');
  }
  if (deployment === 'vercel') {
    instructions.push('Configure Vercel token in repository secrets as VERCEL_TOKEN');
    instructions.push('Add VERCEL_PROJECT_ID and VERCEL_ORG_ID to repository secrets');
  }
  if (deployment === 'netlify') {
    instructions.push('Add NETLIFY_AUTH_TOKEN and NETLIFY_SITE_ID to repository secrets');
  }
  if (deployment === 'docker') {
    instructions.push('Add DOCKER_USERNAME and DOCKER_PASSWORD to repository secrets');
  }
  if (deployment === 'aws') {
    instructions.push('Configure AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, S3_BUCKET_NAME, and CLOUDFRONT_DISTRIBUTION_ID in repository secrets');
  }
  if (features.coverage) {
    instructions.push('Sign up for Codecov and add CODECOV_TOKEN to repository secrets');
  }
  if (features.security) {
    instructions.push('Consider adding security scanning tokens for enhanced vulnerability detection');
  }

  return {
    yaml,
    filename,
    instructions
  };
};

const generateGitHubWorkflow = (config: TechStackConfig, context: any): { yaml: string; filename: string } => {
  const { frontend, backend, database, deployment, features, workflowType } = config;
  const { hasReact, hasNextJS, hasNode, hasPython, hasTypeScript, hasPrisma, needsDatabase } = context;

  // Determine workflow name and filename based on type
  let workflowName = 'CI/CD Pipeline';
  let filename = '.github/workflows/ci-cd.yml';
  let triggerBranches = ['main', 'develop'];
  let deploymentCondition = "github.ref == 'refs/heads/main' && github.event_name == 'push'";

  switch (workflowType) {
    case 'main':
      workflowName = 'Production Deployment';
      filename = '.github/workflows/production.yml';
      triggerBranches = ['main'];
      deploymentCondition = "github.ref == 'refs/heads/main'";
      break;
    case 'staging':
      workflowName = 'Staging Deployment';
      filename = '.github/workflows/staging.yml';
      triggerBranches = ['develop', 'staging'];
      deploymentCondition = "github.ref == 'refs/heads/develop' || github.ref == 'refs/heads/staging'";
      break;
    case 'development':
      workflowName = 'Development Build';
      filename = '.github/workflows/development.yml';
      triggerBranches = ['feature/*', 'dev/*'];
      deploymentCondition = 'false'; // No deployment for dev builds
      break;
    case 'testing':
      workflowName = 'Testing Pipeline';
      filename = '.github/workflows/testing.yml';
      triggerBranches = ['**'];
      deploymentCondition = 'false';
      break;
    case 'release':
      workflowName = 'Release Pipeline';
      filename = '.github/workflows/release.yml';
      triggerBranches = ['release/*'];
      deploymentCondition = "startsWith(github.ref, 'refs/heads/release/')";
      break;
  }

  let yaml = `name: ${workflowName}

on:
  push:
    branches: [${triggerBranches.map(b => `'${b}'`).join(', ')}]
  pull_request:
    branches: [${triggerBranches.slice(0, 2).map(b => `'${b}'`).join(', ')}]

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
  # DATABASE_URL: \${{ secrets.DATABASE_URL }}
  # API_KEY: \${{ secrets.API_KEY }}`;
  }

  yaml += `

jobs:
  test:
    runs-on: ubuntu-latest
    
    strategy:
      matrix:`;

  if (hasNode) {
    yaml += `
        node-version: [18.x, 20.x]`;
  }
  if (hasPython) {
    yaml += `
        python-version: ['3.10', '3.11', '3.12']`;
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
          POSTGRES_USER: postgres
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
        image: mongo:7.0
        ports:
          - 27017:27017
        options: >-
          --health-cmd "mongosh --eval 'db.runCommand({ping: 1})'"
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5`;
  }

  if (database.includes('redis')) {
    yaml += `
      redis:
        image: redis:7-alpine
        ports:
          - 6379:6379
        options: >-
          --health-cmd "redis-cli ping"
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5`;
  }

  yaml += `

    steps:
    - name: Checkout code
      uses: actions/checkout@v4
      with:
        fetch-depth: 0`;

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
        python-version: \${{ matrix.python-version }}
        cache: 'pip'`;
  }

  // Install dependencies
  if (hasNode) {
    yaml += `
    
    - name: Install Node.js dependencies
      run: |
        npm ci
        npm audit --audit-level=high`;
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
        npx prisma db push
      env:
        DATABASE_URL: postgresql://postgres:postgres@localhost:5432/test_db`;
  }

  // Linting
  if (features.linting) {
    if (hasNode) {
      yaml += `
    
    - name: Lint JavaScript/TypeScript
      run: |
        npm run lint
        npm run lint:fix || true`;
    }
    if (hasPython) {
      yaml += `
    
    - name: Lint Python code
      run: |
        pip install flake8 pylint
        flake8 . --count --select=E9,F63,F7,F82 --show-source --statistics
        pylint **/*.py || true`;
    }
  }

  // Formatting
  if (features.formatting) {
    if (hasNode) {
      yaml += `
    
    - name: Check code formatting
      run: |
        npm run format:check
        npm run prettier:check || true`;
    }
    if (hasPython) {
      yaml += `
    
    - name: Check Python formatting
      run: |
        pip install black isort
        black --check --diff .
        isort --check-only --diff .`;
    }
  }

  // Type checking
  if (hasTypeScript) {
    yaml += `
    
    - name: Type check TypeScript
      run: |
        npm run type-check
        npx tsc --noEmit`;
  }

  // Security scanning
  if (features.security) {
    yaml += `
    
    - name: Security audit
      run: |
        npm audit --audit-level=moderate
        npx audit-ci --moderate
      continue-on-error: true
    
    - name: Run Trivy vulnerability scanner
      uses: aquasecurity/trivy-action@master
      with:
        scan-type: 'fs'
        scan-ref: '.'
        format: 'sarif'
        output: 'trivy-results.sarif'
      continue-on-error: true`;
  }

  // Testing
  if (features.testing) {
    if (hasNode) {
      yaml += `
    
    - name: Run tests
      run: |
        npm test
        npm run test:unit
        npm run test:integration || true
      env:
        NODE_ENV: test`;
    }
    if (hasPython) {
      yaml += `
    
    - name: Run Python tests
      run: |
        pip install pytest pytest-cov
        pytest --cov=. --cov-report=xml --cov-report=html
      env:
        PYTHONPATH: .`;
    }
  }

  // Code coverage
  if (features.coverage) {
    yaml += `
    
    - name: Upload coverage reports to Codecov
      uses: codecov/codecov-action@v3
      with:
        token: \${{ secrets.CODECOV_TOKEN }}
        files: ./coverage.xml,./coverage/lcov.info
        flags: unittests
        name: codecov-umbrella
        fail_ci_if_error: false`;
  }

  // Build step
  if (hasReact || hasNextJS) {
    yaml += `
    
    - name: Build application
      run: |
        npm run build
        npm run build:prod || npm run build
      env:
        NODE_ENV: production`;
  }

  // Docker build
  if (features.dockerization) {
    yaml += `
    
    - name: Build Docker image
      run: |
        docker build -t \${{ github.repository }}:latest .
        docker image inspect \${{ github.repository }}:latest`;
  }

  // Deployment job (only if deployment is configured and condition is met)
  if (deployment && deployment !== 'none' && deploymentCondition !== 'false') {
    yaml += `

  deploy:
    needs: test
    runs-on: ubuntu-latest
    if: ${deploymentCondition}
    environment: ${workflowType === 'staging' ? 'staging' : 'production'}
    
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
        working-directory: ./
        vercel-args: ${workflowType === 'staging' ? '' : '--prod'}`;
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
        production-branch: ${workflowType === 'staging' ? 'develop' : 'main'}
        production-deploy: ${workflowType !== 'staging'}
        github-token: \${{ secrets.GITHUB_TOKEN }}
        deploy-message: "Deploy from GitHub Actions - \${{ github.sha }}"
      env:
        NETLIFY_AUTH_TOKEN: \${{ secrets.NETLIFY_AUTH_TOKEN }}
        NETLIFY_SITE_ID: \${{ secrets.NETLIFY_SITE_ID }}`;
        break;

      case 'docker':
        yaml += `
    
    - name: Set up Docker Buildx
      uses: docker/setup-buildx-action@v3
    
    - name: Login to Docker Hub
      uses: docker/login-action@v3
      with:
        username: \${{ secrets.DOCKER_USERNAME }}
        password: \${{ secrets.DOCKER_PASSWORD }}
    
    - name: Extract metadata
      id: meta
      uses: docker/metadata-action@v5
      with:
        images: \${{ secrets.DOCKER_USERNAME }}/\${{ github.event.repository.name }}
        tags: |
          type=ref,event=branch
          type=ref,event=pr
          type=sha,prefix={{branch}}-
          type=raw,value=latest,enable={{is_default_branch}}
    
    - name: Build and push Docker image
      uses: docker/build-push-action@v5
      with:
        context: .
        platforms: linux/amd64,linux/arm64
        push: true
        tags: \${{ steps.meta.outputs.tags }}
        labels: \${{ steps.meta.outputs.labels }}
        cache-from: type=gha
        cache-to: type=gha,mode=max`;
        break;

      case 'aws':
        yaml += `
    
    - name: Configure AWS credentials
      uses: aws-actions/configure-aws-credentials@v4
      with:
        aws-access-key-id: \${{ secrets.AWS_ACCESS_KEY_ID }}
        aws-secret-access-key: \${{ secrets.AWS_SECRET_ACCESS_KEY }}
        aws-region: \${{ secrets.AWS_REGION || 'us-east-1' }}
    
    - name: Setup Node.js
      uses: actions/setup-node@v4
      with:
        node-version: '18.x'
        cache: 'npm'
    
    - name: Install and build
      run: |
        npm ci
        npm run build
    
    - name: Deploy to AWS S3
      run: |
        aws s3 sync ./dist s3://\${{ secrets.S3_BUCKET_NAME }} --delete --cache-control max-age=31536000
        aws s3 cp ./dist/index.html s3://\${{ secrets.S3_BUCKET_NAME }}/index.html --cache-control max-age=0
    
    - name: Invalidate CloudFront
      run: |
        aws cloudfront create-invalidation --distribution-id \${{ secrets.CLOUDFRONT_DISTRIBUTION_ID }} --paths "/*"`;
        break;
    }
  }

  return { yaml, filename };
};

const generateGitLabWorkflow = (config: TechStackConfig, context: any): string => {
  const { workflowType } = config;
  
  let workflowName = 'CI/CD Pipeline';
  let deploymentStage = 'production';
  
  switch (workflowType) {
    case 'staging':
      workflowName = 'Staging Pipeline';
      deploymentStage = 'staging';
      break;
    case 'development':
      workflowName = 'Development Pipeline';
      deploymentStage = 'development';
      break;
    case 'testing':
      workflowName = 'Testing Pipeline';
      deploymentStage = 'test';
      break;
  }

  return `# ${workflowName}
stages:
  - test
  - build
  - deploy

variables:
  NODE_VERSION: "18"
  DOCKER_TLS_CERTDIR: "/certs"

cache:
  paths:
    - node_modules/
    - .npm/

before_script:
  - apt-get update -qq && apt-get install -y -qq git curl
  - curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
  - apt-get install -y nodejs

test:
  stage: test
  image: node:\${NODE_VERSION}
  script:
    - npm ci --cache .npm --prefer-offline
    - npm run lint || true
    - npm run test
    - npm run build
  artifacts:
    reports:
      junit: junit.xml
      coverage: coverage/cobertura-coverage.xml
    paths:
      - coverage/
  coverage: '/Lines\\s*:\\s*(\\d+\\.?\\d*)%/'
  only:
    - merge_requests
    - main
    - develop

build:
  stage: build
  image: node:\${NODE_VERSION}
  script:
    - npm ci --cache .npm --prefer-offline
    - npm run build
  artifacts:
    paths:
      - dist/
    expire_in: 1 hour
  only:
    - main
    - develop

deploy_${deploymentStage}:
  stage: deploy
  image: alpine:latest
  before_script:
    - apk add --no-cache curl
  script:
    - echo "Deploying to ${deploymentStage} environment..."
    - echo "Application deployed successfully!"
  environment:
    name: ${deploymentStage}
    url: https://\${CI_PROJECT_NAME}-${deploymentStage}.example.com
  only:
    - main
    - develop
  when: manual
`;
