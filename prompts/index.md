# Formisch AI Agent Prompt Index

Quick reference for selecting the right documentation guide.

## 📋 Quick Selection

| Task                          | Guide                                                        |
| ----------------------------- | ------------------------------------------------------------ |
| Navigate repository structure | [`repository-structure.md`](#repository-structuremd)         |
| Write JSDoc comments          | [`document-source-code.md`](#document-source-codemd)         |
| Add new API docs to website   | [`add-new-api-to-website.md`](#add-new-api-to-websitemd)     |
| Update API docs on website    | [`update-api-on-website.md`](#update-api-on-websitemd)       |
| Add tutorial/guide to website | [`add-new-guide-to-website.md`](#add-new-guide-to-websitemd) |

---

## Guide Details

### `repository-structure.md`

**When to use:** Finding code, understanding architecture, implementing features

**Covers:**

- Monorepo structure and package relationships
- Core packages (`@formisch/core`, `@formisch/methods`)
- Framework implementations (Preact, Qwik, Solid, Svelte, Vue)
- Build system and reactivity injection
- Development workflows

---

### `document-source-code.md`

**When to use:** Writing/updating JSDoc comments in source code

**Covers:**

- JSDoc patterns for interfaces, types, and functions
- Property and parameter descriptions
- Inline comment style
- Cross-framework consistency rules

**Key rule:** Same APIs must use identical documentation across all frameworks.

---

### `add-new-api-to-website.md`

**When to use:** Creating documentation for new exported APIs

**Covers:**

- API route structure and organization
- Creating `properties.ts` from source code
- Writing `index.mdx` files
- Code examples and navigation

**Key rule:** Source code is the single source of truth.

---

### `update-api-on-website.md`

**When to use:** Syncing website docs after source code changes

**Covers:**

- Updating `properties.ts` for changed signatures
- Updating examples for new behavior
- Verification steps

**Key rule:** Documentation must always match implementation.

---

### `add-new-guide-to-website.md`

**When to use:** Creating tutorials or conceptual documentation

**Covers:**

- Guide categories and organization
- MDX formatting and components
- Navigation menu integration
- Code example best practices

---

## Common Workflows

### Adding a new form method

1. Use `repository-structure.md` to locate `/packages/methods/src/`
2. Use `document-source-code.md` for JSDoc comments
3. Use `add-new-api-to-website.md` for website docs

### Updating an existing API

1. Find code location (use `repository-structure.md` if needed)
2. Update code and JSDoc (use `document-source-code.md`)
3. Sync website docs (use `update-api-on-website.md`)

### Adding a tutorial

1. Understand project with `repository-structure.md`
2. Create guide with `add-new-guide-to-website.md`

---

## Best Practices

- Start with `repository-structure.md` if unfamiliar with codebase
- Read the relevant guide completely before starting
- Follow patterns exactly for consistency
