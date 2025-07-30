import {
  type BaseFormStore,
  INTERNAL,
  type Schema,
  type SubmitHandler,
  validateFormInput,
} from '@formisch/core';

export function handleSubmit<TSchema extends Schema>(
  form: BaseFormStore<TSchema>,
  handler: SubmitHandler<TSchema>
): (event: SubmitEvent) => void;
export function handleSubmit(
  form: BaseFormStore,
  handler: SubmitHandler<Schema>
): (event: SubmitEvent) => void {
  return async (event: SubmitEvent) => {
    // Prevent default behavior of browser
    event.preventDefault();

    // Get internal form store
    const internalFormStore = form[INTERNAL];

    // Update submit state of form
    internalFormStore.isSubmitted.value = true;
    internalFormStore.isSubmitting.value = true;

    // Try to run submit actions if form is valid
    try {
      const result = await validateFormInput(internalFormStore, {
        shouldFocus: true,
      });
      if (result.success) {
        await handler(result.output, event);
      }

      // If an error occurred, set form errors
    } catch (error: unknown) {
      internalFormStore.errors.value = [
        error && typeof error === 'object' && 'message' in error && typeof error.message === 'string'
          ? error.message
          : 'An unknown error has occurred.',
      ];

      // Finally set submitting back to "false"
    } finally {
      internalFormStore.isSubmitting.value = false;
    }
  };
}
