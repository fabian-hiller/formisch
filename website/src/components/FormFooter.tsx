import { type FormStore, reset } from '@formisch/qwik';
import { component$ } from '@qwik.dev/core';
import { ActionButton } from './ActionButton';

type FormFooterProps = {
  of: FormStore;
};

/**
 * Form footer with buttons to reset and submit the form.
 */
export const FormFooter = component$(({ of: form }: FormFooterProps) => {
  return (
    <footer class="flex gap-6 px-8 md:gap-8 lg:hidden">
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
