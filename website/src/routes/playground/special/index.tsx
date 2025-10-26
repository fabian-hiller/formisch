import { Field, Form, useForm$ } from '@formisch/qwik';
import {
  component$,
  createComputed$,
  useContext,
  useTask$,
} from '@qwik.dev/core';
import { type DocumentHead } from '@qwik.dev/router';
import * as v from 'valibot';
import {
  Checkbox,
  FileInput,
  FormFooter,
  FormHeader,
  Select,
  Slider,
  TextInput,
} from '~/components';
import { FormStoreContext } from '../layout';

const SpecialFormSchema = v.object({
  number: v.optional(v.string()),
  range: v.optional(v.string(), '50'),
  checkbox: v.object({
    array: v.array(v.string()),
    boolean: v.optional(v.boolean(), false),
  }),
  select: v.object({
    array: v.array(v.string()),
    string: v.optional(v.string()),
  }),
  file: v.object({
    list: v.array(v.file()),
    item: v.optional(v.file()),
  }),
});

export const head: DocumentHead = {
  title: 'Special form',
  meta: [
    {
      name: 'description',
      content: 'A special form playground showcasing various input types.',
    },
  ],
};

export default component$(() => {
  const specialForm = useForm$({
    schema: SpecialFormSchema,
  });

  const formContext = useContext(FormStoreContext);
  useTask$(() => {
    formContext.value = specialForm;
  });

  return (
    <Form
      of={specialForm}
      class="flex flex-col gap-12 md:gap-14 lg:gap-16"
      onSubmit$={(output) => alert(JSON.stringify(output, null, 2))}
    >
      <FormHeader of={specialForm} heading="Special form" />
      <div class="flex flex-col gap-8 md:gap-10 lg:gap-12">
        <Field
          of={specialForm}
          path={['number']}
          render$={(field) => (
            <TextInput
              {...field.props}
              input={field.input}
              errors={field.errors}
              type="number"
              label="Number"
            />
          )}
        />

        <Field
          of={specialForm}
          path={['range']}
          render$={(field) => (
            <Slider
              {...field.props}
              input={field.input}
              errors={field.errors}
              label="Range"
            />
          )}
        />

        <label class="block px-8 font-medium md:text-lg lg:mb-5 lg:px-10 lg:text-xl">
          Checkbox array
        </label>

        <div class="mx-8 flex flex-wrap gap-6 rounded-2xl border-2 border-slate-200 p-6 lg:gap-10 lg:p-10 dark:border-slate-800">
          {[
            { label: 'Option 1', value: 'option_1' },
            { label: 'Option 2', value: 'option_2' },
            { label: 'Option 3', value: 'option_3' },
          ].map(({ label, value }) => (
            <Field
              of={specialForm}
              path={['checkbox', 'array']}
              key={value}
              render$={(field) => (
                <Checkbox
                  {...field.props}
                  class="p-0!"
                  label={label}
                  value={value}
                  input={createComputed$(() =>
                    field.input.value.includes(value)
                  )}
                  errors={field.errors}
                />
              )}
            />
          ))}
        </div>

        <Field
          of={specialForm}
          path={['checkbox', 'boolean']}
          render$={(field) => (
            <Checkbox
              {...field.props}
              input={field.input}
              errors={field.errors}
              label="Checkbox boolean"
            />
          )}
        />

        <Field
          of={specialForm}
          path={['select', 'array']}
          render$={(field) => (
            <Select
              {...field.props}
              input={field.input}
              options={[
                { label: 'Option 1', value: 'option_1' },
                { label: 'Option 2', value: 'option_2' },
                { label: 'Option 3', value: 'option_3' },
              ]}
              errors={field.errors}
              label="Select array"
              multiple
            />
          )}
        />

        <Field
          of={specialForm}
          path={['select', 'string']}
          render$={(field) => (
            <Select
              {...field.props}
              input={field.input}
              options={[
                { label: 'Option 1', value: 'option_1' },
                { label: 'Option 2', value: 'option_2' },
                { label: 'Option 3', value: 'option_3' },
              ]}
              errors={field.errors}
              label="Select string"
            />
          )}
        />

        <Field
          of={specialForm}
          path={['file', 'list']}
          render$={(field) => (
            <FileInput
              {...field.props}
              input={field.input}
              errors={field.errors}
              label="File list"
              multiple
            />
          )}
        />

        <Field
          of={specialForm}
          path={['file', 'item']}
          render$={(field) => (
            <FileInput
              {...field.props}
              input={field.input}
              errors={field.errors}
              label="File item"
            />
          )}
        />
      </div>
      <FormFooter of={specialForm} />
    </Form>
  );
});
