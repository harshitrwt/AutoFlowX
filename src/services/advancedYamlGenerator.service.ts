import { TechStackConfig, WorkflowResult } from '@/models/workflow.model';

export const generateAdvancedYaml = (config: TechStackConfig): WorkflowResult => {
  const { frontend, backend, database, deployment, ciProvider = "github", features, workflowType, workflowSteps = [] } = config;
  
  // Detect project type and requirements
  const hasReact = frontend.includes('react') || frontend.includes('nextjs');
  const hasNextJS = frontend.includes('nextjs');
  const hasBlazor = frontend.includes('blazor');
  const hasNode = backend.includes('nodejs') || backend.includes('express') || backend.includes('nestjs') || hasReact;
  const hasPython = backend.includes('django') || backend.includes('fastapi');
  const hasDotNet = backend.includes('dotnet') || backend.includes('aspnet') || backend.includes('csharp') || hasBlazor;
  const hasTypeScript = frontend.includes('typescript') || backend.includes('nestjs');
  const hasPrisma = backend.includes('prisma');
  const needsDatabase = database.length > 0;
  const hasSqlServer = database.includes('sqlserver');

  let yaml = "";
  let filename = "";
  const instructions: string[] = [];
  let explanation = "";

  // Build explanation based on what the workflow actually does
  const actions = [];
  if (hasNode) actions.push("install Node.js dependencies");
  if (hasPython) actions.push("install Python dependencies");
  if (hasDotNet) actions.push("restore .NET packages");
  if (features.linting) actions.push("run code linting");
  if (features.testing) actions.push("execute tests");
  if (features.formatting) actions.push("check code formatting");
  if (features.security) actions.push("perform security scans");
  if (features.dockerization) actions.push("build Docker images");
  if (deployment && deployment !== 'none') actions.push(`deploy to ${deployment}`);

  explanation = `This workflow automatically ${actions.join(", ")} when you push code or create pull requests. It's configured for your specific tech stack and will help maintain code quality and automate deployments.`;

  // Generate workflow based on CI provider
  switch (ciProvider) {
    case "jenkins": {
      const dockerSteps = config.features.dockerization ? `
        stage('Docker Build') {
            steps {
                script {
                    docker.build("\${env.JOB_NAME}:\${env.BUILD_NUMBER}")
                }
            }
        }
        stage('Docker Push') {
            steps {
                script {
                    docker.withRegistry('https://registry.hub.docker.com', 'docker-hub-credentials') {
                        docker.image("\${env.JOB_NAME}:\${env.BUILD_NUMBER}").push()
                    }
                }
            }
        }` : '';

      yaml = `pipeline {
  agent any
  
  environment {
    ${hasNode ? 'NODE_VERSION = "18.x"' : ''}
    ${hasPython ? 'PYTHON_VERSION = "3.11"' : ''}
    ${hasDotNet ? 'DOTNET_VERSION = "8.0.x"' : ''}
    ${features.environmentVars ? `
    // Add your environment variables here
    // DATABASE_URL = credentials('database-url')
    // API_KEY = credentials('api-key')` : ''}
  }
  
  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }
    
    ${hasNode ? `
    stage('Setup Node.js') {
      steps {
        sh 'curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -'
        sh 'sudo apt-get install -y nodejs'
        sh 'node --version'
        sh 'npm --version'
      }
    }
    
    stage('Install Dependencies') {
      steps {
        sh 'npm ci'
      }
    }` : ''}
    
    ${hasPython ? `
    stage('Setup Python') {
      steps {
        sh 'python3 --version'
        sh 'pip3 install --upgrade pip'
        sh 'pip3 install -r requirements.txt'
      }
    }` : ''}
    
    ${hasDotNet ? `
    stage('Setup .NET') {
      steps {
        sh 'wget https://packages.microsoft.com/config/ubuntu/20.04/packages-microsoft-prod.deb -O packages-microsoft-prod.deb'
        sh 'sudo dpkg -i packages-microsoft-prod.deb'
        sh 'sudo apt-get update'
        sh 'sudo apt-get install -y dotnet-sdk-8.0'
        sh 'dotnet --version'
      }
    }
    
    stage('Restore .NET Packages') {
      steps {
        sh 'dotnet restore'
      }
    }` : ''}
    
    ${features.linting ? `
    stage('Lint Code') {
      steps {
        ${hasNode ? "sh 'npm run lint'" : ''}
        ${hasPython ? "sh 'flake8 . || true'" : ''}
        ${hasDotNet ? "sh 'dotnet format --verify-no-changes'" : ''}
      }
    }` : ''}
    
    ${features.formatting ? `
    stage('Check Formatting') {
      steps {
        ${hasNode ? "sh 'npm run format:check || npx prettier --check .'" : ''}
        ${hasPython ? "sh 'black --check . || true'" : ''}
        ${hasDotNet ? "sh 'dotnet format --verify-no-changes'" : ''}
      }
    }` : ''}
    
    ${features.testing ? `
    stage('Run Tests') {
      steps {
        ${hasNode ? "sh 'npm test'" : ''}
        ${hasPython ? "sh 'pytest'" : ''}
        ${hasDotNet ? "sh 'dotnet test'" : ''}
      }
    }` : ''}
    
    ${hasNode || hasPython || hasDotNet ? `
    stage('Build Application') {
      steps {
        ${hasNode ? "sh 'npm run build'" : ''}
        ${hasPython ? "echo 'Python build step if needed'" : ''}
        ${hasDotNet ? "sh 'dotnet build --configuration Release'" : ''}
      }
    }` : ''}
    
    ${features.dockerization ? `
    stage('Build Docker Image') {
      steps {
        sh 'docker build -t my-app:latest .'
        sh 'docker tag my-app:latest my-app:\${BUILD_NUMBER}'
      }
    }` : ''}
    
    ${dockerSteps}
    
    ${deployment && deployment !== 'none' ? `
    stage('Deploy') {
      when { branch 'main' }
      steps {
        script {
          echo "Deploying to ${deployment}..."
          // Add deployment commands here based on your platform
        }
      }
    }` : ''}
  }
  
  post {
    always {
      cleanWs()
    }
    failure {
      echo 'Pipeline failed!'
    }
    success {
      echo 'Pipeline succeeded!'
    }
  }
}`;
      filename = "Jenkinsfile";
      break;
    }

    case "gitlab": {
      yaml = `stages:
  - install
  - lint
  - test
  - build
  - deploy

