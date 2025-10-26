import { type FormStore, reset } from '@formisch/qwik';
import { component$ } from '@qwik.dev/core';
import { ActionButton } from './ActionButton';

type FormHeaderProps = {
  of: FormStore;
  heading: string;
};

/**
 * Form header with heading and buttons to reset and submit the form.
 */
export const FormHeader = component$(
  ({ of: form, heading }: FormHeaderProps) => {
    return (
      <header class="flex items-center justify-between px-8 lg:px-10">
        <h1 class="text-2xl text-slate-900 md:text-3xl lg:text-4xl dark:text-slate-200">
          {heading}
        </h1>
        <div class="hidden lg:flex lg:gap-8">
          <ActionButton
            variant="secondary"
            label="Reset"
            type="button"
            preventdefault:click
            onClick$={() => reset(form)}
          />
          <ActionButton variant="primary" label="Submit" type="submit" />
        </div>
      </header>
    );
  }
);
