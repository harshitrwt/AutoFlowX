# AutoFlowX

AutoFlowX is a modern CI/CD pipeline generator that helps developers create production-ready workflow configurations without manually writing YAML. It provides a clean multi-step interface where users select their tech stack, deployment preferences, and optional features, and the application generates optimized CI/CD workflows instantly.

The project is designed to reduce the complexity of setting up CI/CD pipelines for modern applications while supporting multiple frameworks, languages, and deployment strategies.

---

## Features

### Multi-Step Pipeline Configuration
- Guided form-based workflow generation
- Configure frontend, backend, database, and deployment stack
- Beginner-friendly setup process
- No YAML knowledge required

### Intelligent YAML Generation
- Automatically detects required runtime environments
- Generates context-aware workflow steps
- Supports multiple tech stacks dynamically
- Clean and maintainable workflow output

### Modular Feature Toggles
Enable or disable:
- Linting
- Unit testing
- Security scanning
- Code coverage
- Build pipelines
- Deployment workflows

### Real-Time YAML Preview
- Instant workflow preview
- Syntax-highlighted YAML rendering
- Copy-to-clipboard support
- Download generated `.yml` files directly

### Multiple CI Provider Support
Architecture designed for:
- GitHub Actions
- GitLab CI
- Jenkins
- CircleCI

Currently optimized primarily for GitHub Actions workflows.

---

# Tech Stack

## Frontend
- React 18
- TypeScript
- Vite
- Tailwind CSS
- React Router
- React Query

## UI Components
- shadcn/ui
- Radix UI

## Deployment
- Vercel

---

# Project Structure

```bash
src/
│
├── components/
│   ├── MultiStepForm/
│   ├── GeneratorSection/
│   ├── EnhancedYamlPreview/
│   └── ui/
│
├── pages/
│   ├── Home.tsx
│   ├── Generator.tsx
│   └── Examples.tsx
│
├── utils/
│   ├── generateAdvancedYaml.ts
│   └── helpers.ts
│
├── hooks/
├── context/
├── types/
└── styles/
