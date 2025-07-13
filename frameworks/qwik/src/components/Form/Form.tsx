import {
  INTERNAL,
  type Schema,
  type SubmitHandler,
  validateFormInput,
} from '@formisch/core/qwik';
import { component$, JSXOutput, PropsOf, QRL, Slot } from '@qwik.dev/core';
import type { FormStore } from '../../types/index.ts';

export type FormProps<TSchema extends Schema = Schema> = Omit<
  PropsOf<'form'>,
  'onSubmit$'
> & {
  of: FormStore<TSchema>;
  onSubmit$: QRL<SubmitHandler<TSchema>>;
};

export const Form = component$(
  <TSchema extends Schema>({
    of,
    onSubmit$,
    ...other
  }: FormProps<TSchema>): JSXOutput => {
    return (
      <form
        {...other}
        noValidate
        preventdefault:submit
        ref={(element) => {
          of[INTERNAL].element = element;
        }}
        onSubmit$={async (event) => {
          // Get internal form store
          const internalFormStore = of[INTERNAL];

          // Update submit state of form
          internalFormStore.isSubmitted.value = true;
          internalFormStore.isSubmitting.value = true;

          // Try to run submit actions if form is valid
          try {
            const result = await validateFormInput(internalFormStore, {
              shouldFocus: true,
            });
            if (result.success) {
              await onSubmit$(result.output, event);
            }

            // If an error occurred, set form errors
          } catch (error) {
            internalFormStore.errors.value = [
              error instanceof Error
                ? error.message
                : 'An unknown error has occurred.',
            ];

            // Finally set submitting back to "false"
          } finally {
            internalFormStore.isSubmitting.value = false;
          }
        }}
      >
        <Slot />
      </form>
    );
  }
);
