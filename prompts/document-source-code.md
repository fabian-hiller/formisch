# Formisch Source Code Documentation Guide

This guide defines the documentation style for the Formisch library source code. Follow these patterns precisely for consistency.

## Core Principles

1. **Clarity over verbosity** - Be clear and concise
2. **Consistency is critical** - Follow patterns exactly
3. **User-focused** - Documentation serves API users
4. **Type-safe** - JSDoc enhances TypeScript IntelliSense
5. **Group related code** - Don't comment every line; group related operations with a single comment

---

## JSDoc Patterns

### Interfaces & Types

```typescript
/**
 * [Name] [category] interface.
 */
export interface NameCategory<TGenerics> {
  /**
   * The [property description].
   */
  readonly propertyName: Type;
}

/**
 * [Name] [category] type.
 */
export type TypeName<TGenerics> = ...;
```

**For Complex/Internal Types:**

```typescript
/**
 * Merges array and object unions into a single object.
 *
 * Hint: This is necessary to make any property accessible. By default,
 * properties that do not exist in all union options are not accessible
 * and result in "any" when accessed.
 */
type MergeUnion<T> = {
  [K in KeyOf<T>]: T extends Record<K, infer V> ? V : never;
};
```

**For Union Types:**

```typescript
/**
 * Validation mode type.
 */
export type ValidationMode =
  | 'initial'
  | 'touch'
  | 'input'
  | 'change'
  | 'blur'
  | 'submit';
```

**For Function Types:**

```typescript
/**
 * Submit handler type.
 */
export type SubmitHandler<TSchema extends Schema> = (
  output: v.InferOutput<TSchema>,
  event: SubmitEvent
) => MaybePromise<unknown>;
```

**For Config/Options Interfaces:**

```typescript
/**
 * Form config interface.
 */
export interface FormConfig<TSchema extends Schema = Schema> {
  /**
   * The schema of the form.
   */
  readonly schema: TSchema;
  /**
   * The initial input of the form.
   */
  readonly initialInput?: DeepPartial<v.InferInput<TSchema>> | undefined;
}
```

**Rules:**

- First line: `[Name] [category] interface.` or `[Name] [category] type.`
- For config/options interfaces: Use `[Name] config interface.` (not "configuration interface")
- For complex/internal utility types: It's acceptable to skip the `[Name] [category] type.` pattern and go straight to a detailed explanation of what the type does
- Union types and function types follow the same `[Name] [category] type.` pattern
- Properties: `The [description].` (always start with "The", end with period, lowercase after "The")
- No blank lines between property and comment
- Use `readonly` for public API properties that shouldn't be modified by users; internal properties are usually not readonly
- Hints: If `// Hint:` comments exist above properties, move them into the JSDoc block after the description (see Hint section below)

### Function Overloads

```typescript
/**
 * [Descriptive sentence about what the function does]. [Optional second
 * sentence with additional details].
 *
 * @param param1 The [description].
 * @param param2 The [description].
 *
 * @returns The [description].
 */
export function functionName<TGenerics>(param1: Type, param2: Type): ReturnType;
```

**Rules:**

- First line: 1-2 descriptive sentences explaining what the function does
- Write in present tense, third person
- Be specific and clear about the function's purpose
- Blank line after description
- `@param name The [description].` (start with "The", end with period)
- Blank line after all params
- `@returns The [description].` (describe what is returned)
- Each overload gets complete JSDoc
- Hints: Add after main description with "Hint:" prefix

### Implementation Functions

```typescript
// @__NO_SIDE_EFFECTS__
export function functionName(params): ReturnType {
  // implementation
}
```

**Rules:**

- NO JSDoc on implementation (only on overloads)
- Include `// @__NO_SIDE_EFFECTS__` **only if function is pure**:
  - No external state modification
  - No I/O operations
  - Same output for same input
  - Internal argument mutations are acceptable if controlled
- Functions with side effects: NO `@__NO_SIDE_EFFECTS__` comment

### Exported Constants

