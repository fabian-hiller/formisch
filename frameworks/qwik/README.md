# Formisch for Qwik

Formisch is a schema-based, headless form library for Qwik. It manages form state and validation. It is type-safe, fast by default and its bundle size is small due to its modular design. Try it out in our [playground](https://stackblitz.com/edit/formisch-playground-qwik)!

## Highlights

- Small bundle size starting at 2.5 kB
- Schema-based validation with Valibot
- Type safety with autocompletion in editor
- It's fast – DOM updates are fine-grained
- Minimal, readable and well thought out API
- Supports all native HTML form fields

## Example

Every form starts with the `useForm$` hook. It initializes your form's store based on the provided Valibot schema and infers its types. Next, wrap your form in the `<Form />` component. It's a thin layer around the native `<form />` element that handles form validation and submission. Then, you can access the state of a field with the `useField` hook or the `<Field />` component to connect your inputs.

```tsx
import { Field, Form, useForm$ } from '@formisch/qwik';
import { component$ } from '@qwik.dev/core';
import * as v from 'valibot';

const LoginSchema = v.object({
  email: v.pipe(v.string(), v.email()),
  password: v.pipe(v.string(), v.minLength(8)),
});

export default component$(() => {
  const loginForm = useForm$({
    schema: LoginSchema,
  });

  return (
    <Form of={loginForm} onSubmit$={(output) => console.log(output)}>
      <Field
        of={loginForm}
        path={['email']}
        render$={(field) => (
          <div>
            <input {...field.props} value={field.input.value} type="email" />
            {field.errors.value && <div>{field.errors.value[0]}</div>}
          </div>
        )}
      />
      <Field
        of={loginForm}
        path={['password']}
        render$={(field) => (
          <div>
            <input {...field.props} value={field.input.value} type="password" />
            {field.errors.value && <div>{field.errors.value[0]}</div>}
          </div>
        )}
      />
      <button type="submit">Login</button>
    </Form>
  );
});
```

In addition, Formisch offers several functions (we call them "methods") that can be used to manipulate the form state. These include `reset`, `setInput`, and `setErrors`. These methods allow you to control the form programmatically.

## Feedback

Find a bug or have an idea how to improve the library? Please fill out an [issue](https://github.com/fabian-hiller/formisch/issues/new). Together we can make forms even better!

## License

This project is available free of charge and licensed under the [MIT license](https://github.com/fabian-hiller/formisch/blob/main/LICENSE.md).
