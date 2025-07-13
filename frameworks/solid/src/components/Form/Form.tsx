import {
  INTERNAL,
  type Schema,
  type SubmitHandler,
  validateFormInput,
} from '@formisch/core/solid';
import { type JSX, splitProps } from 'solid-js';
import type { FormStore } from '../../types/index.ts';

export type FormProps<TSchema extends Schema = Schema> = Omit<
  JSX.FormHTMLAttributes<HTMLFormElement>,
  'onSubmit'
> & {
  of: FormStore<TSchema>;
  children: JSX.Element;
  onSubmit: SubmitHandler<TSchema>;
};

export function Form<TSchema extends Schema>(
  props: FormProps<TSchema>
): JSX.Element;
export function Form(props: FormProps): JSX.Element {
  // Split props between local, config and other
  const [, other] = splitProps(props, ['of', 'onSubmit']);

  return (
    <form
      {...other}
      novalidate
      ref={(element) => {
        props.of[INTERNAL].element = element;
      }}
      onSubmit={async (event) => {
        // Prevent default behavior of browser
        event.preventDefault();

        // Get internal form store
        const internalFormStore = props.of[INTERNAL];

        // Update submit state of form
        internalFormStore.isSubmitted.value = true;
        internalFormStore.isSubmitting.value = true;

        // Try to run submit actions if form is valid
        try {
          const result = await validateFormInput(internalFormStore, {
            shouldFocus: true,
          });
          if (result.success) {
            await props.onSubmit(result.output, event);
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
    />
  );
}
