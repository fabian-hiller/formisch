# Formisch for Vue

Formisch is a schema-based, headless form library for Vue. It manages form state and validation. It is type-safe, fast by default and its bundle size is small due to its modular design. Try it out in our [playground](https://stackblitz.com/edit/formisch-playground-vue)!

## Highlights

- Small bundle size starting at 2.5 kB
- Schema-based validation with Valibot
- Type safety with autocompletion in editor
- It's fast – DOM updates are fine-grained
- Minimal, readable and well thought out API
- Supports all native HTML form fields

## Example

Every form starts with the `useForm` composable. It initializes your form's store based on the provided Valibot schema and infers its types. Next, wrap your form in the `<Form />` component. It's a thin layer around the native `<form />` element that handles form validation and submission. Then, you can access the state of a field with the `useField` composable or the `<Field />` component to connect your inputs.

```vue
<script setup lang="ts">
import { Field, Form, type SubmitHandler, useForm } from '@formisch/vue';
import * as v from 'valibot';

const LoginSchema = v.object({
  email: v.pipe(v.string(), v.email()),
  password: v.pipe(v.string(), v.minLength(8)),
});

type LoginSchema = typeof LoginSchema;

const loginForm = useForm({
  schema: LoginSchema,
});
</script>

<template>
  <Form :of="loginForm" @submit="(output) => console.log(output)">
    <Field :of="loginForm" :path="['email']" v-slot="field">
      <div>
        <input v-model="field.input" v-bind="field.props" type="email" />
        <div v-if="field.errors">{{ field.errors[0] }}</div>
      </div>
    </Field>
    <Field :of="loginForm" :path="['password']" v-slot="field">
      <div>
        <input v-model="field.input" v-bind="field.props" type="password" />
        <div v-if="field.errors">{{ field.errors[0] }}</div>
      </div>
    </Field>
    <button type="submit">Login</button>
  </Form>
</template>
```

In addition, Formisch offers several functions (we call them "methods") that can be used to read and manipulate the form state. These include `focus`, `getErrors`, `getAllErrors`, `getInput`, `insert`, `move`, `remove`, `replace`, `reset`, `setErrors`, `setInput`, `submit`, `swap` and `validate`. These methods allow you to control the form programmatically.

## Feedback

Find a bug or have an idea how to improve the library? Please fill out an [issue](https://github.com/fabian-hiller/formisch/issues/new). Together we can make forms even better!

## License

This project is available free of charge and licensed under the [MIT license](https://github.com/fabian-hiller/formisch/blob/main/LICENSE.md).
