# 🔄 خط لوله CI/CD

## نمای کلی

CI/CD به صورت خودکار tests اجرا می‌کند و deploy می‌کند.

## GitHub Actions

### .github/workflows/test.yml

```yaml
name: Test & Build

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]

jobs:
  test:
    runs-on: ubuntu-latest

    services:
      postgres:
        image: postgres:14
        env:
          POSTGRES_PASSWORD: postgres
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
        ports:
          - 5432:5432

    steps:
      - uses: actions/checkout@v3

      - name: Setup Node
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Lint
        run: npm run lint

      - name: Type Check
        run: npm run type-check

      - name: Build
        run: npm run build

      - name: Test
        run: npm run test
        env:
          DATABASE_URL: postgresql://postgres:postgres@localhost:5432/test_db

      - name: Upload coverage
        uses: codecov/codecov-action@v3
```

### .github/workflows/deploy.yml

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    if: github.event_name == 'push'

    steps:
      - uses: actions/checkout@v3

      - name: Deploy to Replit
        env:
          REPLIT_TOKEN: ${{ secrets.REPLIT_TOKEN }}
        run: |
          curl -X POST https://replit.com/api/deploy \
            -H "Authorization: Bearer $REPLIT_TOKEN" \
            -H "Content-Type: application/json"

      - name: Notify Slack
        if: failure()
        run: |
          curl -X POST ${{ secrets.SLACK_WEBHOOK }} \
            -H 'Content-type: application/json' \
            -d '{"text":"Deploy failed!"}'
```

## GitLab CI

### .gitlab-ci.yml

```yaml
stages:
  - test
  - build
  - deploy

variables:
  NODE_VERSION: "18"

test:
  stage: test
  image: node:18
  services:
    - postgres:14
  script:
    - npm ci
    - npm run lint
    - npm run type-check
    - npm run test

build:
  stage: build
  image: node:18
  script:
    - npm ci
    - npm run build
  artifacts:
    paths:
      - dist/
      - node_modules/

deploy:
  stage: deploy
  image: alpine:latest
  script:
    - apk add curl
    - curl -X POST $DEPLOY_WEBHOOK
  only:
    - main
```

## Jenkins

### Jenkinsfile

```groovy
pipeline {
  agent any

  stages {
    stage('Install') {
      steps {
        sh 'npm install'
      }
    }

    stage('Test') {
      steps {
        sh 'npm run test'
        sh 'npm run lint'
      }
    }

    stage('Build') {
      steps {
        sh 'npm run build'
      }
    }

    stage('Deploy') {
      when {
        branch 'main'
      }
      steps {
        sh './deploy.sh'
      }
    }
  }

  post {
    always {
      junit 'test-results.xml'
      publishHTML([
        reportDir: 'coverage',
        reportFiles: 'index.html'
      ])
    }
  }
}
```

## بهترین عملکردها

1. **Automated Tests**
   - Unit tests
   - Integration tests
   - E2E tests

2. **Code Quality**
   - Linting
   - Type checking
   - Coverage reporting

3. **Security**
   - SAST scanning
   - Dependency checks
   - Secret scanning

4. **Deployment**
   - Staging environment
   - Blue-green deployment
   - Health checks

---

**محدثه:** 1 دسامبر 2025
