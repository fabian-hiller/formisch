# Formisch

Formisch is a schema-based, headless form library for JS frameworks. It manages form state and validation. It is type-safe, fast by default and its bundle size is small due to its modular design. Try it out in our [playground](https://stackblitz.com/edit/formisch-playground-solid)!

Supported frameworks: [Preact][formisch-preact], [Qwik][formisch-qwik], [SolidJS][formisch-solid], [Svelte][formisch-svelte] and [Vue][formisch-vue].

## Highlights

- Small bundle size starting at 2.5 kB
- Schema-based validation with Valibot or Zod
- Type safety with autocompletion in editor
- It's fast – DOM updates are fine-grained
- Minimal, readable and well thought out API
- Supports all native HTML form fields
- Flexible schema adapter system

## Example

In SolidJS a form starts with the `createForm` primitive. It initializes your form's store based on the provided schema and infers its types. Next, wrap your form in the `<Form />` component. It's a thin layer around the native `<form />` element that handles form validation and submission. Then, you can access the state of a field with the `useField` primitive or the `<Field />` component to connect your inputs.

### With Valibot

```tsx
import { createForm, Field, Form } from '@formisch/solid';
import { valibotForm } from '@formisch/adapters';
import * as v from 'valibot';

const LoginSchema = v.object({
  email: v.pipe(v.string(), v.email()),
  password: v.pipe(v.string(), v.minLength(8)),
});

export default function LoginPage() {
  const loginForm = createForm({
    validate: valibotForm(LoginSchema),
  });

  return (
    <Form of={loginForm} onSubmit={(output) => console.log(output)}>
      <Field of={loginForm} path={['email']}>
        {(field) => (
          <div>
            <input {...field.props} value={field.input} type="email" />
            {field.errors && <div>{field.errors[0]}</div>}
          </div>
        )}
      </Field>
      <Field of={loginForm} path={['password']}>
        {(field) => (
          <div>
            <input {...field.props} value={field.input} type="password" />
            {field.errors && <div>{field.errors[0]}</div>}
          </div>
        )}
      </Field>
      <button type="submit">Login</button>
    </Form>
  );
}
```

### With Zod

```tsx
import { createForm, Field, Form } from '@formisch/solid';
import { zodForm } from '@formisch/adapters';
import { z } from 'zod';

const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export default function LoginPage() {
  const loginForm = createForm({
    validate: zodForm(LoginSchema),
  });

  return (
    <Form of={loginForm} onSubmit={(output) => console.log(output)}>
      <Field of={loginForm} path={['email']}>
        {(field) => (
          <div>
            <input {...field.props} value={field.input} type="email" />
            {field.errors && <div>{field.errors[0]}</div>}
          </div>
        )}
      </Field>
      <Field of={loginForm} path={['password']}>
        {(field) => (
          <div>
            <input {...field.props} value={field.input} type="password" />
            {field.errors && <div>{field.errors[0]}</div>}
          </div>
        )}
      </Field>
      <button type="submit">Login</button>
    </Form>
  );
}
```

In addition, Formisch offers several functions (we call them "methods") that can be used to read and manipulate the form state. These include `focus`, `getErrors`, `getAllErrors`, `getInput`, `insert`, `move`, `remove`, `replace`, `reset`, `setErrors`, `setInput`, `submit`, `swap` and `validate`. These methods allow you to control the form programmatically.

## Comparison

What makes Formisch unique is its framework-agnostic core, which is fully native to the framework you are using. It works by inserting framework-specific reactivity blocks when the core package is built. The result is a small bundle size and native performance for any UI update. This feature, along with a few others, distinguishes Formisch from other form libraries. My vision for Formisch is to create a framework-agnostic platform similar to [Vite](https://vite.dev/), but for forms.

## Partners

Thanks to our partners who support the development! [Join them](https://github.com/sponsors/fabian-hiller) and contribute to the sustainability of open source software!

![Partners of Formisch](https://github.com/fabian-hiller/formisch/blob/main/partners.webp?raw=true)

## Feedback

Find a bug or have an idea how to improve the library? Please fill out an [issue](https://github.com/fabian-hiller/formisch/issues/new). Together we can make forms even better!

## License

This project is available free of charge and licensed under the [MIT license](https://github.com/fabian-hiller/formisch/blob/main/LICENSE.md).

[formisch-preact]: https://github.com/fabian-hiller/formisch/tree/main/frameworks/preact
[formisch-qwik]: https://github.com/fabian-hiller/formisch/tree/main/frameworks/qwik
[formisch-solid]: https://github.com/fabian-hiller/formisch/tree/main/frameworks/solid
[formisch-svelte]: https://github.com/fabian-hiller/formisch/tree/main/frameworks/svelte
[formisch-vue]: https://github.com/fabian-hiller/formisch/tree/main/frameworks/vue
