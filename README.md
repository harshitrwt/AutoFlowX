# AutoFlowX

[![TypeScript](https://img.shields.io/badge/TypeScript-5.5-blue.svg?style=flat-square)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18-61dafb.svg?style=flat-square)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4-646cff.svg?style=flat-square)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.4-38bdf8.svg?style=flat-square)](https://tailwindcss.com/)
[![Architecture](https://img.shields.io/badge/Architecture-MVC-brightgreen.svg?style=flat-square)](#architecture)

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

AutoFlowX is built using a clean **Model-View-Controller (MVC)** architectural pattern in TypeScript, separating domain data, user presentation, and application state:

```
src/
├── controllers/          # [C] Business state orchestrators & interaction handlers
│   ├── useThemeController.tsx        # Theme state & provider
│   ├── useScrollController.tsx       # Scroll animation observer
│   ├── useCountUpController.tsx      # Metric counter animation
│   ├── useMobileController.tsx       # Viewport responsiveness
│   └── useToastController.ts         # User notification dispatch
│
├── models/               # [M] Domain models, data contracts & type definitions
│   └── workflow.model.ts             # Pipeline configuration & step schemas
│
├── services/             # Core business logic & pipeline compiler engines
│   ├── yamlGenerator.service.ts          # Base YAML template engine
│   └── advancedYamlGenerator.service.ts  # Multi-stack pipeline compiler
│
├── views/                # [V] Presentation & UI layer
│   ├── layout/                       # Header, navigation & footer views
│   ├── landing/                      # Landing page sections & marketing views
│   ├── generator/                    # Multi-step generator & preview views
│   └── pages/                        # Page views (Home, Generator, Examples, 404)
│
├── components/ui/        # Atomic UI design system primitives (Radix UI / shadcn)
├── hooks/                # Utility hooks & controllers re-exports
├── lib/                  # Shared utilities (classnames merge helper)
├── App.tsx               # Root application router
└── main.tsx              # Application entry point
```

---

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm, pnpm, or bun

### Installation

```bash
# Clone repository
git clone https://github.com/harshitrwt/AutoFlowX.git

# Navigate to project directory
cd AutoFlowX

# Install dependencies
npm install
```

### Development Server

```bash
# Start Vite development server
npm run dev
```

Visit `http://localhost:8080` in your browser.

### Building for Production

```bash
# Type check TypeScript files
npm run typecheck

# Build optimized production bundle
npm run build

# Preview production build locally
npm run preview
```

---

## Tech Stack

| Layer | Technology |
|---|---|
| **Language** | TypeScript |
| **Framework** | React 18, Vite |
| **Styling** | Tailwind CSS, Tailwind Animate |
| **UI Components** | Radix UI, shadcn/ui, Lucide Icons |
| **State & Data** | React Router DOM, TanStack Query |
| **Code Formatting** | ESLint, PostCSS, Autoprefixer |

---

## License

This project is licensed under the MIT License.
