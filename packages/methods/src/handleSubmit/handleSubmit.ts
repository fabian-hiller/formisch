import {
  type BaseFormStore,
  INTERNAL,
  type Schema,
  type SubmitHandler,
  validateFormInput,
} from '@formisch/core';

/**
 * Creates a submit event handler for the form that prevents default browser
 * submission, validates the form input, and calls the provided handler if
 * validation succeeds. This is designed to be used with the form's onsubmit event.
 *
 * @param form The form store to handle submission for.
 * @param handler The submit handler function called with validated output if validation succeeds.
 *
 * @returns A submit event handler function to attach to the form element.
 */
export function handleSubmit<TSchema extends Schema>(
  form: BaseFormStore<TSchema>,
  handler: SubmitHandler<TSchema>
): (event: SubmitEvent) => void;

// @__NO_SIDE_EFFECTS__
export function handleSubmit(
  form: BaseFormStore,
  handler: SubmitHandler<Schema>
): (event: SubmitEvent) => void {
  return async (event: SubmitEvent) => {
    // Prevent default browser form submission
    event.preventDefault();

    // Get internal form store
    const internalFormStore = form[INTERNAL];

    // Mark form as submitted and submitting
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
    } catch (error) {
      internalFormStore.errors.value = [
        error instanceof Error
          ? error.message
          : 'An unknown error has occurred.',
      ];

      // Finally reset submitting state
    } finally {
      internalFormStore.isSubmitting.value = false;
    }
  };
}
