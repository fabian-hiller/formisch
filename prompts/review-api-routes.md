# Guide: Reviewing API Routes for Accuracy

This guide provides essential rules and checks for reviewing API documentation routes to ensure they accurately reflect the source code.

## Table of Contents

1. [Overview](#overview)
2. [File Structure](#file-structure)
3. [Source Code is Truth](#source-code-is-truth)
4. [Reviewing index.mdx](#reviewing-indexmdx)
5. [Reviewing properties.ts](#reviewing-propertiests)
6. [Common Issues](#common-issues)
7. [Framework-Specific Rules](#framework-specific-rules)

## Overview

API documentation must always match the source code exactly. Every type, parameter, generic, and function signature must be verified against the actual implementation.

**Key Principle**: Never assume. Always read the source code file referenced in the frontmatter.

## File Structure

Each API route consists of two files:

```
/website/src/routes/(docs)/{framework}/api/(category)/{ApiName}/
├── index.mdx        # Documentation content
└── properties.ts    # Type definitions for Property component
```

## Source Code is Truth

**Before reviewing any API route:**

1. Read the `source` path from the frontmatter
2. Open and read the actual source file
3. Make sure the `source` path points to the correct file (if not, fix it)
4. Verify every detail against the source code
5. Never trust existing documentation without verification

> **Note:** For help navigating the repository structure and finding source files, see the [Repository Structure Guide](./repository-structure.md).

### Adding Missing APIs and Removing Non-Existent Ones

**Critical Actions:**

1. **If an API exists in source code but has no documentation:**
   - Create documentation by following the [Add New API Guide](./add-new-api-to-website.md)
   - Ensure all exported functions, types, and components are documented

2. **If documentation exists but the API doesn't exist in source code:**
   - Delete the entire documentation folder (index.mdx and properties.ts)
   - Remove the entry from menu.md
   - This happens when APIs are renamed, moved, or removed from source

3. **Framework-specific APIs:**
   - Preact-specific APIs should NOT exist in Qwik/Solid/Vue/Svelte docs
   - Qwik-specific APIs (e.g., `useForm$` with QRL) should NOT exist in other framework docs
   - Each framework must document only its own implementation

## Reviewing index.mdx

### Frontmatter

```yaml
---
title: ApiName # Must match actual function/type name
description: ... # Brief description from JSDoc
source: /path/to/source.ts # Path to actual source file
contributors:
  - fabian-hiller # GitHub username of the author and contributors
---
```

**Verify:**

- Title matches the exported name exactly (including `$` suffix for Qwik)
- Source path points to correct file
- Description matches JSDoc comment
- No typos in title, description, or any text content

### Function Signature

Must match source code exactly:

```ts
const result = functionName<TGeneric1, TGeneric2>(param1, param2): ReturnType;
```

**Check:**

- All generic parameters present and in correct order
- All parameters present with correct names
- Return type matches source
- Special syntax (QRL, `$` suffixes) for Qwik

### Overloaded Function Signatures

If a function has multiple overload signatures (like `getInput`, `getErrors`, `setInput`, etc.), **every overload signature** (but NOT the implementation function) should be listed in the API code example directly after the description.

**Example from `getInput`:**

````mdx
# getInput

Retrieves the current input value of a specific field or the entire form. Returns a partial object as not all fields may have been set.

```ts
const input = getInput<TSchema>(form);
const input = getInput<TSchema, TFieldPath>(form, config);
```
````

**Rules:**

- List each overload on a separate line
- Include all generics for each overload
- Include all parameters for each overload
- Do NOT include the implementation signature (the one with function body)
- Order should match the source code order

### Generics Section

List every generic parameter:

```mdx
## Generics

- `TSchema` <Property {...properties.TSchema} />
- `TFieldPath` <Property {...properties.TFieldPath} />
```

**Verify:**

- All generics from source are documented
- Property definitions exist in properties.ts
- `extends` constraints match source

### Parameters Section

List every parameter:

```mdx
## Parameters

- `form` <Property {...properties.form} />
- `config` <Property {...properties.config} />
```

**Verify:**

- All parameters from source are documented
- Parameter names match exactly
- Optional parameters marked correctly
- Property definitions exist in properties.ts

### Returns Section

Document the return value:

```mdx
## Returns

- `result` <Property {...properties.ResultType} />
```

### Descriptions and Explanations

**Verify framework-specific terminology:**

When copying documentation between frameworks, update descriptions to use correct terminology:

- Svelte: "snippet" (not "render function" or "render prop")
- SolidJS/React: "render function" or "render prop"
- Check that descriptions accurately reflect the framework's API patterns

**Fix typos and grammar:**

- Check all text content for spelling errors
- Verify proper capitalization and punctuation
- Ensure technical terms are spelled correctly (e.g., "schema" not "shema")

### Complex Type Documentation

For extremely long and complex TypeScript types like `ValidArrayPath` (that uses even more complex types like `LazyArrayPath` internally), full documentation is not required. Instead, include a message directing readers to the source code, similar to the `DeepPartial` documentation:

```mdx
> This type is too complex to display. Please refer to the [source code](https://github.com/fabian-hiller/formisch/blob/main/packages/core/src/types/utils.ts).
```

### Related Section

**Critical Rules:**

1. **Section Headings Must Be Framework-Appropriate:**
   - Solid: "Primitives" (createForm, useField, etc.)
   - Preact/Qwik: "Hooks" (useForm, useField, etc.)
   - Vue: "Composables" (useForm, useField, etc.)
   - Svelte: "Runes" (createForm, useField, etc.)

2. **Only Include Existing APIs:**
   - Verify every listed API actually exists
   - Check that Related APIs are actually related (can be used together)

3. **Types Section Should NOT Be Included:**
   - Related section is for: Hooks/Primitives/Runes/Composables, Components, Methods
   - Never list other Types in the Related section

4. **Link Format:**
   ```mdx
   <ApiList
     items={[
       { text: 'useForm$', href: '../useForm$/' }, // Correct
       { text: 'FormStore', href: '../FormStore/' }, // Also correct
     ]}
   />
   ```

## Reviewing properties.ts

### Structure

```typescript
import type { PropertyProps } from '~/components';

export const properties: Record<string, PropertyProps> = {
  PropertyName: {
    modifier?: 'extends' | 'readonly' | 'typeof',
    type: DefinitionData,
    default?: DefinitionData,
  },
};
```

If it is unclear on how to implement the properties, read the `PropertyProps` definition in `website/src/components/Property.tsx`.

### Verifying Type Definitions

**Every property used in index.mdx must be defined here.**

> **CRITICAL: Always compare properties.ts against source code types!** Framework implementations differ significantly. Don't assume copied documentation is accurate.

**Common framework-specific differences:**

- **Event handlers:** Svelte uses lowercase (`onfocus`, `oninput`), SolidJS uses camelCase (`onFocus`, `onInput`)
- **Ref handling:** Svelte uses symbol-based refs `[ref: symbol]` with cleanup, SolidJS uses simple `ref` callback
- **Render props:** Svelte uses `Snippet` type, SolidJS uses functions returning `JSX.Element`
- **Terminology:** Svelte uses "snippets", React/SolidJS use "render functions/props"

#### Generic Constraints

```typescript
TSchema: {
  modifier: 'extends',
  type: {
    type: 'custom',
    name: 'Schema',
    href: '/core/api/Schema/',  // Core types use absolute paths
  },
},
```

**Check:**

- `modifier: 'extends'` matches source code constraint
- Type name is exact
- href links to correct documentation

#### Function Types

```typescript
render$: {
  type: {
    type: 'custom',
    name: 'QRL',
    generics: [
      {
        type: 'function',
        params: [
          {
            name: 'store',
            optional?: boolean,
            type: DefinitionData,
          },
        ],
        return: DefinitionData,
      },
    ],
  },
},
```

**Check:**

- Parameter names match source
- Parameter types match source
- Return type matches source
- Optional parameters marked correctly

#### Object Types

```typescript
FormConfig: {
  type: {
    type: 'object',
    entries: [
      {
        key: 'schema',
        optional?: boolean,
        value: DefinitionData,
      },
    ],
  },
},
```

**Check:**

- All properties from source interface
- Optional properties marked with `optional: true`
- Property types match source

#### Array Types

```typescript
items: {
  type: {
    type: 'custom',
    name: 'ReadonlySignal',
    generics: [
      {
        type: 'array',
        item: 'string',
      },
    ],
  },
},
```

#### Union Types

```typescript
validate: {
  type: {
    type: 'union',
    options: [
      {
        type: 'custom',
        name: 'ValidationMode',
        href: '/core/api/ValidationMode/',
      },
      'undefined',
    ],
  },
},
```

### Link Rules

**Critical href rules:**

1. **Only Link to Formisch and Valibot Types:**

   ```typescript
   // CORRECT - Formisch types:
   href: '/core/api/Schema/';
   href: '../FormStore/';

   // CORRECT - Valibot types:
   href: 'https://valibot.dev/api/InferInput/';

   // WRONG - Don't link to other external types:
   name: 'ReadonlySignal'; // No href - from @preact/signals
   name: 'QRL'; // No href - from @qwik.dev/core
   name: 'JSXOutput'; // No href - from @qwik.dev/core
   name: 'ComponentChildren'; // No href - from preact
   ```

   **Rule:** ONLY add `href` for Formisch types (core, framework-specific) and Valibot types. Do NOT add `href` for third-party framework types (Preact, Qwik, React, Vue, Svelte).

2. **Relative Links (Same Framework):**

   ```typescript
   href: '../TypeName/'; // Correct
   href: '../FormStore/'; // Correct
   ```

3. **Absolute Links (Core/Other Frameworks):**

   ```typescript
   href: '/core/api/Schema/'; // Correct for core types
   href: '/methods/api/validate/'; // Correct for methods
   ```

4. **Parentheses Folders Don't Appear in URLs:**

   ```typescript
   // WRONG:
   href: '../../(types)/FormStore/';
   href: '/core/api/(types)/Schema/';

   // CORRECT:
   href: '../FormStore/';
   href: '/core/api/Schema/';
   ```

5. **External Links (Valibot Only):**
   ```typescript
   href: 'https://valibot.dev/api/InferInput/'; // Opens in new tab
   ```

### Optional Parameters

Optional parameters must be union types with `undefined`:

```typescript
config: {
  type: {
    type: 'union',
    options: [
      { type: 'custom', name: 'ValidateFormConfig', href: '../ValidateFormConfig/' },
      'undefined',
    ],
  },
},
```

### Unused Properties

**Important:** Remove any properties defined in properties.ts that aren't referenced in index.mdx.

```typescript
// If index.mdx doesn't use <Property {...properties.unusedProp} />
// then unusedProp should be removed from properties.ts
```

## Common Issues

### Issue 1: Incorrect Property Type

```typescript
// Source code:
readonly onSubmit$: QRL<SubmitHandler<TSchema>>;

// WRONG in properties.ts:
onSubmit: {
  type: {
    type: 'custom',
    name: 'SubmitHandler',
    // ...
  },
},

// CORRECT:
onSubmit$: {
  type: {
    type: 'custom',
    name: 'QRL',
    generics: [
      {
        type: 'custom',
        name: 'SubmitHandler',
        // ...
      },
    ],
  },
},
```

### Issue 2: Missing Generic Parameters

```typescript
// Source code:
export interface FieldStore<TSchema extends Schema, TFieldPath extends RequiredPath>

// WRONG - missing TFieldPath:
FieldStore: {
  type: {
    type: 'custom',
    name: 'FieldStore',
    generics: [
      { type: 'custom', name: 'TSchema' },
    ],
  },
},

// CORRECT:
FieldStore: {
  type: {
    type: 'custom',
    name: 'FieldStore',
    generics: [
      { type: 'custom', name: 'TSchema' },
      { type: 'custom', name: 'TFieldPath' },
    ],
  },
},
```

### Issue 3: Overloaded Functions

```ts
// WRONG - including implementation signature:
const input = getInput<TSchema>(form);
const input = getInput<TSchema, TFieldPath>(form, config);
const input = getInput(form, config?: Config); // DON'T INCLUDE

// CORRECT - only overload signatures:
const input = getInput<TSchema>(form);
const input = getInput<TSchema, TFieldPath>(form, config);
```

## Framework-Specific Rules

### Solid (Primitives)

- Uses `createForm`, not `useForm`
- Uses `Store<T>` for reactivity
- Section heading: "Primitives"

### Preact (Hooks)

- Uses `useForm`, `useField`, `useFieldArray`
- Uses `ReadonlySignal` from `@preact/signals`
- Components use `children` prop (render prop pattern)
- Event handlers: `onFocus`, `onInput` (no $ suffix)
- Section heading: "Hooks"

### Qwik (Hooks)

- Uses `useForm$` (with $), `useField`, `useFieldArray`
- Uses `ReadonlySignal` from `@qwik.dev/core`
- Components use `render$` prop (QRL-wrapped)
- Event handlers: `onFocus$`, `onInput$` (with $ suffix)
- All event handlers wrapped in `QRL<function>`
- Form uses `onSubmit$` not `onSubmit`
- Section heading: "Hooks"

### Vue (Composables)

- Uses `useForm`, `useField`, `useFieldArray`
- Section heading: "Composables"

### Svelte (Runes)

- Uses Svelte 5 runes pattern
- Section heading: "Runes"

## Verification Checklist

For each API route, verify:

- [ ] Source file path is correct and file exists
- [ ] Function/type name matches source exactly
- [ ] All overload signatures documented (not implementation)
- [ ] All generics documented with correct `extends` constraints
- [ ] All parameters documented with correct types
- [ ] Optional parameters use union types with `undefined`
- [ ] Return type matches source
- [ ] All properties in properties.ts are used in index.mdx
- [ ] All href links correct (no parentheses, only Formisch/Valibot)
- [ ] Related section uses correct framework heading
- [ ] No Types in Related section
- [ ] Framework-specific patterns followed
- [ ] No typos or grammar issues in text content