variables:
  ${hasNode ? 'NODE_VERSION: "18"' : ''}
  ${hasPython ? 'PYTHON_VERSION: "3.11"' : ''}
  ${hasDotNet ? 'DOTNET_VERSION: "8.0.x"' : ''}

${needsDatabase ? `services:
  ${database.includes('postgresql') ? `
  - name: postgres:15
    alias: postgres
    variables:
      POSTGRES_DB: test_db
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres` : ''}
  ${database.includes('mongodb') ? `
  - name: mongo:7.0
    alias: mongodb` : ''}
  ${database.includes('redis') ? `
  - name: redis:7-alpine
    alias: redis` : ''}
  ${hasSqlServer ? `
  - name: mcr.microsoft.com/mssql/server:2022-latest
    alias: sqlserver
    variables:
      ACCEPT_EULA: Y
      SA_PASSWORD: YourPassword123!` : ''}` : ''}

${hasNode ? `
install_node:
  stage: install
  image: node:18
  script:
    - npm ci
  artifacts:
    paths:
      - node_modules/
    expire_in: 1 hour
  cache:
    paths:
      - node_modules/` : ''}

${hasPython ? `
install_python:
  stage: install
  image: python:3.11
  script:
    - pip install --upgrade pip
    - pip install -r requirements.txt
  artifacts:
    paths:
      - venv/
    expire_in: 1 hour` : ''}

${hasDotNet ? `
install_dotnet:
  stage: install
  image: mcr.microsoft.com/dotnet/sdk:8.0
  script:
    - dotnet restore
  artifacts:
    paths:
      - bin/
      - obj/
    expire_in: 1 hour` : ''}

${features.linting ? `
lint:
  stage: lint
  ${hasNode ? 'image: node:18' : hasPython ? 'image: python:3.11' : hasDotNet ? 'image: mcr.microsoft.com/dotnet/sdk:8.0' : 'image: alpine'}
  script:
    ${hasNode ? '- npm run lint' : ''}
    ${hasPython ? '- flake8 .' : ''}
    ${hasDotNet ? '- dotnet format --verify-no-changes' : ''}
  ${hasNode ? 'dependencies:\n    - install_node' : hasPython ? 'dependencies:\n    - install_python' : hasDotNet ? 'dependencies:\n    - install_dotnet' : ''}` : ''}

