# Formisch AI Agent Prompt Index

This index helps AI agents quickly identify which guide to use for specific tasks. Each guide provides detailed, step-by-step instructions to ensure consistency and quality across the Formisch project.

## 📋 Quick Selection Guide

**Working with the codebase?**
→ Use [`repository-structure.md`](#repository-structuremd)

**Adding documentation to source code?**
→ Use [`document-source-code.md`](#document-source-codemd)

**Adding new API documentation to the website?**
→ Use [`add-new-api-to-website.md`](#add-new-api-to-websitemd)

**Updating existing API documentation?**
→ Use [`update-api-on-website.md`](#update-api-on-websitemd)

**Adding a new guide to the website?**
→ Use [`add-new-guide-to-website.md`](#add-new-guide-to-websitemd)

---

## Available Guides

### `repository-structure.md`

**Use this guide when:**

- You need to understand the Formisch repository structure
- You're looking for where specific code lives
- You're implementing new features
- You're making changes to the core library or framework packages
- You need to understand the monorepo architecture
- You're working with the build system

**What it covers:**

- Complete repository layout and directory structure
- Core packages (`@formisch/core`, `@formisch/methods`)
- Framework implementations (Preact, Qwik, SolidJS, Svelte, Vue)
- Playgrounds for testing
- Common development workflows
- Build system and architecture insights
- Best practices for navigating the codebase
- Quick reference for finding specific functionality

**Key sections:**

- Package structure and relationships
- Framework-agnostic core architecture
- How reactivity is injected at build time
- Where to find form logic, field management, and methods
- Testing and development workflows

---

### `document-source-code.md`

**Use this guide when:**

- You're writing JSDoc comments for TypeScript code
- You're documenting functions, interfaces, or types
- You need to ensure consistent documentation style
- You're adding new APIs to the source code

**What it covers:**

- JSDoc patterns for interfaces, types, and functions
- Documentation style for function overloads
- How to document generic parameters
- Property documentation patterns
- Consistent wording and formatting rules
- Examples of properly documented code

**Key sections:**

- Core documentation principles
- Interface and type documentation patterns
- Function overload documentation
- Parameter descriptions
- Return type documentation
- Generic type documentation

**Important:** This guide ensures IntelliSense and IDE tooltips are helpful and consistent.

---

### `add-new-api-to-website.md`

**Use this guide when:**

- You're adding documentation for a new API function or type
- You're creating new API reference pages on the website
- You need to document schemas, actions, methods, or types
- You're adding a new exported function to the library

**What it covers:**

- Complete process for adding API documentation pages
- Understanding the website's API route structure
- Creating `properties.ts` files from source code
- Writing `index.mdx` documentation files
- Using the Property component correctly
- Adding navigation entries
- Writing code examples
- Maintaining consistency with existing API docs

**Key sections:**

- API route organization and categories
- Folder naming conventions
- Property component usage
- Reading source code to extract information
- Creating comprehensive examples
- Cross-referencing related APIs

**Note:** This is for the Valibot website structure but follows similar patterns used in Formisch.

---

### `update-api-on-website.md`

**Use this guide when:**

- Source code has changed and API docs need updating
- Function signatures have been modified
- Parameters have been added, removed, or changed
- Types or interfaces have changed
- JSDoc comments in source code have been updated

**What it covers:**

- Process for keeping API docs synchronized with source code
- Identifying what changed in the source
- Updating `properties.ts` files
- Updating examples to reflect new behavior
- Verification steps to ensure accuracy
- Common update scenarios

**Key sections:**

- When to update documentation
- Understanding different types of changes
- Step-by-step update process
- Verifying documentation accuracy
- Handling breaking changes
- Updating related documentation

**Important:** Source code is the single source of truth. Documentation must always match implementation.

---

### `add-new-guide-to-website.md`

**Use this guide when:**

- You're writing a new tutorial or guide
- You're adding conceptual documentation
- You're creating getting-started content
- You're documenting advanced patterns or techniques
- You need to add a new page to the guides section

**What it covers:**

- Guide organization and categories
- Creating new guide pages with MDX
- Directory structure for guides
- Writing style and formatting guidelines
- Adding guides to navigation menus
- Using code examples effectively
- Cross-linking to API documentation

**Key sections:**

- Choosing the right category for a guide
- Creating guide directory structure
- MDX formatting and components
- Menu integration
- Writing clear, actionable content
- Code example best practices
- Framework-specific guides

**Categories available:**

- Get started (introductory content)
- Main concepts (core library concepts)
- Advanced guides (advanced techniques)

---

## 🎯 Decision Tree

```
Are you working with...

├─ Repository navigation and structure?
│  └─ → repository-structure.md
│
├─ Source code documentation (JSDoc)?
│  └─ → document-source-code.md
│
├─ Website documentation?
│  │
│  ├─ API reference pages?
│  │  │
│  │  ├─ Adding new API?
│  │  │  └─ → add-new-api-to-website.md
│  │  │
│  │  └─ Updating existing API?
│  │     └─ → update-api-on-website.md
│  │
│  └─ Guides and tutorials?
│     └─ → add-new-guide-to-website.md
```

---

## 📝 Guide Selection Examples

### Example 1: Adding a new form method

1. **First**, use `repository-structure.md` to understand where to implement the method (`/packages/methods/src/`)
2. **Then**, use `document-source-code.md` to write proper JSDoc comments
3. **Finally**, use `add-new-api-to-website.md` to create documentation on the website

### Example 2: Updating an existing API

1. **First**, use `repository-structure.md` if you need to find where the code lives
2. **Then**, make your changes and update JSDoc using `document-source-code.md`
3. **Finally**, use `update-api-on-website.md` to sync the website documentation

### Example 3: Adding a tutorial

1. **First**, use `repository-structure.md` to understand the project and its features
2. **Then**, use `add-new-guide-to-website.md` to create the tutorial page

### Example 4: Creating a new framework integration

1. **Start with** `repository-structure.md` to understand the architecture
2. **Reference** existing framework implementations in `/frameworks/`
3. **Use** `document-source-code.md` for adding JSDoc comments
4. **Use** `add-new-api-to-website.md` for framework-specific API docs
5. **Use** `add-new-guide-to-website.md` for a getting-started guide

---

## 💡 Best Practices for AI Agents

1. **Always start with the repository structure guide** if you're unfamiliar with where code lives
2. **Read the relevant guide completely** before starting work
3. **Follow patterns exactly** - consistency is crucial
4. **Check existing examples** in the codebase before creating new ones
5. **Verify your changes** by building and testing locally
6. **Update multiple guides** if your change affects multiple areas (e.g., new API needs both source docs and website docs)

---

## 🔄 Maintenance Notes

**For maintainers updating this index:**

When adding a new guide to the `/prompts/` directory:

1. Add an entry in the "Available Guides" section
2. Update the "Decision Tree" if applicable
3. Add relevant examples to "Guide Selection Examples"
4. Keep descriptions concise but informative
5. Maintain the existing format and structure

---

## 📚 Related Resources

- **Main Repository**: [github.com/fabian-hiller/formisch](https://github.com/fabian-hiller/formisch)
- **Documentation Site**: [formisch.dev](https://formisch.dev)
- **Contributing Guide**: `/CONTRIBUTING.md` in the repository root

---

_This index is designed for AI agents to quickly orient themselves and find the right guide for their task. Each guide provides comprehensive, step-by-step instructions to ensure high-quality contributions to the Formisch project._
