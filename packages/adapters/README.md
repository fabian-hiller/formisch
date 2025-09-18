# @formisch/adapters

Schema adapters for Formisch form library. This package provides adapters to use different schema validation libraries with Formisch.

## Supported Libraries

- **Valibot** - Fast and lightweight schema validation library
- **Zod** - TypeScript-first schema validation library

## Installation

```bash
# For Valibot
npm install @formisch/adapters valibot

# For Zod
npm install @formisch/adapters zod

# Or both
npm install @formisch/adapters valibot zod
```

## Usage

### With Valibot

```typescript
import { createForm } from '@formisch/solid';
import { valibotForm } from '@formisch/adapters';
import * as v from 'valibot';

const LoginSchema = v.object({
  email: v.pipe(v.string(), v.email()),
  password: v.pipe(v.string(), v.minLength(8)),
});

const form = createForm({
  validate: valibotForm(LoginSchema),
});
```

### With Zod

```typescript
import { createForm } from '@formisch/solid';
import { zodForm } from '@formisch/adapters';
import { z } from 'zod';

const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

const form = createForm({
  validate: zodForm(LoginSchema),
});
```

## API

### `valibotForm(schema)`

Creates a Valibot adapter for the given schema.

**Parameters:**
- `schema` - A Valibot schema

**Returns:** A Valibot adapter instance

### `zodForm(schema)`

Creates a Zod adapter for the given schema.

**Parameters:**
- `schema` - A Zod schema

**Returns:** A Zod adapter instance

## Type Safety

Both adapters provide full TypeScript support with proper type inference for input and output types.

## Migration from Direct Schema Usage

If you're currently using Valibot schemas directly with Formisch, you can migrate to the adapter pattern:

**Before:**
```typescript
const form = createForm({
  schema: LoginSchema,
});
```

**After:**
```typescript
const form = createForm({
  validate: valibotForm(LoginSchema),
});
```

This change is backward compatible and provides the same functionality while enabling support for multiple schema libraries.