${features.testing ? `
test:
  stage: test
  ${hasNode ? 'image: node:18' : hasPython ? 'image: python:3.11' : hasDotNet ? 'image: mcr.microsoft.com/dotnet/sdk:8.0' : 'image: alpine'}
  script:
    ${hasNode ? '- npm test' : ''}
    ${hasPython ? '- pytest' : ''}
    ${hasDotNet ? '- dotnet test' : ''}
  ${hasNode ? 'dependencies:\n    - install_node' : hasPython ? 'dependencies:\n    - install_python' : hasDotNet ? 'dependencies:\n    - install_dotnet' : ''}
  ${features.coverage ? `
  artifacts:
    reports:
      coverage_report:
        coverage_format: cobertura
        path: coverage.xml` : ''}` : ''}

build:
  stage: build
  ${hasNode ? 'image: node:18' : hasPython ? 'image: python:3.11' : hasDotNet ? 'image: mcr.microsoft.com/dotnet/sdk:8.0' : 'image: alpine'}
  script:
    ${hasNode ? '- npm run build' : ''}
    ${hasPython ? '- echo "Python build step"' : ''}
    ${hasDotNet ? '- dotnet build --configuration Release' : ''}
  artifacts:
    paths:
      ${hasNode ? '- dist/' : ''}
      ${hasPython ? '- build/' : ''}
      ${hasDotNet ? '- bin/Release/' : ''}
    expire_in: 1 hour
  ${hasNode ? 'dependencies:\n    - install_node' : hasPython ? 'dependencies:\n    - install_python' : hasDotNet ? 'dependencies:\n    - install_dotnet' : ''}

${features.dockerization ? `
docker_build:
  stage: build
  image: docker:latest
  services:
    - docker:dind
  script:
    - docker build -t $CI_PROJECT_NAME:$CI_COMMIT_SHA .
    - docker tag $CI_PROJECT_NAME:$CI_COMMIT_SHA $CI_PROJECT_NAME:latest` : ''}

${deployment && deployment !== 'none' ? `
deploy:
  stage: deploy
  image: alpine:latest
  script:
    - echo "Deploying to ${deployment}..."
    - # Add deployment commands here
  only:
    - main
  when: manual` : ''}`;
      filename = ".gitlab-ci.yml";
      break;
    }

    case "github":
    default: {
      yaml = `name: CI/CD Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

env:
  ${hasNode ? 'NODE_VERSION: "18.x"' : ''}
  ${hasPython ? 'PYTHON_VERSION: "3.11"' : ''}
  ${hasDotNet ? 'DOTNET_VERSION: "8.0.x"' : ''}
  ${features.environmentVars ? `
  # Add your environment variables here
  # DATABASE_URL: \${{ secrets.DATABASE_URL }}
  # API_KEY: \${{ secrets.API_KEY }}` : ''}

