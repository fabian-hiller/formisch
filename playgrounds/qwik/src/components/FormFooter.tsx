import { type FormStore, reset } from '@formisch/qwik';
import { ActionButton } from './ActionButton';
import { component$ } from '@qwik.dev/core';

type FormFooterProps = {
  of: FormStore;
};

/**
 * Form footer with buttons to reset and submit the form.
 */
export const FormFooter = component$(({ of: form }: FormFooterProps) => {
  return (
    <footer class="flex space-x-6 px-8 md:space-x-8 lg:hidden">
      <ActionButton variant="primary" label="Submit" type="submit" />
      <ActionButton
        variant="secondary"
        label="Reset"
        type="button"
        preventdefault:click
        onClick$={() => reset(form)}
      />
    </footer>
  );
});
