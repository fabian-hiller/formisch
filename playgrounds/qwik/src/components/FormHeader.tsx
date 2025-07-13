import { reset, type FormStore } from '@formisch/qwik';
import { ActionButton } from './ActionButton';
import { component$ } from '@qwik.dev/core';

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
        <div class="hidden lg:flex lg:space-x-8">
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