jobs:
  ${features.testing || features.linting || hasNode || hasPython || hasDotNet ? `
  test:
    runs-on: ubuntu-latest
    
    ${needsDatabase ? `
    services:
      ${database.includes('postgresql') ? `
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
          - 5432:5432` : ''}
      ${database.includes('mongodb') ? `
      mongodb:
        image: mongo:7.0
        ports:
          - 27017:27017` : ''}
      ${database.includes('redis') ? `
      redis:
        image: redis:7-alpine
        ports:
          - 6379:6379
        options: >-
          --health-cmd "redis-cli ping"
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5` : ''}
      ${hasSqlServer ? `
      sqlserver:
        image: mcr.microsoft.com/mssql/server:2022-latest
        env:
          ACCEPT_EULA: Y
          SA_PASSWORD: YourPassword123!
        ports:
          - 1433:1433
        options: >-
          --health-cmd "/opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P YourPassword123! -Q 'SELECT 1'"
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5` : ''}` : ''}
    
    steps:
    - name: Checkout code
      uses: actions/checkout@v4
      
    ${hasNode ? `
    - name: Setup Node.js
      uses: actions/setup-node@v4
      with:
        node-version: \${{ env.NODE_VERSION }}
        cache: 'npm'
        
    - name: Install dependencies
      run: npm ci` : ''}
    
    ${hasPython ? `
    - name: Setup Python
      uses: actions/setup-python@v4
      with:
        python-version: \${{ env.PYTHON_VERSION }}
        cache: 'pip'
        
    - name: Install Python dependencies
      run: |
        python -m pip install --upgrade pip
        pip install -r requirements.txt` : ''}
    
    ${hasDotNet ? `
    - name: Setup .NET
      uses: actions/setup-dotnet@v4
      with:
        dotnet-version: \${{ env.DOTNET_VERSION }}
        
    - name: Restore .NET packages
      run: dotnet restore` : ''}
    
    ${hasPrisma ? `
    - name: Setup Prisma
      run: |
        npx prisma generate
        npx prisma db push
      env:
        DATABASE_URL: postgresql://postgres:postgres@localhost:5432/test_db` : ''}
    
    ${features.linting ? `
    - name: Run linting
      run: |
        ${hasNode ? 'npm run lint' : ''}
        ${hasPython ? 'flake8 .' : ''}
        ${hasDotNet ? 'dotnet format --verify-no-changes' : ''}` : ''}
    
    ${features.formatting ? `
    - name: Check code formatting
      run: |
        ${hasNode ? 'npm run format:check || npx prettier --check .' : ''}
        ${hasPython ? 'black --check .' : ''}
        ${hasDotNet ? 'dotnet format --verify-no-changes' : ''}` : ''}
    
    ${hasTypeScript ? `
    - name: Type check
      run: npx tsc --noEmit` : ''}
    
    ${features.security ? `
    - name: Security audit
      run: |
        ${hasNode ? 'npm audit --audit-level=moderate' : ''}
        ${hasPython ? 'pip check' : ''}
        ${hasDotNet ? 'dotnet list package --vulnerable' : ''}
      continue-on-error: true` : ''}
    
    ${features.testing ? `
    - name: Run tests
      run: |
        ${hasNode ? 'npm test' : ''}
        ${hasPython ? 'pytest' : ''}
        ${hasDotNet ? 'dotnet test' : ''}
      env:
        ${hasNode ? 'NODE_ENV: test' : ''}
        ${needsDatabase && database.includes('postgresql') ? 'DATABASE_URL: postgresql://postgres:postgres@localhost:5432/test_db' : ''}
        ${hasSqlServer ? 'ConnectionStrings__DefaultConnection: "Server=localhost,1433;Database=TestDb;User Id=sa;Password=YourPassword123!;TrustServerCertificate=true;"' : ''}` : ''}
    
    ${features.coverage ? `
    - name: Upload coverage to Codecov
      uses: codecov/codecov-action@v3
      with:
        token: \${{ secrets.CODECOV_TOKEN }}
        files: ./coverage.xml,./coverage/lcov.info
        flags: unittests
        name: codecov-umbrella
        fail_ci_if_error: false` : ''}` : ''}

  build:
    runs-on: ubuntu-latest
    ${features.testing || features.linting || hasNode || hasPython || hasDotNet ? 'needs: test' : ''}
    
    steps:
    - name: Checkout code
      uses: actions/checkout@v4
      
    ${hasNode ? `
    - name: Setup Node.js
      uses: actions/setup-node@v4
      with:
        node-version: \${{ env.NODE_VERSION }}
        cache: 'npm'
        
    - name: Install dependencies
      run: npm ci
      
    - name: Build application
      run: npm run build
      env:
        NODE_ENV: production` : ''}
    
    ${hasPython ? `
    - name: Setup Python
      uses: actions/setup-python@v4
      with:
        python-version: \${{ env.PYTHON_VERSION }}
        
    - name: Build Python application
      run: |
        python -m pip install --upgrade pip
        pip install -r requirements.txt
        # Add build commands if needed` : ''}
    
    ${hasDotNet ? `
    - name: Setup .NET
      uses: actions/setup-dotnet@v4
      with:
        dotnet-version: \${{ env.DOTNET_VERSION }}
        
    - name: Build .NET application
      run: |
        dotnet restore
        dotnet build --configuration Release
        dotnet publish --configuration Release --output ./publish` : ''}
    
    ${features.dockerization ? `
    - name: Build Docker image
      run: |
        docker build -t \${{ github.repository }}:latest .
        docker image inspect \${{ github.repository }}:latest` : ''}
    
    ${features.dockerization && deployment === 'docker' ? `
    - name: Login to Docker Hub
      uses: docker/login-action@v3
      with:
        username: \${{ secrets.DOCKER_USERNAME }}
        password: \${{ secrets.DOCKER_PASSWORD }}
        
    - name: Push Docker image
      run: |
        docker push \${{ github.repository }}:latest
        docker push \${{ github.repository }}:\${{ github.sha }}` : ''}

${deployment && deployment !== 'none' && deployment !== 'docker' ? `
  deploy:
    runs-on: ubuntu-latest
    needs: build
    if: github.ref == 'refs/heads/main' && github.event_name == 'push'
    environment: production
    
    steps:
    - name: Checkout code
      uses: actions/checkout@v4
      
    ${deployment === 'vercel' ? `
    - name: Deploy to Vercel
      uses: amondnet/vercel-action@v25
      with:
        vercel-token: \${{ secrets.VERCEL_TOKEN }}
        vercel-project-id: \${{ secrets.VERCEL_PROJECT_ID }}
        vercel-org-id: \${{ secrets.VERCEL_ORG_ID }}
        working-directory: ./
        vercel-args: '--prod'` : ''}
    
    ${deployment === 'netlify' ? `
    - name: Setup Node.js
      uses: actions/setup-node@v4
      with:
        node-version: \${{ env.NODE_VERSION }}
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
        production-deploy: true
        github-token: \${{ secrets.GITHUB_TOKEN }}
        deploy-message: "Deploy from GitHub Actions"
      env:
        NETLIFY_AUTH_TOKEN: \${{ secrets.NETLIFY_AUTH_TOKEN }}
        NETLIFY_SITE_ID: \${{ secrets.NETLIFY_SITE_ID }}` : ''}
    
    ${deployment === 'azure' ? `
    - name: Setup .NET
      uses: actions/setup-dotnet@v4
      with:
        dotnet-version: \${{ env.DOTNET_VERSION }}
        
    - name: Build and publish
      run: |
        dotnet restore
        dotnet build --configuration Release
        dotnet publish --configuration Release --output ./publish
        
    - name: Deploy to Azure Web App
      uses: azure/webapps-deploy@v2
      with:
        app-name: \${{ secrets.AZURE_WEBAPP_NAME }}
        publish-profile: \${{ secrets.AZURE_WEBAPP_PUBLISH_PROFILE }}
        package: ./publish` : ''}
    
    ${deployment === 'aws' ? `
    - name: Configure AWS credentials
      uses: aws-actions/configure-aws-credentials@v4
      with:
        aws-access-key-id: \${{ secrets.AWS_ACCESS_KEY_ID }}
        aws-secret-access-key: \${{ secrets.AWS_SECRET_ACCESS_KEY }}
        aws-region: \${{ secrets.AWS_REGION }}
        
    - name: Setup Node.js
      uses: actions/setup-node@v4
      with:
        node-version: \${{ env.NODE_VERSION }}
        cache: 'npm'
        
    - name: Install and build
      run: |
        npm ci
        npm run build
        
    - name: Deploy to S3
      run: |
        aws s3 sync ./dist s3://\${{ secrets.S3_BUCKET_NAME }} --delete
        aws cloudfront create-invalidation --distribution-id \${{ secrets.CLOUDFRONT_DISTRIBUTION_ID }} --paths "/*"` : ''}` : ''}`;
      filename = ".github/workflows/ci-cd.yml";
      break;
    }
  }

  // Add setup instructions based on configuration
  if (features.environmentVars) {
    instructions.push('Configure environment variables in your repository secrets/settings');
  }
  if (deployment === 'vercel') {
    instructions.push('Add VERCEL_TOKEN, VERCEL_PROJECT_ID, and VERCEL_ORG_ID to repository secrets');
  }
  if (deployment === 'netlify') {
    instructions.push('Add NETLIFY_AUTH_TOKEN and NETLIFY_SITE_ID to repository secrets');
  }
  if (deployment === 'docker' || features.dockerization) {
    instructions.push('Add DOCKER_USERNAME and DOCKER_PASSWORD to repository secrets');
    instructions.push('Create a Dockerfile in your project root');
  }
  if (deployment === 'aws') {
    instructions.push('Configure AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_REGION, S3_BUCKET_NAME, and CLOUDFRONT_DISTRIBUTION_ID in repository secrets');
  }
  if (deployment === 'azure') {
    instructions.push('Add AZURE_WEBAPP_NAME and AZURE_WEBAPP_PUBLISH_PROFILE to repository secrets');
  }
  if (features.coverage) {
    instructions.push('Sign up for Codecov and add CODECOV_TOKEN to repository secrets');
  }
  if (hasNode) {
    instructions.push('Ensure your package.json has the required scripts: "lint", "test", "build", "format:check"');
  }
  if (hasPython) {
    instructions.push('Create a requirements.txt file with your Python dependencies');
    if (features.testing) {
      instructions.push('Configure pytest in your project (pytest.ini or pyproject.toml)');
    }
  }
  if (hasDotNet) {
    instructions.push('Ensure your .NET project has proper project files (.csproj or .sln)');
    if (features.testing) {
      instructions.push('Create unit test projects using xUnit, NUnit, or MSTest');
    }
  }
  if (needsDatabase) {
    instructions.push('Configure database connection strings in environment variables');
  }
  if (hasSqlServer) {
    instructions.push('Configure SQL Server connection string in your application settings');
  }

  return {
    yaml: yaml.replace(/[ \t]+$/gm, '').replace(/\n{3,}/g, '\n\n'),
    filename,
    instructions,
    explanation
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
  when: manual`;
};
