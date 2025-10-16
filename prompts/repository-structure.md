# Formisch Repository Navigation Guide for AI Agents

This guide helps AI agents understand and navigate the Formisch repository structure effectively.

## 🎯 Repository Overview

**Formisch** is a schema-based, headless form library with a framework-agnostic core that supports multiple JavaScript frameworks (Preact, Qwik, SolidJS, Svelte, Vue). The unique architecture uses reactivity blocks that are inserted at build time, making the library fully native to each framework.

**Key characteristics:**

- Monorepo structure using pnpm workspaces
- Framework-agnostic core with framework-specific implementations
- Small bundle size (starting at 2.5 kB)
- Schema-based validation with Valibot
- TypeScript throughout

## 📁 High-Level Directory Structure

```
formisch/
├── packages/         # Core library packages
│   ├── core/         # Framework-agnostic core
│   └── methods/      # Form manipulation methods
├── frameworks/       # Framework-specific implementations
│   ├── preact/
│   ├── qwik/
│   ├── solid/
│   ├── svelte/
│   └── vue/
├── playgrounds/      # Development testing environments
│   ├── preact/
│   ├── qwik/
│   ├── solid/
│   ├── svelte/
│   └── vue/
├── website/          # Documentation website
├── prompts/          # AI agent instructions
└── brand/            # Brand assets
```

## 📦 Core Packages

### `/packages/core/` - The Framework-Agnostic Core

**Purpose:** Contains the fundamental form logic that works across all frameworks.

**Key files/directories:**

- `src/array/` - Array field utilities
- `src/field/` - Field management logic
- `src/form/` - Form state management
- `src/framework/` - Framework-specific reactivity integration points
- `src/types/` - TypeScript type definitions
- `src/values.ts` - Constant values
- `src/index.ts` - Main export file

**Build output:**

- Generates framework-specific builds via exports:
  - `dist/index.preact.js`
  - `dist/index.qwik.js`
  - `dist/index.solid.js`
  - `dist/index.svelte.js`
  - `dist/index.vue.js`

**Published as:** `@formisch/core`

**Special note:** Framework-specific code is injected at build time using `tsdown.config.ts` to create truly native implementations for each framework.

### `/packages/methods/` - Form Methods

**Purpose:** Provides utility methods for form manipulation (focus, insert, move, remove, reset, submit, validate, etc.)

**Key directories:**

- Each method has its own directory (e.g., `src/focus/`, `src/insert/`, `src/validate/`)
- Framework-specific implementations similar to core

**Methods available:**

- `focus` - Focus on a specific field
- `getAllErrors` - Get all form errors
- `getErrors` - Get errors for specific field
- `getInput` - Get input value
- `handleSubmit` - Handle form submission
- `insert` - Insert array item
- `move` - Move array item
- `remove` - Remove array item
- `replace` - Replace array item
- `reset` - Reset form state
- `setErrors` - Set field errors
- `setInput` - Set field input
- `submit` - Submit form
- `swap` - Swap array items
- `validate` - Validate form

**Published as:** `@formisch/methods`

## 🎨 Framework Implementations

### `/frameworks/{framework}/` - Framework-Specific Packages

Each framework directory contains a thin wrapper that:

1. Exports the framework-specific core build
2. Provides framework-native components and primitives
3. Re-exports methods from `@formisch/methods`

**Structure (using SolidJS as example):**

```
frameworks/solid/
├── src/
│   ├── components/    # Framework-specific components (e.g., Form, Field)
│   ├── primitives/    # Framework-specific primitives (e.g., createForm, useField)
│   ├── types/         # Framework-specific types
│   ├── utils/         # Framework-specific utilities
│   └── index.tsx      # Main export
├── package.json
└── README.md
```

**Published as:**

- `@formisch/preact`
- `@formisch/qwik`
- `@formisch/solid`
- `@formisch/svelte`
- `@formisch/vue`

**Key components/primitives per framework:**

- **Form component** - Wrapper around native `<form>` element
- **Field component/primitive** - Connect inputs to form state
- **createForm/useForm** - Initialize form with schema

## 🎮 Playgrounds

### `/playgrounds/{framework}/` - Development Testing Environments

**Purpose:** Test and develop framework implementations in real applications.

**Usage:**

- Each playground is a minimal app setup for its framework
- Uses workspace dependencies (`@formisch/solid: "workspace:*"`)
- Run with `pnpm dev` from the playground directory
- Test features before publishing

**Typical structure:**

```
playgrounds/solid/
├── src/           # Test application code
├── public/        # Static assets
├── package.json   # Dependencies (uses workspace:*)
└── app.config.ts  # Framework-specific config
```

## 📚 Website

### `/website/` - Documentation Site

**Purpose:** Documentation and marketing website (formisch.dev)

**Technology:** Built with Qwik

**Key directories:**

- `src/routes/` - Page routes
- `src/components/` - UI components
- `src/utils/` - Utility functions
- `public/` - Static assets
- `scripts/` - Build scripts

**Note:** When updating APIs or adding features, the website documentation should be updated accordingly.

## 🔧 Configuration Files

**Root level:**

- `pnpm-workspace.yaml` - Defines workspace packages
- `package.json` - Root package configuration
- `prettier.config.js` - Code formatting rules
- `tsconfig.json` - TypeScript configuration (inherited by packages)

