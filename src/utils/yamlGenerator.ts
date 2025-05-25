
export const generateYaml = (config: any): string => {
  const { frontend, backend, database, deployment, addons } = config;
  
  let yaml = `name: CI/CD Pipeline

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

jobs:
  build-and-test:
    runs-on: ubuntu-latest
    
    strategy:
      matrix:
        node-version: [16.x, 18.x, 20.x]
    
    steps:
    - name: Checkout code
      uses: actions/checkout@v4
    
    - name: Setup Node.js
      uses: actions/setup-node@v4
      with:
        node-version: \${{ matrix.node-version }}
        cache: 'npm'
`;

  // Add database services
  if (database && database !== 'none') {
    yaml += `
    services:`;
    
    if (database === 'postgresql') {
      yaml += `
      postgres:
        image: postgres:13
        env:
          POSTGRES_PASSWORD: postgres
          POSTGRES_DB: test_db
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5`;
    } else if (database === 'mongodb') {
      yaml += `
      mongodb:
        image: mongo:5.0
        ports:
          - 27017:27017`;
    } else if (database === 'mysql') {
      yaml += `
      mysql:
        image: mysql:8.0
        env:
          MYSQL_ROOT_PASSWORD: root
          MYSQL_DATABASE: test_db`;
    }
  }

  // Install dependencies
  yaml += `
    
    - name: Install dependencies
      run: npm ci`;

  // Add linting
  if (addons.linting) {
    if (backend === 'django' || backend === 'fastapi') {
      yaml += `
    
    - name: Lint with Black
      run: black --check .`;
    } else {
      yaml += `
    
    - name: Lint with ESLint
      run: npm run lint`;
    }
  }

  // Add formatting
  if (addons.formatting) {
    if (backend === 'django' || backend === 'fastapi') {
      yaml += `
    
    - name: Format with Black
      run: black --diff --check .`;
    } else {
      yaml += `
    
    - name: Format with Prettier
      run: npm run format:check`;
    }
  }

  // Add testing
  if (addons.testing) {
    if (backend === 'django') {
      yaml += `
    
    - name: Run tests
      run: python manage.py test`;
    } else if (backend === 'fastapi') {
      yaml += `
    
    - name: Run tests with Pytest
      run: pytest`;
    } else {
      yaml += `
    
    - name: Run tests
      run: npm test`;
    }
  }

  // Add security scanning
  if (addons.security) {
    yaml += `
    
    - name: Security scan with Semgrep
      uses: returntocorp/semgrep-action@v1
      with:
        config: auto`;
  }

  // Add coverage
  if (addons.coverage) {
    yaml += `
    
    - name: Generate coverage report
      run: npm run coverage
    
    - name: Upload coverage to Codecov
      uses: codecov/codecov-action@v3`;
  }

  // Add deployment
  if (deployment && deployment !== 'none') {
    yaml += `

  deploy:
    needs: build-and-test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    
    steps:
    - name: Checkout code
      uses: actions/checkout@v4`;

    if (deployment === 'vercel') {
      yaml += `
    
    - name: Deploy to Vercel
      uses: amondnet/vercel-action@v25
      with:
        vercel-token: \${{ secrets.VERCEL_TOKEN }}
        vercel-project-id: \${{ secrets.VERCEL_PROJECT_ID }}
        vercel-org-id: \${{ secrets.VERCEL_ORG_ID }}`;
    } else if (deployment === 'netlify') {
      yaml += `
    
    - name: Deploy to Netlify
      uses: nwtgck/actions-netlify@v2.0
      with:
        publish-dir: './dist'
        production-branch: main
      env:
        NETLIFY_AUTH_TOKEN: \${{ secrets.NETLIFY_AUTH_TOKEN }}
        NETLIFY_SITE_ID: \${{ secrets.NETLIFY_SITE_ID }}`;
    } else if (deployment === 'dockerhub') {
      yaml += `
    
    - name: Build and push Docker image
      uses: docker/build-push-action@v4
      with:
        context: .
        push: true
        tags: \${{ secrets.DOCKER_USERNAME }}/\${{ github.repository }}:latest`;
    } else if (deployment === 'aws') {
      yaml += `
    
    - name: Configure AWS credentials
      uses: aws-actions/configure-aws-credentials@v2
      with:
        aws-access-key-id: \${{ secrets.AWS_ACCESS_KEY_ID }}
        aws-secret-access-key: \${{ secrets.AWS_SECRET_ACCESS_KEY }}
        aws-region: us-east-1
    
    - name: Deploy to AWS
      run: |
        aws s3 sync ./dist s3://\${{ secrets.S3_BUCKET }}
        aws cloudfront create-invalidation --distribution-id \${{ secrets.CLOUDFRONT_DISTRIBUTION_ID }} --paths "/*"`;
    }
  }

  return yaml;
};
