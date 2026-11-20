# AutoFlowX

[![TypeScript](https://img.shields.io/badge/TypeScript-5.5-blue.svg?style=flat-square)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18-61dafb.svg?style=flat-square)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4-646cff.svg?style=flat-square)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.4-38bdf8.svg?style=flat-square)](https://tailwindcss.com/)
[![Architecture](https://img.shields.io/badge/Architecture-Root--Level%20MVC-brightgreen.svg?style=flat-square)](#architecture)

**AutoFlowX** is a modern, enterprise-grade CI/CD pipeline generator designed to streamline workflow authoring for modern software development stacks. By abstracting manual YAML configuration, AutoFlowX enables engineers to configure, preview, validate, and download battle-tested CI/CD workflows in seconds.

---

## Key Features

- **Intuitive Multi-Step Workflow Builder**: Step-by-step guidance for configuring Frontend, Backend, Database, and Deployment targets.
- **Intelligent Pipeline Compiler**: Generates context-aware, production-ready CI/CD configurations tailored to selected tech stacks.
- **Comprehensive Tech Stack Support**: React, Vue, Next.js, Node.js, Python, Go, Java, Rust, Ruby, PHP, C#/.NET, Docker, Kubernetes, AWS, GCP, Azure, and more.
- **Modular Quality & Security Toggles**: One-click toggles for linting, automated testing, security scanning, code coverage, and containerization.
- **Real-Time YAML Preview & Validation**: Syntax-highlighted code viewer with instant clipboard copying and direct `.yml` file download.
- **Enterprise-Grade UI**: Built with shadcn/ui and Tailwind CSS featuring dark mode, accessible components, and smooth micro-animations.

---

## Architecture

AutoFlowX follows a clean **Root-Level Model-View-Controller (MVC)** architectural pattern, keeping `src/` independent for the core application runtime, configuration, and design system:

```text
AutoFlowX/
├── models/               # [M] Domain models, data contracts & type definitions
│   ├── workflow.model.ts             # Pipeline configuration, step & result schemas
│   ├── example.model.ts              # Example pipeline interfaces & templates
│   └── index.ts
│
├── controllers/          # [C] Application state controllers & orchestrators
│   ├── useGeneratorController.ts     # Pipeline generator state, timer & generation
│   ├── useExamplesController.tsx     # Example pipelines filtering, search & actions
│   ├── useThemeController.ts         # Theme switching & toggling controller
│   └── index.ts
│
├── views/                # [V] Pure presentation UI layer
│   ├── layout/                       # Header, navigation & footer views
│   ├── landing/                      # Landing page sections & marketing views
│   ├── generator/                    # Multi-step generator & preview views
│   ├── pages/                        # Page-level views (Home, Generator, Examples, 404)
│   └── index.ts
│
├── src/                  # Independent core application runtime
│   ├── components/ui/                # Atomic UI design system primitives (Radix UI / shadcn)
│   ├── context/                      # React context providers (ThemeContext)
│   ├── hooks/                        # Shared utility hooks (use-toast, use-mobile, etc.)
│   ├── services/                     # Business logic & CI/CD pipeline compiler engines
│   ├── lib/                          # Utility functions (cn / clsx)
│   ├── App.tsx                       # Application root, routing & providers
│   ├── main.tsx                      # Vite React entrypoint
│   └── index.css                     # Global styles & Tailwind directives
│
└── public/               # Static assets, icons, manifests & robots.txt
```

---

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm, yarn, pnpm, or bun

### Installation

```bash
# Clone the repository
git clone https://github.com/harshitrwt/AutoFlowX.git

# Navigate to project directory
cd AutoFlowX

# Install dependencies
npm install

# Start local development server
npm run dev
```

### Available Scripts

- `npm run dev` - Launch local development server with Hot Module Replacement (HMR)
- `npm run build` - Build production bundle with Vite
- `npm run preview` - Preview production build locally
- `npm run typecheck` - Run TypeScript compiler checks across all layers
- `npm run lint` - Run ESLint verification

---

## License

This project is licensed under the MIT License - see the LICENSE file for details.