**Package level:**

- `tsconfig.json` - Package-specific TypeScript config
- `tsdown.config.ts` - Build configuration for framework-specific builds
- `vitest.config.ts` - Test configuration
- `eslint.config.js` - Linting rules

## 🎯 Common Development Workflows

### Adding a New Feature to Core

1. Implement in `/packages/core/src/`
2. Add framework-specific code in `/packages/core/src/framework/`
3. Update exports in `/packages/core/src/index.ts`
4. Test in relevant playground(s)
5. Update TypeScript types
6. Add tests (`.test.ts` files)
7. Update documentation in `/website/`

### Adding a New Method

1. Create directory in `/packages/methods/src/{method-name}/`
2. Implement logic with framework-specific variations
3. Export from `/packages/methods/src/index.ts`
4. Test in playgrounds
5. Document on website

### Adding Framework Support

1. Create `/packages/core/src/framework/{framework}.ts`
2. Configure build in `tsdown.config.ts`
3. Create `/frameworks/{framework}/` package
4. Implement components/primitives
5. Create playground in `/playgrounds/{framework}/`
6. Add documentation

### Testing Changes

1. Build packages: `pnpm build` from package directory
2. Test in playground: `pnpm dev` from playground directory
3. Run tests: `pnpm test` from package directory
4. Check types: `pnpm lint` (runs `tsc --noEmit`)

## 🚫 Directories to Ignore

**`/backups/`** - Contains old code, experiments, and historical backups. DO NOT use for active development or as reference for current implementation.

## 📝 Important Conventions

### Code Style

- TypeScript throughout
- Use Prettier for formatting
- Follow ESLint rules
- Write clear, self-documenting code
- Add JSDoc comments for public APIs

### Naming

- Use camelCase for functions and variables
- Use PascalCase for components and types
- Prefix framework-specific files with framework name

### Imports

- Use relative imports within packages
- Use package imports across packages
- Prefer named exports over default exports

### Testing

- Place tests next to implementation files (`.test.ts`)
- Use Vitest as test runner
- Include type checking in tests

## 🔍 Finding Things

### Looking for form state logic?

→ `/packages/core/src/form/`

### Looking for field management?

→ `/packages/core/src/field/`

### Looking for array utilities?

→ `/packages/core/src/array/`

### Looking for form methods (submit, reset, validate)?

→ `/packages/methods/src/{method-name}/`

### Looking for SolidJS components?

→ `/frameworks/solid/src/components/`

### Looking for framework primitives (createForm, useField)?

→ `/frameworks/{framework}/src/primitives/`

### Looking for type definitions?

→ `/packages/core/src/types/` or `/frameworks/{framework}/src/types/`

### Looking for examples?

→ `/playgrounds/{framework}/src/`

### Looking for documentation?

→ `/website/src/routes/`

## 🏗️ Build System

### Understanding the Build Process

1. **Core package** builds multiple framework-specific outputs
2. Framework-specific code in `/packages/core/src/framework/{framework}.ts` is injected at build time
3. Each framework package re-exports its corresponding core build
4. Methods package builds separately for each framework
5. Framework packages bundle everything together

### Key build tools:

- **tsdown** - Build tool for TypeScript packages
- **Vite** - Build tool for website and some playgrounds
- **pnpm** - Package manager with workspace support

## 📋 Quick Reference Commands

```bash
# Install dependencies
pnpm install

# Build a package
cd packages/core && pnpm build

# Build a framework package
cd frameworks/solid && pnpm build

# Run playground
cd playgrounds/solid && pnpm dev

# Run tests
cd packages/core && pnpm test

# Lint code
pnpm lint

# Format code
pnpm format

# Type check
pnpm lint  # Usually includes tsc --noEmit
```

## 🤝 Contributing Context

When contributing or making changes:

1. Check `/CONTRIBUTING.md` for guidelines
2. Follow existing patterns in the codebase
3. Keep pull requests focused and small
4. Include tests for new features
5. Update documentation
6. Test in relevant playgrounds

## 💡 Architecture Insights

### Why Framework-Agnostic Core?

The core is written once and compiled to framework-specific versions. This:

- Reduces code duplication
- Ensures consistent behavior across frameworks
- Maintains native performance for each framework
- Minimizes bundle size

### Reactivity Integration

Framework-specific reactivity is injected via the `/packages/core/src/framework/` directory. Each framework file defines how to:

- Create reactive signals/stores
- Subscribe to changes
- Batch updates
- Handle side effects

This makes Formisch truly native to each framework rather than using a lowest-common-denominator approach.

## 🎓 For AI Agents: Best Practices

1. **Always check the framework** - Code differs between frameworks
2. **Look at playgrounds** - They show real-world usage
3. **Check types first** - TypeScript types are the source of truth
4. **Read existing implementations** - Follow established patterns
5. **Test incrementally** - Build and test after each change
6. **Update documentation** - Keep website in sync with code changes
7. **Avoid backups directory** - Contains outdated code
8. **Use workspace dependencies** - In playgrounds, use `workspace:*`
9. **Follow monorepo structure** - Changes may affect multiple packages
10. **Respect the build system** - Framework-specific builds happen automatically

---

This guide should help you navigate the Formisch codebase effectively. When in doubt, look at existing implementations and follow their patterns.