```typescript
/**
 * Internal symbol constant.
 */
export const INTERNAL = '~internal' as const;

/**
 * The current framework being used.
 */
export const framework: Framework = 'svelte';
```

**Rules:**

- First line: Brief description of what the constant represents
- Use present tense
- End with period
- No `@param` or `@returns` tags for constants

### Barrel/Index Files

```typescript
export * from './getFieldStore.ts';
export * from './setFieldStore.ts';
```

**Rules:**

- NO JSDoc comments needed for barrel files that only re-export
- Keep them clean and minimal
- Only add comments if the barrel file contains actual logic

---

## Inline Comment Patterns

### Section Headers

```typescript
function example() {
  // Get input value from source
  const input = source.value;

  // If condition is met, process data
  if (condition) {
    // Set property to initial state
    obj.property = initialValue;

    // Process each item
    for (const item of items) {
      // implementation
    }
  }
}
```

**Rules:**

- Describe what NEXT code block does
- Use present tense verbs
- **Be concise - omit articles** ("the", "a", "an")
- **No period at end** (inline comments don't end with periods)
- No blank line between comment and code
- Blank line before comment (separates sections)
- **Group related operations** - Use one comment for a group of related lines instead of commenting every line

**Example of good grouping:**

```typescript
// Set validation configuration
store.validators = 0;
store.validate = config.validate ?? 'submit';
store.revalidate = config.revalidate ?? 'input';
store.parse = parse;
```

**Example of over-commenting (avoid):**

```typescript
// Set validation mode
store.validate = config.validate ?? 'submit';

// Set revalidation mode
store.revalidate = config.revalidate ?? 'input';

// Set parse function
store.parse = parse;

// Initialize validator counter
store.validators = 0;
```

### Conditional Logic

```typescript
// If condition is true, perform action
if (condition) {
  // implementation
}

// Otherwise, if alternative condition, do something else
else if (altCondition) {
  // implementation
}

// Otherwise, handle default case
else {
  // implementation
}
```

**Rules:**

- Start with "If" for conditions
- Use "Otherwise" for else/else-if
- Omit articles
- No period at end
- Explain business logic, not just code

### Operations

```typescript
// Create result object
const result = { ... };

// Add item to collection
collection.push(item);

// Set flag to true
flag = true;

// Copy start input
store.startInput.value = otherStore.startInput.value;

// Swap errors
const temp = first.errors.value;
first.errors.value = second.errors.value;
second.errors.value = temp;
```

**Rules:**

- Verb-based ("Create", "Add", "Set", "Parse", "Check", "Copy", "Swap")
- Omit articles
- No period at end
- Focus on intent, not mechanics
- **Avoid redundant terms**: Don't include "value" when they just refer to the signal interface (`.value`). Write `// Copy start input` not `// Copy start input value`

### Variables

```typescript
// Create output variable
let output: Type | undefined;

// Get expected and received values
const expected = ...;
const received = ...;
```

**Rules:**

- Omit articles
- No period at end
- Focus on purpose/role
- **Standard loop variables don't need comments**: Variables like `index`, `key`, `item` in standard loops don't need dedicated comments when their purpose is obvious from context

### Hint Comments

**In Inline Code:**

```typescript
// Hint: The object is deliberately not constructed with spread operator
// for performance reasons
const obj = { ... };

// Hint: This check ensures that an empty string or `NaN` does not mark
// the field as dirty if the start input was `undefined`.
if (startInput !== undefined || (input !== '' && !Number.isNaN(input))) {
  // ...
}
```

**In JSDoc (Properties/Types):**

```typescript
/**
 * The initial input of the field.
 *
 * Hint: The initial input is used for resetting and may only be changed
 * during this process. It does not move when a field is moved.
 */
initialInput: Signal<unknown>;

/**
 * The start input of the field.
 *
 * Hint: The start input is used to determine whether the field is dirty
 * and moves with it.
 */
startInput: Signal<unknown>;
```

**Rules:**

- Start with "Hint:"
- Explain WHY, not just WHAT
- Document performance considerations
- Document non-obvious logic or edge cases
- **Exception: CAN use articles** ("the", "a", "an") for clarity
- **Exception: CAN end with periods** for clarity
- **In JSDoc**: Place hints after the main description, separated by a blank line
- **Duplicate hints** where applicable across related properties (e.g., if a hint applies to `initialInput`, `startInput`, and `input`, include the relevant parts in each property's JSDoc)

### TODO Comments

```typescript
// TODO: Consider adding optimization here

// TODO: Check if we can merge this for loop with the one below
```

**Rules:**

- Use `// TODO:` format
- Be specific
- Can end with periods for clarity

---

## Special Patterns

### TypeScript Error Suppression

```typescript
// @ts-expect-error
property = value;
```

**Rules:**

- Only use when necessary for TypeScript limitations
- NO explanation needed when:
  - Context is clear from surrounding comment
  - It's a known TypeScript limitation with partial types
  - It's for dynamic property access that TypeScript can't infer
- DO provide explanation when:
  - The reason is non-obvious
  - It's a workaround for a bug
  - Future developers need context

**Examples (no explanation needed):**

```typescript
// Create empty child object
// @ts-expect-error
internalFieldStore.children[index] = {};

// Get array length
// @ts-expect-error
if (arrayInput.length < items.length) {
```

**Examples (explanation needed):**

```typescript
// @ts-expect-error Workaround for Valibot issue #123
const result = schema.parse(input);
```

### ESLint Disable Directives

```typescript
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable jsdoc/require-returns-check */
```

**Rules:**

- Use at file level only when absolutely necessary
- Prefer inline disables for specific lines when possible
- Always consider if the code can be refactored instead
- Common use cases:
  - `no-explicit-any`: For type utilities requiring `any`

### Internal Properties

```typescript
/**
 * The internal property description.
 *
 * @internal
 */
readonly [INTERNAL]: Type;
```

> `INTERNAL` is imported from `packages/core/src/values.ts` with a relative import or via the `@formisch/core` package.

---

## Documentation Checklist

### JSDoc

- [ ] Interfaces: `[Name] [category] interface.` format
- [ ] Properties: `The [description].` format
- [ ] Overloads: Complete JSDoc with correct format
- [ ] Implementation: NO JSDoc, `// @__NO_SIDE_EFFECTS__` if pure
- [ ] Params: Start with "The", end with period
- [ ] Internal utilities: `@internal` tag

### Inline Comments

- [ ] Section headers mark major blocks
- [ ] Conditions use "If"/"Otherwise"
- [ ] Operations are verb-based
- [ ] Comments use present tense
- [ ] **Articles omitted** (except Hint comments)
- [ ] Comments describe WHAT/WHY, not HOW
- [ ] No blank lines between comment and code
- [ ] Blank lines separate sections

### Style

- [ ] JSDoc comments end with periods
- [ ] Inline comments do NOT end with periods (except Hint/TODO comments)
- [ ] "The" used for property/param descriptions in JSDoc
- [ ] Consistent terminology
- [ ] Professional, clear tone

---

## Quick Reference

### JSDoc First Lines

- Interface: `[Name] [category] interface.`
- Config Interface: `[Name] config interface.`
- Type: `[Name] [category] type.`
- Union Type: `[Name] [category] type.`
- Function Type: `[Name] [category] type.`
- Complex/Internal Type: Descriptive explanation of what the type does (can skip the `[Name] [category] type.` pattern)
- Function: 1-2 descriptive sentences (present tense, third person)
- Constant: Brief description of what it represents (present tense)
- Utility: 1-2 descriptive sentences (present tense, third person)

### JSDoc Tags

```
@param name The [description].
@returns The [description].
@internal
```

### Inline Comment Patterns

- `// Get [what]` → "Get input value from source"
- `// If [condition], [action]` → "If value is valid, process data"
- `// Otherwise, [action]` → "Otherwise, add error"
- `// Otherwise, if [condition], [action]` → "Otherwise, if schema is lazy, unwrap and initialize"
- `// Create [what]` → "Create result object"
- `// Add [what] to [where]` → "Add item to collection"
- `// Set [property] to [value]` → "Set flag to true"
- `// Copy [what]` → "Copy start input" (not "Copy start input value")
- `// Swap [what]` → "Swap errors" (not "Swap errors values")
- `// Initialize [what]` → "Initialize children array"
- `// Build/Collect/Process [what]` → "Build array from children"
- `// Convert [what] to [what]` → "Convert path to name"
- `// Hint: [explanation]` → Explain WHY or document edge cases; can use articles and periods
- `// TODO: [task]` → Specific task or question; can use periods

**Important:**

- Omit articles ("the", "a", "an") in regular inline comments
- Do NOT end regular inline comments with periods
- **Hint and TODO comments are exceptions**: They CAN use articles and periods for clarity
- Hint comments explain non-obvious logic, edge cases, or performance considerations
- **Avoid redundant terms**: Don't add "value", "values", or "state" when they just refer to the signal interface (e.g., `.value` accessor). Focus on the semantic property name instead.
- **Standard loop variables** (index, key, item) don't need separate comments
- **Long if-else-if chains**: Each branch should have its own comment explaining the specific condition and action

---

## AI Agent Workflow

### When Reviewing

1. Check interfaces/types for correct JSDoc format (`[Name] [category] interface/type.`)
2. Verify config interfaces use "config interface" (not "configuration interface")
3. Verify overloads have complete JSDoc
4. Confirm implementation has NO JSDoc
5. Verify `// @__NO_SIDE_EFFECTS__` only on pure functions
6. Check inline comments for conciseness (no articles, no periods)
7. Verify JSDoc comments end with periods
8. Verify inline comments do NOT end with periods (except Hint/TODO)
9. Ensure consistent terminology
10. Check that related operations are grouped with single comments (not every line commented)
11. Verify barrel files have NO JSDoc
12. Check that `@ts-expect-error` has explanation only when non-obvious
13. Verify standard loop variables (index, key) don't have unnecessary comments
14. Check long if-else-if chains have comments on each branch

### When Creating

1. Write interface/type JSDoc with exact pattern
2. Use "config interface" for config/options interfaces
3. Add property comments (one per property)
4. Move any `// Hint:` comments above properties into their JSDoc blocks
5. Duplicate hints across related properties where applicable
6. Create overload JSDoc for each signature
7. Add `// @__NO_SIDE_EFFECTS__` only if pure
8. Add concise inline comments (omit articles, no periods)
9. Group related operations under single comments
10. Don't comment standard loop variables
11. Add comments for each branch in long if-else-if chains
12. Add Hint comments for non-obvious code, edge cases, or performance considerations
13. Skip JSDoc for barrel files
14. Use `@ts-expect-error` without explanation when context is clear
15. Review for consistency

### When Fixing

1. Apply appropriate pattern for file type (interface, type, function, constant, etc.)
2. Keep correct existing structure
3. Only change inconsistencies
4. Move `// Hint:` comments above properties into JSDoc blocks
5. Preserve valuable hints/notes
6. Remove unnecessary comments (barrel files, standard loop variables)
7. Add missing comments for long if-else-if branches
8. Match surrounding code style
9. Verify `@ts-expect-error` usage follows guidelines
10. Don't modify logic or functionality

---

## Common Patterns Summary

### Documentation That IS Needed

✅ Public interfaces and types  
✅ Exported functions (overloads only)  
✅ Exported constants  
✅ Config/options interfaces  
✅ Complex type utilities  
✅ Function parameters and return values  
✅ Interface properties  
✅ Section headers in implementation  
✅ Each branch of if-else-if chains  
✅ Grouped operations  
✅ Non-obvious logic (with Hint comments)

### Documentation That IS NOT Needed

❌ Function implementations (only overloads)  
❌ Barrel/index files (export only)  
❌ Standard loop variables (index, key, item)  
❌ Every single line of code  
❌ Obvious operations when context is clear  
❌ `@ts-expect-error` explanations when context is obvious

---

This guide ensures consistent, maintainable, high-quality documentation throughout the Formisch codebase.
